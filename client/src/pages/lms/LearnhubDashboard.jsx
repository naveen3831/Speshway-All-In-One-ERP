import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutGrid,
  BookOpen,
  Users,
  GraduationCap,
  Calendar,
  Sparkles,
  TrendingUp,
  Settings,
  LogOut,
  Bell,
  ChevronDown,
  ArrowRight,
  Search,
  Filter,
  Plus,
  CheckCircle,
  Video,
  Award,
  DollarSign,
  Layers,
  ArrowLeft,
  FileCheck,
  PlayCircle,
  ShieldCheck,
  Check,
  ExternalLink,
} from 'lucide-react';
import './LearnhubDashboard.css';

// Custom LearnHub Logo Icon with Graduation Cap & Digital Book
const LearnHubLogoIcon = () => (
  <svg width="44" height="44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lhGreen" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#34D399" />
        <stop offset="0.5" stopColor="#10B981" />
        <stop offset="1" stopColor="#047857" />
      </linearGradient>
      <linearGradient id="lhCyan" x1="0" y1="50" x2="100" y2="50" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38BDF8" />
        <stop offset="1" stopColor="#0284C7" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="20" fill="#051a1e" />
    {/* Modern Graduation Cap */}
    <polygon points="50,22 82,36 50,50 18,36" fill="url(#lhGreen)" />
    <path d="M78 40V62C78 62 66 74 50 74C34 74 22 62 22 62V40" stroke="url(#lhCyan)" strokeWidth="3.5" fill="none" />
    {/* Tassel */}
    <path d="M80 37V54M80 54L83 58M80 54L77 58" stroke="url(#lhGreen)" strokeWidth="3" strokeLinecap="round" />
    {/* Open Book Pages */}
    <path d="M28 72C38 68 46 72 50 76C54 72 62 68 72 72" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const LearnhubDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'courses', label: 'Active Courses', icon: BookOpen, badge: '84' },
    { id: 'students', label: 'Student Directory', icon: Users, badge: '4.3k' },
    { id: 'instructors', label: 'Instructors', icon: GraduationCap },
    { id: 'live-classes', label: 'Live Batches', icon: Video, badge: 'Live' },
    { id: 'exams', label: 'Exams & Quizzes', icon: FileCheck },
    { id: 'certificates', label: 'Certifications', icon: Award },
    { id: 'revenue', label: 'Course Sales', icon: TrendingUp },
    { id: 'settings', label: 'LMS Settings', icon: Settings },
  ];

  const recentStudents = [
    { id: '#LMS-8910', name: 'Rohan Deshmukh', course: 'Full-Stack MERN Enterprise', batch: 'Weekend Batch B', progress: '82%', amount: '₹14,999', status: 'active' },
    { id: '#LMS-8909', name: 'Pooja Iyer', course: 'Python AI & Machine Learning', batch: 'Morning Fast-Track', progress: '100%', amount: '₹18,500', status: 'completed' },
    { id: '#LMS-8908', name: 'Aditya Srivastava', course: 'Cloud DevOps & Kubernetes', batch: 'Evening Live', progress: '45%', amount: '₹16,000', status: 'active' },
    { id: '#LMS-8907', name: 'Snehal Patil', course: 'UI/UX Product Architecture', batch: 'Design Studio 1', progress: '91%', amount: '₹12,499', status: 'active' },
    { id: '#LMS-8906', name: 'Karthik Pillai', course: 'Cyber Security & Ethical Hacking', batch: 'Specialization C', progress: '60%', amount: '₹17,000', status: 'active' },
  ];

  const coursesList = [
    { id: 'CRS-101', title: 'Full-Stack MERN Architecture', instructor: 'Arunav Roy (Ex-Amazon)', modules: '24 Modules &bull; 6 Projects', students: '1,420 Students', rating: '4.9 ★', fee: '₹14,999', status: 'Published' },
    { id: 'CRS-102', title: 'Python AI, LLMs & Deep Learning', instructor: 'Dr. Neha Kapoor', modules: '32 Modules &bull; 8 Labs', students: '1,180 Students', rating: '5.0 ★', fee: '₹18,500', status: 'Published' },
    { id: 'CRS-103', title: 'Cloud DevOps, Docker & Kubernetes', instructor: 'Siddharth Nair', modules: '20 Modules &bull; AWS Infra', students: '860 Students', rating: '4.8 ★', fee: '₹16,000', status: 'Published' },
    { id: 'CRS-104', title: 'Enterprise UI/UX Design System', instructor: 'Simran Chawla', modules: '18 Modules &bull; Figma Pro', students: '520 Students', rating: '4.9 ★', fee: '₹12,499', status: 'Published' },
    { id: 'CRS-105', title: 'Cyber Security & Penetration Testing', instructor: 'Vikramaditya Rao', modules: '28 Modules &bull; CTF Challenges', students: '340 Students', rating: '4.8 ★', fee: '₹17,000', status: 'Published' },
  ];

  const instructorsList = [
    { name: 'Arunav Roy', role: 'Staff Software Architect', domain: 'Full-Stack MERN', students: '2,800+', rating: '4.9 ★', payout: '₹1,90,000/mo' },
    { name: 'Dr. Neha Kapoor', role: 'Lead AI Scientist', domain: 'Python AI & ML', students: '1,950+', rating: '5.0 ★', payout: '₹2,10,000/mo' },
    { name: 'Siddharth Nair', role: 'DevOps Architect', domain: 'Cloud & Kubernetes', students: '1,420+', rating: '4.8 ★', payout: '₹1,60,000/mo' },
    { name: 'Simran Chawla', role: 'Principal Designer', domain: 'UI/UX Design', students: '1,100+', rating: '4.9 ★', payout: '₹1,30,000/mo' },
  ];

  const popularTracks = [
    { name: 'Full-Stack Web Dev', students: '1,420 students', share: '33%', rev: '₹4,90,000', color: '#059669' },
    { name: 'Python AI & ML', students: '1,180 students', share: '27%', rev: '₹4,20,000', color: '#10b981' },
    { name: 'Cloud & DevOps', students: '860 students', share: '20%', rev: '₹3,10,000', color: '#38bdf8' },
    { name: 'UI/UX & Design', students: '520 students', share: '12%', rev: '₹1,50,000', color: '#34d399' },
    { name: 'Cyber Security', students: '340 students', share: '8%', rev: '₹90,000', color: '#6ee7b7' },
  ];

  return (
    <div className="learn-dashboard-container">
      {/* 1. STICKY SIDEBAR */}
      <aside className="learn-sidebar">
        <div className="learn-sidebar-top">
          <div className="learn-brand">
            <div className="learn-brand-logo-wrap">
              <LearnHubLogoIcon />
            </div>
            <div>
              <div className="learn-brand-title">LearnHub</div>
              <div className="learn-brand-sub">ENTERPRISE LMS</div>
            </div>
          </div>

          <ul className="learn-nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`learn-nav-btn ${activeTab === item.id ? 'active' : ''}`}
                  >
                    <Icon size={18} />
                    <span className="learn-nav-label">{item.label}</span>
                    {item.badge && <span className="learn-nav-badge">{item.badge}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="learn-sidebar-bottom">
          <button onClick={() => navigate('/products')} className="learn-btn-portal">
            <ArrowLeft size={16} />
            <span>Speshway Catalog</span>
          </button>
          <div className="learn-user-profile">
            <div className="learn-avatar">LH</div>
            <div className="learn-user-info">
              <span className="learn-user-name">Academy Dean Admin</span>
              <span className="learn-user-role">LearnHub University</span>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. MAIN SCROLLABLE CONTENT */}
      <main className="learn-main">
        {/* Top Header */}
        <header className="learn-header">
          <div className="learn-header-left">
            <h1 className="learn-page-title">
              {navItems.find((n) => n.id === activeTab)?.label || 'Academy Overview'}
            </h1>
            <p className="learn-page-sub">
              LearnHub Online Academy ERP &bull; Real-Time Live Streaming &amp; Auto-Certifications
            </p>
          </div>

          <div className="learn-header-right">
            <div className="learn-search-box">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search courses, students, live batches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="learn-live-indicator">
              <span className="learn-live-dot"></span>
              <span>18 Live Interactive Batches Now</span>
            </div>

            <button className="learn-icon-btn" title="Announcements">
              <Bell size={18} />
              <span className="learn-bell-dot"></span>
            </button>

            <button
              onClick={() => window.open('https://lms.speshway.site', '_blank')}
              className="learn-btn-site"
            >
              <span>Student Portal</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </header>

        {/* Content Body */}
        <div className="learn-content-body">
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === 'dashboard' && (
            <>
              {/* Stat Cards Row */}
              <div className="learn-stats-grid">
                <div className="learn-stat-card">
                  <div className="learn-stat-icon-wrap">
                    <Users size={22} />
                  </div>
                  <div className="learn-stat-info">
                    <span className="learn-stat-label">Active Learners</span>
                    <span className="learn-stat-val">4,320</span>
                    <span className="learn-stat-trend">↑ +380 enrolled this week</span>
                  </div>
                </div>

                <div className="learn-stat-card">
                  <div className="learn-stat-icon-wrap">
                    <BookOpen size={22} />
                  </div>
                  <div className="learn-stat-info">
                    <span className="learn-stat-label">Courses Published</span>
                    <span className="learn-stat-val">84</span>
                    <span className="learn-stat-trend">Across 12 career tracks</span>
                  </div>
                </div>

                <div className="learn-stat-card">
                  <div className="learn-stat-icon-wrap">
                    <Video size={22} />
                  </div>
                  <div className="learn-stat-info">
                    <span className="learn-stat-label">Live Batches Today</span>
                    <span className="learn-stat-val">18</span>
                    <span className="learn-stat-trend">99.98% stream reliability</span>
                  </div>
                </div>

                <div className="learn-stat-card">
                  <div className="learn-stat-icon-wrap">
                    <DollarSign size={22} />
                  </div>
                  <div className="learn-stat-info">
                    <span className="learn-stat-label">Tuition Revenue</span>
                    <span className="learn-stat-val">₹14,60,000</span>
                    <span className="learn-stat-trend">↑ +26% vs last month</span>
                  </div>
                </div>
              </div>

              {/* Charts & Quick Actions Row */}
              <div className="learn-charts-grid">
                {/* Recent Enrollments Table */}
                <div className="learn-card">
                  <div className="learn-card-header">
                    <h3 className="learn-card-title">
                      <BookOpen size={18} className="text-emerald-600" />
                      Recent Enrollments &amp; Live Batches
                    </h3>
                    <span
                      onClick={() => setActiveTab('students')}
                      style={{ fontSize: '13px', color: '#059669', fontWeight: '600', cursor: 'pointer' }}
                    >
                      All Students &rarr;
                    </span>
                  </div>
                  <div className="learn-table-wrap">
                    <table className="learn-data-table">
                      <thead>
                        <tr>
                          <th>Enrollment ID</th>
                          <th>Student</th>
                          <th>Course Program</th>
                          <th>Progress</th>
                          <th>Tuition Paid</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentStudents.map((s) => (
                          <tr key={s.id}>
                            <td style={{ fontWeight: 700 }}>{s.id}</td>
                            <td>{s.name}</td>
                            <td>{s.course}</td>
                            <td>
                              <span style={{ fontWeight: 600, color: '#059669' }}>{s.progress}</span>
                            </td>
                            <td style={{ fontWeight: 700 }}>{s.amount}</td>
                            <td>
                              <span className={`learn-status-badge ${s.status}`}>
                                {s.status === 'completed' ? 'Certified' : 'In Progress'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Popular Tracks & Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="learn-card">
                    <div className="learn-card-header">
                      <h3 className="learn-card-title">
                        <Layers size={18} />
                        Popular Learning Tracks
                      </h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {popularTracks.map((pt) => (
                        <div key={pt.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: pt.color }} />
                            <span style={{ fontWeight: 600 }}>{pt.name}</span>
                          </div>
                          <span style={{ fontWeight: 700, color: '#0f172a' }}>{pt.students} ({pt.share})</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="learn-card">
                    <div className="learn-card-header">
                      <h3 className="learn-card-title">
                        <Sparkles size={18} />
                        Academy Actions
                      </h3>
                    </div>
                    <div className="learn-actions-list">
                      <div className="learn-action-item" onClick={() => setActiveTab('courses')}>
                        <span>+ Publish New Video Course</span>
                        <ArrowRight size={14} />
                      </div>
                      <div className="learn-action-item" onClick={() => setActiveTab('live-classes')}>
                        <span>Schedule Live Interactive Class</span>
                        <ArrowRight size={14} />
                      </div>
                      <div className="learn-action-item" onClick={() => setActiveTab('certificates')}>
                        <span>Generate Blockchain Certificates (Batch)</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: ACTIVE COURSES */}
          {activeTab === 'courses' && (
            <div className="learn-card">
              <div className="learn-card-header">
                <div>
                  <h3 className="learn-card-title">
                    <BookOpen size={18} className="text-emerald-600" />
                    Master Course Catalog (84 Active Curriculum Programs)
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                    Hands-on project tracks, digital syllabus, and instructor assignments.
                  </p>
                </div>
                <button className="learn-btn-site" style={{ padding: '8px 16px' }}>
                  <Plus size={15} /> Create New Course
                </button>
              </div>

              <div className="learn-table-wrap" style={{ marginTop: '16px' }}>
                <table className="learn-data-table">
                  <thead>
                    <tr>
                      <th>Course ID</th>
                      <th>Curriculum Title</th>
                      <th>Instructor</th>
                      <th>Curriculum Scope</th>
                      <th>Enrolled Learners</th>
                      <th>Rating</th>
                      <th>Tuition Fee</th>
                      <th>Publish Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coursesList.map((c) => (
                      <tr key={c.id}>
                        <td style={{ fontWeight: 700, color: '#047857' }}>{c.id}</td>
                        <td style={{ fontWeight: 600 }}>{c.title}</td>
                        <td>{c.instructor}</td>
                        <td dangerouslySetInnerHTML={{ __html: c.modules }} />
                        <td style={{ fontWeight: 700, color: '#0284c7' }}>{c.students}</td>
                        <td style={{ fontWeight: 700, color: '#d97706' }}>{c.rating}</td>
                        <td style={{ fontWeight: 700, color: '#0f172a' }}>{c.fee}</td>
                        <td>
                          <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#ecfdf5', color: '#047857', fontWeight: 700, fontSize: '12px' }}>
                            {c.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: STUDENT DIRECTORY */}
          {activeTab === 'students' && (
            <div className="learn-card">
              <div className="learn-card-header">
                <h3 className="learn-card-title">
                  <Users size={18} className="text-emerald-600" />
                  Active Student Directory (4,320 Enrolled Learners)
                </h3>
              </div>
              <div className="learn-table-wrap" style={{ marginTop: '16px' }}>
                <table className="learn-data-table">
                  <thead>
                    <tr>
                      <th>Student ID</th>
                      <th>Name</th>
                      <th>Course Program</th>
                      <th>Batch Schedule</th>
                      <th>Progress %</th>
                      <th>Tuition Paid</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentStudents.map((s) => (
                      <tr key={s.id}>
                        <td style={{ fontWeight: 700 }}>{s.id}</td>
                        <td style={{ fontWeight: 600 }}>{s.name}</td>
                        <td>{s.course}</td>
                        <td>{s.batch}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '80px', height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                              <div style={{ width: s.progress, height: '100%', background: '#059669' }} />
                            </div>
                            <span style={{ fontWeight: 700, fontSize: '12px', color: '#059669' }}>{s.progress}</span>
                          </div>
                        </td>
                        <td style={{ fontWeight: 700 }}>{s.amount}</td>
                        <td>
                          <span className={`learn-status-badge ${s.status}`}>{s.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: INSTRUCTORS */}
          {activeTab === 'instructors' && (
            <div className="learn-card">
              <div className="learn-card-header">
                <h3 className="learn-card-title">
                  <GraduationCap size={18} className="text-emerald-600" />
                  Faculty &amp; Industry Mentors (28 Instructors)
                </h3>
              </div>
              <div className="learn-table-wrap" style={{ marginTop: '16px' }}>
                <table className="learn-data-table">
                  <thead>
                    <tr>
                      <th>Mentor Name</th>
                      <th>Designation &amp; Background</th>
                      <th>Domain Track</th>
                      <th>Students Mentored</th>
                      <th>Rating</th>
                      <th>Monthly Remuneration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {instructorsList.map((inst, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 700 }}>{inst.name}</td>
                        <td>{inst.role}</td>
                        <td><span style={{ color: '#047857', fontWeight: 600 }}>{inst.domain}</span></td>
                        <td style={{ fontWeight: 700 }}>{inst.students}</td>
                        <td style={{ fontWeight: 700, color: '#d97706' }}>{inst.rating}</td>
                        <td style={{ fontWeight: 700, color: '#0f172a' }}>{inst.payout}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: LIVE BATCHES */}
          {activeTab === 'live-classes' && (
            <div className="learn-card">
              <div className="learn-card-header">
                <h3 className="learn-card-title">
                  <Video size={18} className="text-emerald-600" />
                  Live Interactive Virtual Classrooms (18 Active Sessions)
                </h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '16px' }}>
                <div style={{ border: '1px solid #a7f3d0', background: '#ecfdf5', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span className="learn-live-dot" />
                    <strong style={{ color: '#065f46' }}>LIVE NOW</strong>
                  </div>
                  <h4 style={{ margin: '0 0 6px 0', fontSize: '15px' }}>Full-Stack MERN: Redux Toolkit Architecture</h4>
                  <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#047857' }}>Instructor: Arunav Roy &bull; 84 Students Attending</p>
                  <button style={{ padding: '6px 14px', borderRadius: '6px', border: 'none', background: '#047857', color: '#fff', fontWeight: 600, fontSize: '12px', cursor: 'pointer' }}>
                    Join Live Classroom &rarr;
                  </button>
                </div>
                <div style={{ border: '1px solid #e2e8f0', background: '#f8fafc', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>Starts at 04:00 PM Today</div>
                  <h4 style={{ margin: '0 0 6px 0', fontSize: '15px' }}>Python AI: Building Agentic Workflows with Gemini</h4>
                  <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#64748b' }}>Instructor: Dr. Neha Kapoor &bull; 112 Students Registered</p>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#0284c7' }}>Scheduled</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: EXAMS & QUIZZES */}
          {activeTab === 'exams' && (
            <div className="learn-card">
              <div className="learn-card-header">
                <h3 className="learn-card-title">
                  <FileCheck size={18} className="text-emerald-600" />
                  Quiz Engine &amp; Coding Assessments
                </h3>
              </div>
              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '10px', marginTop: '16px' }}>
                <p style={{ margin: 0, fontSize: '13px', color: '#475569' }}>
                  Automated coding sandbox, proctored MCQs, and continuous evaluation engine auto-grades student lab submissions within seconds.
                </p>
              </div>
            </div>
          )}

          {/* TAB 7: CERTIFICATIONS */}
          {activeTab === 'certificates' && (
            <div className="learn-card">
              <div className="learn-card-header">
                <h3 className="learn-card-title">
                  <Award size={18} className="text-emerald-600" />
                  Blockchain-Verified Course Certificates
                </h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '16px' }}>
                <div style={{ padding: '16px', borderRadius: '10px', background: '#ecfdf5', border: '1px solid #a7f3d0' }}>
                  <ShieldCheck size={24} style={{ color: '#065f46', marginBottom: '8px' }} />
                  <h4 style={{ margin: '0 0 4px 0', color: '#065f46' }}>3,180 Verified Certificates Issued</h4>
                  <p style={{ margin: 0, fontSize: '12px', color: '#047857' }}>Tamper-proof verifiable cryptographic credential hashes.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: COURSE SALES & REVENUE */}
          {activeTab === 'revenue' && (
            <div className="learn-card">
              <div className="learn-card-header">
                <h3 className="learn-card-title">
                  <TrendingUp size={18} className="text-emerald-600" />
                  Tuition Sales &amp; Instructor Royalty Accounts
                </h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: '16px' }}>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px' }}>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>Monthly Gross Tuition</div>
                  <div style={{ fontSize: '26px', fontWeight: 800, color: '#047857' }}>₹14,60,000</div>
                </div>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px' }}>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>Instructor Royalties Paid</div>
                  <div style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a' }}>₹6,90,000</div>
                </div>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px' }}>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>Net Academy Margin</div>
                  <div style={{ fontSize: '26px', fontWeight: 800, color: '#d97706' }}>₹7,70,000</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="learn-card" style={{ maxWidth: '640px' }}>
              <div className="learn-card-header">
                <h3 className="learn-card-title">
                  <Settings size={18} />
                  LearnHub Academy Settings
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Institution Name</label>
                  <input type="text" readOnly value="LearnHub Global Academy &bull; Speshway EdTech" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Video CDN &amp; WebRTC Gateway</label>
                  <input type="text" readOnly value="Cloudflare Stream &bull; Low-Latency HLS" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default LearnhubDashboard;
