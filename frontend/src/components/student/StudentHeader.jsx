import { Link } from '@tanstack/react-router';
import { Flower2, LogOut, Menu, X } from 'lucide-react';

export default function StudentHeader({ isMobileMenuOpen, onLogout, onToggleMobileMenu }) {
  return (
    <header className="w-full rounded-full border border-zinc-100 bg-white px-4 py-3 relative z-50 shadow-[0_2px_20px_rgb(0,0,0,0.03)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 pl-2">
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="p-2 -ml-2 text-zinc-600 focus:outline-none hover:text-zinc-900 lg:hidden"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-bold tracking-tight text-zinc-900 transition-opacity hover:opacity-80 md:text-xl"
            style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ffe4ea] shadow-sm">
              <Flower2 size={18} strokeWidth={2.5} color="#ff059f" />
            </div>
            <span className="hidden sm:block">
              NihonSensei<span style={{ color: '#ff059f' }}>.lk</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-2 rounded-full bg-[#ff059f] px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-rose-500/20 transition-all hover:bg-[#be1640] md:px-5 md:text-sm"
          >
            <LogOut size={16} strokeWidth={2.5} />
            <span className="hidden sm:block">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
