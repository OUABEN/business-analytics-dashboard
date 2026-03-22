import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, Shield } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'user' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '1rem' }}>
          <div className="logo-icon">
            <Shield size={20} fill="white" />
          </div>
          <span style={{ fontSize: '20px', fontWeight: '700' }}>Nexus <span style={{ color: 'var(--primary-blue)' }}>Analytics</span></span>
        </div>
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Join the future of enterprise data intelligence</p>
      </div>

      <div className="auth-card" style={{ padding: '32px 40px' }}>
        <button className="btn-sso" style={{ marginTop: 0 }}>
          <Shield size={18} /> Continue with Enterprise SSO
        </button>

        <div className="divider">OR USE EMAIL</div>

        {error && <p style={{ color: 'var(--accent-red)', marginBottom: '1rem', fontSize: '13px', textAlign: 'center' }}>{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div className="input-container">
              <span className="input-icon"><User size={18} /></span>
              <input 
                type="text" 
                className="auth-input" 
                placeholder="John Doe"
                value={formData.username} 
                onChange={(e) => setFormData({...formData, username: e.target.value})} 
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Work Email</label>
            <div className="input-container">
              <span className="input-icon"><Mail size={18} /></span>
              <input 
                type="email" 
                className="auth-input" 
                placeholder="name@company.ai"
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                required 
              />
            </div>
          </div>
          
          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label className="form-label">Password</label>
            <div className="input-container">
              <span className="input-icon"><Lock size={18} /></span>
              <input 
                type={showPassword ? 'text' : 'password'} 
                className="auth-input" 
                placeholder="Min. 12 characters"
                value={formData.password} 
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                required 
              />
              <span 
                className="input-icon" 
                style={{ left: 'auto', right: '14px', cursor: 'pointer' }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          <button type="submit" className="btn-auth-primary">
            Create Account <UserPlus size={18} />
          </button>
        </form>

        <p style={{ marginTop: '24px', fontSize: '11px', color: 'var(--text-secondary)', textAlign: 'center', lineHeight: '1.6' }}>
          By signing up, you agree to our <a href="#" style={{ color: 'var(--primary-blue)', textDecoration: 'none' }}>Terms of Service</a> and <br /> <a href="#" style={{ color: 'var(--primary-blue)', textDecoration: 'none' }}>Privacy Policy</a>.
        </p>
      </div>

      <p style={{ marginTop: '32px', textAlign: 'center', fontSize: '14px', color: 'var(--text-secondary)' }}>
        Already have an account? <Link to="/login" style={{ color: 'var(--primary-blue)', textDecoration: 'none', fontWeight: '600' }}>Sign in here</Link>
      </p>
      
      <p style={{ marginTop: '40px', fontSize: '11px', color: 'rgba(255,255,255,0.2)', textAlign: 'center' }}>
        © 2026 NEXUS ANALYTICS CORP. ALL RIGHTS RESERVED.
      </p>
    </div>
  );
};

export default Register;
