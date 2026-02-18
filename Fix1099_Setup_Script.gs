/**
 * Fix1099 Contractor Control System - Auto Setup Script
 * Version: 2026
 * 
 * INSTRUCTIONS:
 * 1. Open your Google Sheet
 * 2. Go to Extensions → Apps Script
 * 3. Delete any existing code
 * 4. Paste this entire script
 * 5. Click the disk icon to Save
 * 6. Click Run (▶️) button
 * 7. Authorize when prompted
 * 8. Wait 10-20 seconds
 * 9. Done! Go back to your sheet
 */

function setupFix1099Sheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  
  // Rename sheet
  sheet.setName("Tracker");
  
  // Clear existing content
  sheet.clear();
  
  // Insert 5 rows for dashboard (1 title + 4 summary rows)
  sheet.insertRowsBefore(1, 5);
  
  // === DASHBOARD SECTION (Rows 1-5) ===
  
  // Title row (A1)
  sheet.getRange("A1").setValue("Fix1099 Contractor Dashboard");
  sheet.getRange("A1").setFontSize(18).setFontWeight("bold").setFontColor("#667eea");
  
  // Summary labels and formulas (Rows 3-5)
  const summaryData = [
    ["Total Contractors:", "=COUNTA(A7:A206)"],
    ["Total 1099 Required:", "=COUNTIF(G7:G206,\"YES\")"],
    ["Total Pending:", "=COUNTIF(I7:I206,\"Pending\")"],
    ["Total Completed:", "=COUNTIF(I7:I206,\"Completed\")"]
  ];
  
  sheet.getRange("A3:B6").setValues(summaryData);
  sheet.getRange("A3:A6").setFontWeight("bold");
  sheet.getRange("B3:B6").setNumberFormat("0");
  
  // === HEADER ROW (Row 6) ===
  
  const headers = [
    "Contractor Name",
    "EIN/SSN",
    "Email",
    "W-9 Received",
    "Payment Method",
    "Total Paid 2026",
    "1099 Required",
    "1099 Filed",
    "Filing Status",
    "Notes"
  ];
  
  sheet.getRange(6, 1, 1, headers.length).setValues([headers]);
  
  // Format header row
  const headerRange = sheet.getRange(6, 1, 1, headers.length);
  headerRange.setBackground("#667eea");
  headerRange.setFontColor("#ffffff");
  headerRange.setFontWeight("bold");
  headerRange.setHorizontalAlignment("center");
  
  // Freeze header row (freeze first 6 rows)
  sheet.setFrozenRows(6);
  
  // === DATA ROWS (7-206, total 200 rows) ===
  
  const startRow = 7;
  const numRows = 200;
  
  // Column D: W-9 Received dropdown (YES/NO)
  const w9Range = sheet.getRange(startRow, 4, numRows, 1);
  const w9Rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["YES", "NO"], true)
    .setAllowInvalid(false)
    .build();
  w9Range.setDataValidation(w9Rule);
  
  // Column E: Payment Method dropdown
  const paymentRange = sheet.getRange(startRow, 5, numRows, 1);
  const paymentRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["ACH", "Check", "Wire", "Zelle", "Cash", "Other"], true)
    .setAllowInvalid(false)
    .build();
  paymentRange.setDataValidation(paymentRule);
  
  // Column H: 1099 Filed dropdown (YES/NO)
  const filedRange = sheet.getRange(startRow, 8, numRows, 1);
  const filedRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["YES", "NO"], true)
    .setAllowInvalid(false)
    .build();
  filedRange.setDataValidation(filedRule);
  
  // Column F: Currency format
  sheet.getRange(startRow, 6, numRows, 1).setNumberFormat("$#,##0.00");
  
  // Column G: 1099 Required formula
  const requiredFormulas = [];
  for (let i = 0; i < numRows; i++) {
    const rowNum = startRow + i;
    requiredFormulas.push([`=IF(F${rowNum}>=600,"YES","NO")`]);
  }
  sheet.getRange(startRow, 7, numRows, 1).setFormulas(requiredFormulas);
  
  // Column I: Filing Status formula
  const statusFormulas = [];
  for (let i = 0; i < numRows; i++) {
    const rowNum = startRow + i;
    statusFormulas.push([`=IF(G${rowNum}="YES",IF(H${rowNum}="YES","Completed","Pending"),"Not Required")`]);
  }
  sheet.getRange(startRow, 9, numRows, 1).setFormulas(statusFormulas);
  
  // === CONDITIONAL FORMATTING ===
  
  const dataRange = sheet.getRange(startRow, 1, numRows, 10);
  
  // Rule 1: Light red when 1099 Required = YES and 1099 Filed ≠ YES
  const redRule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied(`=AND($G${startRow}="YES",$H${startRow}<>"YES")`)
    .setBackground("#fce8e6")
    .setRanges([dataRange])
    .build();
  
  // Rule 2: Light green when 1099 Filed = YES
  const greenRule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied(`=$H${startRow}="YES"`)
    .setBackground("#d9ead3")
    .setRanges([dataRange])
    .build();
  
  const rules = [redRule, greenRule];
  sheet.setConditionalFormatRules(rules);
  
  // === COLUMN WIDTHS ===
  
  sheet.setColumnWidth(1, 150);  // Contractor Name
  sheet.setColumnWidth(2, 120);  // EIN/SSN
  sheet.setColumnWidth(3, 200);  // Email
  sheet.setColumnWidth(4, 110);  // W-9 Received
  sheet.setColumnWidth(5, 130);  // Payment Method
  sheet.setColumnWidth(6, 130);  // Total Paid 2026
  sheet.setColumnWidth(7, 120);  // 1099 Required
  sheet.setColumnWidth(8, 100);  // 1099 Filed
  sheet.setColumnWidth(9, 120);  // Filing Status
  sheet.setColumnWidth(10, 200); // Notes
  
  // === ADD SAMPLE DATA (Optional - for testing) ===
  
  const sampleData = [
    ["ABC Contracting LLC", "12-3456789", "contact@abccontract.com", "YES", "ACH", 15000, "", "", "", "Main contractor"],
    ["John Smith", "***-**-1234", "john@example.com", "NO", "Check", 450, "", "", "", "One-time project"],
    ["Tech Services Inc", "98-7654321", "info@techserv.com", "YES", "Wire", 8500, "", "", "", "IT support"],
    ["Jane Design Co", "45-6789012", "jane@design.co", "YES", "Zelle", 3200, "", "", "", "Graphic design"]
  ];
  
  sheet.getRange(startRow, 1, sampleData.length, sampleData[0].length).setValues(sampleData);
  
  // === FINALIZE ===
  
  SpreadsheetApp.flush();
  
  // Success message
  SpreadsheetApp.getUi().alert(
    "✅ Setup Complete!",
    "Your Fix1099 Contractor Control System is ready to use!\n\n" +
    "Features enabled:\n" +
    "• Dashboard with live statistics\n" +
    "• Auto 1099 Required calculation (≥$600)\n" +
    "• Auto Filing Status tracking\n" +
    "• Dropdowns for data validation\n" +
    "• Conditional formatting (red = pending, green = completed)\n" +
    "• 4 sample contractors added\n\n" +
    "Start entering your contractors below row 6!",
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}
