import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, LayoutGrid, CheckCircle2, ChevronRight, BarChart4, Globe, Zap, Users } from 'lucide-react';
import PortfolioSection from '../components/portfolio/PortfolioSection';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const Portfolio = () => {
  return (
    <div className="bg-[#020408] text-white selection:bg-cyan-500/40 overflow-x-hidden font-sans">
      
      {/* 1. CINEMATIC PORTFOLIO HERO */}
      {/* <section className="relative pt-40 pb-20 px-6 flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')] opacity-5 bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020408] via-transparent to-[#020408]" />
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div initial="initial" animate="whileInView" variants={fadeInUp}>
            <span className="text-cyan-500 font-mono tracking-[0.5em] uppercase text-xs mb-6 block">Our Legacy</span>
            <h1 className="text-5xl md:text-[8rem] font-black italic tracking-tighter leading-none uppercase mb-8">
              Selected <span className="text-transparent stroke-text">Works</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed border-l-2 border-cyan-500/30 pl-6 italic">
              A curated collection of our finest engineering solutions. We build highly scalable, interactive, and beautifully designed web architectures.
            </p>
          </motion.div>
        </div>
      </section> */}

      {/* 2. FEATURED CASE STUDY (Full Width Highlight) */}
      {/* <section className="py-24 px-6 md:px-12 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="group relative rounded-3xl overflow-hidden border border-white/10 aspect-square md:aspect-[21/9]">
            <img 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075" 
              alt="Featured Project" 
              className="w-full h-full object-cover filter brightness-50 group-hover:scale-105 transition-all duration-[10s]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            
            <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row justify-between items-end gap-10">
               <div>
                  <div className="flex gap-4 mb-4">
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-[10px] font-mono uppercase tracking-widest rounded-full">🏆 Featured</span>
                    <span className="px-3 py-1 bg-white/10 text-white border border-white/20 text-[10px] font-mono uppercase tracking-widest rounded-full">Real Estate Platform</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">Luxe Real Estate HQ</h2>
                  <p className="text-gray-300 max-w-xl text-sm leading-relaxed border-l border-white/20 pl-4">
                    A hyper-responsive property marketplace featuring 360-degree virtual tours, instant secure messaging with agents, and real-time automated inventory mapping.
                  </p>
               </div>
               <a href="#" className="flex-shrink-0 w-16 h-16 bg-white text-black rounded-full flex items-center justify-center hover:bg-cyan-500 transition-colors hover:scale-110">
                 <ArrowRight size={24} />
               </a>
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* 3. THE PORTFOLIO GALLERY GRID (Using your existing component) */}
      <div id="portfolio-grid">
         <PortfolioSection />
      </div>

      {/* 4. METRICS / IMPACT SHOWCASE */}
      <section className="py-24 px-6 border-y border-white/5 bg-[#010204]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="grid grid-cols-1 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
             {[
               { icon: <Zap size={24}/>, num: "320+", label: "Projects Delivered" },
               { icon: <Users size={24}/>, num: "5M+", label: "Users Reached" },
               { icon: <Globe size={24}/>, num: "12", label: "Countries Served" },
               { icon: <BarChart4 size={24}/>, num: "99.9%", label: "Uptime Guaranteed" },
             ].map((stat, idx) => (
               <div key={idx} className="p-8 flex flex-col items-center justify-center text-center group cursor-default">
                  <div className="text-cyan-500 mb-6 group-hover:scale-110 transition-transform">{stat.icon}</div>
                  <h3 className="text-5xl font-black italic tracking-tighter mb-2 group-hover:text-cyan-400 transition-colors">{stat.num}</h3>
                  <p className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.2em]">{stat.label}</p>
               </div>
             ))}
          </motion.div>
        </div>
      </section>

      {/* 5. TECHNOLOGIES BEHIND THE WORKS */}
     

      {/* 6. CLIENT TESTIMONIALS */}
     

      <style dangerouslySetInnerHTML={{
        __html: `
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.2);
        }
        @media (min-width: 768px) {
          .stroke-text { -webkit-text-stroke: 2px rgba(255,255,255,0.2); }
        }
      `}} />
    </div>
  );
};

export default Portfolio;
