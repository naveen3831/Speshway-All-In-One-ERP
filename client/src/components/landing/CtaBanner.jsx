import React from 'react';
import { TrendingUp } from 'lucide-react';

export const CtaBanner = ({ onOpenGetStarted }) => {
  return (
    <section className="cta-banner-section">
      <div className="cta-banner-container">
        <div className="cta-banner-card light-mint-banner">
          <div className="cta-banner-left-wrap">
            <div className="cta-trend-icon-box">
              <TrendingUp size={28} className="text-icon-green" />
            </div>
            <div className="cta-banner-content">
              <h2 className="cta-banner-title dark-text">Ready to Simplify Your Business?</h2>
              <p className="cta-banner-desc slate-text">
                Join 500+ businesses using SPESHWAY ALL IN ONE ERP and manage everything in one place.
              </p>
            </div>
          </div>
          <div className="cta-banner-action">
            <button onClick={onOpenGetStarted} className="btn-cta-green">
              Get Started &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
