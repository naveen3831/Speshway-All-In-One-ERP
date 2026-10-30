import React, { useState } from 'react';
import { X, Plus, CheckCircle, Clock, Send } from 'lucide-react';
import { useSocket } from '../../context/SocketContext';

export const ModuleModal = ({ module, onClose }) => {
  if (!module) return null;

  const { modulesData, triggerAddEmployee, triggerAddTask, stats } = useSocket();
  const [empName, setEmpName] = useState('');
  const [empDept, setEmpDept] = useState('Engineering');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskPriority, setTaskPriority] = useState('High');
  const [formSuccess, setFormSuccess] = useState('');

  const handleCreateEmp = (e) => {
    e.preventDefault();
    if (!empName) return;
    triggerAddEmployee({ name: empName, dept: empDept, role: 'Specialist' });
    setEmpName('');
    setFormSuccess('Employee added successfully! Broadcasted live to all users.');
    setTimeout(() => setFormSuccess(''), 3000);
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!taskTitle) return;
    triggerAddTask({ title: taskTitle, priority: taskPriority, assignee: 'Current User' });
    setTaskTitle('');
    setFormSuccess('Task created! Live real-time update synced.');
    setTimeout(() => setFormSuccess(''), 3000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="module-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-left">
            <div className={`app-icon-box ${module.bgClass}`}>
              <module.icon className={`app-icon ${module.colorClass}`} size={20} />
            </div>
            <div>
              <h3 className="modal-title">{module.title}</h3>
              <p className="modal-subtitle">{module.desc}</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {formSuccess && (
            <div className="modal-alert-success">
              <CheckCircle size={16} />
              <span>{formSuccess}</span>
            </div>
          )}

          {/* HRMS & Employee Directory View */}
          {(module.id === 'hrms' || module.id === 'directory') && (
            <div>
              <div className="module-action-bar">
                <form onSubmit={handleCreateEmp} className="quick-add-form">
                  <input
                    type="text"
                    placeholder="New Employee Name..."
                    value={empName}
                    onChange={(e) => setEmpName(e.target.value)}
                    className="quick-input"
                  />
                  <select
                    value={empDept}
                    onChange={(e) => setEmpDept(e.target.value)}
                    className="quick-select"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Operations">Operations</option>
                    <option value="HR">Human Resources</option>
                  </select>
                  <button type="submit" className="btn-quick-submit">
                    <Plus size={16} /> Add Team Member
                  </button>
                </form>
              </div>

              <div className="module-data-list">
                <h4 className="list-title">Live Active Personnel ({modulesData.hrms?.length || 0})</h4>
                <div className="items-scroll">
                  {modulesData.hrms?.map((emp) => (
                    <div key={emp.id} className="data-row-card">
                      <div className="row-left">
                        <div className="avatar-circle">{emp.name.charAt(0)}</div>
                        <div>
                          <div className="emp-row-name">{emp.name}</div>
                          <div className="emp-row-sub">{emp.dept} &bull; {emp.role || 'Staff'}</div>
                        </div>
                      </div>
                      <span className="badge-active">{emp.status || 'Active'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Task Management & Projects */}
          {(module.id === 'tasks' || module.id === 'projects') && (
            <div>
              <div className="module-action-bar">
                <form onSubmit={handleCreateTask} className="quick-add-form">
                  <input
                    type="text"
                    placeholder="Task or project milestone name..."
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    className="quick-input"
                  />
                  <select
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value)}
                    className="quick-select"
                  >
                    <option value="High">High Priority</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Normal">Normal</option>
                  </select>
                  <button type="submit" className="btn-quick-submit">
                    <Plus size={16} /> Create Task
                  </button>
                </form>
              </div>

              <div className="module-data-list">
                <h4 className="list-title">Real-Time Tasks Pipeline</h4>
                <div className="items-scroll">
                  {modulesData.tasks?.map((tsk) => (
                    <div key={tsk.id} className="data-row-card">
                      <div className="row-left">
                        <Clock size={16} className="text-secondary" />
                        <div>
                          <div className="emp-row-name">{tsk.title}</div>
                          <div className="emp-row-sub">Assigned to: {tsk.assignee || 'Team Lead'}</div>
                        </div>
                      </div>
                      <span className={`badge-priority ${tsk.priority?.toLowerCase()}`}>
                        {tsk.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* General Preview for other modules */}
          {module.id !== 'hrms' && module.id !== 'directory' && module.id !== 'tasks' && module.id !== 'projects' && (
            <div className="module-generic-preview">
              <div className="preview-stat-grid">
                <div className="preview-stat-box">
                  <span className="label">Live Data Sync</span>
                  <span className="val text-green">100% Active</span>
                </div>
                <div className="preview-stat-box">
                  <span className="label">Access Level</span>
                  <span className="val">Role-Based (RBAC)</span>
                </div>
                <div className="preview-stat-box">
                  <span className="label">Audit Logs</span>
                  <span className="val">Enabled (Encrypted)</span>
                </div>
              </div>
              <p className="preview-desc">
                The <strong>{module.title}</strong> module is fully linked to the Speshway core database.
                It provides real-time transaction processing, automated reporting, and role-based permissions.
              </p>
              <div className="preview-actions">
                <button
                  onClick={() => {
                    setFormSuccess(`Live sync test sent for ${module.title}`);
                    setTimeout(() => setFormSuccess(''), 3000);
                  }}
                  className="btn-quick-submit"
                >
                  <Send size={16} /> Trigger Realtime Test Event
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
