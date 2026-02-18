/**
 * Fix1099 Contractor Tracker - Protection Script
 * 
 * PURPOSE: Protect formula columns (H, J, K) from accidental deletion
 * 
 * INSTRUCTIONS FOR CUSTOMERS:
 * 1. After making a copy of the template: File → Make a copy
 * 2. Go to Extensions → Apps Script
 * 3. Delete any existing code
 * 4. Paste this entire script
 * 5. Click the disk icon to Save
 * 6. Click Run (▶️) button
 * 7. Authorize when prompted (one-time only)
 * 8. Done! Formula columns are now protected
 * 
 * You can still VIEW the formulas, but cannot accidentally delete them.
 * To edit data, use columns A-G and I (which remain editable).
 */

function protectFormulaColumns() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Contractor Tracker');
  
  if (!sheet) {
    SpreadsheetApp.getUi().alert(
      '❌ Error',
      'Sheet "Contractor Tracker" not found. Make sure you are using the correct template.',
      SpreadsheetApp.getUi().ButtonSet.OK
    );
    return;
  }
  
  // Get current user email (owner of this copy)
  const currentUser = Session.getEffectiveUser().getEmail();
  
  // Remove existing protections (if any) to avoid conflicts
  const protections = sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE);
  protections.forEach(protection => {
    protection.remove();
  });
  
  Logger.log('Removed existing protections');
  
  // === PROTECT COLUMN H: 1099 Required? ===
  
  const rangeH = sheet.getRange('H7:H2000');
  const protectionH = rangeH.protect().setDescription('🔒 Auto Formula: 1099 Required?');
  
  // Set warning message
  protectionH.setWarningOnly(true);
  
  Logger.log('Protected column H (1099 Required)');
  
  // === PROTECT COLUMN J: Filing Status ===
  
  const rangeJ = sheet.getRange('J7:J2000');
  const protectionJ = rangeJ.protect().setDescription('🔒 Auto Formula: Filing Status');
  
  protectionJ.setWarningOnly(true);
  
  Logger.log('Protected column J (Filing Status)');
  
  // === PROTECT COLUMN K: Risk Level ===
  
  const rangeK = sheet.getRange('K7:K2000');
  const protectionK = rangeK.protect().setDescription('🔒 Auto Formula: Risk Level');
  
  protectionK.setWarningOnly(true);
  
  Logger.log('Protected column K (Risk Level)');
  
  // === SUCCESS MESSAGE ===
  
  SpreadsheetApp.getUi().alert(
    '✅ Protection Applied!',
    'Formula columns are now protected:\n\n' +
    '🔒 Column H (1099 Required?) - PROTECTED\n' +
    '🔒 Column J (Filing Status) - PROTECTED\n' +
    '🔒 Column K (Risk Level) - PROTECTED\n\n' +
    '✅ You can still:\n' +
    '• View formulas\n' +
    '• Edit columns A-G and I\n' +
    '• Add/delete rows\n\n' +
    '⚠️ If you try to edit protected cells, you will see a warning.\n\n' +
    'This protects your template from accidental formula deletion!',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
  
  Logger.log('Protection setup complete!');
}

/**
 * ALTERNATIVE: Strict Protection (prevents all editing)
 * Use this if you want to completely lock formula columns
 * (No editing allowed, even with warning)
 */
function protectFormulaColumnsStrict() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Contractor Tracker');
  
  if (!sheet) {
    SpreadsheetApp.getUi().alert('Error: Sheet "Contractor Tracker" not found.');
    return;
  }
  
  const currentUser = Session.getEffectiveUser().getEmail();
  
  // Remove existing protections
  const protections = sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE);
  protections.forEach(protection => protection.remove());
  
  // Protect Column H
  const rangeH = sheet.getRange('H7:H2000');
  const protectionH = rangeH.protect().setDescription('🔒 Auto Formula: 1099 Required?');
  protectionH.removeEditors(protectionH.getEditors());
  if (protectionH.canDomainEdit()) {
    protectionH.setDomainEdit(false);
  }
  protectionH.addEditor(currentUser);
  
  // Protect Column J
  const rangeJ = sheet.getRange('J7:J2000');
  const protectionJ = rangeJ.protect().setDescription('🔒 Auto Formula: Filing Status');
  protectionJ.removeEditors(protectionJ.getEditors());
  if (protectionJ.canDomainEdit()) {
    protectionJ.setDomainEdit(false);
  }
  protectionJ.addEditor(currentUser);
  
  // Protect Column K
  const rangeK = sheet.getRange('K7:K2000');
  const protectionK = rangeK.protect().setDescription('🔒 Auto Formula: Risk Level');
  protectionK.removeEditors(protectionK.getEditors());
  if (protectionK.canDomainEdit()) {
    protectionK.setDomainEdit(false);
  }
  protectionK.addEditor(currentUser);
  
  SpreadsheetApp.getUi().alert(
    '✅ Strict Protection Applied!',
    'Formula columns are now LOCKED:\n\n' +
    '🔒 Column H, J, K - LOCKED (cannot edit)\n\n' +
    'Only YOU (the owner) can edit these columns.\n' +
    'All other users are blocked.\n\n' +
    'To unlock: Data → Protected sheets and ranges → Delete protection',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

/**
 * Optional: Add custom menu to make it easier
 * This creates a menu in the Google Sheets UI
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🔒 Fix1099 Protection')
      .addItem('✅ Apply Protection (Warning Mode)', 'protectFormulaColumns')
      .addItem('🔐 Apply Strict Protection (Locked)', 'protectFormulaColumnsStrict')
      .addSeparator()
      .addItem('❓ Help', 'showHelp')
      .addToUi();
}

/**
 * Help dialog
 */
function showHelp() {
  const ui = SpreadsheetApp.getUi();
  ui.alert(
    '📖 Fix1099 Protection Help',
    'This script protects formula columns from accidental editing.\n\n' +
    '📋 Two Protection Modes:\n\n' +
    '1️⃣ Warning Mode (Recommended)\n' +
    '   • Shows warning when trying to edit H, J, K\n' +
    '   • You can still edit if you click "OK"\n' +
    '   • Good for preventing accidents\n\n' +
    '2️⃣ Strict Mode (Full Lock)\n' +
    '   • Completely blocks editing H, J, K\n' +
    '   • Only the sheet owner can edit\n' +
    '   • Maximum protection\n\n' +
    '🔓 To Remove Protection:\n' +
    '   Data → Protected sheets and ranges → Click trash icon\n\n' +
    '❓ Questions? Email: airapi2006@gmail.com',
    ui.ButtonSet.OK
  );
}
