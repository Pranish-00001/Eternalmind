import React, { useState, useEffect } from 'react';
import { Mail, Lock, ShieldCheck, KeyRound, AlertCircle, ArrowLeft } from 'lucide-react';
import { User } from '../types';

interface AuthPageProps {
  onAuthSuccess: (user: User) => void;
  onBackToLanding: () => void;
  defaultToSignUp?: boolean; // Set true for "Create Account" default
}

export default function AuthPage({ onAuthSuccess, onBackToLanding, defaultToSignUp = false }: AuthPageProps) {
  const [isSignUp, setIsSignUp] = useState(defaultToSignUp);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const savedEmail = localStorage.getItem('eternalmind_remembered_email');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (rememberMe) {
      localStorage.setItem('eternalmind_remembered_email', email);
    } else {
      localStorage.removeItem('eternalmind_remembered_email');
    }

    if (isSignUp) {
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }

      // Mock Sign Up
      const usersData = JSON.parse(localStorage.getItem('eternalmind_registered_users') || '[]');
      const userExists = usersData.some((u: any) => u.email.toLowerCase() === email.toLowerCase());

      if (userExists) {
        setError('This email is already registered. Please login instead.');
        return;
      }

      // Save user to registered users pool
      usersData.push({ email, password });
      localStorage.setItem('eternalmind_registered_users', JSON.stringify(usersData));

      // Successfully registered, auto-login
      const userObj = { email };
      localStorage.setItem('eternalmind_user', JSON.stringify(userObj));
      setSuccessMsg('Account created successfully! Initializing secure vault...');
      
      setTimeout(() => {
        onAuthSuccess(userObj);
      }, 1200);

    } else {
      // Mock Login
      const usersData = JSON.parse(localStorage.getItem('eternalmind_registered_users') || '[]');
      
      // Seed a default mock user (Maya) if empty to make testing simple
      if (usersData.length === 0) {
        usersData.push({ email: 'maya@example.com', password: 'password' });
        localStorage.setItem('eternalmind_registered_users', JSON.stringify(usersData));
      }

      const foundUser = usersData.find(
        (u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (!foundUser) {
        setError('Invalid email or password. Feel free to Create an Account!');
        return;
      }

      // Log in
      const userObj = { email: foundUser.email };
      localStorage.setItem('eternalmind_user', JSON.stringify(userObj));
      setSuccessMsg('Authentication signature verified. Opening sanctuary...');

      setTimeout(() => {
        onAuthSuccess(userObj);
      }, 1000);
    }
  };

  const handleGoogleSignIn = () => {
    setError('');
    setSuccessMsg('');
    
    // Authenticate with the user's active login profile dynamically
    const googleUserEmail = 'khanalpranish987@gmail.com';
    const userObj = { email: googleUserEmail };

    if (rememberMe) {
      localStorage.setItem('eternalmind_remembered_email', googleUserEmail);
    } else {
      localStorage.removeItem('eternalmind_remembered_email');
    }
    
    // Register the user to standard memory pool if first-time oauth login
    const usersData = JSON.parse(localStorage.getItem('eternalmind_registered_users') || '[]');
    const userExists = usersData.some((u: any) => u.email.toLowerCase() === googleUserEmail.toLowerCase());
    if (!userExists) {
      usersData.push({ email: googleUserEmail, password: 'google-oauth-provider-managed' });
      localStorage.setItem('eternalmind_registered_users', JSON.stringify(usersData));
    }

    localStorage.setItem('eternalmind_user', JSON.stringify(userObj));
    setSuccessMsg('Verifying Google handshake tokens... Authorized!');

    setTimeout(() => {
      onAuthSuccess(userObj);
    }, 1200);
  };

  return (
    <div className="flex-grow w-full text-gray-200 flex flex-col justify-center items-center py-12 px-6 relative overflow-visible">
      {/* Absolute clean backdrop radial shine */}
      <div className="absolute w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-md w-full relative z-10">
        
        {/* Back Link */}
        <button
          onClick={onBackToLanding}
          className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-[#D4AF37] transition-colors mb-8 uppercase tracking-widest cursor-pointer group"
          id="btn-back-landing"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Exit to Terminal</span>
        </button>

        {/* Brand Banner */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-[#111A3A]/60 border border-[#D4AF37]/20 mb-4 shadow-[0_0_15px_rgba(212,175,55,0.08)]">
            <ShieldCheck className="w-8 h-8 text-[#D4AF37]" />
          </div>
          <h2 className="text-2xl font-display font-medium text-gray-100 tracking-widest uppercase">
            {isSignUp ? "CREATE ACCOUNT" : "LOGIN"}
          </h2>
          <p className="text-xs text-gray-400 font-mono tracking-wider mt-2">
            {isSignUp ? "GENERATE YOUR SECURE VAULT KEYS" : "PROVIDE YOUR LOGIN DETAILS"}
          </p>
        </div>

        {/* Card Form container */}
        <div className="bg-[#111A3A]/50 border border-[#D4AF37]/20 p-8 md:p-10 rounded-2xl backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.3)]">
          
          <form onSubmit={handleSubmit} className="space-y-6" id="auth-form">
            
            {/* Email Address */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-medium tracking-widest text-[#D4AF37] uppercase">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@legacy.com"
                  className="block w-full pl-10 pr-4 py-3 bg-[#0A0F24]/80 border border-[#D4AF37]/15 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]/60 focus:ring-1 focus:ring-[#D4AF37]/40 transition-all font-mono"
                  id="auth-email-input"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-medium tracking-widest text-[#D4AF37] uppercase">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-4 py-3 bg-[#0A0F24]/80 border border-[#D4AF37]/15 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]/60 focus:ring-1 focus:ring-[#D4AF37]/40 transition-all font-mono"
                  id="auth-password-input"
                />
              </div>
            </div>

            {/* Confirm Password (only for Sign Up) */}
            {isSignUp && (
              <div className="space-y-2">
                <label className="block text-xs font-mono font-medium tracking-widest text-[#D4AF37] uppercase">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full pl-10 pr-4 py-3 bg-[#0A0F24]/80 border border-[#D4AF37]/15 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]/60 focus:ring-1 focus:ring-[#D4AF37]/40 transition-all font-mono"
                    id="auth-confirm-password-input"
                  />
                </div>
              </div>
            )}

            {/* Remember Me Option */}
            <div className="flex items-center pt-1" id="remember-me-container">
              <label className="flex items-center gap-2.5 cursor-pointer group select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-[#0A0F24]/50 border border-[#D4AF37]/30 text-[#D4AF37] focus:ring-0 focus:ring-offset-0 accent-[#D4AF37] cursor-pointer"
                  id="auth-remember-me-checkbox"
                />
                <span className="text-xs font-mono tracking-wider text-gray-400 group-hover:text-gray-200 transition-colors">
                  Remember me
                </span>
              </label>
            </div>

            {/* Status alerts */}
            {error && (
              <div className="flex items-start gap-2.5 p-3.5 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-xs leading-relaxed font-mono">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {successMsg && (
              <div className="flex items-start gap-2.5 p-3.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg text-xs leading-relaxed font-mono">
                <ShieldCheck className="w-4 h-4 mt-0.5 flex-shrink-0 animate-bounce" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Action button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#e7cd70] to-[#b89020] text-black font-semibold uppercase tracking-widest text-xs hover:brightness-110 shadow-[0_0_15px_rgba(212,175,55,0.15)] active:scale-[0.98] transition-all cursor-pointer"
              id="auth-submit-btn"
            >
              {isSignUp ? "CREATE ACCOUNT" : "LOGIN"}
            </button>

            {/* Social Authentication Separation */}
            <div className="flex items-center my-4 opacity-70">
              <div className="flex-grow border-t border-[#D4AF37]/10" />
              <span className="px-3 text-[10px] font-mono uppercase tracking-widest text-gray-500">or</span>
              <div className="flex-grow border-t border-[#D4AF37]/10" />
            </div>

            {/* Google Authentication Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full py-3.5 bg-[#0a0f24]/50 border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/5 text-gray-200 font-mono text-[11px] uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all cursor-pointer rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_20px_rgba(212,175,55,0.05)] active:scale-[0.98]"
              id="auth-google-btn"
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
              </svg>
              <span>Continue with Google</span>
            </button>

          </form>

          {/* Tab Switcher link */}
          <div className="mt-8 text-center pt-6 border-t border-[#D4AF37]/10">
            <p className="text-xs text-gray-400 font-mono">
              {isSignUp ? "Already have an account?" : "First time?"}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                }}
                className="text-[#D4AF37] hover:underline uppercase tracking-wide ml-1.5 focus:outline-none font-bold cursor-pointer text-[10px]"
                id="btn-toggle-auth-mode"
              >
                {isSignUp ? "Log in" : "Sign up"}
              </button>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
