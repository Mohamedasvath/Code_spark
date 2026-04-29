import React from 'react';
import { motion } from 'framer-motion';
import { Code, Layout, Shield, Gauge, Layers, Smartphone, Database, Server, ServerCog, Paintbrush, Fingerprint, Lock, Zap, ArrowRight, CheckCircle } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const ALL_SERVICES = [
  {
    icon: <Layout size={40} className="text-cyan-400" />,
    title: "UI/UX Architecture",
    description: "We don't just 'design' pages. We architect digital experiences. We focus on conversion rates, intuitive user flows, and award-winning aesthetic qualities.",
    features: ["Wireframing & Prototyping", "User Journey Mapping", "Framer Motion Animations", "Responsive Design Systems"]
  },
  {
    icon: <Code size={40} className="text-cyan-400" />,
    title: "Full-Stack Development",
    description: "Robust applications built on the latest technologies. From the browser down to the database, we engineer speed and reliability across the stack.",
    features: ["React & Next.js Ecosystems", "Node.js / Express Backends", "Custom API Integrations", "Real-Time WebSockets"]
  },
  {
    icon: <Database size={40} className="text-cyan-400" />,
    title: "Database Engineering",
    description: "Data is the lifeblood of modern apps. We construct scalable, un-bloated schemas that can query millions of rows in milliseconds.",
    features: ["MongoDB Architectures", "PostgreSQL Relational DBs", "Redis Caching Layers", "Query Optimization"]
  },
  {
    icon: <Shield size={40} className="text-cyan-400" />,
    title: "Enterprise Security",
    description: "Military-grade data protection. Your app is locked down from threats, giving you and your users absolute peace of mind.",
    features: ["OAuth 2.0 / JWT Auth", "OWASP Top 10 Prevention", "Role-Based Access Control", "End-to-End Encryption"]
  },
  {
    icon: <Smartphone size={40} className="text-cyan-400" />,
    title: "Mobile Optimization / PWA",
    description: "Seamless mobile experiences that look and feel like native applications, with offline capabilities and push notifications.",
    features: ["Progressive Web Apps", "Touch-Optimized UI", "App-Like Navigation", "Service Worker Caching"]
  },
  {
    icon: <ServerCog size={40} className="text-cyan-400" />,
    title: "Cloud Deployment & DevOps",
    description: "We launch your application on the world's best infrastructure. Automated pipelines ensure zero downtime during future updates.",
    features: ["AWS / Vercel Deployments", "Docker Containerization", "CI/CD Pipelines", "Automated Backups"]
  }
];

export default function Services() {
  return (
    <div className="min-h-screen bg-[#020408] text-white font-sans pt-32 pb-20 overflow-x-hidden">
      
      {/* Page Header */}
      <section className="px-6 max-w-7xl mx-auto mb-20 md:mb-32 text-center">
        <motion.div initial="initial" animate="animate" variants={fadeInUp}>
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-10 shadow-[0_0_20px_rgba(34,211,238,0.05)]">
            <Zap size={14} className="text-cyan-400" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-cyan-400">Engineering Capabilities</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black italic tracking-tight leading-[0.9] mb-10 uppercase">
            Our <span className="text-cyan-500 stroke-text bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">Services</span>
          </h1>
          <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            CodeSpark delivers end-to-end digital solutions. We don't build generic templates; we engineer robust, scalable software assets tailored precisely to your business logic.
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="px-6 max-w-7xl mx-auto mb-32">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10"
        >
          {ALL_SERVICES.map((service, idx) => (
            <motion.div 
              key={idx} 
              variants={fadeInUp}
              className="p-8 md:p-12 border border-white/5 bg-white/[0.02] rounded-[2.5rem] hover:border-cyan-500/30 hover:bg-[#050A14] transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[60px] rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#020408] border border-white/10 flex items-center justify-center mb-10 group-hover:scale-110 group-hover:border-cyan-500/50 transition-all duration-700 shadow-[0_0_15px_rgba(34,211,238,0)] group-hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]">
                {React.cloneElement(service.icon, { size: 32 })}
              </div>
              <h3 className="text-2xl md:text-3xl font-black italic uppercase mb-6 tracking-tight group-hover:text-cyan-400 transition-colors">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed mb-10 text-sm md:text-base font-light">
                {service.description}
              </p>
              
              <ul className="space-y-4">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-4 text-[11px] font-mono tracking-widest text-gray-300 font-bold uppercase">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/40 group-hover:bg-cyan-500 transition-colors shadow-[0_0_5px_rgba(34,211,238,0.5)]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Tech Stack Marquee / Tools Ecosystem */}
      <section className="py-24 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <p className="text-[10px] uppercase tracking-[0.5em] text-gray-500 font-black mb-12">Powered by Elite Technologies</p>
           <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
             {['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Tailwind', 'AWS', 'Vercel'].map((tech) => (
               <span key={tech} className="text-xl md:text-3xl font-black italic text-white/20 hover:text-cyan-400 transition-all duration-500 uppercase tracking-tighter hover:scale-110 cursor-default">{tech}</span>
             ))}
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-32 md:py-48 text-center max-w-4xl mx-auto">
        <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp}>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black italic uppercase tracking-tighter mb-10 leading-none">Ready to <br/><span className="text-cyan-500">Launch?</span></h2>
          <p className="text-gray-400 text-lg mb-12 font-light">Whether you need a full enterprise application architected from scratch or a high-converting landing page, our senior developers are ready to start the engine.</p>
          <a href="/contact" className="inline-flex items-center gap-4 px-12 py-6 bg-cyan-500 text-black font-black uppercase italic tracking-widest text-sm rounded-full hover:bg-cyan-400 transition-all shadow-[0_20px_40px_rgba(34,211,238,0.2)] hover:scale-105 active:scale-95">
            Initiate Project
            <ArrowRight size={20} />
          </a>
        </motion.div>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.1);
        }
        @media (min-width: 768px) {
          .stroke-text { -webkit-text-stroke: 2px rgba(255,255,255,0.1); }
        }
      `}} />
    </div>
  );
}
