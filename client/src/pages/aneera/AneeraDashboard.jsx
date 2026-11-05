import React, { useState } from 'react';
import {
  LayoutGrid,
  Scissors,
  FileText,
  ShoppingCart,
  Users,
  Package,
  Folder,
  Layers,
  Boxes,
  Tag,
  CreditCard,
  TrendingUp,
  UserCheck,
  Settings,
  LogOut,
  Bell,
  ChevronDown,
  Calendar,
  ArrowLeft,
  ArrowRight,
  Search,
  Filter,
  Plus,
  Check,
  CheckCircle,
  Clock,
  AlertTriangle,
  Info,
  DollarSign,
  BarChart3,
  Award,
  Sparkles,
  Download,
  Eye,
  ShieldCheck,
} from 'lucide-react';
import './AneeraDashboard.css';

// Stylized Gold "AR" Monogram Logo with flowing red silk ribbon
const AneeraLogoIcon = () => (
  <svg width="46" height="46" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="arGold" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FDE68A" />
        <stop offset="0.4" stopColor="#F59E0B" />
        <stop offset="1" stopColor="#D97706" />
      </linearGradient>
      <linearGradient id="arRedRibbon" x1="10" y1="50" x2="90" y2="90" gradientUnits="userSpaceOnUse">
        <stop stopColor="#EF4444" />
        <stop offset="0.5" stopColor="#DC2626" />
        <stop offset="1" stopColor="#991B1B" />
      </linearGradient>
    </defs>
    {/* Letter A */}
    <path
      d="M26 76L44 22H52L70 76H60L56 62H40L36 76H26ZM43 53H53L48 36L43 53Z"
      fill="url(#arGold)"
    />
    {/* Intertwined Letter R */}
    <path
      d="M52 22H74C81 22 86 26 86 34C86 41 81 45 74 46C79 48 83 53 85 60L89 76H79L75 62C74 56 70 53 64 53H60V76H52V22ZM60 30V45H72C76 45 78 43 78 37C78 32 76 30 72 30H60Z"
      fill="url(#arGold)"
    />
    {/* Flowing Crimson Silk Ribbon */}
    <path
      d="M12 78C26 68 40 76 54 66C64 58 72 46 80 52C87 57 91 68 96 74C86 77 78 72 70 70C57 66 42 84 12 78Z"
      fill="url(#arRedRibbon)"
    />
    <path
      d="M15 80C28 72 42 78 55 69C65 61 74 50 82 55C88 59 92 69 97 75C88 75 80 71 71 69C58 65 44 85 15 80Z"
      fill="#b91c1c"
      fillOpacity="0.4"
    />
  </svg>
);

// High-fidelity Saree Fabric Swatches matching the reference design
const KanchipuramSwatch = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
    <rect width="52" height="52" rx="8" fill="#881337" />
    <path d="M0 34L52 34V52H0Z" fill="#b45309" />
    <path d="M0 36L52 36" stroke="#fef08a" strokeWidth="1.5" />
    <path d="M0 42L52 42" stroke="#fef08a" strokeWidth="1" strokeDasharray="3 2" />
    <path d="M0 48L52 48" stroke="#fef08a" strokeWidth="1.5" />
    {/* Golden temple motifs */}
    <polygon points="6,34 9,28 12,34" fill="#fbbf24" />
    <polygon points="16,34 19,28 22,34" fill="#fbbf24" />
    <polygon points="26,34 29,28 32,34" fill="#fbbf24" />
    <polygon points="36,34 39,28 42,34" fill="#fbbf24" />
    <polygon points="46,34 49,28 52,34" fill="#fbbf24" />
    <circle cx="12" cy="14" r="1.5" fill="#fde68a" />
    <circle cx="26" cy="10" r="1.5" fill="#fde68a" />
    <circle cx="40" cy="14" r="1.5" fill="#fde68a" />
  </svg>
);

const BanarasiSwatch = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
    <rect width="52" height="52" rx="8" fill="#b91c1c" />
    {/* Golden brocade jaal */}
    <path d="M8 8C14 14 18 8 26 14C34 8 38 14 44 8" stroke="#fbbf24" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M8 20C14 26 18 20 26 26C34 20 38 26 44 20" stroke="#fbbf24" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M8 32C14 38 18 32 26 38C34 32 38 38 44 32" stroke="#fbbf24" strokeWidth="1.2" strokeLinecap="round" />
    <rect x="0" y="42" width="52" height="10" fill="#d97706" />
    <line x1="0" y1="44" x2="52" y2="44" stroke="#fef08a" strokeWidth="1" />
    <circle cx="26" cy="20" r="2" fill="#fde68a" />
    <circle cx="14" cy="14" r="1.5" fill="#fde68a" />
    <circle cx="38" cy="14" r="1.5" fill="#fde68a" />
  </svg>
);

const DesignerSwatch = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
    <rect width="52" height="52" rx="8" fill="#065f46" />
    {/* Sequins and modern peacock pattern */}
    <circle cx="14" cy="12" r="2" fill="#34d399" />
    <circle cx="28" cy="16" r="2.5" fill="#fbbf24" />
    <circle cx="40" cy="10" r="2" fill="#6ee7b7" />
    <circle cx="18" cy="28" r="2.5" fill="#fde68a" />
    <circle cx="34" cy="30" r="2" fill="#34d399" />
    <path d="M0 40L52 40" stroke="#fbbf24" strokeWidth="2" />
    <path d="M0 45L52 45" stroke="#fef08a" strokeWidth="1" strokeDasharray="2 2" />
  </svg>
);

export const AneeraDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [salesView, setSalesView] = useState('revenue');
  const [dateRange, setDateRange] = useState('Last 7 Days');
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Sales trend points matching Aneera Silks screenshot curve
  // Dates: Oct 27, Oct 28, Oct 29, Oct 30, Oct 31, Nov 01, Nov 02
  // Values: ₹1.5L to ₹5.6L
  const salesData = [
    { date: 'Oct 27', revenue: 150000, orders: 28, x: 50, y: 165 },
    { date: 'Oct 28', revenue: 220000, orders: 36, x: 130, y: 145 },
    { date: 'Oct 29', revenue: 330000, orders: 48, x: 210, y: 115 },
    { date: 'Oct 30', revenue: 280000, orders: 40, x: 290, y: 130 },
    { date: 'Oct 31', revenue: 370000, orders: 54, x: 370, y: 105 },
    { date: 'Nov 01', revenue: 380000, orders: 58, x: 450, y: 102 },
    { date: 'Nov 02', revenue: 560000, orders: 88, x: 530, y: 45 },
  ];

  // SVG Area path generator
  const linePath = `M ${salesData.map((p) => `${p.x},${p.y}`).join(' L ')}`;
  const areaPath = `M 50,195 L ${salesData.map((p) => `${p.x},${p.y}`).join(' L ')} L 530,195 Z`;

  // Sidebar navigation items matching screenshot
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'orders', label: 'Orders', icon: ShoppingCart, badge: '24' },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'categories', label: 'Categories', icon: Folder },
    { id: 'collections', label: 'Collections', icon: Layers },
    { id: 'inventory', label: 'Inventory', icon: Boxes },
    { id: 'offers', label: 'Offers & Coupons', icon: Tag },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'analytics', label: 'Reports & Analytics', icon: TrendingUp },
    { id: 'roles', label: 'Users & Roles', icon: UserCheck },
  ];

  // Recent Saree Orders
  const recentOrders = [
    {
      id: '#AS-8812',
      customer: 'Pooja Hegde',
      phone: '+91 98450 44210',
      items: 'Pure Kanchipuram Silk Saree (Crimson Gold)',
      amount: '₹24,900.00',
      payment: 'Paid (UPI)',
      paymentType: 'paid',
      status: 'Out for Delivery',
      statusType: 'out-delivery',
      date: 'Nov 02, 2026 11:30 AM',
    },
    {
      id: '#AS-8811',
      customer: 'Deepika Iyer',
      phone: '+91 98221 66530',
      items: 'Banarasi Katan Silk Handloom (Bridal Red)',
      amount: '₹18,450.00',
      payment: 'Paid (Card)',
      paymentType: 'paid',
      status: 'Delivered',
      statusType: 'delivered',
      date: 'Nov 02, 2026 09:15 AM',
    },
    {
      id: '#AS-8810',
      customer: 'Ananya Reddy',
      phone: '+91 97410 22340',
      items: 'Designer Party Wear Organza (Emerald)',
      amount: '₹12,990.00',
      payment: 'COD',
      paymentType: 'cod',
      status: 'Processing',
      statusType: 'processing',
      date: 'Nov 01, 2026 08:40 PM',
    },
    {
      id: '#AS-8809',
      customer: 'Shalini Nair',
      phone: '+91 99001 88120',
      items: 'Mysore Silk Gold Zari Saree (Royal Blue)',
      amount: '₹16,800.00',
      payment: 'Paid (NetBanking)',
      paymentType: 'paid',
      status: 'Delivered',
      statusType: 'delivered',
      date: 'Nov 01, 2026 04:20 PM',
    },
    {
      id: '#AS-8808',
      customer: 'Kavya Sen',
      phone: '+91 96541 33900',
      items: 'Pure Tussar Silk Handloom Saree',
      amount: '₹14,500.00',
      payment: 'Paid (UPI)',
      paymentType: 'paid',
      status: 'Delivered',
      statusType: 'delivered',
      date: 'Oct 31, 2026 06:10 PM',
    },
  ];

  // Top Selling Sarees matching screenshot
  const topSellingSarees = [
    {
      id: 1,
      name: 'Kanchipuram Silk Saree',
      sold: '142 sold',
      price: '₹24,900',
      Component: KanchipuramSwatch,
    },
    {
      id: 2,
      name: 'Banarasi Silk Saree',
      sold: '96 sold',
      price: '₹18,450',
      Component: BanarasiSwatch,
    },
    {
      id: 3,
      name: 'Designer Party Wear Saree',
      sold: '78 sold',
      price: '₹12,990',
      Component: DesignerSwatch,
    },
  ];

  // Low Stock Handloom Weaves
  const lowStockSarees = [
    { id: 1, name: 'Royal Mysore Silk Crepe (Turquoise)', left: '3 left' },
    { id: 2, name: 'Chanderi Zari Tissue Handloom (Gold)', left: '5 left' },
    { id: 3, name: 'Tussar Ghicha Bridal Saree (Raw Silk)', left: '4 left' },
  ];

  // Static Data: Customers Directory
  const customersData = [
    { id: 'CUST-801', name: 'Pooja Hegde', city: 'Bengaluru', phone: '+91 98450 44210', sarees: '6 Sarees', totalSpent: '₹1,24,500', tier: 'VIP Bridal', status: 'Active' },
    { id: 'CUST-802', name: 'Deepika Iyer', city: 'Chennai', phone: '+91 98221 66530', sarees: '4 Sarees', totalSpent: '₹88,400', tier: 'Gold Silk Club', status: 'Active' },
    { id: 'CUST-803', name: 'Ananya Reddy', city: 'Hyderabad', phone: '+91 97410 22340', sarees: '3 Sarees', totalSpent: '₹46,200', tier: 'Silver Shopper', status: 'Active' },
    { id: 'CUST-804', name: 'Shalini Nair', city: 'Kochi', phone: '+91 99001 88120', sarees: '8 Sarees', totalSpent: '₹1,62,000', tier: 'VIP Bridal', status: 'Active' },
    { id: 'CUST-805', name: 'Meenakshi Sundaram', city: 'Madurai', phone: '+91 96541 33900', sarees: '2 Sarees', totalSpent: '₹34,500', tier: 'Silver Shopper', status: 'Active' },
  ];

  // Static Data: Saree Catalog
  const sareeCatalog = [
    { id: 'SR-KNC-01', name: 'Kanchipuram Heavy Zari Bridal', weave: 'Pure Mulberry Silk', color: 'Crimson & Pure Gold', price: '₹24,900', stock: '14 units', status: 'In Stock' },
    { id: 'SR-BNR-02', name: 'Banarasi Katan Silk Brocade', weave: 'Varanasi Handloom', color: 'Royal Red & Antique Zari', price: '₹18,450', stock: '22 units', status: 'In Stock' },
    { id: 'SR-DSG-03', name: 'Designer Party Wear Embroidered', weave: 'Organza / Tissue', color: 'Peacock Emerald Green', price: '₹12,990', stock: '18 units', status: 'In Stock' },
    { id: 'SR-MYS-04', name: 'Mysore Silk Crepe Printed', weave: '100% Pure Silk Mark', color: 'Royal Navy Blue', price: '₹16,800', stock: '3 left', status: 'Low Stock' },
    { id: 'SR-CHN-05', name: 'Chanderi Gold Zari Tissue', weave: 'Handloom Cotton-Silk', color: 'Warm Champagne Gold', price: '₹11,500', stock: '5 left', status: 'Low Stock' },
    { id: 'SR-TUS-06', name: 'Tussar Ghicha Handpainted', weave: 'Wild Forest Tussar', color: 'Natural Beige & Rust', price: '₹14,500', stock: '4 left', status: 'Low Stock' },
  ];

  // Static Data: Curated Collections
  const collectionsData = [
    { name: 'Royal Heritage Bridal 2026', desc: 'Heavy Kanchipuram and Banarasi bridal masterweaves crafted for grand weddings.', count: '48 Designs', season: 'Wedding Season', badge: 'Best Seller' },
    { name: 'Temple Border Classics', desc: 'Traditional Korvai korai borders and timeless peacocks, elephants, and chakras.', count: '36 Designs', season: 'Heritage Series', badge: 'Handloom' },
    { name: 'Festive Diwali Splendor', desc: 'Luminous zari tissue sarees, shimmering pastel organzas, and lightweight drapes.', count: '54 Designs', season: 'Festive Drop', badge: 'Trending' },
    { name: 'Modern Cocktail Silks', desc: 'Contemporary minimalist sarees with modern blouses and designer sequin motifs.', count: '28 Designs', season: 'Evening Wear', badge: 'New Arrival' },
  ];

  // Static Data: Payments
  const paymentsData = [
    { id: 'TXN-ANR-901', order: '#AS-8812', customer: 'Pooja Hegde', mode: 'UPI (GPay)', amount: '₹24,900.00', status: 'Success', date: 'Nov 02, 2026 11:30 AM' },
    { id: 'TXN-ANR-900', order: '#AS-8811', customer: 'Deepika Iyer', mode: 'Credit Card (HDFC)', amount: '₹18,450.00', status: 'Success', date: 'Nov 02, 2026 09:15 AM' },
    { id: 'TXN-ANR-899', order: '#AS-8810', customer: 'Ananya Reddy', mode: 'Cash on Delivery', amount: '₹12,990.00', status: 'Pending', date: 'Nov 01, 2026 08:40 PM' },
    { id: 'TXN-ANR-898', order: '#AS-8809', customer: 'Shalini Nair', mode: 'NetBanking (ICICI)', amount: '₹16,800.00', status: 'Success', date: 'Nov 01, 2026 04:20 PM' },
    { id: 'TXN-ANR-897', order: '#AS-8808', customer: 'Kavya Sen', mode: 'UPI (PhonePe)', amount: '₹14,500.00', status: 'Settled', date: 'Oct 31, 2026 06:10 PM' },
  ];

  return (
    <div className="aneera-dashboard-container">
      {/* =========================================================
          LEFT SIDEBAR (Dark Navy #0b1120)
      ========================================================= */}
      <aside className="aneera-sidebar">
        <div className="aneera-sidebar-top">
          {/* Brand Monogram Header */}
          <Link to="/product/aneera-silks" className="aneera-brand">
            <div className="aneera-brand-logo-wrap">
              <AneeraLogoIcon />
            </div>
            <div className="aneera-brand-text">
              <span className="aneera-brand-title">ANEERA</span>
              <span className="aneera-brand-sub">— SILKS —</span>
              <span className="aneera-brand-tag">ADMIN PANEL</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <ul className="aneera-nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id} className="aneera-nav-item">
                  <button
                    className={`aneera-nav-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <Icon size={18} />
                    <span className="aneera-nav-label">{item.label}</span>
                    {item.badge && (
                      <span className="aneera-nav-badge">{item.badge}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Sidebar Footer Logout */}
        <div className="aneera-sidebar-bottom">
          <button onClick={() => navigate('/products')} className="aneera-btn-portal">
            <ArrowLeft size={16} />
            <span>Speshway Catalog</span>
          </button>
          <div className="aneera-user-profile">
            <div className="aneera-avatar">AS</div>
            <div className="aneera-user-info">
              <span className="aneera-user-name">Master Silk Curator</span>
              <span className="aneera-user-role">Aneera Silks HQ</span>
            </div>
          </div>
        </div>
      </aside>

      {/* =========================================================
          MAIN WRAPPER & TOP NAVBAR (82px)
      ========================================================= */}
      <div className="aneera-main-wrapper">
        <header className="aneera-top-navbar">
          <div className="aneera-nav-left">
            <span className="aneera-nav-brand-title">Aneera Silks Management</span>
            <span className="aneera-operational-pill">
              <span className="aneera-op-dot"></span>
              Operational
            </span>
          </div>

          <div className="aneera-nav-right">
            <Link to="/product/aneera-silks" className="aneera-back-catalog-link" title="Return to Aneera Silks product overview">
              <ArrowLeft size={15} /> Back to Catalog
            </Link>

            <button className="aneera-bell-btn" title="Notifications">
              <Bell size={19} />
              <span className="aneera-bell-dot"></span>
            </button>

            <div className="aneera-user-pill">
              <span className="aneera-user-name">Admin</span>
              <div className="aneera-user-avatar">A</div>
            </div>
          </div>
        </header>

        {/* =========================================================
            DYNAMIC VIEW ACCORDING TO ACTIVE SIDEBAR TAB
        ========================================================= */}
        <main className="aneera-content">

          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <>
              {/* Welcome Row */}
              <div className="aneera-welcome-row">
                <div className="aneera-welcome-left">
                  <h1>Welcome back, Admin 👋</h1>
                  <p>Manage saree collections, orders, customers, inventory, and daily store operations in one place.</p>
                </div>

                <div style={{ position: 'relative' }}>
                  <button
                    className="aneera-date-btn"
                    onClick={() => setShowDateDropdown(!showDateDropdown)}
                  >
                    <Calendar size={15} color="#059669" />
                    <span>{dateRange}</span>
                    <ChevronDown size={14} color="#64748b" />
                  </button>

                  {showDateDropdown && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '110%',
                        right: 0,
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                        zIndex: 60,
                        minWidth: '150px',
                        overflow: 'hidden',
                      }}
                    >
                      {['Today', 'Last 7 Days', 'This Month', 'Festive Season'].map((opt) => (
                        <div
                          key={opt}
                          onClick={() => {
                            setDateRange(opt);
                            setShowDateDropdown(false);
                          }}
                          style={{
                            padding: '9px 14px',
                            fontSize: '13px',
                            cursor: 'pointer',
                            color: dateRange === opt ? '#059669' : '#334155',
                            fontWeight: dateRange === opt ? 600 : 400,
                            backgroundColor: dateRange === opt ? '#ecfdf5' : '#ffffff',
                          }}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 4 KPI SUMMARY STATS CARDS */}
              <div className="aneera-kpi-grid">
                {/* Total Orders */}
                <div className="aneera-kpi-card" onClick={() => setActiveTab('orders')} style={{ cursor: 'pointer' }}>
                  <div className="aneera-kpi-icon-box green">
                    <ShoppingCart size={22} />
                  </div>
                  <div className="aneera-kpi-info">
                    <span className="aneera-kpi-label">Total Orders</span>
                    <span className="aneera-kpi-value">312</span>
                    <span className="aneera-kpi-growth">
                      <span>↑</span> +12% from last 7 days
                    </span>
                  </div>
                </div>

                {/* Total Customers */}
                <div className="aneera-kpi-card" onClick={() => setActiveTab('customers')} style={{ cursor: 'pointer' }}>
                  <div className="aneera-kpi-icon-box blue">
                    <Users size={22} />
                  </div>
                  <div className="aneera-kpi-info">
                    <span className="aneera-kpi-label">Total Customers</span>
                    <span className="aneera-kpi-value">1,426</span>
                    <span className="aneera-kpi-growth">
                      <span>↑</span> +8% from last 7 days
                    </span>
                  </div>
                </div>

                {/* Total Products */}
                <div className="aneera-kpi-card" onClick={() => setActiveTab('products')} style={{ cursor: 'pointer' }}>
                  <div className="aneera-kpi-icon-box amber">
                    <Package size={22} />
                  </div>
                  <div className="aneera-kpi-info">
                    <span className="aneera-kpi-label">Total Products</span>
                    <span className="aneera-kpi-value">586</span>
                    <span className="aneera-kpi-subtext">12 categories</span>
                  </div>
                </div>

                {/* Total Revenue */}
                <div className="aneera-kpi-card" onClick={() => setActiveTab('payments')} style={{ cursor: 'pointer' }}>
                  <div className="aneera-kpi-icon-box green">
                    <span style={{ fontSize: '22px', fontWeight: 800 }}>₹</span>
                  </div>
                  <div className="aneera-kpi-info">
                    <span className="aneera-kpi-label">Total Revenue</span>
                    <span className="aneera-kpi-value">₹8,74,320</span>
                    <span className="aneera-kpi-growth">
                      <span>↑</span> +18% from last 7 days
                    </span>
                  </div>
                </div>
              </div>

              {/* MIDDLE & LOWER GRID */}
              <div className="aneera-main-grid">
                {/* Left Column: Sales Overview & Recent Orders */}
                <div className="aneera-col-left">
                  {/* Sales Overview Card */}
                  <div className="aneera-card">
                    <div className="aneera-card-header">
                      <div className="aneera-card-title-group">
                        <BarChart3 size={20} className="aneera-card-icon" />
                        <div>
                          <h2 className="aneera-card-h2">Sales Overview</h2>
                          <p className="aneera-card-sub">Daily revenue and order trends</p>
                        </div>
                      </div>

                      <div className="aneera-toggle-pills">
                        <button
                          className={`aneera-toggle-pill ${salesView === 'revenue' ? 'active' : ''}`}
                          onClick={() => setSalesView('revenue')}
                        >
                          Revenue
                        </button>
                        <button
                          className={`aneera-toggle-pill ${salesView === 'orders' ? 'active' : ''}`}
                          onClick={() => setSalesView('orders')}
                        >
                          Orders
                        </button>
                      </div>
                    </div>

                    <div className="aneera-chart-container">
                      <svg className="aneera-svg-chart" viewBox="0 0 580 220">
                        <defs>
                          <linearGradient id="aneeraGreenGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.32" />
                            <stop offset="70%" stopColor="#10b981" stopOpacity="0.08" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                          </linearGradient>
                        </defs>

                        {[
                          { val: '₹6,00,000', y: 35 },
                          { val: '₹5,00,000', y: 65 },
                          { val: '₹4,00,000', y: 95 },
                          { val: '₹3,00,000', y: 125 },
                          { val: '₹2,00,000', y: 155 },
                          { val: '₹1,00,000', y: 180 },
                        ].map((g, i) => (
                          <g key={i}>
                            <text x="52" y={g.y + 3} textAnchor="end" fontSize="10" fill="#94a3b8" fontFamily="Inter, sans-serif">
                              {salesView === 'revenue' ? g.val : `${Math.round(parseInt(g.val.replace(/[^0-9]/g, '')) / 6500)} ord`}
                            </text>
                            <line x1="58" y1={g.y} x2="560" y2={g.y} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                          </g>
                        ))}

                        <path d={areaPath} fill="url(#aneeraGreenGradient)" />

                        <path
                          d={linePath}
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {salesData.map((pt, idx) => (
                          <g key={idx}>
                            <circle
                              cx={pt.x}
                              cy={pt.y}
                              r="4.5"
                              fill="#ffffff"
                              stroke="#059669"
                              strokeWidth="2.5"
                              className="aneera-chart-point"
                              onMouseEnter={() => setHoveredPoint(pt)}
                              onMouseLeave={() => setHoveredPoint(null)}
                            />
                            <text
                              x={pt.x}
                              y="212"
                              textAnchor="middle"
                              fontSize="11"
                              fill="#64748b"
                              fontFamily="Inter, sans-serif"
                            >
                              {pt.date}
                            </text>
                          </g>
                        ))}
                      </svg>

                      {hoveredPoint && (
                        <div
                          style={{
                            position: 'absolute',
                            top: `${hoveredPoint.y + 10}px`,
                            left: `${(hoveredPoint.x / 580) * 100}%`,
                            transform: 'translateX(-50%)',
                            background: '#0f172a',
                            color: '#ffffff',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: 600,
                            pointerEvents: 'none',
                            boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                            whiteSpace: 'nowrap',
                            zIndex: 20,
                          }}
                        >
                          <div>{hoveredPoint.date}</div>
                          <div style={{ color: '#34d399', fontSize: '11px', marginTop: '2px' }}>
                            {salesView === 'revenue' ? `₹${hoveredPoint.revenue.toLocaleString()}` : `${hoveredPoint.orders} Orders`}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Recent Saree Orders Card */}
                  <div className="aneera-card">
                    <div className="aneera-card-header">
                      <div className="aneera-card-title-group">
                        <ShoppingCart size={20} className="aneera-card-icon" />
                        <div>
                          <h2 className="aneera-card-h2">Recent Orders</h2>
                          <p className="aneera-card-sub">Latest customer luxury saree orders</p>
                        </div>
                      </div>

                      <button
                        className="aneera-view-all-link"
                        onClick={() => setActiveTab('orders')}
                      >
                        <span>View All Orders</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>

                    <div className="aneera-table-wrapper">
                      <table className="aneera-table">
                        <thead>
                          <tr>
                            <th>ORDER ID</th>
                            <th>CUSTOMER</th>
                            <th>SAREE ITEM &amp; WEAVE</th>
                            <th>AMOUNT</th>
                            <th>PAYMENT</th>
                            <th>STATUS</th>
                            <th>ORDER DATE</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentOrders.map((ord) => (
                            <tr key={ord.id}>
                              <td className="aneera-order-id">{ord.id}</td>
                              <td className="aneera-customer-name">{ord.customer}</td>
                              <td className="aneera-items-text">{ord.items}</td>
                              <td className="aneera-amount-text">{ord.amount}</td>
                              <td>
                                <span className={`aneera-badge ${ord.paymentType}`}>
                                  {ord.payment}
                                </span>
                              </td>
                              <td>
                                <span className={`aneera-badge ${ord.statusType}`}>
                                  {ord.status}
                                </span>
                              </td>
                              <td className="aneera-order-date">{ord.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Right Column: Top Selling Sarees & Low Stock */}
                <div className="aneera-col-right">
                  {/* Top Selling Sarees Card */}
                  <div className="aneera-card">
                    <div className="aneera-card-header">
                      <div className="aneera-card-title-group">
                        <Award size={20} className="aneera-card-icon" />
                        <div>
                          <h2 className="aneera-card-h2">Top Selling Sarees</h2>
                          <p className="aneera-card-sub">This week</p>
                        </div>
                      </div>
                    </div>

                    <div className="aneera-list">
                      {topSellingSarees.map((saree) => {
                        const Swatch = saree.Component;
                        return (
                          <div key={saree.id} className="aneera-list-item">
                            <div className="aneera-item-left">
                              <div className="aneera-saree-thumb">
                                <Swatch />
                              </div>
                              <div>
                                <div className="aneera-item-name">{saree.name}</div>
                                <div className="aneera-item-sub">{saree.sold}</div>
                              </div>
                            </div>
                            <div className="aneera-item-revenue">{saree.price}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Low Stock Handloom Weaves */}
                  <div className="aneera-card">
                    <div className="aneera-card-header">
                      <div className="aneera-card-title-group">
                        <AlertTriangle size={20} className="aneera-card-icon amber" />
                        <div>
                          <h2 className="aneera-card-h2">Low Stock Weaves</h2>
                          <p className="aneera-card-sub">Artisanal looms need replenishing</p>
                        </div>
                      </div>
                    </div>

                    <div className="aneera-list">
                      {lowStockSarees.map((item) => (
                        <div key={item.id} className="aneera-list-item">
                          <div className="aneera-item-name">{item.name}</div>
                          <span className="aneera-stock-badge">{item.left}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Info Banner */}
              <div className="aneera-info-banner">
                <Info size={18} style={{ flexShrink: 0 }} />
                <div>
                  <strong>Aneera Silks – Luxury Handloom &amp; Saree Management</strong>
                  <span className="aneera-info-divider">|</span>
                  <span>Manage heritage weaves, bridal orders, loom inventory, and customer customizations through a centralized platform.</span>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: ORDERS */}
          {activeTab === 'orders' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="aneera-section-header">
                <div className="aneera-section-title-wrap">
                  <h1>Saree Orders &amp; Dispatches</h1>
                  <p>Track bridal orders, fall/pico tailoring, and insured courier dispatches.</p>
                </div>
                <div className="aneera-section-actions">
                  <button className="aneera-btn-secondary"><Download size={15} /> Export Orders</button>
                  <button className="aneera-btn-primary"><Plus size={16} /> New Order</button>
                </div>
              </div>

              <div className="aneera-filter-bar">
                <div className="aneera-search-box">
                  <Search size={16} color="#64748b" />
                  <input
                    type="text"
                    placeholder="Search by customer name, order number, or saree weave..."
                    className="aneera-search-input"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                  />
                </div>
                <div className="aneera-status-filter-pills">
                  {['all', 'Delivered', 'Out for Delivery', 'Processing'].map((st) => (
                    <button
                      key={st}
                      className={`aneera-filter-pill-btn ${statusFilter === st ? 'active' : ''}`}
                      onClick={() => setStatusFilter(st)}
                    >
                      {st.charAt(0).toUpperCase() + st.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="aneera-card">
                <div className="aneera-table-wrapper">
                  <table className="aneera-table">
                    <thead>
                      <tr>
                        <th>ORDER ID</th>
                        <th>CUSTOMER &amp; PHONE</th>
                        <th>SAREE ITEM &amp; FINISH</th>
                        <th>AMOUNT</th>
                        <th>PAYMENT</th>
                        <th>STATUS</th>
                        <th>ORDER DATE</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders
                        .filter((o) => (statusFilter === 'all' ? true : o.status === statusFilter))
                        .filter((o) => (searchFilter ? o.customer.toLowerCase().includes(searchFilter.toLowerCase()) || o.id.toLowerCase().includes(searchFilter.toLowerCase()) : true))
                        .map((ord) => (
                          <tr key={ord.id}>
                            <td className="aneera-order-id">{ord.id}</td>
                            <td>
                              <div className="aneera-customer-name">{ord.customer}</div>
                              <div style={{ fontSize: '11.5px', color: '#64748b' }}>{ord.phone}</div>
                            </td>
                            <td className="aneera-items-text">{ord.items}</td>
                            <td className="aneera-amount-text">{ord.amount}</td>
                            <td><span className={`aneera-badge ${ord.paymentType}`}>{ord.payment}</span></td>
                            <td><span className={`aneera-badge ${ord.statusType}`}>{ord.status}</span></td>
                            <td className="aneera-order-date">{ord.date}</td>
                            <td><button className="aneera-table-action-btn">View Saree</button></td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CUSTOMERS */}
          {activeTab === 'customers' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="aneera-section-header">
                <div className="aneera-section-title-wrap">
                  <h1>Bridal &amp; Luxury Saree Shoppers</h1>
                  <p>Customer profiles, purchase histories, and Aneera Silk Club membership tiers.</p>
                </div>
              </div>

              <div className="aneera-card">
                <div className="aneera-table-wrapper">
                  <table className="aneera-table">
                    <thead>
                      <tr>
                        <th>CUSTOMER ID</th>
                        <th>FULL NAME &amp; PHONE</th>
                        <th>CITY</th>
                        <th>LIFETIME SAREES</th>
                        <th>TOTAL SPENT</th>
                        <th>MEMBERSHIP TIER</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customersData.map((c) => (
                        <tr key={c.id}>
                          <td className="aneera-order-id">{c.id}</td>
                          <td>
                            <div className="aneera-customer-name">{c.name}</div>
                            <div style={{ fontSize: '11.5px', color: '#64748b' }}>{c.phone}</div>
                          </td>
                          <td>{c.city}</td>
                          <td style={{ fontWeight: 600 }}>{c.sarees}</td>
                          <td style={{ fontWeight: 700, color: '#16a34a' }}>{c.totalSpent}</td>
                          <td><span className="aneera-operational-pill">{c.tier}</span></td>
                          <td><span className="aneera-badge active">{c.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PRODUCTS */}
          {activeTab === 'products' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="aneera-section-header">
                <div className="aneera-section-title-wrap">
                  <h1>Pure Silk &amp; Handloom Catalog</h1>
                  <p>Manage silk mark certified sarees, zaris, thread counts, and pricing.</p>
                </div>
                <div className="aneera-section-actions">
                  <button className="aneera-btn-primary"><Plus size={16} /> Add Saree</button>
                </div>
              </div>

              <div className="aneera-card">
                <div className="aneera-table-wrapper">
                  <table className="aneera-table">
                    <thead>
                      <tr>
                        <th>CODE</th>
                        <th>SAREE NAME</th>
                        <th>WEAVE / FABRIC</th>
                        <th>SHADE &amp; ZARI</th>
                        <th>RETAIL PRICE</th>
                        <th>STOCK ON HAND</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sareeCatalog.map((s) => (
                        <tr key={s.id}>
                          <td className="aneera-order-id">{s.id}</td>
                          <td className="aneera-customer-name">{s.name}</td>
                          <td><span className="aneera-operational-pill">{s.weave}</span></td>
                          <td>{s.color}</td>
                          <td className="aneera-amount-text">{s.price}</td>
                          <td style={{ fontWeight: 600 }}>{s.stock}</td>
                          <td>
                            <span className={`aneera-badge ${s.status === 'In Stock' ? 'active' : 'low'}`}>
                              {s.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CATEGORIES */}
          {activeTab === 'categories' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="aneera-section-header">
                <div className="aneera-section-title-wrap">
                  <h1>Saree Categories &amp; Weave Varieties</h1>
                  <p>Categorized by geographic handloom origin and silk certifications.</p>
                </div>
              </div>

              <div className="aneera-cards-grid">
                {[
                  { name: 'Kanchipuram Silk', origin: 'Tamil Nadu Handloom', count: '148 Sarees', share: '38% Revenue' },
                  { name: 'Banarasi Brocade', origin: 'Varanasi Weavers Guild', count: '124 Sarees', share: '26% Revenue' },
                  { name: 'Mysore Silk Crepe', origin: 'Karnataka KSIC Silk', count: '92 Sarees', share: '16% Revenue' },
                  { name: 'Designer & Organza', origin: 'Contemporary Zari Atelier', count: '116 Sarees', share: '14% Revenue' },
                  { name: 'Tussar & Chanderi', origin: 'Madhya Pradesh & Champa', count: '106 Sarees', share: '6% Revenue' },
                ].map((cat, i) => (
                  <div key={i} className="aneera-feature-card">
                    <div className="aneera-card-badge-row">
                      <span className="aneera-badge-pill">{cat.share}</span>
                    </div>
                    <h3 className="aneera-card-title">{cat.name}</h3>
                    <p className="aneera-card-desc">{cat.origin}</p>
                    <div className="aneera-card-meta">
                      <span>Total SKUs: <strong>{cat.count}</strong></span>
                      <span style={{ color: '#059669', fontWeight: 600 }}>Silk Mark Certified</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: COLLECTIONS */}
          {activeTab === 'collections' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="aneera-section-header">
                <div className="aneera-section-title-wrap">
                  <h1>Curated Bridal &amp; Festive Collections</h1>
                  <p>Seasonal campaign capsules, bridal trousseau sets, and festive lookbooks.</p>
                </div>
                <div className="aneera-section-actions">
                  <button className="aneera-btn-primary"><Plus size={16} /> New Collection</button>
                </div>
              </div>

              <div className="aneera-cards-grid">
                {collectionsData.map((col, idx) => (
                  <div key={idx} className="aneera-feature-card">
                    <div className="aneera-card-badge-row">
                      <span className="aneera-badge-pill">{col.badge}</span>
                      <span style={{ fontSize: '11.5px', color: '#64748b' }}>{col.season}</span>
                    </div>
                    <h3 className="aneera-card-title">{col.name}</h3>
                    <p className="aneera-card-desc">{col.desc}</p>
                    <div className="aneera-card-meta">
                      <span>Designs: <strong>{col.count}</strong></span>
                      <button className="aneera-table-action-btn">Manage Lookbook</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: INVENTORY */}
          {activeTab === 'inventory' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="aneera-section-header">
                <div className="aneera-section-title-wrap">
                  <h1>Loom Batches &amp; Warehouse Inventory</h1>
                  <p>Handloom weaver registry, silk weight (grams), and barcoded saree vaults.</p>
                </div>
              </div>

              <div className="aneera-kpi-grid">
                <div className="aneera-kpi-card">
                  <div className="aneera-kpi-icon-box amber"><Boxes size={22} /></div>
                  <div className="aneera-kpi-info">
                    <span className="aneera-kpi-label">Vault Inventory</span>
                    <span className="aneera-kpi-value">586 Sarees</span>
                    <span className="aneera-kpi-growth">In stock &amp; tagged</span>
                  </div>
                </div>
                <div className="aneera-kpi-card">
                  <div className="aneera-kpi-icon-box green"><CheckCircle size={22} /></div>
                  <div className="aneera-kpi-info">
                    <span className="aneera-kpi-label">Silk Mark Verified</span>
                    <span className="aneera-kpi-value">100%</span>
                    <span className="aneera-kpi-growth">Pure mulberry test</span>
                  </div>
                </div>
                <div className="aneera-kpi-card">
                  <div className="aneera-kpi-icon-box purple"><DollarSign size={22} /></div>
                  <div className="aneera-kpi-info">
                    <span className="aneera-kpi-label">Inventory Value</span>
                    <span className="aneera-kpi-value">₹94,20,000</span>
                    <span className="aneera-kpi-subtext">Vault wholesale cost</span>
                  </div>
                </div>
                <div className="aneera-kpi-card">
                  <div className="aneera-kpi-icon-box blue"><Sparkles size={22} /></div>
                  <div className="aneera-kpi-info">
                    <span className="aneera-kpi-label">Active Looms</span>
                    <span className="aneera-kpi-value">42 Looms</span>
                    <span className="aneera-kpi-growth">Kanchipuram &amp; UP</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: OFFERS & COUPONS */}
          {activeTab === 'offers' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="aneera-section-header">
                <div className="aneera-section-title-wrap">
                  <h1>Festive Discounts &amp; Bridal Coupons</h1>
                  <p>Promotional promo codes for online saree buyers and showroom walk-ins.</p>
                </div>
                <div className="aneera-section-actions">
                  <button className="aneera-btn-primary"><Plus size={16} /> Create Coupon</button>
                </div>
              </div>

              <div className="aneera-card">
                <div className="aneera-table-wrapper">
                  <table className="aneera-table">
                    <thead>
                      <tr>
                        <th>COUPON CODE</th>
                        <th>DISCOUNT</th>
                        <th>APPLICABLE ON</th>
                        <th>MINIMUM PURCHASE</th>
                        <th>VALID UNTIL</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { code: 'BRIDAL10', disc: '10% OFF', for: 'Kanchipuram Silk Sarees', min: '₹20,000', valid: 'Nov 30, 2026', st: 'Active' },
                        { code: 'ROYAL5000', disc: '₹5,000 Flat OFF', for: 'Orders above ₹40,000', min: '₹40,000', valid: 'Dec 15, 2026', st: 'Active' },
                        { code: 'FESTIVE15', disc: '15% OFF', for: 'Designer Organza & Tissue', min: '₹10,000', valid: 'Nov 20, 2026', st: 'Active' },
                        { code: 'FIRSTSAREE', disc: '₹1,000 OFF', for: 'First time saree order', min: '₹8,000', valid: 'Dec 31, 2026', st: 'Active' },
                      ].map((c, i) => (
                        <tr key={i}>
                          <td className="aneera-order-id" style={{ fontSize: '13.5px' }}>{c.code}</td>
                          <td style={{ fontWeight: 700, color: '#059669' }}>{c.disc}</td>
                          <td>{c.for}</td>
                          <td>{c.min}</td>
                          <td style={{ fontSize: '12px', color: '#64748b' }}>{c.valid}</td>
                          <td><span className="aneera-badge active">{c.st}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: PAYMENTS */}
          {activeTab === 'payments' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="aneera-section-header">
                <div className="aneera-section-title-wrap">
                  <h1>Saree Sales Payments &amp; Gateway Settlements</h1>
                  <p>All online transactions, luxury saree EMIs, and COD settlements.</p>
                </div>
                <div className="aneera-section-actions">
                  <button className="aneera-btn-secondary"><Download size={15} /> Export Statement</button>
                </div>
              </div>

              <div className="aneera-kpi-grid">
                <div className="aneera-kpi-card">
                  <div className="aneera-kpi-icon-box green">
                    <span style={{ fontSize: '22px', fontWeight: 800 }}>₹</span>
                  </div>
                  <div className="aneera-kpi-info">
                    <span className="aneera-kpi-label">Revenue Today</span>
                    <span className="aneera-kpi-value">₹86,240</span>
                    <span className="aneera-kpi-growth">↑ 16% daily growth</span>
                  </div>
                </div>
                <div className="aneera-kpi-card">
                  <div className="aneera-kpi-icon-box blue"><CreditCard size={22} /></div>
                  <div className="aneera-kpi-info">
                    <span className="aneera-kpi-label">Online &amp; UPI</span>
                    <span className="aneera-kpi-value">84%</span>
                    <span className="aneera-kpi-growth">Prepaid orders</span>
                  </div>
                </div>
                <div className="aneera-kpi-card">
                  <div className="aneera-kpi-icon-box amber"><DollarSign size={22} /></div>
                  <div className="aneera-kpi-info">
                    <span className="aneera-kpi-label">Cash on Delivery</span>
                    <span className="aneera-kpi-value">16%</span>
                    <span className="aneera-kpi-subtext">Courier verified</span>
                  </div>
                </div>
                <div className="aneera-kpi-card">
                  <div className="aneera-kpi-icon-box purple"><ShieldCheck size={22} /></div>
                  <div className="aneera-kpi-info">
                    <span className="aneera-kpi-label">Settlement Status</span>
                    <span className="aneera-kpi-value">100% OK</span>
                    <span className="aneera-kpi-growth">● Direct to Bank</span>
                  </div>
                </div>
              </div>

              <div className="aneera-card">
                <div className="aneera-table-wrapper">
                  <table className="aneera-table">
                    <thead>
                      <tr>
                        <th>TXN ID</th>
                        <th>ORDER REF</th>
                        <th>CUSTOMER</th>
                        <th>PAYMENT METHOD</th>
                        <th>AMOUNT</th>
                        <th>STATUS</th>
                        <th>DATE &amp; TIME</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentsData.map((txn) => (
                        <tr key={txn.id}>
                          <td className="aneera-order-id">{txn.id}</td>
                          <td style={{ fontWeight: 600 }}>{txn.order}</td>
                          <td className="aneera-customer-name">{txn.customer}</td>
                          <td><span className="aneera-operational-pill">{txn.mode}</span></td>
                          <td className="aneera-amount-text">{txn.amount}</td>
                          <td><span className="aneera-badge active">{txn.status}</span></td>
                          <td className="aneera-order-date">{txn.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: REPORTS & ANALYTICS */}
          {activeTab === 'analytics' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="aneera-section-header">
                <div className="aneera-section-title-wrap">
                  <h1>Saree Demand &amp; Bridal Sales Insights</h1>
                  <p>Seasonal demand curves, average cart values, and top regional buyers.</p>
                </div>
              </div>

              <div className="aneera-kpi-grid">
                <div className="aneera-kpi-card">
                  <div className="aneera-kpi-icon-box green"><Award size={22} /></div>
                  <div className="aneera-kpi-info">
                    <span className="aneera-kpi-label">Avg Order Value</span>
                    <span className="aneera-kpi-value">₹19,250</span>
                    <span className="aneera-kpi-growth">High luxury tier</span>
                  </div>
                </div>
                <div className="aneera-kpi-card">
                  <div className="aneera-kpi-icon-box blue"><TrendingUp size={22} /></div>
                  <div className="aneera-kpi-info">
                    <span className="aneera-kpi-label">Return Rate</span>
                    <span className="aneera-kpi-value">1.1%</span>
                    <span className="aneera-kpi-growth">Exceptionally low</span>
                  </div>
                </div>
                <div className="aneera-kpi-card">
                  <div className="aneera-kpi-icon-box amber"><Users size={22} /></div>
                  <div className="aneera-kpi-info">
                    <span className="aneera-kpi-label">Top City</span>
                    <span className="aneera-kpi-value">Bengaluru</span>
                    <span className="aneera-kpi-subtext">34% of bridal sales</span>
                  </div>
                </div>
                <div className="aneera-kpi-card">
                  <div className="aneera-kpi-icon-box purple"><Sparkles size={22} /></div>
                  <div className="aneera-kpi-info">
                    <span className="aneera-kpi-label">Peak Weave</span>
                    <span className="aneera-kpi-value">Kanchipuram</span>
                    <span className="aneera-kpi-growth">142 sold this week</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: USERS & ROLES */}
          {activeTab === 'roles' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="aneera-section-header">
                <div className="aneera-section-title-wrap">
                  <h1>Store Staff &amp; Draper Permissions</h1>
                  <p>Access control for showroom managers, master drapers, and dispatch team.</p>
                </div>
              </div>

              <div className="aneera-card">
                <div className="aneera-table-wrapper">
                  <table className="aneera-table">
                    <thead>
                      <tr>
                        <th>STAFF MEMBER</th>
                        <th>ROLE</th>
                        <th>STORE SECTION</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'Admin (You)', role: 'Managing Director / Owner', sec: 'All Modules', st: 'Active' },
                        { name: 'Saraswathi Natarajan', role: 'Head Saree Draper & Stylist', sec: 'Bridal Consultations', st: 'Active' },
                        { name: 'Karthik Raman', role: 'Loom Procurement Lead', sec: 'Inventory & Weavers', st: 'Active' },
                        { name: 'Sunita Mehra', role: 'Online Dispatch Manager', sec: 'Orders & Couriers', st: 'Active' },
                      ].map((u, i) => (
                        <tr key={i}>
                          <td className="aneera-customer-name">{u.name}</td>
                          <td><span className="aneera-operational-pill">{u.role}</span></td>
                          <td>{u.sec}</td>
                          <td><span className="aneera-badge active">{u.st}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}


          {/* TAB: MASTER WEAVERS & LOOMS */}
          {activeTab === 'looms' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="aneera-section-header">
                <div className="aneera-section-title-wrap">
                  <h1>Master Weavers & Handloom Clusters</h1>
                  <p>Coordinating directly with Kanchipuram, Arani, and Dharmavaram master silk weavers.</p>
                </div>
                <button className="aneera-btn-primary"><Plus size={16} /> Register Weaver</button>
              </div>
              <div className="aneera-card">
                <div className="aneera-table-wrapper">
                  <table className="aneera-table">
                    <thead>
                      <tr>
                        <th>WEAVER NAME</th>
                        <th>LOOM SOCIETY</th>
                        <th>ACTIVE LOOMS</th>
                        <th>HERITAGE WEAVE</th>
                        <th>MONTHLY CAPACITY</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'K. R. Ramanathan', soc: 'Kanchipuram Silk Weavers Sector 1', looms: '12 Looms', weave: 'Pure Gold Zari Temple Borders', cap: '24 Sarees/mo', st: 'Active' },
                        { name: 'Srinivasa Padmashali', soc: 'Dharmavaram Apex Guild', looms: '8 Looms', weave: 'Heavy Tissue Brocade', cap: '18 Sarees/mo', st: 'Active' },
                        { name: 'Gopalrao Kulkarni', soc: 'Arani Traditional Loom Society', looms: '10 Looms', weave: 'Contrast Korvai Borders', cap: '20 Sarees/mo', st: 'Active' },
                        { name: 'Devendra Koli', soc: 'Pochampally Double Ikat Guild', looms: '6 Looms', weave: 'Heritage Silk Ikat Weft', cap: '14 Sarees/mo', st: 'Active' },
                      ].map((w, i) => (
                        <tr key={i}>
                          <td className="aneera-customer-name">{w.name}</td>
                          <td>{w.soc}</td>
                          <td><span className="aneera-operational-pill">{w.looms}</span></td>
                          <td>{w.weave}</td>
                          <td><strong>{w.cap}</strong></td>
                          <td><span className="aneera-badge active">{w.st}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: GST TAX INVOICES */}
          {activeTab === 'invoices' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="aneera-section-header">
                <div className="aneera-section-title-wrap">
                  <h1>GST Tax Invoices & E-Way Bills (HSN 5007)</h1>
                  <p>Taxation records, 5% silk handloom GST breakdown, and customer dispatch receipts.</p>
                </div>
                <button className="aneera-btn-primary"><Plus size={16} /> New Tax Invoice</button>
              </div>
              <div className="aneera-card">
                <div className="aneera-table-wrapper">
                  <table className="aneera-table">
                    <thead>
                      <tr>
                        <th>INVOICE NO</th>
                        <th>CLIENT NAME</th>
                        <th>DATE</th>
                        <th>TAXABLE VALUE</th>
                        <th>GST (5%)</th>
                        <th>TOTAL INVOICE</th>
                        <th>E-WAY BILL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { inv: 'ANR-2026-901', client: 'Ananya Sharma (Hyderabad)', dt: '04 Nov 2026', tax: '₹1,28,095', gst: '₹6,405', tot: '₹1,34,500', ewb: 'EWB-8819021' },
                        { inv: 'ANR-2026-900', client: 'Priya Mehra (Bengaluru)', dt: '03 Nov 2026', tax: '₹1,35,238', gst: '₹6,762', tot: '₹1,42,000', ewb: 'EWB-8819020' },
                        { inv: 'ANR-2026-899', client: 'Deepika Rao (Chennai)', dt: '02 Nov 2026', tax: '₹1,12,857', gst: '₹5,643', tot: '₹1,18,500', ewb: 'EWB-8819019' },
                        { inv: 'ANR-2026-898', client: 'Kavita Patel (Mumbai)', dt: '01 Nov 2026', tax: '₹1,10,857', gst: '₹5,543', tot: '₹1,16,400', ewb: 'EWB-8819018' },
                      ].map((inv, i) => (
                        <tr key={i}>
                          <td className="aneera-customer-name">{inv.inv}</td>
                          <td>{inv.client}</td>
                          <td>{inv.dt}</td>
                          <td>{inv.tax}</td>
                          <td>{inv.gst}</td>
                          <td><strong style={{ color: '#059669' }}>{inv.tot}</strong></td>
                          <td><span className="aneera-operational-pill">{inv.ewb}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};
