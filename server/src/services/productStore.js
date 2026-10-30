export const initialProducts = [
  {
    id: 'hrms',
    name: 'HRMS Portal',
    slug: 'hrms',
    category: 'Human Resources',
    description: 'Complete employee lifecycle management, attendance, leave policies & onboarding workflows.',
    longDescription: 'Speshway HRMS Portal simplifies people management with automated onboarding, biometric time tracking, digital document management, and organizational hierarchy charts.',
    features: ['Employee Profiles & Documents', 'Automated Attendance Tracking', 'Leave Workflow & Approvals', 'Shift Scheduling & Overtime', 'Digital Offboarding & Exit Clearance'],
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'JWT Auth', 'Tailwind CSS'],
    websiteUrl: 'https://speshway.com/hrms',
    adminUrl: '/admin/products',
    iconName: 'Users',
    color: 'green',
    status: 'active',
    popularity: 98,
  },
  {
    id: 'payroll',
    name: 'Payroll System',
    slug: 'payroll',
    category: 'Finance & HR',
    description: 'One-click salary processing, automatic tax calculations, payslips & statutory compliance.',
    longDescription: 'Handle complex salary structures, bonus allocations, PF/ESI/TDS tax deductions, and bank disbursement files seamlessly in accordance with labor laws.',
    features: ['Automated Salary Calculations', 'Instant PDF Payslip Generation', 'Tax & Compliance Reports', 'Direct Bank File Integration', 'Reimbursements & Claims'],
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'PDFKit', 'TaxEngine', 'Banking API'],
    websiteUrl: 'https://speshway.com/payroll',
    adminUrl: '/admin/products',
    iconName: 'Wallet',
    color: 'blue',
    status: 'active',
    popularity: 96,
  },
  {
    id: 'projects',
    name: 'Project Management',
    slug: 'projects',
    category: 'Productivity',
    description: 'Agile project tracking, milestone scheduling, Gantt timelines and team collaboration.',
    longDescription: 'Deliver projects on time with interactive Kanban boards, milestone roadmaps, automated burndown charts, and cross-team communication channels.',
    features: ['Kanban & Sprint Boards', 'Gantt Chart Milestones', 'Resource Capacity Planning', 'Time Tracking & Timesheets', 'Client Collaboration Portals'],
    technologies: ['React 18', 'Dnd-Kit', 'Node.js', 'Socket.IO', 'MongoDB Atlas', 'Chart.js', 'Express.js'],
    websiteUrl: 'https://speshway.com/projects',
    adminUrl: '/admin/products',
    iconName: 'FolderKanban',
    color: 'purple',
    status: 'active',
    popularity: 94,
  },
  {
    id: 'directory',
    name: 'Employee Directory',
    slug: 'directory',
    category: 'Human Resources',
    description: 'Interactive company directory, reporting trees, skills index and emergency contacts.',
    longDescription: 'Find any colleague in seconds with dynamic search by department, skill tags, office branch, and direct phone/email contact integrations.',
    features: ['Visual Org Chart', 'Advanced Skill Search', 'Department Hierarchy', 'Contact Information Hub', 'Custom Profile Badges'],
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB TextSearch', 'Lucide Icons'],
    websiteUrl: 'https://speshway.com/directory',
    adminUrl: '/admin/products',
    iconName: 'UserCheck',
    color: 'orange',
    status: 'active',
    popularity: 91,
  },
  {
    id: 'leave',
    name: 'Leave & Attendance',
    slug: 'leave',
    category: 'Human Resources',
    description: 'Apply leave, geo-fenced mobile clock-in, shift rosters and real-time attendance analytics.',
    longDescription: 'Eliminate manual punch errors with mobile geo-tagged check-ins, biometric device synchronization, and multi-tier manager approval chains.',
    features: ['Geo-fenced Mobile Clock-in', 'Custom Leave Quotas & Accruals', 'Holiday Calendars & Shifts', 'Real-time Attendance Dashboard', 'Overtime & Late-mark Flags'],
    technologies: ['React Mobile Web', 'Geolocation API', 'Node.js', 'Express', 'MongoDB Atlas', 'Socket.IO'],
    websiteUrl: 'https://speshway.com/leave',
    adminUrl: '/admin/products',
    iconName: 'CalendarDays',
    color: 'red',
    status: 'active',
    popularity: 93,
  },
  {
    id: 'clients',
    name: 'Client Management (CRM)',
    slug: 'clients',
    category: 'Sales & CRM',
    description: 'Comprehensive lead tracking, deal pipelines, customer interactions and communications.',
    longDescription: 'Convert prospects into high-value accounts with visual sales funnels, contract tracking, communication logs, and customer health metrics.',
    features: ['Visual Sales Pipeline', 'Contact & Deal Timelines', 'Automated Email Sequences', 'Contract & Agreement Storage', 'Customer Health Scorecards'],
    technologies: ['React.js', 'Node.js', 'Express', 'MongoDB Aggregation', 'Nodemailer', 'Socket.IO'],
    websiteUrl: 'https://speshway.com/clients',
    adminUrl: '/admin/products',
    iconName: 'Handshake',
    color: 'teal',
    status: 'active',
    popularity: 95,
  },
  {
    id: 'tasks',
    name: 'Task Management',
    slug: 'tasks',
    category: 'Productivity',
    description: 'Assign tasks, set priorities, track subtasks and monitor deadlines with ease.',
    longDescription: 'Keep teams aligned and accountable with recurring tasks, priority matrix flags, checklist items, and real-time activity updates.',
    features: ['Subtask Checklists', 'Priority Matrix', 'Deadline Reminders', 'File Attachments', 'Activity Logs'],
    technologies: ['React 18', 'Socket.IO', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    websiteUrl: 'https://speshway.com/tasks',
    adminUrl: '/admin/products',
    iconName: 'ListTodo',
    color: 'yellow',
    status: 'active',
    popularity: 92,
  },
  {
    id: 'finance',
    name: 'Finance & Accounts',
    slug: 'finance',
    category: 'Finance',
    description: 'Double-entry bookkeeping, invoicing, expense tracking, and P&L financial reports.',
    longDescription: 'Gain complete financial control with multi-currency ledgers, automated recurring billing, GST/VAT compliant invoices, and real-time profit and loss statements.',
    features: ['Double-Entry Ledger', 'Multi-currency Invoicing', 'Expense Approval Workflows', 'Bank Statement Reconciliation', 'P&L & Balance Sheet Reports'],
    technologies: ['React.js', 'Node.js', 'Express', 'MongoDB ACID', 'Accounting Engine', 'Chart.js'],
    websiteUrl: 'https://speshway.com/finance',
    adminUrl: '/admin/products',
    iconName: 'BarChart3',
    color: 'green',
    status: 'active',
    popularity: 97,
  },
  {
    id: 'assets',
    name: 'Asset Management',
    slug: 'assets',
    category: 'Operations',
    description: 'Track laptops, hardware, software licenses, depreciation and assignment logs.',
    longDescription: 'Maintain complete custody records for company equipment, track maintenance schedules, QR code asset tagging, and automated warranty alerts.',
    features: ['QR/Barcode Asset Tagging', 'Hardware & License Custody', 'Depreciation Calculator', 'Maintenance Scheduling', 'Warranty Expiry Alerts'],
    technologies: ['React.js', 'QR Code Scanner', 'Node.js', 'Express', 'MongoDB', 'Asset Lifecycle Engine'],
    websiteUrl: 'https://speshway.com/assets',
    adminUrl: '/admin/products',
    iconName: 'Monitor',
    color: 'indigo',
    status: 'active',
    popularity: 89,
  },
  {
    id: 'recruitment',
    name: 'Recruitment & ATS',
    slug: 'recruitment',
    category: 'Human Resources',
    description: 'Job board postings, resume parser, candidate interview pipelines and offer letter generator.',
    longDescription: 'Speed up hiring with an applicant tracking pipeline, candidate scorecard reviews, interview calendar bookings, and automated offer letters.',
    features: ['Custom Hiring Pipelines', 'Resume AI Screening', 'Interview Feedback Scorecards', 'Offer Letter Generator', 'Job Portal Integration'],
    technologies: ['React.js', 'Node.js', 'Express', 'MongoDB Atlas', 'Multer Uploads', 'PDF Parser'],
    websiteUrl: 'https://speshway.com/recruitment',
    adminUrl: '/admin/products',
    iconName: 'UserPlus',
    color: 'rose',
    status: 'active',
    popularity: 90,
  },
  {
    id: 'performance',
    name: 'Performance Management',
    slug: 'performance',
    category: 'Human Resources',
    description: 'Quarterly OKRs, 360-degree appraisals, continuous feedback and employee KPI tracking.',
    longDescription: 'Empower growth through transparent performance reviews, OKR alignment, peer recognition shoutouts, and skill competency heatmaps.',
    features: ['OKR & Goal Alignment', '360° Peer Feedback', 'Continuous Check-in Notes', 'Appraisal Rating Scales', 'Promotion Readiness Reports'],
    technologies: ['React.js', 'Radar Charts', 'Node.js', 'Express', 'MongoDB', 'OKR Tracking Matrix'],
    websiteUrl: 'https://speshway.com/performance',
    adminUrl: '/admin/products',
    iconName: 'TrendingUp',
    color: 'skyblue',
    status: 'active',
    popularity: 91,
  },
  {
    id: 'reports',
    name: 'Reports & Analytics',
    slug: 'reports',
    category: 'Business Intelligence',
    description: 'Custom dashboards, executive KPIs, automated scheduled reports and data exports.',
    longDescription: 'Turn raw operational data into actionable strategic insights with visual drill-down charts, cross-module joins, and scheduled PDF/Excel email digests.',
    features: ['Custom BI Dashboards', 'Cross-Module Analytics', 'Automated Email Digests', 'Excel & PDF Export', 'Role-Based Data Filters'],
    technologies: ['React.js', 'Chart.js', 'Node.js', 'Express', 'MongoDB Pipelines', 'ExcelJS', 'PDFKit'],
    websiteUrl: 'https://speshway.com/reports',
    adminUrl: '/admin/products',
    iconName: 'PieChart',
    color: 'purple',
    status: 'active',
    popularity: 96,
  },
];

let productsMemory = [...initialProducts];

export const getProducts = () => productsMemory;

export const getProductById = (id) =>
  productsMemory.find((p) => p.id === id || p.slug === id);

export const addProduct = (productData) => {
  const newProduct = {
    id: productData.slug || `prod-${Date.now()}`,
    slug: productData.slug || `prod-${Date.now()}`,
    status: 'active',
    popularity: 90,
    technologies: Array.isArray(productData.technologies)
      ? productData.technologies
      : ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO'],
    features: Array.isArray(productData.features) ? productData.features : [],
    ...productData,
  };
  productsMemory.unshift(newProduct);
  return newProduct;
};

export const updateProduct = (id, updates) => {
  const index = productsMemory.findIndex((p) => p.id === id || p.slug === id);
  if (index === -1) return null;
  productsMemory[index] = {
    ...productsMemory[index],
    ...updates,
    technologies: Array.isArray(updates.technologies)
      ? updates.technologies
      : productsMemory[index].technologies || ['React', 'Node.js', 'Express', 'MongoDB'],
    features: Array.isArray(updates.features)
      ? updates.features
      : productsMemory[index].features || [],
  };
  return productsMemory[index];
};

export const deleteProduct = (id) => {
  const index = productsMemory.findIndex((p) => p.id === id || p.slug === id);
  if (index === -1) return false;
  productsMemory.splice(index, 1);
  return true;
};
