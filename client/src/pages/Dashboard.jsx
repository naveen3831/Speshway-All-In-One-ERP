import React from 'react';
import { Card } from '../components/common/Card';

export const Dashboard = () => {
  const metrics = [
    { title: 'Total Revenue', value: '$124,560', change: '+12.5%' },
    { title: 'Active Orders', value: '38', change: '+4' },
    { title: 'Inventory Items', value: '1,240', change: '8 Low Stock' },
    { title: 'Employees', value: '54', change: '2 on Leave' },
  ];

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '20px' }}>
        ERP Overview Dashboard
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '28px',
        }}
      >
        {metrics.map((m, idx) => (
          <Card key={idx}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              {m.title}
            </div>
            <div
              style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                marginTop: '8px',
                color: 'var(--text-primary)',
              }}
            >
              {m.value}
            </div>
            <div
              style={{
                fontSize: '0.8rem',
                marginTop: '6px',
                color: '#16a34a',
                fontWeight: 500,
              }}
            >
              {m.change}
            </div>
          </Card>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '20px',
        }}
      >
        <Card title="Quick Actions & Modules">
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Manage operations across inventory, purchasing, sales pipeline, and human resources.
          </p>
        </Card>
        <Card title="System Status">
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            MongoDB & API Status: <span style={{ color: '#16a34a', fontWeight: 600 }}>Active</span>
          </p>
        </Card>
      </div>
    </div>
  );
};
