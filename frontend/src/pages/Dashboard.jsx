import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../layouts/DashboardLayout';
import StudentLiveClassesTab from '../components/student/StudentLiveClassesTab';
import StudentMaterialsTab from '../components/student/StudentMaterialsTab';
import StudentOverviewTab from '../components/student/StudentOverviewTab';
import StudentRecordingsTab from '../components/student/StudentRecordingsTab';
import StudentSettingsTab from '../components/student/StudentSettingsTab';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate({ to: '/login' });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'live':
        return <StudentLiveClassesTab />;

      case 'recordings':
        return <StudentRecordingsTab />;

      case 'materials':
        return <StudentMaterialsTab />;

      case 'settings':
        return <StudentSettingsTab />;

      default:
        return <StudentOverviewTab onNavigateTab={handleTabChange} />;
    }
  };

  return (
    <DashboardLayout
      activeTab={activeTab}
      isMobileMenuOpen={isMobileMenuOpen}
      onLogout={handleLogout}
      onTabChange={handleTabChange}
      onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
    >
      {renderContent()}
    </DashboardLayout>
  );
}