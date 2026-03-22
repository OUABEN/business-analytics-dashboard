import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';

const Profile = () => {
  const { user } = useAuth();
  
  const stats = [
    { label: 'System Contributions', value: '254', icon: 'edit_square', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Impact Score', value: '98.2', icon: 'auto_awesome', color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Active Projects', value: '12', icon: 'assignment_turned_in', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Team Rank', value: 'Top 3%', icon: 'military_tech', color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ];

  const activities = [
    { title: 'Generated Q4 Revenue Report', time: '14 minutes ago', icon: 'description', color: 'text-blue-500' },
    { title: 'Resolved Infrastructure Anomaly #442', time: '2 hours ago', icon: 'bug_report', color: 'text-rose-500' },
    { title: 'Updated API Security Protocols', time: 'Yesterday', icon: 'shield', color: 'text-purple-500' },
    { title: 'Onboarded 3 New Team Members', time: '2 days ago', icon: 'person_add', color: 'text-emerald-500' },
  ];

  return (
    <div className="dark min-h-screen bg-background-dark font-display text-slate-100 selection:bg-primary/30 flex overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-background-light dark:bg-background-dark relative">
        <div className="absolute inset-0 geometric-grid pointer-events-none opacity-50"></div>
        
        {/* Profile Header (Cover + Avatar) */}
        <div className="relative h-64 shrink-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-purple-600/80 mix-blend-multiply opacity-60"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent"></div>
          
          <div className="absolute -bottom-16 left-8 flex items-end gap-6 z-20">
            <div className="size-32 rounded-3xl border-4 border-background-dark overflow-hidden bg-white shadow-2xl">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuACJJUpadCRoeRbUZtD5klciqZGiHav0b5gcrG0Wa4bo9ZYJ0UB92g_r-AhL7Fu30IxhF0v1OaKCylKczRGTq414Yju_sK4r4BKtfwVLKXa_JMEiJqbRsnfS7WJbMjnNt670Qbn6QsWZWLi40rup0G0-6PWk2ryNfotE2nuU_2M917t_BVk9MmGlY665HTCeEsMaems-q93xGDh_bs1UlLzuhG7Pu0L1oWjbuHcjUcjRgsFZf5noRSBQ8rOzOf7XxEiE_xfZ23F-4E" alt="Profile" className="size-full object-cover" />
            </div>
            <div className="pb-4">
              <h1 className="text-3xl font-bold tracking-tight text-white mb-1 shadow-sm">{user?.username || 'Alex Rivera'}</h1>
              <p className="text-slate-300 font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm">verified</span>
                Senior Analytics Architect
              </p>
            </div>
          </div>

          <div className="absolute bottom-4 right-8 z-20 flex gap-3">
             <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 py-2 px-6 rounded-xl text-sm font-bold transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">edit</span>
              Edit Profile
            </button>
            <button className="bg-primary hover:opacity-90 text-white py-2 px-6 rounded-xl text-sm font-bold shadow-lg shadow-primary/30 transition-all">
              Settings
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto pt-24 pb-12 px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Stats and Info */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white dark:bg-background-dark/40 border border-slate-200 dark:border-primary/20 backdrop-blur-sm group hover:border-primary/50 transition-colors">
                    <span className={`material-symbols-outlined ${stat.color} mb-3 block`}>{stat.icon}</span>
                    <p className="text-2xl font-bold mb-1">{stat.value}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Personal Analytics (Chart Placeholder Style) */}
              <div className="p-6 rounded-3xl bg-white dark:bg-background-dark/40 border border-slate-200 dark:border-primary/20 backdrop-blur-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">analytics</span>
                    Performance Overview
                  </h3>
                  <div className="flex gap-2">
                    {['W', 'M', 'Y'].map(t => (
                      <button key={t} className={`size-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${t === 'M' ? 'bg-primary text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-primary/10'}`}>{t}</button>
                    ))}
                  </div>
                </div>
                
                {/* SVG Chart Placeholder */}
                <div className="h-48 w-full relative">
                   <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100">
                    <defs>
                      <linearGradient id="grad-profile" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1337ec" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#1337ec" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,80 Q40,70 80,40 T160,50 T240,20 T320,60 T400,30 V100 H0 Z" fill="url(#grad-profile)" />
                    <path d="M0,80 Q40,70 80,40 T160,50 T240,20 T320,60 T400,30" fill="none" stroke="#1337ec" strokeWidth="3" strokeLinecap="round" />
                    {[0, 80, 160, 240, 320, 400].map((x, i) => (
                      <circle key={i} cx={x} cy={i === 0 ? 80 : (i === 1 ? 40 : (i === 2 ? 50 : (i === 3 ? 20 : (i === 5 ? 30 : 60)))) } r="4" fill="#1337ec" className="glow-dot" />
                    ))}
                  </svg>
                </div>
                
                <div className="grid grid-cols-2 gap-8 mt-8 pt-8 border-t border-slate-100 dark:border-primary/10">
                  <div>
                    <p className="text-xs text-slate-500 font-bold mb-1 uppercase tracking-widest">Avg. Task Velocity</p>
                    <p className="text-xl font-bold">1.2h <span className="text-xs text-emerald-500 font-bold ml-1">(-12%)</span></p>
                  </div>
                   <div>
                    <p className="text-xs text-slate-500 font-bold mb-1 uppercase tracking-widest">Accuracy Rate</p>
                    <p className="text-xl font-bold">99.8% <span className="text-xs text-emerald-500 font-bold ml-1">(Stable)</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Activity and Badges */}
            <div className="space-y-8">
              
              {/* Activity Timeline */}
              <div className="p-6 rounded-3xl bg-white dark:bg-background-dark/40 border border-slate-200 dark:border-primary/20 backdrop-blur-sm">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">history</span>
                  Recent Activity
                </h3>
                <div className="space-y-6">
                  {activities.map((act, i) => (
                    <div key={i} className="flex gap-4 relative group">
                      {i !== activities.length - 1 && <div className="absolute left-4 top-8 bottom-0 w-px bg-slate-200 dark:bg-primary/20"></div>}
                      <div className="size-8 rounded-full bg-slate-100 dark:bg-primary/5 border border-slate-200 dark:border-primary/20 flex items-center justify-center shrink-0 z-10 bg-white">
                        <span className={`material-symbols-outlined text-sm ${act.color}`}>{act.icon}</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors cursor-pointer">{act.title}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{act.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-8 py-2 text-xs font-bold text-slate-500 hover:text-primary transition-colors border border-slate-100 dark:border-primary/10 rounded-xl">View Full History</button>
              </div>

              {/* AI Badge Section */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 relative overflow-hidden group">
                <div className="absolute -top-4 -right-4 size-24 bg-primary/20 blur-2xl rounded-full group-hover:scale-150 transition-all duration-500"></div>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 relative z-10">
                  <span className="material-symbols-outlined text-primary">military_tech</span>
                  Earned Badges
                </h3>
                <div className="flex flex-wrap gap-2 relative z-10">
                  <div className="px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-500 uppercase tracking-wider">Deep Audit Pro</div>
                  <div className="px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold text-purple-500 uppercase tracking-wider">Anomaly Hunter</div>
                  <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Speed Runner</div>
                  <div className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-bold text-amber-500 uppercase tracking-wider">AI Expert</div>
                </div>
                <p className="mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center group-hover:text-primary transition-colors cursor-pointer">Explore Rewards <span className="material-symbols-outlined text-[10px] align-middle">chevron_right</span></p>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
