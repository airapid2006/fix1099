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
    
    /* Header */
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
    
    /* Hero Section */
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
    
    /* Features */
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
    
    /* Wizard Section */
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
    
    /* Pricing */
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
    
    /* Policy Notice */
    .policy-notice {
        background: #fef3c7;
        border-left: 4px solid #f59e0b;
        padding: 1rem;
        margin-top: 1.5rem;
        border-radius: 4px;
        font-size: 0.875rem;
        color: #92400e;
    }
    
    /* Footer */
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
    }
    
    .policy-section {
        background: #374151;
        padding: 2rem;
        margin-top: 2rem;
        border-radius: 8px;
    }
    
    .policy-section h4 {
        color: #60a5fa;
        margin-bottom: 1rem;
    }
    
    .policy-section ul {
        list-style: none;
        padding-left: 0;
    }
    
    .policy-section li {
        margin-bottom: 0.75rem;
        padding-left: 1.5rem;
        position: relative;
    }
    
    .policy-section li:before {
        content: "•";
        position: absolute;
        left: 0;
        color: #60a5fa;
        font-weight: bold;
    }
    
    /* Responsive */
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
