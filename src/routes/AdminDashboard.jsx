import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { 
  X, Bell, LogOut, LayoutDashboard, CalendarDays, 
  Video, BookOpen, Settings, PanelLeftClose,
  Flower2, Users, ShieldCheck, Plus, Trash2, Edit3, Save, FolderPlus, Search, UploadCloud, ImagePlus
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  // ─── STATE: Daily Vocabulary ──────────────────────────────────────────────
  const [vocabList, setVocabList] = useState([
    { id: 1, kanji: '', romaji: '', meaning: '' },
    { id: 2, kanji: '', romaji: '', meaning: '' },
    { id: 3, kanji: '', romaji: '', meaning: '' },
    { id: 4, kanji: '', romaji: '', meaning: '' },
    { id: 5, kanji: '', romaji: '', meaning: '' },
  ]);

  const handleVocabChange = (id, field, value) => {
    setVocabList(prevList => 
      prevList.map(word => word.id === id ? { ...word, [field]: value } : word)
    );
  };

  const handlePublishVocab = () => {
    console.log("Publishing to database:", vocabList);
    alert("Vocabulary updated successfully! Students will now see these 5 words.");
  };

  // ─── STATE: Dynamic Categories & Student Permissions ──────────────────────
  const [categories, setCategories] = useState(['Live Zoom Classes', 'Grammar Particles', 'Spoken Practice']);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [students, setStudents] = useState([
    { id: 1, name: 'Lakshitha', email: 'lakshithad576@gmail.com', plan: 'N5 Premium', permissions: { 'Live Zoom Classes': true, 'Grammar Particles': true, 'Spoken Practice': true } },
    { id: 2, name: 'Kavindi Samarakoon', email: 'kavindi@example.com', plan: 'N5 Basic', permissions: { 'Live Zoom Classes': false, 'Grammar Particles': false, 'Spoken Practice': false } },
    { id: 3, name: 'Navodaka Janitha', email: 'navodaka@example.com', plan: 'N4 Premium', permissions: { 'Live Zoom Classes': true, 'Grammar Particles': true, 'Spoken Practice': false } },
  ]);

  const handleAddCategory = () => {
    if (newCategoryName.trim() && !categories.includes(newCategoryName.trim())) {
      const category = newCategoryName.trim();
      setCategories([...categories, category]);
      setStudents(prevStudents => prevStudents.map(student => ({
        ...student,
        permissions: { ...student.permissions, [category]: false }
      })));
      setNewCategoryName('');
    }
  };

  const handleCategoryPermissionToggle = (studentId, categoryName) => {
    setStudents(prevStudents => 
      prevStudents.map(student => {
        if (student.id === studentId) {
          return {
            ...student,
            permissions: {
              ...student.permissions,
              [categoryName]: !student.permissions[categoryName]
            }
          };
        }
        return student;
      })
    );
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setCategories(categories.filter(c => c !== categoryToRemove));
  };

  // ─── STATE: Recording Uploads ─────────────────────────────────────────────
  const [uploadData, setUploadData] = useState({
    title: '',
    category: '',
    date: ''
  });

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    console.log("Uploading Video:", uploadData);
    alert(`Recording "${uploadData.title}" uploaded to category "${uploadData.category || categories[0]}"!`);
    setUploadData({ title: '', category: '', date: '' });
  };

  // ─── HELPER: Sidebar Styling ──────────────────────────────────────────────
  const getTabClass = (tabName) => {
    return activeTab === tabName
      ? "flex items-center gap-4 px-4 py-3.5 bg-[#fff0f3] text-[#de1d4d] rounded-2xl font-semibold text-sm transition-colors w-full text-left border border-[#ffe4ea]"
      : "flex items-center gap-4 px-4 py-3.5 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 rounded-2xl font-medium text-sm transition-colors w-full text-left";
  };

  const renderContent = () => {
    switch (activeTab) {
      
      // ════ UPLOAD RECORDING TAB ════
      case 'upload':
        return (
          <div className="flex-1 flex flex-col w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold text-zinc-900 mb-2 tracking-tight" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>Upload Recording</h2>
            <p className="text-zinc-500 text-sm mb-8">Publish a new Zoom class recording to a specific learning category.</p>

            <form onSubmit={handleUploadSubmit} className="bg-white rounded-[2.5rem] p-8 lg:p-10 border border-zinc-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex flex-col lg:flex-row gap-10">
              
              {/* Left Column: Drag & Drop Zone */}
              <div className="flex-1">
                <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-3">Video File</label>
                <div className="w-full h-64 border-2 border-dashed border-zinc-200 rounded-[2rem] bg-zinc-50 hover:bg-[#fff0f3]/50 hover:border-[#de1d4d]/30 transition-all flex flex-col items-center justify-center cursor-pointer group">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 group-hover:text-[#de1d4d] transition-all">
                    <UploadCloud size={28} strokeWidth={2} className="text-zinc-400 group-hover:text-[#de1d4d]" />
                  </div>
                  <p className="font-bold text-zinc-700 mb-1">Click to browse or drag video here</p>
                  <p className="text-xs text-zinc-400">MP4, WebM or MOV (Max. 2GB)</p>
                </div>

                <div className="mt-6 flex items-center gap-4 p-4 rounded-2xl border border-zinc-100 bg-zinc-50 cursor-pointer hover:border-zinc-300 transition-colors">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <ImagePlus size={18} className="text-zinc-500" />
                  </div>
                  <div>
                    <p className="font-bold text-zinc-700 text-sm">Add custom thumbnail</p>
                    <p className="text-xs text-zinc-400">Optional (16:9 ratio recommended)</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Input Fields */}
              <div className="flex-1 flex flex-col gap-6">
                <div>
                  <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Recording Title</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Grammar Particles Part 4" 
                    value={uploadData.title}
                    onChange={e => setUploadData({...uploadData, title: e.target.value})}
                    className="w-full px-5 py-3.5 rounded-2xl border border-zinc-200 focus:outline-none focus:border-[#de1d4d] focus:ring-1 focus:ring-[#de1d4d] transition-colors text-zinc-800 placeholder-zinc-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Category Assignment</label>
                  <select 
                    required
                    value={uploadData.category}
                    onChange={e => setUploadData({...uploadData, category: e.target.value})}
                    className="w-full px-5 py-3.5 rounded-2xl border border-zinc-200 focus:outline-none focus:border-[#de1d4d] focus:ring-1 focus:ring-[#de1d4d] transition-colors text-zinc-800 bg-white appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select a category...</option>
                    {categories.map((cat, idx) => (
                      <option key={idx} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <p className="text-[11px] text-zinc-400 mt-2">Only students with access to this category will see the video.</p>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Recording Date</label>
                  <input 
                    type="date" 
                    required
                    value={uploadData.date}
                    onChange={e => setUploadData({...uploadData, date: e.target.value})}
                    className="w-full px-5 py-3.5 rounded-2xl border border-zinc-200 focus:outline-none focus:border-[#de1d4d] focus:ring-1 focus:ring-[#de1d4d] transition-colors text-zinc-800 bg-white cursor-pointer"
                  />
                </div>

                <div className="mt-auto pt-6">
                  <button type="submit" className="w-full py-4 bg-[#de1d4d] hover:bg-[#be1640] text-white rounded-2xl font-bold text-sm transition-colors shadow-lg shadow-rose-500/20 flex items-center justify-center gap-2">
                    <Video size={18} /> Publish Recording
                  </button>
                </div>
              </div>
            </form>
          </div>
        );

      // ════ DAILY VOCABULARY TAB ════
      case 'vocab':
        return (
          <div className="flex-1 flex flex-col w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold text-zinc-900 mb-2 tracking-tight" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>Daily Vocabulary</h2>
                <p className="text-zinc-500 text-sm">Update the 5 daily words for the Sakura Sunrise section.</p>
              </div>
              <button 
                onClick={handlePublishVocab}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#de1d4d] hover:bg-[#be1640] text-white rounded-full text-sm font-semibold transition-all shadow-md"
              >
                <Save size={16} /> Publish Today's Words
              </button>
            </div>
            
            <div className="bg-white rounded-[2rem] p-8 border border-zinc-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] space-y-4">
              {vocabList.map((word) => (
                <div key={word.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center p-4 rounded-2xl border border-zinc-100 bg-zinc-50/50 hover:bg-white hover:shadow-sm transition-all focus-within:ring-1 focus-within:ring-[#de1d4d] focus-within:bg-white">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#ffe4ea] text-[#de1d4d] flex items-center justify-center font-bold text-sm shrink-0">
                      {word.id}
                    </div>
                    <input 
                      type="text" 
                      placeholder="Kanji / Kana (e.g. 桜)" 
                      value={word.kanji}
                      onChange={(e) => handleVocabChange(word.id, 'kanji', e.target.value)}
                      className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-zinc-900 font-bold placeholder-zinc-400" 
                    />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Romaji (e.g. sakura)" 
                    value={word.romaji}
                    onChange={(e) => handleVocabChange(word.id, 'romaji', e.target.value)}
                    className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-zinc-600 text-sm placeholder-zinc-400" 
                  />
                  <input 
                    type="text" 
                    placeholder="English Meaning" 
                    value={word.meaning}
                    onChange={(e) => handleVocabChange(word.id, 'meaning', e.target.value)}
                    className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-zinc-600 text-sm placeholder-zinc-400" 
                  />
                  <div className="flex justify-end gap-2 opacity-50">
                    <button className="p-2 text-zinc-400 hover:text-blue-500 transition-colors"><Edit3 size={16} /></button>
                    <button onClick={() => handleVocabChange(word.id, 'kanji', '')} className="p-2 text-zinc-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      // ════ ACCESS PERMISSIONS TAB ════
      case 'permissions': {
        const filteredStudents = students.filter(user => 
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
          <div className="flex-1 flex flex-col w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold text-zinc-900 mb-2 tracking-tight" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>Access Permissions</h2>
            <p className="text-zinc-500 text-sm mb-8">Manage learning categories and assign specific access rights to students.</p>
            
            <div className="bg-white rounded-[2rem] p-6 lg:p-8 mb-8 border border-zinc-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-zinc-900 mb-1">Create Access Category</h3>
                <p className="text-xs text-zinc-500">Add a new category (e.g. "JLPT N4 Materials") to control its permissions.</p>
              </div>
              <div className="flex w-full lg:w-auto items-center gap-3">
                <div className="relative flex-1 lg:w-64">
                  <FolderPlus className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Category Name" 
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-zinc-200 focus:outline-none focus:border-[#de1d4d] focus:ring-1 focus:ring-[#de1d4d] transition-colors text-zinc-800 text-sm"
                  />
                </div>
                <button 
                  onClick={handleAddCategory}
                  className="px-6 py-3 bg-[#de1d4d] hover:bg-[#be1640] text-white rounded-2xl font-bold text-sm transition-colors shadow-md flex items-center gap-2 shrink-0"
                >
                  <Plus size={16} /> Add
                </button>
              </div>
            </div>

            <div className="mb-6 flex items-center bg-white rounded-[1rem] border border-zinc-200 px-4 py-3.5 max-w-md focus-within:border-[#de1d4d] focus-within:ring-1 focus-within:ring-[#de1d4d] transition-all shadow-sm">
              <Search className="text-zinc-400 mr-3" size={18} />
              <input 
                type="text" 
                placeholder="Search by student name or email..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none focus:outline-none text-zinc-800 text-sm placeholder-zinc-400"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-zinc-400 hover:text-zinc-600 transition-colors">
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="bg-white rounded-[2rem] overflow-x-auto border border-zinc-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-zinc-50/50 border-b border-zinc-100 text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
                    <th className="p-6 font-bold sticky left-0 bg-zinc-50/50 z-10">Student Profile</th>
                    
                    {categories.map((category, idx) => (
                      <th key={idx} className="p-6 font-bold text-center">
                        <div className="flex items-center justify-center gap-2">
                          {category}
                          <button onClick={() => handleRemoveCategory(category)} className="text-zinc-400 hover:text-red-500 transition-colors">
                            <X size={14} />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((user) => (
                      <tr key={user.id} className="border-b border-zinc-50 hover:bg-zinc-50/50 transition-colors">
                        <td className="p-6 font-semibold text-zinc-900 flex items-center gap-4 sticky left-0 bg-white z-10 border-r border-zinc-50/50">
                          <div className="w-10 h-10 rounded-full bg-[#ffe4ea] text-[#de1d4d] flex items-center justify-center font-bold text-sm shrink-0">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p>{user.name}</p>
                            <p className="text-xs text-zinc-400 font-normal">{user.email}</p>
                          </div>
                        </td>
                        
                        {categories.map((category, idx) => (
                          <td key={idx} className="p-6 text-center border-l border-zinc-50/50">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                checked={user.permissions[category] || false} 
                                onChange={() => handleCategoryPermissionToggle(user.id, category)}
                              />
                              <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#de1d4d]"></div>
                            </label>
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={categories.length + 1} className="p-12 text-center text-zinc-500">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <Search size={32} className="text-zinc-300 mb-2" />
                          <p className="font-semibold text-zinc-700">No students found</p>
                          <p className="text-xs">We couldn't find anyone matching "{searchQuery}"</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      }

      // ════ DEFAULT OVERVIEW TAB ════
      default:
        return (
          <div className="flex-1 flex flex-col w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <p className="text-xs font-bold text-[#de1d4d] uppercase tracking-widest mb-4">Admin Dashboard</p>
            <h1 className="text-4xl lg:text-5xl font-bold text-zinc-900 mb-8 tracking-tight leading-tight" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
              Platform Overview
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-[2rem] border border-zinc-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center"><Users size={24} /></div>
                  <div>
                    <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Total Students</p>
                    <p className="text-2xl font-bold text-zinc-900">{students.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-[2rem] border border-zinc-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#fff0f3] text-[#de1d4d] flex items-center justify-center"><Video size={24} /></div>
                  <div>
                    <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Active Categories</p>
                    <p className="text-2xl font-bold text-zinc-900">{categories.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-[2rem] border border-zinc-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center"><ShieldCheck size={24} /></div>
                  <div>
                    <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Premium Members</p>
                    <p className="text-2xl font-bold text-zinc-900">
                      {students.filter(s => s.plan && s.plan.includes('Premium')).length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-zinc-900 mb-4 mt-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <button onClick={() => setActiveTab('upload')} className="flex items-center justify-between p-6 bg-white rounded-[1.5rem] border border-zinc-100 hover:border-[#de1d4d] transition-colors group text-left shadow-sm">
                 <div>
                   <p className="font-bold text-zinc-900 group-hover:text-[#de1d4d] transition-colors">Upload Recording</p>
                   <p className="text-xs text-zinc-500 mt-1">Add a new class to a category</p>
                 </div>
                 <UploadCloud className="text-zinc-300 group-hover:text-[#de1d4d] transition-colors" />
               </button>
               
               <button onClick={() => setActiveTab('permissions')} className="flex items-center justify-between p-6 bg-white rounded-[1.5rem] border border-zinc-100 hover:border-[#de1d4d] transition-colors group text-left shadow-sm">
                 <div>
                   <p className="font-bold text-zinc-900 group-hover:text-[#de1d4d] transition-colors">Manage Access Rights</p>
                   <p className="text-xs text-zinc-500 mt-1">Review student permissions</p>
                 </div>
                 <ShieldCheck className="text-zinc-300 group-hover:text-[#de1d4d] transition-colors" />
               </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6 font-sans flex flex-col gap-6" style={{ background: '#f8fafc' }}>
      
      {/* ════ TOP NAVIGATION BAR (ADMIN) ════ */}
      <header className="w-full bg-zinc-900 rounded-full px-4 py-3 flex items-center justify-between shadow-lg border border-zinc-800">
        <div className="flex items-center pl-2">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white tracking-tight hover:opacity-80 transition-opacity" style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}>
            <div className="w-8 h-8 rounded-full bg-[#de1d4d] flex items-center justify-center shadow-sm">
              <Flower2 size={18} strokeWidth={2.5} color="#ffffff" />
            </div>
            <span>NihonSensei<span style={{ color: '#ff059f' }}>.lk</span> <span className="text-xs font-sans tracking-widest text-zinc-400 uppercase ml-2 px-2 py-1 bg-zinc-800 rounded-full">Admin</span></span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full text-sm font-semibold transition-all shadow-md">
            <LogOut size={16} strokeWidth={2.5} /> Logout
          </button>
        </div>
      </header>

      {/* ════ MAIN LAYOUT ════ */}
      <div className="flex flex-1 gap-6 overflow-hidden">
        
        {/* ── SIDEBAR NAVIGATION ── */}
        <aside className="w-64 bg-white rounded-[2rem] p-6 shadow-[0_2px_20px_rgb(0,0,0,0.02)] border border-zinc-100 flex flex-col shrink-0">
          <div className="flex items-center justify-between mb-8 pl-2">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Admin Panel</span>
            <button className="text-zinc-400 hover:text-zinc-700 transition-colors"><PanelLeftClose size={18} /></button>
          </div>

          <nav className="flex flex-col gap-2">
            <button onClick={() => setActiveTab('overview')} className={getTabClass('overview')}>
              <LayoutDashboard size={20} strokeWidth={2.5} /> Overview
            </button>
            <button onClick={() => setActiveTab('vocab')} className={getTabClass('vocab')}>
              <BookOpen size={20} strokeWidth={2.5} /> Daily Vocab
            </button>
            <button onClick={() => setActiveTab('permissions')} className={getTabClass('permissions')}>
              <ShieldCheck size={20} strokeWidth={2.5} /> Access Rights
            </button>
            <button onClick={() => setActiveTab('upload')} className={getTabClass('upload')}>
              <UploadCloud size={20} strokeWidth={2.5} /> Upload Recording
            </button>
            <div className="mt-auto pt-4 border-t border-zinc-100">
              <button onClick={() => setActiveTab('settings')} className={getTabClass('settings')}>
                <Settings size={20} strokeWidth={2.5} /> Admin Settings
              </button>
            </div>
          </nav>
        </aside>

        {/* ── DYNAMIC CONTENT AREA ── */}
        <main className="flex-1 rounded-[2.5rem] p-8 lg:p-12 overflow-y-auto bg-white border border-zinc-100 shadow-[0_2px_20px_rgb(0,0,0,0.02)]">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}