<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Fix1099 - Small business 1099 tax filing made simple. File 1099-NEC, 1099-MISC, 1099-K in 5 minutes. Electronic filing to IRS.">
    <meta property="og:title" content="Fix1099 - 1099 Tax Filing Made Simple">
    <meta property="og:description" content="File your 1099 forms in 5 minutes. No tax knowledge required.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://fix1099.com">
    <title>Fix1099 - 1099 Tax Filing Made Simple</title>
    
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
            line-height: 1.6;
            color: #1a202c;
            background: #f7fafc;
        }
        
        .header {
            background: white;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            position: sticky;
            top: 0;
            z-index: 100;
        }
        
        .header-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            font-size: 1.5rem;
            font-weight: 700;
            color: #2563eb;
            text-decoration: none;
        }
        
        .nav-button {
            background: #2563eb;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.3s;
        }
        
        .nav-button:hover {
            background: #1d4ed8;
        }
        
        .hero {
            background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
            color: white;
            padding: 4rem 2rem;
            text-align: center;
        }
        
        .hero-content {
            max-width: 800px;
            margin: 0 auto;
        }
        
        .hero h1 {
            font-size: 3rem;
            margin-bottom: 1.5rem;
            line-height: 1.2;
        }
        
        .hero p {
            font-size: 1.25rem;
            margin-bottom: 2rem;
            opacity: 0.95;
        }
        
        .cta-button {
            background: white;
            color: #2563eb;
            border: none;
            padding: 1rem 2.5rem;
            font-size: 1.125rem;
            font-weight: 600;
            border-radius: 8px;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.3s;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0,0,0,0.15);
        }
        
        .features {
            max-width: 1200px;
            margin: -3rem auto 4rem;
            padding: 0 2rem;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
        }
        
        .feature-card {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.07);
            text-align: center;
        }
        
        .feature-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        .feature-card h3 {
            color: #2563eb;
            margin-bottom: 0.5rem;
        }
        
        .wizard-section {
            max-width: 800px;
            margin: 4rem auto;
            padding: 0 2rem;
            display: none;
        }
        
        .wizard-section.active {
            display: block;
        }
        
        .wizard-card {
            background: white;
            padding: 3rem;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.07);
        }
        
        .wizard-card h2 {
            color: #2563eb;
            margin-bottom: 2rem;
            text-align: center;
        }
        
        .question {
            margin-bottom: 2rem;
        }
        
        .question label {
            display: block;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #374151;
        }
        
        .question input,
        .question select {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.3s;
        }
        
        .question input:focus,
        .question select:focus {
            outline: none;
            border-color: #2563eb;
        }
        
        .option-buttons {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }
        
        .option-button {
            background: white;
            border: 2px solid #e5e7eb;
            padding: 1.5rem;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
            text-align: center;
        }
        
        .option-button:hover {
            border-color: #2563eb;
            background: #eff6ff;
        }
        
        .option-button.selected {
            border-color: #2563eb;
            background: #dbeafe;
        }
        
        .wizard-nav {
            display: flex;
            justify-content: space-between;
            margin-top: 2rem;
        }
        
        .wizard-button {
            background: #2563eb;
            color: white;
            border: none;
            padding: 0.75rem 2rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.3s;
        }
        
        .wizard-button:hover {
            background: #1d4ed8;
        }
        
        .wizard-button:disabled {
            background: #9ca3af;
            cursor: not-allowed;
        }
        
        .pricing-section {
            max-width: 1000px;
            margin: 4rem auto;
            padding: 0 2rem;
        }
        
        .pricing-section h2 {
            text-align: center;
            color: #2563eb;
            margin-bottom: 3rem;
            font-size: 2.5rem;
        }
        
        .pricing-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }
        
        .pricing-card {
            background: white;
            padding: 2.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.07);
            text-align: center;
            transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .pricing-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        }
        
        .pricing-card.featured {
            border: 3px solid #2563eb;
            transform: scale(1.05);
        }
        
        .price {
            font-size: 3rem;
            font-weight: 700;
            color: #2563eb;
            margin: 1rem 0;
        }
        
        .price-label {
            color: #6b7280;
            font-size: 0.875rem;
        }
        
        .features-list {
            list-style: none;
            margin: 2rem 0;
            text-align: left;
        }
        
        .features-list li {
            padding: 0.5rem 0;
            padding-left: 1.5rem;
            position: relative;
        }
        
        .features-list li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #10b981;
            font-weight: bold;
        }
        
        .footer {
            background: #1f2937;
            color: white;
            padding: 3rem 2rem;
            margin-top: 4rem;
        }
        
        .footer-content {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
        }
        
        .footer h4 {
            margin-bottom: 1rem;
            color: #60a5fa;
        }
        
        .footer a {
            color: #d1d5db;
            text-decoration: none;
            display: block;
            margin-bottom: 0.5rem;
        }
        
        .footer a:hover {
            color: white;
        }
        
        .disclaimer {
            max-width: 1200px;
            margin: 2rem auto 0;
            padding-top: 2rem;
            border-top: 1px solid #374151;
            font-size: 0.875rem;
            color: #9ca3af;
            text-align: center;
        }
        
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2rem;
            }
            
            .hero p {
                font-size: 1rem;
            }
            
            .features {
                margin-top: 2rem;
            }
            
            .wizard-card {
                padding: 2rem 1.5rem;
            }
            
            .pricing-card.featured {
                transform: scale(1);
            }
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="header-content">
            <a href="#" class="logo">Fix1099</a>
            <button class="nav-button" onclick="startWizard()">Get Started</button>
        </div>
    </header>

    <section class="hero">
        <div class="hero-content">
            <h1>1099 Tax Filing Made Simple</h1>
            <p>File your 1099-NEC, 1099-MISC, and 1099-K forms in 5 minutes. No tax expertise required.</p>
            <button class="cta-button" onclick="startWizard()">Start Filing Now</button>
        </div>
    </section>

    <section class="features">
        <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3>5-Minute Filing</h3>
            <p>Answer a few simple questions. We handle the rest.</p>
        </div>
        <div class="feature-card">
            <div class="feature-icon">🎯</div>
            <h3>Auto-Detect Forms</h3>
            <p>We automatically determine which 1099 form you need.</p>
        </div>
        <div class="feature-card">
            <div class="feature-icon">🔒</div>
            <h3>IRS E-File</h3>
            <p>Direct electronic filing to the IRS. Fast and secure.</p>
        </div>
        <div class="feature-card">
            <div class="feature-icon">💯</div>
            <h3>State Compliance</h3>
            <p>We check state requirements and notify you if needed.</p>
        </div>
    </section>

    <section class="wizard-section" id="wizardSection">
        <div class="wizard-card">
            <h2>Let's File Your 1099</h2>
            
            <div class="question">
                <label>Who did you pay?</label>
                <input type="text" id="recipientName" placeholder="e.g., John Smith or ABC Services LLC">
            </div>
            
            <div class="question">
                <label>How much did you pay them in 2024?</label>
                <input type="number" id="amount" placeholder="e.g., 5000" min="0">
            </div>
            
            <div class="question">
                <label>What did they do for you?</label>
                <div class="option-buttons">
                    <div class="option-button" onclick="selectService('contractor')">
                        <strong>Services/Contractor Work</strong>
                        <p style="font-size: 0.875rem; margin-top: 0.5rem;">Design, consulting, freelance</p>
                    </div>
                    <div class="option-button" onclick="selectService('rent')">
                        <strong>Rent</strong>
                        <p style="font-size: 0.875rem; margin-top: 0.5rem;">Office space, equipment rental</p>
                    </div>
                    <div class="option-button" onclick="selectService('payment')">
                        <strong>Payment Platform</strong>
                        <p style="font-size: 0.875rem; margin-top: 0.5rem;">Venmo, CashApp, Zelle</p>
                    </div>
                </div>
            </div>
            
            <div class="question">
                <label>Your Business State</label>
                <select id="businessState">
                    <option value="">Select state...</option>
                    <option value="CA">California</option>
                    <option value="NY">New York</option>
                    <option value="TX">Texas</option>
                    <option value="FL">Florida</option>
                    <option value="IL">Illinois</option>
                </select>
            </div>
            
            <div class="wizard-nav">
                <button class="wizard-button" onclick="showPricing()">Continue to Payment</button>
            </div>
        </div>
    </section>

    <section class="pricing-section">
        <h2>Choose Your Plan</h2>
        <div class="pricing-cards">
            <div class="pricing-card">
                <h3>Single Filing</h3>
                <div class="price">$49.99</div>
                <div class="price-label">One-time payment</div>
                <ul class="features-list">
                    <li>File 1 contractor/recipient</li>
                    <li>IRS electronic filing</li>
                    <li>Recipient copy generation</li>
                    <li>Email support</li>
                </ul>
                <button class="cta-button" onclick="checkout('single')">Select Plan</button>
            </div>
            
            <div class="pricing-card featured">
                <h3>Annual Unlimited</h3>
                <div class="price">$199.99</div>
                <div class="price-label">Per year</div>
                <ul class="features-list">
                    <li><strong>Unlimited filings</strong></li>
                    <li>IRS electronic filing</li>
                    <li>Recipient copy generation</li>
                    <li>Priority support</li>
                    <li>2025 tax season reminders</li>
                    <li>W-9 collection tools</li>
                </ul>
                <button class="cta-button" onclick="checkout('annual')">Select Plan</button>
            </div>
        </div>
    </section>

    <footer class="footer">
        <div class="footer-content">
            <div>
                <h4>Product</h4>
                <a href="#">How It Works</a>
                <a href="#">Pricing</a>
                <a href="#">FAQ</a>
            </div>
            <div>
                <h4>Support</h4>
                <a href="#">Help Center</a>
                <a href="#">Contact Us</a>
                <a href="#">Tax Deadlines</a>
            </div>
            <div>
                <h4>Legal</h4>
                <a href="#">Terms of Service</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Refund Policy</a>
            </div>
            <div>
                <h4>Company</h4>
                <a href="#">About Us</a>
                <a href="#">Blog</a>
            </div>
        </div>
        <div class="disclaimer">
            <p><strong>Important Disclaimer:</strong> Fix1099 is a tax form preparation and filing service. We are not a law firm, accounting firm, or substitute for professional tax advice. This service prepares and submits 1099 forms based on information you provide. For complex tax situations, consult a licensed tax professional.</p>
            <p style="margin-top: 1rem;">© 2025 Fix1099. All rights reserved.</p>
        </div>
    </footer>

    <script>
        let selectedService = null;
        
        function startWizard() {
            document.getElementById('wizardSection').scrollIntoView({ behavior: 'smooth' });
            document.getElementById('wizardSection').classList.add('active');
        }
        
        function selectService(type) {
            selectedService = type;
            document.querySelectorAll('.option-button').forEach(btn => {
                btn.classList.remove('selected');
            });
            event.target.closest('.option-button').classList.add('selected');
        }
        
        function showPricing() {
            const name = document.getElementById('recipientName').value;
            const amount = document.getElementById('amount').value;
            const state = document.getElementById('businessState').value;
            
            if (!name || !amount || !selectedService || !state) {
                alert('Please fill in all fields');
                return;
            }
            
            let formType = '';
            if (selectedService === 'contractor') formType = '1099-NEC';
            else if (selectedService === 'rent') formType = '1099-MISC';
            else if (selectedService === 'payment') formType = '1099-K';
            
            alert(`Great! Based on your answers, you need a ${formType} form. Scroll down to choose your plan.`);
            
            document.querySelector('.pricing-section').scrollIntoView({ behavior: 'smooth' });
        }
        
        function checkout(plan) {
            alert(`Stripe payment will be integrated here for the ${plan} plan`);
        }
    </script>
</body>
</html>
```

---

## 现在做：上传到GitHub

1. **回到GitHub仓库首页**：
```
https://github.com/airapid2006/fix1099
