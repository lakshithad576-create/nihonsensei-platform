import { CalendarDays, Link2, Trash2 } from 'lucide-react';

export default function AdminClassesTab({
  categories,
  classData,
  liveClasses,
  onClassSubmit,
  onClassDataChange,
  onDeleteClass,
}) {
  return (
    <div className="flex w-full flex-1 flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2
        className="mb-2 text-3xl font-bold tracking-tight text-zinc-900"
        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
      >
        Live Schedule
      </h2>

      <p className="mb-8 text-sm text-zinc-500">
        Schedule upcoming Zoom meetings and assign them to access categories.
      </p>

      <form
        onSubmit={onClassSubmit}
        className="mb-8 rounded-[2rem] border border-zinc-100 bg-white p-8 shadow-[0_4px_20px_rgb(0,0,0,0.02)]"
      >
        <h3 className="mb-6 flex items-center gap-2 font-bold text-zinc-900">
          <CalendarDays size={18} className="text-[#de1d4d]" />
          Schedule New Class
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              Class Title
            </label>

            <input
              type="text"
              required
              placeholder="e.g. Grammar Review Session"
              value={classData.title}
              onChange={(e) =>
                onClassDataChange({
                  ...classData,
                  title: e.target.value,
                })
              }
              className="w-full rounded-xl border border-zinc-200 px-5 py-3 text-sm focus:border-[#de1d4d] focus:outline-none focus:ring-1 focus:ring-[#de1d4d]"
            />
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              Zoom Link
            </label>

            <div className="relative">
              <Link2
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
              />

              <input
                type="url"
                required
                placeholder="https://zoom.us/j/..."
                value={classData.link}
                onChange={(e) =>
                  onClassDataChange({
                    ...classData,
                    link: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-zinc-200 py-3 pl-10 pr-5 text-sm focus:border-[#de1d4d] focus:outline-none focus:ring-1 focus:ring-[#de1d4d]"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              Access Category
            </label>

            <select
              required
              value={classData.category}
              onChange={(e) =>
                onClassDataChange({
                  ...classData,
                  category: e.target.value,
                })
              }
              className="w-full cursor-pointer rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm focus:border-[#de1d4d] focus:outline-none focus:ring-1 focus:ring-[#de1d4d]"
            >
              <option value="" disabled>
                Select category...
              </option>

              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              Date & Time
            </label>

            <input
              type="datetime-local"
              required
              value={classData.datetime}
              onChange={(e) =>
                onClassDataChange({
                  ...classData,
                  datetime: e.target.value,
                })
              }
              className="w-full cursor-pointer rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm focus:border-[#de1d4d] focus:outline-none focus:ring-1 focus:ring-[#de1d4d]"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="rounded-xl bg-[#de1d4d] px-8 py-3 text-sm font-bold text-white shadow-md shadow-rose-500/20 transition-colors hover:bg-[#be1640]"
          >
            Add to Schedule
          </button>
        </div>
      </form>

      <h3 className="mb-4 font-bold text-zinc-900">Upcoming Classes</h3>

      <div className="space-y-3">
        {liveClasses.length === 0 ? (
          <p className="text-sm italic text-zinc-500">
            No upcoming classes scheduled.
          </p>
        ) : (
          liveClasses.map((liveClass) => (
            <div
              key={liveClass.id}
              className="group flex flex-col justify-between gap-4 rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm transition-colors hover:border-zinc-200 md:flex-row md:items-center"
            >
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-600">
                    {liveClass.category}
                  </span>
                </div>

                <h4 className="font-bold text-zinc-900">{liveClass.title}</h4>

                <p className="mt-1 text-xs text-zinc-500">
                  {new Date(liveClass.datetime).toLocaleString()}
                </p>

                <a
                  href={liveClass.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 flex items-center gap-1 text-xs text-blue-500 hover:underline"
                >
                  <Link2 size={12} />
                  {liveClass.link}
                </a>
              </div>

              <button
                type="button"
                onClick={() => onDeleteClass(liveClass.id)}
                className="flex shrink-0 items-center gap-2 rounded-lg p-2 text-sm font-semibold text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-500"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}