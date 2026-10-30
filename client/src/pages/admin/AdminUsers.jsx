import React, { useState } from 'react';
import { useSocket } from '../../context/SocketContext';
import {
  Users,
  UserPlus,
  Search,
  Shield,
  CheckCircle,
  X,
  Trash2,
  Mail,
  Briefcase,
  Building,
  UserCheck,
  UserX,
  Filter,
} from 'lucide-react';

const avatarColors = [
  'bg-indigo-avatar',
  'bg-emerald-avatar',
  'bg-blue-avatar',
  'bg-purple-avatar',
  'bg-amber-avatar',
  'bg-rose-avatar',
  'bg-teal-avatar',
];

export const AdminUsers = () => {
  const { modulesData, triggerAddEmployee, triggerDeleteEmployee, triggerUpdateEmployee } =
    useSocket();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [msg, setMsg] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Senior Software Engineer');
  const [dept, setDept] = useState('Engineering');
  const [status, setStatus] = useState('Active');

  const employees = modulesData.hrms || [];

  // Seed Admin object
  const superAdmin = {
    id: 'super-admin-0',
    name: 'Speshway Administrator',
    email: 'admin@gmail.com',
    role: 'Super Admin',
    dept: 'Executive Administration',
    status: 'Active',
    isSuperAdmin: true,
  };

  const allPersonnel = [
    superAdmin,
    ...employees.map((emp, index) => ({
      ...emp,
      email: emp.email || `${emp.name.toLowerCase().replace(/[^a-z0-9]/g, '.')}@speshway.com`,
      colorClass: avatarColors[index % avatarColors.length],
    })),
  ];

  const departments = [
    'All',
    'Executive Administration',
    'Engineering',
    'Human Resources',
    'Finance',
    'Product',
    'Sales',
    'Operations',
  ];

  const handleOpenModal = () => {
    setName('');
    setEmail('');
    setRole('Senior Software Engineer');
    setDept('Engineering');
    setStatus('Active');
    setIsModalOpen(true);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newEmpEmail =
      email.trim() || `${name.toLowerCase().replace(/[^a-z0-9]/g, '.')}@speshway.com`;

    triggerAddEmployee({
      name: name.trim(),
      email: newEmpEmail,
      role: role.trim(),
      dept,
      status,
    });

    setIsModalOpen(false);
    setMsg(`Team member "${name}" successfully added to directory.`);
    setTimeout(() => setMsg(''), 4000);
  };

  const handleDelete = (id, empName) => {
    if (window.confirm(`Are you sure you want to remove "${empName}" from the staff directory?`)) {
      triggerDeleteEmployee(id, empName);
      setMsg(`Team member "${empName}" removed.`);
      setTimeout(() => setMsg(''), 4000);
    }
  };

  const handleToggleStatus = (emp) => {
    const newStatus = emp.status === 'Active' ? 'On Leave' : 'Active';
    triggerUpdateEmployee({ ...emp, status: newStatus });
    setMsg(`Status for "${emp.name}" changed to ${newStatus}.`);
    setTimeout(() => setMsg(''), 3000);
  };

  // Helper for initials
  const getInitials = (fullName) => {
    if (!fullName) return 'U';
    const parts = fullName.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  };

  const filtered = allPersonnel.filter((p) => {
    const matchesSearch =
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.dept?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || p.dept === selectedDept;
    return matchesSearch && matchesDept;
  });

  const totalMembers = allPersonnel.length;
  const activeMembers = allPersonnel.filter((p) => p.status === 'Active').length;
  const onLeaveMembers = allPersonnel.filter((p) => p.status === 'On Leave').length;
  const totalDepts = new Set(allPersonnel.map((p) => p.dept)).size;

  return (
    <div className="admin-page-view users-page-view">
      {/* Page Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-heading">Users &amp; Personnel Directory</h1>
          <p className="admin-subtext">
            Manage enterprise staff directory, organizational roles, department access, and employment status.
          </p>
        </div>
        <div className="admin-header-actions">
          <button onClick={handleOpenModal} className="btn-hero-primary" style={{ padding: '10px 20px' }}>
            <UserPlus size={16} /> Add Team Member
          </button>
        </div>
      </div>

      {msg && (
        <div className="modal-alert-success" style={{ marginBottom: '20px' }}>
          <CheckCircle size={16} />
          <span>{msg}</span>
        </div>
      )}

      {/* KPI Stats Row */}
      <div className="users-kpi-grid">
        <div className="users-kpi-card">
          <div className="users-kpi-icon-wrap bg-green-subtle">
            <Users size={20} className="text-green" />
          </div>
          <div>
            <span className="users-kpi-label">Total Personnel</span>
            <span className="users-kpi-value">{totalMembers}</span>
          </div>
        </div>

        <div className="users-kpi-card">
          <div className="users-kpi-icon-wrap bg-blue-subtle">
            <UserCheck size={20} className="text-blue" />
          </div>
          <div>
            <span className="users-kpi-label">Active Staff</span>
            <span className="users-kpi-value">{activeMembers}</span>
          </div>
        </div>

        <div className="users-kpi-card">
          <div className="users-kpi-icon-wrap bg-orange-subtle">
            <UserX size={20} className="text-orange" />
          </div>
          <div>
            <span className="users-kpi-label">On Leave</span>
            <span className="users-kpi-value">{onLeaveMembers}</span>
          </div>
        </div>

        <div className="users-kpi-card">
          <div className="users-kpi-icon-wrap bg-purple-subtle">
            <Building size={20} className="text-purple" />
          </div>
          <div>
            <span className="users-kpi-label">Departments</span>
            <span className="users-kpi-value">{totalDepts}</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="users-controls-bar">
        <div className="admin-search-wrap" style={{ flex: '1', maxWidth: '380px' }}>
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search team member, role, email, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-search-input"
          />
        </div>

        <div className="category-scroll-pills">
          {departments.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDept(d)}
              className={`cat-pill-btn ${selectedDept === d ? 'active' : ''}`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Modern Users Table */}
      <div className="admin-card table-card users-table-card">
        <div className="table-responsive">
          <table className="admin-data-table users-directory-table">
            <thead>
              <tr>
                <th style={{ width: '32%' }}>Team Member</th>
                <th style={{ width: '22%' }}>Role &amp; Title</th>
                <th style={{ width: '22%' }}>Department</th>
                <th style={{ width: '12%' }}>Status</th>
                <th style={{ width: '12%', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((person) => {
                const initials = getInitials(person.name);
                return (
                  <tr
                    key={person.id}
                    className={person.isSuperAdmin ? 'row-super-admin' : 'row-staff'}
                  >
                    {/* Member Info: Avatar, Name & Work Email */}
                    <td>
                      <div className="user-profile-cell">
                        <div
                          className={`user-avatar-badge ${
                            person.isSuperAdmin ? 'avatar-super-admin' : person.colorClass || 'bg-indigo-avatar'
                          }`}
                        >
                          {initials}
                        </div>
                        <div className="user-info-text">
                          <strong className="user-full-name">
                            {person.name}
                            {person.isSuperAdmin && (
                              <span className="badge-root-admin">Root Admin</span>
                            )}
                          </strong>
                          <span className="user-work-email">{person.email}</span>
                        </div>
                      </div>
                    </td>

                    {/* Role & Permissions */}
                    <td>
                      <div className="user-role-cell">
                        <span
                          className={`user-role-pill ${
                            person.isSuperAdmin ? 'role-super' : 'role-standard'
                          }`}
                        >
                          {person.isSuperAdmin && <Shield size={12} />}
                          <span>{person.role}</span>
                        </span>
                      </div>
                    </td>

                    {/* Department */}
                    <td>
                      <span className="user-dept-text">{person.dept}</span>
                    </td>

                    {/* Status */}
                    <td>
                      <button
                        type="button"
                        onClick={() => !person.isSuperAdmin && handleToggleStatus(person)}
                        className={`status-toggle-pill ${
                          person.status === 'Active' ? 'status-active' : 'status-leave'
                        }`}
                        title={person.isSuperAdmin ? 'Admin status is permanently active' : 'Click to toggle status'}
                        disabled={person.isSuperAdmin}
                      >
                        <span className="status-dot"></span>
                        <span>{person.status}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td style={{ textAlign: 'right' }}>
                      {person.isSuperAdmin ? (
                        <span className="protected-tag">Protected</span>
                      ) : (
                        <div className="user-actions-row">
                          <button
                            type="button"
                            onClick={() => handleDelete(person.id, person.name)}
                            className="btn-action-icon delete"
                            title={`Remove ${person.name} from directory`}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Clean Add Team Member Modal */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div
            className="module-modal-box admin-form-modal"
            style={{ maxWidth: '560px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="modal-header-left">
                <UserPlus size={20} className="text-icon-green" />
                <h3 className="modal-title">Add Team Member</h3>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setIsModalOpen(false)}
                title="Close"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAdd} className="admin-modal-form">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rachel Adams"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="quick-input full-width"
                />
              </div>

              <div className="form-group">
                <label>Work Email (optional - auto generated if empty)</label>
                <input
                  type="email"
                  placeholder="e.g. rachel.adams@speshway.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="quick-input full-width"
                />
              </div>

              <div className="form-row-2col">
                <div className="form-group">
                  <label>Role / Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lead Architect"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="quick-input full-width"
                  />
                </div>

                <div className="form-group">
                  <label>Department *</label>
                  <select
                    value={dept}
                    onChange={(e) => setDept(e.target.value)}
                    className="quick-select full-width"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Finance">Finance</option>
                    <option value="Product">Product</option>
                    <option value="Sales">Sales</option>
                    <option value="Operations">Operations</option>
                    <option value="Executive Administration">Executive Administration</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Employment Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="quick-select full-width"
                >
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-hero-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-hero-primary" style={{ minWidth: '150px' }}>
                  <UserPlus size={16} />
                  <span>Add Member</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
