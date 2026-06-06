import { PlayCircle } from 'lucide-react';

export default function StudentOverviewTab({
  onNavigateTab,
  dailyVocab = [],
}) {

  return (
    <div className="flex w-full flex-1 flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 xl:flex-row">
      <div className="flex flex-1 flex-col">
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#de1d4d]">
          Welcome Back
        </p>

        <h1
          className="mb-6 text-4xl font-bold leading-tight tracking-tight text-zinc-900 lg:text-5xl xl:text-6xl"
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          Welcome back,
          <br />
          Lakshitha 👋
        </h1>

        <p className="mb-10 max-w-md text-sm leading-relaxed text-zinc-600">
          Continue your Japanese learning journey today with live classes,
          recordings, and JLPT preparation.
        </p>

        <div className="mb-14 flex w-full flex-col flex-wrap items-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => onNavigateTab('live')}
            className="flex w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 sm:w-auto"
            style={{ background: 'linear-gradient(135deg, #fb7185 0%, #f43f5e 100%)' }}
          >
            <PlayCircle size={18} strokeWidth={2.5} />
            Join Today's Zoom Class
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab('materials')}
            className="w-full rounded-full border border-zinc-100 bg-white px-8 py-3.5 text-center text-sm font-semibold text-zinc-900 shadow-sm transition-all hover:scale-105 hover:bg-zinc-50 sm:w-auto"
          >
            Continue Learning
          </button>
        </div>

        <div className="mt-auto grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-white bg-white/80 p-6 shadow-[0_4px_20px_rgb(0,0,0,0.02)] backdrop-blur-sm">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              Next Class
            </p>
            <p className="text-lg font-bold text-zinc-900">May 23 · 10:00 AM</p>
          </div>

          <div className="rounded-3xl border border-white bg-white/80 p-6 shadow-[0_4px_20px_rgb(0,0,0,0.02)] backdrop-blur-sm">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              Countdown
            </p>
            <p className="text-lg font-bold text-[#de1d4d]">01h 22m</p>
          </div>

          <div className="flex flex-col items-start justify-center rounded-3xl border border-white bg-white/80 p-6 shadow-[0_4px_20px_rgb(0,0,0,0.02)] backdrop-blur-sm">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              JLPT
            </p>
            <span className="rounded-full bg-[#fff0f3] px-3 py-1 text-xs font-bold text-[#de1d4d]">
              N5 Beginner
            </span>
          </div>
        </div>
      </div>

      <div className="flex w-full shrink-0 flex-col rounded-[2rem] border border-white bg-white/70 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md xl:w-[300px]">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#de1d4d]">
            Daily Vocab
          </p>
          <span className="rounded-full bg-[#fff0f3] px-2 py-1 text-[9px] font-bold text-[#de1d4d]">
            5 Words
          </span>
        </div>

        <h2 className="mb-2 text-xl font-bold leading-tight tracking-tight text-zinc-900">
          Sakura Sunrise Lessons
        </h2>

        <p className="mb-5 text-xs leading-relaxed text-zinc-500">
          Master today&apos;s vocabulary. Check back tomorrow for a new set!
        </p>

        <div className="flex flex-1 flex-col gap-2.5">
         {dailyVocab.length > 0 ? (
  dailyVocab.map((word, idx) => (
    <div
      key={word.id || idx}
      className="flex items-center justify-between rounded-2xl bg-white/70 p-3"
    >
      <div>
        <p className="text-lg font-bold text-zinc-900">{word.kanji}</p>
        <p className="text-xs text-zinc-500">{word.romaji}</p>
      </div>

      <p className="text-sm font-medium text-zinc-700">{word.meaning}</p>
    </div>
  ))
) : (
  <p className="rounded-2xl bg-white/70 p-3 text-sm text-zinc-500">
    No vocabulary words published yet.
  </p>
)}
        </div>
      </div>
    </div>
  );
}
