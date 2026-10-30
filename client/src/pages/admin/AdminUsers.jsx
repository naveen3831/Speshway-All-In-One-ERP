import React, { useState } from 'react';
import { useSocket } from '../../context/SocketContext';
import { Plus, Users, Shield, CheckCircle } from 'lucide-react';

export const AdminUsers = () => {
  const { modulesData, triggerAddEmployee } = useSocket();
  const [name, setName] = useState('');
  const [role, setRole] = useState('Staff Specialist');
  const [dept, setDept] = useState('Engineering');
  const [msg, setMsg] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name) return;
    triggerAddEmployee({ name, role, dept });
    setName('');
    setMsg(`User "${name}" added to staff directory.`);
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div className="admin-page-view">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-heading">Users &amp; Personnel Directory</h1>
          <p className="admin-subtext">Manage enterprise staff access, roles, and department assignments.</p>
        </div>
      </div>

      {msg && (
        <div className="modal-alert-success">
          <CheckCircle size={16} />
          <span>{msg}</span>
        </div>
      )}

      <div className="admin-card" style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '14px' }}>Add Team Member</h3>
        <form onSubmit={handleAdd} className="quick-add-form" style={{ margin: 0 }}>
          <input
            type="text"
            required
            placeholder="Full Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="quick-input"
          />
          <input
            type="text"
            placeholder="Role / Title..."
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="quick-input"
          />
          <select value={dept} onChange={(e) => setDept(e.target.value)} className="quick-select">
            <option value="Engineering">Engineering</option>
            <option value="Finance">Finance</option>
            <option value="Operations">Operations</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Sales">Sales</option>
          </select>
          <button type="submit" className="btn-hero-primary" style={{ padding: '9px 18px' }}>
            <Plus size={16} /> Add User
          </button>
        </form>
      </div>

      <div className="admin-card table-card">
        <div className="table-responsive">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Department</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Seed Admin */}
              <tr style={{ backgroundColor: '#f0fdf4' }}>
                <td>
                  <div className="table-prod-info">
                    <div className="admin-avatar" style={{ width: '28px', height: '28px', fontSize: '0.75rem' }}>AD</div>
                    <div>
                      <strong className="prod-table-name">Speshway Administrator</strong>
                      <span className="prod-table-cat">admin@gmail.com</span>
                    </div>
                  </div>
                </td>
                <td><span className="badge-active" style={{ background: '#dcfce7', color: '#166534' }}>Super Admin</span></td>
                <td>Executive Administration</td>
                <td><span className="badge-status active">Active</span></td>
              </tr>

              {/* Other employees */}
              {modulesData.hrms?.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div className="table-prod-info">
                      <div className="avatar-circle" style={{ width: '28px', height: '28px' }}>{u.name.charAt(0)}</div>
                      <strong>{u.name}</strong>
                    </div>
                  </td>
                  <td>{u.role || 'Staff'}</td>
                  <td>{u.dept}</td>
                  <td><span className="badge-status active">{u.status || 'Active'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
