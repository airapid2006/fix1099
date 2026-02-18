/**
 * Fix1099 Contractor Tracker - Formula Protection
 * 
 * WHAT THIS DOES:
 * Protects columns H, J, K from accidental editing
 * These columns contain auto-calculation formulas
 * 
 * HOW TO USE:
 * 1. Extensions → Apps Script
 * 2. Paste this code
 * 3. Save (disk icon)
 * 4. Run (play button) → Select "protectFormulaColumns"
 * 5. Authorize when prompted
 * 6. Done!
 * 
 * NOTE: You can still view formulas and edit other columns (A-G, I)
 */

function protectFormulaColumns() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Contractor Tracker');
  
  if (!sheet) {
    SpreadsheetApp.getUi().alert(
      'Error',
      'Sheet "Contractor Tracker" not found.\n\nMake sure you\'re using the Fix1099 template.',
      SpreadsheetApp.getUi().ButtonSet.OK
    );
    return;
  }
  
  // Remove any existing protections first
  const existingProtections = sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE);
  existingProtections.forEach(protection => protection.remove());
  
  // Protect Column H: 1099 Required?
  const rangeH = sheet.getRange('H7:H2000');
  const protectionH = rangeH.protect().setDescription('Formula: 1099 Required (Auto)');
  protectionH.setWarningOnly(true);
  
  // Protect Column J: Filing Status
  const rangeJ = sheet.getRange('J7:J2000');
  const protectionJ = rangeJ.protect().setDescription('Formula: Filing Status (Auto)');
  protectionJ.setWarningOnly(true);
  
  // Protect Column K: Risk Level
  const rangeK = sheet.getRange('K7:K2000');
  const protectionK = rangeK.protect().setDescription('Formula: Risk Level (Auto)');
  protectionK.setWarningOnly(true);
  
  // Success message
  SpreadsheetApp.getUi().alert(
    'Protection Applied',
    'Formula columns are now protected:\n\n' +
    '✓ Column H (1099 Required)\n' +
    '✓ Column J (Filing Status)\n' +
    '✓ Column K (Risk Level)\n\n' +
    'If you try to edit these columns, you\'ll see a warning.\n' +
    'You can still edit columns A-G and I normally.',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

/**
 * Creates custom menu when spreadsheet opens
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Fix1099')
    .addItem('Help', 'showHelp')
    .addToUi();
}

/**
 * NOTE: Remove Protection function is intentionally not included in the menu
 * to prevent customers from accidentally disabling formula protection.
 * 
 * If you (the template owner) need to remove protection:
 * 1. Go to Data → Protected sheets and ranges
 * 2. Click the trash icon next to each protection
 * 3. Or run this function manually from the script editor
 */
function removeProtection() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Contractor Tracker');
  const protections = sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE);
  protections.forEach(p => p.remove());
  
  SpreadsheetApp.getUi().alert(
    'Protection Removed',
    'All formula protections have been removed.\n\nYou can now edit all columns freely.',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

/**
 * Help dialog
 */
function showHelp() {
  SpreadsheetApp.getUi().alert(
    'Fix1099 Help',
    'FORMULA COLUMNS (Auto-calculated):\n' +
    '• H: 1099 Required? (YES if paid ≥$600)\n' +
    '• J: Filing Status (Ready/Pending/Not Needed)\n' +
    '• K: Risk Level (High/Medium/Low)\n\n' +
    'These columns are PROTECTED to prevent accidental changes.\n' +
    'You will see a warning if you try to edit them.\n\n' +
    'DATA ENTRY COLUMNS (You fill these):\n' +
    '• A-G: Contractor info and payment\n' +
    '• I: W-9 Received? (YES/NO)\n\n' +
    'COLOR CODING:\n' +
    '• Red = High risk (missing info)\n' +
    '• Yellow = Medium risk (pending)\n' +
    '• Green = Ready to file\n\n' +
    'Questions? Email: ai.rapid2006@gmail.com',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}
