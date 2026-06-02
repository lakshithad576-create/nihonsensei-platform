import { Play, Lock } from 'lucide-react';

export default function StudentRecordingsTab() {
  const recordingsList = [
    { id: 1, title: 'Grammar Particles Part 1', date: 'May 21, 2026', category: 'Grammar Particles', hasPermission: true },
    { id: 2, title: 'Grammar Particles Part 2', date: 'May 22, 2026', category: 'Grammar Particles', hasPermission: false },
    { id: 3, title: 'Casual vs Formal Speech', date: 'May 23, 2026', category: 'Spoken Practice', hasPermission: false },
    { id: 4, title: 'Ordering at a Restaurant', date: 'May 25, 2026', category: 'Spoken Practice', hasPermission: true },
  ];

  const groupedRecordings = recordingsList.reduce((accumulator, recording) => {
    if (!accumulator[recording.category]) accumulator[recording.category] = [];
    accumulator[recording.category].push(recording);
    return accumulator;
  }, {});

  return (
    <div className="flex w-full flex-1 flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2
        className="mb-2 text-3xl font-bold tracking-tight text-zinc-900"
        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
      >
        Recordings
      </h2>

      <p className="mb-8 text-sm text-zinc-500">
        Catch up on missed classes. (Note: Premium recordings require admin approval to view).
      </p>

      <div className="flex flex-col gap-12">
        {Object.keys(groupedRecordings).map((category) => (
          <div key={category}>
            <div className="mb-6 flex items-center gap-4">
              <h3 className="text-lg font-bold uppercase tracking-widest text-zinc-800">
                {category}
              </h3>
              <div className="h-px flex-1 bg-zinc-200" />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {groupedRecordings[category].map((recording) => (
                <div
                  key={recording.id}
                  className={`overflow-hidden rounded-[2rem] border border-zinc-100 bg-white shadow-[0_4px_20px_rgb(0,0,0,0.02)] transition-all ${recording.hasPermission ? 'group cursor-pointer hover:shadow-lg' : 'cursor-not-allowed opacity-90'}`}
                >
                  <div className="relative flex h-44 items-center justify-center overflow-hidden bg-zinc-100">
                    <img
                      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop"
                      alt="Class thumbnail"
                      className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 ${recording.hasPermission ? 'opacity-60 group-hover:scale-105' : 'opacity-40 grayscale'}`}
                    />

                    <div className={`z-10 flex h-14 w-14 items-center justify-center rounded-full backdrop-blur-sm shadow-sm transition-transform ${recording.hasPermission ? 'bg-white/90 text-[#de1d4d] group-hover:scale-110' : 'bg-zinc-800/70 text-white'}`}>
                      {recording.hasPermission ? <Play size={24} fill="currentColor" className="ml-1" /> : <Lock size={20} />}
                    </div>

                    {!recording.hasPermission && (
                      <div className="absolute left-4 top-4 z-10 rounded-full bg-zinc-900/80 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                        Awaiting Access
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h4 className={`mb-1 font-bold ${recording.hasPermission ? 'text-zinc-900' : 'text-zinc-600'}`}>
                      {recording.title}
                    </h4>

                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-xs text-zinc-500">Recorded on {recording.date}</p>
                      {!recording.hasPermission && (
                        <span className="text-xs font-semibold text-zinc-400">Locked</span>
                      )}
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
