import { createRootRoute, Outlet, Link } from '@tanstack/react-router';
import { useAuth } from '../context/AuthContext';

export const route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const { logout, currentUser } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      {/* Premium Glassmorphic Universal Navbar */}
      <nav className="glass-panel sticky top-0 z-50 px-6 py-4 flex justify-between items-center border-b border-zinc-200/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-sakura flex items-center justify-center text-white font-bold text-sm">日</div>
          <span className="font-semibold text-lg tracking-tight text-zinc-900">NihonSensei<span className="text-sakura">.lk</span></span>
        </div>
        
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="text-zinc-600 hover:text-sakura transition-colors">Home</Link>
          <Link to="/about" className="text-zinc-600 hover:text-sakura transition-colors">About</Link>
          <Link to="/contact" className="text-zinc-600 hover:text-sakura transition-colors">Contact</Link>
          {currentUser ? (
            <button onClick={logout} className="px-4 py-2 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 transition-all text-xs">
              Sign Out
            </button>
          ) : (
            <Link to="/login" className="px-4 py-2 bg-sakura text-white rounded-xl hover:bg-sakura-600 transition-all text-xs shadow-sm shadow-sakura-200">
              Portal Access
            </Link>
          )}
        </div>
      </nav>

      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}