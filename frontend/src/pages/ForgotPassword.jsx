import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from '@tanstack/react-router';
import { Flower2, AlertCircle, KeyRound, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // ─── PHASE 1: Send Reset Email ──────────────────────────────────────────
  const handleRequestReset = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to send reset email');

      setStep(2); // Move to the OTP & New Password screen
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // ─── PHASE 2: Verify OTP & Save New Password ────────────────────────────
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) return setError("Passwords do not match.");
    if (newPassword.length < 8) return setError("Password must be at least 8 characters.");

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          otp, 
          newPassword, 
          confirmNewPassword: confirmPassword 
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to reset password');

      // Success! Show a checkmark screen briefly, then send to login
      setSuccess("Password successfully changed!");
      setStep(3);
      
      setTimeout(() => {
        navigate({ to: '/login' });
      }, 2500);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen pt-28 pb-16 flex items-center justify-center px-4 font-sans" style={{ background: 'linear-gradient(160deg, #fff0f3 0%, #fffafb 40%, #fff5f6 100%)' }}>
      
      <Link to="/" className="absolute top-8 left-6 lg:top-12 lg:left-12 flex items-center gap-2 text-xl font-bold text-zinc-900 tracking-tight hover:opacity-80 transition-opacity z-10" style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}>
        <div className="w-8 h-8 rounded-full bg-[#ffe4ea] flex items-center justify-center shadow-sm">
          <Flower2 size={18} strokeWidth={2.5} color="#ff059f" />
        </div>
        <span>NihonSensei<span style={{ color: '#ff059f' }}>.lk</span></span>
      </Link>

      <AnimatePresence mode="wait">
        {step === 1 && (
          /* ════ PHASE 1: ENTER EMAIL ════ */
          <motion.div
            key="email-step"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }}
            className="bg-white rounded-[2.5rem] p-10 md:p-14 w-full max-w-md shadow-xl shadow-rose-100/50 relative z-10"
          >
            <div className="mb-8">
              <div className="w-14 h-14 bg-[#fff0f3] rounded-full flex items-center justify-center mb-6">
                <KeyRound size={28} className="text-[#de1d4d]" />
              </div>
              <h1 className="text-3xl font-normal text-zinc-900 mb-2 tracking-tight">Reset Password</h1>
              <p className="text-zinc-600 text-sm">Enter the email associated with your account and we'll send a code with instructions to reset your password.</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-semibold">
                <AlertCircle size={18} className="shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleRequestReset}>
              <div>
                <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2">Email Address</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full px-5 py-3.5 rounded-2xl border border-zinc-200 focus:outline-none focus:border-[#de1d4d] focus:ring-1 focus:ring-[#de1d4d] transition-colors" />
              </div>

              <button type="submit" disabled={isLoading} className={`w-full py-4 mt-6 text-white rounded-2xl font-semibold text-lg transition-colors shadow-lg flex items-center justify-center gap-2 ${isLoading ? 'bg-zinc-400 cursor-not-allowed shadow-none' : 'bg-[#de1d4d] hover:bg-[#be1640] shadow-rose-500/25'}`}>
                {isLoading ? 'Sending...' : 'Send Reset Code'} <ArrowRight size={18} />
              </button>
            </form>
            
            <div className="mt-8 text-center">
              <Link to="/login" className="text-sm font-bold text-zinc-500 hover:text-zinc-900 transition-colors">← Back to log in</Link>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          /* ════ PHASE 2: ENTER OTP & NEW PASSWORD ════ */
          <motion.div
            key="reset-step"
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }}
            className="bg-white rounded-[2.5rem] p-10 md:p-14 w-full max-w-md shadow-xl shadow-rose-100/50 relative z-10"
          >
            <div className="mb-8">
              <h1 className="text-3xl font-normal text-zinc-900 mb-2 tracking-tight">Create New Password</h1>
              <p className="text-zinc-600 text-sm">We sent a 6-digit code to <b>{email}</b>.</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-semibold">
                <AlertCircle size={18} className="shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <form className="space-y-5" onSubmit={handleResetPassword}>
              <div>
                <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2">6-Digit Code</label>
                <input type="text" maxLength={6} required value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} placeholder="000000" className="w-full px-5 py-3.5 tracking-[0.2em] font-bold text-center rounded-2xl border border-zinc-200 focus:outline-none focus:border-[#de1d4d] focus:ring-1 focus:ring-[#de1d4d] transition-colors" />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2">New Password</label>
                <input type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" className="w-full px-5 py-3.5 rounded-2xl border border-zinc-200 focus:outline-none focus:border-[#de1d4d] focus:ring-1 focus:ring-[#de1d4d] transition-colors" />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2">Confirm New Password</label>
                <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="w-full px-5 py-3.5 rounded-2xl border border-zinc-200 focus:outline-none focus:border-[#de1d4d] focus:ring-1 focus:ring-[#de1d4d] transition-colors" />
              </div>

              <button type="submit" disabled={isLoading || otp.length < 6} className={`w-full py-4 mt-6 text-white rounded-2xl font-semibold text-lg transition-colors shadow-lg ${isLoading || otp.length < 6 ? 'bg-zinc-400 cursor-not-allowed shadow-none' : 'bg-zinc-900 hover:bg-zinc-800 shadow-xl shadow-zinc-200/50'}`}>
                {isLoading ? 'Updating...' : 'Reset Password'}
              </button>
            </form>
          </motion.div>
        )}

        {step === 3 && (
          /* ════ PHASE 3: SUCCESS ════ */
          <motion.div
            key="success-step"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
            className="bg-white rounded-[2.5rem] p-10 md:p-14 w-full max-w-md shadow-xl shadow-rose-100/50 relative z-10 flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 size={40} className="text-emerald-500" />
            </div>
            <h1 className="text-3xl font-bold text-zinc-900 mb-2" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>All Done!</h1>
            <p className="text-zinc-600 text-sm mb-6">{success}</p>
            <p className="text-xs text-zinc-400">Redirecting to login...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}