import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';

const Team = () => {
  const { user } = useAuth();
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'Alex Rivera', role: 'System Admin', email: 'alex@datavision.ai', status: 'Online', avatar: 'https://i.pravatar.cc/150?u=alex' },
    { id: 2, name: 'Sarah Chen', role: 'Data Scientist', email: 'sarah@datavision.ai', status: 'In Meeting', avatar: 'https://i.pravatar.cc/150?u=sarah' },
    { id: 3, name: 'Marco Rossi', role: 'DevOps Engineer', email: 'marco@datavision.ai', status: 'Offline', avatar: 'https://i.pravatar.cc/150?u=marco' },
    { id: 4, name: 'Elena Petrova', role: 'UI/UX Designer', email: 'elena@datavision.ai', status: 'Online', avatar: 'https://i.pravatar.cc/150?u=elena' },
    { id: 5, name: 'James Wilson', role: 'Frontend Lead', email: 'james@datavision.ai', status: 'Online', avatar: 'https://i.pravatar.cc/150?u=james' },
  ]);

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
            <h2 className="text-xl font-bold">Team Management</h2>
            <div className="max-w-md w-full ml-4">
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
                <input 
                  className="w-full bg-slate-100 dark:bg-primary/5 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/50 transition-all outline-none" 
                  placeholder="Search team members..." 
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
              <span className="material-symbols-outlined text-sm">person_add</span>
              Invite Member
            </button>
          </div>
        </header>

        {/* Main Body */}
        <div className="flex-1 overflow-y-auto p-8 relative z-10">
          {/* Section: Active Members */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">Workspace Members</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Manage your team and their permissions.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Sort by:</span>
              <select className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/20 rounded-lg text-sm px-2 py-1 outline-none text-slate-700 dark:text-slate-300">
                <option>Name</option>
                <option>Role</option>
                <option>Status</option>
              </select>
            </div>
          </div>

          {/* Members Table */}
          <div className="bg-white dark:bg-background-dark/40 border border-slate-200 dark:border-primary/20 rounded-xl overflow-hidden backdrop-blur-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-primary/5 border-b border-slate-200 dark:border-primary/20">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Member</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Role</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Email</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-primary/10">
                {teamMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50 dark:hover:bg-primary/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full border-2 border-primary/20 p-0.5">
                          <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-slate-900 dark:text-slate-100">{member.name}</p>
                          <p className="text-[10px] text-primary font-medium uppercase tracking-tighter">Member ID: #{member.id * 1024}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">{member.role}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-[10px] font-bold uppercase border ${
                        member.status === 'Online' 
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                          : member.status === 'In Meeting'
                          ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                          : 'bg-slate-500/10 text-slate-500 border-slate-500/20'
                      }`}>
                        <span className={`size-1.5 rounded-full ${
                          member.status === 'Online' ? 'bg-emerald-500 animate-pulse' : member.status === 'In Meeting' ? 'bg-amber-500' : 'bg-slate-500'
                        }`}></span>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                      {member.email}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-lg">edit</span>
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

          {/* Productivity Stats Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white dark:bg-background-dark/40 border border-slate-200 dark:border-primary/20 backdrop-blur-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="material-symbols-outlined text-6xl text-primary">groups</span>
              </div>
              <h4 className="text-sm font-bold text-slate-500 uppercase mb-4 tracking-wider">Total Members</h4>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold">12</span>
                <span className="text-xs text-emerald-500 mb-1 flex items-center font-bold">
                  <span className="material-symbols-outlined text-xs">trending_up</span>
                  +2 this month
                </span>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-background-dark/40 border border-slate-200 dark:border-primary/20 backdrop-blur-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="material-symbols-outlined text-6xl text-primary">speed</span>
              </div>
              <h4 className="text-sm font-bold text-slate-500 uppercase mb-4 tracking-wider">Team Velocity</h4>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold">94%</span>
                <span className="text-xs text-emerald-500 mb-1 flex items-center font-bold">
                  <span className="material-symbols-outlined text-xs">trending_up</span>
                  +5.2%
                </span>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-background-dark/40 border border-slate-200 dark:border-primary/20 backdrop-blur-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="material-symbols-outlined text-6xl text-primary">psychology</span>
              </div>
              <h4 className="text-sm font-bold text-slate-500 uppercase mb-4 tracking-wider">AI Training Hours</h4>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold">128</span>
                <span className="text-xs text-slate-400 mb-1 font-bold">Hrs Total</span>
              </div>
            </div>
          </div>

          {/* Futuristic Activity Card */}
          <div className="mt-12 p-6 rounded-xl bg-gradient-to-br from-primary/10 via-background-dark to-primary/5 border border-primary/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-9xl text-primary">hub</span>
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-slate-100">
                <span className="material-symbols-outlined text-primary">timeline</span>
                Recent Team Activity
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-white/5">
                  <div className="size-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                    <span className="material-symbols-outlined text-sm">upload</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold">Elena Petrova uploaded new design assets</p>
                    <p className="text-[10px] text-slate-500">24 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-white/5">
                  <div className="size-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold">Project "DataVision Dashboard" marked as complete</p>
                    <p className="text-[10px] text-slate-500">2 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Team;
