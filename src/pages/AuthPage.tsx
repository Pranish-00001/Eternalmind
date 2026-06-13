import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import AuthComponent from '../components/AuthPage';

export default function AuthPage() {
  const navigate = useNavigate();
  const { user, setUser, signUpByDefault } = useAppContext();

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleAuthSuccess = (loggedInUser: any) => {
    setUser(loggedInUser);
    navigate('/dashboard');
  };

  return (
    <div className="w-full min-h-screen bg-[#0E152D] flex flex-col overflow-y-auto">
      <div className="flex-grow flex flex-col justify-stretch">
        <AuthComponent
          onAuthSuccess={handleAuthSuccess}
          onBackToLanding={() => navigate('/')}
          defaultToSignUp={signUpByDefault}
        />
      </div>
    </div>
  );
}
