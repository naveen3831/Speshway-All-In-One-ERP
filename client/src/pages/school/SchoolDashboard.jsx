import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  Award,
  DollarSign,
  ArrowLeft,
  Search,
  Plus,
  TrendingUp,
  CheckCircle2,
  FileCheck,
  Clock,
  Phone,
  BookMarked,
  Layers,
  Menu,
  X,
} from 'lucide-react';
import '../shared/IndustryDashboard.css';

const STUDENTS = [
  { id: 'STU-2026-01', name: 'Aarav Sharma', grade: 'Grade 10 - Section A', roll: '10A-14', feeStatus: 'Paid', attendance: '96.5%', parent: 'Rajesh Sharma', phone: '+91 98765 43210' },
  { id: 'STU-2026-02', name: 'Ishita Nair', grade: 'Grade 12 - Science', roll: '12S-08', feeStatus: 'Paid', attendance: '98.2%', parent: 'Deepak Nair', phone: '+91 98450 12345' },
  { id: 'STU-2026-03', name: 'Rohan Mehra', grade: 'Grade 8 - Section B', roll: '8B-22', feeStatus: 'Pending Term 2', attendance: '88.0%', parent: 'Sunita Mehra', phone: '+91 97110 56789' },
  { id: 'STU-2026-04', name: 'Zoya Khan', grade: 'Grade 11 - Commerce', roll: '11C-03', feeStatus: 'Paid', attendance: '95.0%', parent: 'Tariq Khan', phone: '+91 98200 98765' },
  { id: 'STU-2026-05', name: 'Aditya Patel', grade: 'Grade 9 - Section C', roll: '9C-19', feeStatus: 'Overdue', attendance: '91.4%', parent: 'Manish Patel', phone: '+91 99000 11223' },
  { id: 'STU-2026-06', name: 'Kavya Subramanian', grade: 'Grade 10 - Section B', roll: '10B-07', feeStatus: 'Paid', attendance: '99.1%', parent: 'S. Ramanathan', phone: '+91 94440 33445' },
];

const TEACHERS = [
  { id: 'TCH-101', name: 'Dr. Alok Verma', subject: 'Advanced Physics', classes: 'Grades 11 & 12', qualification: 'Ph.D Physics (IIT Bombay)', phone: '+91 98230-11223', status: 'Active (On Duty)' },
  { id: 'TCH-102', name: 'Meenakshi Iyer', subject: 'Mathematics & Calculus', classes: 'Grades 9 & 10', qualification: 'M.Sc Maths, B.Ed', phone: '+91 98451-99887', status: 'Active (On Duty)' },
  { id: 'TCH-103', name: 'David Reynolds', subject: 'English Literature', classes: 'Grades 8 - 12', qualification: 'M.A English (Oxford)', phone: '+91 97112-33445', status: 'Active (Class 10A)' },
  { id: 'TCH-104', name: 'Sunita Deshpande', subject: 'Organic Chemistry', classes: 'Grades 11 & 12', qualification: 'M.Sc Chemistry, CSIR-NET', phone: '+91 99001-55667', status: 'Active (Lab Prep)' },
  { id: 'TCH-105', name: 'Karthik Raja', subject: 'Computer Science & AI', classes: 'Grades 9 - 12', qualification: 'B.Tech CS, MCA', phone: '+91 94445-66778', status: 'Active (CS Lab)' },
];

const ATTENDANCE_REGISTER = [
  { grade: 'Grade 10 - Section A', enrolled: 42, present: 41, absent: 1, rate: '97.6%', teacher: 'David Reynolds', status: 'Submitted' },
  { grade: 'Grade 10 - Section B', enrolled: 40, present: 38, absent: 2, rate: '95.0%', teacher: 'Meenakshi Iyer', status: 'Submitted' },
  { grade: 'Grade 11 - Science', enrolled: 38, present: 36, absent: 2, rate: '94.7%', teacher: 'Dr. Alok Verma', status: 'Submitted' },
  { grade: 'Grade 11 - Commerce', enrolled: 35, present: 34, absent: 1, rate: '97.1%', teacher: 'Ramesh Sundaram', status: 'Submitted' },
  { grade: 'Grade 12 - Science', enrolled: 45, present: 44, absent: 1, rate: '97.8%', teacher: 'Sunita Deshpande', status: 'Submitted' },
  { grade: 'Grade 12 - Commerce', enrolled: 36, present: 35, absent: 1, rate: '97.2%', teacher: 'Ananya Roy', status: 'Submitted' },
];

const FEE_COLLECTIONS = [
  { challanNo: 'CHL-2026-801', student: 'Aarav Sharma', grade: 'Grade 10A', term: 'Term 2 (2026)', totalFee: '₹48,000', paid: '₹48,000', balance: '₹0', method: 'UPI / Netbanking', status: 'Paid in Full' },
  { challanNo: 'CHL-2026-802', student: 'Ishita Nair', grade: 'Grade 12S', term: 'Term 2 (2026)', totalFee: '₹56,000', paid: '₹56,000', balance: '₹0', method: 'Debit Card POS', status: 'Paid in Full' },
  { challanNo: 'CHL-2026-803', student: 'Rohan Mehra', grade: 'Grade 8B', term: 'Term 2 (2026)', totalFee: '₹42,000', paid: '₹20,000', balance: '₹22,000', method: 'Cheque Pending', status: 'Partial (Pending)' },
  { challanNo: 'CHL-2026-804', student: 'Aditya Patel', grade: 'Grade 9C', term: 'Term 2 (2026)', totalFee: '₹44,000', paid: '₹0', balance: '₹44,000', method: 'Unpaid', status: 'Overdue (Notice Sent)' },
  { challanNo: 'CHL-2026-805', student: 'Kavya Subramanian', grade: 'Grade 10B', term: 'Term 2 (2026)', totalFee: '₹48,000', paid: '₹48,000', balance: '₹0', method: 'Bank Wire', status: 'Paid in Full' },
];

const EXAM_SCHEDULE = [
  { exam: 'Term 1 Mid-Term Assessments', grade: 'Grades 9 - 12', dates: '15 Nov - 25 Nov 2026', avgScore: '84.2%', papers: '6 Subjects', status: 'Hall Tickets Issued' },
  { exam: 'CBSE Pre-Board Mock Exam 1', grade: 'Grades 10 & 12', dates: '02 Dec - 12 Dec 2026', avgScore: 'Pending', papers: '5 Subjects', status: 'Timetable Published' },
  { exam: 'STEM Olympiad & Math League', grade: 'Grades 6 - 10', dates: '20 Nov 2026', avgScore: '89.5%', papers: 'Online CBT', status: 'Registrations Closed' },
  { exam: 'Annual Practical Laboratory Viva', grade: 'Grades 11 & 12', dates: '08 Dec - 15 Dec 2026', avgScore: 'Pending', papers: 'Physics, Chem, Bio, CS', status: 'External Examiners Assigned' },
];

export const SchoolDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('students');
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');

  const filteredStudents = STUDENTS.filter((s) => {
    const matchStatus = filterStatus === 'all' || s.feeStatus.toLowerCase().includes(filterStatus);
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.grade.toLowerCase().includes(search.toLowerCase());
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
          <div className="ind-brand-icon-box" style={{ backgroundColor: '#8b5cf6' }}>
            <GraduationCap size={22} color="#ffffff" />
          </div>
          <div className="ind-brand-text">
            <span className="ind-brand-name">EduSphere</span>
            <span className="ind-brand-sub" style={{ color: '#c4b5fd' }}>School ERP</span>
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
            <LayoutDashboard size={18} /> Overview
          </button>
          <button onClick={() => { setActiveNav('students'); setSidebarOpen(false); }} className={`ind-nav-btn ${activeNav === 'students' ? 'active' : ''}`}>
            <Users size={18} /> Students &amp; Classes <span className="ind-nav-badge">6</span>
          </button>
          <button onClick={() => { setActiveNav('teachers'); setSidebarOpen(false); }} className={`ind-nav-btn ${activeNav === 'teachers' ? 'active' : ''}`}>
            <Award size={18} /> Teachers &amp; Faculty <span className="ind-nav-badge">5</span>
          </button>
          <button onClick={() => { setActiveNav('attendance'); setSidebarOpen(false); }} className={`ind-nav-btn ${activeNav === 'attendance' ? 'active' : ''}`}>
            <Calendar size={18} /> Attendance Register
          </button>
          <button onClick={() => { setActiveNav('fees'); setSidebarOpen(false); }} className={`ind-nav-btn ${activeNav === 'fees' ? 'active' : ''}`}>
            <DollarSign size={18} /> Fee Collections
          </button>
          <button onClick={() => { setActiveNav('exams'); setSidebarOpen(false); }} className={`ind-nav-btn ${activeNav === 'exams' ? 'active' : ''}`}>
            <BookOpen size={18} /> Exams &amp; Report Cards
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
            <button
              type="button"
              className="ind-menu-toggle"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu size={20} />
            </button>
            <button onClick={() => navigate('/')} className="ind-back-pill">
              <ArrowLeft size={14} /> Back to Speshway ERP
            </button>
            <div className="ind-live-chip">
              <span className="ind-live-dot" /> Live School &amp; Academy ERP
            </div>
          </div>
          <div className="ind-topbar-right">
            <div className="ind-search-box">
              <Search size={15} color="#94a3b8" />
              <input
                type="text"
                placeholder="Search student, teacher, roll no..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="ind-user-profile">
              <div className="ind-user-avatar" style={{ backgroundColor: '#8b5cf6' }}>PR</div>
              <div className="ind-user-meta">
                <span className="ind-user-name">Principal Desk</span>
                <span className="ind-user-role">Academic Director</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="ind-content-body">
          <div className="ind-body-header">
            <div>
              <h1 className="ind-body-title">
                {activeNav === 'dash' && 'Academic Command Center & Live Campus Insights'}
                {activeNav === 'students' && 'Students Registry & Section Allocation'}
                {activeNav === 'teachers' && 'Faculty Roster & Department Staff'}
                {activeNav === 'attendance' && 'Daily Attendance Logs & Section Tallies'}
                {activeNav === 'fees' && 'Tuition & Transport Fee Reconciliation'}
                {activeNav === 'exams' && 'Examinations Schedule & Performance Analytics'}
              </h1>
              <p className="ind-body-sub">Student admissions, staff biometric attendance, term exams, fee collection, and grade transcripts.</p>
            </div>
            <button className="ind-action-primary" style={{ backgroundColor: '#8b5cf6' }}>
              <Plus size={16} /> Enroll New Student
            </button>
          </div>

          {/* 4 KPIs */}
          <div className="ind-kpi-grid">
            <div className="ind-kpi-card">
              <div className="ind-kpi-info">
                <span className="ind-kpi-label">Total Enrolled</span>
                <span className="ind-kpi-val">1,240</span>
                <span className="ind-kpi-trend"><TrendingUp size={12} /> +12% Admissions</span>
              </div>
              <div className="ind-kpi-icon-circ" style={{ backgroundColor: '#f5f3ff', color: '#7c3aed' }}>
                <Users size={22} />
              </div>
            </div>

            <div className="ind-kpi-card">
              <div className="ind-kpi-info">
                <span className="ind-kpi-label">Today's Attendance</span>
                <span className="ind-kpi-val">95.4%</span>
                <span className="ind-kpi-trend"><CheckCircle2 size={12} /> 1,183 Present</span>
              </div>
              <div className="ind-kpi-icon-circ" style={{ backgroundColor: '#ecfdf5', color: '#10b981' }}>
                <CheckCircle2 size={22} />
              </div>
            </div>

            <div className="ind-kpi-card">
              <div className="ind-kpi-info">
                <span className="ind-kpi-label">Faculty Staff</span>
                <span className="ind-kpi-val">74 Teachers</span>
                <span className="ind-kpi-trend">1:16 Student-Teacher Ratio</span>
              </div>
              <div className="ind-kpi-icon-circ" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
                <Award size={22} />
              </div>
            </div>

            <div className="ind-kpi-card">
              <div className="ind-kpi-info">
                <span className="ind-kpi-label">Term Fee Collections</span>
                <span className="ind-kpi-val">₹48.2L</span>
                <span className="ind-kpi-trend">92% Collected</span>
              </div>
              <div className="ind-kpi-icon-circ" style={{ backgroundColor: '#fffbeb', color: '#d97706' }}>
                <DollarSign size={22} />
              </div>
            </div>
          </div>

          {/* TAB 1: STUDENTS */}
          {(activeNav === 'dash' || activeNav === 'students') && (
            <div className="ind-card-container">
              <div className="ind-table-controls">
                <div className="ind-tabs-row">
                  <button onClick={() => setFilterStatus('all')} className={`ind-tab-pill ${filterStatus === 'all' ? 'active' : ''}`}>All Students</button>
                  <button onClick={() => setFilterStatus('paid')} className={`ind-tab-pill ${filterStatus === 'paid' ? 'active' : ''}`}>Fees Paid</button>
                  <button onClick={() => setFilterStatus('pending')} className={`ind-tab-pill ${filterStatus === 'pending' ? 'active' : ''}`}>Pending Fees</button>
                </div>
              </div>

              <div className="ind-table-wrap">
                <table className="ind-data-table">
                  <thead>
                    <tr>
                      <th>Admission No</th>
                      <th>Student Name</th>
                      <th>Grade / Section</th>
                      <th>Roll No</th>
                      <th>Parent / Guardian</th>
                      <th>Attendance</th>
                      <th>Fee Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((s) => (
                      <tr key={s.id}>
                        <td><span className="ind-code-tag">{s.id}</span></td>
                        <td><strong>{s.name}</strong></td>
                        <td>{s.grade}</td>
                        <td>{s.roll}</td>
                        <td>{s.parent}</td>
                        <td><strong>{s.attendance}</strong></td>
                        <td>
                          <span className={`ind-status-badge ${s.feeStatus === 'Paid' ? 'badge-green' : s.feeStatus.includes('Pending') ? 'badge-amber' : 'badge-rose'}`}>
                            {s.feeStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: TEACHERS & FACULTY */}
          {activeNav === 'teachers' && (
            <div className="ind-card-container">
              <div className="ind-table-controls">
                <div className="ind-tabs-row">
                  <button className="ind-tab-pill active">Teaching Faculty (5)</button>
                  <button className="ind-tab-pill">Senior HODs</button>
                </div>
              </div>
              <div className="ind-table-wrap">
                <table className="ind-data-table">
                  <thead>
                    <tr>
                      <th>Emp Code</th>
                      <th>Faculty Name</th>
                      <th>Department &amp; Subject</th>
                      <th>Assigned Classes</th>
                      <th>Educational Qualification</th>
                      <th>Contact Phone</th>
                      <th>Current Duty Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TEACHERS.map((t) => (
                      <tr key={t.id}>
                        <td><span className="ind-code-tag">{t.id}</span></td>
                        <td><strong>{t.name}</strong></td>
                        <td>{t.subject}</td>
                        <td>{t.classes}</td>
                        <td>{t.qualification}</td>
                        <td><Phone size={13} style={{ display: 'inline', marginRight: 4 }} />{t.phone}</td>
                        <td>
                          <span className="ind-status-badge badge-green">{t.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ATTENDANCE REGISTER */}
          {activeNav === 'attendance' && (
            <div className="ind-card-container">
              <div className="ind-table-controls">
                <div className="ind-tabs-row">
                  <button className="ind-tab-pill active">Today's Class Rosters</button>
                  <button className="ind-tab-pill">Weekly Average</button>
                </div>
              </div>
              <div className="ind-table-wrap">
                <table className="ind-data-table">
                  <thead>
                    <tr>
                      <th>Grade &amp; Section</th>
                      <th>Enrolled Strength</th>
                      <th>Present Count</th>
                      <th>Absentees</th>
                      <th>Attendance %</th>
                      <th>Class Teacher</th>
                      <th>Log Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ATTENDANCE_REGISTER.map((a, i) => (
                      <tr key={i}>
                        <td><strong>{a.grade}</strong></td>
                        <td>{a.enrolled} Students</td>
                        <td><strong style={{ color: '#059669' }}>{a.present}</strong></td>
                        <td><strong style={{ color: '#e11d48' }}>{a.absent}</strong></td>
                        <td><span className="ind-status-badge badge-green">{a.rate}</span></td>
                        <td>{a.teacher}</td>
                        <td><span className="ind-status-badge badge-blue">{a.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: FEE COLLECTIONS */}
          {activeNav === 'fees' && (
            <div className="ind-card-container">
              <div className="ind-table-controls">
                <div className="ind-tabs-row">
                  <button className="ind-tab-pill active">Term 2 Collections (5)</button>
                  <button className="ind-tab-pill">Overdue Notices</button>
                </div>
              </div>
              <div className="ind-table-wrap">
                <table className="ind-data-table">
                  <thead>
                    <tr>
                      <th>Challan No</th>
                      <th>Student Name</th>
                      <th>Grade</th>
                      <th>Term</th>
                      <th>Total Fee</th>
                      <th>Amount Paid</th>
                      <th>Balance Due</th>
                      <th>Payment Channel</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FEE_COLLECTIONS.map((f) => (
                      <tr key={f.challanNo}>
                        <td><span className="ind-code-tag">{f.challanNo}</span></td>
                        <td><strong>{f.student}</strong></td>
                        <td>{f.grade}</td>
                        <td>{f.term}</td>
                        <td>{f.totalFee}</td>
                        <td><strong style={{ color: '#059669' }}>{f.paid}</strong></td>
                        <td><strong style={{ color: f.balance !== '₹0' ? '#e11d48' : '#64748b' }}>{f.balance}</strong></td>
                        <td>{f.method}</td>
                        <td>
                          <span className={`ind-status-badge ${f.status.includes('Full') ? 'badge-green' : f.status.includes('Partial') ? 'badge-amber' : 'badge-rose'}`}>
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

          {/* TAB 5: EXAMS & REPORT CARDS */}
          {activeNav === 'exams' && (
            <div className="ind-card-container">
              <div className="ind-table-controls">
                <div className="ind-tabs-row">
                  <button className="ind-tab-pill active">Active Exam Series (4)</button>
                  <button className="ind-tab-pill">Term Results</button>
                </div>
              </div>
              <div className="ind-table-wrap">
                <table className="ind-data-table">
                  <thead>
                    <tr>
                      <th>Assessment Name</th>
                      <th>Target Grades</th>
                      <th>Examination Window</th>
                      <th>Campus Average</th>
                      <th>Papers</th>
                      <th>Execution Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {EXAM_SCHEDULE.map((ex, i) => (
                      <tr key={i}>
                        <td><strong>{ex.exam}</strong></td>
                        <td>{ex.grade}</td>
                        <td>{ex.dates}</td>
                        <td><strong>{ex.avgScore}</strong></td>
                        <td>{ex.papers}</td>
                        <td><span className="ind-status-badge badge-purple">{ex.status}</span></td>
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

export default SchoolDashboard;
