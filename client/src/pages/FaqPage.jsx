import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/landing/Navbar';
import { CtaBanner } from '../components/landing/CtaBanner';
import { Footer } from '../components/landing/Footer';
import { DemoModal } from '../components/landing/DemoModal';
import {
  HelpCircle,
  ChevronDown,
  Search,
  ShieldCheck,
  Zap,
  Layers,
  Headphones,
  ArrowRight,
} from 'lucide-react';

const FAQ_DATA = [
  {
    category: 'General & Architecture',
    icon: Layers,
    items: [
      {
        q: 'What is Speshway All In One ERP?',
        a: 'Speshway All In One ERP is a unified enterprise suite offering specialized, industry-ready solutions for healthcare, tours & travels, manufacturing, dairy, retail e-commerce, and salons. It replaces disconnected tools with one centralized platform for operations, HR, finance, and customer workflows.',
      },
      {
        q: 'How does Speshway eliminate data silos across departments?',
        a: 'Because all modules share a unified real-time database and event engine, changes made in inventory, sales, or attendance automatically propagate to financials, reporting, and management dashboards without manual reconciliation.',
      },
      {
        q: 'Can we use only specific industry modules without buying the whole suite?',
        a: 'Yes. Speshway is modular by design. You can start with a single industry solution (e.g., Hospital ERP or Travel ERP) and activate additional capabilities as your operations expand.',
      },
    ],
  },
  {
    category: 'Deployment & Setup',
    icon: Zap,
    items: [
      {
        q: 'How long does implementation typically take?',
        a: 'Most enterprises launch within 3 to 7 business days. Pre-configured industry templates, automated data import assistants, and guided setup wizards reduce implementation time by over 70% compared to legacy ERPs.',
      },
      {
        q: 'Can we import data from our existing legacy spreadsheets and systems?',
        a: 'Yes. Our automated import tools support CSV, Excel, and JSON data formats for customers, inventory, employee records, vendor rosters, and financial charts of accounts.',
      },
      {
        q: 'Do you offer custom API integrations for third-party software?',
        a: 'Speshway features comprehensive REST APIs and Webhook triggers, allowing seamless two-way connectivity with payment processors, biometric time clocks, SMS gateways, and custom internal systems.',
      },
    ],
  },
  {
    category: 'Security & Reliability',
    icon: ShieldCheck,
    items: [
      {
        q: 'How is enterprise business data secured?',
        a: 'We implement bank-grade 256-bit AES encryption at rest and TLS 1.3 in transit. Databases are hosted in multi-region, SOC-2 compliant data centers with automated hourly snapshots and disaster recovery protocols.',
      },
      {
        q: 'What is your guaranteed uptime SLA?',
        a: 'We maintain an audited 99.9% uptime SLA. Our status is monitored 24/7 with automated failover and geo-redundant backups to guarantee continuous business continuity.',
      },
      {
        q: 'Can we set granular role-based permissions for our employees?',
        a: 'Yes. Granular Role-Based Access Control (RBAC) allows administrators to define custom roles, field-level access, approval workflows, and audit logs for every user in your organization.',
      },
    ],
  },
  {
    category: 'Support & Pricing',
    icon: Headphones,
    items: [
      {
        q: 'Is 24/7 customer support included in our subscription?',
        a: 'Yes. All active subscriptions include 24/7 technical support via live chat, email, and ticketing, along with dedicated onboarding specialists for enterprise deployments.',
      },
      {
        q: 'Are software updates and new features included?',
        a: 'Yes. Cloud updates, performance improvements, security patches, and new feature releases are deployed automatically without maintenance downtime or additional charges.',
      },
    ],
  },
];

export const FaqPage = () => {
  const navigate = useNavigate();
  const [modalMode, setModalMode] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openItems, setOpenItems] = useState({ 'General & Architecture-0': true });

  const toggleItem = (key) => {
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const filteredCategories = useMemo(() => {
    return FAQ_DATA.map((cat) => {
      const matchingItems = cat.items.filter(
        (item) =>
          item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.a.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return {
        ...cat,
        items: matchingItems,
      };
    }).filter(
      (cat) =>
        (activeCategory === 'All' || cat.category === activeCategory) &&
        cat.items.length > 0
    );
  }, [searchTerm, activeCategory]);

  return (
    <div className="landing-wrapper">
      <Navbar
        onOpenGetStarted={() => setModalMode('get-started')}
        onOpenDemo={() => setModalMode('demo')}
      />

      <main className="page-main-container">
        {/* Header */}
        <section className="page-hero-header">
          <div className="section-badge">
            <HelpCircle size={14} />
            <span>Frequently Asked Questions</span>
          </div>
          <h1 className="page-hero-title">How Can We Help You?</h1>
          <p className="page-hero-sub">
            Find immediate answers about Speshway All In One ERP architecture, modular deployment, enterprise security, and subscriptions.
          </p>

          {/* Search Bar */}
          <div className="catalog-search-bar">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search questions or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="catalog-search-input"
            />
          </div>

          {/* Category Tabs */}
          <div className="category-filter-tabs">
            {['All', 'General & Architecture', 'Deployment & Setup', 'Security & Reliability', 'Support & Pricing'].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`category-tab-btn ${activeCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              )
            )}
          </div>
        </section>

        {/* FAQ Accordion List */}
        <section className="faq-list-section" style={{ maxWidth: '880px', margin: '0 auto 60px auto', padding: '0 24px' }}>
          {filteredCategories.length === 0 ? (
            <div className="catalog-empty-state">
              <p>No questions found matching your search. Please try another search term or contact our support team.</p>
            </div>
          ) : (
            filteredCategories.map((catGroup) => {
              const CatIcon = catGroup.icon;
              return (
                <div key={catGroup.category} style={{ marginBottom: '36px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: '#ecfdf5',
                      color: '#00875a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <CatIcon size={18} />
                    </div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                      {catGroup.category}
                    </h2>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {catGroup.items.map((item, idx) => {
                      const itemKey = `${catGroup.category}-${idx}`;
                      const isOpen = !!openItems[itemKey];

                      return (
                        <div
                          key={itemKey}
                          style={{
                            backgroundColor: '#ffffff',
                            border: isOpen ? '1px solid #10b981' : '1px solid #e2e8f0',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: isOpen ? '0 4px 14px rgba(16, 185, 129, 0.08)' : '0 1px 3px rgba(0,0,0,0.03)',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => toggleItem(itemKey)}
                            style={{
                              width: '100%',
                              padding: '16px 20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              textAlign: 'left',
                              color: isOpen ? '#00875a' : '#1e293b',
                              fontWeight: '600',
                              fontSize: '0.98rem',
                              gap: '16px',
                            }}
                          >
                            <span>{item.q}</span>
                            <ChevronDown
                              size={18}
                              style={{
                                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.25s ease',
                                flexShrink: 0,
                                color: isOpen ? '#00875a' : '#94a3b8',
                              }}
                            />
                          </button>

                          {isOpen && (
                            <div
                              style={{
                                padding: '0 20px 18px 20px',
                                color: '#475569',
                                fontSize: '0.92rem',
                                lineHeight: '1.6',
                                borderTop: '1px solid #f8fafc',
                              }}
                            >
                              {item.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}

          {/* Need More Help Box */}
          <div
            style={{
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '16px',
              padding: '24px 28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
              flexWrap: 'wrap',
              marginTop: '40px',
            }}
          >
            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: '700', color: '#065f46' }}>
                Still have questions about our ERP suite?
              </h3>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#047857' }}>
                Our enterprise software consultants are available to provide tailored walk-throughs and answers.
              </p>
            </div>
            <button
              onClick={() => navigate('/contact')}
              style={{
                backgroundColor: '#00875a',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 18px',
                fontSize: '0.88rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
              }}
            >
              Contact Us <ArrowRight size={14} />
            </button>
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

