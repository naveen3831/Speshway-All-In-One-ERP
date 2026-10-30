import React from 'react';
import { useSocket } from '../../context/SocketContext';
import { Inbox, Mail, Building, Calendar } from 'lucide-react';

export const AdminInquiries = () => {
  const { modulesData } = useSocket();
  const inquiries = modulesData.demoRequests || [];

  return (
    <div className="admin-page-view">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-heading">Demo Requests &amp; Lead Inquiries</h1>
          <p className="admin-subtext">Live inbound business inquiries submitted from the website landing page.</p>
        </div>
      </div>

      <div className="admin-card table-card">
        {inquiries.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
            <Inbox size={36} style={{ margin: '0 auto 12px auto', color: '#94a3b8' }} />
            <p>No new customer inquiries yet. Test the "Request a Demo" button on the website!</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Contact Name</th>
                  <th>Work Email</th>
                  <th>Company</th>
                  <th>Module of Interest</th>
                  <th>Date &amp; Time</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq) => (
                  <tr key={inq.id}>
                    <td><strong>{inq.name}</strong></td>
                    <td><a href={`mailto:${inq.email}`} style={{ color: '#2563eb' }}>{inq.email}</a></td>
                    <td>{inq.company || 'Enterprise'}</td>
                    <td><span className="badge-active">{inq.module || 'All-in-One Suite'}</span></td>
                    <td style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      {inq.date ? new Date(inq.date).toLocaleString() : 'Recent'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
