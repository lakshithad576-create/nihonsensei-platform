import {
  BookOpen,
  CalendarDays,
  LayoutDashboard,
  PanelLeftClose,
  Settings,
  Video,
} from 'lucide-react';
import StudentHeader from '../components/student/StudentHeader';

const tabs = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'live', label: 'Live Classes', icon: CalendarDays },
  { key: 'recordings', label: 'Recordings', icon: Video },
  { key: 'materials', label: 'Study Materials', icon: BookOpen },
  { key: 'settings', label: 'Settings', icon: Settings },
];

const getTabClass = (activeTab, tabName) =>
  activeTab === tabName
    ? 'flex items-center gap-4 px-4 py-3.5 bg-[#fff0f3] text-[#de1d4d] rounded-2xl font-semibold text-sm transition-colors w-full text-left'
    : 'flex items-center gap-4 px-4 py-3.5 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 rounded-2xl font-medium text-sm transition-colors w-full text-left';

export default function DashboardLayout({
  activeTab,
  isMobileMenuOpen,
  onLogout,
  onTabChange,
  onToggleMobileMenu,
  children,
}) {
  return (
    <div className="min-h-screen p-4 md:p-6 font-sans flex flex-col gap-4 md:gap-6 bg-[#fdfbfb]">
      <StudentHeader
        isMobileMenuOpen={isMobileMenuOpen}
        onLogout={onLogout}
        onToggleMobileMenu={onToggleMobileMenu}
      />

      <div className="flex flex-1 gap-6 overflow-hidden relative">
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-40 lg:hidden rounded-3xl m-4 md:m-6"
            onClick={onToggleMobileMenu}
          />
        )}

        <aside
          className={`
          absolute lg:relative z-50 lg:z-0
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-[120%] lg:translate-x-0'}
          w-64 bg-white rounded-[2rem] p-6 shadow-[0_10px_40px_rgb(0,0,0,0.08)] lg:shadow-[0_2px_20px_rgb(0,0,0,0.02)] border border-zinc-100 flex flex-col shrink-0 h-full
        `}
        >
          <div className="flex items-center justify-between mb-8 pl-2">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Student Panel
            </span>

            <button
              type="button"
              className="text-zinc-400 hover:text-zinc-700 transition-colors"
            >
              <PanelLeftClose size={18} />
            </button>
          </div>

          <nav className="flex flex-col gap-2 overflow-y-auto">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => onTabChange(key)}
                className={getTabClass(activeTab, key)}
              >
                <Icon size={20} strokeWidth={2.5} />
                {label}
              </button>
            ))}
          </nav>
        </aside>

        <main
          className="flex-1 rounded-[2rem] lg:rounded-[2.5rem] p-6 md:p-8 lg:p-12 overflow-y-auto w-full"
          style={{ background: 'linear-gradient(135deg, #fff0f3 0%, #fffafb 50%, #ffe4ea 100%)' }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
