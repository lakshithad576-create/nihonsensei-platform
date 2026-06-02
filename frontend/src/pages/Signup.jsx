import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Flower2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { signup, currentUser, loading: authLoading } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    district: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authLoading || !currentUser) {
      return;
    }

    navigate({ to: currentUser.role === "admin" ? "/admin" : "/dashboard" });
  }, [authLoading, currentUser, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signup(formData);
      navigate({ to: "/dashboard" });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      // Added "relative" here so the absolute-positioned logo stays in the top corner
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center px-4 font-sans"
      style={{
        background:
          "linear-gradient(160deg, #fff0f3 0%, #fffafb 40%, #fff5f6 100%)",
      }}
    >
      {/* ════ TOP LEFT LOGO ════ */}
      <Link
        to="/"
        className="absolute top-8 left-6 lg:top-12 lg:left-12 flex items-center gap-2 text-xl font-bold text-zinc-900 tracking-tight hover:opacity-80 transition-opacity z-10"
        style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
      >
        <div className="w-8 h-8 rounded-full bg-[#ffe4ea] flex items-center justify-center shadow-sm">
          <Flower2 size={18} strokeWidth={2.5} color="#ff059f" />
        </div>
        <span>
          NihonSensei<span style={{ color: "#ff059f" }}>.lk</span>
        </span>
      </Link>

      {/* ════ SIGNUP FORM CARD ════ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white rounded-[2.5rem] p-10 md:p-14 w-full max-w-2xl shadow-xl shadow-sakura-100/50 relative z-10"
      >
        {/* Header Section */}
        <div className="mb-10">
          <p className="text-[#de1d4d] text-2xl mb-1 tracking-widest font-serif">
            ようこそ
          </p>
          <h1
            className="text-4xl font-bold text-zinc-900 mb-2 tracking-tight"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            Create your account
          </h1>
          <p className="text-zinc-600 text-sm">
            Free first week. Cancel anytime.
          </p>
        </div>

        {/* Form Section */}
        <form className="space-y-6 " onSubmit={handleSignup}>
          {/* Row 1: Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2">
                First Name
              </label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Tanaka"
                className="w-full px-5 py-3.5 rounded-2xl border border-zinc-200 focus:outline-none focus:border-[#de1d4d] focus:ring-1 focus:ring-[#de1d4d] transition-colors text-zinc-800 placeholder-zinc-400"
              />
            </div>
          </div>

          {/* Row 2: Email */}
          <div>
            <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Row 3: Phone & District */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+94 77 123 4567"
                className="w-full px-5 py-3.5 rounded-2xl border border-zinc-200 focus:outline-none focus:border-[#de1d4d] focus:ring-1 focus:ring-[#de1d4d] transition-colors text-zinc-800 placeholder-zinc-400"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2">
                District
              </label>
              <select
                defaultValue=""
                className="w-full px-5 py-3.5 rounded-2xl border border-zinc-200 focus:outline-none focus:border-[#de1d4d] focus:ring-1 focus:ring-[#de1d4d] transition-colors bg-white text-zinc-800 appearance-none cursor-pointer"
              >
                <option value="" disabled>
                  Select district
                </option>
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

          {/* Row 4: Address */}
          <div>
            <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2">
              Home Address
            </label>
            <input
              type="text"
              placeholder="42 Galle Road, Colombo 03"
              className="w-full px-5 py-3.5 rounded-2xl border border-zinc-200 focus:outline-none focus:border-[#de1d4d] focus:ring-1 focus:ring-[#de1d4d] transition-colors text-zinc-800 placeholder-zinc-400"
            />
          </div>

          {/* Row 5: Passwords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <p className="text-[11px] text-zinc-500 mt-2 font-medium">
                8+ characters, uppercase, lowercase, and numbers
              </p>
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 text-[#de1d4d] rounded border-zinc-300 focus:ring-[#de1d4d] cursor-pointer"
            />
            <label
              htmlFor="terms"
              className="text-sm text-zinc-600 cursor-pointer"
            >
              I agree to the{" "}
              <a
                href="#"
                className="text-zinc-800 font-semibold hover:underline"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-zinc-800 font-semibold hover:underline"
              >
                Privacy Policy
              </a>
              .
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 mt-6 bg-[#ff059f] hover:bg-[#ff059f] text-white rounded-2xl font-semibold text-lg transition-colors shadow-lg shadow-rose-500/25"
          >
            Create account
          </button>

          {/* Footer Link */}
          <p className="text-center text-sm text-zinc-600 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#ff059f] font-bold hover:underline"
            >
              Log in
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
