import React from 'react';
import { PlayCircle, BookOpen, Video, LayoutDashboard, Plus, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Image (Replace with your actual Mount Fuji image path) */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop" 
            alt="Mount Fuji" 
            className="w-full h-full object-cover opacity-90"
          />
          {/* Subtle gradient overlay to make text readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/50 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-zinc-900 leading-tight mb-6">
              Unlock Your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sakura-400 to-sakura-600">
                Japanese Potential
              </span> <br/>
              with NihonSensei.lk
            </h1>
            <p className="text-lg text-zinc-700 mb-8 max-w-xl">
              Master Japanese from Sri Lanka with live Zoom classes, comprehensive recordings, and essential learning materials.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <button className="px-8 py-3 bg-sakura-500 text-white rounded-full font-medium hover:bg-sakura-600 transition-all shadow-lg shadow-sakura-200 flex items-center gap-2">
                <Video size={20} />
                Join a Live Class
              </button>
              <button className="px-8 py-3 glass-panel text-zinc-800 rounded-full font-medium hover:bg-white/60 transition-all flex items-center gap-2">
                <PlayCircle size={20} />
                Explore Courses
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MEET YOUR SENSEI SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 mb-4">Meet Your Sensei: Dedicated to Your Success</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">
              Our experienced Japanese teacher brings years of expertise and a passion for language education. With a student-centric approach, she makes learning Japanese both effective and enjoyable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {/* Feature 1 */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-sakura-50 flex items-center justify-center flex-shrink-0 text-sakura-500">
                  <Star size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Experienced Educator</h3>
                  <p className="text-zinc-600">Years of teaching Japanese to diverse student groups.</p>
                </div>
              </div>
              {/* Feature 2 */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-sakura-50 flex items-center justify-center flex-shrink-0 text-sakura-500">
                  <Video size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Interactive Classes</h3>
                  <p className="text-zinc-600">Engaging lessons designed for maximum participation and understanding.</p>
                </div>
              </div>
              {/* Feature 3 */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-sakura-50 flex items-center justify-center flex-shrink-0 text-sakura-500">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Personalized Guidance</h3>
                  <p className="text-zinc-600">Tailored support to help each student achieve their learning goals.</p>
                </div>
              </div>
            </div>
            
            {/* Sensei Image placeholder */}
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" alt="Japanese Teacher" className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. PATH TO FLUENCY (ZIG-ZAG LAYOUT) */}
      <section className="py-20 bg-zinc-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 mb-4">Your Path to Fluency Starts Here</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">
              NihonSensei.lk provides a complete ecosystem to support your Japanese language learning journey from beginner to advanced levels.
            </p>
          </div>

          <div className="space-y-24">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <div className="text-sakura-400 font-bold text-lg mb-2">1</div>
                <h3 className="text-3xl font-bold mb-4">Join Live Zoom Classes</h3>
                <p className="text-zinc-600 text-lg">Participate in real-time interactive lessons with your sensei and classmates.</p>
              </div>
              <div className="md:w-1/2">
                <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop" alt="Live Classes" className="rounded-2xl shadow-xl w-full" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12">
              <div className="md:w-1/2">
                <div className="text-sakura-400 font-bold text-lg mb-2">2</div>
                <h3 className="text-3xl font-bold mb-4">Watch Weekly Recordings</h3>
                <p className="text-zinc-600 text-lg">Catch up on missed classes or revise challenging topics anytime with on-demand video recordings.</p>
              </div>
              <div className="md:w-1/2">
                <img src="https://images.unsplash.com/photo-1610484826967-09c5720778c7?q=80&w=800&auto=format&fit=crop" alt="Watch Recordings" className="rounded-2xl shadow-xl w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FAQ SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {/* FAQ Items */}
            {['How do I join a live Zoom class?', 'Can I watch class recordings if I miss a session?', 'How can I download lesson materials?', 'Is there a trial period for new students?', 'What levels of Japanese are offered?'].map((question, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl flex justify-between items-center cursor-pointer hover:bg-zinc-50 transition-colors">
                <span className="font-medium text-zinc-800">{question}</span>
                <div className="w-8 h-8 rounded-full bg-sakura-100 flex items-center justify-center text-sakura-500 flex-shrink-0">
                  <Plus size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="bg-sakura-400 text-white py-12 rounded-t-[3rem] mt-12">
        <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">NihonSensei.lk</h3>
            <p className="text-sakura-50 text-sm">© 2026 NihonSensei.lk All Rights Reserved.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Platform</h4>
            <ul className="space-y-2 text-sakura-50 text-sm">
              <li>Home</li>
              <li>About Us</li>
              <li>Courses</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sakura-50 text-sm">
              <li>Contact</li>
              <li>FAQ</li>
              <li>Student Login</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sakura-50 text-sm">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}