import React from 'react';

export const Card = ({ title, children, style = {} }) => {
  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
        ...style,
      }}
    >
      {title && (
        <h3
          style={{
            fontSize: '1rem',
            fontWeight: 600,
            marginBottom: '12px',
            color: 'var(--text-primary)',
          }}
        >
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};
