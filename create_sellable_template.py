#!/usr/bin/env python3
"""
Fix1099 Sellable Template Creator
Creates a production-ready Google Sheet template with all features
"""

import xlsxwriter
from datetime import datetime

def create_sellable_template():
    """Create the sellable Fix1099 template"""
    
    print("🚀 Creating Fix1099 Sellable Template...")
    
    filename = 'Fix1099_Contractor_Tracker_Template.xlsx'
    workbook = xlsxwriter.Workbook(filename)
    
    # === FORMATS ===
    
    # Dashboard title format
    dashboard_title_format = workbook.add_format({
        'font_size': 16,
        'bold': True,
        'font_color': '#667eea',
        'valign': 'vcenter'
    })
    
    # Dashboard label format (purple background)
    dashboard_label_format = workbook.add_format({
        'bold': True,
        'bg_color': '#667eea',
        'font_color': 'white',
        'border': 1,
        'valign': 'vcenter'
    })
    
    # Dashboard value format
    dashboard_value_format = workbook.add_format({
        'num_format': '0',
        'font_size': 12,
        'bold': True,
        'font_color': '#667eea',
        'border': 1,
        'valign': 'vcenter',
        'align': 'center'
    })
    
    # Header format (purple background, white text)
    header_format = workbook.add_format({
        'bold': True,
        'font_color': 'white',
        'bg_color': '#667eea',
        'align': 'center',
        'valign': 'vcenter',
        'border': 1,
        'text_wrap': True
    })
    
    # Currency format
    currency_format = workbook.add_format({
        'num_format': '$#,##0.00',
        'align': 'right',
        'valign': 'vcenter'
    })
    
    # Data format
    data_format = workbook.add_format({
        'valign': 'vcenter'
    })
    
    # Conditional formats
    red_format = workbook.add_format({
        'bg_color': '#fce8e6',
        'valign': 'vcenter'
    })
    
    green_format = workbook.add_format({
        'bg_color': '#d9ead3',
        'valign': 'vcenter'
    })
    
    red_cell_format = workbook.add_format({
        'bg_color': '#ff0000',
        'font_color': 'white',
        'bold': True,
        'valign': 'vcenter'
    })
    
    # ==========================================
    # SHEET 1: CONTRACTOR TRACKER
    # ==========================================
    
    tracker = workbook.add_worksheet('Contractor Tracker')
    
    print("✍️ Creating Dashboard...")
    
    # === DASHBOARD (Rows 2-5, Columns B-C) ===
    
    tracker.write('B2', 'Dashboard', dashboard_title_format)
    
    tracker.write('B3', 'Total Contractors', dashboard_label_format)
    tracker.write('C3', '=COUNTA(A7:A2000)', dashboard_value_format)
    
    tracker.write('B4', 'Total 1099 Required', dashboard_label_format)
    tracker.write('C4', '=COUNTIF(H7:H2000,"YES")', dashboard_value_format)
    
    tracker.write('B5', 'Total Pending', dashboard_label_format)
    tracker.write('C5', '=COUNTIF(J7:J2000,"Pending")', dashboard_value_format)
    
    # Set dashboard column widths
    tracker.set_column('B:B', 20)
    tracker.set_column('C:C', 18)
    
    print("✍️ Writing headers...")
    
    # === HEADER ROW (Row 6) ===
    
    headers = [
        'Contractor Name',
        'Email',
        'Phone',
        'TIN/W-9 Status',
        'Contract Status',
        'Service Type',
        'Total Paid 2026',
        '1099 Required?',
        'W-9 Received?',
        'Filing Status',
        'Risk Level'
    ]
    
    for col, header in enumerate(headers):
        tracker.write(5, col, header, header_format)
    
    tracker.set_row(5, 30)  # Header row height
    
    print("📊 Adding formulas and data validation...")
    
    # === DATA ROWS (7-2000) ===
    
    for row in range(6, 2000):  # Excel rows 7-2000 (0-indexed: 6-1999)
        excel_row = row + 1  # 1-indexed row number
        
        # A: Contractor Name
        tracker.write(row, 0, '', data_format)
        
        # B: Email
        tracker.write(row, 1, '', data_format)
        
        # C: Phone
        tracker.write(row, 2, '', data_format)
        
        # D: TIN/W-9 Status (dropdown)
        tracker.write(row, 3, '', data_format)
        tracker.data_validation(row, 3, row, 3, {
            'validate': 'list',
            'source': ['Missing', 'Requested', 'Received'],
            'input_message': 'Select status'
        })
        
        # E: Contract Status (dropdown)
        tracker.write(row, 4, '', data_format)
        tracker.data_validation(row, 4, row, 4, {
            'validate': 'list',
            'source': ['Not Started', 'Sent', 'Signed'],
            'input_message': 'Select status'
        })
        
        # F: Service Type (dropdown)
        tracker.write(row, 5, '', data_format)
        tracker.data_validation(row, 5, row, 5, {
            'validate': 'list',
            'source': ['Admin', 'Cleaning', 'Marketing', 'IT', 'Consulting', 'Construction', 'Other'],
            'input_message': 'Select service type'
        })
        
        # G: Total Paid 2026 (currency)
        tracker.write(row, 6, '', currency_format)
        
        # H: 1099 Required? (auto formula)
        formula_h = f'=IF($G{excel_row}>=600,"YES","NO")'
        tracker.write_formula(row, 7, formula_h, data_format)
        
        # I: W-9 Received? (dropdown)
        tracker.write(row, 8, '', data_format)
        tracker.data_validation(row, 8, row, 8, {
            'validate': 'list',
            'source': ['YES', 'NO'],
            'input_message': 'Select YES or NO'
        })
        
        # J: Filing Status (auto formula)
        formula_j = f'=IF($H{excel_row}="NO","Not Needed",IF(AND($I{excel_row}="YES",$E{excel_row}="Signed"),"Ready to File","Pending"))'
        tracker.write_formula(row, 9, formula_j, data_format)
        
        # K: Risk Level (auto formula)
        formula_k = f'=IF($H{excel_row}="NO","Low",IF($J{excel_row}="Ready to File","Low",IF(OR($I{excel_row}="NO",$E{excel_row}<>"Signed"),"High","Medium")))'
        tracker.write_formula(row, 10, formula_k, data_format)
    
    print("🎨 Applying conditional formatting...")
    
    # === CONDITIONAL FORMATTING ===
    
    # Rule 1: Red background for High Risk (entire row)
    tracker.conditional_format('A7:K2000', {
        'type': 'formula',
        'criteria': '=$K7="High"',
        'format': red_format
    })
    
    # Rule 2: Green background for Ready to File (entire row)
    tracker.conditional_format('A7:K2000', {
        'type': 'formula',
        'criteria': '=$J7="Ready to File"',
        'format': green_format
    })
    
    # Rule 3: Red cell for missing W-9 (column I only)
    tracker.conditional_format('I7:I2000', {
        'type': 'formula',
        'criteria': '=AND($H7="YES",$I7="NO")',
        'format': red_cell_format
    })
    
    print("📏 Setting column widths...")
    
    # === COLUMN WIDTHS ===
    tracker.set_column('A:A', 22)   # Contractor Name
    tracker.set_column('B:B', 26)   # Email
    tracker.set_column('C:C', 15)   # Phone
    tracker.set_column('D:D', 15)   # TIN/W-9 Status
    tracker.set_column('E:E', 14)   # Contract Status
    tracker.set_column('F:F', 14)   # Service Type
    tracker.set_column('G:G', 16)   # Total Paid 2026
    tracker.set_column('H:H', 14)   # 1099 Required?
    tracker.set_column('I:I', 14)   # W-9 Received?
    tracker.set_column('J:J', 14)   # Filing Status
    tracker.set_column('K:K', 11)   # Risk Level
    
    # === FREEZE PANES ===
    tracker.freeze_panes(6, 1)  # Freeze row 6 (header) and column A
    
    print("📝 Adding sample data...")
    
    # === SAMPLE DATA (Rows 7-10) ===
    sample_data = [
        ['ABC Contracting LLC', 'contact@abccontract.com', '(555) 123-4567', 'Received', 'Signed', 'Construction', 15000, '', 'YES', '', ''],
        ['John Smith Consulting', 'john@jsconsult.com', '(555) 234-5678', 'Missing', 'Sent', 'Consulting', 450, '', 'NO', '', ''],
        ['Tech Solutions Inc', 'info@techsol.com', '(555) 345-6789', 'Received', 'Signed', 'IT', 8500, '', 'YES', '', ''],
        ['Creative Marketing Co', 'hello@creative.co', '(555) 456-7890', 'Requested', 'Not Started', 'Marketing', 3200, '', 'NO', '', '']
    ]
    
    for row_idx, row_data in enumerate(sample_data):
        row_num = 6 + row_idx  # Excel row 7-10
        for col_idx, value in enumerate(row_data):
            if col_idx == 6:  # Total Paid column
                tracker.write(row_num, col_idx, value, currency_format)
            elif col_idx in [7, 9, 10]:  # Formula columns - skip
                continue
            else:
                tracker.write(row_num, col_idx, value, data_format)
    
    # ==========================================
    # SHEET 2: SETUP (READ ME)
    # ==========================================
    
    print("📖 Creating Setup (Read Me) sheet...")
    
    setup = workbook.add_worksheet('Setup (Read Me)')
    
    # Format for setup sheet
    title_format = workbook.add_format({
        'font_size': 20,
        'bold': True,
        'font_color': '#667eea'
    })
    
    heading_format = workbook.add_format({
        'font_size': 14,
        'bold': True,
        'font_color': '#111827',
        'top': 2,
        'bottom': 1
    })
    
    text_format = workbook.add_format({
        'font_size': 11,
        'valign': 'top',
        'text_wrap': True
    })
    
    bullet_format = workbook.add_format({
        'font_size': 11,
        'valign': 'top',
        'text_wrap': True,
        'indent': 1
    })
    
    warning_format = workbook.add_format({
        'font_size': 11,
        'bg_color': '#fef3c7',
        'border': 1,
        'border_color': '#f59e0b',
        'text_wrap': True,
        'valign': 'top'
    })
    
    info_format = workbook.add_format({
        'font_size': 11,
        'bg_color': '#dbeafe',
        'border': 1,
        'border_color': '#3b82f6',
        'text_wrap': True,
        'valign': 'top'
    })
    
    # Set column widths for setup sheet
    setup.set_column('A:A', 80)
    
    row = 0
    
    # Title
    setup.write(row, 0, 'Fix1099 Contractor Tracker - Setup Guide', title_format)
    setup.set_row(row, 30)
    row += 2
    
    # Welcome
    setup.write(row, 0, 'Welcome! This template helps you track contractors and automatically determine 1099 filing requirements.', text_format)
    row += 2
    
    # Section 1: What You Need to Fill
    setup.write(row, 0, '1. What You Need to Fill (Columns A-G and I)', heading_format)
    row += 1
    
    setup.write(row, 0, '• Contractor Name (A) - Full name or business name', bullet_format)
    row += 1
    setup.write(row, 0, '• Email (B) - Contact email address', bullet_format)
    row += 1
    setup.write(row, 0, '• Phone (C) - Contact phone number', bullet_format)
    row += 1
    setup.write(row, 0, '• TIN/W-9 Status (D) - Select: Missing, Requested, or Received', bullet_format)
    row += 1
    setup.write(row, 0, '• Contract Status (E) - Select: Not Started, Sent, or Signed', bullet_format)
    row += 1
    setup.write(row, 0, '• Service Type (F) - Select service category', bullet_format)
    row += 1
    setup.write(row, 0, '• Total Paid 2026 (G) - Enter total amount paid (will auto-format as currency)', bullet_format)
    row += 1
    setup.write(row, 0, '• W-9 Received? (I) - Select YES or NO', bullet_format)
    row += 2
    
    # Important note
    setup.write(row, 0, '⚠️ IMPORTANT: Columns H, J, and K are AUTO-CALCULATED. Do not edit them manually!', warning_format)
    setup.set_row(row, 30)
    row += 2
    
    # Section 2: How Auto-Calculation Works
    setup.write(row, 0, '2. How Auto-Calculation Works', heading_format)
    row += 1
    
    setup.write(row, 0, '1099 Required? (Column H):', bullet_format)
    row += 1
    setup.write(row, 0, '   → If Total Paid >= $600: Shows "YES"', bullet_format)
    row += 1
    setup.write(row, 0, '   → If Total Paid < $600: Shows "NO"', bullet_format)
    row += 2
    
    setup.write(row, 0, 'Filing Status (Column J):', bullet_format)
    row += 1
    setup.write(row, 0, '   → "Not Needed" - When 1099 is not required (paid < $600)', bullet_format)
    row += 1
    setup.write(row, 0, '   → "Ready to File" - When 1099 required AND W-9 received AND contract signed', bullet_format)
    row += 1
    setup.write(row, 0, '   → "Pending" - When 1099 required but missing W-9 or contract signature', bullet_format)
    row += 2
    
    setup.write(row, 0, 'Risk Level (Column K):', bullet_format)
    row += 1
    setup.write(row, 0, '   → "Low" - No 1099 needed OR ready to file', bullet_format)
    row += 1
    setup.write(row, 0, '   → "Medium" - 1099 needed but status is pending', bullet_format)
    row += 1
    setup.write(row, 0, '   → "High" - 1099 needed but W-9 not received OR contract not signed', bullet_format)
    row += 2
    
    # Section 3: Color Coding
    setup.write(row, 0, '3. Understanding Row Colors', heading_format)
    row += 1
    
    setup.write(row, 0, '🔴 Light Red Background - HIGH RISK', bullet_format)
    row += 1
    setup.write(row, 0, '   Action needed: Get W-9 form and/or contract signed immediately!', bullet_format)
    row += 2
    
    setup.write(row, 0, '🟢 Light Green Background - READY TO FILE', bullet_format)
    row += 1
    setup.write(row, 0, '   All requirements met. You can file 1099 for this contractor.', bullet_format)
    row += 2
    
    setup.write(row, 0, '⚠️ Red Cell in W-9 Column (I) - MISSING W-9', bullet_format)
    row += 1
    setup.write(row, 0, '   This contractor needs 1099 but W-9 is marked as "NO". Request it ASAP!', bullet_format)
    row += 2
    
    # Section 4: Dashboard
    setup.write(row, 0, '4. Dashboard Summary', heading_format)
    row += 1
    
    setup.write(row, 0, 'The dashboard at the top of the tracker shows:', text_format)
    row += 1
    setup.write(row, 0, '• Total Contractors - Total number of contractors entered', bullet_format)
    row += 1
    setup.write(row, 0, '• Total 1099 Required - How many contractors need 1099 forms', bullet_format)
    row += 1
    setup.write(row, 0, '• Total Pending - How many contractors are waiting for W-9 or contract', bullet_format)
    row += 2
    
    # Section 5: Tips
    setup.write(row, 0, '5. Tips for Best Results', heading_format)
    row += 1
    
    setup.write(row, 0, '✓ Update the tracker regularly (weekly or monthly)', bullet_format)
    row += 1
    setup.write(row, 0, '✓ Request W-9 forms BEFORE paying contractors', bullet_format)
    row += 1
    setup.write(row, 0, '✓ Watch for contractors approaching $600 threshold', bullet_format)
    row += 1
    setup.write(row, 0, '✓ File 1099 forms by January 31 deadline', bullet_format)
    row += 1
    setup.write(row, 0, '✓ Keep digital copies of all W-9 forms', bullet_format)
    row += 2
    
    # Section 6: Troubleshooting
    setup.write(row, 0, '6. Troubleshooting', heading_format)
    row += 1
    
    setup.write(row, 0, 'If formulas show errors (e.g., #NAME? or #VALUE!):', info_format)
    row += 1
    setup.write(row, 0, 'Your Google Sheets may use different locale settings. Try these steps:', text_format)
    row += 1
    setup.write(row, 0, '1. Go to File → Settings → General', bullet_format)
    row += 1
    setup.write(row, 0, '2. Change "Locale" to "United States"', bullet_format)
    row += 1
    setup.write(row, 0, '3. Click "Save settings"', bullet_format)
    row += 1
    setup.write(row, 0, '4. Refresh the page', bullet_format)
    row += 2
    
    setup.write(row, 0, 'OR if using Chinese/Taiwan locale:', text_format)
    row += 1
    setup.write(row, 0, 'Replace commas (,) with semicolons (;) in all formulas in columns H, J, K', bullet_format)
    row += 2
    
    # Section 7: Support
    setup.write(row, 0, '7. Need Help?', heading_format)
    row += 1
    
    setup.write(row, 0, 'Email: airapi2006@gmail.com', text_format)
    row += 1
    setup.write(row, 0, 'Phone: +1 (818) 925-5239', text_format)
    row += 1
    setup.write(row, 0, 'Website: https://fix1099.com', text_format)
    row += 2
    
    # Footer
    setup.write(row, 0, '© 2026 Fix1099 by JCJ HOLDINGS, LLC. All rights reserved.', text_format)
    
    # ==========================================
    # SAVE FILE
    # ==========================================
    
    print("💾 Saving file...")
    
    workbook.close()
    
    print("\n" + "="*70)
    print("✅ SUCCESS! Sellable template created!")
    print("="*70)
    print(f"\n📄 Filename: {filename}")
    print("\n📊 Features included:")
    print("  ✓ Dashboard with 3 live statistics")
    print("  ✓ 11 columns (A-K) with proper data validation")
    print("  ✓ Auto formulas for 1099 Required, Filing Status, Risk Level")
    print("  ✓ Dropdowns for TIN/W-9 Status, Contract Status, Service Type, W-9 Received")
    print("  ✓ Conditional formatting (Red=High Risk, Green=Ready, Red cell=Missing W-9)")
    print("  ✓ Currency formatting for Total Paid column")
    print("  ✓ 4 sample contractors (covering all scenarios)")
    print("  ✓ 2000 data rows with formulas")
    print("  ✓ Frozen header row (6) and first column (A)")
    print("  ✓ Complete Setup (Read Me) sheet with instructions")
    print("\n🎯 Ready for sale!")
    print("\n" + "="*70)
    print("\n📋 Next Steps:")
    print("  1. Upload to Google Drive")
    print("  2. Open with Google Sheets")
    print("  3. Test all formulas and dropdowns")
    print("  4. Verify conditional formatting works")
    print("  5. Set sharing to 'Anyone with link can view'")
    print("  6. Copy the shareable link")
    print("  7. Integrate with Stripe for automatic delivery")
    print("\n" + "="*70)
    
    return filename

if __name__ == '__main__':
    try:
        filename = create_sellable_template()
        print(f"\n✅ Template ready: {filename}\n")
    except Exception as e:
        print(f"\n❌ Error: {e}\n")
        import traceback
        traceback.print_exc()
