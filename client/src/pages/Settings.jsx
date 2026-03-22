import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: 'settings' },
    { id: 'profile', label: 'Profile', icon: 'person' },
    { id: 'security', label: 'Security', icon: 'security' },
    { id: 'api', label: 'API Keys', icon: 'api' },
  ];

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
            <h2 className="text-xl font-bold">Settings</h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="size-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-primary/10 text-slate-600 dark:text-slate-400 transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="size-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary text-xs font-bold">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Main Body */}
        <div className="flex-1 overflow-y-auto p-8 relative z-10">
          <div className="max-w-4xl">
            {/* Tabs Navigation */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-primary/5 p-1 rounded-xl w-fit mb-8 border border-slate-200 dark:border-primary/10">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id 
                      ? 'bg-white dark:bg-primary text-primary dark:text-white shadow-sm' 
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === 'general' && (
                <div className="bg-white dark:bg-background-dark/40 border border-slate-200 dark:border-primary/20 rounded-xl p-6 backdrop-blur-sm">
                  <h3 className="text-lg font-bold mb-6">General Settings</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Workspace Name</label>
                        <input className="w-full bg-slate-50 dark:bg-primary/5 border border-slate-200 dark:border-primary/10 rounded-lg py-2 px-4 text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all text-slate-900 dark:text-slate-100" defaultValue="DataVision Enterprise" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Language</label>
                        <select className="w-full bg-slate-50 dark:bg-primary/5 border border-slate-200 dark:border-primary/10 rounded-lg py-2 px-4 text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all text-slate-700 dark:text-slate-300">
                          <option>English (US)</option>
                          <option>French (FR)</option>
                          <option>Spanish (ES)</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Timezone</label>
                      <select className="w-full bg-slate-50 dark:bg-primary/5 border border-slate-200 dark:border-primary/10 rounded-lg py-2 px-4 text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all text-slate-700 dark:text-slate-300">
                        <option>(GMT-08:00) Pacific Time</option>
                        <option>(GMT+00:00) UTC</option>
                        <option>(GMT+01:00) Paris</option>
                      </select>
                    </div>
                    <div className="pt-4 border-t border-slate-100 dark:border-primary/10 flex justify-end">
                       <button className="bg-primary text-white text-sm font-bold py-2 px-6 rounded-lg neon-glow hover:opacity-90 transition-opacity">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'profile' && (
                <div className="bg-white dark:bg-background-dark/40 border border-slate-200 dark:border-primary/20 rounded-xl p-6 backdrop-blur-sm">
                  <h3 className="text-lg font-bold mb-6">Profile Settings</h3>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex flex-col items-center gap-4">
                      <div className="size-24 rounded-full bg-primary/10 border-2 border-primary/40 flex items-center justify-center text-primary text-3xl font-bold relative group">
                        {user?.username?.charAt(0).toUpperCase()}
                        <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                          <span className="material-symbols-outlined text-white">photo_camera</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-500 uppercase font-bold">Upload Avatar</p>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Username</label>
                        <input className="w-full bg-slate-50 dark:bg-primary/5 border border-slate-200 dark:border-primary/10 rounded-lg py-2 px-4 text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all text-slate-900 dark:text-slate-100" defaultValue={user?.username} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Bio</label>
                        <textarea className="w-full bg-slate-50 dark:bg-primary/5 border border-slate-200 dark:border-primary/10 rounded-lg py-2 px-4 text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all h-24 text-slate-900 dark:text-slate-100" placeholder="Tell us about yourself..." />
                      </div>
                      <div className="pt-4 flex justify-end">
                        <button className="bg-primary text-white text-sm font-bold py-2 px-6 rounded-lg neon-glow hover:opacity-90 transition-opacity">
                          Update Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div className="bg-white dark:bg-background-dark/40 border border-slate-200 dark:border-primary/20 rounded-xl p-6 backdrop-blur-sm">
                    <h3 className="text-lg font-bold mb-6">Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Current Password</label>
                        <input type="password" title="password" className="w-full bg-slate-50 dark:bg-primary/5 border border-slate-200 dark:border-primary/10 rounded-lg py-2 px-4 text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all text-slate-900 dark:text-slate-100" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">New Password</label>
                          <input type="password" title="password" className="w-full bg-slate-50 dark:bg-primary/5 border border-slate-200 dark:border-primary/10 rounded-lg py-2 px-4 text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all text-slate-900 dark:text-slate-100" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Confirm New Password</label>
                          <input type="password" title="password" className="w-full bg-slate-50 dark:bg-primary/5 border border-slate-200 dark:border-primary/10 rounded-lg py-2 px-4 text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all text-slate-900 dark:text-slate-100" />
                        </div>
                      </div>
                      <div className="pt-4 flex justify-end">
                        <button className="bg-primary text-white text-sm font-bold py-2 px-6 rounded-lg neon-glow hover:opacity-90 transition-opacity">
                          Change Password
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-background-dark/40 border border-slate-200 dark:border-primary/20 rounded-xl p-6 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold mb-1">Two-Factor Authentication</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Add an extra layer of security to your account.</p>
                      </div>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" title="2fa" className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none dark:bg-slate-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'api' && (
                <div className="bg-white dark:bg-background-dark/40 border border-slate-200 dark:border-primary/20 rounded-xl p-6 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold">AI Integration Keys</h3>
                    <button className="text-primary text-xs font-bold flex items-center gap-1 hover:underline">
                      <span className="material-symbols-outlined text-sm">add</span>
                      Create New Key
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-slate-50 dark:bg-primary/5 border border-slate-200 dark:border-primary/10 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Production API Key</p>
                        <p className="text-xs text-slate-500 font-mono">sk-••••••••••••••••4f2a</p>
                      </div>
                      <div className="flex items-center gap-2">
                         <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-lg">content_copy</span>
                        </button>
                        <button className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 italic">
                      <span className="material-symbols-outlined text-[10px] align-middle mr-1">warning</span>
                      Keep your API keys secret. Never share them or expose them in client-side code.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Danger Zone */}
            <div className="mt-12 p-6 rounded-xl border border-rose-500/20 bg-rose-500/5 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-rose-500 mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined">report_problem</span>
                Danger Zone
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                Permanently delete your workspace and all associated data. This action is irreversible.
              </p>
              <button className="bg-rose-500 text-white text-sm font-bold py-2 px-6 rounded-lg hover:bg-rose-600 transition-colors shadow-lg shadow-rose-500/20">
                Delete Workspace
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
