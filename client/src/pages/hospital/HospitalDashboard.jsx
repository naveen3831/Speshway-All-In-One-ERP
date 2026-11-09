import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Calendar,
  Building2,
  FlaskConical,
  Bed,
  Pill,
  Droplet,
  Truck,
  Briefcase,
  Clock,
  CalendarCheck,
  Shield,
  CreditCard,
  LogOut,
  Bell,
  ArrowLeft,
  Download,
  Eye,
  Search,
  ChevronDown,
  Printer,
  Menu,
  X,
  CheckCircle,
  AlertCircle,
  Activity,
  HeartPulse,
  Stethoscope,
  FileCheck,
} from 'lucide-react';
import './HospitalDashboard.css';

// Initial pathology and diagnostic lab reports matching exact screenshot data
const INITIAL_LAB_REPORTS = [
  {
    id: 'LAB-4019',
    patientName: 'Eleanor Vance',
    patientId: 'PAT-1082',
    age: '42 / Female',
    testName: 'Complete Blood Count (CBC) with Differential',
    category: 'Hematology',
    doctor: 'Dr. Marcus Chen',
    sampleDate: '2024-10-29',
    technician: 'Alex Rivera, MLT',
    status: 'Ready',
    isUrgent: false,
    findings: [
      { parameter: 'Hemoglobin (Hb)', result: '13.8 g/dL', normal: '12.0 - 15.5 g/dL', status: 'Normal' },
      { parameter: 'White Blood Cells (WBC)', result: '6,400 /mcL', normal: '4,500 - 11,000 /mcL', status: 'Normal' },
      { parameter: 'Platelet Count', result: '240,000 /mcL', normal: '150,000 - 450,000 /mcL', status: 'Normal' },
      { parameter: 'Hematocrit', result: '41.2 %', normal: '37.0 - 48.0 %', status: 'Normal' },
    ],
    notes: 'Hematological parameters within clinically normal reference ranges.',
  },
  {
    id: 'LAB-4020',
    patientName: 'James Wilson',
    patientId: 'PAT-1083',
    age: '58 / Male',
    testName: 'Brain MRI with DWI & Perfusion',
    category: 'Radiology',
    doctor: 'Dr. Sarah Al-Mansoor',
    sampleDate: '2024-10-28',
    technician: 'Dr. Ritu Chopra (Radiologist)',
    status: 'Ready',
    isUrgent: true,
    findings: [
      { parameter: 'Diffusion Weighted Imaging', result: 'Negative acute ischemia', normal: 'No restriction', status: 'Normal' },
      { parameter: 'T2 / FLAIR Signal', result: 'Mild microvascular white matter changes', normal: 'Age-appropriate', status: 'Normal' },
      { parameter: 'Ventricular System', result: 'Symmetric, normal size', normal: 'Normal', status: 'Normal' },
      { parameter: 'Perfusion Mapping', result: 'Symmetric cerebral blood flow', normal: 'Symmetric', status: 'Normal' },
    ],
    notes: 'STAT MRI Brain report verified. No acute hemorrhage or major intracranial abnormality detected.',
  },
  {
    id: 'LAB-4021',
    patientName: 'Vikram Malhotra',
    patientId: 'PAT-1086',
    age: '64 / Male',
    testName: 'Comprehensive Metabolic Panel (CMP)',
    category: 'Biochemistry',
    doctor: 'Dr. Elizabeth Brooks',
    sampleDate: '2024-10-30',
    technician: 'Samir Khan, MLT',
    status: 'In Analysis',
    isUrgent: true,
    findings: [
      { parameter: 'Serum Glucose', result: '142 mg/dL', normal: '70 - 99 mg/dL', status: 'High' },
      { parameter: 'BUN (Blood Urea Nitrogen)', result: '24 mg/dL', normal: '7 - 20 mg/dL', status: 'High' },
      { parameter: 'Serum Creatinine', result: '1.2 mg/dL', normal: '0.7 - 1.3 mg/dL', status: 'Normal' },
      { parameter: 'Sodium', result: '139 mEq/L', normal: '135 - 145 mEq/L', status: 'Normal' },
    ],
    notes: 'Specimen currently undergoing secondary calibration and photometric verification.',
  },
  {
    id: 'LAB-4022',
    patientName: 'Sophia Martinez',
    patientId: 'PAT-1085',
    age: '29 / Female',
    testName: 'Fetal Anomaly & Doppler Ultrasound',
    category: 'Obstetric Ultrasound',
    doctor: 'Dr. Anita Desai',
    sampleDate: '2024-10-28',
    technician: 'Dr. Anita Desai',
    status: 'Ready',
    isUrgent: false,
    findings: [
      { parameter: 'Gestational Age', result: '20 Weeks 4 Days', normal: 'Expected: 20w3d', status: 'Normal' },
      { parameter: 'Estimated Fetal Weight', result: '380 grams', normal: '350 - 410 g', status: 'Normal' },
      { parameter: 'Umbilical Artery PI', result: '0.98', normal: '0.85 - 1.25', status: 'Normal' },
      { parameter: 'Amniotic Fluid Index (AFI)', result: '14.2 cm', normal: '10 - 20 cm', status: 'Normal' },
    ],
    notes: 'Anatomy scan demonstrates normal fetal organogenesis. Doppler indices reassuring.',
  },
  {
    id: 'LAB-4023',
    patientName: 'David Vance',
    patientId: 'PAT-1088',
    age: '51 / Male',
    testName: 'High-Sensitivity Cardiac Troponin-I & CK-MB',
    category: 'Cardiology Biomarkers',
    doctor: 'Dr. Sarah Al-Mansoor',
    sampleDate: '2024-10-31',
    technician: 'Alex Rivera, MLT',
    status: 'Ready',
    isUrgent: true,
    findings: [
      { parameter: 'hs-cTnI', result: '< 0.01 ng/mL', normal: '< 0.04 ng/mL', status: 'Normal' },
      { parameter: 'CK-MB Mass', result: '2.1 ng/mL', normal: '< 5.0 ng/mL', status: 'Normal' },
    ],
    notes: 'Cardiac enzymes serial test 1 of 3: Negative for acute myocardial injury.',
  },
  {
    id: 'LAB-4024',
    patientName: 'Karthik Rao',
    patientId: 'PAT-1090',
    age: '38 / Male',
    testName: 'Liver Function Panel & Bilirubin Profile',
    category: 'Biochemistry',
    doctor: 'Dr. Elizabeth Brooks',
    sampleDate: '2024-10-29',
    technician: 'Samir Khan, MLT',
    status: 'Ready',
    isUrgent: false,
    findings: [
      { parameter: 'ALT (SGPT)', result: '34 U/L', normal: '7 - 56 U/L', status: 'Normal' },
      { parameter: 'AST (SGOT)', result: '28 U/L', normal: '10 - 40 U/L', status: 'Normal' },
      { parameter: 'Total Bilirubin', result: '0.8 mg/dL', normal: '0.2 - 1.2 mg/dL', status: 'Normal' },
    ],
    notes: 'Hepatic transaminases within normal reference limits.',
  },
];

export const HospitalDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('lab'); // Default to 'lab' to match user screenshot
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);
  const [downloadNotice, setDownloadNotice] = useState(null);

  // Sidebar menu items matching exact screenshot
  const navMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'doctors', label: 'Doctors', icon: Stethoscope },
    { id: 'appointments', label: 'Appointments', icon: Calendar, badge: '7', badgeType: 'green' },
    { id: 'departments', label: 'Departments', icon: Building2 },
    { id: 'lab', label: 'Lab Reports', icon: FlaskConical },
    { id: 'rooms', label: 'Rooms & Beds', icon: Bed },
    { id: 'pharmacy', label: 'Pharmacy', icon: Pill },
    { id: 'bloodbank', label: 'Blood Bank', icon: Droplet, badge: '2 Low', badgeType: 'red' },
    { id: 'ambulance', label: 'Ambulance', icon: Truck },
    { id: 'staff', label: 'Staff Management', icon: Briefcase },
    { id: 'attendance', label: 'Attendance', icon: Clock },
    { id: 'dutyroster', label: 'Duty Roster', icon: CalendarCheck },
    { id: 'roles', label: 'Roles & Permissions', icon: Shield },
    { id: 'billing', label: 'Billing & Payments', icon: CreditCard },
  ];

  // Filtered lab reports based on search input and status dropdown
  const filteredReports = useMemo(() => {
    return INITIAL_LAB_REPORTS.filter((item) => {
      const matchSearch =
        searchQuery.trim() === '' ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.testName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus =
        statusFilter === 'all' ||
        (statusFilter === 'ready' && item.status.toLowerCase() === 'ready') ||
        (statusFilter === 'analysis' && item.status.toLowerCase() === 'in analysis') ||
        (statusFilter === 'urgent' && item.isUrgent);

      return matchSearch && matchStatus;
    });
  }, [searchQuery, statusFilter]);

  // Handle Export CSV action
  const handleExportCSV = () => {
    const headers = ['Report ID', 'Patient Name', 'Patient ID', 'Test Name', 'Category', 'Prescribed Doctor', 'Sample Date', 'Technician', 'Status', 'Urgency'];
    const rows = filteredReports.map((r) => [
      r.id,
      `"${r.patientName}"`,
      r.patientId,
      `"${r.testName}"`,
      r.category,
      `"${r.doctor}"`,
      r.sampleDate,
      `"${r.technician}"`,
      r.status,
      r.isUrgent ? 'URGENT STAT' : 'Routine',
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Speshway_Hospital_Lab_Reports_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadNotice('Exported CSV file successfully!');
    setTimeout(() => setDownloadNotice(null), 3000);
  };

  // Handle single report download
  const handleDownloadReport = (report, e) => {
    e.stopPropagation();
    const summary = `
======================================================
SPESHWAY HOSPITALS & HEALTHCARE SYSTEMS
OFFICIAL DIAGNOSTIC & PATHOLOGY REPORT
======================================================
Report ID:      ${report.id}
Status:         ${report.status} ${report.isUrgent ? '[URGENT STAT]' : ''}
Patient:        ${report.patientName} (${report.patientId})
Age/Gender:     ${report.age}
Prescribed By:  ${report.doctor}
Sample Date:    ${report.sampleDate}
Technician:     ${report.technician}
Test Name:      ${report.testName} (${report.category})

FINDINGS & PARAMETERS:
------------------------------------------------------
${report.findings.map((f) => `- ${f.parameter}: ${f.result} [Ref: ${f.normal}] -> ${f.status}`).join('\n')}

CLINICAL NOTES:
${report.notes}
======================================================
Certified by Speshway Hospital Diagnostic Information System
`;
    const blob = new Blob([summary], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.id}_${report.patientName.replace(/\s+/g, '_')}_Report.txt`;
    link.click();
    URL.revokeObjectURL(url);

    setDownloadNotice(`Downloaded diagnostic summary for ${report.patientName}`);
    setTimeout(() => setDownloadNotice(null), 3500);
  };

  return (
    <div className="hosp-erp-root">
      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div
          className="hosp-sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 1. LEFT SIDEBAR */}
      <aside className={`hosp-sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Brand Header */}
        <div className="hosp-sidebar-top">
          <div className="hosp-sidebar-brand">
            <div className="hosp-logo-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" rx="6" fill="#059669" />
                <path d="M12 6v12M6 12h12" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
            <div className="hosp-brand-text">
              <span className="hosp-brand-title">Speshway</span>
              <span className="hosp-brand-sub">HOSPITALS</span>
            </div>
            <button
              type="button"
              className="hosp-sidebar-close"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Menu List */}
          <nav className="hosp-nav-list">
            {navMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`hosp-nav-item ${isActive ? 'active' : ''}`}
                >
                  <Icon size={18} className="hosp-nav-icon" />
                  <span className="hosp-nav-label">{item.label}</span>
                  {item.badge && (
                    <span className={`hosp-badge ${item.badgeType}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Logout */}
        <div className="hosp-sidebar-bottom">
          <button onClick={() => navigate('/products')} className="hosp-btn-portal">
            <ArrowLeft size={16} />
            <span>Speshway Catalog</span>
          </button>
          <div className="hosp-user-profile">
            <div className="hosp-avatar">SH</div>
            <div className="hosp-user-info">
              <span className="hosp-user-name">Chief Medical Admin</span>
              <span className="hosp-user-role">Speshway Hospitals HQ</span>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. MAIN VIEW AREA */}
      <div className="hosp-main-wrapper">
        {/* Top Navbar Header */}
        <header className="hosp-topbar">
          <div className="hosp-topbar-left">
            <div className="hosp-header-title-wrap">
              <button
                type="button"
                className="hosp-menu-toggle"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open navigation menu"
              >
                <Menu size={20} />
              </button>
              <div>
                <h2 className="hosp-system-title">
                  {navMenuItems.find(m => m.id === activeTab)?.label || 'Hospital Management ERP'}
                </h2>
                <span className="hosp-status-pill">
                  <span className="hosp-status-dot" /> Operational
                </span>
              </div>
            </div>
            <Link to="/products" className="dashboard-back-link hosp-back-catalog-link">
              <ArrowLeft size={14} />
              <span>Back</span>
            </Link>
          </div>

          <div className="hosp-topbar-right">
            <button className="hosp-icon-btn" title="System Notifications">
              <Bell size={18} />
              <span className="hosp-notification-dot" />
            </button>
            <div className="hosp-user-profile-top">
              <span className="hosp-role-label">Owner</span>
              <div className="hosp-avatar-circle">O</div>
            </div>
          </div>
        </header>

        {/* Action Toast Notice */}
        {downloadNotice && (
          <div className="hosp-toast-banner">
            <CheckCircle size={16} />
            <span>{downloadNotice}</span>
          </div>
        )}

        {/* Main Content Body */}
        <main className="hosp-content-body">
          {/* TAB: LAB REPORTS (EXACT SCREENSHOT IMPLEMENTATION) */}
          {activeTab === 'lab' && (
            <div className="hosp-lab-view">
              {/* Header Title & Subtitle */}
              <div className="hosp-view-header">
                <div>
                  <h1 className="hosp-page-title">Diagnostic Lab Reports &amp; Pathology</h1>
                  <p className="hosp-page-subtitle">
                    Pathology tests, hematology, MRI/CT scans, biochemistry panels and digital verification
                  </p>
                </div>
                <button onClick={handleExportCSV} className="btn-export-csv">
                  <Download size={15} />
                  <span>Export CSV</span>
                </button>
              </div>

              {/* Search & Filter Bar */}
              <div className="hosp-toolbar-row">
                <div className="hosp-search-box">
                  <Search size={16} className="hosp-search-icon" />
                  <input
                    type="text"
                    placeholder="Search by test name, patient, or Lab ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="hosp-search-input"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="hosp-clear-search">
                      <X size={14} />
                    </button>
                  )}
                </div>

                <div className="hosp-filter-box">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="hosp-status-select"
                  >
                    <option value="all">All Report Statuses</option>
                    <option value="ready">Ready for Discharge / Review</option>
                    <option value="urgent">Urgent STAT Only</option>
                    <option value="analysis">In Analysis</option>
                  </select>
                  <ChevronDown size={14} className="hosp-select-caret" />
                </div>
              </div>

              {/* Pathology Reports Data Table */}
              <div className="hosp-table-card">
                <div className="table-responsive">
                  <table className="hosp-data-table">
                    <thead>
                      <tr>
                        <th style={{ width: '13%' }}>REPORT ID</th>
                        <th style={{ width: '19%' }}>PATIENT DETAILS</th>
                        <th style={{ width: '26%' }}>TEST NAME &amp; CATEGORY</th>
                        <th style={{ width: '16%' }}>PRESCRIBED DOCTOR</th>
                        <th style={{ width: '14%' }}>SAMPLE DATE</th>
                        <th style={{ width: '12%' }}>STATUS</th>
                        <th style={{ width: '10%', textAlign: 'right' }}>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReports.map((report) => (
                        <tr key={report.id} onClick={() => setSelectedReport(report)} className="hosp-row-clickable">
                          {/* 1. REPORT ID */}
                          <td>
                            <div className="hosp-cell-id">
                              <span className="hosp-id-tag">{report.id}</span>
                              {report.isUrgent && (
                                <span className="hosp-stat-badge">URGENT STAT</span>
                              )}
                            </div>
                          </td>

                          {/* 2. PATIENT DETAILS */}
                          <td>
                            <div className="hosp-patient-cell">
                              <strong className="hosp-patient-name">{report.patientName}</strong>
                              <span className="hosp-subtext">{report.patientId}</span>
                            </div>
                          </td>

                          {/* 3. TEST NAME & CATEGORY */}
                          <td>
                            <div className="hosp-test-cell">
                              <strong className="hosp-test-name">{report.testName}</strong>
                              <span className="hosp-subtext">{report.category}</span>
                            </div>
                          </td>

                          {/* 4. PRESCRIBED DOCTOR */}
                          <td>
                            <span className="hosp-doctor-name">{report.doctor}</span>
                          </td>

                          {/* 5. SAMPLE DATE */}
                          <td>
                            <div className="hosp-date-cell">
                              <span className="hosp-sample-date">{report.sampleDate}</span>
                              <span className="hosp-subtext">{report.technician}</span>
                            </div>
                          </td>

                          {/* 6. STATUS */}
                          <td>
                            <span className={`hosp-status-badge ${report.status.toLowerCase().replace(/\s+/g, '-')}`}>
                              {report.status}
                            </span>
                          </td>

                          {/* 7. ACTIONS */}
                          <td>
                            <div className="hosp-actions-group" onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={() => setSelectedReport(report)}
                                className="hosp-action-btn"
                                title="View Diagnostic Report"
                              >
                                <Eye size={17} />
                              </button>
                              <button
                                onClick={(e) => handleDownloadReport(report, e)}
                                className="hosp-action-btn"
                                title="Download Report Summary"
                              >
                                <Download size={17} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {filteredReports.length === 0 && (
                        <tr>
                          <td colSpan={7} className="hosp-empty-state">
                            <AlertCircle size={24} className="empty-icon" />
                            <p>No lab reports matching your search or filter.</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="hosp-overview-view">
              <div className="hosp-view-header">
                <div>
                  <h1 className="hosp-page-title">Hospital Executive Operational Overview</h1>
                  <p className="hosp-page-subtitle">Real-time occupancy, patient intake, emergency response &amp; critical metrics</p>
                </div>
              </div>

              {/* KPI Cards Grid */}
              <div className="hosp-kpi-grid">
                <div className="hosp-kpi-card">
                  <div className="kpi-icon-circ bg-emerald">
                    <HeartPulse size={20} className="text-emerald" />
                  </div>
                  <div>
                    <span className="kpi-label">Active Inpatients</span>
                    <h3 className="kpi-value">284 / 320</h3>
                    <span className="kpi-sub">88.7% Bed Occupancy</span>
                  </div>
                </div>

                <div className="hosp-kpi-card">
                  <div className="kpi-icon-circ bg-blue">
                    <Stethoscope size={20} className="text-blue" />
                  </div>
                  <div>
                    <span className="kpi-label">Doctors On Duty</span>
                    <h3 className="kpi-value">48 Active</h3>
                    <span className="kpi-sub">Across 14 Departments</span>
                  </div>
                </div>

                <div className="hosp-kpi-card">
                  <div className="kpi-icon-circ bg-purple">
                    <FlaskConical size={20} className="text-purple" />
                  </div>
                  <div>
                    <span className="kpi-label">Lab Reports Today</span>
                    <h3 className="kpi-value">116 Tests</h3>
                    <span className="kpi-sub">4 URGENT STAT pending</span>
                  </div>
                </div>

                <div className="hosp-kpi-card">
                  <div className="kpi-icon-circ bg-amber">
                    <Droplet size={20} className="text-amber" />
                  </div>
                  <div>
                    <span className="kpi-label">Blood Bank Units</span>
                    <h3 className="kpi-value">42 Units</h3>
                    <span className="kpi-sub red-alert">2 Groups Low Stock</span>
                  </div>
                </div>
              </div>

              {/* Quick Jump Action */}
              <div className="hosp-card" style={{ marginTop: '24px', padding: '24px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#0f172a' }}>Quick Diagnostics Roster</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '4px' }}>
                  Jump directly to pathology test verifications, doctor prescribed scans and patient diagnostics.
                </p>
                <button onClick={() => setActiveTab('lab')} className="btn-export-csv" style={{ marginTop: '16px' }}>
                  <FlaskConical size={16} /> Open Lab Reports Module &rarr;
                </button>
              </div>
            </div>
          )}

          {/* TAB: PATIENTS */}
          {activeTab === 'patients' && (
            <div className="hosp-overview-view">
              <div className="hosp-view-header">
                <div>
                  <h1 className="hosp-page-title">Patient Admissions &amp; Inpatient Directory</h1>
                  <p className="hosp-page-subtitle">Centralized medical record registry, room allocation &amp; attending physicians</p>
                </div>
              </div>
              <div className="hosp-table-card">
                <table className="hosp-data-table">
                  <thead>
                    <tr>
                      <th>Patient ID</th>
                      <th>Patient Name</th>
                      <th>Age / Gender</th>
                      <th>Ward &amp; Bed</th>
                      <th>Attending Doctor</th>
                      <th>Admission Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span className="hosp-id-tag">PAT-1082</span></td>
                      <td><strong>Eleanor Vance</strong></td>
                      <td>42 / F</td>
                      <td>General Ward &bull; Bed 14</td>
                      <td>Dr. Marcus Chen</td>
                      <td>2024-10-25</td>
                      <td><span className="hosp-status-badge ready">Admitted</span></td>
                    </tr>
                    <tr>
                      <td><span className="hosp-id-tag">PAT-1083</span></td>
                      <td><strong>James Wilson</strong></td>
                      <td>58 / M</td>
                      <td>Neurology ICU &bull; Bed 03</td>
                      <td>Dr. Sarah Al-Mansoor</td>
                      <td>2024-10-27</td>
                      <td><span className="hosp-status-badge in-analysis">Critical Care</span></td>
                    </tr>
                    <tr>
                      <td><span className="hosp-id-tag">PAT-1085</span></td>
                      <td><strong>Sophia Martinez</strong></td>
                      <td>29 / F</td>
                      <td>Maternity Wing &bull; Room 204</td>
                      <td>Dr. Anita Desai</td>
                      <td>2024-10-28</td>
                      <td><span className="hosp-status-badge ready">Observation</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: DOCTORS */}
          {activeTab === 'doctors' && (
            <div className="hosp-table-card">
              <div className="table-header-flex">
                <div className="table-title-wrap">
                  <h3>Consultant Physicians &amp; Surgeons Roster</h3>
                  <span className="table-subtitle">Senior faculty, OPD consulting hours, room allocation, and active inpatient rounds</span>
                </div>
              </div>
              <div className="hosp-table-wrapper">
                <table className="hosp-data-table">
                  <thead>
                    <tr>
                      <th>Doctor ID</th>
                      <th>Specialist Name</th>
                      <th>Clinical Specialty</th>
                      <th>Consultation Cabin</th>
                      <th>OPD Schedule</th>
                      <th>Active Cases</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 'DOC-101', name: 'Dr. Sarah Al-Mansoor', spec: 'Interventional Cardiology', cabin: 'OPD Suite 201', opd: '09:00 AM - 01:00 PM', active: 18, status: 'In OPD' },
                      { id: 'DOC-102', name: 'Dr. Elizabeth Brooks', spec: 'Clinical Endocrinology & Diabetology', cabin: 'OPD Suite 108', opd: '10:00 AM - 02:00 PM', active: 14, status: 'In OPD' },
                      { id: 'DOC-103', name: 'Dr. Anita Desai', spec: 'Obstetrics & Gynaecology', cabin: 'Maternity Wing C-04', opd: '08:30 AM - 01:30 PM', active: 22, status: 'In OT 2' },
                      { id: 'DOC-104', name: 'Dr. Rajesh Sundaram', spec: 'Pulmonology & Critical Care', cabin: 'ICU Block B', opd: '02:00 PM - 06:00 PM', active: 11, status: 'ICU Rounds' },
                      { id: 'DOC-105', name: 'Dr. Ritu Chopra', spec: 'Radiology & Imaging', cabin: 'Imaging Wing Diagnostic B', opd: '08:00 AM - 04:00 PM', active: 31, status: 'Reporting' },
                    ].map((d) => (
                      <tr key={d.id}>
                        <td><span className="code-badge">{d.id}</span></td>
                        <td><strong>{d.name}</strong></td>
                        <td>{d.spec}</td>
                        <td>{d.cabin}</td>
                        <td>{d.opd}</td>
                        <td><strong>{d.active} Inpatients</strong></td>
                        <td><span className="hosp-status-badge ready">{d.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: APPOINTMENTS */}
          {activeTab === 'appointments' && (
            <div className="hosp-table-card">
              <div className="table-header-flex">
                <div className="table-title-wrap">
                  <h3>Outpatient (OPD) Appointment Queue</h3>
                  <span className="table-subtitle">Live token queue, doctor consultation slots, and patient intake status</span>
                </div>
              </div>
              <div className="hosp-table-wrapper">
                <table className="hosp-data-table">
                  <thead>
                    <tr>
                      <th>Token #</th>
                      <th>Patient Name</th>
                      <th>Age / Sex</th>
                      <th>Consulting Doctor</th>
                      <th>Department</th>
                      <th>Time Slot</th>
                      <th>Visit Type</th>
                      <th>Queue Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { token: 'TKN-081', patient: 'Kunal Singhania', age: '38 / M', doc: 'Dr. Sarah Al-Mansoor', dept: 'Cardiology', time: '10:30 AM', type: 'Follow-up', status: 'In Consultation' },
                      { token: 'TKN-082', patient: 'Meera Chawla', age: '45 / F', doc: 'Dr. Elizabeth Brooks', dept: 'Endocrinology', time: '10:45 AM', type: 'First Visit', status: 'Waiting in Lounge' },
                      { token: 'TKN-083', patient: 'Arun Varma', age: '62 / M', doc: 'Dr. Rajesh Sundaram', dept: 'Pulmonology', time: '11:00 AM', type: 'Post-discharge Review', status: 'Vitals Recorded' },
                      { token: 'TKN-084', patient: 'Pooja Hegde', age: '29 / F', doc: 'Dr. Anita Desai', dept: 'Obstetrics', time: '11:15 AM', type: 'Prenatal Routine', status: 'Waiting' },
                    ].map((a) => (
                      <tr key={a.token}>
                        <td><span className="code-badge">{a.token}</span></td>
                        <td><strong>{a.patient}</strong></td>
                        <td>{a.age}</td>
                        <td>{a.doc}</td>
                        <td>{a.dept}</td>
                        <td>{a.time}</td>
                        <td>{a.type}</td>
                        <td>
                          <span className={`hosp-status-badge ${a.status.includes('In Consultation') ? 'ready' : 'in-analysis'}`}>
                            {a.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: DEPARTMENTS */}
          {activeTab === 'departments' && (
            <div className="hosp-table-card">
              <div className="table-header-flex">
                <div className="table-title-wrap">
                  <h3>Clinical &amp; Surgical Departments</h3>
                  <span className="table-subtitle">Bed capacity, department heads, and nursing station metrics</span>
                </div>
              </div>
              <div className="hosp-table-wrapper">
                <table className="hosp-data-table">
                  <thead>
                    <tr>
                      <th>Dept Code</th>
                      <th>Department Name</th>
                      <th>Head of Department (HOD)</th>
                      <th>Total Beds</th>
                      <th>Occupied Beds</th>
                      <th>Occupancy Rate</th>
                      <th>On-Duty Staff</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { code: 'DPT-CARD', name: 'Cardiology & Cath Lab', hod: 'Dr. Sarah Al-Mansoor', beds: 45, occ: 39, rate: '86.7%', staff: 14 },
                      { code: 'DPT-PULM', name: 'Pulmonology & Respiratory ICU', hod: 'Dr. Rajesh Sundaram', beds: 30, occ: 27, rate: '90.0%', staff: 11 },
                      { code: 'DPT-OBGYN', name: 'Obstetrics & Neonatal Care (NICU)', hod: 'Dr. Anita Desai', beds: 40, occ: 34, rate: '85.0%', staff: 16 },
                      { code: 'DPT-ONCO', name: 'Medical Oncology & Daycare Chemo', hod: 'Dr. Elizabeth Brooks', beds: 25, occ: 21, rate: '84.0%', staff: 9 },
                      { code: 'DPT-ORTHO', name: 'Orthopaedics & Joint Replacement', hod: 'Dr. Vivek Menon', beds: 35, occ: 28, rate: '80.0%', staff: 10 },
                    ].map((dp) => (
                      <tr key={dp.code}>
                        <td><span className="code-badge">{dp.code}</span></td>
                        <td><strong>{dp.name}</strong></td>
                        <td>{dp.hod}</td>
                        <td>{dp.beds} Beds</td>
                        <td><strong>{dp.occ} Patients</strong></td>
                        <td><span className="hosp-status-badge ready">{dp.rate}</span></td>
                        <td>{dp.staff} Personnel</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: ROOMS & BEDS */}
          {activeTab === 'rooms' && (
            <div className="hosp-table-card">
              <div className="table-header-flex">
                <div className="table-title-wrap">
                  <h3>Inpatient Beds &amp; ICU Allocation</h3>
                  <span className="table-subtitle">Real-time room occupancy, oxygen telemetry, and nursing call bells</span>
                </div>
              </div>
              <div className="hosp-table-wrapper">
                <table className="hosp-data-table">
                  <thead>
                    <tr>
                      <th>Room / Bed No</th>
                      <th>Ward &amp; Wing</th>
                      <th>Category</th>
                      <th>Patient Name</th>
                      <th>Attending Nurse</th>
                      <th>Daily Tariff</th>
                      <th>Bed Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { bed: 'ICU-B03', ward: 'Critical Care ICU Wing B', cat: 'Intensive Care Bed', patient: 'Vikram Malhotra', nurse: 'Sister Bindu', tariff: '₹14,500', status: 'Occupied (Ventilator)' },
                      { bed: 'RM-304', ward: 'Cardiology Private Suite', cat: 'Single AC Deluxe', patient: 'Eleanor Vance', nurse: 'Sister Rosamma', tariff: '₹6,500', status: 'Occupied' },
                      { bed: 'RM-412', ward: 'Executive Floor 4', cat: 'Presidential Suite', patient: 'Marcus Chen', nurse: 'Sister Kavitha', tariff: '₹12,000', status: 'Occupied' },
                      { bed: 'RM-208', ward: 'General Medical Ward', cat: 'Twin Sharing', patient: 'David Kowalski', nurse: 'Nurse Alex', tariff: '₹3,200', status: 'Occupied' },
                      { bed: 'RM-215', ward: 'Maternity Wing A', cat: 'Private Birthing Suite', patient: 'Vacant', nurse: 'Sister Bindu', tariff: '₹8,000', status: 'Ready & Sanitized' },
                    ].map((rm) => (
                      <tr key={rm.bed}>
                        <td><span className="code-badge">{rm.bed}</span></td>
                        <td>{rm.ward}</td>
                        <td><strong>{rm.cat}</strong></td>
                        <td>{rm.patient}</td>
                        <td>{rm.nurse}</td>
                        <td>{rm.tariff}</td>
                        <td>
                          <span className={`hosp-status-badge ${rm.status.includes('Occupied') ? 'ready' : 'in-analysis'}`}>
                            {rm.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: PHARMACY */}
          {activeTab === 'pharmacy' && (
            <div className="hosp-table-card">
              <div className="table-header-flex">
                <div className="table-title-wrap">
                  <h3>Hospital Formulary &amp; Pharmacy Dispensary</h3>
                  <span className="table-subtitle">Controlled substances, antibiotic stewardship stock, and batch expiry tracking</span>
                </div>
              </div>
              <div className="hosp-table-wrapper">
                <table className="hosp-data-table">
                  <thead>
                    <tr>
                      <th>Drug SKU</th>
                      <th>Medication &amp; Strength</th>
                      <th>Category</th>
                      <th>Batch No</th>
                      <th>Units in Stock</th>
                      <th>Unit Price</th>
                      <th>Expiry Date</th>
                      <th>Stock Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { sku: 'MED-CEFTR-1G', name: 'Ceftriaxone Sodium IV 1g', cat: 'Injectable Antibiotic', batch: 'BT-99014', stock: 450, price: '₹165', exp: '2028-06', status: 'Normal' },
                      { sku: 'MED-ATOR-20', name: 'Atorvastatin Calcium 20mg', cat: 'Cardiovascular', batch: 'BT-88201', stock: 1200, price: '₹18', exp: '2027-11', status: 'Normal' },
                      { sku: 'MED-MERO-1G', name: 'Meropenem Trihydrate 1g IV', cat: 'Broad-Spectrum Antibiotic', batch: 'BT-77402', stock: 85, price: '₹850', exp: '2027-04', status: 'Reorder Warning' },
                      { sku: 'MED-ENX-40', name: 'Enoxaparin Sodium 40mg/0.4mL', cat: 'Anticoagulant Pre-filled', batch: 'BT-66109', stock: 310, price: '₹420', exp: '2028-02', status: 'Normal' },
                      { sku: 'MED-INS-GLAR', name: 'Insulin Glargine 100 IU/mL', cat: 'Diabetic Care Pens', batch: 'BT-55320', stock: 140, price: '₹680', exp: '2027-08', status: 'Normal' },
                    ].map((ph) => (
                      <tr key={ph.sku}>
                        <td><span className="code-badge">{ph.sku}</span></td>
                        <td><strong>{ph.name}</strong></td>
                        <td>{ph.cat}</td>
                        <td>{ph.batch}</td>
                        <td><strong>{ph.stock} Units</strong></td>
                        <td>{ph.price}</td>
                        <td>{ph.exp}</td>
                        <td>
                          <span className={`hosp-status-badge ${ph.status === 'Normal' ? 'ready' : 'in-analysis'}`}>
                            {ph.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: BLOOD BANK */}
          {activeTab === 'bloodbank' && (
            <div className="hosp-table-card">
              <div className="table-header-flex">
                <div className="table-title-wrap">
                  <h3>Transfusion Medicine &amp; Blood Bank Reserve</h3>
                  <span className="table-subtitle">Packed Red Blood Cells (PRBC), Platelets, Fresh Frozen Plasma (FFP) inventories</span>
                </div>
              </div>
              <div className="hosp-table-wrapper">
                <table className="hosp-data-table">
                  <thead>
                    <tr>
                      <th>Blood Group</th>
                      <th>Component Type</th>
                      <th>Units Available</th>
                      <th>Cross-Matched Reserved</th>
                      <th>Storage Cold Temp</th>
                      <th>Critical Threshold</th>
                      <th>Inventory Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { grp: 'O Positive (O+)', comp: 'Packed Red Blood Cells (PRBC)', units: 28, res: 6, temp: '4.2°C', crit: 10, status: 'Adequate' },
                      { grp: 'O Negative (O-)', comp: 'Universal Donor PRBC', units: 4, res: 2, temp: '4.0°C', crit: 8, status: 'Critical Shortage' },
                      { grp: 'A Positive (A+)', comp: 'Packed Red Blood Cells (PRBC)', units: 22, res: 4, temp: '4.1°C', crit: 10, status: 'Adequate' },
                      { grp: 'B Positive (B+)', comp: 'Fresh Frozen Plasma (FFP)', units: 35, res: 8, temp: '-22.5°C', crit: 15, status: 'Adequate' },
                      { grp: 'AB Negative (AB-)', comp: 'Platelet Concentrate', units: 2, res: 1, temp: '22.0°C Agitator', crit: 4, status: 'Donor Recall Active' },
                    ].map((b, i) => (
                      <tr key={i}>
                        <td><strong style={{ fontSize: '1rem', color: '#e11d48' }}>{b.grp}</strong></td>
                        <td>{b.comp}</td>
                        <td><strong style={{ fontSize: '1.05rem' }}>{b.units} Units</strong></td>
                        <td>{b.res} Units</td>
                        <td>{b.temp}</td>
                        <td>{b.crit} Units</td>
                        <td>
                          <span className={`hosp-status-badge ${b.status === 'Adequate' ? 'ready' : 'urgent'}`}>
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: AMBULANCE */}
          {activeTab === 'ambulance' && (
            <div className="hosp-table-card">
              <div className="table-header-flex">
                <div className="table-title-wrap">
                  <h3>Emergency Ambulance Fleet &amp; GPS Telematics</h3>
                  <span className="table-subtitle">Cardiac Advanced Life Support (ALS) and Basic Life Support (BLS) responder units</span>
                </div>
              </div>
              <div className="hosp-table-wrapper">
                <table className="hosp-data-table">
                  <thead>
                    <tr>
                      <th>Ambulance Code</th>
                      <th>Registration Plate</th>
                      <th>Fleet Capability</th>
                      <th>Driver Name</th>
                      <th>Paramedic Assigned</th>
                      <th>Current GPS Location</th>
                      <th>Dispatch Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { code: 'AMB-01 (ALS)', reg: 'KA-01-EA-4401', cap: 'Advanced Cardiac ICU on Wheels', driver: 'Mahesh Kumar', paramedic: 'Rohan Sharma, EMT', loc: 'Base Station Bay 1', status: 'Station Ready' },
                      { code: 'AMB-02 (ALS)', reg: 'KA-01-EA-4402', cap: 'Advanced Trauma Resuscitation', driver: 'Syed Rizwan', paramedic: 'Priya Pillai, EMT', loc: 'Outer Ring Rd, Marathahalli (ETA 12m)', status: 'Active Emergency Trip' },
                      { code: 'AMB-03 (BLS)', reg: 'KA-01-EA-4403', cap: 'Patient Transport & Oxygen Support', driver: 'Gopal Reddy', paramedic: 'Kiran Das, EMT', loc: 'Base Station Bay 2', status: 'Station Ready' },
                      { code: 'AMB-04 (NEO)', reg: 'KA-01-EA-4404', cap: 'Neonatal Transport Incubator', driver: 'Anil Jadhav', paramedic: 'Sister Bindu, NICU', loc: 'Manipal Hospital Transfer', status: 'En Route Hospital' },
                    ].map((amb) => (
                      <tr key={amb.code}>
                        <td><span className="code-badge">{amb.code}</span></td>
                        <td><strong>{amb.reg}</strong></td>
                        <td>{amb.cap}</td>
                        <td>{amb.driver}</td>
                        <td>{amb.paramedic}</td>
                        <td>{amb.loc}</td>
                        <td>
                          <span className={`hosp-status-badge ${amb.status.includes('Ready') ? 'ready' : 'urgent'}`}>
                            {amb.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: STAFF MANAGEMENT */}
          {activeTab === 'staff' && (
            <div className="hosp-table-card">
              <div className="table-header-flex">
                <div className="table-title-wrap">
                  <h3>Clinical Nursing &amp; Hospital Staff Roster</h3>
                  <span className="table-subtitle">Registered nurses, ward attendants, clinical technicians, and support staff</span>
                </div>
              </div>
              <div className="hosp-table-wrapper">
                <table className="hosp-data-table">
                  <thead>
                    <tr>
                      <th>Staff ID</th>
                      <th>Staff Full Name</th>
                      <th>Designation / Role</th>
                      <th>Department Station</th>
                      <th>Shift Timings</th>
                      <th>Contact Phone</th>
                      <th>Duty Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 'STF-301', name: 'Sister Bindu Nair', role: 'Head Nurse (ICU)', dept: 'Critical Care ICU', shift: 'Morning (07:00 - 15:30)', phone: '+91 98450-22114', status: 'On Floor Duty' },
                      { id: 'STF-302', name: 'Samir Khan, MLT', role: 'Senior Pathology Technologist', dept: 'Pathology Diagnostics', shift: 'General (09:00 - 18:00)', phone: '+91 98200-88776', status: 'In Lab' },
                      { id: 'STF-303', name: 'Sister Rosamma Philip', role: 'Senior Staff Nurse', dept: 'Cardiology Ward 3', shift: 'Morning (07:00 - 15:30)', phone: '+91 97110-44332', status: 'On Floor Duty' },
                      { id: 'STF-304', name: 'Karthik Rao, R.Ph', role: 'Chief Clinical Pharmacist', dept: 'Central Pharmacy', shift: 'General (08:30 - 17:30)', phone: '+91 99000-55441', status: 'Dispensary' },
                      { id: 'STF-305', name: 'Rohan Sharma, EMT', role: 'Emergency Medical Tech', dept: 'Emergency & Trauma ER', shift: 'Night On-Call', phone: '+91 94440-99887', status: 'Ambulance Bay' },
                    ].map((st) => (
                      <tr key={st.id}>
                        <td><span className="code-badge">{st.id}</span></td>
                        <td><strong>{st.name}</strong></td>
                        <td>{st.role}</td>
                        <td>{st.dept}</td>
                        <td>{st.shift}</td>
                        <td>{st.phone}</td>
                        <td><span className="hosp-status-badge ready">{st.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: ATTENDANCE */}
          {activeTab === 'attendance' && (
            <div className="hosp-table-card">
              <div className="table-header-flex">
                <div className="table-title-wrap">
                  <h3>Biometric Shift Punch Logs &amp; Attendance</h3>
                  <span className="table-subtitle">Turnstile facial recognition and RFID badge time-clock synchronizations</span>
                </div>
              </div>
              <div className="hosp-table-wrapper">
                <table className="hosp-data-table">
                  <thead>
                    <tr>
                      <th>Staff Code</th>
                      <th>Employee Name</th>
                      <th>Department</th>
                      <th>Shift Assigned</th>
                      <th>Clock-In Timestamp</th>
                      <th>Biometric Gate</th>
                      <th>Shift Verification</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { code: 'DOC-101', name: 'Dr. Sarah Al-Mansoor', dept: 'Cardiology', shift: 'Morning Shift', in: '08:42 AM', gate: 'Doctors Private Entrance G-1', status: 'On Time (Biometric)' },
                      { code: 'DOC-102', name: 'Dr. Elizabeth Brooks', dept: 'Endocrinology', shift: 'Morning Shift', in: '09:12 AM', gate: 'Doctors Private Entrance G-1', status: 'On Time (Biometric)' },
                      { code: 'STF-301', name: 'Sister Bindu Nair', dept: 'ICU Critical Care', shift: 'Morning Shift', in: '06:54 AM', gate: 'Staff Turnstile Gate 3', status: 'Early Clock-in' },
                      { code: 'STF-302', name: 'Samir Khan, MLT', dept: 'Pathology Diagnostics', shift: 'General Shift', in: '08:55 AM', gate: 'Diagnostic Wing Gate 2', status: 'On Time (Biometric)' },
                    ].map((at) => (
                      <tr key={at.code}>
                        <td><span className="code-badge">{at.code}</span></td>
                        <td><strong>{at.name}</strong></td>
                        <td>{at.dept}</td>
                        <td>{at.shift}</td>
                        <td><strong>{at.in}</strong></td>
                        <td>{at.gate}</td>
                        <td><span className="hosp-status-badge ready">{at.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: DUTY ROSTER */}
          {activeTab === 'dutyroster' && (
            <div className="hosp-table-card">
              <div className="table-header-flex">
                <div className="table-title-wrap">
                  <h3>Clinical Duty &amp; Night Call Roster</h3>
                  <span className="table-subtitle">Consultant coverage, Code Blue emergency team, and resident physician rotations</span>
                </div>
              </div>
              <div className="hosp-table-wrapper">
                <table className="hosp-data-table">
                  <thead>
                    <tr>
                      <th>Department Block</th>
                      <th>Lead Consultant</th>
                      <th>Senior Resident Dr</th>
                      <th>Nursing Shift In-Charge</th>
                      <th>Code Blue Responder</th>
                      <th>Night On-Call Dr</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { dept: 'Cardiology & Cath Lab', lead: 'Dr. Sarah Al-Mansoor', res: 'Dr. Pradeep V.', inCharge: 'Sister Rosamma', codeBlue: 'Active Lead', night: 'Dr. Sarah (On-Call)' },
                      { dept: 'ICU & Critical Care', lead: 'Dr. Rajesh Sundaram', res: 'Dr. Meenakshi K.', inCharge: 'Sister Bindu Nair', codeBlue: 'ICU Intensivist Team', night: 'Dr. Rajesh Sundaram' },
                      { dept: 'Emergency & Trauma ER', lead: 'Dr. Michael Vance', res: 'Dr. Tarun Sen', inCharge: 'Sister Kavitha', codeBlue: 'ER Fast Response Team', night: 'Dr. Michael Vance' },
                      { dept: 'Obstetrics & Labour Room', lead: 'Dr. Anita Desai', res: 'Dr. Shweta Rao', inCharge: 'Sister Mary Joseph', codeBlue: 'OBGYN OT Standby', night: 'Dr. Shweta Rao' },
                    ].map((ro, i) => (
                      <tr key={i}>
                        <td><strong>{ro.dept}</strong></td>
                        <td>{ro.lead}</td>
                        <td>{ro.res}</td>
                        <td>{ro.inCharge}</td>
                        <td><span className="hosp-status-badge urgent">{ro.codeBlue}</span></td>
                        <td>{ro.night}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: ROLES & PERMISSIONS */}
          {activeTab === 'roles' && (
            <div className="hosp-table-card">
              <div className="table-header-flex">
                <div className="table-title-wrap">
                  <h3>Hospital RBAC &amp; Clinical Security Privileges</h3>
                  <span className="table-subtitle">Prescribing authority, narcotics sign-off, diagnostic report verification clearance</span>
                </div>
              </div>
              <div className="hosp-table-wrapper">
                <table className="hosp-data-table">
                  <thead>
                    <tr>
                      <th>Access Tier</th>
                      <th>Role Description</th>
                      <th>Department Scope</th>
                      <th>EHR Write Access</th>
                      <th>Controlled Drug Sign-off</th>
                      <th>Staff Assigned</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { tier: 'Tier 1 - Chief Medical Officer', role: 'CMO & Medical Director', scope: 'Hospital Wide', ehr: 'Full Unrestricted', drugs: 'Full Sign-off & Audit', count: '2 Officers' },
                      { tier: 'Tier 2 - Consultant Physician', role: 'Attending Specialists & Surgeons', scope: 'Respective Department', ehr: 'Clinical Notes, Rx, OT Orders', drugs: 'Prescription Level', count: '38 Doctors' },
                      { tier: 'Tier 3 - Nursing Supervisor', role: 'Head Nurses & Ward In-Charges', scope: 'Assigned Floor/Ward', ehr: 'Vitals, MAR Dispensing Logs', drugs: 'Witness Double Verification', count: '14 Nurses' },
                      { tier: 'Tier 4 - Laboratory Diagnostician', role: 'Pathologists & Radiologists', scope: 'Central Diagnostics', ehr: 'Diagnostic Findings & Signoff', drugs: 'No Access', count: '8 Technologists' },
                    ].map((rl, i) => (
                      <tr key={i}>
                        <td><strong style={{ color: '#059669' }}>{rl.tier}</strong></td>
                        <td>{rl.role}</td>
                        <td>{rl.scope}</td>
                        <td>{rl.ehr}</td>
                        <td><span className="hosp-status-badge ready">{rl.drugs}</span></td>
                        <td>{rl.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: BILLING & PAYMENTS */}
          {activeTab === 'billing' && (
            <div className="hosp-table-card">
              <div className="table-header-flex">
                <div className="table-title-wrap">
                  <h3>Inpatient Folios, TPA Insurance &amp; Discharge Billing</h3>
                  <span className="table-subtitle">Pre-authorization status, room tariffs, surgical consumables, and final discharge settled</span>
                </div>
              </div>
              <div className="hosp-table-wrapper">
                <table className="hosp-data-table">
                  <thead>
                    <tr>
                      <th>Bill / Folio #</th>
                      <th>Patient Name</th>
                      <th>Admission Date</th>
                      <th>Room Charges</th>
                      <th>Procedures / OT</th>
                      <th>Pharmacy &amp; Lab</th>
                      <th>Insurance TPA Claim</th>
                      <th>Patient Share</th>
                      <th>Payment Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { bill: 'IPB-2024-991', patient: 'Eleanor Vance', date: '2024-10-24', room: '₹39,000', ot: '₹65,000', ph: '₹14,250', tpa: '₹1,00,000 (Star Health Approved)', pat: '₹18,250', status: 'Pre-Auth Approved' },
                      { bill: 'IPB-2024-992', patient: 'Vikram Malhotra', date: '2024-10-26', room: '₹87,000', ot: '₹1,20,000', ph: '₹34,800', tpa: '₹2,10,000 (HDFC Ergo Pending)', pat: '₹31,800', status: 'TPA Processing' },
                      { bill: 'IPB-2024-993', patient: 'James Wilson', date: '2024-10-28', room: '₹26,000', ot: '₹0 (Diagnostic)', ph: '₹8,500', tpa: '₹0 (Self Pay)', pat: '₹34,500', status: 'Settled (Credit Card)' },
                      { bill: 'IPB-2024-994', patient: 'David Kowalski', date: '2024-10-27', room: '₹19,200', ot: '₹42,000', ph: '₹11,400', tpa: '₹60,000 (ICICI Lombard Approved)', pat: '₹12,600', status: 'Ready for Discharge' },
                    ].map((bl) => (
                      <tr key={bl.bill}>
                        <td><span className="code-badge">{bl.bill}</span></td>
                        <td><strong>{bl.patient}</strong></td>
                        <td>{bl.date}</td>
                        <td>{bl.room}</td>
                        <td>{bl.ot}</td>
                        <td>{bl.ph}</td>
                        <td><strong style={{ color: '#2563eb' }}>{bl.tpa}</strong></td>
                        <td><strong style={{ color: '#059669' }}>{bl.pat}</strong></td>
                        <td><span className="hosp-status-badge ready">{bl.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* 3. REPORT DETAIL MODAL */}
      {selectedReport && (
        <div className="hosp-modal-overlay" onClick={() => setSelectedReport(null)}>
          <div className="hosp-report-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top-bar">
              <div className="hospital-badge-top">
                <FileCheck size={18} className="text-emerald" />
                <span>Verified Diagnostic Pathology Report</span>
              </div>
              <button onClick={() => setSelectedReport(null)} className="hosp-close-btn">
                <X size={18} />
              </button>
            </div>

            <div className="report-paper-body">
              {/* Report Header */}
              <div className="report-paper-header">
                <div>
                  <h2 className="report-hosp-name">SPESHWAY MEMORIAL HOSPITAL</h2>
                  <p className="report-hosp-meta">Department of Diagnostic Pathology &bull; Accreditation ISO 15189</p>
                </div>
                <div className="report-cert-box">
                  <span className="cert-id">{selectedReport.id}</span>
                  {selectedReport.isUrgent && <span className="urgent-stamp">STAT URGENT</span>}
                </div>
              </div>

              {/* Patient & Doctor metadata grid */}
              <div className="report-meta-grid">
                <div>
                  <span className="meta-lbl">Patient Full Name:</span>
                  <strong className="meta-val">{selectedReport.patientName}</strong>
                </div>
                <div>
                  <span className="meta-lbl">Patient ID (UHID):</span>
                  <span className="meta-val">{selectedReport.patientId}</span>
                </div>
                <div>
                  <span className="meta-lbl">Age / Gender:</span>
                  <span className="meta-val">{selectedReport.age}</span>
                </div>
                <div>
                  <span className="meta-lbl">Prescribed Physician:</span>
                  <strong className="meta-val text-emerald">{selectedReport.doctor}</strong>
                </div>
                <div>
                  <span className="meta-lbl">Collection / Sample Date:</span>
                  <span className="meta-val">{selectedReport.sampleDate}</span>
                </div>
                <div>
                  <span className="meta-lbl">Verified By MLT:</span>
                  <span className="meta-val">{selectedReport.technician}</span>
                </div>
              </div>

              {/* Test Name Header */}
              <div className="test-banner-card">
                <h3>{selectedReport.testName}</h3>
                <span className="category-pill">{selectedReport.category}</span>
              </div>

              {/* Findings Table */}
              <table className="report-findings-table">
                <thead>
                  <tr>
                    <th>Test Parameter</th>
                    <th>Observed Result</th>
                    <th>Biological Reference Range</th>
                    <th>Flag</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedReport.findings.map((f, i) => (
                    <tr key={i}>
                      <td><strong>{f.parameter}</strong></td>
                      <td><span className="finding-result">{f.result}</span></td>
                      <td>{f.normal}</td>
                      <td>
                        <span className={`flag-badge ${f.status.toLowerCase()}`}>
                          {f.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pathologist Notes */}
              <div className="report-notes-box">
                <span className="notes-lbl">Pathologist Clinical Interpretation:</span>
                <p>{selectedReport.notes}</p>
              </div>

              {/* Footer Sign-off */}
              <div className="report-sign-footer">
                <div className="qr-box">
                  <div className="dummy-barcode" />
                  <span>Digitally Signed &bull; Electronic Health Record (EHR) Sync</span>
                </div>
                <div className="sign-block">
                  <div className="signature-line" />
                  <span>Authorized Medical Laboratory Director</span>
                </div>
              </div>
            </div>

            <div className="modal-footer-actions">
              <button onClick={() => window.print()} className="btn-print-report">
                <Printer size={16} /> Print Report
              </button>
              <button onClick={(e) => handleDownloadReport(selectedReport, e)} className="btn-download-report">
                <Download size={16} /> Download Copy (.txt)
              </button>
              <button onClick={() => setSelectedReport(null)} className="btn-close-modal">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default HospitalDashboard;

