import React from 'react';

const StatCard = ({ title, value, icon: Icon, percentage, isPositive }) => (
  <div className="s-card">
    <div className="s-card-top">
      <div className="icon-wrapper">
        <Icon size={22} color="#1d4ed8" />
      </div>
      <div className={`p-badge ${isPositive ? 'up' : 'down'}`}>
        {isPositive ? '+' : ''}{percentage}%
      </div>
    </div>
    <div style={{ marginTop: 'auto' }}>
      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>{title}</p>
      <h3 style={{ fontSize: '28px', fontWeight: '700' }}>{value}</h3>
    </div>
  </div>
);

export default StatCard;
