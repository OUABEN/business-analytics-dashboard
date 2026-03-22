import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, BarChart2, FileText, Users, Settings, HelpCircle, LogOut
} from 'lucide-react';

const Sidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="sidebar">
      <div className="logo-section">
        <div className="logo-icon-box">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
        </div>
        <div>
          <h1 style={{ fontSize: '18px', fontWeight: '700', lineHeight: 1.1 }}>DataVision</h1>
          <p style={{ fontSize: '11px', color: '#64748b' }}>Enterprise AI</p>
        </div>
      </div>

      <nav style={{ flex: 1 }}>
        <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
          <LayoutDashboard size={20} /> Dashboard
        </Link>
        <Link to="/analytics" className={`nav-link ${isActive('/analytics') ? 'active' : ''}`}>
          <BarChart2 size={20} /> Analytics
        </Link>
        <Link to="/reports" className={`nav-link ${isActive('/reports') ? 'active' : ''}`}>
          <FileText size={20} /> Reports
        </Link>
        <Link to="/team" className={`nav-link ${isActive('/team') ? 'active' : ''}`}>
          <Users size={20} /> Team
        </Link>
        <Link to="/profile" className={`nav-link ${isActive('/profile') ? 'active' : ''}`}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>account_circle</span> Profile
        </Link>
        
        <div className="sidebar-label">System</div>
        <Link to="/settings" className={`nav-link ${isActive('/settings') ? 'active' : ''}`}>
          <Settings size={20} /> Settings
        </Link>
        <Link to="/support" className={`nav-link ${isActive('/support') ? 'active' : ''}`}>
          <HelpCircle size={20} /> Support
        </Link>
      </nav>

      <div className="sidebar-footer">
 
        <button onClick={logout} className="nav-link" style={{ marginTop: '24px', width: '100%', border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left' }}>
           <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
