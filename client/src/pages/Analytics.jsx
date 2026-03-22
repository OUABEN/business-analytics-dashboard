import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';

const Analytics = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get('/api/data/analytics');
        setAnalytics(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return null;

  return (
    <div className="dark min-h-screen bg-background-dark font-display text-slate-100 selection:bg-primary/30">
      <div className="relative flex h-auto min-h-screen w-full overflow-x-hidden">
        {/* Sidebar Navigation */}
        <Sidebar />

        <div className="flex flex-col flex-1 min-w-0">
          {/* Header - Integrating into the main structure */}
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

        <div className="flex flex-1 overflow-hidden">
          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto bg-background-dark p-6 lg:p-8">
            {/* Page Title & Actions */}
            <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  Live System Status
                </div>
                <h1 className="text-slate-100 text-4xl font-bold tracking-tight">Detailed Performance Report</h1>
                <p className="text-slate-400 text-base max-w-lg">Real-time infrastructure analytics and latency monitoring across all global regions.</p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2.5 bg-navy-700 hover:bg-navy-700/70 text-slate-100 rounded-lg text-sm font-semibold border border-navy-700 transition-all">
                  <span className="material-symbols-outlined text-lg">calendar_month</span>
                  <span>Oct 1 - Oct 31</span>
                </button>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-semibold shadow-lg shadow-primary/20 transition-all">
                  <span className="material-symbols-outlined text-lg">download</span>
                  <span>Export PDF</span>
                </button>
              </div>
            </div>

            {/* Key Metrics Sparklines */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              <div className="bg-navy-800/50 border border-navy-700 p-5 rounded-xl flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-slate-500 text-sm font-medium">Global Uptime</p>
                    <h3 className="text-slate-100 text-2xl font-bold">99.98%</h3>
                  </div>
                  <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">speed</span>
                </div>
                <div className="h-10 w-full bg-gradient-to-r from-primary/5 via-primary/20 to-primary/5 rounded flex items-center">
                  <svg className="w-full h-8" viewBox="0 0 100 20">
                    <path d="M0 15 Q 10 5, 20 12 T 40 8 T 60 15 T 80 5 T 100 10" fill="none" stroke="#1337ec" strokeWidth="1.5"></path>
                  </svg>
                </div>
              </div>

              <div className="bg-navy-800/50 border border-navy-700 p-5 rounded-xl flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-slate-500 text-sm font-medium">Avg Latency</p>
                    <h3 className="text-slate-100 text-2xl font-bold">24ms</h3>
                  </div>
                  <span className="material-symbols-outlined text-accent-cyan bg-accent-cyan/10 p-2 rounded-lg">timer</span>
                </div>
                <div className="h-10 w-full bg-gradient-to-r from-accent-cyan/5 via-accent-cyan/20 to-accent-cyan/5 rounded flex items-center">
                  <svg className="w-full h-8" viewBox="0 0 100 20">
                    <path d="M0 10 Q 15 18, 30 12 T 50 15 T 70 8 T 90 12 T 100 5" fill="none" stroke="#00f2ff" strokeWidth="1.5"></path>
                  </svg>
                </div>
              </div>

              <div className="bg-navy-800/50 border border-navy-700 p-5 rounded-xl flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-slate-500 text-sm font-medium">Monthly Revenue</p>
                    <h3 className="text-slate-100 text-2xl font-bold">${analytics?.monthly?.[0]?.total_revenue?.toLocaleString() || '12.4k'}</h3>
                  </div>
                  <span className="material-symbols-outlined text-purple-500 bg-purple-500/10 p-2 rounded-lg">database</span>
                </div>
                <div className="h-10 w-full bg-gradient-to-r from-purple-500/5 via-purple-500/20 to-purple-500/5 rounded flex items-center">
                  <svg className="w-full h-8" viewBox="0 0 100 20">
                    <path d="M0 18 L 10 12 L 20 15 L 40 5 L 60 10 L 80 4 L 100 12" fill="none" stroke="#a855f7" strokeWidth="1.5"></path>
                  </svg>
                </div>
              </div>

              <div className="bg-navy-800/50 border border-navy-700 p-5 rounded-xl flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-slate-500 text-sm font-medium">Active Users</p>
                    <h3 className="text-slate-100 text-2xl font-bold">4.2M</h3>
                  </div>
                  <span className="material-symbols-outlined text-green-500 bg-green-500/10 p-2 rounded-lg">bolt</span>
                </div>
                <div className="h-10 w-full bg-gradient-to-r from-green-500/5 via-green-500/20 to-green-500/5 rounded flex items-center">
                  <svg className="w-full h-8" viewBox="0 0 100 20">
                    <path d="M0 10 Q 20 2, 40 10 T 60 18 T 80 5 T 100 12" fill="none" stroke="#22c55e" strokeWidth="1.5"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Main Data Table Section */}
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Data Table */}
              <div className="flex-1 bg-navy-800/30 border border-navy-700 rounded-xl overflow-hidden">
                <div className="px-6 py-5 border-b border-navy-700 flex justify-between items-center">
                  <h2 className="text-slate-100 text-lg font-bold">Regional Performance</h2>
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-400 hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-xl">filter_list</span>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-xl">more_vert</span>
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-navy-700/20">
                        <th className="px-6 py-4 text-slate-400 font-semibold text-xs uppercase tracking-wider">
                          <div className="flex items-center gap-1 cursor-pointer">Region <span className="material-symbols-outlined text-sm">unfold_more</span></div>
                        </th>
                        <th className="px-6 py-4 text-slate-400 font-semibold text-xs uppercase tracking-wider">
                          <div className="flex items-center gap-1 cursor-pointer">Status <span className="material-symbols-outlined text-sm">unfold_more</span></div>
                        </th>
                        <th className="px-6 py-4 text-slate-400 font-semibold text-xs uppercase tracking-wider">
                          <div className="flex items-center gap-1 cursor-pointer">Load <span className="material-symbols-outlined text-sm">unfold_more</span></div>
                        </th>
                        <th className="px-6 py-4 text-slate-400 font-semibold text-xs uppercase tracking-wider">
                          <div className="flex items-center gap-1 cursor-pointer">Efficiency <span className="material-symbols-outlined text-sm">unfold_more</span></div>
                        </th>
                        <th className="px-6 py-4 text-slate-400 font-semibold text-xs uppercase tracking-wider">Latency</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-navy-700">
                      <tr className="hover:bg-navy-700/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                            <span className="text-slate-100 font-medium">US-East-1 (North Virginia)</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold uppercase">Optimal</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="w-24 bg-navy-700 h-1.5 rounded-full">
                            <div className="bg-primary h-full w-[45%] rounded-full shadow-[0_0_8px_rgba(19,55,236,0.4)]"></div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-300 font-medium">98.4%</td>
                        <td className="px-6 py-4 text-slate-400">12ms</td>
                      </tr>
                      <tr className="hover:bg-navy-700/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                            <span className="text-slate-100 font-medium">EU-West-2 (London)</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold uppercase">Optimal</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="w-24 bg-navy-700 h-1.5 rounded-full">
                            <div className="bg-primary h-full w-[62%] rounded-full shadow-[0_0_8px_rgba(19,55,236,0.4)]"></div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-300 font-medium">94.2%</td>
                        <td className="px-6 py-4 text-slate-400">18ms</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sidebar Filters / Utils */}
              <aside className="w-full lg:w-80 flex flex-col gap-6">
                <div className="bg-navy-800/50 border border-navy-700 p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-slate-100 font-bold">Timeline</h3>
                    <div className="flex gap-1">
                      <button className="material-symbols-outlined text-lg text-slate-500 hover:text-white">chevron_left</button>
                      <button className="material-symbols-outlined text-lg text-slate-500 hover:text-white">chevron_right</button>
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs text-center mb-4">October 2023</p>
                  <div className="grid grid-cols-7 gap-1 text-center mb-4">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                      <div key={day} className="text-[10px] text-slate-500 font-bold">{day}</div>
                    ))}
                    {[...Array(31)].map((_, i) => (
                      <div key={i} className={`h-8 flex items-center justify-center text-xs text-slate-100 rounded-lg hover:bg-navy-700 cursor-pointer ${i === 4 ? 'bg-primary text-white shadow-sm' : ''}`}>
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-navy-800/50 border border-navy-700 p-6 rounded-xl flex flex-col gap-5">
                  <h3 className="text-slate-100 font-bold">Refine Results</h3>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-slate-500 font-bold uppercase">Regions</label>
                    <select className="bg-navy-700 border-navy-700 rounded-lg text-sm text-slate-100 focus:ring-primary focus:border-primary p-2 outline-none">
                      <option>All Global Regions</option>
                      <option>North America</option>
                      <option>Europe</option>
                    </select>
                  </div>
                  <button className="w-full py-2.5 mt-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-semibold transition-all shadow-lg shadow-primary/20">
                    Apply All Filters
                  </button>
                </div>
              </aside>
            </div>

            {/* Live Map Placeholder */}
            <div className="mt-8 bg-navy-800/30 border border-navy-700 rounded-xl p-8 relative overflow-hidden min-h-[300px] flex items-center justify-center">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #1337ec 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
              <div className="relative z-10 flex flex-col items-center gap-4">
                <span className="material-symbols-outlined text-6xl text-primary animate-pulse">language</span>
                <div className="text-center">
                  <h3 className="text-slate-100 text-xl font-bold">Global Infrastructure Node Map</h3>
                  <p className="text-slate-500 text-sm">Interactive visualization of all 42 active data centers</p>
                </div>
                <button className="px-6 py-2 bg-navy-700 text-slate-100 rounded-full text-xs font-bold border border-navy-700 hover:border-primary transition-all">
                  Expand Full Map View
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Analytics;
