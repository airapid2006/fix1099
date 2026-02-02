<!DOCTYPE html>
<html>
<head>
  <title>Fix1099 - IRS 1099 Fix Service</title>
  <script src="https://js.stripe.com/v3/"></script>
  <style>
    body { font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; }
    h1 { font-size: 3em; color: #1a1a1a; margin-bottom: 0.3em; }
    .subtitle { font-size: 1.2em; color: #666; margin-bottom: 3em; }
    .price { background: #000; color: #fff; padding: 40px; border-radius: 12px; text-align: center; margin: 30px 0; }
    .price.popular { background: linear-gradient(135deg, #635bff, #8b5cf6); box-shadow: 0 20px 40px rgba(99,91,255,0.3); }
    .price h2 { font-size: 2.2em; margin: 0 0 0.5em 0; }
    button { background: #fff; color: #000; border: none; padding: 18px 36px; border-radius: 50px; font-size: 18px; font-weight: 600; cursor: pointer; transition: all 0.3s; }
    button:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(0,0,0,0.2); }
    .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2em; margin: 3em 0; }
    .coming-soon { text-align: center; color: #888; font-style: italic; margin-top: 3em; }
  </style>
</head>
<body>
  <h1>🔥 Fix1099</h1>
  <p class="subtitle"><strong>Fix your 1099 forms in minutes.</strong> IRS-compliant corrections for freelancers & small businesses.</p >
  
  <div class="features">
    <div><h3>✅ IRS Compliant</h3><p>100% tax authority approved</p ></div>
    <div><h3>⚡ Instant Results</h3><p>Upload → AI analysis → Download</p ></div>
    <div><h3>🔒 Secure</h3><p>Enterprise-grade encryption</p ></div>
  </div>

  <div class="price">
    <h2>Single 1099 Fix</h2>
    <p>1 × IRS 1099 correction + compliance check</p >
    <button id="single-fix">Pay $99 → Buy Now</button>
  </div>

  <div class="price popular">
    <h2 style="color: #fff;">Annual Guardian</h2>
    <p style="color: rgba(255,255,255,0.9);">Unlimited fixes + priority support (Most Popular)</p >
    <button id="annual" style="background: #fff; color: #635bff;">Pay $299/year → Buy Now</button>
  </div>

  <p class="coming-soon">2026 tax season ready • Deployed on Vercel • Test mode active</p >

  <script>
    const stripe = Stripe('pk_test_51SwQBtFU4CCHBdZV5vPi5rcoj6agIceuCbhfH2Ti3zXYoov8TQ4UVormy5harfbr6uYrWcDvormCVZxwytxHtJvF00ecfskUnD');
    
    // $99 单次支付 - 真实Price ID
    document.getElementById('single-fix').addEventListener('click', async () => {
      const {error} = await stripe.redirectToCheckout({
        lineItems: [{price: 'price_1SwQYCFU4CCHBdZVpLvfVEVF', quantity: 1}],
        mode: 'payment',
        successUrl: window.location.origin + '?success=1',
        cancelUrl: window.location.origin + '?canceled=1',
      });
      if (error) alert(error.message);
    });
    
    // $299 年付 - 真实Price ID  
    document.getElementById('annual').addEventListener('click', async () => {
      const {error} = await stripe.redirectToCheckout({
        lineItems: [{price: 'price_1SwQcCFU4CCHBdZVYIdLuosw', quantity: 1}],
        mode: 'subscription',
        successUrl: window.location.origin + '?success=1',
        cancelUrl: window.location.origin + '?canceled=1',
      });
      if (error) alert(error.message);
    });
  </script>
</body>
</html>
