import { Link } from '@tanstack/react-router';
import { Bell, Flower2, LogOut } from 'lucide-react';

export default function AdminHeader({ onLogout }) {
  return (
    <header className="w-full rounded-full border border-zinc-800 bg-zinc-900 px-4 py-3 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center pl-2">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-white transition-opacity hover:opacity-80"
            style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#de1d4d] shadow-sm">
              <Flower2 size={18} strokeWidth={2.5} color="#ffffff" />
            </div>

            <span>
              NihonSensei

              <span className="ml-2 rounded-full bg-zinc-800 px-2 py-1 text-xs uppercase tracking-widest text-zinc-400">
                Admin
              </span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-white transition-all hover:bg-zinc-700"
          >
            <Bell size={17} strokeWidth={2.5} />
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-2 rounded-full bg-zinc-800 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-zinc-700"
          >
            <LogOut size={16} strokeWidth={2.5} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}