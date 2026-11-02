import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/landing/Navbar';
import { CtaBanner } from '../components/landing/CtaBanner';
import { Footer } from '../components/landing/Footer';
import { DemoModal } from '../components/landing/DemoModal';
import { CheckCircle2, TrendingUp, Users, Award, Shield, Clock } from 'lucide-react';

export const WhyUsPage = () => {
  const navigate = useNavigate();
  const [modalMode, setModalMode] = useState(null);

  const pillars = [
    {
      icon: TrendingUp,
      title: '38% Operational Cost Reduction',
      desc: 'Replace 8+ fragmented SaaS subscriptions with one unified ERP ecosystem. Lower your software overhead while speeding up cross-department workflows.',
    },
    {
      icon: Clock,
      title: 'Deploy in Days, Not Months',
      desc: 'Intuitive modular architecture with instant out-of-the-box templates, automated employee CSV imports, and zero legacy bloat.',
    },
    {
      icon: Shield,
      title: '99.9% Uptime Guarantee',
      desc: 'Enterprise-grade reliability with automated disaster recovery, geo-redundant backups, and continuous uptime monitoring.',
    },
    {
      icon: Users,
      title: 'Built For Real Teams',
      desc: 'Designed with human-centered ergonomics. Your team will love using Speshway from day one without lengthy employee training programs.',
    },
  ];

  return (
    <div className="landing-wrapper">
      <Navbar onOpenGetStarted={() => setModalMode('get-started')} />

      <main className="page-main-container">
        <section className="page-hero-header">
          <div className="section-badge">
            <span>Why Choose Speshway</span>
          </div>
          <h1 className="page-hero-title">The All-In-One Advantage</h1>
          <p className="page-hero-sub">
            Why 500+ fast-growing enterprises trust Speshway ERP to run their daily operations without friction.
          </p>
        </section>

        <section className="why-us-pillars-section">
          <div className="pillars-grid">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={idx} className="pillar-card">
                  <div className="pillar-icon-box">
                    <Icon size={28} className="text-icon-green" />
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Customer Testimonial Snippet */}
        <section className="quote-section">
          <div className="quote-container">
            <blockquote>
              "Speshway eliminated our spreadsheet chaos. We reconciled payroll in 15 minutes, automated project task deadlines, and connected our accounts seamlessly."
            </blockquote>
            <div className="quote-author">
              <span className="author-name">David Vance</span>
              <span className="author-title">Chief Operating Officer, Apex Global Logistics</span>
            </div>
          </div>
        </section>

        <CtaBanner onOpenGetStarted={() => navigate('/get-started')} />
      </main>

      <Footer
        onOpenGetStarted={() => navigate('/get-started')}
        onOpenDemo={() => setModalMode('demo')}
      />

      {modalMode && (
        <DemoModal mode={modalMode} onClose={() => setModalMode(null)} />
      )}
    </div>
  );
};
