import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from '@tanstack/react-router';
import { Flower2, MailCheck, ArrowRight } from 'lucide-react';
import { apiRequest } from '../config/api';

export default function VerifyOTP() {
  const navigate = useNavigate();
  
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pendingData, setPendingData] = useState(null);
  const [fallbackOtp, setFallbackOtp] = useState('');

  // When the page loads, grab the data we saved from the Signup page
  useEffect(() => {
    const savedData = sessionStorage.getItem('pendingSignupData');
    const savedOtp = sessionStorage.getItem('pendingSignupOtp');

    if (savedData) {
      setPendingData(JSON.parse(savedData));
      if (savedOtp) {
        setFallbackOtp(savedOtp);
      }
    } else {
      // If someone tries to visit this page directly without signing up first, kick them back
      navigate({ to: '/signup' });
    }
  }, [navigate]);

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Combine the saved form data with the OTP they just typed in
      const finalPayload = { ...pendingData, otp };

      const data = await apiRequest('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(finalPayload),
      });

      // Success! Clean up storage, save the auth token, and go to the dashboard
      sessionStorage.removeItem('pendingSignupData');
      sessionStorage.removeItem('pendingSignupOtp');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      sessionStorage.setItem('signupSuccessMessage', 'Account created successfully. Please log in.');

      navigate({ to: '/login' });

    } catch (err) {
      setError(err.message || 'Invalid code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // If the data hasn't loaded yet, show a blank screen to prevent flashing
  if (!pendingData) return null; 

  return (
    <div className="relative min-h-screen pt-28 pb-16 flex items-center justify-center px-4 font-sans" style={{ background: 'linear-gradient(160deg, #fff0f3 0%, #fffafb 40%, #fff5f6 100%)' }}>
      
      <Link to="/" className="absolute top-8 left-6 lg:top-12 lg:left-12 flex items-center gap-2 text-xl font-bold text-zinc-900 tracking-tight hover:opacity-80 transition-opacity z-10" style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}>
        <div className="w-8 h-8 rounded-full bg-[#ffe4ea] flex items-center justify-center shadow-sm">
          <Flower2 size={18} strokeWidth={2.5} color="#ff059f" />
        </div>
        <span>NihonSensei<span style={{ color: '#ff059f' }}>.lk</span></span>
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.4 }}
        className="bg-white rounded-[2.5rem] p-10 md:p-14 w-full max-w-md shadow-xl shadow-rose-100/50 relative z-10 flex flex-col items-center text-center"
      >
        <div className="w-16 h-16 bg-[#fff0f3] rounded-full flex items-center justify-center mb-6">
          <MailCheck size={32} className="text-[#de1d4d]" />
        </div>
        <h2 className="text-3xl font-normal text-zinc-900 mb-2 tracking-tight">Check your email</h2>
        <p className="text-zinc-600 text-sm mb-8">
          We've sent a 6-digit verification code to <br/>
          <b className="text-zinc-900">{pendingData.email}</b>
        </p>

        {fallbackOtp && (
          <div className="mb-6 w-full rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-left text-sm text-amber-900">
            Development fallback code: <b className="tracking-[0.3em]">{fallbackOtp}</b>
          </div>
        )}

        {error && (
          <div className="mb-6 p-3 w-full bg-red-50 border border-red-100 rounded-xl flex justify-center text-red-600 text-sm font-semibold">
            <p>{error}</p>
          </div>
        )}

        <form className="w-full space-y-6" onSubmit={handleCreateAccount}>
          <div>
            <input 
              type="text" 
              maxLength={6}
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} // Strips out letters
              placeholder="000000" 
              className="w-full px-5 py-4 text-center text-3xl tracking-[0.5em] font-bold rounded-2xl border-2 border-zinc-200 focus:outline-none focus:border-[#de1d4d] focus:ring-4 focus:ring-[#fff0f3] transition-all text-zinc-800" 
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading || otp.length < 6}
            className={`w-full py-4 text-white rounded-2xl font-semibold text-lg transition-colors flex items-center justify-center gap-2 ${isLoading || otp.length < 6 ? 'bg-zinc-300 cursor-not-allowed' : 'bg-zinc-900 hover:bg-zinc-800 shadow-xl shadow-zinc-200'}`}
          >
            {isLoading ? 'Creating Account...' : 'Verify & Continue'} <ArrowRight size={18} />
          </button>
        </form>
        
        <Link 
          to="/signup" 
          onClick={() => sessionStorage.removeItem('pendingSignupData')}
          className="mt-8 text-sm text-zinc-400 hover:text-zinc-800 font-medium transition-colors"
        >
          Wrong email address? Go back
        </Link>
      </motion.div>
    </div>
  );
}