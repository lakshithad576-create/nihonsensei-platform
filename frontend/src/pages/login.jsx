import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "@tanstack/react-router"; // <-- Added useNavigate
import { Mail, Lock, Flower2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

// ─── Floating Sakura Petal SVG ──────────────────────────────────────────────
const Petal = ({ style, className }) => (
  <motion.svg
    viewBox="0 0 40 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`absolute pointer-events-none select-none ${className}`}
    style={style}
    aria-hidden="true"
  >
    <path
      d="M20 2 C28 10, 38 18, 32 30 C26 42, 14 44, 8 34 C2 24, 8 8, 20 2Z"
      fill="currentColor"
      fillOpacity="0.55"
    />
    <path
      d="M20 2 C20 18, 20 36, 20 46"
      stroke="currentColor"
      strokeOpacity="0.3"
      strokeWidth="0.8"
    />
  </motion.svg>
);

// ─── Decorative background petals ──────────────────────────────────────────
const petalPositions = [
  {
    top: "15%",
    left: "20%",
    size: 24,
    delay: 0,
    dur: 7,
    color: "text-sakura-300",
    rot: 15,
  },
  {
    top: "25%",
    left: "70%",
    size: 18,
    delay: 1.2,
    dur: 9,
    color: "text-sakura-400",
    rot: -20,
  },
  {
    top: "45%",
    left: "40%",
    size: 22,
    delay: 0.6,
    dur: 8,
    color: "text-sakura-300",
    rot: 30,
  },
  {
    top: "65%",
    left: "80%",
    size: 28,
    delay: 2.1,
    dur: 11,
    color: "text-sakura-400",
    rot: -10,
  },
  {
    top: "80%",
    left: "30%",
    size: 20,
    delay: 0.9,
    dur: 7,
    color: "text-sakura-300",
    rot: 45,
  },
];

export default function Login() {
  const { login, currentUser, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading || !currentUser) {
      return;
    }

    navigate({ to: currentUser.role === "admin" ? "/admin" : "/dashboard" });
  }, [authLoading, currentUser, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await login(email, password);

      if (user.role === "admin") {
        navigate({ to: "/admin" });
      } else {
        navigate({ to: "/dashboard" });
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans bg-white">
      {/* ════ LEFT PANEL: Decorative Branding (Hidden on Mobile) ════ */}
      <div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12"
        style={{
          background: "linear-gradient(145deg, #fff0f3 0%, #ffe4ea 100%)",
        }}
      >
        {/* Floating Petals */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {petalPositions.map((p, i) => (
            <motion.div
              key={i}
              className={`absolute ${p.color}`}
              style={{
                top: p.top,
                left: p.left,
                width: p.size,
                height: p.size,
                rotate: p.rot,
              }}
              animate={{
                y: [0, -20, -10, 0],
                rotate: [p.rot, p.rot + 15, p.rot - 5, p.rot],
                opacity: [0.6, 0.9, 0.7, 0.6],
              }}
              transition={{
                duration: p.dur,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Petal />
            </motion.div>
          ))}
        </div>

        {/* Abstract Torii Gate Graphic */}
        <div className="absolute bottom-10 right-10 opacity-40 pointer-events-none text-sakura-300 z-0">
          <svg
            width="240"
            height="200"
            viewBox="0 0 240 200"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0" y="20" width="240" height="14" rx="7" />
            <rect x="20" y="45" width="200" height="10" rx="5" />
            <rect x="45" y="45" width="16" height="155" />
            <rect x="179" y="45" width="16" height="155" />
          </svg>
        </div>

        {/* Logo Top Left */}
        <Link
          to="/"
          className="relative z-10 flex items-center gap-2 text-xl font-bold text-zinc-900 tracking-tight"
          style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
        >
          <div className="w-8 h-8 rounded-full bg-[#ffe4ea] flex items-center justify-center shadow-sm">
            <Flower2 size={18} strokeWidth={2.5} color="#ff059f" />
          </div>
          <span>
            NihonSensei<span style={{ color: "#ff059f" }}>.lk</span>
          </span>
        </Link>

        {/* Bottom Left Text */}
        <div className="relative z-10 max-w-md pb-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#de1d4d] text-6xl mb-2 tracking-widest font-serif"
          >
            おかえり
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-zinc-900 mb-3"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            Welcome back
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-zinc-600 text-sm leading-relaxed"
          >
            Log in to your account to continue learning Japanese with
            NihonSensei.lk
          </motion.p>
        </div>
      </div>

      {/* ════ RIGHT PANEL: Login Form ════ */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white relative">
        {/* Mobile Logo (Only shows on small screens) */}
        <div className="absolute top-6 left-6 lg:hidden">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-zinc-900 tracking-tight"
            style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
          >
            <div className="w-8 h-8 rounded-full bg-[#ffe4ea] flex items-center justify-center shadow-sm">
              <Flower2 size={18} strokeWidth={2.5} color="#ff059f" />
            </div>
            <span>
              NihonSensei<span style={{ color: "#ff059f" }}>.lk</span>
            </span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-[420px] bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-zinc-100"
        >
          {/* Card Header */}
          <h2 className="text-3xl font-normal text-zinc-900 mb-2 tracking-tight">
            Email login
          </h2>
          <p className="text-zinc-500 text-sm mb-8">
            Enter your email and password to access your account.
          </p>

          {/* <-- Added onSubmit={handleLogin} here */}
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Email Field */}
            <div>
              <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail
                  className="absolute left-4 text-zinc-400"
                  size={18}
                  strokeWidth={2}
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-zinc-200 focus:outline-none focus:border-[#de1d4d] focus:ring-1 focus:ring-[#de1d4d] transition-colors text-zinc-800 placeholder-zinc-400"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock
                  className="absolute left-4 text-zinc-400"
                  size={18}
                  strokeWidth={2}
                />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-16 py-3.5 rounded-2xl border border-zinc-200 focus:outline-none focus:border-[#de1d4d] focus:ring-1 focus:ring-[#de1d4d] transition-colors text-zinc-800 placeholder-zinc-400 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-xs font-semibold text-zinc-500 hover:text-zinc-800 transition-colors"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
<div className="flex justify-end pt-1">
  <Link
    to="/forgot-password"
    className="text-[#ff059f] text-xs font-bold hover:underline"
  >
    Forgot password?
  </Link>
</div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 mt-2 bg-[#ff059f] hover:bg-[#ff059f] text-white rounded-2xl font-semibold text-lg transition-colors shadow-lg shadow-rose-500/25"
            >
              {error && (
                <p className="text-sm text-red-500 font-medium">{error}</p>
              )}
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-zinc-500 mt-8">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#ff059f] font-bold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
