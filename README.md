<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Powercell - W-2 Tax Refund Calculator</title>
<style>
* {margin:0;padding:0;box-sizing:border-box;}
body {font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8fafc;padding:20px;}
.section {max-width:800px;margin:40px auto;background:white;padding:40px;border-radius:20px;box-shadow:0 15px 35px rgba(0,0,0,0.1);margin-bottom:30px;}
h1 {font-size:2.8em;color:#1e3a8a;text-align:center;margin-bottom:15px;font-weight:700;}
.subtitle {font-size:1.4em;color:#64748b;text-align:center;margin-bottom:30px;}
.input-group {margin:25px 0;}
label {display:block;margin-bottom:8px;font-weight:600;color:#374151;}
input, select {width:100%;padding:15px;border:2px solid #e5e7eb;border-radius:12px;font-size:16px;transition:all 0.2s;}
input:focus, select:focus {outline:none;border-color:#3b82f6;box-shadow:0 0 0 3px rgba(59,130,246,0.1);}
.btn {width:100%;padding:18px;background:#10b981;color:white;border:none;border-radius:12px;font-size:1.2em;font-weight:600;cursor:pointer;transition:all 0.3s;}
.btn:hover {background:#059669;transform:translateY(-2px);}
.result {background:#f0fdf4;padding:25px;border-radius:12px;border-left:5px solid #10b981;margin-top:30px;display:none;}
.result.show {display:block;}
.price {text-align:center;font-size:1.5em;color:#059669;font-weight:700;margin:30px 0;}
.en {border-top:5px solid #3b82f6;}
.es {border-top:5px solid #f59e0b;}
.zh {border-top:5px solid #ef4444;}
</style>
</head>
<body>

<!-- 英文段（第1段） -->
<div class="section en">
<h1>🚀 Powercell</h1>
<p class="subtitle">Fast W-2 Tax Refund Calculator</p >

<div class="input-group">
<label>W-2 Box 1 - Wages $</label>
<input type="number" id="wages-en" placeholder="Enter your W-2 wages">
</div>
<div class="input-group">
<label>Federal Tax Withheld (Box 2) $</label>
<input type="number" id="fedTax-en" placeholder="0">
</div>
<div class="input-group">
<label>State Tax Withheld (Box 17) $</label>
<input type="number" id="stateTax-en" placeholder="0">
</div>
<div class="input-group">
<label>Filing Status</label>
<select id="filing-en">
<option value="single">Single</option>
<option value="married">Married Filing Jointly</option>
</select>
</div>
<button class="btn" onclick="calculateTax('en')">Calculate My Refund</button>
<div class="result" id="result-en">
<h3>🎉 Your Tax Refund</h3>
<div id="taxResult-en"></div>
<p>Copy results for TurboTax or your accountant</p >
</div>
<p class="price">$9.99/year - Unlimited Use</p >
</div>

<!-- 西班牙语段（第2段） -->
<div class="section es">
<h1>🚀 Powercell</h1>
<p class="subtitle">Calculadora Rápida de Reembolso W-2</p >

<div class="input-group">
<label>W-2 Casilla 1 - Salario $</label>
<input type="number" id="wages-es" placeholder="Ingrese su salario W-2">
</div>
<div class="input-group">
<label>Impuesto Federal Retenido (Casilla 2) $</label>
<input type="number" id="fedTax-es" placeholder="0">
</div>
<div class="input-group">
<label>Impuesto Estatal Retenido (Casilla 17) $</label>
<input type="number" id="stateTax-es" placeholder="0">
</div>
<div class="input-group">
<label>Estado Civil</label>
<select id="filing-es">
<option value="single">Soltero</option>
<option value="married">Casado Presentando Conjuntamente</option>
</select>
</div>
<button class="btn" onclick="calculateTax('es')">Calcular Mi Reembolso</button>
<div class="result" id="result-es">
<h3>🎉 Tu Reembolso de Impuestos</h3>
<div id="taxResult-es"></div>
<p>Copiar resultados para TurboTax o contador</p >
</div>
<p class="price">$9.99/año - Uso Ilimitado</p >
</div>

<!-- 中文段（第3段） -->
<div class="section zh">
<h1>🚀 Powercell</h1>
<p class="subtitle">W-2工资报税神器（10秒自动计算）</p >

<div class="input-group">
<label>W-2 Box 1 工资收入 $</label>
<input type="number" id="wages-zh" placeholder="输入你的W-2第一行工资">
</div>
<div class="input-group">
<label>联邦预扣税 (Box 2) $</label>
<input type="number" id="fedTax-zh" placeholder="0">
</div>
<div class="input-group">
<label>州税 (Box 17) $</label>
<input type="number" id="stateTax-zh" placeholder="0">
</div>
<div class="input-group">
<label>婚姻状况</label>
<select id="filing-zh">
<option value="single">单身</option>
<option value="married">已婚共同申报</option>
</select>
</div>
<button class="btn" onclick="calculateTax('zh')">立即计算退税</button>
<div class="result" id="result-zh">
<h3>🎉 你的退税结果</h3>
<div id="taxResult-zh"></div>
<p>复制给会计师 / TurboTax自动导入</p >
</div>
<p class="price">$9.9/年 无限次使用</p >
</div>

<script>
function calculateTax(lang) {
  const wages = parseFloat(document.getElementById(`wages-${lang}`).value) || 0;
  const fedTax = parseFloat(document.getElementById(`fedTax-${lang}`).value) || 0;
  const stateTax = parseFloat(document.getElementById(`stateTax-${lang}`).value) || 0;
  const filing = document.getElementById(`filing-${lang}`).value;
  
  const standardDeduction = filing === 'single' ? 13850 : 27700;
  const taxableIncome = Math.max(0, wages - standardDeduction);
  const fedTaxOwed = taxableIncome * 0.12;
  const refund = Math.max(0, fedTax - fedTaxOwed);
  
  const resultDiv = document.getElementById(`taxResult-${lang}`);
  const resultSection = document.getElementById(`result-${lang}`);
  
  if (lang === 'en') {
    resultDiv.innerHTML = `Federal Refund: $${refund.toFixed(0)}<br>Taxable Income: $${taxableIncome.toFixed(0)}<br>State Tax Paid: $${stateTax.toFixed(0)}`;
  } else if (lang === 'es') {
    resultDiv.innerHTML = `Reembolso Federal: $${refund.toFixed(0)}<br>Ingreso Gravable: $${taxableIncome.toFixed(0)}<br>Impuesto Estatal: $${stateTax.toFixed(0)}`;
  } else {
    resultDiv.innerHTML = `预计联邦退税：$${refund.toFixed(0)}<br>应税收入：$${taxableIncome.toFixed(0)}<br>州税：$${stateTax.toFixed(0)}`;
  }
  
  resultSection.classList.add('show');
  resultSection.scrollIntoView({behavior: 'smooth'});
}
</script>
</body>
</html>
