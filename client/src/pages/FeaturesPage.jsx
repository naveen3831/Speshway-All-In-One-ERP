import React, { useState } from 'react';
import { Navbar } from '../components/landing/Navbar';
import { CtaBanner } from '../components/landing/CtaBanner';
import { Footer } from '../components/landing/Footer';
import { DemoModal } from '../components/landing/DemoModal';
import {
  Zap,
  ShieldCheck,
  RefreshCw,
  Database,
  Lock,
  Globe2,
  Users2,
  Layers,
  BarChart,
} from 'lucide-react';

export const FeaturesPage = () => {
  const [modalMode, setModalMode] = useState(null);

  const features = [
    {
      icon: RefreshCw,
      title: 'Real-Time WebSocket Synchronization',
      desc: 'All ERP events, employee clock-ins, invoice generation, and project tasks stream live across all connected client tabs without manual page refreshing.',
      tag: 'Socket.IO Core',
    },
    {
      icon: ShieldCheck,
      title: 'Role-Based Access Control (RBAC)',
      desc: 'Granular role permissions for Super Admins, Department Managers, HR Specialists, Accountants, and Field Employees with JWT-secured endpoints.',
      tag: 'Enterprise Security',
    },
    {
      icon: Database,
      title: 'Unified MongoDB Document Engine',
      desc: 'High-throughput document architecture supporting flexible schema evolution, ACID multi-document transactions, and automatic cloud replication.',
      tag: 'MongoDB Atlas',
    },
    {
      icon: Lock,
      title: '256-bit Bank Grade Encryption',
      desc: 'End-to-end encryption for sensitive employee data, financial balances, contract documentation, and payroll payslips at rest and in transit.',
      tag: 'Compliance',
    },
    {
      icon: Globe2,
      title: 'Multi-Currency & Global Tax Compliance',
      desc: 'Built-in support for international tax frameworks (GST, VAT, Sales Tax) with automated exchange rate normalization and localized invoice layouts.',
      tag: 'Global Ready',
    },
    {
      icon: BarChart,
      title: 'Automated Executive Intelligence',
      desc: 'Instant visual charts, custom KPIs, department budget variances, and automated daily email snapshots delivered straight to stakeholders.',
      tag: 'Analytics',
    },
  ];

  return (
    <div className="landing-wrapper">
      <Navbar onOpenGetStarted={() => setModalMode('get-started')} />

      <main className="page-main-container">
        <section className="page-hero-header">
          <div className="section-badge">
            <span>Next-Gen Enterprise Engine</span>
          </div>
          <h1 className="page-hero-title">Engineered for Speed, Scale &amp; Security</h1>
          <p className="page-hero-sub">
            Discover the powerful features that make Speshway All-In-One ERP the platform of choice for modern businesses.
          </p>
        </section>

        <section className="features-deep-grid-section">
          <div className="features-deep-grid">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="feature-deep-card">
                  <div className="feat-tag-row">
                    <span className="feat-tag-pill">{feat.tag}</span>
                  </div>
                  <div className="feat-icon-deep-wrap">
                    <Icon size={28} className="text-icon-green" />
                  </div>
                  <h3 className="feat-deep-title">{feat.title}</h3>
                  <p className="feat-deep-desc">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        <CtaBanner onOpenGetStarted={() => setModalMode('get-started')} />
      </main>

      <Footer
        onOpenGetStarted={() => setModalMode('get-started')}
        onOpenDemo={() => setModalMode('demo')}
      />

      {modalMode && (
        <DemoModal mode={modalMode} onClose={() => setModalMode(null)} />
      )}
    </div>
  );
};
