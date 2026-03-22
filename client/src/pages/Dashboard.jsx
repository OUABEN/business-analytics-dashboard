import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters] = useState({ category: '', department: '' });

  useEffect(() => {
    fetchDashboardData();
  }, [filters]);

  const fetchDashboardData = async () => {
    try {
      const [analyticsRes, dataRes] = await Promise.all([
        axios.get('/api/data/analytics'),
        axios.get('/api/data', { params: filters })
      ]);
      setAnalytics(analyticsRes.data);
      setData(dataRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return null;

  return (
    <div className="dark min-h-screen bg-background-dark font-display text-slate-100 selection:bg-primary/30">
      <div className="flex h-screen overflow-hidden data-grid-bg relative">
        {/* Sidebar Navigation */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {/* Background Orbs */}
          <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[30rem] h-[30rem] bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

          {/* Header */}
           <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-navy-700 px-6 py-4 bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3 text-primary">
                <span className="material-symbols-outlined text-3xl font-bold">token</span>
                <h2 className="text-slate-100 text-xl font-bold leading-tight tracking-tight">Business Analytics</h2>
              </div>
              <div className="hidden md:flex flex-col min-w-64">
                <div className="flex w-full items-stretch rounded-lg h-10 bg-navy-700/50 border border-navy-700">
                  <div className="text-slate-400 flex items-center justify-center pl-4">
                    <span className="material-symbols-outlined text-xl">search</span>
                  </div>
                  <input className="bg-transparent border-none focus:ring-0 text-slate-100 placeholder:text-slate-500 text-sm w-full outline-none" placeholder="Search infrastructure..." />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-navy-700 text-slate-100 hover:bg-navy-700/80">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-navy-700 text-slate-100 hover:bg-navy-700/80">
              <span className="material-symbols-outlined">settings</span>
            </button>
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-accent-cyan p-0.5">
              <div className="h-full w-full rounded-full bg-navy-800 flex items-center justify-center overflow-hidden">
                <img className="h-full w-full object-cover" alt="User avatar" src="https://i.pravatar.cc/150?u=alex" />
              </div>
            </div>
          </div>
        </header>

          {/* Scrollable Dashboard Content */}
          <div className="flex-1 overflow-y-auto p-8 z-10">
            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-surface/40 backdrop-blur-lg border border-slate-200 dark:border-primary/10 rounded-xl p-6 hover:border-primary/40 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <span className="material-symbols-outlined">payments</span>
                  </div>
                  <span className="text-emerald-500 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded">+12.5%</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Revenue</p>
                <p className="text-2xl font-bold mt-1 tracking-tight">${analytics?.summary?.totalRevenue?.toLocaleString() || '1,284,430'}</p>
              </div>

              <div className="bg-white dark:bg-surface/40 backdrop-blur-lg border border-slate-200 dark:border-primary/10 rounded-xl p-6 hover:border-primary/40 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent">
                    <span className="material-symbols-outlined">person_add</span>
                  </div>
                  <span className="text-emerald-500 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded">+8.2%</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Active Users</p>
                <p className="text-2xl font-bold mt-1 tracking-tight">42,500</p>
              </div>

              <div className="bg-white dark:bg-surface/40 backdrop-blur-lg border border-slate-200 dark:border-primary/10 rounded-xl p-6 hover:border-primary/40 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                    <span className="material-symbols-outlined">ads_click</span>
                  </div>
                  <span className="text-orange-500 text-xs font-bold bg-orange-500/10 px-2 py-1 rounded">-0.5%</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Conversion Rate</p>
                <p className="text-2xl font-bold mt-1 tracking-tight">3.24%</p>
              </div>

              <div className="bg-white dark:bg-surface/40 backdrop-blur-lg border border-slate-200 dark:border-primary/10 rounded-xl p-6 hover:border-primary/40 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                    <span className="material-symbols-outlined">speed</span>
                  </div>
                  <span className="text-emerald-500 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded">+5.1%</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Avg. Response Time</p>
                <p className="text-2xl font-bold mt-1 tracking-tight">142ms</p>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Large Revenue Chart */}
              <div className="lg:col-span-2 bg-white dark:bg-surface/40 backdrop-blur-lg border border-slate-200 dark:border-primary/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="font-bold text-lg">Performance Over Time</h3>
                    <p className="text-xs text-slate-500">Data updated 5 minutes ago</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-background-dark/50">Day</button>
                    <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-primary text-white">Week</button>
                    <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-background-dark/50">Month</button>
                  </div>
                </div>
                <div className="h-64 relative flex items-end justify-between px-2">
                  <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="gradient" x1="0%" x2="0%" y1="0%" y2="100%">
                        <stop offset="0%" stopColor="#1337ec" stopOpacity="0.2"></stop>
                        <stop offset="100%" stopColor="#1337ec" stopOpacity="0"></stop>
                      </linearGradient>
                    </defs>
                    <path d="M0,180 C50,160 100,200 150,140 C200,80 250,120 300,60 C350,20 400,100 450,80 C500,60 550,140 600,120 L600,250 L0,250 Z" fill="url(#gradient)" stroke="none"></path>
                    <path d="M0,180 C50,160 100,200 150,140 C200,80 250,120 300,60 C350,20 400,100 450,80 C500,60 550,140 600,120" fill="none" stroke="#1337ec" strokeLinecap="round" strokeWidth="3"></path>
                    <circle className="glow-dot" cx="300" cy="60" fill="#00f2ff" r="4"></circle>
                  </svg>
                  <div className="w-full flex justify-between absolute bottom-[-24px] px-4 text-[10px] text-slate-400 font-medium">
                    {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => <span key={day}>{day}</span>)}
                  </div>
                </div>
              </div>

              {/* User Acquisition Distribution */}
              <div className="bg-white dark:bg-surface/40 backdrop-blur-lg border border-slate-200 dark:border-primary/10 rounded-xl p-6 flex flex-col">
                <h3 className="font-bold text-lg mb-6">Device Distribution</h3>
                <div className="flex-1 flex flex-col justify-center items-center">
                  <div className="relative size-48">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <circle className="text-slate-100 dark:text-background-dark/50" cx="18" cy="18" fill="none" r="15.915" stroke="currentColor" strokeWidth="3.5"></circle>
                      <circle cx="18" cy="18" fill="none" r="15.915" stroke="#1337ec" strokeDasharray="60 40" strokeDashoffset="25" strokeWidth="3.5"></circle>
                      <circle cx="18" cy="18" fill="none" r="15.915" stroke="#00f2ff" strokeDasharray="25 75" strokeDashoffset="85" strokeWidth="3.5"></circle>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold">12.4k</span>
                      <span className="text-[10px] uppercase text-slate-500 tracking-tighter">Total Hits</span>
                    </div>
                  </div>
                  <div className="mt-8 w-full space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-primary"></span>
                        <span className="text-sm">Desktop</span>
                      </div>
                      <span className="font-bold">60%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-accent"></span>
                        <span className="text-sm">Mobile</span>
                      </div>
                      <span className="font-bold">25%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-slate-300 dark:bg-surface"></span>
                        <span className="text-sm">Tablet</span>
                      </div>
                      <span className="font-bold">15%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Regional Table */}
            <div className="bg-white dark:bg-surface/40 backdrop-blur-lg border border-slate-200 dark:border-primary/10 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-slate-200 dark:border-primary/10 flex items-center justify-between">
                <h3 className="font-bold text-lg">Global Node Status</h3>
                <button className="text-sm text-primary font-bold flex items-center gap-1 hover:underline">
                  Export Report <span className="material-symbols-outlined text-sm">download</span>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-background-dark/50 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Node Region</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">System Load</th>
                      <th className="px-6 py-4">Efficiency</th>
                      <th className="px-6 py-4 text-right">Activity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-primary/10 text-slate-100">
                    {data.slice(0, 5).map((item, idx) => (
                      <tr key={item.id || idx} className="hover:bg-slate-50 dark:hover:bg-primary/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="size-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                              <span className="material-symbols-outlined">public</span>
                            </div>
                            <span className="font-medium">{idx === 0 ? 'North America (US-East)' : idx === 1 ? 'European Union (Frankfurt)' : 'Asia Pacific (Tokyo)'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${idx === 1 ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'}`}>
                            {idx === 1 ? 'MAINTENANCE' : 'OPERATIONAL'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-24 h-1.5 bg-slate-100 dark:bg-surface rounded-full overflow-hidden">
                              <div className={`h-full ${idx === 1 ? 'bg-amber-500' : 'bg-primary'}`} style={{ width: idx === 1 ? '40%' : idx === 0 ? '85%' : '92%' }}></div>
                            </div>
                            <span className="text-sm font-bold">{idx === 1 ? '40%' : idx === 0 ? '85%' : '92%'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">{idx === 0 ? '98.2%' : idx === 1 ? '94.5%' : '99.1%'}</td>
                        <td className="px-6 py-4 text-right">
                          <img alt="Sparkline graph" className="ml-auto opacity-70" src={`https://lh3.googleusercontent.com/aida-public/${idx === 1 ? 'AB6AXuDRejxNcUxZ-KAKA3xcXzjMYhpeAM1dJ-kQWNQCCr49l-vvxFow9knAZdDWu8LKv0kln29tot4xQcxQrORAXVdcV0KpLO6d7E8hQppktQ7BdJoZHQO4W-87FPQbRJXGFmEhF2_a0rtBUhXi-lKavKlGNlZqnUDIBRdc854r_Zc1zA9U1V_1Ec37LMdhpB_Z6DsSeOj5Py_BRTIg7R5IA_EtB0mUR3uH7cLNy-frWbPkQutdcsAV5fnTIUNujR0csncPY9tc1sb5N-E' : 'AB6AXuABUJgclHS4q-oqW4FKBZsFnGqk5DDw6UAoqi7gwBxBOqmk2Y5KJOb5eXhNv-VwmA5-stV0UayTm2SUR_vOAT1JDba8-N0JZUbETpUtcegBdRiELbbfl1HzeYXG9V3baJWbQkdpWHq4xHUIcRzjvdqXu26sAs34JYzXAobcDoVbk0DTE46LZAKbWbeAB1T3fcOBeTXIrFQpG7S4zQ-6O3AOYBJTBWgRfvQXdrVWrUCSj3h282uOFyR8HSZQSPEL2U4q1z1TEB8-Dp0'}`} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
