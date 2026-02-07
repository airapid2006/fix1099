<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Powercell - W-2 Tax Refund Calculator</title>
<style>
* {margin:0;padding:0;box-sizing:border-box;}
body {font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:20px;min-height:100vh;}
.hero {text-align:center;color:white;padding:60px 20px;}
.hero h1 {font-size:3.2em;margin-bottom:10px;}
.hero p {font-size:1.3em;opacity:0.95;}

.section {max-width:850px;margin:30px auto;background:white;padding:45px;border-radius:25px;box-shadow:0 25px 50px rgba(0,0,0,0.15);position:relative;overflow:hidden;}
.section::before {content:'';position:absolute;top:0;left:0;right:0;height:6px;}
.section.en::before {background:linear-gradient(90deg,#3b82f6,#60a5fa);}
.section.es::before {background:linear-gradient(90deg,#f59e0b,#fbbf24);}
.section.zh::before {background:linear-gradient(90deg,#ef4444,#f87171);}

.section h2 {font-size:2.2em;color:#1e293b;text-align:center;margin-bottom:20px;font-weight:700;}
.section .subtitle {font-size:1.25em;color:#64748b;text-align:center;margin-bottom:35px;padding:0 20px;line-height:1.5;}

.input-group {margin:30px 0;}
.input-group label {display:block;margin-bottom:10px;font-weight:600;color:#374151;font-size:1.05em;}
.input-group input, .input-group select {width:100%;padding:18px;border:2px solid #e5e7eb;border-radius:15px;font-size:18px;transition:all 0.3s;box-shadow:0 2px 10px rgba(0,0,0,0.05);}
.input-group input:focus, .input-group select:focus {outline:none;border-color:#3b82f6;transform:translateY(-2px);box-shadow:0 10px 25px rgba(59,130,246,0.15);}

.btn {width:100%;padding:22px;background:linear-gradient(135deg,#10b981,#059669);color:white;border:none;border-radius:15px;font-size:1.4em;font-weight:700;letter-spacing:0.5px;cursor:pointer;transition:all 0.3s;box-shadow:0 10px 30px rgba(16,185,129,0.3);}
.btn:hover {transform:translateY(-3px);box-shadow:0 15px 40px rgba(16,185,129,0.4);}

.result {background:linear-gradient(135deg,#f0fdf4,#dcfce7);padding:30px;border-radius:20px;border-left:6px solid #10b981;margin-top:35px;display:none;animation:slideIn 0.4s;}
.result.show {display:block;}
@keyframes slideIn {from {opacity:0;transform:translateY(30px);} to {opacity:1;transform:translateY(0);}}

.result h3 {font-size:1.6em;color:#166534;margin-bottom:20px;}
.result-content {font-size:1.2em;line-height:1.8;}
.result-content strong {color:#059669;font-size:1.4em;}

.price {text-align:center;font-size:1.6em;color:#059669;font-weight:800;margin:40px 0 20px 0;background:linear-gradient(135deg,#10b981,#059669);-webkit-background-clip:text;-webkit-text-fill-color:transparent;-webkit-text-stroke:1px rgba(16,185,129,0.2);}
.lang-badge {position:absolute;top:20px;right:20px;padding:8px 16px;border-radius:25px;font-size:0.85em;font-weight:600;color:white;}
.lang-badge.en {background:linear-gradient(135deg,#3b82f6,#60a5fa);}
.lang-badge.es {background:linear-gradient(135deg,#f59e0b,#fbbf24);}
.lang-badge.zh {background:linear-gradient(135deg,#ef4444,#f87171);}
</style>
</head>
<body>

<div class="hero">
<h1>🚀 Powercell</h1>
<p>Fast W-2 Tax Refund Calculator • Calculadora Rápida W-2 • W-2工资报税神器</p >
</div>

<!-- 英文段（第1段） -->
<div class="section en">
<span class="lang-badge en">English</span>
<h2>Calculate Your Refund</h2>
<p class="subtitle">Enter your W-2 information below for instant tax refund calculation</p >

<div class="input-group">
<label>W-2 Box 1 - Wages $</label>
<input type="number" id="wages-en" placeholder="Enter your total wages">
</div>

<div class="input-group">
<label>Federal Tax Withheld (Box 2) $</label>
<input type="number" id="fedTax-en" placeholder="Federal taxes withheld">
</div>

<div class="input-group">
<label>State Tax Withheld (Box 17) $</label>
<input type="number" id="stateTax-en" placeholder="State taxes withheld">
</div>

<div class="input-group">
<label>Filing Status</label>
<select id="filing-en">
<option value="single">Single</option>
<option value="married">Married Filing Jointly</option>
</select>
</div>

<button class="btn" onclick="calculateTax('en')">Calculate My Refund →</button>

<div class="result" id="result-en">
<h3>🎉 Your Tax Refund Results</h3>
<div class="result-content" id="taxResult-en"></div>
<p style="margin-top:20px;color:#374151;">Copy these numbers for TurboTax, H&R Block, or your accountant</p >
</div>

<div class="price">$9.99/year - Unlimited calculations</div>
</div>

<!-- 西班牙语段（第2段） -->
<div class="section es">
<span class="lang-badge es">Español</span>
<h2>Calcula Tu Reembolso</h2>
<p class="subtitle">Ingresa tu información W-2 para calcular instantáneamente tu reembolso de impuestos</p >

<div class="input-group">
<label>W-2 Casilla 1 - Salario $</label>
<input type="number" id="wages-es" placeholder="Ingresa tu salario total">
</div>

<div class="input-group">
<label>Impuesto Federal Retenido (Casilla 2) $</label>
<input type="number" id="fedTax-es" placeholder="Impuestos federales retenidos">
</div>

<div class="input-group">
<label>Impuesto Estatal Retenido (Casilla 17) $</label>
<input type="number" id="stateTax-es" placeholder="Impuestos estatales retenidos">
</div>

<div class="input-group">
<label>Estado Civil</label>
<select id="filing-es">
<option value="single">Soltero</option>
<option value="married">Casado Presentando Conjuntamente</option>
</select>
</div>

<button class="btn" onclick="calculateTax('es')">Calcular Mi Reembolso →</button>

<div class="result" id="result-es">
<h3>🎉 Tus Resultados de Reembolso</h3>
<div class="result-content" id="taxResult-es"></div>
<p style="margin-top:20px;color:#374151;">Copia estos números para TurboTax, H&R Block o tu contador</p >
</div>

<div class="price">$9.99/año - Cálculos ilimitados</div>
</div>

<!-- 中文段（第3段） -->
<div class="section zh">
<span class="lang-badge zh">中文</span>
<h2>计算你的退税</h2>
<p class="subtitle">输入W-2信息，10秒自动计算退税金额</p >

<div class="input-group">
<label>W-2 Box 1 工资收入 $</label>
<input type="number" id="wages-zh" placeholder="输入你的W-2第一行工资">
</div>

<div class="input-group">
<label>联邦预扣税 (Box 2) $</label>
<input type="number" id="fedTax-zh" placeholder="联邦预扣税">
</div>

<div class="input-group">
<label>州税 (Box 17) $</label>
<input type="number" id="stateTax-zh" placeholder="州税">
</div>

<div class="input-group">
<label>婚姻状况</label>
<select id="filing-zh">
<option value="single">单身</option>
<option value="married">已婚共同申报</option>
</select>
</div>

<button class="btn" onclick="calculateTax('zh')">立即计算退税 →</button>

<div class="result" id="result-zh">
<h3>🎉 你的退税结果</h3>
<div class="result-content" id="taxResult-zh"></div>
<p style="margin-top:20px;color:#374151;">复制结果给会计师或直接导入TurboTax</p >
</div>

<div class="price">$9.9/年 无限次计算</div>
</div>

<script>
function calculateTax(lang) {
  const wagesId = `wages-${lang}`;
  const fedTaxId = `fedTax-${lang}`;
  const stateTaxId = `stateTax-${lang}`;
  const filingId = `filing-${lang}`;
  
  const wages = parseFloat(document.getElementById(wagesId).value) || 0;
  const fedTax = parseFloat(document.getElementById(fedTaxId).value) || 0;
  const stateTax = parseFloat(document.getElementById(stateTaxId).value) || 0;
  const filing = document.getElementById(filingId).value;
  
  const standardDeduction = filing === 'single' ? 13850 : 27700;
  const taxableIncome = Math.max(0, wages - standardDeduction);
  const fedTaxOwed = taxableIncome * 0.12;
  const refund = Math.max(0, fedTax - fedTaxOwed);
  
  const resultDiv = document.getElementById(`taxResult-${lang}`);
  const resultSection = document.getElementById(`result-${lang}`);
  
  if (lang === 'en') {
    resultDiv.innerHTML = `
      <p><strong>Federal Refund: <span style="color:#059669;font-size:1.6em;">$${refund.toFixed(0)}</span></strong></p >
      <p>Taxable Income: $${taxableIncome.toFixed(0)}</p >
      <p>State Tax Paid: $${stateTax.toFixed(0)}</p >
    `;
  } else if (lang === 'es') {
    resultDiv.innerHTML = `
      <p><strong>Reembolso Federal: <span style="color:#059669;font-size:1.6em;">$${refund.toFixed(0)}</span></strong></p >
      <p>Ingreso Gravable: $${taxableIncome.toFixed(0)}</p >
      <p>Impuesto Estatal: $${stateTax.toFixed(0)}</p >
    `;
  } else {
    resultDiv.innerHTML = `
      <p><strong>预计联邦退税：<span style="color:#059669;font-size:1.6em;">$${refund.toFixed(0)}</span></strong></p >
      <p>应税收入：$${taxableIncome.toFixed(0)}</p >
      <p>州税：$${stateTax.toFixed(0)}</p >
    `;
  }
  
  resultSection.classList.add('show');
  resultSection.scrollIntoView({behavior: 'smooth'});
}
</script>
</body>
</html>
