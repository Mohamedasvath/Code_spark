import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  LayoutGrid,
  ArrowRight
} from 'lucide-react';

const projects = [
  {
    id: "01",
    title: "Workshop Management System",
    desc: "Complete business automation platform for workshop operations, repair tracking, technician management, service records, billing, and smart reporting dashboards.",
    tech: "MERN Stack",
    image:
      "https://cdn11.bigcommerce.com/s-49q8ybhro3/images/stencil/1920w/carousel/8/banner01__39751.jpg?c=1",
    live: "https://srw-shop.vercel.app/",
  },
  {
    id: "02",
    title: "Taxi Booking Landing Page",
    desc: "High-converting premium landing page for taxi and travel services with strong UI/UX, booking-focused design, trust-building sections, and mobile-first performance.",
    tech: "React.js + Framer Motion",
    image:
      "https://img.freepik.com/free-photo/yellow-black-sign-taxi-placed-top-car-night_181624-10624.jpg?semt=ais_hybrid&w=740&q=80",
    live: "https://sana-travels.vercel.app/",
  },
  {
    id: "03",
    title: "Deenyat Islamic Store",
    desc: "Modern ecommerce experience for Islamic products with clean shopping flow, elegant product showcase, smooth customer journey, and conversion-focused interface.",
    tech: "React + Ecommerce UI",
    image:
      "https://play-lh.googleusercontent.com/Pc8E6G3wSHR5DyxSOYDuzGOgj254RLqpyBJAX297bLjjRYs2RmVMxa022fYJ-N8qrA",
    live: "https://deenyat.vercel.app/",
  },
  {
    id: "04",
    title: "Cake Shop Platform",
    desc: "Premium bakery website with product catalog, secure login system, elegant UI design, customer order flow, and business-focused digital storefront experience.",
    tech: "Node.js + JWT Security",
    image:
      "https://img.freepik.com/free-vector/cake-factory-landing-page-template_23-2148861830.jpg?semt=ais_hybrid&w=740&q=80",
    live: "https://cake-io.vercel.app/login",
  },
  {
    id: "05",
    title: "Islamic Hub Platform",
    desc: "Community-focused Islamic platform with educational content, premium design system, spiritual resources, and smooth modern browsing experience for users.",
    tech: "React + Full Stack",
    image:
      "https://i.pinimg.com/280x280_RS/91/70/83/91708398c55c7e41609565fa436064ae.jpg",
    live: "https://islamic-hub07.vercel.app/",
  },
  {
    id: "06",
    title: "Home Medico Website",
    desc: "Professional healthcare business platform for medical services with trust-driven design, service management, product visibility, and modern patient interaction flow.",
    tech: "Business Web Platform",
    image:
      "https://s3-symbol-logo.tradingview.com/medico-remedies-ltd--600.png",
    live: "https://chennai-home-medico.vercel.app/",
  },
];

const PortfolioSection = () => {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 2, projects.length));
  };

  return (
    <section className="bg-[#050505] py-20 md:py-32 px-6 lg:px-16 text-white border-t border-white/5">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 border-b border-white/10 pb-10 gap-8">
          <div className="space-y-4">
            <h2 className="text-5xl sm:text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">
              Projects<span className="text-blue-600">.</span>
            </h2>

            <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.35em]">
              Selected engineering & digital solutions
            </p>
          </div>

          {/* Gradient Portfolio Button */}
          <a
            href="https://portfolio-dusky-psi-79.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-full p-[1px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
          >
            <div className="flex items-center gap-3 bg-black px-7 py-4 rounded-full group-hover:bg-transparent transition-all duration-500">
              <span className="text-[11px] font-black uppercase tracking-[0.25em]">
                Full Portfolio
              </span>
              <LayoutGrid
                size={15}
                className="group-hover:rotate-90 transition-transform duration-300"
              />
            </div>
          </a>
        </div>

        {/* Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-16 md:gap-y-24">
          {projects.slice(0, visibleCount).map((project, idx) => (
            <motion.a
              key={project.id}
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="group cursor-pointer block"
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden bg-[#111] mb-8 border border-white/5 rounded-2xl group-hover:border-blue-500/30 transition-all duration-500">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-[1.05] transition-all duration-1000"
                />

                <div className="absolute top-6 right-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <ArrowUpRight size={22} />
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
              </div>

              {/* Details */}
              <div className="px-2">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-mono text-blue-500 font-black uppercase tracking-[0.2em]">
                    {project.tech}
                  </span>

                  <div className="w-1 h-1 bg-white/20 rounded-full" />

                  <span className="text-[10px] font-mono text-gray-700 italic">
                    /{project.id}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black uppercase italic tracking-tight group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-500 text-sm max-w-md leading-relaxed mt-2">
                  {project.desc}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Show More Button */}
        {visibleCount < projects.length && (
          <div className="mt-20 text-center">
            <button
              onClick={handleShowMore}
              className="inline-flex items-center gap-4 px-8 py-4 rounded-full border border-white/10 hover:border-blue-500 text-white hover:text-blue-400 text-[11px] font-black uppercase tracking-[0.35em] transition-all group"
            >
              Show More
              <ArrowRight
                size={16}
                className="group-hover:translate-x-2 transition-transform"
              />
            </button>
          </div>
        )}

        {/* Final Portfolio CTA */}
        <div className="mt-24 md:mt-32 text-center border-t border-white/5 pt-16">
          <a
            href="https://portfolio-dusky-psi-79.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 px-10 py-5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white font-black uppercase tracking-[0.3em] hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(59,130,246,0.25)]"
          >
           View Full Portfolio
            <ArrowRight size={18} />
          </a>
        </div>

      </div>
    </section>
  );
};

export default PortfolioSection;