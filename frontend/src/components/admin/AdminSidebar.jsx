import {
  BookOpen,
  CalendarDays,
  FileText,
  LayoutDashboard,
  PanelLeftClose,
  Settings,
  ShieldCheck,
  UploadCloud,
} from 'lucide-react';

const tabs = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'vocab', label: 'Daily Vocab', icon: BookOpen },
  { key: 'permissions', label: 'Access Rights', icon: ShieldCheck },
  { key: 'classes', label: 'Live Classes', icon: CalendarDays },
  { key: 'upload', label: 'Upload Recording', icon: UploadCloud },
  { key: 'materials', label: 'Study Materials', icon: FileText },
  { key: 'settings', label: 'Settings', icon: Settings },
];

const getTabClass = (activeTab, tabName) =>
  activeTab === tabName
    ? 'flex w-full items-center gap-4 rounded-2xl border border-[#ffe4ea] bg-[#fff0f3] px-4 py-3.5 text-left text-sm font-semibold text-[#de1d4d] transition-colors'
    : 'flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-left text-sm font-medium text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-zinc-900';

export default function AdminSidebar({ activeTab, onChangeTab }) {
  return (
    <aside className="flex w-64 shrink-0 flex-col rounded-[2rem] border border-zinc-100 bg-white p-6 shadow-[0_2px_20px_rgb(0,0,0,0.02)]">
      <div className="mb-8 flex items-center justify-between pl-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
          Admin Panel
        </span>

        <button
          type="button"
          className="text-zinc-400 transition-colors hover:text-zinc-700"
        >
          <PanelLeftClose size={18} />
        </button>
      </div>

      <nav className="flex flex-col gap-2">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => onChangeTab(key)}
            className={getTabClass(activeTab, key)}
          >
            <Icon size={20} strokeWidth={2.5} />
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}