import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, BookOpen, Video, Plus, Star, User, ArrowRight, Flower2, Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { apiRequest } from '../config/api';

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
  { top: '8%',  left: '7%',  size: 38, delay: 0,   dur: 7,  color: 'text-sakura-300', rot: 15  },
  { top: '18%', left: '88%', size: 28, delay: 1.2,  dur: 9,  color: 'text-sakura-200', rot: -20 },
  { top: '55%', left: '4%',  size: 22, delay: 0.6,  dur: 8,  color: 'text-sakura-300', rot: 30  },
  { top: '72%', left: '93%', size: 32, delay: 2.1,  dur: 11, color: 'text-sakura-200', rot: -10 },
  { top: '40%', left: '95%', size: 18, delay: 0.9,  dur: 7,  color: 'text-sakura-300', rot: 45  },
  { top: '85%', left: '12%', size: 26, delay: 1.7,  dur: 10, color: 'text-sakura-200', rot: -35 },
];

// ═══════════════════════════════════════════════════════════════════════════
export default function Home() {

  // ─── Contact Form State ────────────────────────────────────────────────
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleContactChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ─── Scroll Helper Function ──────────────────────────────────────────────
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ─── Actual Backend Connection ─────────────────────────────────────────
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send the data to your Node.js backend route
      await apiRequest('/contact', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      // Success! Show the checkmark screen
      setIsSent(true);
      setFormData({ name: '', email: '', message: '' }); // Clear the form
      
      // Hide the success message after 4 seconds
      setTimeout(() => setIsSent(false), 4000); 

    } catch (error) {
      console.error('Error sending message:', error);
      alert('Sorry, there was a problem sending your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen font-sans overflow-x-hidden"
      style={{ background: 'linear-gradient(160deg, #fff0f3 0%, #fffafb 40%, #fff5f6 100%)' }}
    >
      
      {/* ════ NAVBAR ════ */}
      <div className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none">
        <nav className="w-full max-w-5xl bg-white/95 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/40 rounded-full px-4 py-2.5 md:px-6 md:py-3 flex items-center justify-between gap-2 pointer-events-auto transition-all">
          
          {/* Logo */}
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center gap-1.5 md:gap-2 text-[1.1rem] sm:text-xl md:text-2xl font-bold text-zinc-900 tracking-tight hover:opacity-80 transition-opacity whitespace-nowrap"
            style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
          >
            <div className="w-7 h-7 md:w-8 md:h-8 shrink-0 rounded-full bg-[#ffe4ea] flex items-center justify-center shadow-sm">
              <Flower2 className="w-4 h-4 md:w-[18px] md:h-[18px]" strokeWidth={2.5} color="#ff059f" />
            </div>
            <span>NihonSensei<span style={{ color: '#ff059f' }}>.lk</span></span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 font-sans text-sm font-medium text-zinc-600">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-[#ff059f] transition-colors">Home</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-[#ff059f] transition-colors">About</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-[#ff059f] transition-colors">Contact</button>
          </div>

          {/* Login Button */}
          <Link 
            to="/login" 
            className="flex items-center gap-1.5 md:gap-2 px-4 py-2 md:px-6 md:py-2.5 font-sans bg-[#ff059f] text-white rounded-full text-xs sm:text-sm font-medium hover:shadow-lg hover:shadow-[#ff059f]/40 hover:scale-105 transition-all shrink-0 whitespace-nowrap"
          >
            <span className="hidden sm:inline">Student </span>Login 
            <div className="bg-white rounded-full p-0.5 flex items-center justify-center shrink-0">
              <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5" strokeWidth={3} color="#ff059f" />
            </div>
          </Link>
          
        </nav>
      </div>

      {/* ── Floating background petals ─────────────────── */}
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

      {/* ════ 1. HERO ════ */}
      <section className="relative pt-28 pb-16 md:pt-32 md:pb-24 lg:pt-48 lg:pb-36 overflow-hidden antialiased">
        <div className="absolute inset-0 z-0">
          <motion.img
            src="https://res.cloudinary.com/dci2l752v/image/upload/q_auto/f_auto/v1780213240/japan_oadsan.png"
            alt="Mount Fuji"
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: 1.06 }}
            transition={{ duration: 16, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
            style={{ background: 'linear-gradient(to top, #fff5f6, transparent)' }} />
        </div>

        <div className="container mx-auto px-5 sm:px-6 relative z-10 mt-6 md:mt-0">
          <div className="max-w-3xl text-center md:text-left"> 
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-normal text-white leading-tight md:leading-tight mb-3 md:mb-5 tracking-tight"
              style={{ textShadow: '0 4px 24px rgba(245, 17, 184, 0.4), 0 2px 8px rgba(0, 0, 0, 0.6)' }}
              variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
            >
              Unlock Your <br className="hidden md:block" />
              Japanese <br className="hidden md:block" />
              Potential with <br className="hidden md:block" />
              NihonSensei.lk
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg lg:text-xl text-white/95 mb-5 md:mb-8 max-w-2xl mx-auto md:mx-0 leading-relaxed font-light drop-shadow-lg"
              style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}
              variants={fadeUp} initial="hidden" animate="visible" custom={0.25}
            >
              Master Japanese from Sri Lanka with live Zoom classes, 
              comprehensive recordings, and essential learning materials.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center md:justify-start"
              variants={fadeUp} initial="hidden" animate="visible" custom={0.38}
            >
              <Link to="/signup" className="w-full sm:w-auto">
                <Btn
                  className="w-full sm:w-[260px] md:w-auto px-8 py-4 md:px-10 md:py-4 text-white rounded-full font-semibold text-lg flex items-center justify-center gap-3 shadow-2xl shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-105 transition-all"
                  style={{ background: 'linear-gradient(135deg, #fb71e4 0%, #f43fd0 60%, #e11db3 100%)' }}
                >
                  <PlayCircle size={22} strokeWidth={2.5} />
                  Get Started Now
                </Btn>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
        
      {/* ════ 2. MEET YOUR SENSEI (ABOUT) ════ */}
      <section id="about" className="py-24 relative overflow-hidden bg-zinc-50 antialiased">
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <motion.div className="text-center mb-14" variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}>
            <h2 className="text-4xl md:text-5xl font-normal text-zinc-900 mb-4 tracking-tight">
              Meet Your Sensei: Dedicated to Your Success
            </h2>
            <p className="text-zinc-600 max-w-2xl mx-auto leading-relaxed text-base font-light">
              Our experienced Japanese teacher, Sensei Yureka, brings years of expertise and a 
              passion for language education. With a student-centric approach, she makes learning 
              Japanese both effective and enjoyable.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-6 items-stretch">
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

      {/* ════ 3. PATH TO FLUENCY ════ */}
      <section className="py-24 bg-white relative overflow-hidden antialiased">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(255,194,207,0.22) 0%, transparent 60%)' }} />

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
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
    
      {/* ════ 4. FAQ ════ */}
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

      {/* ════ 5. CONTACT SECTION ════ */}
      <section id="contact" className="py-24 relative bg-white border-t border-rose-50">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(255,194,207,0.22) 0%, transparent 60%)' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.p 
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-[#de1d4d] font-bold tracking-widest text-sm uppercase mb-3"
            >
              Get in touch
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-normal text-zinc-900 tracking-tight mb-4" 
            >
              Let's start your Japanese journey
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="text-zinc-600 text-lg"
            >
              Have questions about our courses or need help deciding your level? Drop us a message and our sensei will get back to you.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="space-y-8 pt-4"
            >
              {/* Email Block */}
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-[#fff0f3] rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#fd45e7] group-hover:text-white text-[#de1d4d] transition-colors duration-300 shadow-sm">
                  <Mail size={24} />
                </div>
                <div className="pt-1">
                  <h4 className="text-zinc-900 font-bold text-lg mb-1">Email Us</h4>
                  <a href="mailto:ydilrukshi393@gmail.com" className="text-zinc-600 hover:text-[#de1d4d] transition-colors">
                    ydilrukshi393@gmail.com
                  </a>
                </div>
              </div>

              {/* WhatsApp Block */}
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-[#fff0f3] rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#fd45e7] group-hover:text-white text-[#de1d4d] transition-colors duration-300 shadow-sm">
                  <Phone size={24} />
                </div>
                <div className="pt-1">
                  <h4 className="text-zinc-900 font-bold text-lg mb-1">Whatsapp</h4>
                  <a 
                    href="https://wa.me/94701767138" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-zinc-600 hover:text-[#de1d4d] transition-colors"
                  >
                    +94 70 176 7138
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-[#fff0f3] rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#fd45e7] group-hover:text-white text-[#de1d4d] transition-colors duration-300 shadow-sm">
                  <MapPin size={24} />
                </div>
                <div className="pt-1">
                  <h4 className="text-zinc-900 font-bold text-lg mb-1">Location</h4>
                  <p className="text-zinc-600">Galgamuwa, Sri Lanka<br/></p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-rose-100/40 border border-rose-50"
            >
              {isSent ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} 
                  className="flex flex-col items-center justify-center text-center h-full py-12"
                >
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} className="text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900 mb-2">Message Sent!</h3>
                  <p className="text-zinc-600">Arigatou gozaimasu! We will get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2">Your Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      value={formData.name} 
                      onChange={handleContactChange} 
                      placeholder="Tanaka Yuki" 
                      className="w-full px-5 py-3.5 rounded-2xl border border-zinc-200 focus:outline-none focus:border-[#de1d4d] focus:ring-1 focus:ring-[#de1d4d] transition-colors bg-zinc-50/50 focus:bg-white text-zinc-800" 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2">Email Address</label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      value={formData.email} 
                      onChange={handleContactChange} 
                      placeholder="you@example.com" 
                      className="w-full px-5 py-3.5 rounded-2xl border border-zinc-200 focus:outline-none focus:border-[#de1d4d] focus:ring-1 focus:ring-[#de1d4d] transition-colors bg-zinc-50/50 focus:bg-white text-zinc-800" 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2">Message</label>
                    <textarea 
                      name="message" 
                      required 
                      rows="4" 
                      value={formData.message} 
                      onChange={handleContactChange} 
                      placeholder="How can we help you?" 
                      className="w-full px-5 py-3.5 rounded-2xl border border-zinc-200 focus:outline-none focus:border-[#de1d4d] focus:ring-1 focus:ring-[#de1d4d] transition-colors resize-none bg-zinc-50/50 focus:bg-white text-zinc-800" 
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className={`w-full py-4 text-white rounded-2xl font-semibold text-lg transition-colors shadow-lg flex items-center justify-center gap-2 ${isSubmitting ? 'bg-zinc-400 cursor-not-allowed shadow-none' : 'bg-[#ec71c5] hover:bg-[#fd45e7] shadow-rose-500/25'}`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={18} />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════ 6. FOOTER ════ */}
      <motion.footer
        className="text-white py-14 rounded-t-5xl -mt-12 relative overflow-hidden z-20"
        style={{ background: 'linear-gradient(135deg, #ec71c5 0%, #eb5fbf 50%, #fd45fa 100%)' }}
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}
      >
        <div className="absolute inset-0 pointer-events-none opacity-10"
          style={{ background: 'radial-gradient(ellipse at 80% 50%, white 0%, transparent 60%)' }} />
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