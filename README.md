<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Powercell - W-2 Tax Calculator</title>
<style>
* {margin:0;padding:0;box-sizing:border-box;}
body {font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8fafc;padding:30px;line-height:1.6;}
.container {max-width:900px;margin:0 auto;background:white;padding:40px;border-radius:20px;box-shadow:0 15px 35px rgba(0,0,0,0.1);}
h1 {font-size:2.6em;color:#1e3a8a;text-align:center;margin-bottom:10px;font-weight:700;}
.lang-toggle {text-align:center;margin-bottom:20px;}
.lang-btn {padding:8px 16px;margin:0 5px;border:2px solid #e5e7eb;border-radius:25px;cursor:pointer;font-size:14px;transition:all 0.3s;}
.lang-btn.active {background:#3b82f6;color:white;border-color:#3b82f6;}
.subtitle {font-size:1.3em;color:#64748b;text-align:center;margin-bottom:30px;}
.input-group {margin:25px 0;}
label {display:block;margin-bottom:8px;font-weight:600;color:#374151;}
input, select {width:100%;padding:15px;border:2px solid #e5e7eb;border-radius:12px;font-size:16px;transition:all 0.2s;}
input:focus, select:focus {outline:none;border-color:#3b82f6;box-shadow:0 0 0 3px rgba(59,130,246,0.1);}
.btn {width:100%;padding:18px;background:#10b981;color:white;border:none;border-radius:12px;font-size:1.2em;font-weight:600;cursor:pointer;transition:all 0.3s;}
.btn:hover {background:#059669;transform:translateY(-2px);}
.result {background:#f0fdf4;padding:25px;border-radius:12px;border-left:5px solid #10b981;margin-top:30px;display:none;}
.result.show {display:block;animation:slideIn 0.3s;}
@keyframes slideIn {from {opacity:0;transform:translateY(20px);} to {opacity:1;transform:translateY(0);}}
.price {text-align:center;font-size:1.5em;color:#059669;font-weight:700;margin:40px 0;}
.hidden {display:none;}
</style>
</head>
<body>
<div class="container">
<h1>
<span class="lang-en">🚀 Powercell</span>
<span class="lang-zh hidden">🚀 Powercell</span>
<span class="lang-es hidden">🚀 Powercell</span>
</h1>

<div class="lang-toggle">
<button class="lang-btn active" onclick="setLang('en')">English</button>
<button class="lang-btn" onclick="setLang('zh')">中文</button>
<button class="lang-btn" onclick="setLang('es')">Español</button>
</div>

<p class="subtitle">
<span class="lang-en">Fast W-2 Tax Refund Calculator</span>
<span class="lang-zh hidden">W-2工资报税神器（10秒自动计算）</span>
<span class="lang-es hidden">Calculadora Rápida de Reembolso W-2</span>
</p >

<div class="input-group">
<label class="lang-en">W-2 Box 1 - Wages $</label>
<label class="lang-zh hidden">W-2 Box 1 工资收入 $</label>
<label class="lang-es hidden">W-2 Casilla 1 - Salario $</label>
<input type="number" id="wages" placeholder="0">
</div>

<div class="input-group">
<label class="lang-en">Federal Tax Withheld (Box 2) $</label>
<label class="lang-zh hidden">联邦预扣税 (Box 2) $</label>
<label class="lang-es hidden">Impuesto Federal Retenido (Casilla 2) $</label>
<input type="number" id="fedTax" placeholder="0">
</div>

<div class="input-group">
<label class="lang-en">State Tax Withheld (Box 17) $</label>
<label class="lang-zh hidden">州税 (Box 17) $</label>
<label class="lang-es hidden">Impuesto Estatal Retenido (Casilla 17) $</label>
<input type="number" id="stateTax" placeholder="0">
</div>

<div class="input-group">
<label class="lang-en">Filing Status</label>
<label class="lang-zh hidden">婚姻状况</label>
<label class="lang-es hidden">Estado Civil</label>
<select id="filing">
<option value="single">Single / 单身 / Soltero</option>
<option value="married">Married Filing Jointly / 已婚共同申报 / Casado Presentando Conjuntamente</option>
</select>
</div>

<button class="btn" onclick="calculateTax()">
<span class="lang-en">Calculate My Refund</span>
<span class="lang-zh hidden">立即计算退税</span>
<span class="lang-es hidden">Calcular Mi Reembolso</span>
</button>

<div class="result" id="result">
<h3>
<span class="lang-en">🎉 Your Tax Refund</span>
<span class="lang-zh hidden">🎉 你的退税结果</span>
<span class="lang-es hidden">🎉 Tu Reembolso de Impuestos</span>
</h3>
<div id="taxResult"></div>
<p>
<span class="lang-en">Copy results for TurboTax or your accountant</span>
<span class="lang-zh hidden">复制给会计师 / TurboTax自动导入</span>
<span class="lang-es hidden">Copiar resultados para TurboTax o contador</span>
</p >
</div>

<p class="price">
<span class="lang-en">$9.99/year</span>
<span class="lang-zh hidden">$9.9/年</span>
<span class="lang-es hidden">$9.99/año</span>
<span> - Unlimited Use</span>
</p >
</div>

<script>
let currentLang = 'en';

function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  document.querySelectorAll('[class*="lang-"]').forEach(el => {
    el.classList.toggle('hidden', !el.classList.contains(`lang-${lang}`));
  });
}

function calculateTax() {
  const wages = parseFloat(document.getElementById('wages').value) || 0;
  const fedTax = parseFloat(document.getElementById('fedTax').value) || 0;
  const stateTax = parseFloat(document.getElementById('stateTax').value) || 0;
  const filing = document.getElementById('filing').value;
  
  const standardDeduction = filing === 'single' ? 13850 : 27700;
  const taxableIncome = Math.max(0, wages - standardDeduction);
  const fedTaxOwed = taxableIncome * 0.12;
  const refund = Math.max(0, fedTax - fedTaxOwed);
  
  const texts = {
    en: `Federal Refund: $${refund.toFixed(0)}<br>Taxable Income: $${taxableIncome.toFixed(0)}<br>State Tax Paid: $${stateTax.toFixed(0)}`,
    zh: `预计联邦退税：$${refund.toFixed(0)}<br>应税收入：$${taxableIncome.toFixed(0)}<br>州税：$${stateTax.toFixed(0)}`,
    es: `Reembolso Federal: $${refund.toFixed(0)}<br>Ingreso Gravable: $${taxableIncome.toFixed(0)}<br>Impuesto Estatal: $${stateTax.toFixed(0)}`
  };
  
  document.getElementById('taxResult').innerHTML = texts[currentLang];
  document.getElementById('result').classList.add('show');
}
</script>
</body>
</html>
