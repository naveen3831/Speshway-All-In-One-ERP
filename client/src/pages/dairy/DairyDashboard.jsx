import React, { useState } from 'react';
import {
  useNavigate,
  Link } from 'react-router-dom';
import {
  LayoutGrid,
  ShoppingCart,
  Users,
  Package,
  Folder,
  Boxes,
  RefreshCw,
  Truck,
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
  Eye,
  Download,
  Phone,
  MapPin,
  FileText,
  SlidersHorizontal,
  ThermometerSnowflake,
  ShieldCheck,
} from 'lucide-react';
import './DairyDashboard.css';

// SVG graphic for Cow Logo
const CowLogoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4 8C3.2 6.5 2 4.5 2 3C4 3.5 6 4.8 7 6M20 8C20.8 6.5 22 4.5 22 3C20 3.5 18 4.8 17 6"
      stroke="#ffffff"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 6C5 7.5 4 10 4 13C4 17.5 7.5 21 12 21C16.5 21 20 17.5 20 13C20 10 19 7.5 17 6C15 7 9 7 7 6Z"
      fill="#ffffff"
      fillOpacity="0.15"
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <circle cx="8.5" cy="12.5" r="1.5" fill="#ffffff" />
    <circle cx="15.5" cy="12.5" r="1.5" fill="#ffffff" />
    <path
      d="M8.5 16.5C8.5 15.5 10 15 12 15C14 15 15.5 15.5 15.5 16.5C15.5 18 14 19 12 19C10 19 8.5 18 8.5 16.5Z"
      fill="#ffffff"
    />
    <circle cx="10.5" cy="16.5" r="0.6" fill="#059669" />
    <circle cx="13.5" cy="16.5" r="0.6" fill="#059669" />
  </svg>
);

// High-fidelity dairy product SVGs
const MilkBottleIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <rect x="11" y="4" width="10" height="4" rx="2" fill="#0ea5e9" />
    <path d="M12 8H20L22 13V26C22 27.1 21.1 28 20 28H12C10.9 28 10 27.1 10 26V13L12 8Z" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" />
    <path d="M10 16C12 15 14 17 18 16C20 15.5 21 16 22 16.5V26C22 27.1 21.1 28 20 28H12C10.9 28 10 27.1 10 26V16Z" fill="#ffffff" />
    <line x1="13" y1="19" x2="19" y2="19" stroke="#93c5fd" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="14" y1="22" x2="18" y2="22" stroke="#93c5fd" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const PaneerIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <ellipse cx="16" cy="22" rx="12" ry="6" fill="#d97706" fillOpacity="0.2" />
    <path d="M6 18C6 22 10.5 25 16 25C21.5 25 26 22 26 18H6Z" fill="#b45309" fillOpacity="0.8" />
    <rect x="10" y="11" width="7" height="6" rx="1" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.2" />
    <rect x="15" y="9" width="7" height="6" rx="1" fill="#ffffff" stroke="#f59e0b" strokeWidth="1.2" />
    <rect x="12" y="14" width="7" height="6" rx="1" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.2" />
  </svg>
);

const CurdPotIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <path d="M7 16C7 23 11 27 16 27C21 27 25 23 25 16C25 14 24 13 22 13H10C8 13 7 14 7 16Z" fill="#9a3412" />
    <ellipse cx="16" cy="13" rx="7" ry="2.5" fill="#fef08a" />
    <ellipse cx="16" cy="12.5" rx="6" ry="2" fill="#ffffff" />
    <path d="M12 9C13 8 15 8 16 9C17 10 19 10 20 9" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ButterIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <rect x="7" y="12" width="18" height="10" rx="2" fill="#fde047" stroke="#eab308" strokeWidth="1.5" />
    <path d="M7 15L15 11L25 15" stroke="#ca8a04" strokeWidth="1.2" strokeLinecap="round" />
    <rect x="10" y="16" width="6" height="3" rx="0.5" fill="#ffffff" fillOpacity="0.5" />
  </svg>
);

const GheeJarIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <rect x="11" y="6" width="10" height="3" rx="1.5" fill="#ca8a04" />
    <path d="M10 9H22L24 14V25C24 26.1 23.1 27 22 27H10C8.9 27 8 26.1 8 25V14L10 9Z" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
    <path d="M9 15C11 14 13 16 16 15C19 14 21 15 23 15.5V25C23 26.1 22.1 27 21 27H11C9.9 27 9 26.1 9 25V15Z" fill="#facc15" />
    <circle cx="16" cy="20" r="3" fill="#ffffff" fillOpacity="0.4" />
  </svg>
);

const CheeseWedgeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <path d="M6 22L26 22L24 12L6 18V22Z" fill="#fde047" stroke="#eab308" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M6 18L18 8L24 12" stroke="#eab308" strokeWidth="1.5" fill="#fef08a" />
    <circle cx="12" cy="19" r="1.5" fill="#ca8a04" />
    <circle cx="18" cy="18" r="2" fill="#ca8a04" />
    <circle cx="21" cy="15" r="1.2" fill="#ca8a04" />
  </svg>
);

export const DairyDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [salesView, setSalesView] = useState('revenue'); // 'revenue' or 'orders'
  const [dateRange, setDateRange] = useState('Last 7 Days');
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Sales trend points matching screenshot curve
  const salesData = [
    { date: 'Oct 25', revenue: 2400, orders: 18, x: 50, y: 160 },
    { date: 'Oct 26', revenue: 3450, orders: 24, x: 130, y: 142 },
    { date: 'Oct 27', revenue: 5900, orders: 38, x: 210, y: 110 },
    { date: 'Oct 28', revenue: 5200, orders: 31, x: 290, y: 122 },
    { date: 'Oct 29', revenue: 7300, orders: 46, x: 370, y: 92 },
    { date: 'Oct 30', revenue: 7450, orders: 49, x: 450, y: 90 },
    { date: 'Oct 31', revenue: 11400, orders: 72, x: 530, y: 32 },
  ];

  // SVG Area path generator
  const linePath = `M ${salesData.map((p) => `${p.x},${p.y}`).join(' L ')}`;
  const areaPath = `M 50,190 L ${salesData.map((p) => `${p.x},${p.y}`).join(' L ')} L 530,190 Z`;

  // Sidebar navigation items matching the screenshot
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'orders', label: 'Orders', icon: ShoppingCart, badge: '12' },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'categories', label: 'Categories', icon: Folder },
    { id: 'inventory', label: 'Inventory', icon: Boxes },
    { id: 'subscriptions', label: 'Subscriptions', icon: RefreshCw },
    { id: 'delivery', label: 'Delivery Management', icon: Truck },
    { id: 'offers', label: 'Offers & Coupons', icon: Tag },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'analytics', label: 'Reports & Analytics', icon: TrendingUp },
    { id: 'roles', label: 'Users & Roles', icon: UserCheck },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Recent orders matching exact screenshot data
  const recentOrders = [
    {
      id: '#ORD-3289',
      customer: 'Ravi Kumar',
      phone: '+91 98450 12398',
      items: 'Toned Milk (1 L) ×2, Curd (500 g) ×1',
      amount: '₹162.00',
      payment: 'Paid',
      paymentType: 'paid',
      status: 'Out for Delivery',
      statusType: 'out-delivery',
      date: 'Oct 31, 2026 10:24 AM',
    },
    {
      id: '#ORD-3288',
      customer: 'Sneha Reddy',
      phone: '+91 98231 44521',
      items: 'Paneer (200 g) ×1, Milk (1 L) ×1',
      amount: '₹198.00',
      payment: 'Paid',
      paymentType: 'paid',
      status: 'Delivered',
      statusType: 'delivered',
      date: 'Oct 31, 2026 09:47 AM',
    },
    {
      id: '#ORD-3287',
      customer: 'Arjun Rao',
      phone: '+91 97410 88912',
      items: 'Curd (500 g) ×2, Butter (100 g) ×1',
      amount: '₹224.00',
      payment: 'COD',
      paymentType: 'cod',
      status: 'Processing',
      statusType: 'processing',
      date: 'Oct 30, 2026 08:12 PM',
    },
    {
      id: '#ORD-3286',
      customer: 'Meena Devi',
      phone: '+91 99001 77210',
      items: 'Milk (1 L) ×1, Ghee (500 ml) ×1',
      amount: '₹540.00',
      payment: 'Paid',
      paymentType: 'paid',
      status: 'Delivered',
      statusType: 'delivered',
      date: 'Oct 30, 2026 06:31 PM',
    },
    {
      id: '#ORD-3285',
      customer: 'Vikram Patel',
      phone: '+91 98112 33499',
      items: 'Full Cream Buffalo Milk (1 L) ×3',
      amount: '₹210.00',
      payment: 'Paid',
      paymentType: 'paid',
      status: 'Delivered',
      statusType: 'delivered',
      date: 'Oct 30, 2026 05:15 PM',
    },
    {
      id: '#ORD-3284',
      customer: 'Kavita Sharma',
      phone: '+91 96541 22800',
      items: 'Desi Cow Ghee (1 L) ×1, Paneer (500 g) ×1',
      amount: '₹1,020.00',
      payment: 'Paid',
      paymentType: 'paid',
      status: 'Delivered',
      statusType: 'delivered',
      date: 'Oct 30, 2026 03:40 PM',
    },
  ];

  // Top Selling Products matching screenshot
  const topSellingProducts = [
    {
      id: 1,
      name: 'Toned Milk (1 L)',
      sold: '142 sold',
      revenue: '₹8,520',
      Icon: MilkBottleIcon,
    },
    {
      id: 2,
      name: 'Paneer (200 g)',
      sold: '89 sold',
      revenue: '₹7,120',
      Icon: PaneerIcon,
    },
    {
      id: 3,
      name: 'Curd (500 g)',
      sold: '76 sold',
      revenue: '₹4,560',
      Icon: CurdPotIcon,
    },
  ];

  // Low Stock Products matching screenshot
  const lowStockProducts = [
    {
      id: 1,
      name: 'Butter (100 g)',
      leftCount: '5 left',
      Icon: ButterIcon,
    },
    {
      id: 2,
      name: 'Ghee (500 ml)',
      leftCount: '8 left',
      Icon: GheeJarIcon,
    },
    {
      id: 3,
      name: 'Cheese (200 g)',
      leftCount: '6 left',
      Icon: CheeseWedgeIcon,
    },
  ];

  // Static Data: Customers Directory
  const customersData = [
    { id: 'CUST-1042', name: 'Ravi Kumar', phone: '+91 98450 12398', address: 'Flat 402, Shanti Vihar, Sector 14', plan: '1L Cow Milk Daily', qty: '1 L', wallet: '₹1,420', status: 'Active' },
    { id: 'CUST-1043', name: 'Sneha Reddy', phone: '+91 98231 44521', address: 'Villa 12, Palm Meadows, Whitefield', plan: '2L Buffalo Milk Daily', qty: '2 L', wallet: '₹850', status: 'Active' },
    { id: 'CUST-1044', name: 'Arjun Rao', phone: '+91 97410 88912', address: 'Tower B-901, Prestige Lakeside', plan: '1L Toned Milk + Curd', qty: '1.5 L', wallet: '₹340', status: 'Active' },
    { id: 'CUST-1045', name: 'Meena Devi', phone: '+91 99001 77210', address: 'House 88, 3rd Cross, Indiranagar', plan: '500ml Cow Milk Alternate Days', qty: '0.5 L', wallet: '₹2,100', status: 'Active' },
    { id: 'CUST-1046', name: 'Vikram Patel', phone: '+91 98112 33499', address: 'Plot 21, Green Glen Layout, Bellandur', plan: '2L Cow Milk Daily', qty: '2 L', wallet: '₹0 (COD)', status: 'Paused' },
    { id: 'CUST-1047', name: 'Kavita Sharma', phone: '+91 96541 22800', address: 'Apt 105, Godrej Woods, HSR Layout', plan: '1L A2 Organic Milk Daily', qty: '1 L', wallet: '₹3,450', status: 'Active' },
  ];

  // Static Data: Payments & Transactions (User clicked in screenshot!)
  const paymentsData = [
    { id: 'TXN-98432', orderId: '#ORD-3289', customer: 'Ravi Kumar', mode: 'UPI (PhonePe)', amount: '₹162.00', status: 'Success', statusType: 'paid', date: 'Oct 31, 2026 10:24 AM' },
    { id: 'TXN-98431', orderId: '#ORD-3288', customer: 'Sneha Reddy', mode: 'UPI (Google Pay)', amount: '₹198.00', status: 'Success', statusType: 'paid', date: 'Oct 31, 2026 09:47 AM' },
    { id: 'TXN-98430', orderId: '#ORD-3287', customer: 'Arjun Rao', mode: 'Cash on Delivery', amount: '₹224.00', status: 'Pending', statusType: 'cod', date: 'Oct 30, 2026 08:12 PM' },
    { id: 'TXN-98429', orderId: '#ORD-3286', customer: 'Meena Devi', mode: 'Wallet Balance', amount: '₹540.00', status: 'Success', statusType: 'paid', date: 'Oct 30, 2026 06:31 PM' },
    { id: 'TXN-98428', orderId: '#ORD-3285', customer: 'Vikram Patel', mode: 'NetBanking (HDFC)', amount: '₹210.00', status: 'Success', statusType: 'paid', date: 'Oct 30, 2026 05:15 PM' },
    { id: 'TXN-98427', orderId: '#ORD-3284', customer: 'Kavita Sharma', mode: 'Credit Card', amount: '₹1,020.00', status: 'Settled', statusType: 'out-delivery', date: 'Oct 30, 2026 03:40 PM' },
    { id: 'TXN-98426', orderId: '#ORD-3283', customer: 'Anand Verma', mode: 'UPI (Paytm)', amount: '₹340.00', status: 'Success', statusType: 'paid', date: 'Oct 30, 2026 01:20 PM' },
  ];

  // Static Data: Products Catalog
  const productsCatalog = [
    { id: 'PRD-01', name: 'Fresh Toned Cow Milk', category: 'Milk', packaging: '1 Liter Pouch', price: '₹60.00', stock: '280 Liters', status: 'In Stock' },
    { id: 'PRD-02', name: 'Full Cream Buffalo Milk', category: 'Milk', packaging: '1 Liter Pouch', price: '₹70.00', stock: '190 Liters', status: 'In Stock' },
    { id: 'PRD-03', name: 'Fresh Malai Paneer', category: 'Curd & Paneer', packaging: '200g Vacuum Pack', price: '₹80.00', stock: '89 Units', status: 'In Stock' },
    { id: 'PRD-04', name: 'Desi Clay Pot Curd', category: 'Curd & Paneer', packaging: '500g Clay Pot', price: '₹60.00', stock: '76 Units', status: 'In Stock' },
    { id: 'PRD-05', name: 'Table Salted Butter', category: 'Ghee & Butter', packaging: '100g Bar', price: '₹58.00', stock: '5 left', status: 'Low Stock' },
    { id: 'PRD-06', name: 'Pure Bilona Cow Ghee', category: 'Ghee & Butter', packaging: '500ml Glass Jar', price: '₹540.00', stock: '8 left', status: 'Low Stock' },
    { id: 'PRD-07', name: 'Fresh Processed Cheese', category: 'Cheese & Sweets', packaging: '200g Block', price: '₹135.00', stock: '6 left', status: 'Low Stock' },
  ];

  // Static Data: Categories
  const categoriesData = [
    { id: 'CAT-1', name: 'Farm Fresh Milk', desc: 'Pasteurized toned, homogenized full cream, A2 cow & buffalo milk varieties.', items: 6, dailyVolume: '1,850 Liters/day', share: '62%' },
    { id: 'CAT-2', name: 'Curd, Paneer & Buttermilk', desc: 'Thick creamy dahi, soft malai paneer, and refreshing spiced chaas.', items: 8, dailyVolume: '480 Units/day', share: '18%' },
    { id: 'CAT-3', name: 'Pure Desi Ghee & Butter', desc: 'Traditional bilona churning, golden aroma desi ghee & salted butter slabs.', items: 4, dailyVolume: '210 Units/day', share: '14%' },
    { id: 'CAT-4', name: 'Artisanal Cheese & Dairy Sweets', desc: 'Grated mozzarella, cheese wedges, peda, shrikhand, and paneer sweets.', items: 5, dailyVolume: '130 Units/day', share: '6%' },
  ];

  // Static Data: Cold Storage & Inventory
  const inventoryData = [
    { batch: 'BCH-2026-10-31A', item: 'Toned Cow Milk (1 L)', location: 'Chiller Cold Room 1', temp: '3.8°C', qty: '450 Pouches', mfg: 'Oct 31, 2026 04:00 AM', exp: 'Nov 02, 2026', audit: 'Passed (100%)' },
    { batch: 'BCH-2026-10-31B', item: 'Fresh Malai Paneer', location: 'Chiller Cold Room 2', temp: '4.1°C', qty: '120 Packs', mfg: 'Oct 30, 2026 06:00 PM', exp: 'Nov 04, 2026', audit: 'Passed (100%)' },
    { batch: 'BCH-2026-10-30C', item: 'Pure Cow Ghee (500 ml)', location: 'Dry Ambient Store', temp: '22.0°C', qty: '84 Jars', mfg: 'Oct 28, 2026', exp: 'Apr 28, 2027', audit: 'Passed (100%)' },
    { batch: 'BCH-2026-10-30D', item: 'Table Butter (100 g)', location: 'Deep Freezer Bay', temp: '-18.2°C', qty: '18 Bars', mfg: 'Oct 29, 2026', exp: 'Dec 29, 2026', audit: 'Reorder Alert' },
  ];

  // Static Data: Subscriptions
  const subscriptionsData = [
    { id: 'SUB-401', customer: 'Ravi Kumar', route: 'Sector 14 Morning', plan: '1L Cow Milk Daily', slot: '5:30 AM - 7:00 AM', monthly: '₹1,800', nextRenewal: 'Nov 15, 2026', status: 'Active' },
    { id: 'SUB-402', customer: 'Sneha Reddy', route: 'Whitefield Palm Route', plan: '2L Buffalo Milk Daily', slot: '5:45 AM - 7:15 AM', monthly: '₹4,200', nextRenewal: 'Nov 20, 2026', status: 'Active' },
    { id: 'SUB-403', customer: 'Arjun Rao', route: 'Prestige Lakeside Express', plan: '1L Milk + 500g Curd Alternate', slot: '6:00 AM - 7:30 AM', monthly: '₹2,640', nextRenewal: 'Nov 12, 2026', status: 'Active' },
    { id: 'SUB-404', customer: 'Meena Devi', route: 'Indiranagar Central', plan: '500ml Cow Milk Alternate', slot: '6:15 AM - 7:45 AM', monthly: '₹900', nextRenewal: 'Nov 30, 2026', status: 'Active' },
    { id: 'SUB-405', customer: 'Vikram Patel', route: 'Bellandur Green Glen', plan: '2L Cow Milk Daily', slot: '6:30 AM - 8:00 AM', monthly: '₹3,600', nextRenewal: 'Nov 05, 2026', status: 'Paused' },
  ];

  // Static Data: Delivery Management
  const deliveryData = [
    { route: 'RT-CENTRAL-01', agent: 'Suresh Kumar', phone: '+91 98801 12345', vehicle: 'Van (KA-03-MD-4401)', stops: '102 Houses', completed: '98 / 102', status: 'On Schedule', eta: '7:45 AM' },
    { route: 'RT-WHITEFIELD-02', agent: 'Manjunath B.', phone: '+91 97422 99811', vehicle: 'Van (KA-51-MD-9082)', stops: '88 Houses', completed: '88 / 88', status: 'Completed', eta: 'Delivered' },
    { route: 'RT-HSR-03', agent: 'Kiran Gowda', phone: '+91 99160 55412', vehicle: 'EV Cargo (KA-05-EV-1120)', stops: '74 Houses', completed: '65 / 74', status: 'In Transit', eta: '7:55 AM' },
    { route: 'RT-INDIRANAGAR-04', agent: 'Pradeep Sen', phone: '+91 98440 77123', vehicle: 'EV Bike (KA-04-EL-8891)', stops: '62 Houses', completed: '62 / 62', status: 'Completed', eta: 'Delivered' },
  ];

  // Static Data: Offers & Coupons
  const offersData = [
    { code: 'DAIRYFRESH20', desc: 'Flat 20% OFF on all Milk & Curd monthly subscriptions', discount: '20% OFF', minOrder: '₹1,500', validTill: 'Nov 30, 2026', used: 342, status: 'Active' },
    { code: 'MILKMONTH10', desc: '₹100 Cashback on prepaid wallet recharge above ₹2,000', discount: '₹100 Cashback', minOrder: '₹2,000', validTill: 'Dec 31, 2026', used: 198, status: 'Active' },
    { code: 'DESIGHEE50', desc: 'Flat ₹50 OFF on purchase of 1L Pure Desi Cow Ghee', discount: '₹50 OFF', minOrder: '₹500', validTill: 'Nov 15, 2026', used: 84, status: 'Active' },
    { code: 'WELCOME50', desc: '₹50 Flat OFF on first 3 delivery orders for new users', discount: '₹50 OFF', minOrder: '₹200', validTill: 'Dec 15, 2026', used: 512, status: 'Active' },
  ];

  return (
    <div className="dairy-dashboard-container">
      {/* =========================================================
          LEFT SIDEBAR (Dark Navy #0b1120)
      ========================================================= */}
      <aside className="dairy-sidebar">
        <div className="dairy-sidebar-top">
          {/* Brand Header */}
          <Link to="/product/natural-milk-dairy" className="dairy-brand">
            <div className="dairy-brand-logo-box">
              <CowLogoIcon />
            </div>
            <div className="dairy-brand-text">
              <span className="dairy-brand-title">Madhur Dairy</span>
              <span className="dairy-brand-sub">ADMIN PANEL</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <ul className="dairy-nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id} className="dairy-nav-item">
                  <button
                    className={`dairy-nav-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <Icon size={18} />
                    <span className="dairy-nav-label">{item.label}</span>
                    {item.badge && (
                      <span className="dairy-nav-badge">{item.badge}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Sidebar Footer Logout */}
        <div className="dairy-sidebar-footer">
          <button
            className="dairy-logout-btn"
            onClick={() => navigate('/product/natural-milk-dairy')}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* =========================================================
          MAIN WRAPPER & TOP NAVBAR (Increased Height 82px)
      ========================================================= */}
      <div className="dairy-main-wrapper">
        <header className="dairy-top-navbar">
          <div className="dairy-nav-left">
            <span className="dairy-nav-brand-title">Madhur Dairy Management</span>
            <span className="dairy-operational-pill">
              <span className="dairy-op-dot"></span>
              Operational
            </span>
          </div>

          <div className="dairy-nav-right">
            <Link to="/product/natural-milk-dairy" className="dairy-back-catalog-link" title="Return to Natural Milk Dairy product overview">
              <ArrowLeft size={15} /> Back to Catalog
            </Link>

            <button className="dairy-bell-btn" title="Notifications">
              <Bell size={19} />
              <span className="dairy-bell-dot"></span>
            </button>

            <div className="dairy-user-pill">
              <span className="dairy-user-name">Admin</span>
              <div className="dairy-user-avatar">M</div>
            </div>
          </div>
        </header>

        {/* =========================================================
            DYNAMIC TAB VIEWS BASED ON SIDEBAR SELECTION
        ========================================================= */}
        <main className="dairy-content">

          {/* TAB 1: MAIN DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <>
              {/* Welcome Row */}
              <div className="dairy-welcome-row">
                <div className="dairy-welcome-left">
                  <h1>Welcome back, Admin 👋</h1>
                  <p>Manage products, orders, customers, deliveries, and daily dairy operations in one place.</p>
                </div>

                <div style={{ position: 'relative' }}>
                  <button
                    className="dairy-date-btn"
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
                      {['Today', 'Last 7 Days', 'This Month', 'This Quarter'].map((opt) => (
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
              <div className="dairy-kpi-grid">
                <div className="dairy-kpi-card" onClick={() => setActiveTab('orders')} style={{ cursor: 'pointer' }}>
                  <div className="dairy-kpi-icon-box green">
                    <ShoppingCart size={22} />
                  </div>
                  <div className="dairy-kpi-info">
                    <span className="dairy-kpi-label">Total Orders</span>
                    <span className="dairy-kpi-value">248</span>
                    <span className="dairy-kpi-growth">
                      <span>↑</span> +12% from last 7 days
                    </span>
                  </div>
                </div>

                <div className="dairy-kpi-card" onClick={() => setActiveTab('customers')} style={{ cursor: 'pointer' }}>
                  <div className="dairy-kpi-icon-box blue">
                    <Users size={22} />
                  </div>
                  <div className="dairy-kpi-info">
                    <span className="dairy-kpi-label">Total Customers</span>
                    <span className="dairy-kpi-value">1,426</span>
                    <span className="dairy-kpi-growth">
                      <span>↑</span> +8% from last 7 days
                    </span>
                  </div>
                </div>

                <div className="dairy-kpi-card" onClick={() => setActiveTab('products')} style={{ cursor: 'pointer' }}>
                  <div className="dairy-kpi-icon-box amber">
                    <Package size={22} />
                  </div>
                  <div className="dairy-kpi-info">
                    <span className="dairy-kpi-label">Total Products</span>
                    <span className="dairy-kpi-value">86</span>
                    <span className="dairy-kpi-subtext">3 categories</span>
                  </div>
                </div>

                <div className="dairy-kpi-card" onClick={() => setActiveTab('payments')} style={{ cursor: 'pointer' }}>
                  <div className="dairy-kpi-icon-box green">
                    <span style={{ fontSize: '22px', fontWeight: 800, lineHeight: 1 }}>₹</span>
                  </div>
                  <div className="dairy-kpi-info">
                    <span className="dairy-kpi-label">Total Revenue</span>
                    <span className="dairy-kpi-value">₹52,430</span>
                    <span className="dairy-kpi-growth">
                      <span>↑</span> +18% from last 7 days
                    </span>
                  </div>
                </div>
              </div>

              {/* MIDDLE & LOWER GRID */}
              <div className="dairy-main-grid">
                <div className="dairy-col-left">
                  {/* Card 1: Sales Overview */}
                  <div className="dairy-card">
                    <div className="dairy-card-header">
                      <div className="dairy-card-title-group">
                        <BarChart3 size={20} className="dairy-card-icon" />
                        <div>
                          <h2 className="dairy-card-h2">Sales Overview</h2>
                          <p className="dairy-card-sub">Daily revenue and order trends</p>
                        </div>
                      </div>

                      <div className="dairy-toggle-pills">
                        <button
                          className={`dairy-toggle-pill ${salesView === 'revenue' ? 'active' : ''}`}
                          onClick={() => setSalesView('revenue')}
                        >
                          Revenue
                        </button>
                        <button
                          className={`dairy-toggle-pill ${salesView === 'orders' ? 'active' : ''}`}
                          onClick={() => setSalesView('orders')}
                        >
                          Orders
                        </button>
                      </div>
                    </div>

                    <div className="dairy-chart-container">
                      <svg className="dairy-svg-chart" viewBox="0 0 580 220">
                        <defs>
                          <linearGradient id="salesGreenGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.32" />
                            <stop offset="70%" stopColor="#10b981" stopOpacity="0.08" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                          </linearGradient>
                        </defs>

                        {[
                          { val: '₹12,000', y: 25 },
                          { val: '₹10,000', y: 55 },
                          { val: '₹8,000', y: 85 },
                          { val: '₹6,000', y: 115 },
                          { val: '₹4,000', y: 145 },
                          { val: '₹2,000', y: 175 },
                          { val: '₹0', y: 195 },
                        ].map((g, i) => (
                          <g key={i}>
                            <text x="35" y={g.y + 3} textAnchor="end" fontSize="10.5" fill="#94a3b8" fontFamily="Inter, sans-serif">
                              {salesView === 'revenue' ? g.val : `${Math.round(parseInt(g.val.replace(/[^0-9]/g, '')) / 150)} orders`}
                            </text>
                            <line x1="42" y1={g.y} x2="560" y2={g.y} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                          </g>
                        ))}

                        <path d={areaPath} fill="url(#salesGreenGradient)" />

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
                              className="dairy-chart-point"
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

                  {/* Card 2: Recent Orders */}
                  <div className="dairy-card">
                    <div className="dairy-card-header">
                      <div className="dairy-card-title-group">
                        <ShoppingCart size={20} className="dairy-card-icon" />
                        <div>
                          <h2 className="dairy-card-h2">Recent Orders</h2>
                          <p className="dairy-card-sub">Latest customer orders across all channels</p>
                        </div>
                      </div>

                      <button
                        className="dairy-view-all-link"
                        onClick={() => setActiveTab('orders')}
                      >
                        <span>View All Orders</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>

                    <div className="dairy-table-wrapper">
                      <table className="dairy-table">
                        <thead>
                          <tr>
                            <th>ORDER ID</th>
                            <th>CUSTOMER</th>
                            <th>ITEMS</th>
                            <th>AMOUNT</th>
                            <th>PAYMENT</th>
                            <th>STATUS</th>
                            <th>ORDER DATE</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentOrders.slice(0, 4).map((ord) => (
                            <tr key={ord.id}>
                              <td className="dairy-order-id">{ord.id}</td>
                              <td className="dairy-customer-name">{ord.customer}</td>
                              <td className="dairy-items-text">{ord.items}</td>
                              <td className="dairy-amount-text">{ord.amount}</td>
                              <td>
                                <span className={`dairy-badge ${ord.paymentType}`}>
                                  {ord.payment}
                                </span>
                              </td>
                              <td>
                                <span className={`dairy-badge ${ord.statusType}`}>
                                  {ord.status}
                                </span>
                              </td>
                              <td className="dairy-order-date">{ord.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="dairy-col-right">
                  {/* Top Selling Products */}
                  <div className="dairy-card">
                    <div className="dairy-card-header">
                      <div className="dairy-card-title-group">
                        <Award size={20} className="dairy-card-icon" />
                        <div>
                          <h2 className="dairy-card-h2">Top Selling Products</h2>
                          <p className="dairy-card-sub">This week</p>
                        </div>
                      </div>
                    </div>

                    <div className="dairy-list">
                      {topSellingProducts.map((p) => {
                        const ProductIcon = p.Icon;
                        return (
                          <div key={p.id} className="dairy-list-item">
                            <div className="dairy-item-left">
                              <div className="dairy-thumb-box">
                                <ProductIcon />
                              </div>
                              <div>
                                <div className="dairy-item-name">{p.name}</div>
                                <div className="dairy-item-sub">{p.sold}</div>
                              </div>
                            </div>
                            <div className="dairy-item-revenue">{p.revenue}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Low Stock Products */}
                  <div className="dairy-card">
                    <div className="dairy-card-header">
                      <div className="dairy-card-title-group">
                        <AlertTriangle size={20} className="dairy-card-icon amber" />
                        <div>
                          <h2 className="dairy-card-h2">Low Stock Products</h2>
                          <p className="dairy-card-sub">Needs restocking</p>
                        </div>
                      </div>
                    </div>

                    <div className="dairy-list">
                      {lowStockProducts.map((p) => {
                        const ProductIcon = p.Icon;
                        return (
                          <div key={p.id} className="dairy-list-item">
                            <div className="dairy-item-left">
                              <div className="dairy-thumb-box">
                                <ProductIcon />
                              </div>
                              <div className="dairy-item-name">{p.name}</div>
                            </div>
                            <span className="dairy-stock-badge">{p.leftCount}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Info Banner */}
              <div className="dairy-info-banner">
                <Info size={18} style={{ flexShrink: 0 }} />
                <div>
                  <strong>Madhur Dairy – Dairy Management Platform</strong>
                  <span className="dairy-info-divider">|</span>
                  <span>Manage products, orders, inventory, customers, delivery, and subscriptions for a seamless dairy business.</span>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="dairy-section-header">
                <div className="dairy-section-title-wrap">
                  <h1>Orders Management &amp; Dispatch</h1>
                  <p>Track, verify, and fulfill retail and daily subscription dairy orders.</p>
                </div>
                <div className="dairy-section-actions">
                  <button className="dairy-btn-secondary"><Download size={15} /> Export CSV</button>
                  <button className="dairy-btn-primary"><Plus size={16} /> New Order</button>
                </div>
              </div>

              <div className="dairy-filter-bar">
                <div className="dairy-search-box">
                  <Search size={16} color="#64748b" />
                  <input
                    type="text"
                    placeholder="Search orders by customer, Order ID, or items..."
                    className="dairy-search-input"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                  />
                </div>
                <div className="dairy-status-filter-pills">
                  {['all', 'Delivered', 'Out for Delivery', 'Processing'].map((st) => (
                    <button
                      key={st}
                      className={`dairy-filter-pill-btn ${statusFilter === st ? 'active' : ''}`}
                      onClick={() => setStatusFilter(st)}
                    >
                      {st.charAt(0).toUpperCase() + st.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="dairy-card">
                <div className="dairy-table-wrapper">
                  <table className="dairy-table">
                    <thead>
                      <tr>
                        <th>ORDER ID</th>
                        <th>CUSTOMER &amp; PHONE</th>
                        <th>ITEMS &amp; PACKAGING</th>
                        <th>TOTAL AMOUNT</th>
                        <th>PAYMENT METHOD</th>
                        <th>DELIVERY STATUS</th>
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
                            <td className="dairy-order-id">{ord.id}</td>
                            <td>
                              <div className="dairy-customer-name">{ord.customer}</div>
                              <div style={{ fontSize: '11.5px', color: '#64748b' }}>{ord.phone}</div>
                            </td>
                            <td className="dairy-items-text">{ord.items}</td>
                            <td className="dairy-amount-text">{ord.amount}</td>
                            <td>
                              <span className={`dairy-badge ${ord.paymentType}`}>{ord.payment}</span>
                            </td>
                            <td>
                              <span className={`dairy-badge ${ord.statusType}`}>{ord.status}</span>
                            </td>
                            <td className="dairy-order-date">{ord.date}</td>
                            <td>
                              <button className="dairy-table-action-btn">View Details</button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CUSTOMERS DIRECTORY */}
          {activeTab === 'customers' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="dairy-section-header">
                <div className="dairy-section-title-wrap">
                  <h1>Customer Directory &amp; Wallets</h1>
                  <p>Manage subscriber profiles, delivery addresses, and prepaid wallet balances.</p>
                </div>
                <div className="dairy-section-actions">
                  <button className="dairy-btn-primary"><Plus size={16} /> Add Customer</button>
                </div>
              </div>

              <div className="dairy-kpi-grid">
                <div className="dairy-kpi-card">
                  <div className="dairy-kpi-icon-box blue"><Users size={22} /></div>
                  <div className="dairy-kpi-info">
                    <span className="dairy-kpi-label">Active Customers</span>
                    <span className="dairy-kpi-value">1,426</span>
                    <span className="dairy-kpi-growth">↑ 8% growth</span>
                  </div>
                </div>
                <div className="dairy-kpi-card">
                  <div className="dairy-kpi-icon-box green"><RefreshCw size={22} /></div>
                  <div className="dairy-kpi-info">
                    <span className="dairy-kpi-label">Daily Subscribers</span>
                    <span className="dairy-kpi-value">890</span>
                    <span className="dairy-kpi-subtext">Morning routes</span>
                  </div>
                </div>
                <div className="dairy-kpi-card">
                  <div className="dairy-kpi-icon-box amber"><DollarSign size={22} /></div>
                  <div className="dairy-kpi-info">
                    <span className="dairy-kpi-label">Customer Wallets</span>
                    <span className="dairy-kpi-value">₹1,42,800</span>
                    <span className="dairy-kpi-subtext">Prepaid balance</span>
                  </div>
                </div>
                <div className="dairy-kpi-card">
                  <div className="dairy-kpi-icon-box purple"><Award size={22} /></div>
                  <div className="dairy-kpi-info">
                    <span className="dairy-kpi-label">Retention Rate</span>
                    <span className="dairy-kpi-value">96.4%</span>
                    <span className="dairy-kpi-growth">Industry leading</span>
                  </div>
                </div>
              </div>

              <div className="dairy-card">
                <div className="dairy-table-wrapper">
                  <table className="dairy-table">
                    <thead>
                      <tr>
                        <th>CUSTOMER ID</th>
                        <th>FULL NAME &amp; PHONE</th>
                        <th>DELIVERY ADDRESS</th>
                        <th>DAILY SUBSCRIPTION</th>
                        <th>DAILY QTY</th>
                        <th>WALLET BALANCE</th>
                        <th>STATUS</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customersData.map((c) => (
                        <tr key={c.id}>
                          <td className="dairy-order-id">{c.id}</td>
                          <td>
                            <div className="dairy-customer-name">{c.name}</div>
                            <div style={{ fontSize: '11.5px', color: '#64748b' }}>{c.phone}</div>
                          </td>
                          <td style={{ fontSize: '12.5px', color: '#475569', maxWidth: '220px' }}>{c.address}</td>
                          <td style={{ fontWeight: 600, color: '#0f172a' }}>{c.plan}</td>
                          <td>{c.qty}</td>
                          <td style={{ fontWeight: 700, color: '#16a34a' }}>{c.wallet}</td>
                          <td>
                            <span className={`dairy-badge ${c.status === 'Active' ? 'active' : 'paused'}`}>
                              {c.status}
                            </span>
                          </td>
                          <td>
                            <button className="dairy-table-action-btn">Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PRODUCTS CATALOG */}
          {activeTab === 'products' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="dairy-section-header">
                <div className="dairy-section-title-wrap">
                  <h1>Dairy Products Catalog &amp; Pricing</h1>
                  <p>All fresh dairy items, standardized pricing, and daily stock availability.</p>
                </div>
                <div className="dairy-section-actions">
                  <button className="dairy-btn-primary"><Plus size={16} /> Add Product</button>
                </div>
              </div>

              <div className="dairy-card">
                <div className="dairy-table-wrapper">
                  <table className="dairy-table">
                    <thead>
                      <tr>
                        <th>CODE</th>
                        <th>PRODUCT NAME</th>
                        <th>CATEGORY</th>
                        <th>PACKAGING SIZE</th>
                        <th>UNIT PRICE</th>
                        <th>DAILY DISPATCH AVAILABILITY</th>
                        <th>STATUS</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productsCatalog.map((p) => (
                        <tr key={p.id}>
                          <td className="dairy-order-id">{p.id}</td>
                          <td className="dairy-customer-name">{p.name}</td>
                          <td><span className="dairy-operational-pill">{p.category}</span></td>
                          <td>{p.packaging}</td>
                          <td className="dairy-amount-text">{p.price}</td>
                          <td style={{ fontWeight: 600 }}>{p.stock}</td>
                          <td>
                            <span className={`dairy-badge ${p.status === 'In Stock' ? 'active' : 'low'}`}>
                              {p.status}
                            </span>
                          </td>
                          <td>
                            <button className="dairy-table-action-btn">Modify</button>
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
              <div className="dairy-section-header">
                <div className="dairy-section-title-wrap">
                  <h1>Product Categories &amp; Production Mix</h1>
                  <p>Key categories powering daily milk collection, processing, and dairy retail.</p>
                </div>
                <div className="dairy-section-actions">
                  <button className="dairy-btn-primary"><Plus size={16} /> New Category</button>
                </div>
              </div>

              <div className="dairy-cards-grid">
                {categoriesData.map((cat) => (
                  <div key={cat.id} className="dairy-category-card">
                    <div className="dairy-cat-header">
                      <div className="dairy-cat-icon-box"><Folder size={22} /></div>
                      <span className="dairy-operational-pill">{cat.share} Revenue</span>
                    </div>
                    <h3 className="dairy-cat-name">{cat.name}</h3>
                    <p className="dairy-cat-desc">{cat.desc}</p>
                    <div className="dairy-cat-stats-row">
                      <span>Products: <strong className="dairy-cat-stat-val">{cat.items} SKUs</strong></span>
                      <span>Volume: <strong className="dairy-cat-stat-val">{cat.dailyVolume}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: INVENTORY & COLD STORAGE */}
          {activeTab === 'inventory' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="dairy-section-header">
                <div className="dairy-section-title-wrap">
                  <h1>Cold Storage &amp; Fresh Inventory Monitoring</h1>
                  <p>Real-time chiller temperatures, batch expiry tracking, and cold chain assurance.</p>
                </div>
                <div className="dairy-section-actions">
                  <button className="dairy-btn-secondary"><ThermometerSnowflake size={15} color="#059669" /> Calibrate Sensors</button>
                  <button className="dairy-btn-primary"><Plus size={16} /> Log Inward Batch</button>
                </div>
              </div>

              <div className="dairy-kpi-grid">
                <div className="dairy-kpi-card">
                  <div className="dairy-kpi-icon-box green"><ThermometerSnowflake size={22} /></div>
                  <div className="dairy-kpi-info">
                    <span className="dairy-kpi-label">Chiller Room 1</span>
                    <span className="dairy-kpi-value">3.8°C</span>
                    <span className="dairy-kpi-growth">● Optimal range</span>
                  </div>
                </div>
                <div className="dairy-kpi-card">
                  <div className="dairy-kpi-icon-box green"><ThermometerSnowflake size={22} /></div>
                  <div className="dairy-kpi-info">
                    <span className="dairy-kpi-label">Chiller Room 2</span>
                    <span className="dairy-kpi-value">4.1°C</span>
                    <span className="dairy-kpi-growth">● Normal</span>
                  </div>
                </div>
                <div className="dairy-kpi-card">
                  <div className="dairy-kpi-icon-box blue"><ThermometerSnowflake size={22} /></div>
                  <div className="dairy-kpi-info">
                    <span className="dairy-kpi-label">Deep Freeze Bay</span>
                    <span className="dairy-kpi-value">-18.2°C</span>
                    <span className="dairy-kpi-growth">● Sub-zero stable</span>
                  </div>
                </div>
                <div className="dairy-kpi-card">
                  <div className="dairy-kpi-icon-box amber"><Boxes size={22} /></div>
                  <div className="dairy-kpi-info">
                    <span className="dairy-kpi-label">Total Stock Value</span>
                    <span className="dairy-kpi-value">₹3,84,200</span>
                    <span className="dairy-kpi-subtext">Current on-hand inventory</span>
                  </div>
                </div>
              </div>

              <div className="dairy-card">
                <div className="dairy-table-wrapper">
                  <table className="dairy-table">
                    <thead>
                      <tr>
                        <th>BATCH CODE</th>
                        <th>ITEM NAME</th>
                        <th>STORAGE BAY</th>
                        <th>SENSOR TEMP</th>
                        <th>ON-HAND QUANTITY</th>
                        <th>MFG TIMESTAMP</th>
                        <th>USE BY DATE</th>
                        <th>QUALITY STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventoryData.map((inv, idx) => (
                        <tr key={idx}>
                          <td className="dairy-order-id">{inv.batch}</td>
                          <td className="dairy-customer-name">{inv.item}</td>
                          <td>{inv.location}</td>
                          <td style={{ fontWeight: 700, color: '#0369a1' }}>{inv.temp}</td>
                          <td style={{ fontWeight: 700 }}>{inv.qty}</td>
                          <td style={{ fontSize: '12px', color: '#64748b' }}>{inv.mfg}</td>
                          <td style={{ fontSize: '12px', color: '#ef4444', fontWeight: 600 }}>{inv.exp}</td>
                          <td>
                            <span className={`dairy-badge ${inv.audit.includes('Passed') ? 'active' : 'low'}`}>
                              {inv.audit}
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

          {/* TAB 7: SUBSCRIPTIONS */}
          {activeTab === 'subscriptions' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="dairy-section-header">
                <div className="dairy-section-title-wrap">
                  <h1>Daily Morning &amp; Evening Milk Subscriptions</h1>
                  <p>Automated recurring schedules, customer preferences, and delivery pause rules.</p>
                </div>
                <div className="dairy-section-actions">
                  <button className="dairy-btn-primary"><Plus size={16} /> New Subscription</button>
                </div>
              </div>

              <div className="dairy-kpi-grid">
                <div className="dairy-kpi-card">
                  <div className="dairy-kpi-icon-box green"><RefreshCw size={22} /></div>
                  <div className="dairy-kpi-info">
                    <span className="dairy-kpi-label">Morning Drops</span>
                    <span className="dairy-kpi-value">1,120</span>
                    <span className="dairy-kpi-growth">5:00 - 7:30 AM</span>
                  </div>
                </div>
                <div className="dairy-kpi-card">
                  <div className="dairy-kpi-icon-box blue"><RefreshCw size={22} /></div>
                  <div className="dairy-kpi-info">
                    <span className="dairy-kpi-label">Evening Drops</span>
                    <span className="dairy-kpi-value">306</span>
                    <span className="dairy-kpi-growth">5:30 - 7:30 PM</span>
                  </div>
                </div>
                <div className="dairy-kpi-card">
                  <div className="dairy-kpi-icon-box amber"><Clock size={22} /></div>
                  <div className="dairy-kpi-info">
                    <span className="dairy-kpi-label">Paused Today</span>
                    <span className="dairy-kpi-value">24</span>
                    <span className="dairy-kpi-subtext">Customer vacation hold</span>
                  </div>
                </div>
                <div className="dairy-kpi-card">
                  <div className="dairy-kpi-icon-box purple"><DollarSign size={22} /></div>
                  <div className="dairy-kpi-info">
                    <span className="dairy-kpi-label">Monthly MRR</span>
                    <span className="dairy-kpi-value">₹8,92,400</span>
                    <span className="dairy-kpi-growth">↑ 12% recurring</span>
                  </div>
                </div>
              </div>

              <div className="dairy-card">
                <div className="dairy-table-wrapper">
                  <table className="dairy-table">
                    <thead>
                      <tr>
                        <th>SUB ID</th>
                        <th>SUBSCRIBER</th>
                        <th>ROUTE CLUSTER</th>
                        <th>PLAN DETAILS</th>
                        <th>PREFERRED TIME SLOT</th>
                        <th>MONTHLY VALUE</th>
                        <th>STATUS</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscriptionsData.map((s) => (
                        <tr key={s.id}>
                          <td className="dairy-order-id">{s.id}</td>
                          <td className="dairy-customer-name">{s.customer}</td>
                          <td>{s.route}</td>
                          <td style={{ fontWeight: 600 }}>{s.plan}</td>
                          <td style={{ fontSize: '12px', color: '#64748b' }}>{s.slot}</td>
                          <td className="dairy-amount-text">{s.monthly}</td>
                          <td>
                            <span className={`dairy-badge ${s.status === 'Active' ? 'active' : 'paused'}`}>
                              {s.status}
                            </span>
                          </td>
                          <td>
                            <button className="dairy-table-action-btn">Pause / Modify</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: DELIVERY MANAGEMENT */}
          {activeTab === 'delivery' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="dairy-section-header">
                <div className="dairy-section-title-wrap">
                  <h1>Fleet Logistics &amp; Delivery Route Tracking</h1>
                  <p>Real-time vehicle dispatches, morning route completion, and delivery agent tracking.</p>
                </div>
                <div className="dairy-section-actions">
                  <button className="dairy-btn-primary"><Plus size={16} /> Assign Route</button>
                </div>
              </div>

              <div className="dairy-card">
                <div className="dairy-table-wrapper">
                  <table className="dairy-table">
                    <thead>
                      <tr>
                        <th>ROUTE CODE</th>
                        <th>DELIVERY AGENT</th>
                        <th>CONTACT PHONE</th>
                        <th>ASSIGNED VEHICLE</th>
                        <th>TOTAL STOPS</th>
                        <th>COMPLETED DROPS</th>
                        <th>LIVE STATUS</th>
                        <th>ESTIMATED FINISH</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deliveryData.map((d, i) => (
                        <tr key={i}>
                          <td className="dairy-order-id">{d.route}</td>
                          <td className="dairy-customer-name">{d.agent}</td>
                          <td style={{ fontSize: '12.5px', color: '#64748b' }}>{d.phone}</td>
                          <td>{d.vehicle}</td>
                          <td style={{ fontWeight: 600 }}>{d.stops}</td>
                          <td style={{ fontWeight: 700, color: '#16a34a' }}>{d.completed}</td>
                          <td>
                            <span className={`dairy-badge ${d.status === 'Completed' ? 'active' : 'transit'}`}>
                              {d.status}
                            </span>
                          </td>
                          <td style={{ fontWeight: 600 }}>{d.eta}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: OFFERS & COUPONS */}
          {activeTab === 'offers' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="dairy-section-header">
                <div className="dairy-section-title-wrap">
                  <h1>Promotional Offers &amp; Subscriber Coupons</h1>
                  <p>Discounts, cashback codes, and seasonal festive dairy promotions.</p>
                </div>
                <div className="dairy-section-actions">
                  <button className="dairy-btn-primary"><Plus size={16} /> Create Coupon</button>
                </div>
              </div>

              <div className="dairy-card">
                <div className="dairy-table-wrapper">
                  <table className="dairy-table">
                    <thead>
                      <tr>
                        <th>PROMO CODE</th>
                        <th>DESCRIPTION</th>
                        <th>DISCOUNT VALUE</th>
                        <th>MIN ORDER VALUE</th>
                        <th>EXPIRATION DATE</th>
                        <th>TOTAL REDEMPTIONS</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {offersData.map((off, i) => (
                        <tr key={i}>
                          <td className="dairy-order-id" style={{ fontSize: '13.5px', letterSpacing: '0.5px' }}>{off.code}</td>
                          <td style={{ maxWidth: '280px' }}>{off.desc}</td>
                          <td style={{ fontWeight: 700, color: '#059669' }}>{off.discount}</td>
                          <td>{off.minOrder}</td>
                          <td style={{ fontSize: '12px', color: '#64748b' }}>{off.validTill}</td>
                          <td style={{ fontWeight: 600 }}>{off.used} times</td>
                          <td><span className="dairy-badge active">{off.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: PAYMENTS & INVOICES (User specifically clicked in screenshot!) */}
          {activeTab === 'payments' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="dairy-section-header">
                <div className="dairy-section-title-wrap">
                  <h1>Payments, Invoices &amp; Daily Settlements</h1>
                  <p>Real-time gateway settlements, UPI reconciliations, and cash on delivery tracking.</p>
                </div>
                <div className="dairy-section-actions">
                  <button className="dairy-btn-secondary"><Download size={15} /> Download Statement</button>
                  <button className="dairy-btn-primary"><DollarSign size={16} /> Settle Payouts</button>
                </div>
              </div>

              <div className="dairy-kpi-grid">
                <div className="dairy-kpi-card">
                  <div className="dairy-kpi-icon-box green">
                    <span style={{ fontSize: '22px', fontWeight: 800 }}>₹</span>
                  </div>
                  <div className="dairy-kpi-info">
                    <span className="dairy-kpi-label">Today Collected</span>
                    <span className="dairy-kpi-value">₹18,460</span>
                    <span className="dairy-kpi-growth">↑ 14% vs yesterday</span>
                  </div>
                </div>

                <div className="dairy-kpi-card">
                  <div className="dairy-kpi-icon-box blue"><CreditCard size={22} /></div>
                  <div className="dairy-kpi-info">
                    <span className="dairy-kpi-label">UPI &amp; Online</span>
                    <span className="dairy-kpi-value">₹14,240</span>
                    <span className="dairy-kpi-growth">77% of collections</span>
                  </div>
                </div>

                <div className="dairy-kpi-card">
                  <div className="dairy-kpi-icon-box amber"><DollarSign size={22} /></div>
                  <div className="dairy-kpi-info">
                    <span className="dairy-kpi-label">Cash on Delivery</span>
                    <span className="dairy-kpi-value">₹4,220</span>
                    <span className="dairy-kpi-subtext">Route agents holding</span>
                  </div>
                </div>

                <div className="dairy-kpi-card">
                  <div className="dairy-kpi-icon-box purple"><ShieldCheck size={22} /></div>
                  <div className="dairy-kpi-info">
                    <span className="dairy-kpi-label">Pending Settlements</span>
                    <span className="dairy-kpi-value">₹0.00</span>
                    <span className="dairy-kpi-growth">● 100% Reconciled</span>
                  </div>
                </div>
              </div>

              <div className="dairy-card">
                <div className="dairy-card-header">
                  <div className="dairy-card-title-group">
                    <CreditCard size={20} className="dairy-card-icon" />
                    <div>
                      <h2 className="dairy-card-h2">Recent Transactions &amp; Receipts</h2>
                      <p className="dairy-card-sub">Instant payment logging for orders and wallet top-ups</p>
                    </div>
                  </div>
                </div>

                <div className="dairy-table-wrapper">
                  <table className="dairy-table">
                    <thead>
                      <tr>
                        <th>TXN ID</th>
                        <th>ORDER REF</th>
                        <th>CUSTOMER</th>
                        <th>PAYMENT METHOD</th>
                        <th>TRANSACTION AMOUNT</th>
                        <th>PAYMENT STATUS</th>
                        <th>TIMESTAMP</th>
                        <th>RECEIPT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentsData.map((txn) => (
                        <tr key={txn.id}>
                          <td className="dairy-order-id">{txn.id}</td>
                          <td style={{ fontWeight: 600, color: '#0f172a' }}>{txn.orderId}</td>
                          <td className="dairy-customer-name">{txn.customer}</td>
                          <td>
                            <span className="dairy-operational-pill" style={{ color: '#0f172a', borderColor: '#e2e8f0', background: '#f8fafc' }}>
                              {txn.mode}
                            </span>
                          </td>
                          <td className="dairy-amount-text">{txn.amount}</td>
                          <td>
                            <span className={`dairy-badge ${txn.statusType}`}>
                              {txn.status}
                            </span>
                          </td>
                          <td className="dairy-order-date">{txn.date}</td>
                          <td>
                            <button className="dairy-table-action-btn" title="Download invoice receipt">
                              <Download size={13} style={{ display: 'inline', marginRight: '4px' }} />
                              Invoice
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: REPORTS & ANALYTICS */}
          {activeTab === 'analytics' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="dairy-section-header">
                <div className="dairy-section-title-wrap">
                  <h1>Milk Procurement &amp; Yield Analytics</h1>
                  <p>Daily dairy collection volume, fat/SNF testing benchmarks, and wastage audits.</p>
                </div>
              </div>

              <div className="dairy-kpi-grid">
                <div className="dairy-kpi-card">
                  <div className="dairy-kpi-icon-box green"><MilkBottleIcon /></div>
                  <div className="dairy-kpi-info">
                    <span className="dairy-kpi-label">Daily Procurement</span>
                    <span className="dairy-kpi-value">2,450 L</span>
                    <span className="dairy-kpi-growth">● 100% farm tested</span>
                  </div>
                </div>
                <div className="dairy-kpi-card">
                  <div className="dairy-kpi-icon-box blue"><TrendingUp size={22} /></div>
                  <div className="dairy-kpi-info">
                    <span className="dairy-kpi-label">Avg Realization / L</span>
                    <span className="dairy-kpi-value">₹54.80</span>
                    <span className="dairy-kpi-growth">↑ 4.2% margin</span>
                  </div>
                </div>
                <div className="dairy-kpi-card">
                  <div className="dairy-kpi-icon-box amber"><AlertTriangle size={22} /></div>
                  <div className="dairy-kpi-info">
                    <span className="dairy-kpi-label">Handling Spoilage</span>
                    <span className="dairy-kpi-value">0.42%</span>
                    <span className="dairy-kpi-growth">Well under 1% limit</span>
                  </div>
                </div>
                <div className="dairy-kpi-card">
                  <div className="dairy-kpi-icon-box purple"><Award size={22} /></div>
                  <div className="dairy-kpi-info">
                    <span className="dairy-kpi-label">Top Demand Area</span>
                    <span className="dairy-kpi-value">Whitefield</span>
                    <span className="dairy-kpi-subtext">680 L daily consumption</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 12: USERS & ROLES */}
          {activeTab === 'roles' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="dairy-section-header">
                <div className="dairy-section-title-wrap">
                  <h1>Staff Access &amp; Role-Based Permissions</h1>
                  <p>Configure role assignments for dairy managers, dispatchers, and route drivers.</p>
                </div>
                <div className="dairy-section-actions">
                  <button className="dairy-btn-primary"><Plus size={16} /> Add Staff User</button>
                </div>
              </div>

              <div className="dairy-card">
                <div className="dairy-table-wrapper">
                  <table className="dairy-table">
                    <thead>
                      <tr>
                        <th>STAFF MEMBER</th>
                        <th>EMAIL</th>
                        <th>ASSIGNED ROLE</th>
                        <th>MODULE ACCESS</th>
                        <th>STATUS</th>
                        <th>LAST ACTIVE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'Admin (You)', email: 'admin@madhurdairy.com', role: 'Full Superadmin', access: 'All 13 Modules', status: 'Active', active: 'Just now' },
                        { name: 'Ramesh Shenoy', email: 'ramesh@madhurdairy.com', role: 'Plant & Cold Storage Head', access: 'Inventory & Procurement', status: 'Active', active: '10 mins ago' },
                        { name: 'Mahesh Patil', email: 'mahesh@madhurdairy.com', role: 'Logistics Supervisor', access: 'Delivery & Orders', status: 'Active', active: '1 hour ago' },
                        { name: 'Pooja Hegde', email: 'pooja@madhurdairy.com', role: 'Billing Executive', access: 'Payments & Subscriptions', status: 'Active', active: 'Today 9:00 AM' },
                      ].map((u, i) => (
                        <tr key={i}>
                          <td className="dairy-customer-name">{u.name}</td>
                          <td style={{ fontSize: '12.5px', color: '#64748b' }}>{u.email}</td>
                          <td><span className="dairy-operational-pill">{u.role}</span></td>
                          <td>{u.access}</td>
                          <td><span className="dairy-badge active">{u.status}</span></td>
                          <td className="dairy-order-date">{u.active}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 13: SETTINGS */}
          {activeTab === 'settings' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '800px' }}>
              <div className="dairy-section-header">
                <div className="dairy-section-title-wrap">
                  <h1>Dairy Enterprise Configuration</h1>
                  <p>Operating parameters, delivery time windows, and FSSAI credentials.</p>
                </div>
              </div>

              <div className="dairy-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Dairy Enterprise Name</label>
                    <input type="text" readOnly value="Madhur Dairy (Speshway Natural Milk)" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '14px' }} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>FSSAI Central License No.</label>
                      <input type="text" readOnly value="10023044001928" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '14px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>GSTIN Registration</label>
                      <input type="text" readOnly value="07AABCM8291Q1ZP" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '14px' }} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Morning Delivery Slot</label>
                      <input type="text" readOnly value="5:00 AM - 8:00 AM" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '14px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Evening Delivery Slot</label>
                      <input type="text" readOnly value="5:30 PM - 8:00 PM" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '14px' }} />
                    </div>
                  </div>

                  <div style={{ paddingTop: '10px' }}>
                    <button className="dairy-btn-primary" onClick={() => alert('Settings saved successfully!')}>Save Changes</button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};
