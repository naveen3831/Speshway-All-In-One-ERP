import React, { useState } from 'react';
import {
  useNavigate,
  Link } from 'react-router-dom';
import {
  LayoutGrid,
  Palette,
  Building2,
  ShoppingBag,
  Users,
  Sparkles,
  Layers,
  Award,
  CreditCard,
  TrendingUp,
  Settings,
  LogOut,
  Bell,
  ChevronDown,
  Calendar,
  ArrowRight,
  Search,
  Filter,
  Plus,
  CheckCircle,
  Truck,
  Scissors,
  DollarSign,
  FileText,
  Clock,
  ArrowLeft,
  QrCode,
  MapPin,
  Phone,
  ShieldCheck,
  Package,
  Menu,
  X,
} from 'lucide-react';
import './SavitriSareesDashboard.css';

// Custom Savitri Sarees Royal Monogram & Loom Logo
const SavitriLogoIcon = () => (
  <svg width="44" height="44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ssGold" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FDE68A" />
        <stop offset="0.5" stopColor="#F59E0B" />
        <stop offset="1" stopColor="#B45309" />
      </linearGradient>
      <linearGradient id="ssEmerald" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#34D399" />
        <stop offset="0.5" stopColor="#10B981" />
        <stop offset="1" stopColor="#047857" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="20" fill="#061a14" />
    <circle cx="50" cy="50" r="40" stroke="url(#ssGold)" strokeWidth="2.5" strokeDasharray="6 4" />
    {/* Stylized double S loom crest */}
    <path
      d="M38 32C32 32 28 36 28 42C28 50 42 48 42 58C42 64 36 68 30 68M62 32C56 32 52 36 52 42C52 50 66 48 66 58C66 64 60 68 54 68"
      stroke="url(#ssGold)"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <path
      d="M20 50L80 50"
      stroke="url(#ssEmerald)"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <circle cx="50" cy="24" r="4" fill="url(#ssGold)" />
  </svg>
);

export const SavitriSareesDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'catalog', label: 'Saree Catalog', icon: ShoppingBag, badge: '1,842' },
    { id: 'orders', label: 'Orders & Dispatches', icon: Truck, badge: '68' },
    { id: 'weavers', label: 'Loom Weavers', icon: Scissors },
    { id: 'collections', label: 'Collections', icon: Layers },
    { id: 'customers', label: 'VIP Clients', icon: Users },
    { id: 'silk-mark', label: 'Silk Mark Audit', icon: Award },
    { id: 'zari-procurement', label: 'Zari & Gold Spools', icon: Sparkles },
    { id: 'dyeing-units', label: 'Dyeing & Shade Labs', icon: Palette },
    { id: 'handloom-clusters', label: 'Weaver Clusters', icon: Building2 },
    { id: 'invoices', label: 'GST Tax Invoices', icon: FileText },
    { id: 'analytics', label: 'Revenue & Reports', icon: TrendingUp },
    { id: 'settings', label: 'Store Settings', icon: Settings },
  ];

  const recentOrders = [
    { id: '#SS-9821', customer: 'Ananya Sharma', phone: '→ 91 98490 22341', saree: 'Kanchipuram Pure Zari Silk', city: 'Hyderabad', price: '₹34,500', courier: 'Blue Dart Express', tracking: 'BD-992140', status: 'dispatched' },
    { id: '#SS-9820', customer: 'Priya Mehra', phone: '→ 91 98860 11982', saree: 'Banarasi Katan Brocade Bridal', city: 'Bengaluru', price: '₹42,000', courier: 'DTDC Premium', tracking: 'DT-441820', status: 'dispatched' },
    { id: '#SS-9819', customer: 'Deepika Rao', phone: '→ 91 94440 88219', saree: 'Chanderi Gold Leaf Handloom', city: 'Chennai', price: '₹18,500', courier: 'Delhivery Air', tracking: 'DL-773199', status: 'verified' },
    { id: '#SS-9818', customer: 'Sunita Reddy', phone: '→ 91 98480 33418', saree: 'Gadwal Silk Contrast Border', city: 'Vijayawada', price: '₹22,800', courier: 'In Loom Finishing', tracking: 'Loom-Cluster-4', status: 'in-loom' },
    { id: '#SS-9817', customer: 'Kavita Patel', phone: '→ 91 98200 44517', saree: 'Tussar Georgette Handwoven', city: 'Mumbai', price: '₹16,400', courier: 'Blue Dart Express', tracking: 'BD-884102', status: 'dispatched' },
    { id: '#SS-9816', customer: 'Radhika Nair', phone: '→ 91 97450 66210', saree: 'Paithani Peacock Motif Silk', city: 'Kochi', price: '₹38,900', courier: 'DTDC Premium', tracking: 'DT-889102', status: 'dispatched' },
  ];

  const catalogItems = [
    { id: 'SKU-KP-101', name: 'Royal Kanchipuram Temple Border Silk', fabric: 'Pure Mulberry Silk', origin: 'Kanchipuram, TN', zari: 'Tested Pure Gold Zari', price: '₹36,500', stock: 24, silkMarkId: 'SM-2026-K091' },
    { id: 'SKU-BK-204', name: 'Banarasi Shikargh Floral Jaal Saree', fabric: 'Katan Silk', origin: 'Varanasi, UP', zari: 'Antique Silver & Gold Zari', price: '₹44,000', stock: 18, silkMarkId: 'SM-2026-B812' },
    { id: 'SKU-CH-308', name: 'Chanderi Booti Handspun Silk-Cotton', fabric: 'Silk Cotton Blend', origin: 'Chanderi, MP', zari: 'Mukaish Zari Work', price: '₹17,800', stock: 42, silkMarkId: 'SM-2026-C339' },
    { id: 'SKU-GD-412', name: 'Gadwal Handwoven Kuttu Temple Saree', fabric: 'Pure Silk Body', origin: 'Gadwal, Telangana', zari: 'Zari Borders & Pallu', price: '₹23,500', stock: 31, silkMarkId: 'SM-2026-G104' },
    { id: 'SKU-PT-505', name: 'Yeola Paithani Double Pallu Mor Bangadi', fabric: 'Silk Yarn', origin: 'Paithan, Maharashtra', zari: 'Real Metallic Weft', price: '₹41,200', stock: 12, silkMarkId: 'SM-2026-P994' },
    { id: 'SKU-TG-602', name: 'Tussar Ghicha Kantha Embroidered Saree', fabric: 'Wild Tussar Silk', origin: 'Murshidabad, WB', zari: 'Fine Silk Threading', price: '₹19,400', stock: 28, silkMarkId: 'SM-2026-T402' },
  ];

  const weaversList = [
    { id: 'WVR-101', name: 'Ramaswamy Chettiar', cluster: 'Kanchipuram Weavers Sector 2', experience: '32 years', activeLooms: 6, monthlyOutput: '18 Sarees', rating: '5.0 ★', payout: '₹1,44,000/mo' },
    { id: 'WVR-102', name: 'Kishanlal Ansari', cluster: 'Varanasi North Loom Co-op', experience: '28 years', activeLooms: 8, monthlyOutput: '22 Sarees', rating: '4.9 ★', payout: '₹1,76,000/mo' },
    { id: 'WVR-103', name: 'Gopalrao Kulkarni', cluster: 'Yeola Paithani Heritage Hub', experience: '24 years', activeLooms: 4, monthlyOutput: '10 Sarees', rating: '4.9 ★', payout: '₹1₹0,000/mo' },
    { id: 'WVR-104', name: 'Devendra Koli', cluster: 'Chanderi Artisan Guild', experience: '19 years', activeLooms: 5, monthlyOutput: '26 Sarees', rating: '4.8 ★', payout: '₹1,25,000/mo' },
    { id: 'WVR-105', name: 'Srinivasa Padmashali', cluster: 'Gadwal Handloom Cluster', experience: '26 years', activeLooms: 7, monthlyOutput: '20 Sarees', rating: '5.0 ★', payout: '₹1,50,000/mo' },
  ];

  const vipClients = [
    { name: 'Dr. Meenakshi Sundaram', city: 'Chennai', phone: '→ 91 98401 55210', sarees: '14 Sarees', totalSpent: '₹4,82,000', tier: 'Royal Platinum' },
    { name: 'Mrs. Shailaja Ramachandran', city: 'Hyderabad', phone: '→ 91 98490 11428', sarees: '11 Sarees', totalSpent: '₹3,96,000', tier: 'Royal Platinum' },
    { name: 'Mrs. Geetanjali Birla', city: 'Mumbai', phone: '→ 91 98200 77319', sarees: '9 Sarees', totalSpent: '₹3,45,000', tier: 'Gold Elite' },
    { name: 'Mrs. Vandana Agarwal', city: 'Bengaluru', phone: '→ 91 98860 88214', sarees: '8 Sarees', totalSpent: '₹2,84,000', tier: 'Gold Elite' },
  ];


  const zariBatches = [
    { id: 'ZAR-901', supplier: 'Surat Pure Zari Guild', purity: '98.5% Gold/Silver', weightKg: '24.5 kg', grade: 'Grade A1 Electroplated', reels: '120 Reels', status: 'Passed Lab Audit' },
    { id: 'ZAR-902', supplier: 'Kanchipuram Heritage Threads', purity: '99.0% Real Silver Leaf', weightKg: '18.0 kg', grade: 'Temple Antique Brocade', reels: '85 Reels', status: 'Passed Lab Audit' },
    { id: 'ZAR-903', supplier: 'Varanasi Master Metallics', purity: '96.8% Metallic Core', weightKg: '32.0 kg', grade: 'Shikargh Jaal Zari', reels: '160 Reels', status: 'Passed Lab Audit' },
    { id: 'ZAR-904', supplier: 'Dharmavaram Tested Filaments', purity: '98.2% Gold Flashed', weightKg: '15.4 kg', grade: 'Double Weft Warp', reels: '70 Reels', status: 'Quality Testing' },
  ];

  const dyeingLots = [
    { id: 'DYE-401', shadeName: 'Kumkum Crimson & Sindhoor Red', dyer: 'Babu Master (Chanderi Unit)', yarnQty: '45 kg Mulberry', vatTemp: '84°C Natural Lac', ecoCert: 'Eco-Friendly Bio-Dye', status: 'Completed' },
    { id: 'DYE-402', shadeName: 'Mayil-Kazhuthu (Peacock Blue/Green)', dyer: 'Selvam Dyers (Kanchi)', yarnQty: '60 kg Pure Silk', vatTemp: '82°C Indigo & Turmeric', ecoCert: 'GOTS Certified', status: 'In Processing' },
    { id: 'DYE-403', shadeName: 'Haldi Mustard & Temple Gold', dyer: 'Govindappa (Gadwal Lab)', yarnQty: '38 kg Katan Silk', vatTemp: '80°C Organic Madder', ecoCert: 'Zero Chemical Runoff', status: 'Completed' },
    { id: 'DYE-404', shadeName: 'Rani Pink & Rama Green', dyer: 'Prakash Rao (Pochampally)', yarnQty: '52 kg Tussar Silk', vatTemp: '85°C Natural Alizarin', ecoCert: 'Eco-Friendly Bio-Dye', status: 'Completed' },
  ];

  const handloomSocieties = [
    { name: 'Kanchipuram Silk Weavers Co-operative', state: 'Tamil Nadu', activeLooms: 148, specialty: 'Heavy Zari Temple Borders', president: 'K. R. Ramanathan', phone: '→ 91 94440 21901', monthlyCapacity: '320 Sarees' },
    { name: 'Dharmavaram Handloom Apex Society', state: 'Andhra Pradesh', activeLooms: 112, specialty: 'Broad Border Brocade', president: 'P. Venkataramulu', phone: '→ 91 98480 33819', monthlyCapacity: '260 Sarees' },
    { name: 'Gadwal Padmashali Weaving Cluster', state: 'Telangana', activeLooms: 86, specialty: 'Kuttu Border Interlocking', president: 'M. Srinivasulu', phone: '→ 91 98491 55210', monthlyCapacity: '190 Sarees' },
    { name: 'Pochampally Ikat Handloom Hub', state: 'Telangana', activeLooms: 94, specialty: 'Double Ikat Pure Silk', president: 'V. Narayana Rao', phone: '→ 91 99880 44102', monthlyCapacity: '220 Sarees' },
  ];

  const taxInvoices = [
    { invNo: 'INV-2026-081', client: 'Ananya Sharma', hsn: 'HSN 5007', date: '04 Nov 2026', taxable: '₹1,28,095', gst: '₹6,405 (5%)', grandTotal: '₹1,34,500', eway: 'EWB-8891024' },
    { invNo: 'INV-2026-080', client: 'Priya Mehra', hsn: 'HSN 5007', date: '03 Nov 2026', taxable: '₹1,35,238', gst: '₹6,762 (5%)', grandTotal: '₹1,42,000', eway: 'EWB-8891023' },
    { invNo: 'INV-2026-079', client: 'Deepika Rao', hsn: 'HSN 5007', date: '02 Nov 2026', taxable: '₹1₹2,857', gst: '₹5,643 (5%)', grandTotal: '₹1₹8,500', eway: 'EWB-8891022' },
    { invNo: 'INV-2026-078', client: 'Dr. Meenakshi Sundaram', hsn: 'HSN 5007', date: '01 Nov 2026', taxable: '₹2,68,571', gst: '₹13,429 (5%)', grandTotal: '₹2,82,000', eway: 'EWB-8891021' },
  ];

  const collections = [
    { name: 'Kanchipuram Pattu', share: '34%', sales: '₹8,45,000', count: '480 pcs', color: '#059669' },
    { name: 'Banarasi Katan', share: '26%', sales: '₹6,46,000', count: '390 pcs', color: '#10b981' },
    { name: 'Chanderi Handloom', share: '18%', sales: '₹4,47,000', count: '320 pcs', color: '#34d399' },
    { name: 'Tussar & Organza', share: '14%', sales: '₹3,48,000', count: '290 pcs', color: '#6ee7b7' },
    { name: 'Paithani & Others', share: '8%', sales: '₹1,99,600', count: '162 pcs', color: '#a7f3d0' },
  ];

  return (
    <div className="savitri-dashboard-container">
      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div
          className="savitri-sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 1. STICKY SIDEBAR */}
      <aside className={`savitri-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="savitri-sidebar-top">
          <div className="savitri-brand">
            <div className="savitri-brand-logo-wrap">
              <SavitriLogoIcon />
            </div>
            <div>
              <div className="savitri-brand-title">Savitri Sarees</div>
              <div className="savitri-brand-sub">LUXURY SILK ERP</div>
            </div>
            <button
              type="button"
              className="savitri-sidebar-close"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>

          <ul className="savitri-nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`savitri-nav-btn ${activeTab === item.id ? 'active' : ''}`}
                  >
                    <Icon size={18} />
                    <span className="savitri-nav-label">{item.label}</span>
                    {item.badge && <span className="savitri-nav-badge">{item.badge}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="savitri-sidebar-bottom">
          <button onClick={() => navigate('/products')} className="savitri-btn-portal">
            <ArrowLeft size={16} />
            <span>Speshway Catalog</span>
          </button>
          <div className="savitri-user-profile">
            <div className="savitri-avatar">SS</div>
            <div className="savitri-user-info">
              <span className="savitri-user-name">Master Weaver Admin</span>
              <span className="savitri-user-role">Savitri Sarees HQ</span>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. MAIN SCROLLABLE CONTENT */}
      <main className="savitri-main">
        {/* Top Header */}
        <header className="savitri-header">
          <div className="savitri-header-left">
            <div className="savitri-header-title-wrap">
              <button
                type="button"
                className="savitri-back-btn"
                onClick={() => {
                  if (window.history.length > 1) {
                    navigate(-1);
                  } else {
                    navigate('/products');
                  }
                }}
                title="Back to Catalog"
                aria-label="Go back"
              >
                <ArrowLeft size={18} />
                <span>Back</span>
              </button>
              <button
                type="button"
                className="savitri-menu-toggle"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open navigation menu"
              >
                <Menu size={20} />
              </button>
              <div>
                <h1 className="savitri-page-title">
                  {navItems.find((n) => n.id === activeTab)?.label || 'Dashboard Overview'}
                </h1>
                <p className="savitri-page-sub">
                  Savitri Sarees Handloom Enterprise ERP &bull; Pure Silk Mark Authenticated
                </p>
              </div>
            </div>
          </div>

          <div className="savitri-header-right">
            <div className="savitri-search-box">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search sarees, weavers, orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="savitri-badge-cluster">
              <ShieldCheck size={16} className="text-emerald-500" />
              <span>Silk Mark Certified 100%</span>
            </div>

            <button className="savitri-icon-btn" title="Notifications">
              <Bell size={18} />
              <span className="savitri-bell-dot"></span>
            </button>

            
          </div>
        </header>

        {/* Content Body */}
        <div className="savitri-content-body">
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === 'dashboard' && (
            <>
              {/* Stat Cards Row */}
              <div className="savitri-stats-grid">
                <div className="savitri-stat-card">
                  <div className="savitri-stat-icon-wrap">
                    <ShoppingBag size={22} />
                  </div>
                  <div className="savitri-stat-info">
                    <span className="savitri-stat-label">Today's Orders</span>
                    <span className="savitri-stat-val">68</span>
                    <span className="savitri-stat-trend">↑ → 24% vs yesterday</span>
                  </div>
                </div>

                <div className="savitri-stat-card">
                  <div className="savitri-stat-icon-wrap">
                    <Scissors size={22} />
                  </div>
                  <div className="savitri-stat-info">
                    <span className="savitri-stat-label">Active Weavers</span>
                    <span className="savitri-stat-val">142</span>
                    <span className="savitri-stat-trend">9 Loom Clusters</span>
                  </div>
                </div>

                <div className="savitri-stat-card">
                  <div className="savitri-stat-icon-wrap">
                    <Award size={22} />
                  </div>
                  <div className="savitri-stat-info">
                    <span className="savitri-stat-label">Silk Mark Verified</span>
                    <span className="savitri-stat-val">100%</span>
                    <span className="savitri-stat-trend">Certified Pure Silk</span>
                  </div>
                </div>

                <div className="savitri-stat-card">
                  <div className="savitri-stat-icon-wrap">
                    <DollarSign size={22} />
                  </div>
                  <div className="savitri-stat-info">
                    <span className="savitri-stat-label">Total Revenue</span>
                    <span className="savitri-stat-val">₹24,85,600</span>
                    <span className="savitri-stat-trend">↑ → 22% vs last month</span>
                  </div>
                </div>
              </div>

              {/* Charts & Quick Actions Row */}
              <div className="savitri-charts-grid">
                {/* Recent Orders Table */}
                <div className="savitri-card">
                  <div className="savitri-card-header">
                    <h3 className="savitri-card-title">
                      <Truck size={18} className="text-emerald-600" />
                      Recent Saree Dispatches
                    </h3>
                    <span
                      onClick={() => setActiveTab('orders')}
                      style={{ fontSize: '13px', color: '#059669', fontWeight: '600', cursor: 'pointer' }}
                    >
                      View All &rarr;
                    </span>
                  </div>
                  <div className="savitri-table-wrap">
                    <table className="savitri-data-table">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Customer</th>
                          <th>Saree Title</th>
                          <th>Destination</th>
                          <th>Amount</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.slice(0, 5).map((ord) => (
                          <tr key={ord.id}>
                            <td style={{ fontWeight: 700 }}>{ord.id}</td>
                            <td>{ord.customer}</td>
                            <td>{ord.saree}</td>
                            <td>{ord.city}</td>
                            <td style={{ fontWeight: 700 }}>{ord.price}</td>
                            <td>
                              <span className={`savitri-status-badge ${ord.status}`}>
                                {ord.status === 'dispatched' ? 'Dispatched' : ord.status === 'verified' ? 'Silk Verified' : 'In Loom'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Collections Breakdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="savitri-card">
                    <div className="savitri-card-header">
                      <h3 className="savitri-card-title">
                        <Layers size={18} />
                        Collections Breakdown
                      </h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {collections.map((c) => (
                        <div key={c.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: c.color }} />
                            <span style={{ fontWeight: 600 }}>{c.name}</span>
                          </div>
                          <span style={{ fontWeight: 700, color: '#0f172a' }}>{c.sales} ({c.share})</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="savitri-card">
                    <div className="savitri-card-header">
                      <h3 className="savitri-card-title">
                        <Sparkles size={18} />
                        Quick Loom Actions
                      </h3>
                    </div>
                    <div className="savitri-actions-list">
                      <div className="savitri-action-item" onClick={() => setActiveTab('catalog')}>
                        <span>→ Add New Saree Design</span>
                        <ArrowRight size={14} />
                      </div>
                      <div className="savitri-action-item" onClick={() => setActiveTab('weavers')}>
                        <span>Assign Loom Batch to Cluster</span>
                        <ArrowRight size={14} />
                      </div>
                      <div className="savitri-action-item" onClick={() => setActiveTab('silk-mark')}>
                        <span>Generate Silk Mark QR Barcode</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: SAREE CATALOG */}
          {activeTab === 'catalog' && (
            <div className="savitri-card">
              <div className="savitri-card-header">
                <div>
                  <h3 className="savitri-card-title">
                    <ShoppingBag size={18} className="text-emerald-600" />
                    Master Saree Catalog (1,842 Active Weaves)
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                    Authentic pure silk weaves with Silk Mark verification barcodes and loom origin tags.
                  </p>
                </div>
                <button className="savitri-btn-site" style={{ padding: '8px 16px' }}>
                  <Plus size={15} /> Add Saree Design
                </button>
              </div>

              <div className="savitri-table-wrap" style={{ marginTop: '16px' }}>
                <table className="savitri-data-table">
                  <thead>
                    <tr>
                      <th>SKU Code</th>
                      <th>Saree Name</th>
                      <th>Fabric Composition</th>
                      <th>Loom Cluster</th>
                      <th>Zari Specification</th>
                      <th>Price</th>
                      <th>Available Stock</th>
                      <th>Silk Mark ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {catalogItems.map((item) => (
                      <tr key={item.id}>
                        <td style={{ fontWeight: 700, color: '#047857' }}>{item.id}</td>
                        <td style={{ fontWeight: 600 }}>{item.name}</td>
                        <td>{item.fabric}</td>
                        <td><MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} />{item.origin}</td>
                        <td style={{ color: '#d97706', fontWeight: 500 }}>{item.zari}</td>
                        <td style={{ fontWeight: 700, color: '#0f172a' }}>{item.price}</td>
                        <td>
                          <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#ecfdf5', color: '#065f46', fontWeight: 600 }}>
                            {item.stock} in stock
                          </span>
                        </td>
                        <td>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', background: '#fef3c7', color: '#92400e', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
                            <QrCode size={12} /> {item.silkMarkId}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ORDERS & DISPATCHES */}
          {activeTab === 'orders' && (
            <div className="savitri-card">
              <div className="savitri-card-header">
                <div>
                  <h3 className="savitri-card-title">
                    <Truck size={18} className="text-emerald-600" />
                    Orders &amp; Dispatch Logistics (68 Orders Today)
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                    Real-time courier waybills, insured transit, and doorstep delivery tracking across India.
                  </p>
                </div>
              </div>

              <div className="savitri-table-wrap" style={{ marginTop: '16px' }}>
                <table className="savitri-data-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer &amp; Phone</th>
                      <th>Saree Title</th>
                      <th>City</th>
                      <th>Courier Partner</th>
                      <th>Tracking #</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((ord) => (
                      <tr key={ord.id}>
                        <td style={{ fontWeight: 700 }}>{ord.id}</td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{ord.customer}</div>
                          <div style={{ fontSize: '11px', color: '#64748b' }}>{ord.phone}</div>
                        </td>
                        <td>{ord.saree}</td>
                        <td>{ord.city}</td>
                        <td style={{ fontWeight: 500 }}>{ord.courier}</td>
                        <td style={{ fontFamily: 'monospace', color: '#0284c7' }}>{ord.tracking}</td>
                        <td style={{ fontWeight: 700 }}>{ord.price}</td>
                        <td>
                          <span className={`savitri-status-badge ${ord.status}`}>
                            {ord.status === 'dispatched' ? 'Dispatched' : ord.status === 'verified' ? 'Silk Verified' : 'In Loom'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: LOOM WEAVERS DIRECTORY */}
          {activeTab === 'weavers' && (
            <div className="savitri-card">
              <div className="savitri-card-header">
                <div>
                  <h3 className="savitri-card-title">
                    <Scissors size={18} className="text-emerald-600" />
                    Master Loom Weavers &amp; Guild Clusters (142 Active Artisans)
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                    Direct artisan remuneration, yarn quota allocation, and traditional handloom capacity.
                  </p>
                </div>
              </div>

              <div className="savitri-table-wrap" style={{ marginTop: '16px' }}>
                <table className="savitri-data-table">
                  <thead>
                    <tr>
                      <th>Weaver ID</th>
                      <th>Master Artisan</th>
                      <th>Weaving Cluster</th>
                      <th>Craft Experience</th>
                      <th>Active Looms</th>
                      <th>Monthly Production</th>
                      <th>Rating</th>
                      <th>Monthly Remuneration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weaversList.map((w) => (
                      <tr key={w.id}>
                        <td style={{ fontWeight: 700, color: '#047857' }}>{w.id}</td>
                        <td style={{ fontWeight: 600 }}>{w.name}</td>
                        <td><MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} />{w.cluster}</td>
                        <td>{w.experience}</td>
                        <td style={{ fontWeight: 700 }}>{w.activeLooms} Pit Looms</td>
                        <td style={{ color: '#059669', fontWeight: 600 }}>{w.monthlyOutput}</td>
                        <td style={{ color: '#d97706', fontWeight: 700 }}>{w.rating}</td>
                        <td style={{ fontWeight: 700, color: '#0f172a' }}>{w.payout}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: COLLECTIONS BREAKDOWN */}
          {activeTab === 'collections' && (
            <div className="savitri-card">
              <div className="savitri-card-header">
                <div>
                  <h3 className="savitri-card-title">
                    <Layers size={18} className="text-emerald-600" />
                    Heritage Saree Collections Breakdown
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                    Sales distribution, seasonal demand, and inventory allocation by fabric category.
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginTop: '20px' }}>
                {collections.map((col) => (
                  <div key={col.name} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '18px', background: '#f8fafc' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                      <span style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: col.color }} />
                      <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>{col.name}</h4>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748b' }}>Revenue Share:</span>
                        <strong style={{ color: '#047857' }}>{col.share}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748b' }}>Total Gross Sales:</span>
                        <strong style={{ color: '#0f172a' }}>{col.sales}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748b' }}>Available Inventory:</span>
                        <strong>{col.count}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: SILK MARK AUDIT */}
          {activeTab === 'silk-mark' && (
            <div className="savitri-card">
              <div className="savitri-card-header">
                <div>
                  <h3 className="savitri-card-title">
                    <Award size={18} className="text-emerald-600" />
                    Silk Mark Organization of India (SMOI) Digital Audit
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                    Official 100% natural silk authentication logs and tamper-evident QR verification credentials.
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
                <div style={{ padding: '20px', background: '#ecfdf5', borderRadius: '12px', border: '1px solid #a7f3d0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#065f46', marginBottom: '8px' }}>
                    <ShieldCheck size={24} />
                    <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>SMOI License #SM-7819-TN</h4>
                  </div>
                  <p style={{ margin: 0, fontSize: '13px', color: '#047857' }}>
                    Accredited silk testing lab certification with 100% purity pass score on all loom batches.
                  </p>
                </div>
                <div style={{ padding: '20px', background: '#fffbeb', borderRadius: '12px', border: '1px solid #fde68a' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#92400e', marginBottom: '8px' }}>
                    <QrCode size={24} />
                    <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>1,842 QR Codes Issued</h4>
                  </div>
                  <p style={{ margin: 0, fontSize: '13px', color: '#b45309' }}>
                    Every saree ships with a unique holographic QR code for instant customer verification.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: VIP CLIENTS */}
          {activeTab === 'customers' && (
            <div className="savitri-card">
              <div className="savitri-card-header">
                <div>
                  <h3 className="savitri-card-title">
                    <Users size={18} className="text-emerald-600" />
                    VIP Bridal &amp; Royal Clients Directory
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                    Exclusive clientele, personalized bridal consultation records, and loyalty privileges.
                  </p>
                </div>
              </div>

              <div className="savitri-table-wrap" style={{ marginTop: '16px' }}>
                <table className="savitri-data-table">
                  <thead>
                    <tr>
                      <th>Client Name</th>
                      <th>City</th>
                      <th>Phone</th>
                      <th>Sarees Purchased</th>
                      <th>Lifetime Value</th>
                      <th>Privilege Tier</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vipClients.map((client, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: 700 }}>{client.name}</td>
                        <td>{client.city}</td>
                        <td>{client.phone}</td>
                        <td style={{ fontWeight: 600, color: '#047857' }}>{client.sarees}</td>
                        <td style={{ fontWeight: 700, color: '#0f172a' }}>{client.totalSpent}</td>
                        <td>
                          <span style={{ padding: '4px 10px', borderRadius: '20px', background: '#fef3c7', color: '#92400e', fontWeight: 700, fontSize: '12px' }}>
                            ★ {client.tier}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 8: ANALYTICS & REPORTS */}
          {activeTab === 'analytics' && (
            <div className="savitri-card">
              <div className="savitri-card-header">
                <h3 className="savitri-card-title">
                  <TrendingUp size={18} className="text-emerald-600" />
                  Revenue Analytics &amp; Loom Efficiency Reports
                </h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '16px' }}>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                  <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#64748b' }}>Average Order Value (AOV)</h4>
                  <div style={{ fontSize: '28px', fontWeight: 800, color: '#047857' }}>₹28,450</div>
                  <span style={{ fontSize: '12px', color: '#10b981' }}>↑ → 14.8% vs last quarter</span>
                </div>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                  <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#64748b' }}>Dispatch Turnaround Time</h4>
                  <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a' }}>1.8 Days</div>
                  <span style={{ fontSize: '12px', color: '#10b981' }}>Fastest in luxury silk sector</span>
                </div>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                  <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#64748b' }}>Artisan Payout Ratio</h4>
                  <div style={{ fontSize: '28px', fontWeight: 800, color: '#d97706' }}>62.5%</div>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>Fair trade handloom standard</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: SETTINGS */}
          
          {/* TAB: ZARI PROCUREMENT */}
          {activeTab === 'zari-procurement' && (
            <div className="savitri-card">
              <div className="savitri-card-header">
                <div>
                  <h3 className="savitri-card-title">
                    <Sparkles size={18} className="text-emerald-600" />
                    Pure Zari & Tested Gold Spool Inventory
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                    Tracking tested metallic zari batches with certified silver/gold purity standards.
                  </p>
                </div>
                <button className="savitri-btn-site" style={{ padding: '8px 16px' }}>
                  <Plus size={15} /> Log Zari Inward
                </button>
              </div>
              <div className="savitri-table-wrap" style={{ marginTop: '16px' }}>
                <table className="savitri-data-table">
                  <thead>
                    <tr>
                      <th>Batch Code</th>
                      <th>Supplier & Guild</th>
                      <th>Certified Purity</th>
                      <th>Net Weight</th>
                      <th>Weaving Grade</th>
                      <th>Reels Stock</th>
                      <th>Testing Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {zariBatches.map(z => (
                      <tr key={z.id}>
                        <td><strong>{z.id}</strong></td>
                        <td>{z.supplier}</td>
                        <td><span className="savitri-badge-verified">{z.purity}</span></td>
                        <td>{z.weightKg}</td>
                        <td>{z.grade}</td>
                        <td>{z.reels}</td>
                        <td><span className="savitri-badge-cluster" style={{ background: '#ecfdf5', color: '#059669' }}>{z.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: DYEING UNITS */}
          {activeTab === 'dyeing-units' && (
            <div className="savitri-card">
              <div className="savitri-card-header">
                <div>
                  <h3 className="savitri-card-title">
                    <Palette size={18} className="text-emerald-600" />
                    Organic Silk Yarn Dyeing & Shade Laboratories
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                    Authentic heritage shades using natural herbal extracts and zero-chemical dye vats.
                  </p>
                </div>
                <button className="savitri-btn-site" style={{ padding: '8px 16px' }}>
                  <Plus size={15} /> Create Dye Lot
                </button>
              </div>
              <div className="savitri-table-wrap" style={{ marginTop: '16px' }}>
                <table className="savitri-data-table">
                  <thead>
                    <tr>
                      <th>Lot Number</th>
                      <th>Color & Shade Name</th>
                      <th>Master Dyer & Unit</th>
                      <th>Yarn Volume</th>
                      <th>Vat Processing</th>
                      <th>Eco-Certification</th>
                      <th>Batch Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dyeingLots.map(d => (
                      <tr key={d.id}>
                        <td><strong>{d.id}</strong></td>
                        <td><span style={{ fontWeight: 600 }}>{d.shadeName}</span></td>
                        <td>{d.dyer}</td>
                        <td>{d.yarnQty}</td>
                        <td>{d.vatTemp}</td>
                        <td><span className="savitri-badge-verified">{d.ecoCert}</span></td>
                        <td><span className="savitri-badge-cluster" style={{ background: '#ecfdf5', color: '#059669' }}>{d.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: HANDLOOM CLUSTERS */}
          {activeTab === 'handloom-clusters' && (
            <div className="savitri-card">
              <div className="savitri-card-header">
                <div>
                  <h3 className="savitri-card-title">
                    <Building2 size={18} className="text-emerald-600" />
                    Regional Handloom Weaver Apex Societies
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                    Direct liaison with state apex handloom societies and artisan weaver guilds.
                  </p>
                </div>
                <button className="savitri-btn-site" style={{ padding: '8px 16px' }}>
                  <Plus size={15} /> Register Cluster
                </button>
              </div>
              <div className="savitri-table-wrap" style={{ marginTop: '16px' }}>
                <table className="savitri-data-table">
                  <thead>
                    <tr>
                      <th>Society / Cluster</th>
                      <th>Origin State</th>
                      <th>Active Looms</th>
                      <th>Heritage Specialty</th>
                      <th>President / Lead</th>
                      <th>Contact Number</th>
                      <th>Monthly Production</th>
                    </tr>
                  </thead>
                  <tbody>
                    {handloomSocieties.map(h => (
                      <tr key={h.name}>
                        <td><strong>{h.name}</strong></td>
                        <td>{h.state}</td>
                        <td><span className="savitri-badge-cluster">{h.activeLooms} Pit Looms</span></td>
                        <td>{h.specialty}</td>
                        <td>{h.president}</td>
                        <td>{h.phone}</td>
                        <td><strong>{h.monthlyCapacity}</strong></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: TAX INVOICES */}
          {activeTab === 'invoices' && (
            <div className="savitri-card">
              <div className="savitri-card-header">
                <div>
                  <h3 className="savitri-card-title">
                    <FileText size={18} className="text-emerald-600" />
                    GST Tax Invoices & E-Way Bills (HSN 5007)
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                    Compliant silk handloom GST invoices, tax summaries, and automated transport waybills.
                  </p>
                </div>
                <button className="savitri-btn-site" style={{ padding: '8px 16px' }}>
                  <Plus size={15} /> Generate Invoice
                </button>
              </div>
              <div className="savitri-table-wrap" style={{ marginTop: '16px' }}>
                <table className="savitri-data-table">
                  <thead>
                    <tr>
                      <th>Invoice No</th>
                      <th>Customer Name</th>
                      <th>HSN Category</th>
                      <th>Issue Date</th>
                      <th>Taxable Amount</th>
                      <th>GST (5%)</th>
                      <th>Invoice Total</th>
                      <th>E-Way Bill Ref</th>
                    </tr>
                  </thead>
                  <tbody>
                    {taxInvoices.map(inv => (
                      <tr key={inv.invNo}>
                        <td><strong>{inv.invNo}</strong></td>
                        <td>{inv.client}</td>
                        <td>{inv.hsn}</td>
                        <td>{inv.date}</td>
                        <td>{inv.taxable}</td>
                        <td>{inv.gst}</td>
                        <td><strong style={{ color: '#059669' }}>{inv.grandTotal}</strong></td>
                        <td><span className="savitri-badge-verified">{inv.eway}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="savitri-card" style={{ maxWidth: '680px' }}>
              <div className="savitri-card-header">
                <h3 className="savitri-card-title">
                  <Settings size={18} />
                  Savitri Sarees ERP Settings
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Brand Legal Name</label>
                  <input type="text" readOnly value="Savitri Sarees Handlooms Pvt Ltd" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>GSTIN &amp; Textile License</label>
                  <input type="text" readOnly value="36AAACS8819Q1ZP &bull; Handloom Board Reg #HB-09182" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Silk Mark Testing Lab API</label>
                  <input type="text" readOnly value="https://api.silkmarkindia.com/v2/auth/verify" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SavitriSareesDashboard;
