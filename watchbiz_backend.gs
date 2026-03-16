// ============================================================
// WATCH BUSINESS — Google Apps Script Backend
// Paste this entire file into your Apps Script editor
// ============================================================

const SHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();
const SHEETS = { watches: 'Watches', sales: 'Sales', expenses: 'Expenses', cashflow: 'CashFlow' };

const HEADERS = {
  watches:  ['id','name','ref','watchCost','boxCost','bagCost','transportCost','cost','price','qty','alert'],
  sales:    ['id','watchId','watchName','cost','price','qty','date','source'],
  expenses: ['id','desc','cat','amount','date','notes'],
  cashflow: ['id','desc','type','cat','amount','date']
};

function setCORS(output) {
  return output
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function doGet(e) {
  const action = e.parameter.action;
  const sheet  = e.parameter.sheet;
  let result;
  try {
    if (action === 'getAll') result = getAll(sheet);
    else result = { error: 'Unknown action' };
  } catch(err) {
    result = { error: err.message };
  }
  return setCORS(
    ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON)
  );
}

function doPost(e) {
  let body, result;
  try {
    body = JSON.parse(e.postData.contents);
    const { action, sheet, row, id } = body;
    if      (action === 'insert') result = insertRow(sheet, row);
    else if (action === 'update') result = updateRow(sheet, id, row);
    else if (action === 'delete') result = deleteRow(sheet, id);
    else result = { error: 'Unknown action' };
  } catch(err) {
    result = { error: err.message };
  }
  return setCORS(
    ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON)
  );
}

// ── Sheet helpers ───────────────────────────────────────────
function getSheet(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(HEADERS[Object.keys(SHEETS).find(k => SHEETS[k] === name)]);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, sh.getLastColumn()).setFontWeight('bold').setBackground('#f0ede8');
  }
  return sh;
}

function getAll(sheetKey) {
  const sh = getSheet(SHEETS[sheetKey]);
  const data = sh.getDataRange().getValues();
  if (data.length <= 1) return [];
  const headers = data[0];
  return data.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => { obj[h] = row[i]; });
    return obj;
  });
}

function insertRow(sheetKey, row) {
  const sh = getSheet(SHEETS[sheetKey]);
  const headers = HEADERS[sheetKey];
  sh.appendRow(headers.map(h => row[h] !== undefined ? row[h] : ''));
  return { ok: true };
}

function updateRow(sheetKey, id, row) {
  const sh = getSheet(SHEETS[sheetKey]);
  const data = sh.getDataRange().getValues();
  const headers = data[0];
  const idCol = headers.indexOf('id');
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][idCol]) === String(id)) {
      headers.forEach((h, j) => {
        if (row[h] !== undefined) sh.getRange(i + 1, j + 1).setValue(row[h]);
      });
      return { ok: true };
    }
  }
  return { error: 'Row not found' };
}

function deleteRow(sheetKey, id) {
  const sh = getSheet(SHEETS[sheetKey]);
  const data = sh.getDataRange().getValues();
  const headers = data[0];
  const idCol = headers.indexOf('id');
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][idCol]) === String(id)) {
      sh.deleteRow(i + 1);
      return { ok: true };
    }
  }
  return { error: 'Row not found' };
}

// ── Setup: run once to create all sheets ───────────────────
function setupSheets() {
  Object.keys(SHEETS).forEach(k => getSheet(SHEETS[k]));
  SpreadsheetApp.getUi().alert('✅ All sheets created! Now deploy as Web App.');
}
