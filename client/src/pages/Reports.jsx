import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';

const Reports = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/data');
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return null;

  return (
    <div className="dark min-h-screen bg-background-dark font-display text-slate-100 selection:bg-primary/30 flex overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-background-light dark:bg-background-dark relative">
        <div className="absolute inset-0 geometric-grid pointer-events-none opacity-50"></div>
        
        {/* Header */}
        <header className="h-16 border-b border-slate-200 dark:border-primary/20 flex items-center justify-between px-8 bg-white/50 dark:bg-background-dark/50 backdrop-blur-md relative z-10">
          <div className="flex items-center gap-4 flex-1">
            <h2 className="text-xl font-bold">Reports</h2>
            <div className="max-w-md w-full ml-4">
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
                <input 
                  className="w-full bg-slate-100 dark:bg-primary/5 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/50 transition-all outline-none" 
                  placeholder="Search reports, tags or files..." 
                  type="text" 
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="size-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-primary/10 text-slate-600 dark:text-slate-400 transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="bg-primary text-white text-sm font-bold py-2 px-4 rounded-lg flex items-center gap-2 neon-glow hover:opacity-90 transition-opacity">
              <span className="material-symbols-outlined text-sm">add</span>
              Generate New
            </button>
          </div>
        </header>

        {/* Main Body */}
        <div className="flex-1 overflow-y-auto p-8 relative z-10">
          {/* Filters and View Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-primary text-white text-sm font-medium">All Reports</button>
              <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-slate-200 dark:bg-primary/10 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-300 dark:hover:bg-primary/20 transition-colors">Financial</button>
              <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-slate-200 dark:bg-primary/10 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-300 dark:hover:bg-primary/20 transition-colors">Infrastructure</button>
              <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-slate-200 dark:bg-primary/10 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-300 dark:hover:bg-primary/20 transition-colors">Security</button>
              <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-slate-200 dark:bg-primary/10 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-300 dark:hover:bg-primary/20 transition-colors">Performance</button>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/20 rounded-lg p-1">
                <span className="material-symbols-outlined text-slate-400 px-2 text-lg">calendar_today</span>
                <span className="text-sm font-medium px-2 border-l border-slate-200 dark:border-primary/20 text-slate-700 dark:text-slate-300">Oct 01 - Oct 31, 2023</span>
                <button className="material-symbols-outlined text-slate-400 px-2 text-lg">expand_more</button>
              </div>
              <div className="flex items-center gap-1 bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/20 rounded-lg p-1">
                <button className="p-1.5 rounded bg-primary text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">list</span>
                </button>
                <button className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-primary/10 text-slate-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">grid_view</span>
                </button>
              </div>
            </div>
          </div>

          {/* Reports Table Container */}
          <div className="bg-white dark:bg-background-dark/40 border border-slate-200 dark:border-primary/20 rounded-xl overflow-hidden backdrop-blur-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-primary/5 border-b border-slate-200 dark:border-primary/20">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Report Title</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Date Created</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">File Size</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-primary/10">
                {data.slice(0, 5).map((item, idx) => (
                  <tr key={item.id || idx} className="hover:bg-slate-50 dark:hover:bg-primary/5 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className={`size-10 rounded flex items-center justify-center ${idx % 2 === 0 ? 'bg-blue-500/10 text-blue-500' : 'bg-purple-500/10 text-purple-500'}`}>
                          <span className="material-symbols-outlined">{idx % 2 === 0 ? 'payments' : 'dns'}</span>
                        </div>
                        <div>
                          <p className="font-bold text-sm text-slate-900 dark:text-slate-100">{item.category} {item.department} Audit</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{item.department} Activity Logs</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-300 font-medium">
                      {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-500 dark:text-slate-400">{(item.amount / 1000).toFixed(1)} MB</td>
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Generated
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-lg">visibility</span>
                        </button>
                        <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-lg">download</span>
                        </button>
                        <button className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-8 flex items-center justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">Showing 1 to {Math.min(data.length, 5)} of {data.length} reports</p>
            <div className="flex items-center gap-2">
              <button className="size-10 rounded-lg border border-slate-200 dark:border-primary/20 flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="size-10 rounded-lg bg-primary text-white font-bold text-sm flex items-center justify-center">1</button>
              <button className="size-10 rounded-lg border border-slate-200 dark:border-primary/20 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-primary/10 transition-colors text-sm font-medium">2</button>
              <button className="size-10 rounded-lg border border-slate-200 dark:border-primary/20 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-primary/10 transition-colors text-sm font-medium">3</button>
              <span className="text-slate-400 px-2">...</span>
              <button className="size-10 rounded-lg border border-slate-200 dark:border-primary/20 flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Futuristic Info Card */}
          <div className="mt-12 p-6 rounded-xl bg-gradient-to-br from-primary/10 via-background-dark to-primary/5 border border-primary/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-9xl text-primary">auto_awesome</span>
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-slate-900 dark:text-slate-100">
                <span className="material-symbols-outlined text-primary">psychology</span>
                AI Intelligence Scan
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl mb-4">
                Automated reports are running based on your custom schedules. The system has detected a potential anomaly in Infrastructure Load. Would you like to generate a deep-dive audit?
              </p>
              <div className="flex gap-3">
                <button className="bg-primary/20 text-primary border border-primary/30 py-1.5 px-4 rounded-lg text-sm font-bold hover:bg-primary/30 transition-colors">
                  Run Deep Audit
                </button>
                <button className="text-slate-500 dark:text-slate-400 py-1.5 px-4 rounded-lg text-sm font-medium hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;
