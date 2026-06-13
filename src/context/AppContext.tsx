import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Capsule } from '../types';

interface AppContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  capsules: Capsule[];
  setCapsules: React.Dispatch<React.SetStateAction<Capsule[]>>;
  walletAddress: string;
  setWalletAddress: (address: string) => void;
  signUpByDefault: boolean;
  setSignUpByDefault: (val: boolean) => void;
  saveCapsule: (capsule: Capsule) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [capsules, setCapsules] = useState<Capsule[]>([]);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [signUpByDefault, setSignUpByDefault] = useState<boolean>(false);

  // Initialize and load session parameters off storage
  useEffect(() => {
    // 1. Load User Session
    const savedUser = localStorage.getItem('eternalmind_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser) as User;
        setUser(parsed);
      } catch (e) {
        console.error("Failed to parse user session", e);
      }
    }

    // 2. Load Secured Capsules
    const savedCapsules = localStorage.getItem('eternalmind_capsules');
    if (savedCapsules) {
      try {
        const parsed = JSON.parse(savedCapsules) as Capsule[];
        setCapsules(parsed);
      } catch (e) {
        console.error("Failed to parse capsules collection", e);
      }
    }

    // 3. Load Wallet Signer
    const savedWallet = localStorage.getItem('eternalmind_wallet');
    if (savedWallet) {
      setWalletAddress(savedWallet);
    }
  }, []);

  const saveCapsule = (newCapsule: Capsule) => {
    const updatedCollection = [newCapsule, ...capsules];
    setCapsules(updatedCollection);
    localStorage.setItem('eternalmind_capsules', JSON.stringify(updatedCollection));
  };

  const logout = () => {
    localStorage.removeItem('eternalmind_user');
    setUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        capsules,
        setCapsules,
        walletAddress,
        setWalletAddress,
        signUpByDefault,
        setSignUpByDefault,
        saveCapsule,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
