#!/usr/bin/env python3
"""
Fix1099 Contractor Control System - Google Sheet Creator
Creates a complete, ready-to-use Google Sheet with all formulas, dropdowns, and formatting
"""

import gspread
from google.oauth2.service_account import Credentials
import json
import os

# Google Sheets API Scopes
SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive'
]

def create_fix1099_sheet():
    """Create the Fix1099 Contractor Control System Google Sheet"""
    
    print("🚀 Starting Fix1099 Google Sheet creation...")
    
    # Check for credentials
    creds_file = 'credentials.json'
    if not os.path.exists(creds_file):
        print("\n❌ Error: credentials.json not found!")
        print("\n📋 To create the sheet, you need to:")
        print("1. Go to https://console.cloud.google.com/")
        print("2. Create a new project (or use existing)")
        print("3. Enable Google Sheets API and Google Drive API")
        print("4. Create Service Account credentials")
        print("5. Download credentials.json and place it here")
        print("\n🔗 Quick guide: https://docs.gspread.org/en/latest/oauth2.html")
        return None
    
    # Authenticate
    print("🔐 Authenticating with Google...")
    creds = Credentials.from_service_account_file(creds_file, scopes=SCOPES)
    client = gspread.authorize(creds)
    
    # Create new spreadsheet
    print("📄 Creating new spreadsheet...")
    spreadsheet = client.create('Fix1099 Contractor Control System - 2026')
    sheet = spreadsheet.sheet1
    sheet.update_title('Contractor Tracker')
    
    print("✍️ Setting up structure...")
    
    # === DASHBOARD SECTION (Rows 1-5) ===
    sheet.update('A1', 'Fix1099 Contractor Dashboard')
    
    # Summary formulas
    sheet.update('A3:B6', [
        ['Total Contractors:', '=COUNTA(A7:A206)'],
        ['Total 1099 Required:', '=COUNTIF(G7:G206,"YES")'],
        ['Total Pending:', '=COUNTIF(I7:I206,"Pending")'],
        ['Total Completed:', '=COUNTIF(I7:I206,"Completed")']
    ])
    
    # === HEADER ROW (Row 6) ===
    headers = [
        'Contractor Name',
        'Email',
        'Phone',
        'W-9 Received',
        'Contract Signed',
        'Total Paid 2026',
        '1099 Required',
        '1099 Filed',
        'Filing Status',
        'Risk Level',
        'Notes'
    ]
    
    sheet.update('A6:K6', [headers])
    
    print("🎨 Applying formatting...")
    
    # Format title
    sheet.format('A1', {
        'textFormat': {'fontSize': 18, 'bold': True, 'foregroundColor': {'red': 0.4, 'green': 0.49, 'blue': 0.92}},
    })
    
    # Format header row
    sheet.format('A6:K6', {
        'backgroundColor': {'red': 0.4, 'green': 0.49, 'blue': 0.92},
        'textFormat': {'foregroundColor': {'red': 1, 'green': 1, 'blue': 1}, 'bold': True},
        'horizontalAlignment': 'CENTER'
    })
    
    # Format summary labels
    sheet.format('A3:A6', {
        'textFormat': {'bold': True}
    })
    
    print("📊 Adding formulas...")
    
    # Add formulas for all 200 rows
    formulas = []
    for row in range(7, 207):  # Rows 7-206
        formulas.append([
            '',  # A: Contractor Name
            '',  # B: Email
            '',  # C: Phone
            '',  # D: W-9 Received
            '',  # E: Contract Signed
            '',  # F: Total Paid 2026
            f'=IF(F{row}>=600,"YES","NO")',  # G: 1099 Required
            '',  # H: 1099 Filed
            f'=IF(G{row}="YES",IF(H{row}="YES","Completed","Pending"),"Not Required")',  # I: Filing Status
            f'=IF(AND(G{row}="YES",H{row}<>"YES",D{row}<>"YES"),"High",IF(AND(G{row}="YES",H{row}<>"YES"),"Medium","Low"))',  # J: Risk Level
            ''   # K: Notes
        ])
    
    sheet.update('A7:K206', formulas)
    
    print("📋 Setting up dropdowns...")
    
    # D: W-9 Received dropdown (YES/NO)
    sheet.update('D7:D206', [[''] for _ in range(200)])
    sheet.add_validation('D7:D206', 
        gspread.DataValidation.create_from_values(['YES', 'NO']))
    
    # E: Contract Signed dropdown (YES/NO)
    sheet.update('E7:E206', [[''] for _ in range(200)])
    sheet.add_validation('E7:E206',
        gspread.DataValidation.create_from_values(['YES', 'NO']))
    
    # H: 1099 Filed dropdown (YES/NO)
    sheet.update('H7:H206', [[''] for _ in range(200)])
    sheet.add_validation('H7:H206',
        gspread.DataValidation.create_from_values(['YES', 'NO']))
    
    print("💰 Formatting currency...")
    
    # F: Currency format
    sheet.format('F7:F206', {
        'numberFormat': {'type': 'CURRENCY', 'pattern': '$#,##0.00'}
    })
    
    print("🎨 Adding conditional formatting...")
    
    # Conditional formatting rules
    requests = []
    
    # Rule 1: Light red for High Risk
    requests.append({
        'addConditionalFormatRule': {
            'rule': {
                'ranges': [{
                    'sheetId': sheet.id,
                    'startRowIndex': 6,
                    'endRowIndex': 206,
                    'startColumnIndex': 0,
                    'endColumnIndex': 11
                }],
                'booleanRule': {
                    'condition': {
                        'type': 'CUSTOM_FORMULA',
                        'values': [{'userEnteredValue': '=$J7="High"'}]
                    },
                    'format': {
                        'backgroundColor': {'red': 0.98, 'green': 0.91, 'blue': 0.90}
                    }
                }
            },
            'index': 0
        }
    })
    
    # Rule 2: Light yellow for Medium Risk
    requests.append({
        'addConditionalFormatRule': {
            'rule': {
                'ranges': [{
                    'sheetId': sheet.id,
                    'startRowIndex': 6,
                    'endRowIndex': 206,
                    'startColumnIndex': 0,
                    'endColumnIndex': 11
                }],
                'booleanRule': {
                    'condition': {
                        'type': 'CUSTOM_FORMULA',
                        'values': [{'userEnteredValue': '=$J7="Medium"'}]
                    },
                    'format': {
                        'backgroundColor': {'red': 1, 'green': 0.95, 'blue': 0.80}
                    }
                }
            },
            'index': 1
        }
    })
    
    # Rule 3: Light green for Completed
    requests.append({
        'addConditionalFormatRule': {
            'rule': {
                'ranges': [{
                    'sheetId': sheet.id,
                    'startRowIndex': 6,
                    'endRowIndex': 206,
                    'startColumnIndex': 0,
                    'endColumnIndex': 11
                }],
                'booleanRule': {
                    'condition': {
                        'type': 'CUSTOM_FORMULA',
                        'values': [{'userEnteredValue': '=$I7="Completed"'}]
                    },
                    'format': {
                        'backgroundColor': {'red': 0.85, 'green': 0.92, 'blue': 0.83}
                    }
                }
            },
            'index': 2
        }
    })
    
    # Apply conditional formatting
    spreadsheet.batch_update({'requests': requests})
    
    print("❄️ Freezing header rows...")
    
    # Freeze first 6 rows
    spreadsheet.batch_update({
        'requests': [{
            'updateSheetProperties': {
                'properties': {
                    'sheetId': sheet.id,
                    'gridProperties': {'frozenRowCount': 6}
                },
                'fields': 'gridProperties.frozenRowCount'
            }
        }]
    })
    
    print("📏 Adjusting column widths...")
    
    # Set column widths
    column_widths = [
        (0, 180),   # A: Contractor Name
        (1, 220),   # B: Email
        (2, 130),   # C: Phone
        (3, 110),   # D: W-9 Received
        (4, 130),   # E: Contract Signed
        (5, 140),   # F: Total Paid 2026
        (6, 120),   # G: 1099 Required
        (7, 100),   # H: 1099 Filed
        (8, 120),   # I: Filing Status
        (9, 100),   # J: Risk Level
        (10, 200),  # K: Notes
    ]
    
    width_requests = []
    for col_index, width in column_widths:
        width_requests.append({
            'updateDimensionProperties': {
                'range': {
                    'sheetId': sheet.id,
                    'dimension': 'COLUMNS',
                    'startIndex': col_index,
                    'endIndex': col_index + 1
                },
                'properties': {'pixelSize': width},
                'fields': 'pixelSize'
            }
        })
    
    spreadsheet.batch_update({'requests': width_requests})
    
    print("📝 Adding sample data...")
    
    # Add sample data
    sample_data = [
        ['ABC Contracting LLC', 'contact@abccontract.com', '(555) 123-4567', 'YES', 'YES', 15000, '', '', '', '', 'Main contractor'],
        ['John Smith Consulting', 'john@jsconsult.com', '(555) 234-5678', 'NO', 'YES', 450, '', '', '', '', 'One-time project'],
        ['Tech Solutions Inc', 'info@techsol.com', '(555) 345-6789', 'YES', 'YES', 8500, '', '', '', '', 'IT support services'],
        ['Creative Design Co', 'hello@creativedesign.co', '(555) 456-7890', 'YES', 'NO', 3200, '', '', '', '', 'Graphic design work']
    ]
    
    sheet.update('A7:K10', sample_data)
    
    print("🔒 Setting permissions...")
    
    # Share with anyone (view only)
    try:
        spreadsheet.share('', perm_type='anyone', role='reader')
    except:
        print("⚠️ Could not set public sharing (may require domain admin)")
    
    # Get the URL
    url = spreadsheet.url
    
    print("\n" + "="*70)
    print("✅ SUCCESS! Your Fix1099 Google Sheet is ready!")
    print("="*70)
    print(f"\n🔗 Sheet URL: {url}")
    print(f"\n📊 Sheet ID: {spreadsheet.id}")
    print(f"\n📝 Sheet Name: {spreadsheet.title}")
    print("\n" + "="*70)
    print("\n✨ Features included:")
    print("  ✓ Dashboard with live statistics")
    print("  ✓ Auto 1099 Required calculation (≥$600)")
    print("  ✓ Auto Filing Status (Completed/Pending/Not Required)")
    print("  ✓ Auto Risk Level (High/Medium/Low)")
    print("  ✓ Dropdowns for W-9, Contract, 1099 Filed")
    print("  ✓ Conditional formatting (Red=High Risk, Yellow=Medium, Green=Completed)")
    print("  ✓ Currency formatting for payments")
    print("  ✓ 4 sample contractors (you can delete them)")
    print("  ✓ 200 data rows ready to use")
    print("\n📱 Mobile-friendly: Works perfectly in Google Sheets app")
    print("\n🎯 Next steps:")
    print("  1. Open the URL above")
    print("  2. Click 'File → Make a copy' to save to your Drive")
    print("  3. Delete sample data (rows 7-10) if desired")
    print("  4. Start entering your contractors!")
    print("\n" + "="*70)
    
    return url

if __name__ == '__main__':
    try:
        url = create_fix1099_sheet()
        if url:
            print(f"\n✅ Done! Open your sheet: {url}\n")
    except Exception as e:
        print(f"\n❌ Error: {e}")
        print("\n💡 Make sure you have:")
        print("  1. Created a Google Cloud Project")
        print("  2. Enabled Google Sheets API and Drive API")
        print("  3. Created Service Account credentials")
        print("  4. Downloaded credentials.json to this directory")
        print("\n📖 Guide: https://docs.gspread.org/en/latest/oauth2.html\n")
