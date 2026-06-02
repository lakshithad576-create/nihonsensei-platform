import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, BookOpen, Video, Plus, Star, User, ArrowRight, Flower2 } from 'lucide-react';
import heroImage from '../assets/japan.png';
import teacherImage from '../assets/teacher.png';
import { Link } from '@tanstack/react-router';

// ─── FAQ Data ───────────────────────────────────────────────────────────────
const faqData = [
  {
    question: 'How do I join a live Zoom class?',
    answer: 'Once you log into your student portal, navigate to the "Live Classes" dashboard. A "Join Zoom" button will become active 5 minutes before your scheduled class time.'
  },
  {
    question: 'Can I watch class recordings if I miss a session?',
    answer: 'Absolutely! All live sessions are recorded and automatically uploaded to your dashboard within 24 hours. You can review them anytime at your convenience.'
  },
  {
    question: 'How can I download lesson materials?',
    answer: 'Lesson materials, including PDFs, worksheets, and audio files, are available in the "Resources" tab of your course. Simply click the download icon next to any file.'
  },
  {
    question: 'Is there a trial period for new students?',
    answer: 'Yes, we offer a free introductory session so you can experience our teaching style, access sample materials, and decide if our platform is right for you.'
  },
  {
    question: 'What levels of Japanese are offered?',
    answer: 'We offer comprehensive courses ranging from absolute beginner (JLPT N5) all the way up to advanced levels (JLPT N2).'
  }
];

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

// ─── Animation Variants ─────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 44 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
  }),
};
const slideLeft  = { hidden: { opacity: 0, x: -64 }, visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } } };
const slideRight = { hidden: { opacity: 0, x:  64 }, visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } } };
const vp = { once: true, amount: 0.18 };

// ─── Reusable Components ────────────────────────────────────────────────────
const Btn = ({ children, className, ...p }) => (
  <motion.button
    className={className}
    whileHover={{ scale: 1.06 }}
    whileTap={{ scale: 0.94 }}
    transition={{ type: 'spring', stiffness: 420, damping: 18 }}
    {...p}
  >{children}</motion.button>
);

// Interactive FAQ Card Component
const FaqCard = ({ question, answer, i }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="bg-white rounded-[2rem] p-6 shadow-sm border border-sakura-100/50 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => setIsOpen(!isOpen)}
      variants={fadeUp} 
      initial="hidden" 
      whileInView="visible" 
      viewport={vp} 
      custom={i * 0.1}
    >
      <div className="flex justify-between items-center gap-4">
        <h3 className="font-sans font-medium text-zen-900">{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="flex-shrink-0 w-10 h-10 rounded-full bg-sakura-50 flex items-center justify-center text-sakura-500"
        >
          <Plus size={20} strokeWidth={2.5} />
        </motion.div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            className="overflow-hidden font-sans text-zen-500 font-light leading-relaxed text-sm"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Decorative background petals ──────────────────────────────────────────
const petalPositions = [
  { top: '8%',  left: '7%',  size: 38, delay: 0,    dur: 7,  color: 'text-sakura-300', rot: 15  },
  { top: '18%', left: '88%', size: 28, delay: 1.2,  dur: 9,  color: 'text-sakura-200', rot: -20 },
  { top: '55%', left: '4%',  size: 22, delay: 0.6,  dur: 8,  color: 'text-sakura-300', rot: 30  },
  { top: '72%', left: '93%', size: 32, delay: 2.1,  dur: 11, color: 'text-sakura-200', rot: -10 },
  { top: '40%', left: '95%', size: 18, delay: 0.9,  dur: 7,  color: 'text-sakura-300', rot: 45  },
  { top: '85%', left: '12%', size: 26, delay: 1.7,  dur: 10, color: 'text-sakura-200', rot: -35 },
];

// ═══════════════════════════════════════════════════════════════════════════
export default function Home() {
  return (
    <div
      className="min-h-screen font-sans overflow-x-hidden"
      style={{ background: 'linear-gradient(160deg, #fff0f3 0%, #fffafb 40%, #fff5f6 100%)' }}
    >
      
      {/* ════ NAVBAR (Now only on the Home Page) ════ */}
      <div className="absolute top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav className="w-full max-w-5xl bg-white/95 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/40 rounded-full px-6 py-3 flex items-center justify-between pointer-events-auto transition-all">
          
          {/* Left: Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-xl md:text-2xl font-bold text-zinc-900 tracking-tight hover:opacity-80 transition-opacity"
            style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
          >
            <div className="w-8 h-8 rounded-full bg-[#ffe4ea] flex items-center justify-center shadow-sm">
              <Flower2 size={18} strokeWidth={2.5} color="#ff059f" />
            </div>
            <span>NihonSensei<span style={{ color: '#ff059f' }}>.lk</span></span>
          </Link>

          {/* Center: Navigation Links */}
          <div className="hidden md:flex items-center gap-8 font-sans text-sm font-medium text-zinc-600">
            <Link to="/" className="hover:text-[#ff059f] transition-colors">Home</Link>
            <Link to="/about" className="hover:text-[#ff059f] transition-colors">About</Link>
            <Link to="/contact" className="hover:text-[#ff059f] transition-colors">Contact</Link>
          </div>

          {/* Right: Login Button */}
          <Link 
            to="/login" 
            className="flex items-center gap-2 px-6 py-2.5 font-sans bg-[#ff059f] text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-[#ff059f]/40 hover:scale-105 transition-all"
          >
            Student Login 
            <div className="bg-white rounded-full p-0.5 flex items-center justify-center">
              <ArrowRight size={14} strokeWidth={3} color="#ff059f" />
            </div>
          </Link>
          
        </nav>
      </div>

      {/* ── Floating background petals (whole page) ─────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {petalPositions.map((p, i) => (
          <motion.div
            key={i}
            className={`absolute ${p.color}`}
            style={{ top: p.top, left: p.left, width: p.size, height: p.size, rotate: p.rot }}
            animate={{ y: [0, -22, -8, 0], rotate: [p.rot, p.rot + 10, p.rot - 6, p.rot], opacity: [0.5, 0.85, 0.65, 0.5] }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Petal />
          </motion.div>
        ))}
      </div>

      {/* ════ 1. HERO ══════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-24 lg:pt-52 lg:pb-36 overflow-hidden antialiased">

        {/* Hero image - Completely clear */}
        <div className="absolute inset-0 z-0">
          <motion.img
            src="https://res.cloudinary.com/dci2l752v/image/upload/q_auto/f_auto/v1780213240/japan_oadsan.png"
            alt="Mount Fuji"
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: 1.06 }}
            transition={{ duration: 16, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
          />
          
          {/* Bottom fade into page bg so it transitions smoothly */}
          <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
            style={{ background: 'linear-gradient(to top, #fff5f6, transparent)' }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl"> 

            {/* Main title - Reduced boldness (font-normal) for an elegant, sleek look */}
            <motion.h1
              className="text-6xl lg:text-7xl font-normal text-white leading-tight mb-6 tracking-tight"
              style={{ textShadow: '0 4px 32px rgba(245, 17, 184, 0.4), 0 2px 8px rgba(0, 0, 0, 0.6)' }}
              variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
            >
              Unlock Your <br />
              Japanese <br />
              Potential with <br />
              NihonSensei.lk
            </motion.h1>

            {/* Subtitle - Swapped to font-light for a clean, modern aesthetic */}
            <motion.p
              className="text-lg lg:text-xl text-white/95 mb-10 max-w-2xl leading-relaxed font-light"
              style={{ textShadow: '0 2px 12px rgba(0, 0, 0, 0.8)' }}
              variants={fadeUp} initial="hidden" animate="visible" custom={0.25}
            >
              Master Japanese from Sri Lanka with live Zoom classes, 
              comprehensive recordings, and essential learning materials.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-4"
              variants={fadeUp} initial="hidden" animate="visible" custom={0.38}
            >
              {/* Primary button - "Get Start" */}
              <Link to="/signup">
                <Btn
                  className="px-8 py-3.5 text-white rounded-full font-medium flex items-center gap-2.5 shadow-xl hover:scale-105 transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #fb71e4 0%, #f43fd0 60%, #e11db3 100%)',
                  }}
                >
                  <PlayCircle size={20} />
                  Get Start
                </Btn>
              </Link>
              
              {/* Secondary button - "About Me" updated to match the solid pink gradient */}
              <Btn
                className="px-8 py-3.5 text-white rounded-full font-medium flex items-center gap-2.5 shadow-xl hover:scale-105 transition-all"
                style={{
                  background: 'linear-gradient(135deg, #fb71e4 0%, #f43fd0 60%, #e11db3 100%)',
                }}
              >
                <User size={20} />
                About Me
              </Btn>
            </motion.div>

          </div>
        </div>
      </section>
        

     {/* ════ 2. MEET YOUR SENSEI ══════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden bg-zinc-50 antialiased">
        
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          
          {/* Section Header */}
          <motion.div className="text-center mb-14" variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}>
            <h2 className="text-4xl md:text-5xl font-normal text-zinc-900 mb-4 tracking-tight">
              Meet Your Sensei: Dedicated to Your Success
            </h2>
            <p className="text-zinc-600 max-w-2xl mx-auto leading-relaxed text-base font-light">
              Our experienced Japanese teacher, Sensei Ayami, brings years of expertise and a 
              passion for language education. With a student-centric approach, she makes learning 
              Japanese both effective and enjoyable.
            </p>
          </motion.div>

          {/* Flex Layout: 40% Width for Card, 60% Width for Image */}
          <div className="flex flex-col lg:flex-row gap-6 items-stretch">
            
            {/* LEFT COLUMN: The White Feature Card */}
            <motion.div 
              className="bg-white rounded-[2.5rem] p-10 shadow-sm w-full lg:w-[40%] flex flex-col justify-center"
              variants={slideLeft} initial="hidden" whileInView="visible" viewport={vp}
            >
              {[
                { icon: <Star size={18} strokeWidth={2.5} />, title: 'Experienced Educator', desc: 'Years of teaching Japanese to diverse student groups.' },
                { icon: <Video size={18} strokeWidth={2.5} />, title: 'Interactive Classes', desc: 'Engaging lessons designed for maximum participation and understanding.' },
                { icon: <User size={18} strokeWidth={2.5} />, title: 'Personalized Guidance', desc: 'Tailored support to help each student achieve their learning goals.' },
              ].map(({ icon, title, desc }, i) => (
                <motion.div
                  key={i}
                  className={`flex flex-col gap-4 ${i !== 2 ? 'border-b border-zinc-100 pb-6 mb-6' : ''}`}
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp} custom={i * 0.13}
                >
                  {/* Bulletproof Pink Circle Icon */}
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm"
                    style={{ backgroundColor: '#ff059f', color: '#ffffff' }}
                  >
                    {icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-zinc-900 mb-1">{title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed font-light">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* RIGHT COLUMN: The Teacher Image (Now perfectly horizontal) */}
            <motion.div
              className="rounded-[2.5rem] overflow-hidden shadow-sm w-full lg:w-[60%]"
              variants={slideRight} initial="hidden" whileInView="visible" viewport={vp}
            >
              <img
                src="https://res.cloudinary.com/dci2l752v/image/upload/q_auto/f_auto/v1780213634/teacher_lnosd6.png"
                alt="Sensei Ayami"
                className="w-full h-full object-cover"
              />
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* ════ 3. PATH TO FLUENCY ═══════════════════════════════════════ */}
      <section className="py-24 bg-white relative overflow-hidden antialiased">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(255,194,207,0.22) 0%, transparent 60%)' }} />

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          
          {/* Section Header */}
          <motion.div className="text-center mb-20" variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}>
            <p className="font-sans text-sakura-500 font-semibold tracking-widest text-sm uppercase mb-3">How It Works</p>
            <h2 className="text-4xl md:text-5xl font-sans font-normal text-zen-900 mb-4 tracking-tight">
              Your Path to Fluency Starts Here
            </h2>
            <p className="font-sans text-zen-500 max-w-2xl mx-auto leading-relaxed text-lg font-light">
              NihonSensei.lk provides a complete ecosystem to support your Japanese language
              learning journey from beginner to advanced levels.
            </p>
          </motion.div>

          <div className="space-y-28">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center gap-14">
              <motion.div className="md:w-1/2" variants={slideLeft} initial="hidden" whileInView="visible" viewport={vp}>
                <span className="inline-block font-sans text-xs font-bold tracking-widest text-sakura-400 uppercase mb-4 px-3 py-1 rounded-full border border-sakura-200 bg-sakura-50">
                  Step 01
                </span>
                <h3 className="text-3xl font-sans font-medium text-zen-900 mb-4 tracking-tight">
                  Join Live Zoom Classes
                </h3>
                <p className="font-sans text-zen-500 text-lg leading-relaxed font-light">
                  Participate in real-time interactive lessons with your sensei and classmates.
                </p>
              </motion.div>
              <motion.div className="md:w-1/2" variants={slideRight} initial="hidden" whileInView="visible" viewport={vp}>
                <div className="rounded-3xl overflow-hidden p-1"
                  style={{ background: 'linear-gradient(135deg, #ffc2cf, #fb7185, #fda4af)', boxShadow: '0 16px 50px rgba(244,63,94,0.22)' }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop"
                    alt="Live Classes"
                    className="rounded-[1.25rem] w-full object-cover"
                  />
                </div>
              </motion.div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-14">
              <motion.div className="md:w-1/2" variants={slideRight} initial="hidden" whileInView="visible" viewport={vp}>
                <span className="inline-block font-sans text-xs font-bold tracking-widest text-sakura-400 uppercase mb-4 px-3 py-1 rounded-full border border-sakura-200 bg-sakura-50">
                  Step 02
                </span>
                <h3 className="text-3xl font-sans font-medium text-zen-900 mb-4 tracking-tight">
                  Watch Weekly Recordings
                </h3>
                <p className="font-sans text-zen-500 text-lg leading-relaxed font-light">
                  Catch up on missed classes or revise challenging topics anytime with on-demand
                  video recordings.
                </p>
              </motion.div>
              <motion.div className="md:w-1/2" variants={slideLeft} initial="hidden" whileInView="visible" viewport={vp}>
                <div className="rounded-3xl overflow-hidden p-1"
                  style={{ background: 'linear-gradient(135deg, #fda4af, #ffc2cf, #fb7185)', boxShadow: '0 16px 50px rgba(244,63,94,0.22)' }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1610484826967-09c5720778c7?q=80&w=800&auto=format&fit=crop"
                    alt="Watch Recordings"
                    className="rounded-[1.25rem] w-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    
      {/* ════ 4. FAQ ════════════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #fff0f3 0%, #ffe4ea 100%)' }}
      >
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full opacity-25 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #fb7185 0%, transparent 70%)' }} />

        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div className="text-center mb-14" variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}>
            <p className="font-sans text-sakura-500 font-semibold tracking-widest text-sm uppercase mb-3">
              Got Questions?
            </p>
            <h2 className="text-4xl md:text-5xl font-sans font-normal text-zen-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {faqData.map((item, i) => (
              <FaqCard 
                key={i} 
                question={item.question} 
                answer={item.answer} 
                i={i} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* ════ 5. FOOTER ════════════════════════════════════════════════ */}
      <motion.footer
        className="text-white py-14 rounded-t-5xl -mt-12 relative overflow-hidden z-20"
        style={{ background: 'linear-gradient(135deg, #ec71c5 0%, #eb5fbf 50%, #fd45e7 100%)' }}
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}
      >
        {/* Decorative petal overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-10"
          style={{ background: 'radial-gradient(ellipse at 80% 50%, white 0%, transparent 60%)' }} />
        {/* Kanji watermark */}
        <div className="absolute right-8 bottom-4 font-jp text-white/10 text-9xl font-bold select-none pointer-events-none leading-none">
          桜
        </div>

        <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
          <div>
            <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
              NihonSensei.lk
            </h3>
            <p className="text-pink-100 text-sm leading-relaxed">© 2026 NihonSensei.lk<br />All Rights Reserved.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-pink-100 uppercase tracking-widest text-xs">Platform</h4>
            <ul className="space-y-2 text-pink-100 text-sm">
              {['Home', 'About Us', 'Courses'].map(l => (
                <li key={l} className="hover:text-white transition-colors cursor-pointer">{l}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-pink-100 uppercase tracking-widest text-xs">Support</h4>
            <ul className="space-y-2 text-pink-100 text-sm">
              {['Contact', 'FAQ', 'Student Login'].map(l => (
                <li key={l} className="hover:text-white transition-colors cursor-pointer">{l}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-pink-100 uppercase tracking-widest text-xs">Legal</h4>
            <ul className="space-y-2 text-pink-100 text-sm">
              {['Privacy Policy', 'Terms of Service'].map(l => (
                <li key={l} className="hover:text-white transition-colors cursor-pointer">{l}</li>
              ))}
            </ul>
          </div>
        </div>
      </motion.footer>

    </div>
  );
}