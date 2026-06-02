import AdminHeader from '../components/admin/AdminHeader';
import AdminSidebar from '../components/admin/AdminSidebar';

export default function AdminLayout({
  activeTab,
  children,
  onLogout,
  onTabChange,
}) {
  return (
    <div
      className="min-h-screen p-4 md:p-6 font-sans flex flex-col gap-6"
      style={{ background: '#f8fafc' }}
    >
      <AdminHeader onLogout={onLogout} />

      <div className="flex flex-1 gap-6 overflow-hidden">
        <AdminSidebar activeTab={activeTab} onChangeTab={onTabChange} />

        <main className="flex-1 overflow-y-auto bg-white/40 rounded-[2rem] p-6 lg:p-10 border border-white">
          {children}
        </main>
      </div>
    </div>
  );
}
