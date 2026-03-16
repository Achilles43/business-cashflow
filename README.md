# ⌚ Watch Business Manager

A personal business dashboard for watch sellers — track inventory, sales, expenses, cash flow and P&L in one place. All data saves permanently to your own Google Sheet, accessible from any device.

**Live app:** [achilles43.github.io/business-cashflow](https://achilles43.github.io/business-cashflow)

---

## What it does

- **Watches** — add each model with full cost breakdown (watch + box + bag + transport)
- **Sales** — record every sale with a custom price, quantity, and sale source (Instagram, Meta Ads, Walk-in, etc.)
- **Expenses** — log all business costs by category
- **Cash Flow** — running balance of all money in and out
- **P&L** — auto-calculated profit & loss statement with charts
- **3 currencies** — switch between USD, GEL, and EUR at any time

---

## Setup (one time, ~10 minutes)

### Step 1 — Create a blank Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Click the big **+** to create a blank spreadsheet
3. Name it **Watch Business** (or anything you like)

> Make sure you're signed into your Google account.

---

### Step 2 — Add the backend script

1. In your new sheet, click **Extensions → Apps Script**
2. A new tab opens with a code editor
3. Delete everything already in the editor
4. Copy the entire contents of [`watchbiz_backend.gs`](./watchbiz_backend.gs) and paste it in
5. Click the 💾 save icon (or Ctrl/Cmd + S)

---

### Step 3 — Run the setup function

1. In the Apps Script editor, click the dropdown next to **▶ Run** — it probably says `doGet`
2. Change it to **`setupSheets`**
3. Click **▶ Run**
4. A permissions popup will appear — click **Advanced** → **Go to [project name] (unsafe)** → **Allow**

> This warning is normal for personal scripts. You are the developer and the only user — it is completely safe.

5. You should see a popup: **"✅ All sheets created!"**

---

### Step 4 — Deploy as a Web App

1. Still in Apps Script, click **Deploy → New deployment**
2. Set the following:
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
3. Click **Deploy**
4. Accept permissions again if asked
5. **Copy the Web App URL** — it looks like:
   `https://script.google.com/macros/s/ABC.../exec`

---

### Step 5 — Connect the app

1. Open the app: [achilles43.github.io/business-cashflow](https://achilles43.github.io/business-cashflow)
2. Paste your Web App URL into the input field
3. Click **Connect →**

Your app is now connected. All data saves instantly to your Google Sheet.

---

## Using the app on a new device

The setup screen appears the first time you open the app on any new browser or device. Just paste your Web App URL and click Connect — takes 30 seconds. After that it remembers the connection automatically.

---

## Is my data safe?

Yes. Your data lives in **your Google Sheet**, protected by your Google account. The app URL is just the interface — nobody can read or write your data without your Google Apps Script URL, which only you know.

---

## Tech stack

- Pure HTML + CSS + JavaScript (no frameworks)
- [Chart.js](https://chartjs.org) for charts
- Google Apps Script as the backend / database
- Google Sheets as the data store
- Hosted free on GitHub Pages
