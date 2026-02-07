<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Powercell - W-2 Tax Refund Calculator</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
* {margin:0;padding:0;box-sizing:border-box;}
body {font-family:'Inter',sans-serif;background:#f8fafc;min-height:100vh;padding:20px;line-height:1.6;}
.hero {background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;text-align:center;padding:80px 20px;border-radius:24px;margin-bottom:40px;box-shadow:0 20px 60px rgba(102,126,234,0.3);}
.hero h1 {font-size:clamp(2.5rem,8vw,4rem);font-weight:800;margin-bottom:16px;}
.hero p {font-size:clamp(1.1rem,3vw,1.4rem);opacity:0.95;max-width:600px;margin:0 auto;}

.section {background:white;border-radius:24px;padding:48px;max-width:900px;margin:0 auto 32px;box-shadow:0 20px 60px rgba(0,0,0,0.08);border-top:8px solid;position:relative;overflow:hidden;}
.section.en {border-top-color:#3b82f6;}
.section.es {border-top-color:#f59e0b;}
.section.zh {border-top-color:#dc2626;}
.lang-label {position:absolute;top:24px;right:24px;background:var(--label-color);color:white;padding:8px 20px;border-radius:50px;font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;}
.section.en .lang-label {--label-color:#3b82f6;}
.section.es .lang-label {--label-color:#f59e0b;}
.section.zh .lang-label {--label-color:#dc2626;}

.section h2 {font-size:clamp(1.8rem,5vw,2.5rem);color:#111827;font-weight:700;text-align:center;margin-bottom:12px;}
.subtitle {font-size:1.2rem;color:#6b7280;text-align:center;margin-bottom:40px;line-height:1.6;max-width:600px;margin-left:auto;margin-right:auto;}

.form-grid {display:grid;gap:24px;}
.input-group {position:relative;}
.input-group label {display:block;font-size:1rem;font-weight:600;color:#111827;margin-bottom:12px;}
.input-group input,.input-group select {width:100%;padding:20px 24px;font-size:18px;border:2px solid #e5e7eb;border-radius:16px;font-weight:500;transition:all 0.3s;background:white;box-shadow:0 4px 12px rgba(0,0,0,0.04);}
.input-group input:focus,.input-group select:focus {outline:none;border-color:#3b82f6;transform:translateY(-2px);box-shadow:0 16px 40px rgba(59,130,246,0.15);}
.input-group input::placeholder {color:#9ca3af;}

.btn {width:100%;padding:24px;font-size:1.3rem;font-weight:700;background:linear-gradient(135deg,#10b981 0%,#059669 100%);color:white;border:none;border-radius:16px;cursor:pointer;transition:all 0.3s;box-shadow:0 12px 32px rgba(16,185,129,0.3);text-transform:none;letter-spacing:0.5px;}
.btn:hover {transform:translateY(-4px);box-shadow:0 20px 48px rgba(16,185,129,0.4);}
.btn:active {transform:translateY(-1px);}

.result {background:linear-gradient(135deg,#f0fdf4 0%,#dcfce7 100%);border-radius:20px;padding:32px;margin-top:32px;display:none;border-left:6px solid #10b981;animation:slideUp 0.4s ease-out;}
.result.show {display:block;}
@keyframes slideUp {from {opacity:0;transform:translateY(24px);} to {opacity:1;transform:translateY(0);}}

.result h3 {font-size:1.5rem;color:#166534;font-weight:700;margin-bottom:20px;}
.result-grid {display:grid;gap:16px;font-size:1.1rem;}
.result-item {display:flex;justify-content:space-between;padding:16px 20px;background:white;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.05);}
.result-item strong {font-size:1.3rem;color:#059669;}
.result-note {margin-top:20px;padding:16px;background:white;border-radius:12px;font-size:0.95rem;color:#6b7280;line-height:1.6;}

.price {text-align:center;font-size:clamp(1.3rem,4vw,1.6rem);font-weight:800;background:linear-gradient(135deg,#10b981,#059669);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:40px 0;font-family:'Inter',sans-serif;}
.error {color:#dc2626;font-size:0.9rem;margin-top:8px;display:none;}
@media (max-width:768px) {.section {padding:32px 24px;margin:0 16px 24px;border-radius:20px;}}
</style>
</head>
<body>

<div class="hero">
<h1>🚀 Powercell</h1>
<p>Fast W-2 Tax Refund Calculator • Calculadora Rápida de Reembolso W-2 • W-2工资报税神器</p >
</div>

<!-- ENGLISH SECTION -->
<div class="section en">
<span class="lang-label">🇺🇸 English</span>
<h2>Calculate Your Tax Refund</h2>
<p class="subtitle">Enter your W-2 details below for instant federal & state refund calculation</p >

<div class="form-grid">
<div class="input-group">
<label>W-2 Box 1 - Wages</label>
<input type="number" id="wages-en" placeholder="65000" min="0" step="0.01">
<div class="error" id="error-wages-en">Please enter a valid amount</div>
</div>
<div class="input-group">
<label>Federal Tax Withheld (Box 2)</label>
<input type="number" id="fedTax-en" placeholder="8500" min="0" step="0.01">
<div class="error" id="error-fedTax-en">Please enter a valid amount</div>
</div>
<div class="input-group">
<label>State Tax Withheld (Box 17)</label>
<input type="number" id="stateTax-en" placeholder="4200" min="0" step="0.01">
<div class="error" id="error-stateTax-en">Please enter a valid amount</div>
</div>
<div class="input-group">
<label>Filing Status</label>
<select id="filing-en">
<option value="single">Single</option>
<option value="married">Married Filing Jointly</option>
<option value="head">Head of Household</option>
</select>
</div>
</div>

<button class="btn" onclick="calculateTax('en')">Calculate My Refund</button>

<div class="result" id="result-en">
<h3>🎉 Your Tax Refund Results</h3>
<div class="result-grid" id="taxResult-en"></div>
<div class="result-note">
<strong>Note:</strong> This is an estimate based on standard deduction. Actual refund may vary based on credits, additional deductions, and other factors. Consult a tax professional for accurate filing.
</div>
</div>
</div>

<!-- SPANISH SECTION -->
<div class="section es">
<span class="lang-label">🇪🇸 Español</span>
<h2>Calcule Su Reembolso de Impuestos</h2>
<p class="subtitle">Ingrese los detalles de su W-2 para un cálculo instantáneo de reembolso federal y estatal</p >

<div class="form-grid">
<div class="input-group">
<label>W-2 Casilla 1 - Salarios</label>
<input type="number" id="wages-es" placeholder="65000" min="0" step="0.01">
<div class="error" id="error-wages-es">Por favor ingrese un monto válido</div>
</div>
<div class="input-group">
<label>Impuesto Federal Retenido (Casilla 2)</label>
<input type="number" id="fedTax-es" placeholder="8500" min="0" step="0.01">
<div class="error" id="error-fedTax-es">Por favor ingrese un monto válido</div>
</div>
<div class="input-group">
<label>Impuesto Estatal Retenido (Casilla 17)</label>
<input type="number" id="stateTax-es" placeholder="4200" min="0" step="0.01">
<div class="error" id="error-stateTax-es">Por favor ingrese un monto válido</div>
</div>
<div class="input-group">
<label>Estado de Declaración</label>
<select id="filing-es">
<option value="single">Soltero</option>
<option value="married">Casado Declarando Conjuntamente</option>
<option value="head">Jefe de Familia</option>
</select>
</div>
</div>

<button class="btn" onclick="calculateTax('es')">Calcular Mi Reembolso</button>

<div class="result" id="result-es">
<h3>🎉 Resultados de Su Reembolso</h3>
<div class="result-grid" id="taxResult-es"></div>
<div class="result-note">
<strong>Nota:</strong> Esta es una estimación basada en la deducción estándar. El reembolso real puede variar según créditos, deducciones adicionales y otros factores. Consulte a un profesional de impuestos para una presentación precisa.
</div>
</div>
</div>

<!-- CHINESE SECTION -->
<div class="section zh">
<span class="lang-label">🇨🇳 中文</span>
<h2>计算您的退税金额</h2>
<p class="subtitle">输入您的 W-2 表格详情,即时计算联邦和州退税金额</p >

<div class="form-grid">
<div class="input-group">
<label>W-2 第1栏 - 工资收入</label>
<input type="number" id="wages-zh" placeholder="65000" min="0" step="0.01">
<div class="error" id="error-wages-zh">请输入有效金额</div>
</div>
<div class="input-group">
<label>联邦税预扣 (第2栏)</label>
<input type="number" id="fedTax-zh" placeholder="8500" min="0" step="0.01">
<div class="error" id="error-fedTax-zh">请输入有效金额</div>
</div>
<div class="input-group">
<label>州税预扣 (第17栏)</label>
<input type="number" id="stateTax-zh" placeholder="4200" min="0" step="0.01">
<div class="error" id="error-stateTax-zh">请输入有效金额</div>
</div>
<div class="input-group">
<label>报税身份</label>
<select id="filing-zh">
<option value="single">单身</option>
<option value="married">已婚联合报税</option>
<option value="head">户主</option>
</select>
</div>
</div>

<button class="btn" onclick="calculateTax('zh')">计算我的退税</button>

<div class="result" id="result-zh">
<h3>🎉 您的退税结果</h3>
<div class="result-grid" id="taxResult-zh"></div>
<div class="result-note">
<strong>注意:</strong> 这是基于标准扣除的估算。实际退税可能因税收抵免、额外扣除和其他因素而异。请咨询税务专业人士以获得准确的报税信息。
</div>
</div>
</div>

<div class="price">
💎 Premium tax filing services available • Servicios premium disponibles • 提供高级报税服务
</div>

<script>
// 2024 Tax Year Data (for 2025 filing)
const TAX_DATA = {
  standardDeduction: {
    single: 14600,
    married: 29200,
    head: 21900
  },
  federalBrackets: {
    single: [
      { limit: 11600, rate: 0.10 },
      { limit: 47150, rate: 0.12 },
      { limit: 100525, rate: 0.22 },
      { limit: 191950, rate: 0.24 },
      { limit: 243725, rate: 0.32 },
      { limit: 609350, rate: 0.35 },
      { limit: Infinity, rate: 0.37 }
    ],
    married: [
      { limit: 23200, rate: 0.10 },
      { limit: 94300, rate: 0.12 },
      { limit: 201050, rate: 0.22 },
      { limit: 383900, rate: 0.24 },
      { limit: 487450, rate: 0.32 },
      { limit: 731200, rate: 0.35 },
      { limit: Infinity, rate: 0.37 }
    ],
    head: [
      { limit: 16550, rate: 0.10 },
      { limit: 63100, rate: 0.12 },
      { limit: 100500, rate: 0.22 },
      { limit: 191950, rate: 0.24 },
      { limit: 243700, rate: 0.32 },
      { limit: 609350, rate: 0.35 },
      { limit: Infinity, rate: 0.37 }
    ]
  }
};

const TRANSLATIONS = {
  en: {
    taxableIncome: 'Taxable Income',
    federalTaxOwed: 'Federal Tax Owed',
    federalWithheld: 'Federal Tax Withheld',
    federalRefund: 'Federal Refund',
    stateWithheld: 'State Tax Withheld',
    stateRefund: 'State Refund (Estimate)',
    totalRefund: 'Total Estimated Refund'
  },
  es: {
    taxableIncome: 'Ingreso Imponible',
    federalTaxOwed: 'Impuesto Federal Adeudado',
    federalWithheld: 'Impuesto Federal Retenido',
    federalRefund: 'Reembolso Federal',
    stateWithheld: 'Impuesto Estatal Retenido',
    stateRefund: 'Reembolso Estatal (Estimado)',
    totalRefund: 'Reembolso Total Estimado'
  },
  zh: {
    taxableIncome: '应税收入',
    federalTaxOwed: '应缴联邦税',
    federalWithheld: '已扣联邦税',
    federalRefund: '联邦退税',
    stateWithheld: '已扣州税',
    stateRefund: '州退税(估算)',
    totalRefund: '预计总退税额'
  }
};

function calculateFederalTax(taxableIncome, filingStatus) {
  const brackets = TAX_DATA.federalBrackets[filingStatus];
  let tax = 0;
  let previousLimit = 0;

  for (let bracket of brackets) {
    if (taxableIncome > bracket.limit) {
      tax += (bracket.limit - previousLimit) * bracket.rate;
      previousLimit = bracket.limit;
    } else {
      tax += (taxableIncome - previousLimit) * bracket.rate;
      break;
    }
  }

  return Math.round(tax * 100) / 100;
}

function validateInputs(lang) {
  const wages = parseFloat(document.getElementById(`wages-${lang}`).value);
  const fedTax = parseFloat(document.getElementById(`fedTax-${lang}`).value);
  const stateTax = parseFloat(document.getElementById(`stateTax-${lang}`).value);
  
  let isValid = true;
  
  if (isNaN(wages) || wages < 0) {
    document.getElementById(`error-wages-${lang}`).style.display = 'block';
    isValid = false;
  } else {
    document.getElementById(`error-wages-${lang}`).style.display = 'none';
  }
  
  if (isNaN(fedTax) || fedTax < 0) {
    document.getElementById(`error-fedTax-${lang}`).style.display = 'block';
    isValid = false;
  } else {
    document.getElementById(`error-fedTax-${lang}`).style.display = 'none';
  }
  
  if (isNaN(stateTax) || stateTax < 0) {
    document.getElementById(`error-stateTax-${lang}`).style.display = 'block';
    isValid = false;
  } else {
    document.getElementById(`error-stateTax-${lang}`).style.display = 'none';
  }
  
  return isValid;
}

function calculateTax(lang) {
  if (!validateInputs(lang)) {
    return;
  }

  const wages = parseFloat(document.getElementById(`wages-${lang}`).value);
  const fedTaxWithheld = parseFloat(document.getElementById(`fedTax-${lang}`).value);
  const stateTaxWithheld = parseFloat(document.getElementById(`stateTax-${lang}`).value);
  const filingStatus = document.getElementById(`filing-${lang}`).value;

  const standardDeduction = TAX_DATA.standardDeduction[filingStatus];
  const taxableIncome = Math.max(0, wages - standardDeduction);
  const federalTaxOwed = calculateFederalTax(taxableIncome, filingStatus);
  const federalRefund = fedTaxWithheld - federalTaxOwed;
  
  // State tax estimate (assuming ~5% effective rate for simplicity)
  const stateRefund = stateTaxWithheld - (taxableIncome * 0.05);
  const totalRefund = federalRefund + stateRefund;

  const t = TRANSLATIONS[lang];
  const resultHTML = `
    <div class="result-item">
      <span>${t.taxableIncome}:</span>
      <strong>$${taxableIncome.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong>
    </div>
    <div class="result-item">
      <span>${t.federalTaxOwed}:</span>
      <strong>$${federalTaxOwed.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong>
    </div>
    <div class="result-item">
      <span>${t.federalWithheld}:</span>
      <strong>$${fedTaxWithheld.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong>
    </div>
    <div class="result-item" style="background:linear-gradient(135deg,#f0fdf4,#dcfce7);">
      <span style="font-weight:700;">${t.federalRefund}:</span>
      <strong style="font-size:1.5rem;color:${federalRefund >= 0 ? '#059669' : '#dc2626'};">
        ${federalRefund >= 0 ? '+' : ''}$${federalRefund.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
      </strong>
    </div>
    <div class="result-item">
      <span>${t.stateWithheld}:</span>
      <strong>$${stateTaxWithheld.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong>
    </div>
    <div class="result-item" style="background:linear-gradient(135deg,#f0fdf4,#dcfce7);">
      <span style="font-weight:700;">${t.stateRefund}:</span>
      <strong style="font-size:1.5rem;color:${stateRefund >= 0 ? '#059669' : '#dc2626'};">
        ${stateRefund >= 0 ? '+' : ''}$${stateRefund.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
      </strong>
    </div>
    <div class="result-item" style="background:linear-gradient(135deg,#10b981,#059669);color:white;margin-top:8px;">
      <span style="font-size:1.3rem;font-weight:800;">${t.totalRefund}:</span>
      <strong style="font-size:1.8rem;">
        ${totalRefund >= 0 ? '+' : ''}$${totalRefund.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
      </strong>
    </div>
  `;

  document.getElementById(`taxResult-${lang}`).innerHTML = resultHTML;
  document.getElementById(`result-${lang}`).classList.add('show');
  
  // Smooth scroll to results
  document.getElementById(`result-${lang}`).scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
</script>

</body>
</html>
