#!/usr/bin/env python3
"""
Fix1099 Contractor Control System - Excel Template Creator
Creates a complete Excel file that can be uploaded to Google Drive and converted to Google Sheets
All formulas, dropdowns, and formatting will be preserved!
"""

import xlsxwriter
from datetime import datetime

def create_fix1099_excel():
    """Create the Fix1099 Contractor Control System Excel file"""
    
    print("🚀 Creating Fix1099 Excel Template...")
    
    # Create workbook
    filename = 'Fix1099_Contractor_Control_System_2026.xlsx'
    workbook = xlsxwriter.Workbook(filename)
    worksheet = workbook.add_worksheet('Contractor Tracker')
    
    # === DEFINE FORMATS ===
    
    # Title format
    title_format = workbook.add_format({
        'font_size': 18,
        'bold': True,
        'font_color': '#667eea',
        'valign': 'vcenter'
    })
    
    # Header format (purple background)
    header_format = workbook.add_format({
        'bold': True,
        'font_color': 'white',
        'bg_color': '#667eea',
        'align': 'center',
        'valign': 'vcenter',
        'border': 1
    })
    
    # Summary label format
    summary_label_format = workbook.add_format({
        'bold': True,
        'font_size': 11
    })
    
    # Summary value format
    summary_value_format = workbook.add_format({
        'num_format': '0',
        'font_size': 11,
        'bold': True,
        'font_color': '#667eea'
    })
    
    # Currency format
    currency_format = workbook.add_format({
        'num_format': '$#,##0.00',
        'align': 'right'
    })
    
    # Data format (standard)
    data_format = workbook.add_format({
        'valign': 'vcenter'
    })
    
    # Conditional formats
    red_format = workbook.add_format({
        'bg_color': '#fce8e6',
        'valign': 'vcenter'
    })
    
    yellow_format = workbook.add_format({
        'bg_color': '#fff4cc',
        'valign': 'vcenter'
    })
    
    green_format = workbook.add_format({
        'bg_color': '#d9ead3',
        'valign': 'vcenter'
    })
    
    print("✍️ Writing dashboard...")
    
    # === ROW 1: TITLE ===
    worksheet.write('A1', 'Fix1099 Contractor Dashboard', title_format)
    worksheet.set_row(0, 24)  # Row height
    
    # === ROWS 3-6: DASHBOARD SUMMARY ===
    worksheet.write('A3', 'Total Contractors:', summary_label_format)
    worksheet.write('B3', '=COUNTA(A7:A206)', summary_value_format)
    
    worksheet.write('A4', 'Total 1099 Required:', summary_label_format)
    worksheet.write('B4', '=COUNTIF(G7:G206,"YES")', summary_value_format)
    
    worksheet.write('A5', 'Total Pending:', summary_label_format)
    worksheet.write('B5', '=COUNTIF(I7:I206,"Pending")', summary_value_format)
    
    worksheet.write('A6', 'Total Completed:', summary_label_format)
    worksheet.write('B6', '=COUNTIF(I7:I206,"Completed")', summary_value_format)
    
    print("✍️ Writing headers...")
    
    # === ROW 6 (index 5): HEADER ROW ===
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
    
    for col, header in enumerate(headers):
        worksheet.write(5, col, header, header_format)
    
    worksheet.set_row(5, 20)  # Header row height
    
    print("📊 Adding formulas and data validation...")
    
    # === ROWS 7-206: DATA ROWS (200 rows) ===
    for row in range(6, 206):  # Excel rows 7-206 (0-indexed: 6-205)
        excel_row = row + 1  # Excel row number (1-indexed)
        
        # A-C: Text fields (empty)
        worksheet.write(row, 0, '', data_format)  # Contractor Name
        worksheet.write(row, 1, '', data_format)  # Email
        worksheet.write(row, 2, '', data_format)  # Phone
        
        # D: W-9 Received (dropdown)
        worksheet.write(row, 3, '', data_format)
        worksheet.data_validation(row, 3, row, 3, {
            'validate': 'list',
            'source': ['YES', 'NO'],
            'input_message': 'Select YES or NO'
        })
        
        # E: Contract Signed (dropdown)
        worksheet.write(row, 4, '', data_format)
        worksheet.data_validation(row, 4, row, 4, {
            'validate': 'list',
            'source': ['YES', 'NO'],
            'input_message': 'Select YES or NO'
        })
        
        # F: Total Paid 2026 (currency)
        worksheet.write(row, 5, '', currency_format)
        
        # G: 1099 Required (auto formula)
        formula_g = f'=IF(F{excel_row}>=600,"YES","NO")'
        worksheet.write_formula(row, 6, formula_g, data_format)
        
        # H: 1099 Filed (dropdown)
        worksheet.write(row, 7, '', data_format)
        worksheet.data_validation(row, 7, row, 7, {
            'validate': 'list',
            'source': ['YES', 'NO'],
            'input_message': 'Select YES or NO'
        })
        
        # I: Filing Status (auto formula)
        formula_i = f'=IF(G{excel_row}="YES",IF(H{excel_row}="YES","Completed","Pending"),"Not Required")'
        worksheet.write_formula(row, 8, formula_i, data_format)
        
        # J: Risk Level (auto formula)
        formula_j = f'=IF(AND(G{excel_row}="YES",H{excel_row}<>"YES",D{excel_row}<>"YES"),"High",IF(AND(G{excel_row}="YES",H{excel_row}<>"YES"),"Medium","Low"))'
        worksheet.write_formula(row, 9, formula_j, data_format)
        
        # K: Notes
        worksheet.write(row, 10, '', data_format)
    
    print("🎨 Applying conditional formatting...")
    
    # === CONDITIONAL FORMATTING ===
    
    # Rule 1: Red background for High Risk
    worksheet.conditional_format('A7:K206', {
        'type': 'formula',
        'criteria': '=$J7="High"',
        'format': red_format
    })
    
    # Rule 2: Yellow background for Medium Risk
    worksheet.conditional_format('A7:K206', {
        'type': 'formula',
        'criteria': '=$J7="Medium"',
        'format': yellow_format
    })
    
    # Rule 3: Green background for Completed
    worksheet.conditional_format('A7:K206', {
        'type': 'formula',
        'criteria': '=$I7="Completed"',
        'format': green_format
    })
    
    print("📝 Adding sample data...")
    
    # === SAMPLE DATA (Rows 7-10) ===
    sample_data = [
        ['ABC Contracting LLC', 'contact@abccontract.com', '(555) 123-4567', 'YES', 'YES', 15000, '', '', '', '', 'Main contractor - annual retainer'],
        ['John Smith Consulting', 'john@jsconsult.com', '(555) 234-5678', 'NO', 'YES', 450, '', '', '', '', 'One-time project - under threshold'],
        ['Tech Solutions Inc', 'info@techsol.com', '(555) 345-6789', 'YES', 'YES', 8500, '', 'YES', '', '', 'IT support - filed 1099'],
        ['Creative Design Co', 'hello@creativedesign.co', '(555) 456-7890', 'YES', 'NO', 3200, '', '', '', '', 'Graphic design - pending contract']
    ]
    
    for row_idx, row_data in enumerate(sample_data):
        row_num = 6 + row_idx  # Excel row 7-10 (0-indexed: 6-9)
        for col_idx, value in enumerate(row_data):
            if col_idx == 5:  # Total Paid column
                worksheet.write(row_num, col_idx, value, currency_format)
            elif col_idx in [6, 8, 9]:  # Formula columns - skip, already have formulas
                continue
            else:
                worksheet.write(row_num, col_idx, value, data_format)
    
    print("📏 Setting column widths...")
    
    # === COLUMN WIDTHS ===
    worksheet.set_column('A:A', 22)   # Contractor Name
    worksheet.set_column('B:B', 28)   # Email
    worksheet.set_column('C:C', 16)   # Phone
    worksheet.set_column('D:D', 13)   # W-9 Received
    worksheet.set_column('E:E', 15)   # Contract Signed
    worksheet.set_column('F:F', 16)   # Total Paid 2026
    worksheet.set_column('G:G', 14)   # 1099 Required
    worksheet.set_column('H:H', 12)   # 1099 Filed
    worksheet.set_column('I:I', 14)   # Filing Status
    worksheet.set_column('J:J', 11)   # Risk Level
    worksheet.set_column('K:K', 25)   # Notes
    
    # === FREEZE PANES ===
    worksheet.freeze_panes(6, 0)  # Freeze first 6 rows
    
    # === PROTECTION (Optional) ===
    # Protect formula columns from editing
    # worksheet.protect()
    
    print("💾 Saving file...")
    
    # Close workbook
    workbook.close()
    
    print("\n" + "="*70)
    print("✅ SUCCESS! Excel file created!")
    print("="*70)
    print(f"\n📄 Filename: {filename}")
    print(f"\n📊 Contains:")
    print("  ✓ Dashboard with 4 live statistics")
    print("  ✓ 11 columns with proper formatting")
    print("  ✓ Auto formulas for 1099 Required, Filing Status, Risk Level")
    print("  ✓ Dropdowns for W-9, Contract, 1099 Filed")
    print("  ✓ Conditional formatting (Red/Yellow/Green)")
    print("  ✓ Currency formatting for payments")
    print("  ✓ 4 sample contractors")
    print("  ✓ 200 data rows (rows 7-206)")
    print("\n" + "="*70)
    print("\n🎯 Next Steps:")
    print("  1. Download the file below")
    print("  2. Go to drive.google.com")
    print("  3. Click 'New' → 'File upload'")
    print("  4. Select the downloaded .xlsx file")
    print("  5. Right-click the uploaded file → 'Open with' → 'Google Sheets'")
    print("  6. All formulas, dropdowns, and formatting will be preserved!")
    print("\n📱 Alternatively: Email the file to yourself and open in Google Sheets app")
    print("\n" + "="*70)
    
    return filename

if __name__ == '__main__':
    try:
        filename = create_fix1099_excel()
        print(f"\n✅ File ready: {filename}\n")
    except Exception as e:
        print(f"\n❌ Error: {e}\n")
