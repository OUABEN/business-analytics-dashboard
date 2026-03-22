import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const Support = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const faqs = [
    { question: 'How do I export my analytics data?', answer: 'You can export your data from the Reports page by clicking the "Generate New" button and selecting your desired format (PDF, CSV, or JSON).' },
    { question: 'Can I invite more than 10 team members?', answer: 'Enterprise plan users have unlimited team member seats. Standard plans are limited to 10 members per workspace.' },
    { question: 'How is the API Latency calculated?', answer: 'Latency is measured as the round-trip time from our global edge nodes to your primary service endpoint, averaged over a 5-minute window.' },
    { question: 'Is my data encrypted at rest?', answer: 'Yes, all enterprise data is encrypted using AES-256 at rest and TLS 1.3 in transit.' },
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
            <h2 className="text-xl font-bold">Support Center</h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-primary/10 text-primary text-xs font-bold py-2 px-4 rounded-lg border border-primary/20 hover:bg-primary/20 transition-colors">
              Status: Operational
            </button>
          </div>
        </header>

        {/* Main Body */}
        <div className="flex-1 overflow-y-auto p-8 relative z-10">
          {/* Hero Search Section */}
          <div className="text-center mb-16 pt-8">
            <h1 className="text-4xl font-bold mb-4 tracking-tight">How can we help you today?</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-2xl mx-auto">Search our knowledge base or browse through our common questions to get started with DataVision Enterprise.</p>
            
            <div className="max-w-2xl mx-auto relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-2xl">search</span>
              <input 
                className="w-full bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/20 rounded-2xl py-4 pl-14 pr-6 text-base focus:ring-4 focus:ring-primary/20 transition-all outline-none shadow-xl shadow-primary/5 text-slate-900 dark:text-slate-100" 
                placeholder="Search for articles, guides, or keywords..." 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="p-6 rounded-2xl bg-white dark:bg-background-dark/40 border border-slate-200 dark:border-primary/20 backdrop-blur-sm hover:border-primary/50 transition-colors cursor-pointer group">
              <div className="size-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">mail</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Email Support</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Response time: Usually within 2 hours for Enterprise users.</p>
              <span className="text-primary text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                Send a message <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-background-dark/40 border border-slate-200 dark:border-primary/20 backdrop-blur-sm hover:border-primary/50 transition-colors cursor-pointer group">
              <div className="size-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">forum</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Live Chat</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Available 24/7 for technical troubleshooting and setup.</p>
              <span className="text-primary text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                Start chatting <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-background-dark/40 border border-slate-200 dark:border-primary/20 backdrop-blur-sm hover:border-primary/50 transition-colors cursor-pointer group">
              <div className="size-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">menu_book</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Documentation</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Full API reference, tutorials, and integration guides.</p>
              <span className="text-primary text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                View guides <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">live_help</span>
              Common Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white dark:bg-background-dark/40 border border-slate-200 dark:border-primary/20 rounded-xl overflow-hidden backdrop-blur-sm">
                  <button className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-primary/5 transition-colors">
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{faq.question}</span>
                    <span className="material-symbols-outlined text-slate-400">add</span>
                  </button>
                  <div className="px-5 pb-5">
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Info Card */}
          <div className="mt-16 p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-background-dark to-primary/5 border border-primary/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-9xl text-primary">auto_awesome</span>
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold mb-2 flex items-center justify-center md:justify-start gap-2 text-slate-900 dark:text-slate-100">
                  <span className="material-symbols-outlined text-primary">psychology</span>
                  Need specialized AI help?
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl">
                  Our dedicated AI integration team is available to help you build custom models and optimize your data pipeline for high-performance analytics.
                </p>
              </div>
              <button className="bg-primary text-white py-3 px-8 rounded-xl text-sm font-bold neon-glow hover:opacity-90 transition-opacity whitespace-nowrap">
                Schedule AI Consultation
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Support;
