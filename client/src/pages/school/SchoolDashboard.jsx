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

export const SchoolDashboard = () => {
  const navigate = useNavigate();
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
      {/* Sidebar */}
      <aside className="ind-sidebar">
        <div className="ind-sidebar-brand">
          <div className="ind-brand-icon-box" style={{ backgroundColor: '#8b5cf6' }}>
            <GraduationCap size={22} color="#ffffff" />
          </div>
          <div className="ind-brand-text">
            <span className="ind-brand-name">EduSphere</span>
            <span className="ind-brand-sub" style={{ color: '#c4b5fd' }}>School ERP</span>
          </div>
        </div>

        <nav className="ind-sidebar-menu">
          <button onClick={() => setActiveNav('dash')} className={`ind-nav-btn ${activeNav === 'dash' ? 'active' : ''}`}>
            <LayoutDashboard size={18} /> Overview
          </button>
          <button onClick={() => setActiveNav('students')} className={`ind-nav-btn ${activeNav === 'students' ? 'active' : ''}`}>
            <Users size={18} /> Students &amp; Classes <span className="ind-nav-badge">6</span>
          </button>
          <button onClick={() => setActiveNav('teachers')} className={`ind-nav-btn ${activeNav === 'teachers' ? 'active' : ''}`}>
            <Award size={18} /> Teachers &amp; Faculty
          </button>
          <button onClick={() => setActiveNav('attendance')} className={`ind-nav-btn ${activeNav === 'attendance' ? 'active' : ''}`}>
            <Calendar size={18} /> Attendance Register
          </button>
          <button onClick={() => setActiveNav('fees')} className={`ind-nav-btn ${activeNav === 'fees' ? 'active' : ''}`}>
            <DollarSign size={18} /> Fee Collections
          </button>
          <button onClick={() => setActiveNav('exams')} className={`ind-nav-btn ${activeNav === 'exams' ? 'active' : ''}`}>
            <BookOpen size={18} /> Exams &amp; Report Cards
          </button>
        </nav>

        <div className="ind-sidebar-footer">
          <button onClick={() => navigate('/')} className="ind-back-home-btn">
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
            <div className="ind-live-chip">
              <span className="ind-live-dot" /> Live School &amp; Academy ERP
            </div>
          </div>
          <div className="ind-topbar-right">
            <div className="ind-search-box">
              <Search size={15} color="#94a3b8" />
              <input
                type="text"
                placeholder="Search student, roll no, grade..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="ind-user-profile">
              <div className="ind-user-avatar" style={{ backgroundColor: '#8b5cf6' }}>PR</div>
              <div className="ind-user-meta">
                <span className="ind-user-name">School Principal</span>
                <span className="ind-user-role">Academic Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="ind-content-body">
          <div className="ind-body-header">
            <div>
              <h1 className="ind-body-title">Campus &amp; Academic Student ERP</h1>
              <p className="ind-body-sub">End-to-end student enrollment, automated fee invoices, teacher timetables, attendance, and CBSE/ICSE gradebooks.</p>
            </div>
            <button className="ind-action-primary" style={{ backgroundColor: '#8b5cf6' }}>
              <Plus size={16} /> New Student Admission
            </button>
          </div>

          {/* 4 KPIs */}
          <div className="ind-kpi-grid">
            <div className="ind-kpi-card">
              <div className="ind-kpi-info">
                <span className="ind-kpi-label">Total Enrollment</span>
                <span className="ind-kpi-val">1,240</span>
                <span className="ind-kpi-trend"><TrendingUp size={12} /> +8% this academic year</span>
              </div>
              <div className="ind-kpi-icon-circ" style={{ backgroundColor: '#f5f3ff', color: '#8b5cf6' }}>
                <GraduationCap size={22} />
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

          {/* Table Container */}
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
        </main>
      </div>
    </div>
  );
};

