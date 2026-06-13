import React, { useState, useEffect } from 'react';
import { Wallet, Check, AlertCircle } from 'lucide-react';

interface WalletConnectButtonProps {
  onAddressFetched?: (address: string) => void;
  className?: string;
  showStatusOnly?: boolean;
}

export default function WalletConnectButton({ 
  onAddressFetched, 
  className = "", 
  showStatusOnly = false 
}: WalletConnectButtonProps) {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Load wallet address from localstorage on mount
    const savedWallet = localStorage.getItem('eternalmind_wallet');
    if (savedWallet) {
      setWalletAddress(savedWallet);
      if (onAddressFetched) {
        onAddressFetched(savedWallet);
      }
    }
  }, [onAddressFetched]);

  const connectWallet = async () => {
    setError("");
    const ethereum = (window as any).ethereum;
    
    if (ethereum) {
      try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts && accounts.length > 0) {
          const address = accounts[0];
          setWalletAddress(address);
          localStorage.setItem('eternalmind_wallet', address);
          if (onAddressFetched) {
            onAddressFetched(address);
          }
        }
      } catch (err: any) {
        console.error("User rejected request or error connecting:", err);
        setError("User rejected connection request");
      }
    } else {
      setError("MetaMask is required to connect your wallet.");
    }
  };

  const disconnectWallet = () => {
    setWalletAddress("");
    localStorage.removeItem('eternalmind_wallet');
    if (onAddressFetched) {
      onAddressFetched("");
    }
  };

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  if (showStatusOnly) {
    if (walletAddress) {
      return (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg text-xs font-mono">
          <Check className="w-3.5 h-3.5" />
          <span>CONNECTED: {formatAddress(walletAddress)}</span>
        </div>
      );
    }
    return (
      <div className="text-amber-500 text-xs font-mono flex items-center gap-1.5">
        <AlertCircle className="w-3.5 h-3.5" />
        <span>No Wallet Connected</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-stretch gap-1">
      {walletAddress ? (
        <button
          onClick={disconnectWallet}
          className={`flex items-center justify-center gap-2 px-4 py-2 border border-[#D4AF37]/35 bg-[#111A3A]/80 text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-lg text-xs font-mono font-medium tracking-wide transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.05)] ${className}`}
          id="btn-disconnect-wallet"
        >
          <Wallet className="w-3.5 h-3.5" />
          <span>{formatAddress(walletAddress)} (DISCONNECT)</span>
        </button>
      ) : (
        <button
          onClick={connectWallet}
          className={`flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#e7cd70] to-[#b89020] text-black hover:brightness-110 rounded-lg text-xs font-mono font-bold tracking-wide transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.15)] ${className}`}
          id="btn-connect-wallet"
        >
          <Wallet className="w-3.5 h-3.5" />
          <span>CONNECT METAMASK</span>
        </button>
      )}
      
      {error && (
        <p className="text-red-400 text-[10px] font-mono mt-1 max-w-xs">{error}</p>
      )}
    </div>
  );
}
