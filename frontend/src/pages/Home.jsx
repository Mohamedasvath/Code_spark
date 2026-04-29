import React, { useRef, useState, } from 'react';
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import {
  Code, Layout, Terminal, Send, ExternalLink, Shield, Gauge, Layers, MousePointer2,
  Phone, Mail, Globe, Zap, Users, CheckCircle, Database, Server, Smartphone,
  Cpu, Lock, HelpCircle, Star, Award, MapPin, Search, Maximize, Target, Activity,
  ChevronDown, CheckCircle2, Sparkles, Orbit
} from 'lucide-react';

import logo from "../../public/logo.png"

// --- Assets ---
const LOGO_URL = logo; // Replace with your actual local path: /logo.png

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};


const Home = () => {
    const [activeService, setActiveService] = useState(null);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Parallax for Hero Image
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1.1, 1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 0.2]);

  const [activeFaq, setActiveFaq] = useState(0);
  const faqs = [
    { q: "What is your typical timeline?", a: "Most bespoke websites take 4-8 weeks, while complex web applications usually require 3-6 months from discovery to launch." },
    { q: "Do you design as well as develop?", a: "Yes. We provide end-to-end services, from wireframing and UI/UX design to full-stack engineering and cloud deployment." },
    { q: "What technologies do you specialize in?", a: "We specialize in the modern web stack including React, Node.js, Next.js, and MongoDB, tailored for extreme performance." }
  ];
 


  return (
    <div ref={containerRef} className="bg-[#020408] text-white selection:bg-cyan-500/40 overflow-x-hidden font-sans">

      {/* 1. CINEMATIC HERO (Video Background) */}
<section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 py-10 md:py-16">
  {/* Background Image */}
  <motion.div
    style={{ scale: heroScale,  }}
    className="absolute inset-0 "
  >
    <img
      src="https://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/2/13/1392314553457/Building-for-the-web-inte-006.jpg"
      alt="Background"
      className="w-full h-full object-cover  "
    />

    <div className="absolute inset-0 bg-gradient-to-b from-[#020408]/75 via-[#020408]/85 to-[#020408]" />
  </motion.div>

  {/* Main Content */}
  <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col items-center text-center">

    {/* Logo */}
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2 }}
      className="relative mb-4"
    >
      <div className="absolute inset-0 bg-cyan-500/20 blur-[70px] rounded-full" />

      <img
        src={LOGO_URL}
        alt="Code Spark Logo"
        className="w-20 md:w-20 mt- relative mt-5 z-10 drop-shadow-[0_0_25px_rgba(34,211,238,0.35)]"
      />
    </motion.div>

    {/* Hero Content */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="w-full"
    >
      <h1 className="text-[14vw] md:text-[6rem] lg:text-[8rem] font-extrabold uppercase leading-[0.85] tracking-tight mb-3">
        <span className="text-white ">CODE_</span>
        <br />
        <span className="text-transparent bg-clip-text   bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300">
          SPARK
        </span>
      </h1>

      <p className="text-cyan-300 mt-8 text-[10px] md:text-sm font-medium tracking-[0.2em] md:tracking-[0.45em] uppercase mb-4">
        Full Stack Web Applications For Business Growth
      </p>

      <p className="max-w-3xl mx-auto text-gray-300 text-sm md:text-base leading-relaxed mb-8 px-2">
        We create premium websites, business dashboards, automation systems,
        and powerful digital platforms that help brands grow faster, look
        stronger, and convert better.
      </p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row gap-3 justify-center items-center"
      >
        {/* Contact Us Button */}
        <button
          onClick={() => navigate("/contact")}
          className="group px-7 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-[0.12em] rounded-full flex items-center gap-3 transition-all duration-300 hover:scale-105 shadow-[0_0_25px_rgba(34,211,238,0.25)]"
        >
          <Mail size={17} />
          Contact Us
        </button>

        {/* Call Now Button */}
        <a
          href="tel:9344790389"
          className="group px-7 py-3 border border-white/10 hover:border-cyan-400 bg-white/[0.03] rounded-full text-white font-bold uppercase tracking-[0.12em] flex items-center gap-3 transition-all duration-300 hover:scale-105"
        >
          <Phone size={17} className="text-cyan-400" />
          Call Now
        </a>
      </motion.div>
    </motion.div>
  </div>
</section>   

      {/* 2. PREMIUM VALUE PROPOSITION */}
    <section className="py-32 px-6 bg-[#020408] border-t border-white/5">
  <div className="max-w-7xl mx-auto">
    {/* Heading */}
    <div className="text-center mb-20">
      <p className="text-cyan-400 font-mono text-[11px] tracking-[0.4em] uppercase mb-4">
        Why Choose Us
      </p>

      <h2 className="text-4xl md:text-7xl font-black italic uppercase leading-tight mb-6">
        Premium Digital <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          Solutions
        </span>
      </h2>

      <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
        We create modern websites and powerful business solutions
        designed for growth, speed, and long-term success.
      </p>
    </div>

    {/* Row 1 */}
    <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
      {/* Left Text */}
      <div>
        <p className="text-cyan-400 text-sm font-bold uppercase tracking-[0.3em] mb-4">
          01
        </p>

        <h3 className="text-3xl md:text-5xl font-black italic uppercase mb-6">
          Fast & Modern <br />
          Website Design
        </h3>

        <p className="text-gray-400 leading-relaxed text-sm md:text-base">
          Premium websites built with speed, clean UI, mobile-first
          experience, and strong conversion-focused design for modern brands.
        </p>
      </div>

      {/* Right Image */}
      <div className="rounded-3xl overflow-hidden border border-white/10">
        <img
          src="https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg"
          alt="Website Design"
          className="w-full h-[350px] object-cover hover:scale-105 transition duration-700"
        />
      </div>
    </div>

    {/* Row 2 */}
    <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
      {/* Left Image */}
      <div className="order-2 md:order-1 rounded-3xl overflow-hidden border border-white/10">
        <img
          src="https://img.freepik.com/free-vector/website-loading-speed-isometric-landing-page_107791-7205.jpg?semt=ais_hybrid&w=740&q=80"
          alt="Performance"
          className="w-full h-[350px] object-cover hover:scale-105 transition duration-700"
        />
      </div>

      {/* Right Text */}
      <div className="order-1 md:order-2">
        <p className="text-cyan-400 text-sm font-bold uppercase tracking-[0.3em] mb-4">
          02
        </p>

        <h3 className="text-3xl md:text-5xl font-black italic uppercase mb-6">
          Speed & <br />
          Performance
        </h3>

        <p className="text-gray-400 leading-relaxed text-sm md:text-base">
          Fast loading speed, SEO optimization, and better performance
          to improve rankings, engagement, and business growth.
        </p>
      </div>
    </div>

    {/* Row 3 */}
    <div className="grid md:grid-cols-2 gap-10 items-center">
      {/* Left Text */}
      <div>
        <p className="text-cyan-400 text-sm font-bold uppercase tracking-[0.3em] mb-4">
          03
        </p>

        <h3 className="text-3xl md:text-5xl font-black italic uppercase mb-6">
          Security & <br />
          Reliability
        </h3>

        <p className="text-gray-400 leading-relaxed text-sm md:text-base">
          Secure backend systems with JWT, OAuth, SSL, and strong
          architecture built for long-term trust and reliability.
        </p>
      </div>

      {/* Right Image */}
      <div className="rounded-3xl overflow-hidden border border-white/10">
        <img
          src="https://strapi.blog.talentsprint.com/uploads/cyber_security_talent_gap_2_e61945272a.webp"
          alt="Security"
          className="w-full h-[350px] object-cover hover:scale-105 transition duration-700"
        />
      </div>
    </div>
  </div>
</section>

      {/* 3. TRUSTED BRANDS (Marquee) */}
      <section className="py-32 border-y border-white/5 bg-[#020408] relative overflow-hidden">
  {/* Background Glow */}
  <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full" />
  <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-blue-500/10 blur-[120px] rounded-full" />

  <div className="max-w-7xl mx-auto px-6 relative z-10">
    {/* Header */}
    <div className="text-center mb-20">
      <p className="text-cyan-400 font-mono text-[11px] tracking-[0.4em] uppercase mb-4">
       PAYMENT INTERGRATION
      </p>

      <h2 className="text-4xl md:text-7xl font-black italic uppercase leading-tight">
        Brands That Trust <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          Our Payment INtergration
        </span>
      </h2>

      <p className="text-gray-400 max-w-2xl mx-auto mt-6 text-sm md:text-base leading-relaxed">
        We create premium digital experiences trusted by ambitious
        businesses and modern brands across industries.
      </p>
    </div>

    {/* Modern Brand Cards */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {[
        "Vercel",
        "Stripe",
        "AWS",
         "JWT",
        "Razerpay",
      ].map((brand, i) => (
        <div
          key={i}
          className="group h-[150px] rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl flex items-center justify-center hover:border-cyan-400/40 hover:-translate-y-2 transition-all duration-500"
        >
          <span className="text-xl md:text-2xl font-black italic uppercase text-white/60 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-500">
            {brand}
          </span>
        </div>
      ))}
    </div>

    {/* Bottom Line */}
    <div className="mt-20 flex justify-center">
      <div className="px-8 py-4 rounded-full border border-cyan-400/20 bg-cyan-500/5 text-cyan-300 text-xs md:text-sm font-bold uppercase tracking-[0.3em]">
        Building Future-Ready Digital Solutions
      </div>
    </div>
  </div>
</section>

      {/* 4. WORK GALLERY (Original Style - Expanded to 5 Projects) */}
      {/* <section id="work" className="py-32 px-6">
        <div className="max-w-7xl mx-auto mb-20">
          <span className="text-cyan-500 font-mono tracking-[0.5em] uppercase text-xs mb-6 block">Our Portfolio — 02</span>
          <h2 className="text-5xl md:text-7xl font-black italic uppercase">Selected <span className="text-transparent stroke-text">Works</span></h2>
        </div>
        <div className="max-w-7xl mx-auto space-y-40">
          {[
            {
              title: "Cake Shop",
              tag: "MERN / INVENTORY",
              img: "https://plus.unsplash.com/premium_photo-1663133737289-448f4954f042?w=600&auto=format&fit=crop&q=60",
              desc: "A fully automated workshop management ecosystem with real-time inventory tracking."
            },
            {
              title: "Aura E-Commerce",
              tag: "RETAIL / ANIMATION",
              img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999",
              desc: "Premium shopping experience focusing on micro-interactions and high conversion."
            },
            {
              title: "Nova Analytics Pro",
              tag: "SaaS / DATA DASHBOARD",
              img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070",
              desc: "Enterprise-grade analytics dashboard processing millions of data points smoothly."
            },
            {
              title: "FinTech Secure Gateway",
              tag: "FINANCE / SECURITY",
              img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470",
              desc: "Highly secure payment processing web app with military-grade encryption workflows."
            },
            {
              title: "Luxe Real Estate HQ",
              tag: "PROPERTY / VIRTUAL TOURS",
              img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075",
              desc: "Elite marketplace featuring 360 virtual tours and instant client communication."
            }
          ].map((work, i) => (
            <motion.div key={i} {...fadeInUp} className="group relative grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-8 overflow-hidden rounded-xl bg-gray-900 border border-white/5 relative aspect-video">
                <img
                  src={work.img}
                  className="w-full h-full object-cover filter brightness-75 group-hover:scale-105 group-hover:rotate-1 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">{work.title}</h3>
                </div>
              </div>
              <div className="md:col-span-4">
                <span className="text-cyan-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-4 block">{work.tag}</span>
                <p className="text-gray-400 mb-8 leading-relaxed italic">{work.desc}</p>
                <button className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] group/btn">
                  View Project
                  <span className="w-12 h-[1px] bg-white/20 group-hover/btn:w-20 group-hover/btn:bg-cyan-500 transition-all" />
                  <ExternalLink size={14} className="group-hover/btn:text-cyan-400" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section> */}

      {/* 5. SERVICES (Original High-End Bento Grid) */}


<section
  id="services"
  className="py-40 px-6 bg-[#020408] border-t border-white/5 relative overflow-hidden"
>
  {/* Background Effects */}
  <div className="absolute top-20 left-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[140px] rounded-full" />
  <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/10 blur-[140px] rounded-full" />

  <motion.div
    {...fadeInUp}
    className="max-w-7xl mx-auto relative z-10"
  >
    {/* Heading */}
    <div className="text-center mb-24">
      <p className="text-cyan-400 font-mono text-[11px] tracking-[0.4em] uppercase mb-4">
        What We Do
      </p>

      <h2 className="text-4xl md:text-8xl font-black italic uppercase leading-[0.95]">
        Our <span className="text-transparent stroke-text">Services</span>
      </h2>

      <p className="text-gray-400 max-w-2xl mx-auto mt-6 text-sm md:text-base leading-relaxed">
        Premium web solutions crafted for modern businesses —
        fast, secure, scalable, and built to convert.
      </p>
    </div>

    {/* Services */}
    <div className="space-y-8">
      {[
        {
          number: "01",
          title: "Website Development",
          desc: "Modern, premium, responsive websites with high-speed performance and clean UI/UX design.",
          extra:
            "We build landing pages, portfolio websites, business websites, admin dashboards, and custom platforms with smooth animations and premium user experience.",
          icon: <Layers size={28} />,
          image:
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200",
        },
        {
          number: "02",
          title: "Performance Optimization",
          desc: "SEO-friendly architecture, lightning-fast loading speed, and better conversion performance.",
          extra:
            "Speed optimization includes lazy loading, image optimization, SEO structure, code splitting, caching, and better Google PageSpeed performance.",
          icon: <Gauge size={28} />,
          image:
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200",
        },
        {
          number: "03",
          title: "Security Systems",
          desc: "JWT, OAuth, SSL encryption, and strong backend security for long-term reliability.",
          extra:
            "We implement secure authentication systems, protected APIs, database safety, admin access control, and production-ready backend architecture.",
          icon: <Shield size={28} />,
          image:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200",
        },
      ].map((service, i) => (
        <motion.div
          key={i}
          className="group border border-white/10 rounded-[30px] overflow-hidden bg-white/[0.02] hover:border-cyan-400/40 transition-all duration-500"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Image */}
            <div className="lg:col-span-5 relative h-[320px] overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#020408]" />
            </div>

            {/* Right Content */}
            <div className="lg:col-span-7 p-8 md:p-12">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl md:text-6xl font-black text-cyan-500/20 italic">
                  {service.number}
                </span>

                <div className="w-14 h-14 rounded-2xl border border-cyan-400/20 bg-cyan-500/5 flex items-center justify-center text-cyan-400">
                  {service.icon}
                </div>
              </div>

              <h3 className="text-3xl md:text-4xl font-black italic uppercase mb-4 group-hover:text-cyan-400 transition-colors">
                {service.title}
              </h3>

              <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl">
                {service.desc}
              </p>

              {/* Extra Expand Content */}
              {activeService === i && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="text-gray-300 text-sm md:text-base leading-relaxed mt-6 max-w-xl"
                >
                  {service.extra}
                </motion.p>
              )}

              {/* Button */}
              <button
                onClick={() =>
                  setActiveService(activeService === i ? null : i)
                }
                className="mt-8 flex items-center gap-4 text-cyan-400 font-bold text-xs uppercase tracking-[0.3em]"
              >
                {activeService === i ? "Show Less" : "Learn More"}

                <div className="w-16 h-[2px] bg-cyan-400" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
</section>

      {/* 6. TECH STACK SHOWCASE */}
   

      {/* 7. ABOUT THE FOUNDER / STUDIO */}


      {/* 8. OUR PROCESS TIMELINE */}
     <section className="py-32 md:py-40 px-6 border-y border-white/5 bg-[#020408]">
  <div className="max-w-7xl mx-auto">
    
    {/* HEADER */}
    <div className="text-center mb-20">
      <p className="text-cyan-400 font-mono text-[11px] tracking-[0.35em] uppercase mb-4">
        Our Process
      </p>

      <h2 className="text-4xl md:text-6xl font-black italic uppercase leading-[1] mb-6">
        How We Build <br />
        <span className="text-transparent stroke-text">
          Your Digital Presence
        </span>
      </h2>

      <p className="max-w-3xl mx-auto text-gray-400 text-base md:text-lg leading-relaxed">
        From strategy to launch, every step is carefully planned to
        create a powerful, high-performing website that helps your
        business grow faster and stand out online.
      </p>
    </div>

    {/* MAIN GRID */}
    <div className="space-y-16">
      {[
        {
          step: "01",
          title: "Discovery & Strategy",
          desc: "We understand your business goals, target audience, competitors, and project requirements to create the right digital strategy.",
          img: "https://thumbs.dreamstime.com/b/magnifying-keyboard-23955157.jpg"
        },
        {
          step: "02",
          title: "UI / UX Design",
          desc: "We create clean, modern, and conversion-focused designs that improve customer trust and deliver a premium user experience.",
          img: "https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg"
        },
        {
          step: "03",
          title: "Development & Testing",
          desc: "We build fast, secure, and scalable websites using modern technologies with full testing for smooth performance.",
          img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2070"
        },
        {
          step: "04",
          title: "Launch & Support",
          desc: "After deployment, we ensure your website runs perfectly with optimization, monitoring, and long-term technical support.",
          img: "https://miro.medium.com/1*Dk_jsNk6mqhWCo8HBKFWiw.jpeg"
        }
      ].map((item, index) => (
        <motion.div
          key={index}
          {...fadeInUp}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${
            index % 2 !== 0 ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* IMAGE */}
          <div className={`${index % 2 !== 0 ? "lg:order-2" : ""}`}>
            <div className="relative rounded-3xl overflow-hidden border border-white/10 group">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-[350px] object-cover group-hover:scale-105 transition-all duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#020408]/80 to-transparent" />

              <div className="absolute top-6 left-6 w-14 h-14 rounded-full bg-cyan-500 text-black flex items-center justify-center text-lg font-black">
                {item.step}
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className={`${index % 2 !== 0 ? "lg:order-1" : ""}`}>
            <h3 className="text-3xl md:text-4xl font-black italic uppercase mb-5">
              {item.title}
            </h3>

            <p className="text-gray-400 text-base leading-relaxed mb-6">
              {item.desc}
            </p>

            <div className="w-20 h-[2px] bg-cyan-400" />
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* 9. WHY CHOOSE US */}
    <section className="py-28 md:py-36 px-6 max-w-7xl mx-auto border-t border-white/5">
  <motion.div
    {...fadeInUp}
    className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center"
  >
    {/* LEFT SIDE */}
    <div>
      <p className="text-cyan-400 font-mono text-[11px] tracking-[0.35em] uppercase mb-4">
        Why Choose Us
      </p>

      <h2 className="text-4xl md:text-6xl font-black italic uppercase leading-[1] mb-6">
        Why Businesses <br />
        Trust <span className="text-transparent stroke-text">CodeSpark</span>
      </h2>

      <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl mb-8">
        We build modern, fast, and professional websites that help
        businesses grow online. Our focus is not just design —
        we create digital solutions that improve trust, performance,
        and customer experience.
      </p>

      <div className="space-y-4">
        {[
          "Professional modern UI design",
          "Fast-loading and mobile-friendly websites",
          "Secure and scalable development",
          "Business-focused custom solutions"
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3"
          >
            <CheckCircle2
              size={20}
              className="text-cyan-400 shrink-0"
            />
            <span className="text-gray-300 text-sm md:text-base">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>

    {/* RIGHT SIDE */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {[
        {
          icon: <Target size={24} />,
          title: "Custom Solutions",
          desc: "Every project is designed specifically for your business needs."
        },
        {
          icon: <Activity size={24} />,
          title: "Scalable Growth",
          desc: "Built to support your future expansion without performance issues."
        },
        {
          icon: <Lock size={24} />,
          title: "Strong Security",
          desc: "Safe systems with secure login, APIs, and protected data handling."
        },
        {
          icon: <Zap size={24} />,
          title: "Fast Delivery",
          desc: "Quick execution with premium quality and reliable support."
        }
      ].map((item, index) => (
        <div
          key={index}
          className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-cyan-500/30 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
            {item.icon}
          </div>

          <h4 className="text-lg font-bold uppercase mb-2">
            {item.title}
          </h4>

          <p className="text-gray-400 text-sm leading-relaxed">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  </motion.div>
</section>

      




      {/* 17. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-32 px-6 max-w-4xl mx-auto border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black italic uppercase mb-4">Intelligence</h2>
          <p className="font-mono text-[10px] tracking-[0.5em] text-gray-500">FREQUENTLY ASKED QUESTIONS</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02]">
              <button
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-white/[0.02] transition-colors"
              >
                <span className="font-bold uppercase tracking-widest text-sm md:text-base">{faq.q}</span>
                <ChevronDown className={`transition-transform duration-300 text-cyan-500 ${activeFaq === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {activeFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-gray-400 leading-relaxed text-sm border-t border-white/5 mt-2">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>




      {/* 19. CONTACT (Original Format) */}
     {/* 19. CONTACT (Original Format) */}
 <section
      id="contact"
      className="relative py-40 px-6 text-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://plus.unsplash.com/premium_photo-1663100722417-6e36673fe0ed?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNvZGluZ3xlbnwwfHwwfHx8MA%3D%3D"
          alt="Background"
          className="w-full h-full object-cover scale-150 "
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#020408]/85" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020408]/40 to-[#020408]" />
      </div>

      {/* Glow Effects */}
      <div className="absolute top-10 left-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/10 blur-[140px] rounded-full" />

      {/* Main Content */}
      <motion.div
        {...fadeInUp}
        className="relative z-10 max-w-3xl mx-auto"
      >
        <img
          src={LOGO_URL}
          alt="Logo"
          className="w-20 mx-auto mb-10 opacity-50"
        />

        <h2 className="text-5xl md:text-[8rem] font-black italic uppercase tracking-tighter leading-none mb-12">
          Ready to <br />
          <span className="text-cyan-500">Spark?</span>
        </h2>

        {/* Contact Info */}
        <div className="mt-10 mb-12 space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Phone className="text-cyan-500" size={20} />
            <a
              href="tel:9344790389"
              className="text-white font-bold text-lg hover:text-cyan-400 transition-all"
            >
              +91 93447 90389
            </a>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Mail className="text-cyan-500" size={20} />
            <a
              href="mailto:mohamedasvath01@gmail.com"
              className="text-white font-bold text-lg hover:text-cyan-400 transition-all"
            >
              mohamedasvath01@gmail.com
            </a>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <a
            href="tel:9344790389"
            className="px-12 py-6 bg-cyan-500 text-black font-black uppercase italic tracking-widest text-lg hover:shadow-[0_0_50px_rgba(6,182,212,0.4)] transition-all"
          >
            Call Now
          </a>

          <button
            onClick={() => navigate("/contact")}
            className="px-12 py-6 border border-white/10 hover:bg-white hover:text-black text-white font-black uppercase italic tracking-widest text-lg transition-all"
          >
            Direct Contact
          </button>
        </div>
      </motion.div>
    </section>


      {/* 20. MEGA FOOTER */}
     <footer className="pt-24 pb-12 border-t border-white/5 bg-[#010204] relative overflow-hidden">
  {/* Glow effect */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[200px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

  <div className="max-w-7xl mx-auto px-10 relative z-10">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
      
      {/* LEFT SIDE */}
      <div className="md:col-span-5">
        <img
          src={LOGO_URL}
          alt="Logo"
          className="w-24 mb-8 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]"
        />

        <p className="text-gray-400 text-sm leading-loose max-w-sm mb-10">
          CodeSpark is an elite software engineering studio dedicated to building
          high-performance, secure, and beautiful digital experiences for visionary
          brands globally.
        </p>

        {/* CONTACT DETAILS ADDED */}
        <div className="space-y-4 mb-10">
          <a
            href="tel:9344790389"
            className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors"
          >
            <Phone size={18} className="text-cyan-400" />
            <span className="text-sm font-medium">
              +91 93447 90389
            </span>
          </a>

          <a
            href="mailto:mohamedasvath01@gmail.com"
            className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors"
          >
            <Mail size={18} className="text-cyan-400" />
            <span className="text-sm font-medium break-all">
              mohamedasvath01@gmail.com
            </span>
          </a>
        </div>

        {/* SOCIAL ICONS */}
        <div className="flex gap-4">
          <a
            href="#"
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-cyan-500 hover:text-black hover:scale-110 transition-all shadow-[0_0_15px_rgba(255,255,255,0.02)]"
          >
            <Globe size={18} />
          </a>

          <a
            href="#"
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-cyan-500 hover:text-black hover:scale-110 transition-all shadow-[0_0_15px_rgba(255,255,255,0.02)]"
          >
            <Terminal size={18} />
          </a>

          <a
            href="tel:9344790389"
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-cyan-500 hover:text-black hover:scale-110 transition-all shadow-[0_0_15px_rgba(255,255,255,0.02)]"
          >
            <Phone size={18} />
          </a>
        </div>
      </div>

      {/* NAVIGATION */}
      <div className="md:col-span-2">
        <h4 className="font-black uppercase italic tracking-widest text-white/80 mb-8">
          Navigation
        </h4>

        <ul className="space-y-4 text-gray-400 text-sm font-medium">
          <li>
            <a href="#work" className="hover:text-cyan-400 hover:ml-2 transition-all">
              Portfolio Works
            </a>
          </li>

          <li>
            <a href="#services" className="hover:text-cyan-400 hover:ml-2 transition-all">
              Core Capabilities
            </a>
          </li>

          <li>
            <a href="#" className="hover:text-cyan-400 hover:ml-2 transition-all">
              About Studio
            </a>
          </li>

          <li>
            <a href="#contact" className="hover:text-cyan-400 hover:ml-2 transition-all">
              Hire Us
            </a>
          </li>
        </ul>
      </div>

      {/* RESOURCES */}
      <div className="md:col-span-2">
        <h4 className="font-black uppercase italic tracking-widest text-white/80 mb-8">
          Resources
        </h4>

        <ul className="space-y-4 text-gray-400 text-sm font-medium">
          <li>
            <a href="#" className="hover:text-white transition-colors">
              Journal
            </a>
          </li>

          <li>
            <a href="#" className="hover:text-white transition-colors">
              Case Studies
            </a>
          </li>

          <li>
            <a href="#" className="hover:text-white transition-colors">
              Careers
            </a>
          </li>

          <li>
            <a href="#" className="hover:text-white transition-colors">
              Client Portal
            </a>
          </li>
        </ul>
      </div>

      {/* LEGAL */}
      <div className="md:col-span-3">
        <h4 className="font-black uppercase italic tracking-widest text-white/80 mb-8">
          Legal & Privacy
        </h4>

        <ul className="space-y-4 text-gray-400 text-sm font-medium">
          <li>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </li>

          <li>
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
          </li>

          <li>
            <a href="#" className="hover:text-white transition-colors">
              Cookie Declaration
            </a>
          </li>

          <li>
            <a href="#" className="hover:text-white transition-colors">
              Security Standards
            </a>
          </li>
        </ul>
      </div>
    </div>

    {/* BOTTOM */}
    <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono tracking-[0.2em] text-gray-600">
      <p>
        © {new Date().getFullYear()} CODE SPARK STUDIOS // 
      </p>

      <p className="flex items-center gap-2">
         <Code size={14} className="text-cyan-500" /> IN INDIA
      </p>
    </div>
  </div>
</footer>

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

export default Home;