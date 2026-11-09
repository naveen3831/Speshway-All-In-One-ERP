import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  LayoutDashboard,
  CalendarCheck,
  Bed,
  Users,
  DollarSign,
  ArrowLeft,
  Search,
  Plus,
  TrendingUp,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  Phone,
  CreditCard,
  Coffee,
  Check,
  Menu,
  X,
} from 'lucide-react';
import '../shared/IndustryDashboard.css';

const RESERVATIONS = [
  { id: 'RES-901', guest: 'Dr. Evelyn Reed', room: 'Suite 502 (Executive Lakeview)', nights: '3 Nights', checkIn: '2026-11-02', checkOut: '2026-11-05', bill: '₹36,000', status: 'Checked In' },
  { id: 'RES-902', guest: 'Kunal Singhania', room: 'Deluxe Room 304', nights: '2 Nights', checkIn: '2026-11-03', checkOut: '2026-11-05', bill: '₹14,500', status: 'Confirmed' },
  { id: 'RES-903', guest: 'Sarah Jenkins', room: 'Presidential Suite 701', nights: '5 Nights', checkIn: '2026-11-01', checkOut: '2026-11-06', bill: '₹1,25,000', status: 'Checked In' },
  { id: 'RES-904', guest: 'Rameshwar Gupta', room: 'Premium King 210', nights: '1 Night', checkIn: '2026-11-02', checkOut: '2026-11-03', bill: '₹8,200', status: 'Checked Out' },
  { id: 'RES-905', guest: 'Ananya & Rohit Deshmukh', room: 'Honeymoon Suite 604', nights: '4 Nights', checkIn: '2026-11-03', checkOut: '2026-11-07', bill: '₹52,000', status: 'Arriving Today' },
  { id: 'RES-906', guest: 'Michael Chang', room: 'Club Room 418', nights: '2 Nights', checkIn: '2026-11-04', checkOut: '2026-11-06', bill: '₹18,000', status: 'Confirmed' },
];

const ROOMS = [
  { roomNo: '101', floor: '1st Floor', type: 'Deluxe Twin', rate: '₹5,500', status: 'Occupied', housekeeping: 'Clean', guest: 'Mr. David Lee' },
  { roomNo: '102', floor: '1st Floor', type: 'Deluxe King', rate: '₹6,000', status: 'Available', housekeeping: 'Ready & Inspected', guest: '-' },
  { roomNo: '204', floor: '2nd Floor', type: 'Executive Suite', rate: '₹11,000', status: 'Occupied', housekeeping: 'Clean', guest: 'Priya Narang' },
  { roomNo: '304', floor: '3rd Floor', type: 'Deluxe Room', rate: '₹7,250', status: 'Reserved', housekeeping: 'Clean', guest: 'Kunal Singhania' },
  { roomNo: '418', floor: '4th Floor', type: 'Club Room', rate: '₹9,000', status: 'Reserved', housekeeping: 'Touch-up Required', guest: 'Michael Chang' },
  { roomNo: '502', floor: '5th Floor', type: 'Executive Lakeview', rate: '₹12,000', status: 'Occupied', housekeeping: 'Cleaning In Progress', guest: 'Dr. Evelyn Reed' },
  { roomNo: '604', floor: '6th Floor', type: 'Honeymoon Suite', rate: '₹13,000', status: 'Reserved', housekeeping: 'Flower Setup Done', guest: 'Ananya Deshmukh' },
  { roomNo: '701', floor: '7th Floor', type: 'Presidential Suite', rate: '₹25,000', status: 'Occupied', housekeeping: 'Turn-down Done', guest: 'Sarah Jenkins' },
];

const GUESTS = [
  { id: 'GST-301', name: 'Dr. Evelyn Reed', phone: '+1 415-555-0199', tier: 'Platinum VIP', stays: 8, spend: '₹2,40,000', notes: 'Prefers high floor, sparkling water on arrival' },
  { id: 'GST-302', name: 'Sarah Jenkins', phone: '+44 7700-900077', tier: 'Diamond Elite', stays: 12, spend: '₹6,80,000', notes: 'Late checkout approved, vegan meals' },
  { id: 'GST-303', name: 'Kunal Singhania', phone: '+91 98201-44556', tier: 'Gold Club', stays: 4, spend: '₹72,000', notes: 'Airport pickup confirmed' },
  { id: 'GST-304', name: 'Rameshwar Gupta', phone: '+91 94140-33221', tier: 'Silver Member', stays: 2, spend: '₹24,500', notes: 'GST invoice requested' },
  { id: 'GST-305', name: 'Michael Chang', phone: '+65 9123-4567', tier: 'Gold Club', stays: 5, spend: '₹98,000', notes: 'Quiet room away from elevator' },
];

const HOUSEKEEPING_ROSTER = [
  { task: 'HK-101', room: 'Suite 502', staff: 'Sunita Devi', type: 'Daily Refresh', status: 'In Progress', timer: '25 mins elapsed' },
  { task: 'HK-102', room: 'Room 304', staff: 'Meena Bai', type: 'Pre-Arrival Inspection', status: 'Completed', timer: 'Verified' },
  { task: 'HK-103', room: 'Suite 701', staff: 'Pooja Sharma', type: 'Turn-down Service', status: 'Scheduled (18:00)', timer: 'Pending' },
  { task: 'HK-104', room: 'Room 210', staff: 'Sunita Devi', type: 'Deep Sanitization (Post Check-out)', status: 'Completed', timer: 'Ready for Guest' },
  { task: 'HK-105', room: 'Room 418', staff: 'Raju Kumar', type: 'Linen Change', status: 'In Progress', timer: '10 mins elapsed' },
];

const FOLIO_BILLING = [
  { folioNo: 'FOL-7781', guest: 'Dr. Evelyn Reed', room: 'Suite 502', roomCharges: '₹36,000', dining: '₹4,850', spa: '₹3,500', tax: '₹7,983', total: '₹52,333', status: 'Open' },
  { folioNo: 'FOL-7782', guest: 'Sarah Jenkins', room: 'Suite 701', roomCharges: '₹1,25,000', dining: '₹18,400', spa: '₹12,000', tax: '₹27,972', total: '₹1,83,372', status: 'Open' },
  { folioNo: 'FOL-7783', guest: 'Rameshwar Gupta', room: 'Room 210', roomCharges: '₹8,200', dining: '₹1,250', spa: '₹0', tax: '₹1,701', total: '₹11,151', status: 'Settled (Card)' },
  { folioNo: 'FOL-7784', guest: 'Corporate Batch (Infosys)', room: '10 Rooms (2nd Floor)', roomCharges: '₹1,45,000', dining: '₹34,200', spa: '₹0', tax: '₹32,256', total: '₹2,11,456', status: 'Direct Bill (PO)' },
];

export const HotelDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('bookings');
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');

  const filteredReservations = RESERVATIONS.filter((r) => {
    const matchStatus = filterStatus === 'all' || r.status.toLowerCase().replace(/[^a-z]/g, '') === filterStatus;
    const matchSearch = r.guest.toLowerCase().includes(search.toLowerCase()) ||
      r.room.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="ind-erp-root">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="ind-sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close navigation overlay"
        />
      )}

      {/* Sidebar */}
      <aside className={`ind-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="ind-sidebar-brand">
          <div className="ind-brand-icon-box" style={{ backgroundColor: '#f59e0b' }}>
            <Building2 size={20} color="#ffffff" />
          </div>
          <div className="ind-brand-text">
            <span className="ind-brand-name">LuxeResort</span>
            <span className="ind-brand-sub" style={{ color: '#fbbf24' }}>Hospitality ERP</span>
          </div>
          <button
            type="button"
            className="ind-sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="ind-sidebar-menu">
          <button onClick={() => { setActiveNav('dash'); setSidebarOpen(false); }} className={`ind-nav-btn ${activeNav === 'dash' ? 'active' : ''}`}>
            <LayoutDashboard size={18} /> Front Desk
          </button>
          <button onClick={() => { setActiveNav('bookings'); setSidebarOpen(false); }} className={`ind-nav-btn ${activeNav === 'bookings' ? 'active' : ''}`}>
            <CalendarCheck size={18} /> Reservations <span className="ind-nav-badge">6</span>
          </button>
          <button onClick={() => { setActiveNav('rooms'); setSidebarOpen(false); }} className={`ind-nav-btn ${activeNav === 'rooms' ? 'active' : ''}`}>
            <Bed size={18} /> Room Inventory <span className="ind-nav-badge">8</span>
          </button>
          <button onClick={() => { setActiveNav('guests'); setSidebarOpen(false); }} className={`ind-nav-btn ${activeNav === 'guests' ? 'active' : ''}`}>
            <Users size={18} /> Guest Registry
          </button>
          <button onClick={() => { setActiveNav('housekeeping'); setSidebarOpen(false); }} className={`ind-nav-btn ${activeNav === 'housekeeping' ? 'active' : ''}`}>
            <Sparkles size={18} /> Housekeeping
          </button>
          <button onClick={() => { setActiveNav('billing'); setSidebarOpen(false); }} className={`ind-nav-btn ${activeNav === 'billing' ? 'active' : ''}`}>
            <DollarSign size={18} /> Folio Billing &amp; POS
          </button>
        </nav>

        <div className="ind-sidebar-footer">
          <button onClick={() => { setSidebarOpen(false); navigate('/'); }} className="ind-back-home-btn">
            <ArrowLeft size={16} /> Back to Speshway
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="ind-main-area">
        {/* Topbar */}
        <header className="ind-topbar">
          <div className="ind-topbar-left">
            <button onClick={() => navigate('/')} className="ind-back-pill">
              <ArrowLeft size={14} /> Back to Speshway ERP
            </button>
            <button
              type="button"
              className="ind-menu-toggle"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu size={20} />
            </button>
            <div className="ind-live-chip">
              <span className="ind-live-dot" /> Live Hotel &amp; Resort ERP
            </div>
          </div>
          <div className="ind-topbar-right">
            <div className="ind-search-box">
              <Search size={15} color="#94a3b8" />
              <input
                type="text"
                placeholder="Search guest, room, reservation ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="ind-user-profile">
              <div className="ind-user-avatar" style={{ backgroundColor: '#f59e0b' }}>GM</div>
              <div className="ind-user-meta">
                <span className="ind-user-name">General Manager</span>
                <span className="ind-user-role">Front Office Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="ind-content-body">
          <div className="ind-body-header">
            <div>
              <h1 className="ind-body-title">
                {activeNav === 'dash' && 'Hotel Front Desk & Live Occupancy'}
                {activeNav === 'bookings' && 'Guest Reservations & Bookings'}
                {activeNav === 'rooms' && 'Room Inventory & Floor Matrix'}
                {activeNav === 'guests' && 'VIP Guest Registry & CRM Profiles'}
                {activeNav === 'housekeeping' && 'Housekeeping Roster & Sanitization'}
                {activeNav === 'billing' && 'Guest Folios, POS Charges & Settlement'}
              </h1>
              <p className="ind-body-sub">Real-time room allocation, check-ins, guest folio billing, banquet orders, and housekeeping status.</p>
            </div>
            <button className="ind-action-primary" style={{ backgroundColor: '#f59e0b' }}>
              <Plus size={16} /> New Reservation
            </button>
          </div>

          {/* 4 KPIs */}
          <div className="ind-kpi-grid">
            <div className="ind-kpi-card">
              <div className="ind-kpi-info">
                <span className="ind-kpi-label">Occupancy Rate</span>
                <span className="ind-kpi-val">87.5%</span>
                <span className="ind-kpi-trend"><TrendingUp size={12} /> 42 / 48 Rooms Booked</span>
              </div>
              <div className="ind-kpi-icon-circ" style={{ backgroundColor: '#fffbeb', color: '#d97706' }}>
                <Bed size={22} />
              </div>
            </div>

            <div className="ind-kpi-card">
              <div className="ind-kpi-info">
                <span className="ind-kpi-label">Today's Check-Ins</span>
                <span className="ind-kpi-val">14 Arrivals</span>
                <span className="ind-kpi-trend"><CheckCircle2 size={12} /> 9 Checked In</span>
              </div>
              <div className="ind-kpi-icon-circ" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
                <CalendarCheck size={22} />
              </div>
            </div>

            <div className="ind-kpi-card">
              <div className="ind-kpi-info">
                <span className="ind-kpi-label">Room Revenue</span>
                <span className="ind-kpi-val">₹2.84L</span>
                <span className="ind-kpi-trend"><TrendingUp size={12} /> Today's Gross Folio</span>
              </div>
              <div className="ind-kpi-icon-circ" style={{ backgroundColor: '#ecfdf5', color: '#059669' }}>
                <DollarSign size={22} />
              </div>
            </div>

            <div className="ind-kpi-card">
              <div className="ind-kpi-info">
                <span className="ind-kpi-label">Housekeeping</span>
                <span className="ind-kpi-val">6 Cleaning</span>
                <span className="ind-kpi-trend">42 Ready &amp; Inspected</span>
              </div>
              <div className="ind-kpi-icon-circ" style={{ backgroundColor: '#faf5ff', color: '#9333ea' }}>
                <Sparkles size={22} />
              </div>
            </div>
          </div>

          {/* TAB 1: FRONT DESK & RESERVATIONS */}
          {(activeNav === 'dash' || activeNav === 'bookings') && (
            <div className="ind-card-container">
              <div className="ind-table-controls">
                <div className="ind-tabs-row">
                  <button onClick={() => setFilterStatus('all')} className={`ind-tab-pill ${filterStatus === 'all' ? 'active' : ''}`}>All Bookings</button>
                  <button onClick={() => setFilterStatus('checkedin')} className={`ind-tab-pill ${filterStatus === 'checkedin' ? 'active' : ''}`}>Checked In</button>
                  <button onClick={() => setFilterStatus('confirmed')} className={`ind-tab-pill ${filterStatus === 'confirmed' ? 'active' : ''}`}>Confirmed</button>
                  <button onClick={() => setFilterStatus('arrivingtoday')} className={`ind-tab-pill ${filterStatus === 'arrivingtoday' ? 'active' : ''}`}>Arriving Today</button>
                </div>
              </div>

              <div className="ind-table-wrap">
                <table className="ind-data-table">
                  <thead>
                    <tr>
                      <th>Res ID</th>
                      <th>Guest Name</th>
                      <th>Room Type &amp; No</th>
                      <th>Stay</th>
                      <th>Check In</th>
                      <th>Check Out</th>
                      <th>Folio Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReservations.map((r) => (
                      <tr key={r.id}>
                        <td><span className="ind-code-tag">{r.id}</span></td>
                        <td><strong>{r.guest}</strong></td>
                        <td>{r.room}</td>
                        <td>{r.nights}</td>
                        <td>{r.checkIn}</td>
                        <td>{r.checkOut}</td>
                        <td><strong>{r.bill}</strong></td>
                        <td>
                          <span className={`ind-status-badge ${r.status === 'Checked In' ? 'badge-green' : r.status === 'Confirmed' ? 'badge-blue' : r.status === 'Arriving Today' ? 'badge-amber' : 'badge-purple'}`}>
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: ROOM INVENTORY */}
          {activeNav === 'rooms' && (
            <div className="ind-card-container">
              <div className="ind-table-controls">
                <div className="ind-tabs-row">
                  <button className="ind-tab-pill active">All Rooms (8)</button>
                  <button className="ind-tab-pill">Occupied (4)</button>
                  <button className="ind-tab-pill">Ready (3)</button>
                </div>
              </div>
              <div className="ind-table-wrap">
                <table className="ind-data-table">
                  <thead>
                    <tr>
                      <th>Room No</th>
                      <th>Floor</th>
                      <th>Room Category</th>
                      <th>Tariff / Night</th>
                      <th>Occupancy Status</th>
                      <th>Housekeeping</th>
                      <th>Current Guest</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ROOMS.map((rm) => (
                      <tr key={rm.roomNo}>
                        <td><span className="ind-code-tag">Room {rm.roomNo}</span></td>
                        <td>{rm.floor}</td>
                        <td><strong>{rm.type}</strong></td>
                        <td>{rm.rate}</td>
                        <td>
                          <span className={`ind-status-badge ${rm.status === 'Occupied' ? 'badge-green' : rm.status === 'Reserved' ? 'badge-blue' : 'badge-amber'}`}>
                            {rm.status}
                          </span>
                        </td>
                        <td><Sparkles size={13} style={{ display: 'inline', marginRight: 4 }} />{rm.housekeeping}</td>
                        <td>{rm.guest}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: GUEST REGISTRY */}
          {activeNav === 'guests' && (
            <div className="ind-card-container">
              <div className="ind-table-controls">
                <div className="ind-tabs-row">
                  <button className="ind-tab-pill active">All Profiles (5)</button>
                  <button className="ind-tab-pill">VIP Members</button>
                </div>
              </div>
              <div className="ind-table-wrap">
                <table className="ind-data-table">
                  <thead>
                    <tr>
                      <th>Guest ID</th>
                      <th>Full Name</th>
                      <th>Phone &amp; Contact</th>
                      <th>Membership Tier</th>
                      <th>Lifetime Stays</th>
                      <th>Total Spend</th>
                      <th>Special Preferences</th>
                    </tr>
                  </thead>
                  <tbody>
                    {GUESTS.map((g) => (
                      <tr key={g.id}>
                        <td><span className="ind-code-tag">{g.id}</span></td>
                        <td><strong>{g.name}</strong></td>
                        <td><Phone size={13} style={{ display: 'inline', marginRight: 4 }} />{g.phone}</td>
                        <td><span className="ind-status-badge badge-purple">{g.tier}</span></td>
                        <td>{g.stays} Stays</td>
                        <td><strong>{g.spend}</strong></td>
                        <td>{g.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: HOUSEKEEPING */}
          {activeNav === 'housekeeping' && (
            <div className="ind-card-container">
              <div className="ind-table-controls">
                <div className="ind-tabs-row">
                  <button className="ind-tab-pill active">Active Shift Tasks</button>
                  <button className="ind-tab-pill">Inspected &amp; Ready</button>
                </div>
              </div>
              <div className="ind-table-wrap">
                <table className="ind-data-table">
                  <thead>
                    <tr>
                      <th>Task ID</th>
                      <th>Target Room</th>
                      <th>Assigned Attendant</th>
                      <th>Sanitization Routine</th>
                      <th>Task Status</th>
                      <th>Time Elapsed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {HOUSEKEEPING_ROSTER.map((hk) => (
                      <tr key={hk.task}>
                        <td><span className="ind-code-tag">{hk.task}</span></td>
                        <td><strong>{hk.room}</strong></td>
                        <td>{hk.staff}</td>
                        <td>{hk.type}</td>
                        <td>
                          <span className={`ind-status-badge ${hk.status.includes('Completed') ? 'badge-green' : hk.status.includes('Progress') ? 'badge-amber' : 'badge-blue'}`}>
                            {hk.status}
                          </span>
                        </td>
                        <td><Clock size={13} style={{ display: 'inline', marginRight: 4 }} />{hk.timer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: BILLING & POS */}
          {activeNav === 'billing' && (
            <div className="ind-card-container">
              <div className="ind-table-controls">
                <div className="ind-tabs-row">
                  <button className="ind-tab-pill active">Active Guest Folios</button>
                  <button className="ind-tab-pill">Settled Invoices</button>
                </div>
              </div>
              <div className="ind-table-wrap">
                <table className="ind-data-table">
                  <thead>
                    <tr>
                      <th>Folio #</th>
                      <th>Guest / Account</th>
                      <th>Room</th>
                      <th>Room Charges</th>
                      <th>Dining / F&amp;B</th>
                      <th>Spa &amp; Extras</th>
                      <th>GST (18%)</th>
                      <th>Grand Total</th>
                      <th>Billing Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FOLIO_BILLING.map((f) => (
                      <tr key={f.folioNo}>
                        <td><span className="ind-code-tag">{f.folioNo}</span></td>
                        <td><strong>{f.guest}</strong></td>
                        <td>{f.room}</td>
                        <td>{f.roomCharges}</td>
                        <td>{f.dining}</td>
                        <td>{f.spa}</td>
                        <td>{f.tax}</td>
                        <td><strong style={{ color: '#059669' }}>{f.total}</strong></td>
                        <td>
                          <span className={`ind-status-badge ${f.status.includes('Settled') ? 'badge-green' : 'badge-amber'}`}>
                            {f.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default HotelDashboard;
