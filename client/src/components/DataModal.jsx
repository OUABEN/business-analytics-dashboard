import React, { useState, useEffect } from 'react';

const DataModal = ({ isOpen, onClose, onSave, editData }) => {
  const [formData, setFormData] = useState({
    date: '', category: 'Sales', department: '', amount: 0, revenue: 0, expenses: 0, description: ''
  });

  useEffect(() => {
    if (editData) setFormData(editData);
    else setFormData({ date: '', category: 'Sales', department: '', amount: 0, revenue: 0, expenses: 0, description: '' });
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(5, 8, 14, 0.9)', backdropFilter: 'blur(8px)', 
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div className="auth-card" style={{ maxWidth: '500px', padding: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px' }}>{editData ? 'Edit Data Stream' : 'Register New Data Node'}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ gridColumn: 'span 2' }}>
            <label className="form-label">Timestamp / Date</label>
            <input type="date" className="auth-input" style={{ paddingLeft: '14px' }} value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required />
          </div>
          <div>
            <label className="form-label">Category</label>
            <select className="auth-input" style={{ paddingLeft: '14px' }} value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="Operations">Operations</option>
            </select>
          </div>
          <div>
            <label className="form-label">Region/Dept</label>
            <input type="text" className="auth-input" style={{ paddingLeft: '14px' }} value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} required />
          </div>
          <div>
            <label className="form-label">Base Amount ($)</label>
            <input type="number" className="auth-input" style={{ paddingLeft: '14px' }} value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} required />
          </div>
          <div>
            <label className="form-label">Projected Revenue ($)</label>
            <input type="number" className="auth-input" style={{ paddingLeft: '14px' }} value={formData.revenue} onChange={e => setFormData({...formData, revenue: e.target.value})} required />
          </div>
          <div style={{ gridColumn: 'span 2', display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button type="submit" className="btn-auth-primary" style={{ margin: 0 }}>Save Node</button>
            <button type="button" className="btn-sso" style={{ margin: 0 }} onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DataModal;
