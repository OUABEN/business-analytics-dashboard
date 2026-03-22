import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      console.log('Fetching user data...');
      const res = await axios.get('/api/auth/me');
      console.log('User data fetched successfully');
      setUser(res.data);
    } catch (err) {
      console.error('Failed to fetch user:', err.message);
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      console.log('Attempting login for:', email);
      const res = await axios.post('/api/auth/login', { email, password });
      console.log('Login response received');
      const { token, user } = res.data;
      
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      console.log('User state updated, login complete');
      return user;
    } catch (err) {
      console.error('Login error:', err.response?.data?.message || err.message);
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      console.log('Attempting registration...');
      await axios.post('/api/auth/register', userData);
      console.log('Registration successful');
    } catch (err) {
      console.error('Registration error:', err.response?.data?.message || err.message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
