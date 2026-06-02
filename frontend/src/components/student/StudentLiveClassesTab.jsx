import { Clock, Lock, Video } from 'lucide-react';

export default function StudentLiveClassesTab() {
  const upcomingClasses = [
    { id: 1, title: 'JLPT N5 Vocabulary - Session 04', time: 'Today, 10:00 AM - 11:30 AM', hasPermission: true },
    { id: 2, title: 'Kanji Practice - Session 05', time: 'Tomorrow, 10:00 AM - 11:30 AM', hasPermission: false },
  ];

  return (
    <div className="flex w-full flex-1 flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2
        className="mb-2 text-3xl font-bold tracking-tight text-zinc-900"
        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
      >
        Live Classes
      </h2>

      <p className="mb-8 text-sm text-zinc-500">
        Manage and join your upcoming scheduled Zoom sessions. (Premium access required for certain classes).
      </p>

      <div className="flex flex-col gap-4">
        {upcomingClasses.map((session) => (
          <div
            key={session.id}
            className={`flex flex-col items-start justify-between gap-6 rounded-[2rem] border p-6 shadow-[0_4px_20px_rgb(0,0,0,0.02)] transition-all md:flex-row md:items-center lg:p-8 ${
              session.hasPermission ? 'border-zinc-100 bg-white' : 'border-zinc-50 bg-zinc-50/50'
            }`}
          >
            <div>
              <p
                className={`mb-2 text-[10px] font-bold uppercase tracking-widest ${
                  session.hasPermission ? 'text-[#de1d4d]' : 'text-zinc-400'
                }`}
              >
                {session.hasPermission ? 'Next Up' : 'Locked Class'}
              </p>

              <h3
                className={`mb-2 text-xl font-bold ${
                  session.hasPermission ? 'text-zinc-900' : 'text-zinc-600'
                }`}
              >
                {session.title}
              </h3>

              <p className="flex items-center gap-2 text-sm text-zinc-500">
                <Clock size={16} className={session.hasPermission ? 'text-[#de1d4d]' : 'text-zinc-400'} />
                {session.time}
              </p>
            </div>

            {session.hasPermission ? (
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 md:w-auto"
                style={{ background: 'linear-gradient(135deg, #fb7185 0%, #f43f5e 100%)' }}
              >
                <Video size={18} />
                Join Zoom Room
              </button>
            ) : (
              <button
                type="button"
                disabled
                className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-zinc-200 px-8 py-3.5 text-sm font-semibold text-zinc-500 md:w-auto"
              >
                <Lock size={18} />
                Locked - Premium Only
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
