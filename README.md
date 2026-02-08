<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fix1099 - 1099 Tax Filing Made Simple</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.6;
            color: #2d3748;
            background: #f7fafc;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        .hero {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
            padding: 80px 20px 60px;
        }

        .hero h1 {
            font-size: clamp(32px, 5vw, 52px);
            font-weight: 700;
            margin-bottom: 16px;
        }

        .hero .subtitle {
            font-size: clamp(16px, 3vw, 22px);
            opacity: 0.95;
            margin-bottom: 40px;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
        }

        .btn-hero {
            display: inline-block;
            padding: 18px 60px;
            font-size: 20px;
            font-weight: 600;
            background: white;
            color: #667eea;
            text-decoration: none;
            border: none;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .btn-hero:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.3);
        }

        .trust-badges {
            margin-top: 30px;
            font-size: 14px;
            opacity: 0.95;
        }

        .trust-badges span {
            margin: 0 15px;
            display: inline-block;
        }

        .deadline {
            margin-top: 20px;
            font-size: 14px;
            opacity: 0.9;
        }

        .deadline strong {
            font-weight: 700;
            font-size: 18px;
        }

        .features {
            max-width: 1200px;
            margin: -40px auto 60px;
            padding: 0 20px;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 24px;
        }

        .feature-card {
            background: white;
            padding: 32px 24px;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            text-align: center;
            transition: transform 0.3s ease;
        }

        .feature-card:hover {
            transform: translateY(-5px);
        }

        .feature-icon {
            font-size: 48px;
            margin-bottom: 16px;
            display: block;
        }

        .feature-card h3 {
            color: #667eea;
            font-size: 20px;
            margin-bottom: 8px;
        }

        .feature-card p {
            color: #718096;
            font-size: 15px;
        }

        .pricing-section {
            max-width: 1000px;
            margin: 60px auto;
            padding: 0 20px;
        }

        .pricing-section h2 {
            text-align: center;
            color: #1a202c;
            margin-bottom: 48px;
            font-size: 36px;
        }

        .pricing-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 32px;
        }

        .pricing-card {
            background: white;
            padding: 40px 32px;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            text-align: center;
            transition: all 0.3s ease;
            position: relative;
        }

        .pricing-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 40px rgba(0,0,0,0.12);
        }

        .pricing-card.featured {
            border: 3px solid #667eea;
        }

        .pricing-card.featured::before {
            content: "BEST VALUE";
            position: absolute;
            top: -12px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 6px 20px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 700;
        }

        .pricing-card h3 {
            font-size: 24px;
            color: #1a202c;
            margin-bottom: 16px;
        }

        .price {
            font-size: 48px;
            font-weight: 700;
            color: #667eea;
            margin: 20px 0;
        }

        .price-label {
            color: #718096;
            font-size: 14px;
            margin-bottom: 32px;
        }

        .features-list {
            list-style: none;
            text-align: left;
            margin: 32px 0;
        }

        .features-list li {
            padding: 12px 0;
            padding-left: 32px;
            position: relative;
            color: #2d3748;
        }

        .features-list li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #10b981;
            font-weight: bold;
            font-size: 20px;
        }

        .btn-primary {
            width: 100%;
            padding: 16px;
            font-size: 18px;
            font-weight: 600;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(102,126,234,0.3);
        }

        .footer {
            background: #1a202c;
            color: white;
            padding: 60px 20px 40px;
            margin-top: 80px;
        }

        .footer-content {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 40px;
            margin-bottom: 40px;
        }

        .footer h4 {
            color: #667eea;
            margin-bottom: 16px;
            font-size: 16px;
        }

        .footer a {
            color: #a0aec0;
            text-decoration: none;
            display: block;
            margin-bottom: 8px;
            font-size: 14px;
        }

        .footer a:hover {
            color: white;
        }

        .disclaimer {
            max-width: 1200px;
            margin: 0 auto;
            padding-top: 40px;
            border-top: 1px solid #2d3748;
            font-size: 13px;
            color: #718096;
            text-align: center;
        }

        @media (max-width: 768px) {
            .hero {
                padding: 60px 20px 40px;
            }

            .features {
                margin-top: 20px;
            }

            .trust-badges span {
                display: block;
                margin: 8px 0;
            }

            .pricing-cards {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <section class="hero">
        <div class="container">
            <h1>1099 Tax Filing Made Simple</h1>
            <p class="subtitle">File 1099-NEC, 1099-MISC, and 1099-K in 5 minutes. No tax expertise required. We handle IRS e-filing for you.</p>
            <button class="btn-hero" onclick="alert('Starting wizard... (will connect to form)')">Start Filing Now →</button>
            <div class="trust-badges">
                <span>🔒 IRS Approved E-File Provider</span>
                <span>⚡ Average completion: 5 minutes</span>
                <span>💯 State compliance included</span>
            </div>
            <div class="deadline">
                <strong>⏰ 2024 Tax Year Deadline: January 31, 2025</strong>
            </div>
        </div>
    </section>

    <section class="features">
        <div class="feature-card">
            <span class="feature-icon">🎯</span>
            <h3>Auto-Detect Forms</h3>
            <p>Answer simple questions. We automatically determine which 1099 form you need—NEC, MISC, or K.</p>
        </div>
        <div class="feature-card">
            <span class="feature-icon">⚡</span>
            <h3>5-Minute Filing</h3>
            <p>No tax knowledge required. Our guided wizard handles all the complexity for you.</p>
        </div>
        <div class="feature-card">
            <span class="feature-icon">🔒</span>
            <h3>Direct IRS E-File</h3>
            <p>We electronically submit to the IRS. Fast, secure, and compliant with federal requirements.</p>
        </div>
        <div class="feature-card">
            <span class="feature-icon">📍</span>
            <h3>State Compliance</h3>
            <p>We check all state requirements and notify you if additional state filing is needed.</p>
        </div>
    </section>

    <section class="pricing-section">
        <h2>Simple, Transparent Pricing</h2>
        <div class="pricing-cards">
            <div class="pricing-card">
                <h3>Single Filing</h3>
                <div class="price">$49.99</div>
                <div class="price-label">One-time payment</div>
                <ul class="features-list">
                    <li>File 1 contractor/recipient</li>
                    <li>IRS electronic filing included</li>
                    <li>Recipient copy generation</li>
                    <li>Email support</li>
                    <li>Instant filing confirmation</li>
                </ul>
                <button class="btn-primary" onclick="alert('Checkout: Single Plan')">Get Started</button>
            </div>
            
            <div class="pricing-card featured">
                <h3>Annual Unlimited</h3>
                <div class="price">$199.99</div>
                <div class="price-label">Per year · Best for businesses</div>
                <ul class="features-list">
                    <li><strong>Unlimited 1099 filings</strong></li>
                    <li>IRS electronic filing included</li>
                    <li>Recipient copy generation</li>
                    <li>Priority email support</li>
                    <li>2026 tax season reminders</li>
                    <li>W-9 collection tools</li>
                    <li>Bulk upload capability</li>
                </ul>
                <button class="btn-primary" onclick="alert('Checkout: Annual Plan')">Get Started</button>
            </div>
        </div>
    </section>

    <footer class="footer">
        <div class="footer-content">
            <div>
                <h4>Product</h4>
                <a href="#">How It Works</a>
                <a href="#">Pricing</a>
                <a href="#">Supported Forms</a>
                <a href="#">FAQ</a>
            </div>
            <div>
                <h4>Support</h4>
                <a href="#">Help Center</a>
                <a href="#">Contact Us</a>
                <a href="#">Tax Deadlines 2025</a>
                <a href="#">IRS Resources</a>
            </div>
            <div>
                <h4>Legal</h4>
                <a href="#">Terms of Service</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Refund Policy</a>
                <a href="#">Security</a>
            </div>
            <div>
                <h4>Company</h4>
                <a href="#">About Us</a>
                <a href="#">Blog</a>
                <a href="#">Press Kit</a>
            </div>
        </div>
        <div class="disclaimer">
            <p><strong>Important Disclaimer:</strong> Fix1099 is a tax form preparation and electronic filing service. We are not a law firm, CPA firm, or substitute for professional tax advice. This service prepares and submits 1099 forms to the IRS based on information you provide. For complex tax situations or questions about tax liability, please consult a licensed tax professional or CPA.</p>
            <p style="margin-top: 20px;">© 2025 Fix1099. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>
