<!DOCTYPE html>
<html>
<head>
  <title>Fix1099 - IRS 1099 Fix Service</title>
  <script src="https://js.stripe.com/v3/"></script>
  <style>
    body { 
      font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif; 
      max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.6;
    }
    h1 { font-size: 3.5em; color: #1a1a1a; margin-bottom: 0.2em; }
    .subtitle { font-size: 1.3em; color: #666; margin-bottom: 2em; }
    .price { 
      background: #000; color: #fff; padding: 40px; border-radius: 12px; 
      text-align: center; margin: 30px 0; box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }
    .price h2 { font-size: 2.2em; margin: 0 0 0.5em 0; }
    .price p { margin: 0 0 1.5em 0; opacity: 0.9; }
    button { 
      background: #fff; color: #000; border: none; padding: 18px 40px; 
      border-radius: 50px; font-size: 18px; font-weight: 600; cursor: pointer;
      transition: all 0.3s; box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    }
    button:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(0,0,0,0.2); }
    .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2em; margin: 4em 0; }
    .feature { text-align: center; }
    .coming-soon { text-align: center; color: #888; font-style: italic; margin-top: 3em; }
  </style>
</head>
<body>
  <h1>🔥 Fix1099</h1>
  <p class="subtitle"><strong>Automated 1099 corrections in minutes.</strong> IRS-compliant service for freelancers & small businesses.</p >
  
  <div class="features">
    <div class="feature">
      <h3>✅ IRS Compliant</h3>
      <p>100% tax authority approved corrections</p >
    </div>
    <div class="feature">
      <h3>⚡ Instant Results</h3>
      <p>Upload → AI analysis → Download corrected forms</p >
    </div>
    <div class="feature">
      <h3>🔒 Secure</h3>
      <p>Enterprise-grade encryption & compliance</p >
    </div>
  </div>

  <div class="price">
    <h2>Single Fix</h2>
    <p>1 × 1099 correction + IRS compliance</p >
    <button id="single-fix">Pay $99</button>
  </div>
  
  <div class="price" style="background: #635bff; box-shadow: 0 20px 40px rgba(99,91,255,0.3);">
    <h2 style="color: #fff;">3-Pack (Most Popular)</h2>
    <p style="color: rgba(255,255,255,0.9);">3 × 1099 corrections - Save $148!</p >
    <button id="three-pack" style="background: #fff; color: #635bff;">Pay $149</button>
  </div>
  
  <div class="price">
    <h2>Annual Guardian</h2>
    <p>Unlimited fixes for 1 year + priority support</p >
    <button id="annual">Pay $299/year</button>
  </div>
  
  <p class="coming-soon">2026 tax season ready • Deployed on Vercel</p >

  <script>
    const stripe = Stripe('pk_test_51SwQBtFU4CCHBdZV5vPi5rcoj6agIceuCbhfH2Ti3zXYoov8TQ4UVormy5harfbr6uYrWcDvormCVZxwytxHtJvF00ecfskUnD');
    
    // 注意：这里用price ID，不是product ID。需要从Stripe Dashboard → Products → 点击价格 → 复制price_xxx
    // 暂时用占位符，收到真实price ID后替换
    
    document.getElementById('single-fix').addEventListener('click', async () => {
      const {error} = await stripe.redirectToCheckout({
        lineItems: [{price: 'price_99_placeholder', quantity: 1}],
        mode: 'payment',
        successUrl: window.location.origin + '/success.html',
        cancelUrl: window.location.origin + '/cancel.html',
      });
      if (error) alert(error.message);
    });
    
    document.getElementById('three-pack').addEventListener('click', async () => {
      const {error} = await stripe.redirectToCheckout({
        lineItems: [{price: 'price_149_placeholder', quantity: 1}],
        mode: 'payment',
        successUrl: window.location.origin + '/success.html',
        cancelUrl: window.location.origin + '/cancel.html',
      });
      if (error) alert(error.message);
    });
    
    document.getElementById('annual').addEventListener('click', async () => {
      const {error} = await stripe.redirectToCheckout({
        lineItems: [{price: 'price_299_placeholder', quantity: 1}],
        mode: 'subscription',
        successUrl: window.location.origin + '/success.html',
        cancelUrl: window.location.origin + '/cancel.html',
      });
      if (error) alert(error.message);
    });
  </script>
</body>
</html>


