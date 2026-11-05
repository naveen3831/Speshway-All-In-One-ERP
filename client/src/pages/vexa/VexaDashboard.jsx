import React, { useState } from 'react';
import {
  useNavigate,
  Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Target,
  Users,
  Truck,
  Box,
  ShoppingCart,
  ShoppingBag,
  Factory,
  Shirt,
  Receipt,
  BookOpen,
  IdCard,
  CalendarCheck,
  LogOut,
  Bell,
  Menu,
  ChevronDown,
  TrendingUp,
  Search,
  Plus,
  ArrowRight,
  Filter,
  CheckCircle,
  Clock,
  Package,
  Calendar,
  DollarSign,
  AlertCircle,
  Download,
  Check,
} from 'lucide-react';
import './VexaDashboard.css';

export const VexaDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [timeframe, setTimeframe] = useState('30days');
  const [searchQuery, setSearchQuery] = useState('');

  // 4 KPI Stats matching the screenshot exactly
  const kpiStats = [
    {
      id: 'orders',
      label: 'Total Orders',
      value: '79',
      trend: '12%',
      isPositive: true,
      icon: ShoppingCart,
      sparkPoints: '0,22 15,18 30,24 45,14 60,19 75,8 90,14 100,5',
      fillPoints: '0,22 15,18 30,24 45,14 60,19 75,8 90,14 100,5 100,28 0,28',
    },
    {
      id: 'customers',
      label: 'Total Customers',
      value: '4',
      trend: '8%',
      isPositive: true,
      icon: Users,
      sparkPoints: '0,25 20,20 40,22 60,12 80,16 100,6',
      fillPoints: '0,25 20,20 40,22 60,12 80,16 100,6 100,28 0,28',
    },
    {
      id: 'revenue',
      label: 'Total Revenue',
      value: '₹1,59,583.92',
      trend: '14%',
      isPositive: true,
      icon: () => <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>₹</span>,
      sparkPoints: '0,24 20,19 40,23 60,13 80,18 100,8',
      fillPoints: '0,24 20,19 40,23 60,13 80,18 100,8 100,28 0,28',
    },
    {
      id: 'products',
      label: 'Total Products',
      value: '4',
      trend: '0%',
      isPositive: true,
      icon: Box,
      sparkPoints: '0,25 25,23 50,22 75,18 100,10',
      fillPoints: '0,25 25,23 50,22 75,18 100,10 100,28 0,28',
    },
  ];

  // Dual Line Spline Data points matching the uploaded chart
  const salesSplinePoints = 'M 0 160 C 20 130, 40 120, 60 128 C 80 135, 100 120, 120 115 C 150 110, 170 130, 190 120 C 210 110, 230 60, 250 60 C 270 60, 290 85, 310 82 C 340 80, 360 95, 380 98';
  const salesAreaPoints = `${salesSplinePoints} L 380 180 L 0 180 Z`;

  const ordersSplinePoints = 'M 0 170 C 25 155, 50 148, 75 150 C 100 152, 125 135, 150 130 C 180 125, 205 145, 230 115 C 245 95, 260 90, 275 105 C 300 128, 330 135, 360 140 L 380 145';
  const ordersAreaPoints = `${ordersSplinePoints} L 380 180 L 0 180 Z`;

  // Recent Orders matching exact screenshot
  const [orders] = useState([
    {
      id: '#VXA-1025',
      date: 'Oct 27, 2026',
      item: 'Classic Heavyweight Tee',
      color: 'Jet Black',
      status: 'Delivered',
      statusClass: 'delivered',
      price: '₹1,999',
      customer: 'Rohan Sharma',
      payment: 'UPI',
      thumbType: 'tee-black',
    },
    {
      id: '#VXA-1024',
      date: 'Oct 26, 2026',
      item: 'Oversized Fleece Hoodie',
      color: 'Warm Beige',
      status: 'Shipped',
      statusClass: 'shipped',
      price: '₹2,499',
      customer: 'Ananya Roy',
      payment: 'Credit Card',
      thumbType: 'hoodie-beige',
    },
    {
      id: '#VXA-1023',
      date: 'Oct 25, 2026',
      item: 'Signature Embroidered Pullover',
      color: 'Maroon',
      status: 'Processing',
      statusClass: 'processing',
      price: '₹1,799',
      customer: 'Varun Verma',
      payment: 'COD',
      thumbType: 'hoodie-maroon',
    },
  ]);

  // 13 SIDEBAR MENU ITEMS EXACTLY MATCHING USER SCREENSHOT
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'crm-leads', label: 'CRM / Leads', icon: Target },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'vendors', label: 'Vendors', icon: Truck },
    { id: 'inventory', label: 'Inventory', icon: Box },
    { id: 'sales', label: 'Sales', icon: ShoppingCart },
    { id: 'purchase', label: 'Purchase', icon: ShoppingBag },
    { id: 'production', label: 'Production', icon: Factory },
    { id: 'garment-styles', label: 'Garment Styles', icon: Shirt },
    { id: 'expenses', label: 'Expenses', icon: Receipt },
    { id: 'accounts', label: 'Accounts', icon: BookOpen },
    { id: 'employees', label: 'Employees', icon: IdCard },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
  ];

  // 1. CRM / Leads Data
  const [leadsList] = useState([
    { id: 'LD-2041', name: 'Urban Edge Fashion', contact: 'Karan Mehra', style: 'Oversized Cotton Tees', qty: '500 pcs', value: '₹2,50,000', stage: 'Samples Dispatched', stageClass: 'shipped', rep: 'Priya Sharma' },
    { id: 'LD-2040', name: 'StyleCraft Boutiques', contact: 'Ritika Sen', style: 'Heavyweight Fleece Hoodies', qty: '1,200 pcs', value: '₹6,80,000', stage: 'In Negotiation', stageClass: 'processing', rep: 'Arjun Mehta' },
    { id: 'LD-2039', name: 'Westside Retailers', contact: 'Alok Gupta', style: 'Denim Cargo Chinos', qty: '300 pcs', value: '₹1,95,000', stage: 'Won', stageClass: 'delivered', rep: 'Priya Sharma' },
    { id: 'LD-2038', name: 'Kora Linen Studios', contact: 'Sunil Rao', style: 'Linen Resort Shirts', qty: '800 pcs', value: '₹4,20,000', stage: 'New Inquiry', stageClass: 'indigo', rep: 'Vikram Kapur' },
    { id: 'LD-2037', name: 'Nomad Wear Co.', contact: 'Tanvi Shah', style: 'Drop-shoulder Sweats', qty: '450 pcs', value: '₹2,70,000', stage: 'Samples Dispatched', stageClass: 'shipped', rep: 'Arjun Mehta' },
  ]);

  // 2. Customers Data
  const [customersList] = useState([
    { id: 'CST-101', name: 'Rohan Sharma', email: 'rohan.s@gmail.com', phone: '+91 98201 99221', segment: 'Wholesale Distributor', orders: 34, spent: '₹68,490', status: 'Active' },
    { id: 'CST-102', name: 'Ananya Roy', email: 'ananya.roy@yahoo.com', phone: '+91 98310 44210', segment: 'E-Commerce Boutique', orders: 28, spent: '₹52,240', status: 'Active' },
    { id: 'CST-103', name: 'Varun Verma', email: 'varun.v@outlook.com', phone: '+91 99880 12340', segment: 'Independent Retailer', orders: 12, spent: '₹24,800', status: 'Active' },
    { id: 'CST-104', name: 'Sneha Patel', email: 'sneha.p@gmail.com', phone: '+91 97230 88129', segment: 'Brand Partner', orders: 5, spent: '₹14,054', status: 'Active' },
  ]);

  // 3. Vendors Data
  const [vendorsList] = useState([
    { id: 'VND-01', name: 'Surat Textile Mills', category: 'Raw Fabrics (French Terry / Jersey)', contact: 'Dinesh Patel (Surat)', phone: '+91 98250 11900', openOrders: 2, balance: '₹1,24,000', status: 'Verified' },
    { id: 'VND-02', name: 'YKK Fasteners India', category: 'Zippers & Metal Pullers', contact: 'Anil Mehta (Mumbai)', phone: '+91 98200 44320', openOrders: 1, balance: '₹38,500', status: 'Verified' },
    { id: 'VND-03', name: 'Apex Thread Corp', category: 'Sewing Threads & Spun Poly', contact: 'K. Ramesh (Coimbatore)', phone: '+91 94430 88210', openOrders: 3, balance: '₹62,000', status: 'Verified' },
    { id: 'VND-04', name: 'LoomKraft Cottons', category: '100% Organic Combed Cotton', contact: 'Deepak Rao (Tirupur)', phone: '+91 98420 55100', openOrders: 1, balance: '₹95,000', status: 'Verified' },
    { id: 'VND-05', name: 'Indigo Dye Works', category: 'Reactive Dyes & Pigments', contact: 'S. Banerjee (Kolkata)', phone: '+91 98300 77310', openOrders: 0, balance: '₹25,500', status: 'Verified' },
  ]);

  // 4. Inventory Data
  const [inventoryList] = useState([
    { sku: 'VXA-SKU-01', item: 'Classic Heavyweight Tee (Black - 240 GSM)', category: 'Finished Garment', stockBreakdown: 'S: 12, M: 16, L: 14, XL: 6', totalQty: '48 units', threshold: '10 units', status: 'Optimal', statusClass: 'delivered' },
    { sku: 'VXA-SKU-02', item: 'Oversized Fleece Hoodie (Beige - 380 GSM)', category: 'Finished Garment', stockBreakdown: 'M: 10, L: 12, XL: 4', totalQty: '26 units', threshold: '10 units', status: 'Optimal', statusClass: 'delivered' },
    { sku: 'VXA-SKU-03', item: 'Signature Embroidered Pullover (Maroon)', category: 'Finished Garment', stockBreakdown: 'S: 4, M: 6, L: 5', totalQty: '15 units', threshold: '12 units', status: 'Low Stock', statusClass: 'processing' },
    { sku: 'VXA-SKU-04', item: 'Relaxed Fit Cargo Chinos (Olive)', category: 'Finished Garment', stockBreakdown: '30: 8, 32: 12, 34: 12', totalQty: '32 units', threshold: '10 units', status: 'Optimal', statusClass: 'delivered' },
    { sku: 'VXA-SKU-05', item: 'French Terry Knit Fabric Roll (Navy 340 GSM)', category: 'Raw Fabric', stockBreakdown: '18 Rolls @ 100m each', totalQty: '1,800 m', threshold: '5 rolls', status: 'In Stock', statusClass: 'delivered' },
  ]);

  // 5. Sales Orders Data
  const [salesList] = useState([
    { orderId: '#VXA-1025', customer: 'Rohan Sharma', item: 'Classic Heavyweight Tee (Black)', qty: 1, date: 'Oct 27, 2026', amount: '₹1,999', payment: 'Paid (Online)', status: 'Delivered', statusClass: 'delivered' },
    { orderId: '#VXA-1024', customer: 'Ananya Roy', item: 'Oversized Fleece Hoodie (Beige)', qty: 1, date: 'Oct 26, 2026', amount: '₹2,499', payment: 'Paid (Card)', status: 'Shipped', statusClass: 'shipped' },
    { orderId: '#VXA-1023', customer: 'Varun Verma', item: 'Signature Embroidered Pullover (Maroon)', qty: 1, date: 'Oct 25, 2026', amount: '₹1,799', payment: 'COD (Pending)', status: 'Processing', statusClass: 'processing' },
    { orderId: '#VXA-1022', customer: 'StyleStreet Retail', item: 'Bulk Wholesale: Chinos & Tees', qty: 20, date: 'Oct 24, 2026', amount: '₹42,000', payment: 'Paid (Bank Transfer)', status: 'Delivered', statusClass: 'delivered' },
    { orderId: '#VXA-1021', customer: 'Sneha Patel', item: 'Classic Heavyweight Tee (x2)', qty: 2, date: 'Oct 23, 2026', amount: '₹3,998', payment: 'Paid (UPI)', status: 'Delivered', statusClass: 'delivered' },
  ]);

  // 6. Purchase Orders Data
  const [purchaseList] = useState([
    { poNumber: 'PO-2026-088', vendor: 'Surat Textile Mills', items: 'French Terry Knit Fabric (400 meters)', date: 'Oct 24, 2026', amount: '₹1,60,000', dueDate: 'Nov 02, 2026', status: 'In Transit', statusClass: 'shipped' },
    { poNumber: 'PO-2026-087', vendor: 'YKK Fasteners India', items: 'Brass Metal Zippers #5 (1,200 pcs)', date: 'Oct 22, 2026', amount: '₹42,000', dueDate: 'Oct 28, 2026', status: 'Delivered', statusClass: 'delivered' },
    { poNumber: 'PO-2026-086', vendor: 'Apex Thread Corp', items: 'High-Tenacity Poly Threads (120 cones)', date: 'Oct 18, 2026', amount: '₹18,500', dueDate: 'Oct 24, 2026', status: 'Delivered', statusClass: 'delivered' },
    { poNumber: 'PO-2026-085', vendor: 'LoomKraft Cottons', items: 'Combed Cotton Yarn 240 GSM (600 kg)', date: 'Oct 15, 2026', amount: '₹1,95,000', dueDate: 'Oct 22, 2026', status: 'Delivered', statusClass: 'delivered' },
    { poNumber: 'PO-2026-084', vendor: 'Indigo Dye Works', items: 'Specialized Navy & Olive Pigment Dyes', date: 'Oct 10, 2026', amount: '₹35,000', dueDate: 'Oct 16, 2026', status: 'Delivered', statusClass: 'delivered' },
  ]);

  // 7. Production Workflows Data
  const [productionList] = useState([
    { jobCard: 'BATCH-PRD-401', style: 'Oversized Fleece Hoodie (Beige)', targetQty: 600, completedQty: 420, stage: 'Stitching Line B', percent: 70, master: 'Master Rafiq', status: 'On Schedule', statusClass: 'delivered' },
    { jobCard: 'BATCH-PRD-402', style: 'Classic Heavyweight Tee (Black)', targetQty: 1000, completedQty: 850, stage: 'Cutting Section', percent: 85, master: 'Master Gurmeet', status: 'In Progress', statusClass: 'shipped' },
    { jobCard: 'BATCH-PRD-403', style: 'Relaxed Fit Cargo Chinos (Olive)', targetQty: 400, completedQty: 380, stage: 'Quality Inspection (QC)', percent: 95, master: 'Master Devendra', status: 'QC Pending', statusClass: 'processing' },
    { jobCard: 'BATCH-PRD-404', style: 'Signature Embroidered Pullover', targetQty: 500, completedQty: 500, stage: 'Ironing & Packaging', percent: 100, master: 'Master Rafiq', status: 'Ready To Ship', statusClass: 'delivered' },
  ]);

  // 8. Garment Styles / Tech Packs Data
  const [garmentStylesList] = useState([
    { code: 'VXA-STY-01', name: 'Classic Heavyweight Tee', category: 'T-Shirts', fabric: '100% Combed Compact Cotton (240 GSM)', cost: '₹620', wholesale: '₹1,150', mrp: '₹1,999', status: 'Active' },
    { code: 'VXA-STY-02', name: 'Oversized Fleece Hoodie', category: 'Hoodies', fabric: 'Cotton-Poly Brushed Fleece (380 GSM)', cost: '₹890', wholesale: '₹1,650', mrp: '₹2,499', status: 'Active' },
    { code: 'VXA-STY-03', name: 'Signature Embroidered Pullover', category: 'Sweatshirts', fabric: 'French Terry Loopback (320 GSM)', cost: '₹580', wholesale: '₹1,100', mrp: '₹1,799', status: 'Active' },
    { code: 'VXA-STY-04', name: 'Relaxed Fit Cargo Chinos', category: 'Bottoms', fabric: 'Cotton Twill Stretch (260 GSM)', cost: '₹980', wholesale: '₹1,750', mrp: '₹2,899', status: 'Active' },
    { code: 'VXA-STY-05', name: 'Minimalist Waffle Knit Crew', category: 'Knitwear', fabric: 'Waffle Thermal Knit (280 GSM)', cost: '₹710', wholesale: '₹1,300', mrp: '₹2,199', status: 'Active' },
  ]);

  // 9. Expenses Data
  const [expensesList] = useState([
    { expId: 'EXP-841', date: 'Oct 27, 2026', category: 'Machinery Maintenance', description: 'Juki 4-Thread Overlock Servicing & Needle Spares', amount: '₹14,200', mode: 'Company NetBanking', status: 'Approved' },
    { expId: 'EXP-840', date: 'Oct 25, 2026', category: 'Electricity & Utilities', description: 'Monthly Industrial Grid Electricity Bill', amount: '₹38,500', mode: 'Direct Transfer', status: 'Approved' },
    { expId: 'EXP-839', date: 'Oct 22, 2026', category: 'Packaging Materials', description: '5-Ply Custom VEXA Corrugated Boxes (1,000 pcs)', amount: '₹28,000', mode: 'UPI / Card', status: 'Approved' },
    { expId: 'EXP-838', date: 'Oct 20, 2026', category: 'Freight & Logistics', description: 'Bluedart & Delhivery Air Freight Consignments', amount: '₹24,500', mode: 'Vendor Account', status: 'Approved' },
    { expId: 'EXP-837', date: 'Oct 18, 2026', category: 'Sewing Threads & Trims', description: 'High-grade Gutermann Spool Packs', amount: '₹12,800', mode: 'Petty Cash', status: 'Approved' },
  ]);

  // 10. Accounts & Ledger Data
  const [ledgerEntries] = useState([
    { head: 'Sales Revenue (E-Commerce + Wholesale)', debit: '₹0', credit: '₹7,85,000', balance: '+₹7,85,000 Cr', status: 'Reconciled' },
    { head: 'Cost of Goods Sold (Raw Fabrics & Dyes)', debit: '₹3,45,000', credit: '₹0', balance: '-₹3,45,000 Dr', status: 'Reconciled' },
    { head: 'Direct Labor & Tailoring Wages', debit: '₹1,85,000', credit: '₹0', balance: '-₹1,85,000 Dr', status: 'Reconciled' },
    { head: 'Factory Overheads & Rent', debit: '₹92,000', credit: '₹0', balance: '-₹92,000 Dr', status: 'Reconciled' },
    { head: 'Courier & Fulfillment Costs', debit: '₹34,200', credit: '₹0', balance: '-₹34,200 Dr', status: 'Reconciled' },
  ]);

  // 11. Employees Data
  const [employeesList] = useState([
    { empId: 'VXA-EMP-001', name: 'Master Rafiq Ahmed', dept: 'Pattern Making & CAD', role: 'Head Pattern Master', shift: 'Morning Shift (8:00 AM - 5:00 PM)', phone: '+91 98450 11200', status: 'Active' },
    { empId: 'VXA-EMP-002', name: 'Priya Sharma', dept: 'Merchandising & Sales', role: 'Senior Merchandiser', shift: 'General (9:30 AM - 6:30 PM)', phone: '+91 98720 33410', status: 'Active' },
    { empId: 'VXA-EMP-003', name: 'Gurmeet Singh', dept: 'Cutting & Spreading', role: 'Chief Cutter', shift: 'Morning Shift (8:00 AM - 5:00 PM)', phone: '+91 99100 44520', status: 'Active' },
    { empId: 'VXA-EMP-004', name: 'Devendra Joshi', dept: 'Production Floor', role: 'Floor Production Head', shift: 'Full Day (8:00 AM - 6:00 PM)', phone: '+91 98230 66730', status: 'Active' },
    { empId: 'VXA-EMP-005', name: 'Anjali Nair', dept: 'Quality Assurance (QC)', role: 'Lead QC Inspector', shift: 'Morning Shift (8:30 AM - 5:30 PM)', phone: '+91 97110 88940', status: 'Active' },
  ]);

  // 12. Attendance Data
  const [attendanceList] = useState([
    { empId: 'VXA-EMP-001', name: 'Master Rafiq Ahmed', dept: 'Pattern CAD', inTime: '07:54 AM', outTime: '05:15 PM', ot: '0.5 hrs', status: 'Present', statusClass: 'delivered' },
    { empId: 'VXA-EMP-002', name: 'Priya Sharma', dept: 'Merchandising', inTime: '09:25 AM', outTime: '06:30 PM', ot: '0 hrs', status: 'Present', statusClass: 'delivered' },
    { empId: 'VXA-EMP-003', name: 'Gurmeet Singh', dept: 'Cutting', inTime: '08:02 AM', outTime: '06:30 PM (OT)', ot: '1.5 hrs', status: 'Overtime', statusClass: 'shipped' },
    { empId: 'VXA-EMP-004', name: 'Devendra Joshi', dept: 'Production Floor', inTime: '07:48 AM', outTime: '06:00 PM', ot: '1.0 hr', status: 'Present', statusClass: 'delivered' },
    { empId: 'VXA-EMP-005', name: 'Anjali Nair', dept: 'Quality (QC)', inTime: '08:31 AM', outTime: '05:35 PM', ot: '0 hrs', status: 'Present', statusClass: 'delivered' },
  ]);

  // Helper to render apparel SVG thumbnails
  const renderApparelThumb = (type) => {
    if (type === 'tee-black') {
      return (
        <svg viewBox="0 0 40 40" width="36" height="36">
          <path
            d="M 12 8 Q 20 14, 28 8 L 36 14 L 32 20 L 29 18 L 29 34 L 11 34 L 11 18 L 8 20 L 4 14 Z"
            fill="#1e293b"
            stroke="#0f172a"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="18" r="3" fill="#e2e8f0" opacity="0.4" />
        </svg>
      );
    }
    if (type === 'hoodie-beige') {
      return (
        <svg viewBox="0 0 40 40" width="36" height="36">
          <path
            d="M 12 8 Q 20 12, 28 8 L 36 14 L 32 21 L 29 18 L 29 34 L 11 34 L 11 18 L 8 21 L 4 14 Z"
            fill="#d6c5ad"
            stroke="#b8a78e"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M 15 25 L 25 25 L 24 31 L 16 31 Z" fill="#c4b299" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 40 40" width="36" height="36">
        <path
          d="M 12 8 Q 20 12, 28 8 L 36 14 L 32 21 L 29 18 L 29 34 L 11 34 L 11 18 L 8 21 L 4 14 Z"
          fill="#831843"
          stroke="#500724"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M 15 25 L 25 25 L 24 31 L 16 31 Z" fill="#701a3d" />
      </svg>
    );
  };

  return (
    <div className="vexa-erp-root">
      {/* 1. SIDEBAR MATCHING USER'S SCREENSHOT */}
      <aside className="vexa-sidebar">
        {/* Brand Header with Hanger Logo */}
        <div className="vexa-sidebar-header">
          <div className="vexa-brand-wrap">
            <div className="vexa-logo-hanger">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M 16 8 C 14 8, 13 9.5, 13 11 C 13 12.5, 14.5 13.5, 16 14 L 5 21 C 4 21.8, 4 23, 5.2 23 L 26.8 23 C 28 23, 28 21.8, 27 21 L 16 14 Z"
                  stroke="#10b981"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="16" cy="7" r="1.5" fill="#10b981" />
              </svg>
            </div>
            <div className="vexa-brand-text">
              <span className="vexa-brand-name">VEXA</span>
              <span className="vexa-brand-subtitle">Style Hub</span>
            </div>
          </div>

          <button className="vexa-hamburger-btn" title="Toggle Navigation">
            <Menu size={20} />
          </button>
        </div>

        {/* 13 Navigation Items Exactly As Requested */}
        <nav className="vexa-nav-list">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`vexa-nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={19} className="vexa-nav-icon" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer Logout (Sign Out button matching Image 2) */}
        <div className="vexa-sidebar-footer">
          <button
            onClick={() => navigate('/product/vexa-style-hub')}
            className="vexa-btn-logout-sidebar"
            title="Return to Product Page"
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE */}
      <div className="vexa-main-wrapper">
        {/* Topbar with Speshway Administrative Dashboard & Admin profile matching Image 2 */}
        <header className="vexa-topbar">
          <div className="vexa-topbar-left">
            <span className="vexa-topbar-title">Speshway Administrative Dashboard</span>
          </div>

          <div className="vexa-topbar-right">
            <button className="vexa-bell-btn" title="Notifications">
              <Bell size={18} />
              <span className="vexa-bell-badge">3</span>
            </button>

            <div className="vexa-admin-profile-badge">
              <div className="vexa-admin-avatar">AD</div>
              <div className="vexa-admin-meta">
                <span className="name">Speshway Administrator</span>
                <span className="email">admin@gmail.com</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="vexa-content">
          {/* TAB 1: DASHBOARD (EXACT SCREENSHOT REPLICA) */}
          {activeTab === 'dashboard' && (
            <>
              {/* Header */}
              <div className="vexa-page-header">
                <h1 className="vexa-heading">Dashboard</h1>
                <p className="vexa-subheading">Overview of your store performance</p>
              </div>

              {/* 4 Metric KPI Cards */}
              <div className="vexa-kpi-grid">
                {kpiStats.map((kpi) => {
                  const Icon = kpi.icon;
                  return (
                    <div
                      key={kpi.id}
                      className="vexa-kpi-card"
                      onClick={() => {
                        if (kpi.id === 'orders') setActiveTab('sales');
                        else if (kpi.id === 'customers') setActiveTab('customers');
                        else if (kpi.id === 'products') setActiveTab('garment-styles');
                        else if (kpi.id === 'revenue') setActiveTab('accounts');
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="vexa-kpi-top">
                        <div className="vexa-kpi-icon-wrap">
                          <Icon size={24} className="vexa-kpi-icon" />
                        </div>
                      </div>

                      <div className="vexa-kpi-label">{kpi.label}</div>
                      <div className="vexa-kpi-value">{kpi.value}</div>

                      <div className="vexa-kpi-bottom">
                        <div className="vexa-kpi-trend">
                          <TrendingUp size={16} />
                          <span>{kpi.trend}</span>
                        </div>

                        {/* Sparkline curve */}
                        <div className="vexa-sparkline-wrap">
                          <svg viewBox="0 0 100 28" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id={`sparkGrad-${kpi.id}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                              </linearGradient>
                            </defs>
                            <polygon points={kpi.fillPoints} fill={`url(#sparkGrad-${kpi.id})`} />
                            <polyline
                              points={kpi.sparkPoints}
                              fill="none"
                              stroke="#38bdf8"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Lower Section: 2 Columns (Sales Overview + Recent Orders) */}
              <div className="vexa-lower-grid">
                {/* Left: Sales Overview Chart */}
                <div className="vexa-chart-card">
                  <div className="vexa-card-header">
                    <div className="vexa-card-title-group">
                      <div className="vexa-chart-title-icon">
                        <span className="bar-icon-1" />
                        <span className="bar-icon-2" />
                        <span className="bar-icon-3" />
                      </div>
                      <h2 className="vexa-card-title">Sales Overview</h2>
                    </div>

                    <div className="vexa-dropdown-select-wrap">
                      <select
                        value={timeframe}
                        onChange={(e) => setTimeframe(e.target.value)}
                        className="vexa-select-dropdown"
                      >
                        <option value="30days">Last 30 Days</option>
                        <option value="7days">Last 7 Days</option>
                        <option value="90days">Last 90 Days</option>
                        <option value="year">This Year</option>
                      </select>
                      <ChevronDown size={14} className="vexa-select-chevron" />
                    </div>
                  </div>

                  {/* Chart Legend */}
                  <div className="vexa-chart-legend">
                    <div className="vexa-legend-item">
                      <span className="vexa-legend-dot sales" />
                      <span>Sales</span>
                    </div>
                    <div className="vexa-legend-item">
                      <span className="vexa-legend-dot orders" />
                      <span>Orders</span>
                    </div>
                  </div>

                  {/* Dual Series Spline Chart */}
                  <div className="vexa-svg-chart-container">
                    <div className="vexa-chart-y-axis">
                      <span>30k</span>
                      <span>20k</span>
                      <span>10k</span>
                      <span>0</span>
                    </div>

                    <div className="vexa-chart-svg-wrap">
                      <svg viewBox="0 0 380 180" className="vexa-spline-svg" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#1e40af" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#1e40af" stopOpacity="0.0" />
                          </linearGradient>
                          <linearGradient id="ordersGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.02" />
                          </linearGradient>
                        </defs>

                        {/* Horizontal Grid lines */}
                        <line x1="0" y1="1" x2="380" y2="1" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="0" y1="60" x2="380" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="0" y1="120" x2="380" y2="120" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="0" y1="180" x2="380" y2="180" stroke="#e2e8f0" strokeWidth="1" />

                        {/* Orders Filled Area & Stroke */}
                        <path d={ordersAreaPoints} fill="url(#ordersGrad)" />
                        <path
                          d={ordersSplinePoints}
                          fill="none"
                          stroke="#93c5fd"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                        />

                        {/* Sales Filled Area & Stroke */}
                        <path d={salesAreaPoints} fill="url(#salesGrad)" />
                        <path
                          d={salesSplinePoints}
                          fill="none"
                          stroke="#1d4ed8"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                        />
                      </svg>

                      {/* X-Axis Day Numbers */}
                      <div className="vexa-chart-x-axis">
                        <span>1</span>
                        <span>5</span>
                        <span>10</span>
                        <span>15</span>
                        <span>20</span>
                        <span>25</span>
                        <span>30</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Recent Orders List */}
                <div className="vexa-orders-card">
                  <div className="vexa-card-header">
                    <div className="vexa-card-title-group">
                      <Box size={20} className="vexa-box-icon" />
                      <h2 className="vexa-card-title">Recent Orders</h2>
                    </div>

                    <button
                      onClick={() => setActiveTab('sales')}
                      className="vexa-view-all-link"
                    >
                      View All <ArrowRight size={14} />
                    </button>
                  </div>

                  <div className="vexa-orders-list">
                    {orders.map((ord) => (
                      <div key={ord.id} className="vexa-order-row">
                        <div className="vexa-order-item-left">
                          <div className="vexa-order-thumb">
                            {renderApparelThumb(ord.thumbType)}
                          </div>
                          <div className="vexa-order-meta">
                            <span className="vexa-order-code">{ord.id}</span>
                            <span className="vexa-order-date">{ord.date}</span>
                          </div>
                        </div>

                        <div className="vexa-order-item-right">
                          <span className={`vexa-order-status ${ord.statusClass}`}>
                            {ord.status}
                          </span>
                          <span className="vexa-order-price">{ord.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: CRM / LEADS */}
          {activeTab === 'crm-leads' && (
            <>
              <div className="vexa-page-header">
                <h1 className="vexa-heading">CRM &amp; Wholesale Leads</h1>
                <p className="vexa-subheading">Track retail inquiries, sampling stages, and wholesale pipeline conversion.</p>
              </div>

              <div className="vexa-kpi-grid" style={{ marginBottom: '24px' }}>
                <div className="vexa-kpi-card">
                  <span className="vexa-kpi-label">Active Leads</span>
                  <div className="vexa-kpi-value">24</div>
                  <span className="vexa-kpi-trend" style={{ color: '#059669' }}>+6 New This Week</span>
                </div>
                <div className="vexa-kpi-card">
                  <span className="vexa-kpi-label">Samples Dispatched</span>
                  <div className="vexa-kpi-value">8</div>
                  <span className="vexa-kpi-trend" style={{ color: '#0284c7' }}>Fabric &amp; Fitting</span>
                </div>
                <div className="vexa-kpi-card">
                  <span className="vexa-kpi-label">Pipeline Value</span>
                  <div className="vexa-kpi-value">₹14,80,000</div>
                  <span className="vexa-kpi-trend" style={{ color: '#059669' }}>Wholesale RFQs</span>
                </div>
                <div className="vexa-kpi-card">
                  <span className="vexa-kpi-label">Conversion Rate</span>
                  <div className="vexa-kpi-value">42.5%</div>
                  <span className="vexa-kpi-trend" style={{ color: '#6366f1' }}>Lead to PO</span>
                </div>
              </div>

              <div className="vexa-view-toolbar">
                <div className="vexa-search-wrap">
                  <Search size={16} className="vexa-search-icon" />
                  <input
                    type="text"
                    placeholder="Search brand, lead, or style..."
                    className="vexa-search-input"
                  />
                </div>
                <div className="vexa-toolbar-actions">
                  <button className="vexa-btn-primary" onClick={() => alert('New Lead Form')}>
                    <Plus size={16} /> New Lead
                  </button>
                </div>
              </div>

              <div className="vexa-table-card">
                <div className="vexa-table-responsive">
                  <table className="vexa-table">
                    <thead>
                      <tr>
                        <th>Lead ID</th>
                        <th>Client / Brand Name</th>
                        <th>Contact Person</th>
                        <th>Interested Style</th>
                        <th>Inquired Qty</th>
                        <th>Est. Value</th>
                        <th>Stage</th>
                        <th>Assigned Rep</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leadsList.map((lead) => (
                        <tr key={lead.id}>
                          <td><code>{lead.id}</code></td>
                          <td><strong>{lead.name}</strong></td>
                          <td>{lead.contact}</td>
                          <td>{lead.style}</td>
                          <td>{lead.qty}</td>
                          <td><strong style={{ color: '#059669' }}>{lead.value}</strong></td>
                          <td><span className={`vexa-order-status ${lead.stageClass}`}>{lead.stage}</span></td>
                          <td>{lead.rep}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TAB 3: CUSTOMERS */}
          {activeTab === 'customers' && (
            <>
              <div className="vexa-page-header">
                <h1 className="vexa-heading">Customers Directory</h1>
                <p className="vexa-subheading">Manage retail boutiques, distributors, and individual apparel clients.</p>
              </div>

              <div className="vexa-view-toolbar">
                <div className="vexa-search-wrap">
                  <Search size={16} className="vexa-search-icon" />
                  <input
                    type="text"
                    placeholder="Search customers by name, email..."
                    className="vexa-search-input"
                  />
                </div>
                <div className="vexa-toolbar-actions">
                  <button className="vexa-btn-primary" onClick={() => alert('Add Customer Modal')}>
                    <Plus size={16} /> Add Customer
                  </button>
                </div>
              </div>

              <div className="vexa-table-card">
                <div className="vexa-table-responsive">
                  <table className="vexa-table">
                    <thead>
                      <tr>
                        <th>Customer ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Segment</th>
                        <th>Total Orders</th>
                        <th>Lifetime Spend</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customersList.map((c) => (
                        <tr key={c.id}>
                          <td><code>{c.id}</code></td>
                          <td><strong>{c.name}</strong></td>
                          <td>{c.email}</td>
                          <td>{c.phone}</td>
                          <td><span className="vexa-order-status indigo">{c.segment}</span></td>
                          <td>{c.orders} orders</td>
                          <td><strong style={{ color: '#059669' }}>{c.spent}</strong></td>
                          <td><span className="vexa-order-status delivered">{c.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TAB 4: VENDORS */}
          {activeTab === 'vendors' && (
            <>
              <div className="vexa-page-header">
                <h1 className="vexa-heading">Fabric &amp; Trim Vendors</h1>
                <p className="vexa-subheading">Supplier relationships for yarn, textiles, buttons, zippers, and dyes.</p>
              </div>

              <div className="vexa-view-toolbar">
                <div className="vexa-search-wrap">
                  <Search size={16} className="vexa-search-icon" />
                  <input
                    type="text"
                    placeholder="Search suppliers, textiles, locations..."
                    className="vexa-search-input"
                  />
                </div>
                <div className="vexa-toolbar-actions">
                  <button className="vexa-btn-primary" onClick={() => alert('Add Vendor Modal')}>
                    <Plus size={16} /> Add Vendor
                  </button>
                </div>
              </div>

              <div className="vexa-table-card">
                <div className="vexa-table-responsive">
                  <table className="vexa-table">
                    <thead>
                      <tr>
                        <th>Vendor ID</th>
                        <th>Supplier Name</th>
                        <th>Supply Category</th>
                        <th>Contact &amp; Hub</th>
                        <th>Phone</th>
                        <th>Open POs</th>
                        <th>Payable Balance</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vendorsList.map((v) => (
                        <tr key={v.id}>
                          <td><code>{v.id}</code></td>
                          <td><strong>{v.name}</strong></td>
                          <td>{v.category}</td>
                          <td>{v.contact}</td>
                          <td>{v.phone}</td>
                          <td>{v.openOrders} Orders</td>
                          <td><strong style={{ color: '#b45309' }}>{v.balance}</strong></td>
                          <td><span className="vexa-order-status delivered">{v.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TAB 5: INVENTORY */}
          {activeTab === 'inventory' && (
            <>
              <div className="vexa-page-header">
                <h1 className="vexa-heading">Inventory &amp; Warehouse Stock</h1>
                <p className="vexa-subheading">Real-time tracking of finished apparel pieces and raw fabric rolls.</p>
              </div>

              <div className="vexa-view-toolbar">
                <div className="vexa-search-wrap">
                  <Search size={16} className="vexa-search-icon" />
                  <input
                    type="text"
                    placeholder="Search SKU, fabric, size breakdown..."
                    className="vexa-search-input"
                  />
                </div>
                <div className="vexa-toolbar-actions">
                  <button className="vexa-btn-primary" onClick={() => alert('Add Stock Modal')}>
                    <Plus size={16} /> Add Stock Item
                  </button>
                </div>
              </div>

              <div className="vexa-table-card">
                <div className="vexa-table-responsive">
                  <table className="vexa-table">
                    <thead>
                      <tr>
                        <th>SKU</th>
                        <th>Item Description</th>
                        <th>Category</th>
                        <th>Stock Breakdown</th>
                        <th>Total In-Stock</th>
                        <th>Reorder Level</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventoryList.map((item) => (
                        <tr key={item.sku}>
                          <td><code>{item.sku}</code></td>
                          <td><strong>{item.item}</strong></td>
                          <td><span className="vexa-order-status indigo">{item.category}</span></td>
                          <td>{item.stockBreakdown}</td>
                          <td><strong>{item.totalQty}</strong></td>
                          <td>{item.threshold}</td>
                          <td><span className={`vexa-order-status ${item.statusClass}`}>{item.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TAB 6: SALES */}
          {activeTab === 'sales' && (
            <>
              <div className="vexa-page-header">
                <h1 className="vexa-heading">Sales Orders</h1>
                <p className="vexa-subheading">Online store orders, wholesale dispatches, and fulfillment tracking.</p>
              </div>

              <div className="vexa-view-toolbar">
                <div className="vexa-search-wrap">
                  <Search size={16} className="vexa-search-icon" />
                  <input
                    type="text"
                    placeholder="Search order ID, buyer, status..."
                    className="vexa-search-input"
                  />
                </div>
                <div className="vexa-toolbar-actions">
                  <button className="vexa-btn-primary" onClick={() => alert('New Sales Order')}>
                    <Plus size={16} /> New Sales Order
                  </button>
                </div>
              </div>

              <div className="vexa-table-card">
                <div className="vexa-table-responsive">
                  <table className="vexa-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Garment Item</th>
                        <th>Qty</th>
                        <th>Order Date</th>
                        <th>Total Amount</th>
                        <th>Payment Mode</th>
                        <th>Fulfillment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {salesList.map((s) => (
                        <tr key={s.orderId}>
                          <td><code>{s.orderId}</code></td>
                          <td><strong>{s.customer}</strong></td>
                          <td>{s.item}</td>
                          <td>{s.qty}</td>
                          <td>{s.date}</td>
                          <td><strong style={{ color: '#059669' }}>{s.amount}</strong></td>
                          <td>{s.payment}</td>
                          <td><span className={`vexa-order-status ${s.statusClass}`}>{s.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TAB 7: PURCHASE */}
          {activeTab === 'purchase' && (
            <>
              <div className="vexa-page-header">
                <h1 className="vexa-heading">Raw Material Purchases</h1>
                <p className="vexa-subheading">Purchase orders for yarn, fabric rolls, trims, packaging, and labels.</p>
              </div>

              <div className="vexa-view-toolbar">
                <div className="vexa-search-wrap">
                  <Search size={16} className="vexa-search-icon" />
                  <input
                    type="text"
                    placeholder="Search PO number, supplier, raw materials..."
                    className="vexa-search-input"
                  />
                </div>
                <div className="vexa-toolbar-actions">
                  <button className="vexa-btn-primary" onClick={() => alert('New Purchase Order')}>
                    <Plus size={16} /> Create PO
                  </button>
                </div>
              </div>

              <div className="vexa-table-card">
                <div className="vexa-table-responsive">
                  <table className="vexa-table">
                    <thead>
                      <tr>
                        <th>PO Number</th>
                        <th>Supplier</th>
                        <th>Material Description</th>
                        <th>Issue Date</th>
                        <th>PO Amount</th>
                        <th>Due Delivery</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {purchaseList.map((po) => (
                        <tr key={po.poNumber}>
                          <td><code>{po.poNumber}</code></td>
                          <td><strong>{po.vendor}</strong></td>
                          <td>{po.items}</td>
                          <td>{po.date}</td>
                          <td><strong style={{ color: '#0f172a' }}>{po.amount}</strong></td>
                          <td>{po.dueDate}</td>
                          <td><span className={`vexa-order-status ${po.statusClass}`}>{po.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TAB 8: PRODUCTION */}
          {activeTab === 'production' && (
            <>
              <div className="vexa-page-header">
                <h1 className="vexa-heading">Garment Manufacturing &amp; Production</h1>
                <p className="vexa-subheading">Floor progress tracking from pattern cutting to stitching and packaging.</p>
              </div>

              <div className="vexa-view-toolbar">
                <div className="vexa-search-wrap">
                  <Search size={16} className="vexa-search-icon" />
                  <input
                    type="text"
                    placeholder="Search Job card, line, style..."
                    className="vexa-search-input"
                  />
                </div>
                <div className="vexa-toolbar-actions">
                  <button className="vexa-btn-primary" onClick={() => alert('New Production Batch')}>
                    <Plus size={16} /> New Job Card
                  </button>
                </div>
              </div>

              <div className="vexa-table-card">
                <div className="vexa-table-responsive">
                  <table className="vexa-table">
                    <thead>
                      <tr>
                        <th>Job Card</th>
                        <th>Garment Style</th>
                        <th>Target Qty</th>
                        <th>Current Stage</th>
                        <th>Batch Progress</th>
                        <th>Line Master</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productionList.map((batch) => (
                        <tr key={batch.jobCard}>
                          <td><code>{batch.jobCard}</code></td>
                          <td><strong>{batch.style}</strong></td>
                          <td>{batch.targetQty} pcs</td>
                          <td><span className="vexa-order-status indigo">{batch.stage}</span></td>
                          <td>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                              <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                                {batch.completedQty} / {batch.targetQty} ({batch.percent}%)
                              </span>
                              <div className="vexa-progress-container">
                                <div
                                  className="vexa-progress-fill"
                                  style={{ width: `${batch.percent}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td>{batch.master}</td>
                          <td><span className={`vexa-order-status ${batch.statusClass}`}>{batch.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TAB 9: GARMENT STYLES */}
          {activeTab === 'garment-styles' && (
            <>
              <div className="vexa-page-header">
                <h1 className="vexa-heading">Garment Styles &amp; Tech Packs</h1>
                <p className="vexa-subheading">Design specifications, fabric blends, cost of goods, and MRP tiers.</p>
              </div>

              <div className="vexa-view-toolbar">
                <div className="vexa-search-wrap">
                  <Search size={16} className="vexa-search-icon" />
                  <input
                    type="text"
                    placeholder="Search styles, fabric blends, categories..."
                    className="vexa-search-input"
                  />
                </div>
                <div className="vexa-toolbar-actions">
                  <button className="vexa-btn-primary" onClick={() => alert('New Garment Style')}>
                    <Plus size={16} /> Create Style
                  </button>
                </div>
              </div>

              <div className="vexa-table-card">
                <div className="vexa-table-responsive">
                  <table className="vexa-table">
                    <thead>
                      <tr>
                        <th>Style Code</th>
                        <th>Style Name</th>
                        <th>Category</th>
                        <th>Fabric Blend</th>
                        <th>Production Cost</th>
                        <th>Wholesale</th>
                        <th>Retail MRP</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {garmentStylesList.map((sty) => (
                        <tr key={sty.code}>
                          <td><code>{sty.code}</code></td>
                          <td><strong>{sty.name}</strong></td>
                          <td><span className="vexa-order-status shipped">{sty.category}</span></td>
                          <td>{sty.fabric}</td>
                          <td><strong style={{ color: '#64748b' }}>{sty.cost}</strong></td>
                          <td><strong style={{ color: '#0284c7' }}>{sty.wholesale}</strong></td>
                          <td><strong style={{ color: '#059669' }}>{sty.mrp}</strong></td>
                          <td><span className="vexa-order-status delivered">{sty.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TAB 10: EXPENSES */}
          {activeTab === 'expenses' && (
            <>
              <div className="vexa-page-header">
                <h1 className="vexa-heading">Operational &amp; Factory Expenses</h1>
                <p className="vexa-subheading">Track factory rent, machine maintenance, utilities, and freight bills.</p>
              </div>

              <div className="vexa-view-toolbar">
                <div className="vexa-search-wrap">
                  <Search size={16} className="vexa-search-icon" />
                  <input
                    type="text"
                    placeholder="Search expense ID, vendor, category..."
                    className="vexa-search-input"
                  />
                </div>
                <div className="vexa-toolbar-actions">
                  <button className="vexa-btn-primary" onClick={() => alert('Record Expense Modal')}>
                    <Plus size={16} /> Record Expense
                  </button>
                </div>
              </div>

              <div className="vexa-table-card">
                <div className="vexa-table-responsive">
                  <table className="vexa-table">
                    <thead>
                      <tr>
                        <th>Expense ID</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Payment Mode</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expensesList.map((exp) => (
                        <tr key={exp.expId}>
                          <td><code>{exp.expId}</code></td>
                          <td>{exp.date}</td>
                          <td><span className="vexa-order-status indigo">{exp.category}</span></td>
                          <td>{exp.description}</td>
                          <td><strong style={{ color: '#dc2626' }}>{exp.amount}</strong></td>
                          <td>{exp.mode}</td>
                          <td><span className="vexa-order-status delivered">{exp.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TAB 11: ACCOUNTS */}
          {activeTab === 'accounts' && (
            <>
              <div className="vexa-page-header">
                <h1 className="vexa-heading">Financial Accounts &amp; Ledger</h1>
                <p className="vexa-subheading">Balance sheet reconciliation, cashflow, and journal entries.</p>
              </div>

              <div className="vexa-kpi-grid" style={{ marginBottom: '24px' }}>
                <div className="vexa-kpi-card">
                  <span className="vexa-kpi-label">Accounts Receivable</span>
                  <div className="vexa-kpi-value">₹1,84,000</div>
                  <span className="vexa-kpi-trend" style={{ color: '#059669' }}>Due from Retailers</span>
                </div>
                <div className="vexa-kpi-card">
                  <span className="vexa-kpi-label">Accounts Payable</span>
                  <div className="vexa-kpi-value">₹1,42,000</div>
                  <span className="vexa-kpi-trend" style={{ color: '#b45309' }}>Mill Invoices</span>
                </div>
                <div className="vexa-kpi-card">
                  <span className="vexa-kpi-label">Net Operating Cash</span>
                  <div className="vexa-kpi-value">+₹4,26,000</div>
                  <span className="vexa-kpi-trend" style={{ color: '#059669' }}>Healthy Working Capital</span>
                </div>
                <div className="vexa-kpi-card">
                  <span className="vexa-kpi-label">Gross Margin</span>
                  <div className="vexa-kpi-value">38.4%</div>
                  <span className="vexa-kpi-trend" style={{ color: '#6366f1' }}>Apparel Sector</span>
                </div>
              </div>

              <div className="vexa-table-card">
                <div className="vexa-table-responsive">
                  <table className="vexa-table">
                    <thead>
                      <tr>
                        <th>Account Head / Ledger</th>
                        <th>Debit (Dr)</th>
                        <th>Credit (Cr)</th>
                        <th>Net Balance</th>
                        <th>Audit Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ledgerEntries.map((l, idx) => (
                        <tr key={idx}>
                          <td><strong>{l.head}</strong></td>
                          <td><span style={{ color: l.debit !== '₹0' ? '#dc2626' : '#94a3b8' }}>{l.debit}</span></td>
                          <td><span style={{ color: l.credit !== '₹0' ? '#059669' : '#94a3b8' }}>{l.credit}</span></td>
                          <td><strong>{l.balance}</strong></td>
                          <td><span className="vexa-order-status delivered">{l.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TAB 12: EMPLOYEES */}
          {activeTab === 'employees' && (
            <>
              <div className="vexa-page-header">
                <h1 className="vexa-heading">Staff &amp; Workforce Directory</h1>
                <p className="vexa-subheading">Pattern masters, stitchers, cutters, quality checkers, and supervisors.</p>
              </div>

              <div className="vexa-view-toolbar">
                <div className="vexa-search-wrap">
                  <Search size={16} className="vexa-search-icon" />
                  <input
                    type="text"
                    placeholder="Search staff by name, department, role..."
                    className="vexa-search-input"
                  />
                </div>
                <div className="vexa-toolbar-actions">
                  <button className="vexa-btn-primary" onClick={() => alert('Add Employee Modal')}>
                    <Plus size={16} /> Add Employee
                  </button>
                </div>
              </div>

              <div className="vexa-table-card">
                <div className="vexa-table-responsive">
                  <table className="vexa-table">
                    <thead>
                      <tr>
                        <th>Emp ID</th>
                        <th>Employee Name</th>
                        <th>Department</th>
                        <th>Designation / Role</th>
                        <th>Assigned Shift</th>
                        <th>Mobile</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeesList.map((emp) => (
                        <tr key={emp.empId}>
                          <td><code>{emp.empId}</code></td>
                          <td><strong>{emp.name}</strong></td>
                          <td><span className="vexa-order-status indigo">{emp.dept}</span></td>
                          <td>{emp.role}</td>
                          <td>{emp.shift}</td>
                          <td>{emp.phone}</td>
                          <td><span className="vexa-order-status delivered">{emp.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TAB 13: ATTENDANCE */}
          {activeTab === 'attendance' && (
            <>
              <div className="vexa-page-header">
                <h1 className="vexa-heading">Factory Shift Attendance</h1>
                <p className="vexa-subheading">Daily punch-in, punch-out, shift logs, and overtime hours tracking.</p>
              </div>

              <div className="vexa-kpi-grid" style={{ marginBottom: '24px' }}>
                <div className="vexa-kpi-card">
                  <span className="vexa-kpi-label">Total Staff</span>
                  <div className="vexa-kpi-value">38</div>
                  <span className="vexa-kpi-trend" style={{ color: '#64748b' }}>Full Workforce</span>
                </div>
                <div className="vexa-kpi-card">
                  <span className="vexa-kpi-label">Present Today</span>
                  <div className="vexa-kpi-value">36</div>
                  <span className="vexa-kpi-trend" style={{ color: '#059669' }}>94.7% Attendance</span>
                </div>
                <div className="vexa-kpi-card">
                  <span className="vexa-kpi-label">On Leave</span>
                  <div className="vexa-kpi-value">2</div>
                  <span className="vexa-kpi-trend" style={{ color: '#b45309' }}>Approved Casual</span>
                </div>
                <div className="vexa-kpi-card">
                  <span className="vexa-kpi-label">Overtime Hours</span>
                  <div className="vexa-kpi-value">18.5 hrs</div>
                  <span className="vexa-kpi-trend" style={{ color: '#0284c7' }}>Evening Shift</span>
                </div>
              </div>

              <div className="vexa-table-card">
                <div className="vexa-table-responsive">
                  <table className="vexa-table">
                    <thead>
                      <tr>
                        <th>Emp ID</th>
                        <th>Employee Name</th>
                        <th>Department</th>
                        <th>In-Time</th>
                        <th>Out-Time</th>
                        <th>Overtime</th>
                        <th>Daily Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceList.map((att) => (
                        <tr key={att.empId}>
                          <td><code>{att.empId}</code></td>
                          <td><strong>{att.name}</strong></td>
                          <td>{att.dept}</td>
                          <td><code>{att.inTime}</code></td>
                          <td><code>{att.outTime}</code></td>
                          <td><strong>{att.ot}</strong></td>
                          <td><span className={`vexa-order-status ${att.statusClass}`}>{att.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default VexaDashboard;
