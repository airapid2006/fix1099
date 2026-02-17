# Fix1099 Contractor Control System - Google Sheets Setup Guide

## 📊 Quick Setup Instructions

### Step 1: Create New Google Sheet
1. Go to https://sheets.google.com
2. Click "Blank" to create new spreadsheet
3. Rename to: **Fix1099 Contractor Control System**

---

## 📋 TAB 1: Contractor Tracker

### Column Setup

| Column | Header | Type | Width |
|--------|--------|------|-------|
| A | Contractor Name | Text | 150 |
| B | Business Name | Text | 150 |
| C | EIN/SSN | Text | 120 |
| D | Address | Text | 200 |
| E | Email | Text | 180 |
| F | Phone | Text | 120 |
| G | YTD Paid | Currency | 100 |
| H | 1099 Required? | Formula | 100 |
| I | W-9 Received? | Dropdown | 100 |
| J | Preferred Delivery | Dropdown | 120 |
| K | Notes | Text | 200 |

### Formulas

**Cell H2 (1099 Required?):**
```
=IF(G2>=600,"YES","NO")
```
Then drag down to apply to all rows.

### Data Validation (Dropdowns)

**Column I (W-9 Received?):**
1. Select column I (from I2 downward)
2. Data > Data validation
3. Criteria: List of items
4. Items: `Yes,No`
5. Click "Save"

**Column J (Preferred Delivery):**
1. Select column J (from J2 downward)
2. Data > Data validation
3. Criteria: List of items
4. Items: `Email,Mail`
5. Click "Save"

### Conditional Formatting

**Highlight rows where 1099 is required:**

1. Select entire data range (A2:K100 or more)
2. Format > Conditional formatting
3. Format rules:
   - **Custom formula is:**
   ```
   =$H2="YES"
   ```
4. Formatting style:
   - Background: Light yellow (#FFF9C4) or light red (#FFCDD2)
5. Click "Done"

### Freeze Header Row

1. Select row 1
2. View > Freeze > 1 row

### Add Filter

1. Select header row (A1:K1)
2. Data > Create a filter

---

## 📝 TAB 2: Payment Log

### Column Setup

| Column | Header | Type | Width |
|--------|--------|------|-------|
| A | Date | Date | 100 |
| B | Contractor Name | Text | 150 |
| C | Amount | Currency | 100 |
| D | Category | Dropdown | 120 |
| E | Notes | Text | 250 |

### Data Validation (Category Dropdown)

**Column D (Category):**
1. Select column D (from D2 downward)
2. Data > Data validation
3. Criteria: List of items
4. Items:
```
Labor,Materials,Services,Consulting,Rent,Other
```
5. Click "Save"

### Date Formatting

1. Select column A
2. Format > Number > Date

### Currency Formatting

1. Select column C
2. Format > Number > Currency

### Freeze Header Row

1. Select row 1
2. View > Freeze > 1 row

### Add Filter

1. Select header row (A1:E1)
2. Data > Create a filter

---

## 📊 TAB 3: Dashboard

### Layout

Create a clean dashboard with key metrics:

```
┌─────────────────────────────────────────┐
│        Fix1099 Dashboard                │
├─────────────────────────────────────────┤
│                                         │
│  Total Contractors:        [FORMULA]    │
│  Total YTD Paid:           [FORMULA]    │
│  1099s Required:           [FORMULA]    │
│  Missing W-9s:             [FORMULA]    │
│                                         │
└─────────────────────────────────────────┘
```

### Cell Setup

**A1:** `Fix1099 Dashboard` (Merge A1:C1, Bold, Size 16)

**A3:** `Total Contractors`
**B3:** 
```
=COUNTA('Contractor Tracker'!A2:A1000)
```

**A4:** `Total YTD Paid`
**B4:**
```
=SUM('Contractor Tracker'!G2:G1000)
```
Format as Currency (Format > Number > Currency)

**A5:** `1099s Required`
**B5:**
```
=COUNTIF('Contractor Tracker'!H2:H1000,"YES")
```

**A6:** `Missing W-9s`
**B6:**
```
=COUNTIFS('Contractor Tracker'!H2:H1000,"YES",'Contractor Tracker'!I2:I1000,"No")
```

### Formatting

1. **Column A (Labels):**
   - Bold
   - Font size: 12
   - Align: Right

2. **Column B (Values):**
   - Font size: 14
   - Bold
   - Background: Light blue (#E3F2FD)

3. **Add borders:**
   - Select A3:B6
   - Border > All borders

---

## 🎨 Professional Styling

### Color Scheme

- **Headers:** Dark gray (#616161) background, white text
- **Data validation cells:** Light blue background (#E3F2FD)
- **Required 1099 rows:** Light yellow (#FFF9C4) or light red (#FFCDD2)
- **Dashboard metrics:** Light blue (#E3F2FD)

### Header Formatting (All Tabs)

1. Select header row (row 1)
2. Bold
3. Background color: #616161 (dark gray)
4. Text color: White
5. Center align
6. Font size: 11

### Column Width (All Tabs)

Double-click column dividers to auto-fit, or manually set widths as specified above.

---

## 📱 Mobile Optimization

### Tips for Mobile Viewing

1. **Keep headers frozen** - makes scrolling easier
2. **Use dropdowns** - faster data entry on mobile
3. **Avoid complex formulas in cells users edit** - keeps it simple
4. **Use data validation** - prevents errors

### Google Sheets Mobile App

1. Download: iOS / Android
2. Open your sheet
3. Use "Add new row" button for quick entry
4. Filters work on mobile

---

## 🔐 Sharing & Permissions

### Share Options

1. Click "Share" button (top right)
2. Options:
   - **Viewer:** Can only view
   - **Commenter:** Can view and comment
   - **Editor:** Can edit (recommended for team)

### Link Sharing

1. Click "Share"
2. "Get link"
3. Change to:
   - "Anyone with the link can view/edit"
   - Or restrict to specific emails

---

## ✅ Checklist: Setup Complete

- [ ] Created new Google Sheet
- [ ] Renamed to "Fix1099 Contractor Control System"
- [ ] Set up TAB 1: Contractor Tracker
  - [ ] All columns created
  - [ ] Formula in column H
  - [ ] Dropdowns for columns I & J
  - [ ] Conditional formatting applied
  - [ ] Header frozen
  - [ ] Filter added
- [ ] Set up TAB 2: Payment Log
  - [ ] All columns created
  - [ ] Category dropdown
  - [ ] Date & currency formatting
  - [ ] Header frozen
  - [ ] Filter added
- [ ] Set up TAB 3: Dashboard
  - [ ] All formulas added
  - [ ] Formatting applied
  - [ ] Metrics display correctly
- [ ] Professional styling applied
- [ ] Tested on mobile
- [ ] Shared with team (if applicable)

---

## 🎯 Usage Tips

### Adding New Contractors

1. Go to "Contractor Tracker" tab
2. Enter contractor info in new row
3. YTD Paid will auto-calculate 1099 requirement
4. Set W-9 status
5. Choose delivery preference

### Logging Payments

1. Go to "Payment Log" tab
2. Enter date, contractor name, amount, category
3. Return to Contractor Tracker
4. Update YTD Paid total (or use SUMIF to auto-calculate)

### Monitoring Compliance

1. Check Dashboard tab for quick overview
2. Look for highlighted rows in Contractor Tracker (1099 required)
3. Ensure all required contractors have W-9 marked "Yes"
4. Follow up on missing W-9s before January

---

## 🚀 Advanced Tips

### Auto-Calculate YTD Paid from Payment Log

Replace manual entry in Contractor Tracker column G with:

```
=SUMIF('Payment Log'!$B:$B,A2,'Payment Log'!$C:$C)
```

This automatically sums all payments for each contractor from the Payment Log.

### Add Email Reminder System

Use Google Apps Script (Tools > Script editor) to send automatic reminders for missing W-9s. (Advanced - requires coding)

### Export for Tax Software

1. File > Download > CSV
2. Import into tax software or send to accountant

---

## 📞 Support

For issues with this template, contact:
- **Email:** airapi2006@gmail.com
- **Phone:** (818) 925-5239
- **Text "1099" to (818) 925-5239 for SMS support**

---

## 📄 Legal Disclaimer

This is a tracking tool for organizational purposes only.
Not legal or tax advice.
Consult a qualified CPA or tax professional for filing requirements.

---

**Version:** 1.0
**Last Updated:** February 17, 2026
**Created by:** Fix1099.com
