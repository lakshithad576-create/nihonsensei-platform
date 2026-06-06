import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from '@tanstack/react-router';
import { Flower2, AlertCircle } from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    district: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) return setError('Passwords do not match.');
    if (formData.password.length < 8) return setError('Password must be at least 8 characters long.');

    setIsLoading(true);

    try {
      // 1. Request the OTP from the backend
      const response = await fetch('http://localhost:5000/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Failed to send verification code');

      // 2. Temporarily save the form data to sessionStorage so the next page can use it
      sessionStorage.setItem('pendingSignupData', JSON.stringify(formData));

      // 3. Navigate to the new OTP Verification page
      navigate({ to: '/verify-otp' });

    } catch (err) {
      setError(err.message || 'Failed to connect to the server.');
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

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="bg-white rounded-[2.5rem] p-10 md:p-14 w-full max-w-2xl shadow-xl shadow-rose-100/50 relative z-10"
      >
        <div className="mb-8">
          <p className="text-[#de1d4d] text-2xl mb-1 tracking-widest">ようこそ</p>
          <h1 className="text-4xl font-normal text-zinc-900 mb-2 tracking-tight">Create your account</h1>
          <p className="text-zinc-600 text-sm">Free first week. Cancel anytime.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-semibold">
            <AlertCircle size={18} className="shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleRequestOtp}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2">First Name</label>
              <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} placeholder="Yuki" className="w-full px-5 py-3.5 rounded-2xl border border-zinc-200 focus:outline-none focus:border-[#de1d4d] focus:ring-1 focus:ring-[#de1d4d] transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2">Last Name</label>
              <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} placeholder="Tanaka" className="w-full px-5 py-3.5 rounded-2xl border border-zinc-200 focus:outline-none focus:border-[#de1d4d] focus:ring-1 focus:ring-[#de1d4d] transition-colors" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2">Email</label>
            <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="you@example.com" className="w-full px-5 py-3.5 rounded-2xl border border-zinc-200 focus:outline-none focus:border-[#de1d4d] focus:ring-1 focus:ring-[#de1d4d] transition-colors" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2">Phone</label>
              <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+94 77 123 4567" className="w-full px-5 py-3.5 rounded-2xl border border-zinc-200 focus:outline-none focus:border-[#de1d4d] focus:ring-1 focus:ring-[#de1d4d] transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2">District</label>
              <select name="district" required value={formData.district} onChange={handleChange} className="w-full px-5 py-3.5 rounded-2xl border border-zinc-200 focus:outline-none focus:border-[#de1d4d] focus:ring-1 focus:ring-[#de1d4d] transition-colors bg-white">
                <option value="" disabled>Select district</option>
                <option value="ampara">Ampara</option>
                <option value="anuradhapura">Anuradhapura</option>
                <option value="badulla">Badulla</option>
                <option value="batticaloa">Batticaloa</option>
                <option value="colombo">Colombo</option>
                <option value="galle">Galle</option>
                <option value="gampaha">Gampaha</option>
                <option value="hambantota">Hambantota</option>
                <option value="jaffna">Jaffna</option>
                <option value="kalutara">Kalutara</option>
                <option value="kandy">Kandy</option>
                <option value="kegalle">Kegalle</option>
                <option value="kilinochchi">Kilinochchi</option>
                <option value="kurunegala">Kurunegala</option>
                <option value="mannar">Mannar</option>
                <option value="matale">Matale</option>
                <option value="matara">Matara</option>
                <option value="moneragala">Moneragala</option>
                <option value="mullaitivu">Mullaitivu</option>
                <option value="nuwara-eliya">Nuwara Eliya</option>
                <option value="polonnaruwa">Polonnaruwa</option>
                <option value="puttalam">Puttalam</option>
                <option value="ratnapura">Ratnapura</option>
                <option value="trincomalee">Trincomalee</option>
                <option value="vavuniya">Vavuniya</option> 
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2">Home Address</label>
            <input type="text" name="address" required value={formData.address} onChange={handleChange} placeholder="42 Galle Road" className="w-full px-5 py-3.5 rounded-2xl border border-zinc-200 focus:outline-none focus:border-[#de1d4d] focus:ring-1 focus:ring-[#de1d4d] transition-colors" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2">Password</label>
              <input type="password" name="password" required value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full px-5 py-3.5 rounded-2xl border border-zinc-200 focus:outline-none focus:border-[#de1d4d] focus:ring-1 focus:ring-[#de1d4d] transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2">Confirm</label>
              <input type="password" name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" className="w-full px-5 py-3.5 rounded-2xl border border-zinc-200 focus:outline-none focus:border-[#de1d4d] focus:ring-1 focus:ring-[#de1d4d] transition-colors" />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input type="checkbox" id="terms" required className="w-4 h-4 text-[#de1d4d] rounded border-zinc-300 focus:ring-[#de1d4d] cursor-pointer" />
            <label htmlFor="terms" className="text-sm text-zinc-600 cursor-pointer">
              I agree to the <a href="#" className="text-zinc-800 font-semibold hover:underline">Terms of Service</a> and <a href="#" className="text-zinc-800 font-semibold hover:underline">Privacy Policy</a>.
            </label>
          </div>

          <button type="submit" disabled={isLoading} className={`w-full py-4 mt-6 text-white rounded-2xl font-semibold text-lg transition-colors shadow-lg ${isLoading ? 'bg-zinc-400 cursor-not-allowed shadow-none' : 'bg-[#de1d4d] hover:bg-[#be1640] shadow-rose-500/25'}`}>
            {isLoading ? 'Sending verification...' : 'Create account'}
          </button>
          
          <p className="text-center text-sm text-zinc-600 mt-6">
            Already have an account? <Link to="/login" className="text-[#de1d4d] font-bold hover:underline">Log in</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}