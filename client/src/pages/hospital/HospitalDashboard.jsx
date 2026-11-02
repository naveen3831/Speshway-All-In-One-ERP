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
      {/* 1. LEFT SIDEBAR */}
      <aside className="hosp-sidebar">
        {/* Brand Header */}
        <div className="hosp-sidebar-brand">
          <div className="hosp-logo-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="6" fill="#0284c7" />
              <path d="M12 6v12M6 12h12" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          <div className="hosp-brand-text">
            <span className="hosp-brand-title">Speshway</span>
            <span className="hosp-brand-sub">HOSPITALS</span>
          </div>
        </div>

        {/* Navigation Menu List */}
        <nav className="hosp-nav-list">
          {navMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
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

        {/* Sidebar Footer Logout */}
        <div className="hosp-sidebar-footer">
          <button
            onClick={() => navigate('/product/speshway-hospitals')}
            className="hosp-nav-item logout"
            title="Return to Speshway ERP Catalog"
          >
            <LogOut size={18} className="hosp-nav-icon" />
            <span className="hosp-nav-label">Logout</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN VIEW AREA */}
      <div className="hosp-main-wrapper">
        {/* Top Navbar Header */}
        <header className="hosp-topbar">
          <div className="hosp-topbar-left">
            <h2 className="hosp-system-title">Hospital Management ERP</h2>
            <span className="hosp-status-pill">
              <span className="hosp-status-dot" /> Operational
            </span>
            <Link to="/product/speshway-hospitals" className="hosp-back-catalog-link">
              <ArrowLeft size={13} />
              <span>Back to Overview</span>
            </Link>
          </div>

          <div className="hosp-topbar-right">
            <button className="hosp-icon-btn" title="System Notifications">
              <Bell size={18} />
              <span className="hosp-notification-dot" />
            </button>
            <div className="hosp-user-profile">
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

          {/* OTHER TABS FALLBACK */}
          {activeTab !== 'lab' && activeTab !== 'dashboard' && activeTab !== 'patients' && (
            <div className="hosp-empty-view-card">
              <div className="hosp-empty-circ">
                <Building2 size={32} className="text-emerald" />
              </div>
              <h2>{navMenuItems.find((m) => m.id === activeTab)?.label || 'Hospital Department'}</h2>
              <p>
                Department operational workflows, real-time telemetry, and staff scheduling are connected to the central hospital network.
              </p>
              <button onClick={() => setActiveTab('lab')} className="btn-export-csv" style={{ marginTop: '16px' }}>
                &larr; Return to Diagnostic Lab Reports
              </button>
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

