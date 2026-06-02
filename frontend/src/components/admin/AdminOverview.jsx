import {
  BookOpen,
  CalendarDays,
  FileText,
  ShieldCheck,
  Users,
  Video,
} from 'lucide-react';

function StatCard({ icon: Icon, iconClassName, label, value }) {
  return (
    <div className="rounded-[2rem] border border-zinc-100 bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
      <div className="mb-4 flex items-center gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconClassName}`}>
          <Icon size={24} />
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            {label}
          </p>

          <p className="text-2xl font-bold text-zinc-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

function QuickAction({ icon: Icon, title, description, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col rounded-[1.5rem] border border-zinc-100 bg-white p-6 text-left shadow-sm transition-colors hover:border-[#de1d4d]"
    >
      <Icon className="mb-3 text-zinc-300 transition-colors group-hover:text-[#de1d4d]" />

      <div>
        <p className="font-bold text-zinc-900 transition-colors group-hover:text-[#de1d4d]">
          {title}
        </p>

        <p className="mt-1 text-xs text-zinc-500">{description}</p>
      </div>
    </button>
  );
}

export default function AdminOverview({
  studentsCount,
  recordingsCount,
  classesCount,
  materialsCount,
  categoriesCount,
  premiumCount,
  onNavigate,
}) {
  return (
    <div className="flex w-full flex-1 flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#de1d4d]">
        Admin Dashboard
      </p>

      <h1
        className="mb-8 text-4xl font-bold leading-tight tracking-tight text-zinc-900 lg:text-5xl"
        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
      >
        Platform Overview
      </h1>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatCard
          icon={Users}
          iconClassName="bg-blue-50 text-blue-500"
          label="Total Students"
          value={studentsCount}
        />

        <StatCard
          icon={Video}
          iconClassName="bg-[#fff0f3] text-[#de1d4d]"
          label="Active Recordings"
          value={recordingsCount}
        />

        <StatCard
          icon={CalendarDays}
          iconClassName="bg-emerald-50 text-emerald-500"
          label="Upcoming Classes"
          value={classesCount}
        />
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatCard
          icon={FileText}
          iconClassName="bg-purple-50 text-purple-500"
          label="Study Materials"
          value={materialsCount}
        />

        <StatCard
          icon={ShieldCheck}
          iconClassName="bg-orange-50 text-orange-500"
          label="Active Categories"
          value={categoriesCount}
        />

        <StatCard
          icon={ShieldCheck}
          iconClassName="bg-emerald-50 text-emerald-500"
          label="Premium Members"
          value={premiumCount}
        />
      </div>

      <h3 className="mb-4 mt-4 text-xl font-bold text-zinc-900">Quick Actions</h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <QuickAction
          icon={CalendarDays}
          title="Schedule Class"
          description="Add a new Zoom session"
          onClick={() => onNavigate('classes')}
        />

        <QuickAction
          icon={Video}
          title="Upload Video"
          description="Add to Recordings"
          onClick={() => onNavigate('upload')}
        />

        <QuickAction
          icon={FileText}
          title="Upload PDF"
          description="Add Study Materials"
          onClick={() => onNavigate('materials')}
        />

        <QuickAction
          icon={ShieldCheck}
          title="Manage Access Rights"
          description="Review student permissions"
          onClick={() => onNavigate('permissions')}
        />

        <QuickAction
          icon={BookOpen}
          title="Daily Vocabulary"
          description="Update today's words"
          onClick={() => onNavigate('vocab')}
        />
      </div>
    </div>
  );
}