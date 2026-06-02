import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Clock, Download, FileText, Lock, Play, PlayCircle, Video } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../layouts/DashboardLayout';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate({ to: '/login' });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  const getTabClass = (tabName) => {
    return activeTab === tabName
      ? "flex items-center gap-4 px-4 py-3.5 bg-[#fff0f3] text-[#de1d4d] rounded-2xl font-semibold text-sm transition-colors w-full text-left"
      : "flex items-center gap-4 px-4 py-3.5 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 rounded-2xl font-medium text-sm transition-colors w-full text-left";
  };

  const renderContent = () => {
    switch (activeTab) {
      // ════ LIVE CLASSES TAB ════
      case 'live': {
        const upcomingClasses = [
          { id: 1, title: 'JLPT N5 Vocabulary - Session 04', time: 'Today, 10:00 AM - 11:30 AM', hasPermission: true },
          { id: 2, title: 'Kanji Practice - Session 05', time: 'Tomorrow, 10:00 AM - 11:30 AM', hasPermission: false }
        ];

        return (
          <div className="flex-1 flex flex-col w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold text-zinc-900 mb-2 tracking-tight" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>Live Classes</h2>
            <p className="text-zinc-500 text-sm mb-8">Manage and join your upcoming scheduled Zoom sessions. (Premium access required for certain classes).</p>
            
            <div className="flex flex-col gap-4">
              {upcomingClasses.map(session => (
                <div key={session.id} className={`bg-white rounded-[2rem] p-6 lg:p-8 border shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all ${session.hasPermission ? 'border-zinc-100' : 'border-zinc-50 bg-zinc-50/50'}`}>
                  <div>
                    <p className={`font-bold text-[10px] uppercase tracking-widest mb-2 ${session.hasPermission ? 'text-[#de1d4d]' : 'text-zinc-400'}`}>
                      {session.hasPermission ? 'Next Up' : 'Locked Class'}
                    </p>
                    <h3 className={`text-xl font-bold mb-2 ${session.hasPermission ? 'text-zinc-900' : 'text-zinc-600'}`}>{session.title}</h3>
                    <p className="text-zinc-500 text-sm flex items-center gap-2">
                      <Clock size={16} className={session.hasPermission ? 'text-[#de1d4d]' : 'text-zinc-400'} /> {session.time}
                    </p>
                  </div>
                  
                  {session.hasPermission ? (
                    <button className="w-full md:w-auto px-8 py-3.5 text-white rounded-full font-semibold text-sm transition-all shadow-lg hover:scale-105 flex items-center justify-center gap-2"
                            style={{ background: 'linear-gradient(135deg, #fb7185 0%, #f43f5e 100%)' }}>
                      <Video size={18} /> Join Zoom Room
                    </button>
                  ) : (
                    <button disabled className="w-full md:w-auto px-8 py-3.5 bg-zinc-200 text-zinc-500 rounded-full font-semibold text-sm cursor-not-allowed flex items-center justify-center gap-2">
                      <Lock size={18} /> Locked - Premium Only
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      }

      // ════ RECORDINGS TAB ════
      case 'recordings': {
        const recordingsList = [
          { id: 1, title: 'Grammar Particles Part 1', date: 'May 21, 2026', category: 'Grammar Particles', hasPermission: true },
          { id: 2, title: 'Grammar Particles Part 2', date: 'May 22, 2026', category: 'Grammar Particles', hasPermission: false },
          { id: 3, title: 'Casual vs Formal Speech', date: 'May 23, 2026', category: 'Spoken Practice', hasPermission: false },
          { id: 4, title: 'Ordering at a Restaurant', date: 'May 25, 2026', category: 'Spoken Practice', hasPermission: true },
        ];

        const groupedRecordings = recordingsList.reduce((acc, recording) => {
          if (!acc[recording.category]) acc[recording.category] = [];
          acc[recording.category].push(recording);
          return acc;
        }, {});

        return (
          <div className="flex-1 flex flex-col w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold text-zinc-900 mb-2 tracking-tight" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>Recordings</h2>
            <p className="text-zinc-500 text-sm mb-8">Catch up on missed classes. (Note: Premium recordings require admin approval to view).</p>
            
            <div className="flex flex-col gap-12">
              {Object.keys(groupedRecordings).map((category) => (
                <div key={category}>
                  <div className="flex items-center gap-4 mb-6">
                    <h3 className="text-lg font-bold text-zinc-800 uppercase tracking-widest">{category}</h3>
                    <div className="h-px bg-zinc-200 flex-1"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {groupedRecordings[category].map((recording) => (
                      <div key={recording.id} className={`bg-white rounded-[2rem] overflow-hidden border border-zinc-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] transition-all ${recording.hasPermission ? 'group cursor-pointer hover:shadow-lg' : 'opacity-90 cursor-not-allowed'}`}>
                        <div className="h-44 bg-zinc-100 relative flex items-center justify-center overflow-hidden">
                          <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop" alt="Class thumbnail" className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${recording.hasPermission ? 'opacity-60 group-hover:scale-105' : 'opacity-40 grayscale'}`} />
                          
                          <div className={`w-14 h-14 backdrop-blur-sm rounded-full flex items-center justify-center z-10 shadow-sm transition-transform ${recording.hasPermission ? 'bg-white/90 text-[#de1d4d] group-hover:scale-110' : 'bg-zinc-800/70 text-white'}`}>
                            {recording.hasPermission ? <Play size={24} fill="currentColor" className="ml-1" /> : <Lock size={20} />}
                          </div>

                          {!recording.hasPermission && (
                            <div className="absolute top-4 left-4 bg-zinc-900/80 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full z-10">Awaiting Access</div>
                          )}
                        </div>
                        
                        <div className="p-6">
                          <h4 className={`font-bold mb-1 ${recording.hasPermission ? 'text-zinc-900' : 'text-zinc-600'}`}>{recording.title}</h4>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-zinc-500 text-xs">Recorded on {recording.date}</p>
                            {!recording.hasPermission && <span className="text-zinc-400 text-xs font-semibold">Locked</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      // ════ STUDY MATERIALS TAB ════
      case 'materials':
        return (
          <div className="flex-1 flex flex-col w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold text-zinc-900 mb-2 tracking-tight" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>Study Materials</h2>
            <p className="text-zinc-500 text-sm mb-8">Download worksheets, flashcards, and lesson PDFs.</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {['Hiragana Practice Sheet', 'N5 Vocabulary List', 'Verb Conjugation Chart', 'Kanji Strokes Guide'].map((doc, i) => (
                <div key={i} className="bg-white p-5 rounded-[1.5rem] border border-zinc-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#fff0f3] text-[#de1d4d] rounded-2xl flex items-center justify-center shrink-0">
                      <FileText size={22} />
                    </div>
                    <div>
                      <h3 className="font-bold text-zinc-900 text-sm">{doc}</h3>
                      <p className="text-zinc-500 text-xs mt-0.5">PDF Document · {(Math.random() * 3 + 1).toFixed(1)} MB</p>
                    </div>
                  </div>
                  <button className="w-10 h-10 rounded-full border border-zinc-100 flex items-center justify-center text-zinc-400 group-hover:text-[#de1d4d] group-hover:bg-[#fff0f3] transition-colors shrink-0">
                    <Download size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      // ════ SETTINGS TAB ════
      case 'settings':
        return (
          <div className="flex-1 flex flex-col w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold text-zinc-900 mb-2 tracking-tight" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>Settings</h2>
            <p className="text-zinc-500 text-sm mb-8">Manage your account preferences and personal details.</p>
            
            <div className="bg-white p-6 lg:p-8 rounded-[2rem] border border-zinc-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] space-y-6">
              <div>
                <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Display Name</label>
                <input type="text" defaultValue="Lakshitha" className="w-full px-5 py-3.5 rounded-2xl border border-zinc-200 focus:outline-none focus:border-[#de1d4d] focus:ring-1 transition-colors text-zinc-900" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Email Address</label>
                <input type="email" defaultValue="lakshithad576@gmail.com" disabled className="w-full px-5 py-3.5 rounded-2xl border border-zinc-100 bg-zinc-50 text-zinc-500 cursor-not-allowed" />
              </div>
              <div className="pt-4 border-t border-zinc-100">
                <button className="w-full md:w-auto px-8 py-3.5 bg-[#de1d4d] hover:bg-[#be1640] text-white rounded-2xl font-bold text-sm transition-colors shadow-lg shadow-rose-500/20">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        );

      // ════ DEFAULT DASHBOARD TAB ════
      default:
        return (
          <div className="flex-1 flex flex-col xl:flex-row gap-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Left Column: Welcome & Stats */}
            <div className="flex-1 flex flex-col">
              <p className="text-xs font-bold text-[#de1d4d] uppercase tracking-widest mb-4">Welcome Back</p>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-zinc-900 mb-6 tracking-tight leading-tight" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                Welcome back,<br />Lakshitha 👋
              </h1>
              <p className="text-zinc-600 text-sm mb-10 max-w-md leading-relaxed">
                Continue your Japanese learning journey today with live classes, recordings, and JLPT preparation.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 mb-14 w-full">
                <button onClick={() => handleTabChange('live')} className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 text-white rounded-full font-semibold text-sm transition-all shadow-lg hover:scale-105"
                        style={{ background: 'linear-gradient(135deg, #fb7185 0%, #f43f5e 100%)' }}>
                  <PlayCircle size={18} strokeWidth={2.5} /> Join Today's Zoom Class
                </button>
                <button onClick={() => handleTabChange('materials')} className="w-full sm:w-auto px-8 py-3.5 bg-white text-zinc-900 rounded-full font-semibold text-sm transition-all hover:bg-zinc-50 hover:scale-105 border border-zinc-100 shadow-sm text-center">
                  Continue Learning
                </button>
              </div>

              {/* 3 Info Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-auto">
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl border border-white shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Next Class</p>
                  <p className="text-lg font-bold text-zinc-900">May 23 · 10:00 AM</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl border border-white shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Countdown</p>
                  <p className="text-lg font-bold text-[#de1d4d]">01h 22m</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl border border-white shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex flex-col justify-center items-start">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">JLPT</p>
                  <span className="px-3 py-1 bg-[#fff0f3] text-[#de1d4d] text-xs font-bold rounded-full">N5 Beginner</span>
                </div>
              </div>
            </div>

            {/* Right Column: Featured Card (Daily Vocabulary) */}
            <div className="w-full xl:w-[300px] bg-white/70 backdrop-blur-md rounded-[2rem] p-6 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col shrink-0">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-bold text-[#de1d4d] uppercase tracking-widest">Daily Vocab</p>
                <span className="px-2 py-1 bg-[#fff0f3] text-[#de1d4d] text-[9px] font-bold rounded-full">5 Words</span>
              </div>
              <h2 className="text-xl font-bold text-zinc-900 mb-2 leading-tight tracking-tight">Sakura Sunrise Lessons</h2>
              <p className="text-xs text-zinc-500 leading-relaxed mb-5">Master today's vocabulary. Check back tomorrow for a new set!</p>
              
              <div className="flex-1 flex flex-col gap-2.5">
                {[
                  { kanji: '桜', romaji: 'sakura', meaning: 'Cherry Blossom' },
                  { kanji: '先生', romaji: 'sensei', meaning: 'Teacher' },
                  { kanji: '勉強', romaji: 'benkyou', meaning: 'Study' },
                  { kanji: '毎日', romaji: 'mainichi', meaning: 'Every day' },
                  { kanji: 'おはよう', romaji: 'ohayou', meaning: 'Good morning' },
                ].map((word, idx) => (
                  <div key={idx} className="bg-white/50 hover:bg-white transition-all p-3 rounded-2xl border border-white/80 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_4px_15px_rgb(222,29,77,0.05)] flex items-center justify-between group cursor-default">
                    <div>
                      <p className="text-base font-bold text-zinc-800 leading-none mb-1 group-hover:text-[#de1d4d] transition-colors">{word.kanji}</p>
                      <p className="text-[9px] font-medium text-zinc-400 uppercase tracking-widest">{word.romaji}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-zinc-600 group-hover:text-zinc-900 transition-colors">{word.meaning}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        );
    }
  };

  return (
    <DashboardLayout
      activeTab={activeTab}
      isMobileMenuOpen={isMobileMenuOpen}
      onLogout={handleLogout}
      onTabChange={handleTabChange}
      onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
    >
      {renderContent()}
    </DashboardLayout>
  );
}