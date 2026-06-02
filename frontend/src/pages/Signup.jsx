import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Flower2,
  UserRound,
  Mail,
  Phone,
  MapPin,
  Home,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const districts = [
  "Ampara",
  "Anuradhapura",
  "Badulla",
  "Batticaloa",
  "Colombo",
  "Galle",
  "Gampaha",
  "Hambantota",
  "Jaffna",
  "Kalutara",
  "Kandy",
  "Kegalle",
  "Kilinochchi",
  "Kurunegala",
  "Mannar",
  "Matale",
  "Matara",
  "Moneragala",
  "Mullaitivu",
  "Nuwara Eliya",
  "Polonnaruwa",
  "Puttalam",
  "Ratnapura",
  "Trincomalee",
  "Vavuniya",
];

const inputClass =
  "w-full px-5 py-3.5 rounded-2xl border border-zinc-200 focus:outline-none focus:border-[#de1d4d] focus:ring-1 focus:ring-[#de1d4d] transition-colors text-zinc-800 placeholder-zinc-400 bg-white";

function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon,
  rightElement,
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2">
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
          />
        )}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${inputClass} ${Icon ? "pl-12" : ""} ${
            rightElement ? "pr-12" : ""
          }`}
        />

        {rightElement}
      </div>
    </div>
  );
}

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

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authLoading || !currentUser) {
      return;
    }

    navigate({ to: currentUser.role === "admin" ? "/admin" : "/dashboard" });
  }, [authLoading, currentUser, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!termsAccepted) {
      setError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setLoading(true);

    try {
      await signup(formData);
      navigate({ to: "/dashboard" });
    } catch (error) {
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
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
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white rounded-[2.5rem] p-7 sm:p-10 md:p-12 w-full max-w-4xl shadow-xl shadow-sakura-100/50 relative z-10"
      >
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
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

            <div className="hidden md:flex px-5 py-3 rounded-2xl bg-[#fff0f5] border border-[#ffd6e3] text-[#de1d4d] text-sm font-semibold">
              Start learning Japanese today
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Form Section */}
        <form onSubmit={handleSignup} className="space-y-7">
          {/* Personal Details */}
          <div className="rounded-[2rem] border border-zinc-100 bg-[#fffafb] p-5 sm:p-6">
            <div className="mb-5">
              <h2 className="text-lg font-bold text-zinc-900">
                Personal details
              </h2>
              <p className="text-sm text-zinc-500 mt-1">
                Tell us a little about yourself.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Sakura"
                icon={UserRound}
              />

              <FormField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Tanaka"
                icon={UserRound}
              />

              <FormField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="sakura@example.com"
                icon={Mail}
              />

              <FormField
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+94 77 123 4567"
                icon={Phone}
              />
            </div>
          </div>

          {/* Location Details */}
          <div className="rounded-[2rem] border border-zinc-100 bg-white p-5 sm:p-6">
            <div className="mb-5">
              <h2 className="text-lg font-bold text-zinc-900">
                Location details
              </h2>
              <p className="text-sm text-zinc-500 mt-1">
                Help us personalize your learning experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2">
                  District
                </label>

                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                  />

                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className={`${inputClass} pl-12 pr-12 appearance-none cursor-pointer`}
                  >
                    <option value="" disabled>
                      Select district
                    </option>

                    {districts.map((district) => (
                      <option
                        key={district}
                        value={district.toLowerCase().replace(/\s+/g, "-")}
                      >
                        {district}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                  />
                </div>
              </div>

              <FormField
                label="Home Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="42 Galle Road, Colombo 03"
                icon={Home}
              />
            </div>
          </div>

          {/* Security Details */}
          <div className="rounded-[2rem] border border-zinc-100 bg-[#fffafb] p-5 sm:p-6">
            <div className="mb-5">
              <h2 className="text-lg font-bold text-zinc-900">
                Account security
              </h2>
              <p className="text-sm text-zinc-500 mt-1">
                Create a secure password for your account.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <FormField
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  icon={Lock}
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                />

                <p className="text-[11px] text-zinc-500 mt-2 font-medium">
                  8+ characters, uppercase, lowercase, and numbers
                </p>
              </div>

              <FormField
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                icon={Lock}
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                }
              />
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-3 rounded-2xl bg-white border border-zinc-100 px-4 py-4">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-1 w-4 h-4 text-[#de1d4d] rounded border-zinc-300 focus:ring-[#de1d4d] cursor-pointer"
            />

            <label
              htmlFor="terms"
              className="text-sm text-zinc-600 cursor-pointer leading-relaxed"
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
            disabled={loading}
            className="w-full py-4 bg-[#ff059f] hover:bg-[#e6008d] disabled:opacity-70 disabled:cursor-not-allowed text-white rounded-2xl font-semibold text-lg transition-colors shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={20} className="animate-spin" />}
            {loading ? "Creating account..." : "Create account"}
          </button>

          {/* Footer Link */}
          <p className="text-center text-sm text-zinc-600">
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