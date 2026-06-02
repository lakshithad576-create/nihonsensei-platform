export default function AdminSettingsTab() {
  return (
    <div className="flex w-full flex-1 flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2
        className="mb-2 text-3xl font-bold tracking-tight text-zinc-900"
        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
      >
        Settings
      </h2>

      <p className="mb-8 text-sm text-zinc-500">
        Manage admin settings and platform preferences.
      </p>

      <div className="rounded-[2rem] border border-zinc-100 bg-white p-8 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
        <p className="text-sm text-zinc-500">
          Settings options can be connected here later.
        </p>
      </div>
    </div>
  );
}