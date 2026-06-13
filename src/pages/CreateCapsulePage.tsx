import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';
import CapsuleWizardComponent from '../components/CapsuleWizard';

export default function CreateCapsulePage() {
  const navigate = useNavigate();
  const { user, logout, saveCapsule, setWalletAddress } = useAppContext();

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

  const handleSaveCapsule = (newCapsule: any) => {
    saveCapsule(newCapsule);
    navigate('/dashboard');
  };

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

      {/* Render Capsule creation wizard */}
      <div className="flex-grow flex flex-col justify-stretch">
        <CapsuleWizardComponent
          user={user}
          onCloseWizard={() => navigate('/dashboard')}
          onSaveCapsule={handleSaveCapsule}
        />
      </div>
    </div>
  );
}
