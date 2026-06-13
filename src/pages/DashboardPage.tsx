import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';
import DashboardComponent from '../components/Dashboard';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout, capsules, walletAddress, setWalletAddress } = useAppContext();

  useEffect(() => {
    if (!user) {
      navigate('/auth', { replace: true });
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="w-full min-h-screen bg-[#0E152D] flex items-center justify-center font-mono text-caption text-gray-500">
        Redirecting to auth terminal...
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-[#0E152D] flex flex-col overflow-y-auto">
      {/* Header persistent control */}
      <Navbar 
        user={user} 
        onLogout={logout} 
        onNavigateHome={() => navigate('/')} 
        onNavigateDashboard={() => navigate('/dashboard')}
        onWalletConnected={setWalletAddress}
        hideWalletConnect={false}
      />

      {/* Render Main Dashboard component */}
      <div className="flex-grow flex flex-col justify-stretch">
        <DashboardComponent
          user={user}
          capsules={capsules}
          onOpenWizard={() => navigate('/create')}
          onSelectCapsule={(cap) => {
            alert(`Accessing Capsule "${cap.title}" // Status: ${cap.status.toUpperCase()} \nUnlock Date: ${new Date(cap.unlockDate).toLocaleDateString()}`);
          }}
        />
      </div>
    </div>
  );
}
