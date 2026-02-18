/**
 * 1099 Compliance Setup - Google Apps Script Backend
 * Handles contractor data collection, W-9 forms, and 1099 filing automation
 */

// Configuration
const CONFIG = {
  SPREADSHEET_ID: 'YOUR_SPREADSHEET_ID', // Replace with your Google Sheet ID
  CONTRACTOR_SHEET: 'Contractors',
  PAYMENTS_SHEET: 'Payments',
  THRESHOLD_AMOUNT: 600,
  TAX_YEAR: new Date().getFullYear(),
  FILING_DEADLINE_CONTRACTOR: new Date(new Date().getFullYear() + 1, 0, 31), // Jan 31
  FILING_DEADLINE_IRS: new Date(new Date().getFullYear() + 1, 2, 31), // March 31
  TWILIO_ACCOUNT_SID: 'YOUR_TWILIO_SID',
  TWILIO_AUTH_TOKEN: 'YOUR_TWILIO_TOKEN',
  TWILIO_PHONE: '+18189255239',
  STRIPE_SECRET_KEY: 'YOUR_STRIPE_SECRET_KEY'
};

/**
 * Web App Entry Point
 */
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('1099 Compliance Setup')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function doPost(e) {
  const action = e.parameter.action;
  
  switch(action) {
    case 'addContractor':
      return addContractor(e.parameter);
    case 'addPayment':
      return addPayment(e.parameter);
    case 'getContractors':
      return getContractors();
    case 'checkThreshold':
      return checkThreshold(e.parameter.contractorId);
    case 'generate1099':
      return generate1099(e.parameter.contractorId);
    case 'sendSMS':
      return sendSMS(e.parameter);
    case 'processStripePayment':
      return processStripePayment(e.parameter);
    default:
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Invalid action'
      })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Add New Contractor
 */
function addContractor(data) {
  try {
    const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    const sheet = ss.getSheetByName(CONFIG.CONTRACTOR_SHEET);
    
    if (!sheet) {
      ss.insertSheet(CONFIG.CONTRACTOR_SHEET);
      const newSheet = ss.getSheetByName(CONFIG.CONTRACTOR_SHEET);
      newSheet.appendRow([
        'Contractor ID', 'Business Name', 'Legal Name', 'EIN/SSN', 
        'Address', 'City', 'State', 'ZIP', 'Email', 'Phone',
        'W-9 Status', 'W-9 Date', 'Date Added'
      ]);
    }
    
    const contractorId = Utilities.getUuid();
    const timestamp = new Date();
    
    sheet.appendRow([
      contractorId,
      data.businessName || '',
      data.legalName || '',
      data.taxId || '',
      data.address || '',
      data.city || '',
      data.state || '',
      data.zip || '',
      data.email || '',
      data.phone || '',
      'Pending',
      '',
      timestamp
    ]);
    
    // Send W-9 request email
    sendW9Request(data.email, data.businessName);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      contractorId: contractorId,
      message: 'Contractor added successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Add Payment Record
 */
function addPayment(data) {
  try {
    const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    let sheet = ss.getSheetByName(CONFIG.PAYMENTS_SHEET);
    
    if (!sheet) {
      ss.insertSheet(CONFIG.PAYMENTS_SHEET);
      sheet = ss.getSheetByName(CONFIG.PAYMENTS_SHEET);
      sheet.appendRow([
        'Payment ID', 'Contractor ID', 'Contractor Name', 'Amount', 
        'Payment Date', 'Payment Method', 'Description', 'Tax Year',
        'Date Recorded'
      ]);
    }
    
    const paymentId = Utilities.getUuid();
    const timestamp = new Date();
    
    sheet.appendRow([
      paymentId,
      data.contractorId || '',
      data.contractorName || '',
      parseFloat(data.amount) || 0,
      new Date(data.paymentDate) || timestamp,
      data.paymentMethod || 'Check',
      data.description || '',
      data.taxYear || CONFIG.TAX_YEAR,
      timestamp
    ]);
    
    // Check if contractor exceeds $600 threshold
    const totalPaid = calculateContractorTotal(data.contractorId, data.taxYear);
    if (totalPaid >= CONFIG.THRESHOLD_AMOUNT) {
      sendThresholdAlert(data.contractorId);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      paymentId: paymentId,
      totalPaid: totalPaid,
      needs1099: totalPaid >= CONFIG.THRESHOLD_AMOUNT
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Get All Contractors
 */
function getContractors() {
  try {
    const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    const sheet = ss.getSheetByName(CONFIG.CONTRACTOR_SHEET);
    
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        contractors: []
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const contractors = [];
    
    for (let i = 1; i < data.length; i++) {
      const contractor = {};
      for (let j = 0; j < headers.length; j++) {
        contractor[headers[j]] = data[i][j];
      }
      contractor.totalPaid = calculateContractorTotal(contractor['Contractor ID']);
      contractor.needs1099 = contractor.totalPaid >= CONFIG.THRESHOLD_AMOUNT;
      contractors.push(contractor);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      contractors: contractors
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Calculate Contractor Total Payments
 */
function calculateContractorTotal(contractorId, taxYear) {
  taxYear = taxYear || CONFIG.TAX_YEAR;
  
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = ss.getSheetByName(CONFIG.PAYMENTS_SHEET);
  
  if (!sheet) return 0;
  
  const data = sheet.getDataRange().getValues();
  let total = 0;
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][1] === contractorId && data[i][7] === taxYear) {
      total += parseFloat(data[i][3]) || 0;
    }
  }
  
  return total;
}

/**
 * Check if Contractor Exceeds Threshold
 */
function checkThreshold(contractorId) {
  try {
    const total = calculateContractorTotal(contractorId);
    const needs1099 = total >= CONFIG.THRESHOLD_AMOUNT;
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      contractorId: contractorId,
      totalPaid: total,
      threshold: CONFIG.THRESHOLD_AMOUNT,
      needs1099: needs1099,
      difference: needs1099 ? 0 : CONFIG.THRESHOLD_AMOUNT - total
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Generate 1099-NEC Form
 */
function generate1099(contractorId) {
  try {
    const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    const contractorSheet = ss.getSheetByName(CONFIG.CONTRACTOR_SHEET);
    const data = contractorSheet.getDataRange().getValues();
    
    let contractor = null;
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === contractorId) {
        contractor = {
          id: data[i][0],
          businessName: data[i][1],
          legalName: data[i][2],
          taxId: data[i][3],
          address: data[i][4],
          city: data[i][5],
          state: data[i][6],
          zip: data[i][7],
          email: data[i][8]
        };
        break;
      }
    }
    
    if (!contractor) {
      throw new Error('Contractor not found');
    }
    
    const totalPaid = calculateContractorTotal(contractorId);
    
    if (totalPaid < CONFIG.THRESHOLD_AMOUNT) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Contractor does not meet $600 threshold'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Create 1099-NEC PDF
    const doc = DocumentApp.create('1099-NEC-' + contractor.businessName + '-' + CONFIG.TAX_YEAR);
    const body = doc.getBody();
    
    body.appendParagraph('FORM 1099-NEC').setHeading(DocumentApp.ParagraphHeading.HEADING1);
    body.appendParagraph('Tax Year: ' + CONFIG.TAX_YEAR);
    body.appendParagraph('');
    body.appendParagraph('PAYER INFORMATION:');
    body.appendParagraph('Your Business Name');
    body.appendParagraph('Your Business Address');
    body.appendParagraph('');
    body.appendParagraph('RECIPIENT INFORMATION:');
    body.appendParagraph('Business Name: ' + contractor.businessName);
    body.appendParagraph('Legal Name: ' + contractor.legalName);
    body.appendParagraph('EIN/SSN: ' + contractor.taxId);
    body.appendParagraph('Address: ' + contractor.address);
    body.appendParagraph('City, State ZIP: ' + contractor.city + ', ' + contractor.state + ' ' + contractor.zip);
    body.appendParagraph('');
    body.appendParagraph('Box 1. Nonemployee compensation: $' + totalPaid.toFixed(2));
    
    doc.saveAndClose();
    
    const docUrl = doc.getUrl();
    const pdfBlob = doc.getAs('application/pdf');
    
    // Send 1099 to contractor
    MailApp.sendEmail({
      to: contractor.email,
      subject: '1099-NEC Form for Tax Year ' + CONFIG.TAX_YEAR,
      body: 'Please find attached your 1099-NEC form for tax year ' + CONFIG.TAX_YEAR + '.\n\nTotal payments: $' + totalPaid.toFixed(2),
      attachments: [pdfBlob]
    });
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      contractorId: contractorId,
      totalPaid: totalPaid,
      documentUrl: docUrl,
      message: '1099-NEC generated and emailed to contractor'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Send W-9 Request Email
 */
function sendW9Request(email, businessName) {
  const subject = 'W-9 Form Request - Action Required';
  const body = `Dear ${businessName},

To comply with IRS regulations, we need you to complete a W-9 form.

Please download and complete the W-9 form:
https://www.irs.gov/pub/irs-pdf/fw9.pdf

Return the completed form to this email address.

Thank you for your cooperation!

Best regards,
Your Business Name`;

  MailApp.sendEmail(email, subject, body);
}

/**
 * Send Threshold Alert
 */
function sendThresholdAlert(contractorId) {
  // Implementation for sending alert when contractor exceeds $600
  Logger.log('Contractor ' + contractorId + ' exceeded $600 threshold');
}

/**
 * Send SMS via Twilio
 */
function sendSMS(data) {
  try {
    const url = 'https://api.twilio.com/2010-04-01/Accounts/' + CONFIG.TWILIO_ACCOUNT_SID + '/Messages.json';
    
    const payload = {
      'To': data.to,
      'From': CONFIG.TWILIO_PHONE,
      'Body': data.message
    };
    
    const options = {
      'method': 'post',
      'payload': payload,
      'headers': {
        'Authorization': 'Basic ' + Utilities.base64Encode(CONFIG.TWILIO_ACCOUNT_SID + ':' + CONFIG.TWILIO_AUTH_TOKEN)
      }
    };
    
    const response = UrlFetchApp.fetch(url, options);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'SMS sent successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Process Stripe Payment
 */
function processStripePayment(data) {
  try {
    const url = 'https://api.stripe.com/v1/payment_intents';
    
    const payload = {
      'amount': data.amount * 100, // Convert to cents
      'currency': 'usd',
      'payment_method': data.paymentMethodId,
      'confirm': true
    };
    
    const options = {
      'method': 'post',
      'payload': payload,
      'headers': {
        'Authorization': 'Bearer ' + CONFIG.STRIPE_SECRET_KEY
      }
    };
    
    const response = UrlFetchApp.fetch(url, options);
    const result = JSON.parse(response.getContentText());
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      paymentIntent: result
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Setup Deadline Reminders (Run this as a trigger)
 */
function setupDeadlineReminders() {
  const triggers = ScriptApp.getProjectTriggers();
  
  // Remove existing triggers
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
  
  // Create daily trigger to check deadlines
  ScriptApp.newTrigger('checkDeadlines')
    .timeBased()
    .atHour(9)
    .everyDays(1)
    .create();
}

/**
 * Check Filing Deadlines
 */
function checkDeadlines() {
  const today = new Date();
  const daysUntilContractorDeadline = Math.floor((CONFIG.FILING_DEADLINE_CONTRACTOR - today) / (1000 * 60 * 60 * 24));
  const daysUntilIRSDeadline = Math.floor((CONFIG.FILING_DEADLINE_IRS - today) / (1000 * 60 * 60 * 24));
  
  // Send reminders at 30, 14, 7, 3, and 1 days before deadline
  const reminderDays = [30, 14, 7, 3, 1];
  
  if (reminderDays.includes(daysUntilContractorDeadline)) {
    sendDeadlineReminder('contractor', daysUntilContractorDeadline);
  }
  
  if (reminderDays.includes(daysUntilIRSDeadline)) {
    sendDeadlineReminder('irs', daysUntilIRSDeadline);
  }
}

/**
 * Send Deadline Reminder Email
 */
function sendDeadlineReminder(type, daysRemaining) {
  const subject = '1099 Filing Deadline Reminder - ' + daysRemaining + ' Days Remaining';
  const body = type === 'contractor' 
    ? `Reminder: You have ${daysRemaining} days until the contractor filing deadline (January 31st).`
    : `Reminder: You have ${daysRemaining} days until the IRS filing deadline (March 31st).`;
    
  // Send to admin email
  MailApp.sendEmail('your-admin-email@example.com', subject, body);
}

/**
 * Generate Annual Report
 */
function generateAnnualReport(taxYear) {
  taxYear = taxYear || CONFIG.TAX_YEAR;
  
  const contractors = JSON.parse(getContractors().getContent()).contractors;
  const contractorsNeeding1099 = contractors.filter(c => c.needs1099);
  
  const report = {
    taxYear: taxYear,
    totalContractors: contractors.length,
    contractorsNeeding1099: contractorsNeeding1099.length,
    totalPaid: contractors.reduce((sum, c) => sum + c.totalPaid, 0),
    reportDate: new Date()
  };
  
  return report;
}
