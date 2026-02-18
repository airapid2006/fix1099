/**
 * Fix1099 Contractor Tracker - STRICT Formula Protection
 * 
 * 這個版本會完全鎖住公式欄位，用戶無法編輯
 * Users CANNOT edit formula columns at all
 * 
 * HOW TO USE:
 * 1. Open your Google Sheet
 * 2. Extensions → Apps Script
 * 3. Delete all existing code
 * 4. Paste this entire script
 * 5. Click Save (disk icon)
 * 6. Run "setupProtection" function (click Run button)
 * 7. Authorize when prompted
 * 8. Done! Formulas are now locked.
 */

/**
 * Main function: Apply STRICT protection to formula columns
 * This will LOCK columns H, J, K completely
 * Only the sheet owner can edit them
 */
function setupProtection() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Contractor Tracker');
  
  if (!sheet) {
    SpreadsheetApp.getUi().alert(
      'Error',
      'Sheet "Contractor Tracker" not found.\n\nMake sure you are in the correct template.',
      SpreadsheetApp.getUi().ButtonSet.OK
    );
    return;
  }
  
  // Remove any existing protections first
  const existingProtections = sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE);
  existingProtections.forEach(protection => {
    protection.remove();
  });
  
  // Get current user (owner)
  const owner = Session.getEffectiveUser().getEmail();
  
  // Protect Column H: 1099 Required? (STRICT - completely locked)
  const rangeH = sheet.getRange('H7:H2000');
  const protectionH = rangeH.protect().setDescription('🔒 Formula: 1099 Required (Auto-Calculate)');
  protectionH.removeEditors(protectionH.getEditors());
  protectionH.addEditor(owner);
  
  // Protect Column J: Filing Status (STRICT - completely locked)
  const rangeJ = sheet.getRange('J7:J2000');
  const protectionJ = rangeJ.protect().setDescription('🔒 Formula: Filing Status (Auto-Calculate)');
  protectionJ.removeEditors(protectionJ.getEditors());
  protectionJ.addEditor(owner);
  
  // Protect Column K: Risk Level (STRICT - completely locked)
  const rangeK = sheet.getRange('K7:K2000');
  const protectionK = rangeK.protect().setDescription('🔒 Formula: Risk Level (Auto-Calculate)');
  protectionK.removeEditors(protectionK.getEditors());
  protectionK.addEditor(owner);
  
  // Success message
  SpreadsheetApp.getUi().alert(
    '✅ Protection Applied Successfully',
    'Formula columns are now LOCKED:\n\n' +
    '🔒 Column H (1099 Required?)\n' +
    '🔒 Column J (Filing Status)\n' +
    '🔒 Column K (Risk Level)\n\n' +
    'Users CANNOT edit these columns.\n' +
    'Only you (the owner) can edit them.\n\n' +
    'You can edit columns A-G and I normally.',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

/**
 * Creates custom menu when spreadsheet opens
 * NO REMOVE OPTION - customers cannot disable protection
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Fix1099')
    .addItem('📖 Help & Instructions', 'showHelp')
    .addToUi();
}

/**
 * Show help dialog
 */
function showHelp() {
  const helpText = 
    'Fix1099 Contractor Tracker - Help\n\n' +
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
    '🔒 PROTECTED COLUMNS (Locked):\n' +
    '• Column H: 1099 Required?\n' +
    '• Column J: Filing Status\n' +
    '• Column K: Risk Level\n\n' +
    'These columns are LOCKED and calculate automatically.\n' +
    'You cannot edit them.\n\n' +
    '✏️ YOU CAN EDIT:\n' +
    '• Column A: Contractor Name\n' +
    '• Column B: Email\n' +
    '• Column C: Phone\n' +
    '• Column D: TIN/W-9 Status\n' +
    '• Column E: Contract Status\n' +
    '• Column F: Service Type\n' +
    '• Column G: Total Paid 2026\n' +
    '• Column I: W-9 Received?\n\n' +
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
    '📧 Support:\n' +
    'Email: ai.rapid2006@gmail.com\n' +
    'Phone: (818) 925-5239\n\n' +
    'Need help? Contact us anytime!';
    
  SpreadsheetApp.getUi().alert(
    'Fix1099 - Help & Instructions',
    helpText,
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

/**
 * OWNER ONLY: Remove all protections
 * This function is NOT in the menu
 * Can only be run manually from script editor by the owner
 */
function removeAllProtections() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Contractor Tracker');
  const protections = sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE);
  
  protections.forEach(protection => {
    protection.remove();
  });
  
  SpreadsheetApp.getUi().alert(
    'Protection Removed',
    'All formula protections have been removed.\n\nYou can now edit all columns.',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}
