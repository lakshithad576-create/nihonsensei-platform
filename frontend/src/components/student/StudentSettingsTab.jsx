export default function StudentSettingsTab() {
  return (
    <div className="flex w-full flex-1 flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl">
      <h2
        className="mb-2 text-3xl font-bold tracking-tight text-zinc-900"
        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
      >
        Settings
      </h2>

      <p className="mb-8 text-sm text-zinc-500">
        Manage your account preferences and personal details.
      </p>

      <div className="space-y-6 rounded-[2rem] border border-zinc-100 bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.02)] lg:p-8">
        <div>
          <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-zinc-500">
            Display Name
          </label>
          <input
            type="text"
            defaultValue="Lakshitha"
            className="w-full rounded-2xl border border-zinc-200 px-5 py-3.5 text-zinc-900 transition-colors focus:border-[#de1d4d] focus:outline-none focus:ring-1"
          />
        </div>

        <div>
          <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-zinc-500">
            Email Address
          </label>
          <input
            type="email"
            defaultValue="lakshithad576@gmail.com"
            disabled
            className="w-full cursor-not-allowed rounded-2xl border border-zinc-100 bg-zinc-50 px-5 py-3.5 text-zinc-500"
          />
        </div>

        <div className="border-t border-zinc-100 pt-4">
          <button
            type="button"
            className="w-full rounded-2xl bg-[#de1d4d] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-rose-500/20 transition-colors hover:bg-[#be1640] md:w-auto"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
