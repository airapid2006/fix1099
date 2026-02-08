<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fix1099 - 1099 Tax Filing Made Simple</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
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
        .pricing-section { max-width: 1100px; margin: 60px auto; padding: 0 20px; }
        .pricing-header { text-align: center; margin-bottom: 48px; }
        .pricing-header h2 { font-size: 36px; color: #1a202c; margin-bottom: 12px; }
        .pricing-header p { font-size: 18px; color: #718096; }
        .pricing-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 32px; }
        .pricing-card { background: white; padding: 40px 32px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); position: relative; }
        .pricing-card.featured { border: 3px solid #667eea; order: -1; }
        .pricing-card.featured::before { content: "MOST POPULAR ⭐"; position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 6px 20px; border-radius: 20px; font-size: 12px; font-weight: 700; }
        .plan-name { font-size: 24px; font-weight: 700; color: #1a202c; margin-bottom: 16px; }
        .price { font-size: 48px; font-weight: 700; color: #667eea; margin: 20px 0 8px; }
        .price-period { color: #718096; font-size: 16px; margin-bottom: 20px; }
        .plan-description { color: #4a5568; font-size: 15px; margin-bottom: 24px; padding-bottom: 24px; border-bottom: 2px solid #e2e8f0; }
        .features-list { list-style: none; margin: 24px 0; text-align: left; }
        .features-list li { padding: 10px 0; padding-left: 32px; position: relative; font-size: 15px; color: #2d3748; }
        .features-list li:before { content: "✓"; position: absolute; left: 0; color: #10b981; font-weight: bold; font-size: 20px; }
        .limitation-box { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 24px 0; border-radius: 8px; font-size: 14px; color: #78350f; line-height: 1.5; }
        .policy-text { background: #f3f4f6; padding: 16px; margin: 24px 0; border-radius: 8px; font-size: 13px; color: #4b5563; line-height: 1.6; text-align: left; }
        .btn-primary { width: 100%; padding: 16px; font-size: 18px; font-weight: 600; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 12px; cursor: pointer; transition: all 0.3s ease; margin-top: 24px; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(102,126,234,0.3); }
        .auto-detect-notice { background: #eff6ff; border: 2px solid #93c5fd; border-radius: 12px; padding: 24px; margin: 48px auto; max-width: 800px; text-align: center; }
        .auto-detect-notice h3 { color: #1e40af; font-size: 20px; margin-bottom: 12px; }
        .auto-detect-notice p { color: #1e3a8a; font-size: 15px; line-height: 1.6; }
        .disclaimer-section { background: #f9fafb; border-top: 2px solid #e5e7eb; padding: 40px 20px; margin-top: 60px; }
        .disclaimer-content { max-width: 900px; margin: 0 auto; }
        .disclaimer-content h3 { color: #1a202c; font-size: 20px; margin-bottom: 16px; }
        .disclaimer-content ul { margin-left: 24px; color: #4b5563; font-size: 14px; line-height: 1.8; }
        .cta-section { text-align: center; margin: 48px auto; }
        .cta-section p { color: #4b5563; font-size: 16px; margin-bottom: 16px; }
        .cta-section a { color: #667eea; text-decoration: none; font-weight: 600; }
        .cta-section a:hover { text-decoration: underline; }
        .footer { background: #1a202c; color: white; padding: 40px 20px; text-align: center; }
        @media (max-width: 768px) { .trust-badges span { display: block; margin: 8px 0; } .pricing-cards { grid-template-columns: 1fr; } .pricing-card.featured { order: 0; } }
    </style>
</head>
<body>
    <section class="hero">
        <h1>$59.99 一次搞定，$199.99 一年安心</h1>
        <p class="subtitle">1099 tax filing made simple. No tax knowledge required.</p>
        <button class="btn-hero" onclick="document.querySelector('.pricing-section').scrollIntoView({behavior: 'smooth'})">Choose Your Plan →</button>
        <div class="trust-badges">
            <span>🔒 IRS Approved E-File</span>
            <span>⚡ 5 Minutes Average</span>
            <span>💯 State Compliance Checked</span>
        </div>
    </section>

    <section class="pricing-section">
        <div class="pricing-header">
            <h2>Pricing</h2>
            <p>简单、透明、没有隐藏费用<br>只为帮你把 1099 一次性做对</p>
        </div>

        <div class="pricing-cards">
            <div class="pricing-card featured">
                <div class="plan-name">Annual Plan</div>
                <div class="price">$199.99</div>
                <div class="price-period">per year</div>
                <div class="plan-description">适合需要全年安心的个人与小商家</div>
                
                <ul class="features-list">
                    <li>不限次数 1099 申报（NEC / MISC）</li>
                    <li>W-9 自动收集与管理</li>
                    <li>自动匹配正确 IRS 税表</li>
                    <li>电子提交 IRS</li>
                    <li>更正 / 重提不额外收费</li>
                    <li>提交回执全年保存</li>
                    <li>州级申报需求提醒（如适用）</li>
                </ul>

                <div class="policy-text">
                    Cancel anytime. Subscription remains active until the end of the billing period. No refunds for fees already paid.
                </div>

                <button class="btn-primary" id="checkout-annual">Get Started</button>
            </div>

            <div class="pricing-card">
                <div class="plan-name">Single Filing</div>
                <div class="price">$59.99</div>
                <div class="price-period">one-time</div>
                <div class="plan-description">适合只需申报一次的用户</div>
                
                <ul class="features-list">
                    <li>单次 1099 申报</li>
                    <li>W-9 收集（本次）</li>
                    <li>自动匹配正确 IRS 税表</li>
                    <li>电子提交 IRS</li>
                    <li>Recipient Copy 下载</li>
                    <li>提交回执</li>
                </ul>

                <div class="limitation-box">
                    <strong>⚠️ 仅限一次申报批次</strong><br>
                    更正或追加申报需再次付费
                </div>

                <button class="btn-primary" id="checkout-single">File Once</button>
            </div>
        </div>

        <div class="auto-detect-notice">
            <h3>你无需了解税表号码</h3>
            <p>我们会根据你的付款情况<br>自动匹配正确的 IRS 税表并提交</p>
        </div>
    </section>

    <div class="disclaimer-section">
        <div class="disclaimer-content">
            <h3>重要说明</h3>
            <ul>
                <li>本服务为信息申报服务（Information Return Filing）</li>
                <li>不提供个人报税、退税或税务建议</li>
                <li>税务文件一经生成或提交，即视为服务已履行</li>
                <li>所有费用均不可退款</li>
            </ul>
        </div>
        
        <div class="cta-section">
            <p><strong>Still not sure?</strong></p>
            <p>If you have complex or business compliance needs, <a href="mailto:support@fix1099.com">contact us</a>.</p>
        </div>
    </div>

    <footer class="footer">
        <p><strong>Disclaimer:</strong> Fix1099 is a tax form preparation and electronic filing service. We are not a law firm, CPA firm, or substitute for professional tax advice.</p>
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
