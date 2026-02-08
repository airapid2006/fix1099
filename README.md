<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fix1099 - 1099 Tax Filing Made Simple</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <script src="https://js.stripe.com/v3/"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #2d3748; background: #f7fafc; }
        .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-align: center; padding: 80px 20px 60px; }
        .hero h1 { font-size: clamp(32px, 5vw, 52px); font-weight: 700; margin-bottom: 16px; }
        .hero .subtitle { font-size: clamp(16px, 3vw, 22px); opacity: 0.95; margin-bottom: 40px; max-width: 700px; margin-left: auto; margin-right: auto; }
        .btn-hero { display: inline-block; padding: 18px 60px; font-size: 20px; font-weight: 600; background: white; color: #667eea; border: none; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); cursor: pointer; transition: all 0.3s ease; }
        .btn-hero:hover { transform: translateY(-3px); box-shadow: 0 15px 40px rgba(0,0,0,0.3); }
        .trust-badges { margin-top: 30px; font-size: 14px; opacity: 0.95; }
        .trust-badges span { margin: 0 15px; display: inline-block; }
        .features { max-width: 1200px; margin: -40px auto 60px; padding: 0 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; }
        .feature-card { background: white; padding: 32px 24px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); text-align: center; }
        .feature-icon { font-size: 48px; margin-bottom: 16px; }
        .feature-card h3 { color: #667eea; font-size: 20px; margin-bottom: 8px; }
        .pricing-section { max-width: 1000px; margin: 60px auto; padding: 0 20px; }
        .pricing-section h2 { text-align: center; color: #1a202c; margin-bottom: 48px; font-size: 36px; }
        .pricing-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 32px; }
        .pricing-card { background: white; padding: 40px 32px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); text-align: center; position: relative; }
        .pricing-card.featured { border: 3px solid #667eea; }
        .pricing-card.featured::before { content: "BEST VALUE"; position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 6px 20px; border-radius: 20px; font-size: 12px; font-weight: 700; }
        .price { font-size: 48px; font-weight: 700; color: #667eea; margin: 20px 0; }
        .features-list { list-style: none; text-align: left; margin: 32px 0; }
        .features-list li { padding: 12px 0; padding-left: 32px; position: relative; }
        .features-list li:before { content: "✓"; position: absolute; left: 0; color: #10b981; font-weight: bold; font-size: 20px; }
        .btn-primary { width: 100%; padding: 16px; font-size: 18px; font-weight: 600; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 12px; cursor: pointer; transition: all 0.3s ease; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(102,126,234,0.3); }
        .footer { background: #1a202c; color: white; padding: 40px 20px; margin-top: 80px; text-align: center; }
        @media (max-width: 768px) { .features { margin-top: 20px; } .trust-badges span { display: block; margin: 8px 0; } }
    </style>
</head>
<body>
    <section class="hero">
        <h1>1099 Tax Filing Made Simple</h1>
        <p class="subtitle">File 1099-NEC, 1099-MISC, and 1099-K in 5 minutes. No tax expertise required.</p>
        <button class="btn-hero" onclick="document.querySelector('.pricing-section').scrollIntoView({behavior: 'smooth'})">Start Filing Now →</button>
        <div class="trust-badges">
            <span>🔒 IRS Approved</span>
            <span>⚡ 5 Minutes</span>
            <span>💯 State Compliant</span>
        </div>
    </section>

    <section class="features">
        <div class="feature-card">
            <div class="feature-icon">🎯</div>
            <h3>Auto-Detect Forms</h3>
            <p>We determine which 1099 form you need</p>
        </div>
        <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3>5-Minute Filing</h3>
            <p>Simple questions, no tax knowledge needed</p>
        </div>
        <div class="feature-card">
            <div class="feature-icon">🔒</div>
            <h3>IRS E-File</h3>
            <p>Direct electronic submission to IRS</p>
        </div>
        <div class="feature-card">
            <div class="feature-icon">📍</div>
            <h3>State Compliance</h3>
            <p>We check state requirements for you</p>
        </div>
    </section>

    <section class="pricing-section">
        <h2>Simple Pricing</h2>
        <div class="pricing-cards">
            <div class="pricing-card">
                <h3>Single Filing</h3>
                <div class="price">$49.99</div>
                <p>One-time payment</p>
                <ul class="features-list">
                    <li>1 contractor filing</li>
                    <li>IRS e-filing</li>
                    <li>Recipient copy</li>
                    <li>Email support</li>
                </ul>
                <button class="btn-primary" id="checkout-single">Get Started</button>
            </div>
            <div class="pricing-card featured">
                <h3>Annual Unlimited</h3>
                <div class="price">$199.99</div>
                <p>Per year</p>
                <ul class="features-list">
                    <li><strong>Unlimited filings</strong></li>
                    <li>IRS e-filing</li>
                    <li>Recipient copies</li>
                    <li>Priority support</li>
                    <li>W-9 collection tools</li>
                </ul>
                <button class="btn-primary" id="checkout-annual">Get Started</button>
            </div>
        </div>
    </section>

    <footer class="footer">
        <p><strong>Disclaimer:</strong> Fix1099 is a tax preparation service. Not a substitute for professional tax advice.</p>
        <p style="margin-top:20px;">© 2025 Fix1099. All rights reserved.</p>
    </footer>

    <script>
        document.getElementById('checkout-single').addEventListener('click', function() {
            window.location.href = 'https://buy.stripe.com/test_3cIfZhftf9ryewcgt98bS03';
        });

        document.getElementById('checkout-annual').addEventListener('click', function() {
            window.location.href = 'https://buy.stripe.com/test_28E28r5SF5bi0Fma4L8bS05';
        });
    </script>
</body>
</html>
