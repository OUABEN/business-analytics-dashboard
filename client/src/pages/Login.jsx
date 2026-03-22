import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login form submitted with:', email);
    setError('');
    try {
      const user = await login(email, password);
      console.log('Login successful, navigating to dashboard...');
      navigate('/dashboard');
    } catch (err) {
      console.error('Catch block in Login.jsx hit:', err);
      setError(err.response?.data?.message || 'Failed to login. Please check your credentials or server status.');
    }
  };

  return (
    <div className="auth-page">
      <div className="logo-section" style={{ marginBottom: '2rem' }}>
        <div className="logo-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
        </div>
        <span style={{ fontSize: '20px', fontWeight: '700', letterSpacing: '-0.5px' }}>Aether<span style={{ color: 'var(--primary-blue)' }}>Analytics</span></span>
      </div>

      <div className="auth-card">
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Access your intelligence dashboard and real-time neural streams.</p>
        
        {error && <p style={{ color: 'var(--accent-red)', marginBottom: '1rem', fontSize: '13px', textAlign: 'center' }}>{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Work Email</label>
            <div className="input-container">
              <span className="input-icon"><Mail size={18} /></span>
              <input 
                type="email" 
                className="auth-input" 
                placeholder="name@company.ai"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
          </div>
          
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label className="form-label" style={{ marginBottom: 0 }}>Access Key</label>
              <a href="#" style={{ fontSize: '12px', color: 'var(--primary-blue)', textDecoration: 'none' }}>Forgot access key?</a>
            </div>
            <div className="input-container">
              <span className="input-icon"><Lock size={18} /></span>
              <input 
                type={showPassword ? 'text' : 'password'} 
                className="auth-input" 
                placeholder="••••••••"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <input type="checkbox" style={{ width: '16px', height: '16px', accentColor: 'var(--primary-blue)' }} id="sync" />
            <label htmlFor="sync" style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Stay synced for 30 days</label>
          </div>

          <button type="submit" className="btn-auth-primary">
            Initialize Session <LogIn size={18} />
          </button>
        </form>

        <button className="btn-sso">
          <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" width="18" height="18" alt="Google" />
          Sign in with Enterprise SSO
        </button>

        <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '13px', color: 'var(--text-secondary)' }}>
          New to the future? <Link to="/register" style={{ color: 'var(--primary-blue)', textDecoration: 'none', fontWeight: '600' }}>Create an account</Link>
        </p>
      </div>
      
      <p style={{ marginTop: '40px', fontSize: '11px', color: 'rgba(255,255,255,0.2)', textAlign: 'center' }}>
        © 2026 AETHERANALYTICS SYSTEMS. ENCRYPTED UNDER AES-256 STANDARD.
      </p>
    </div>
  );
};

export default Login;
