import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Phone, Mail, ArrowRight } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  
  // Parallax Effect Logic
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section 
      id="contact" 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-40 px-6"
    >
      {/* MODERN BACKGROUND WITH PARALLAX */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
          style={{ 
            backgroundImage: `url('YOUR_HIGH_RES_IMAGE_URL_HERE')`, // Replace with a dark, high-res texture/abstract image
          }}
        />
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 max-w-5xl mx-auto text-center"
      >
        <img src={LOGO_URL} alt="Logo" className="w-16 mx-auto mb-12 opacity-40 mix-blend-screen" />

        <h2 className="text-6xl md:text-[10rem] font-black italic uppercase tracking-tighter leading-[0.85] mb-16 text-white">
          Ready to <br /> 
          <span className="text-transparent border-text-cyan stroke-current stroke-1 bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            Spark?
          </span>
        </h2>

        {/* INFO CARDS */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-20">
          <a href="tel:9344790389" className="group flex flex-col items-center gap-4">
            <div className="p-4 rounded-full border border-white/10 group-hover:border-cyan-500 transition-colors">
              <Phone className="text-cyan-500" size={24} />
            </div>
            <span className="text-white/60 font-medium tracking-widest uppercase text-xs">Voice Call</span>
            <span className="text-2xl font-bold">+91 93447 90389</span>
          </a>

          <div className="h-px w-12 bg-white/10 hidden md:block" />

          <a href="mailto:mohamedasvath01@gmail.com" className="group flex flex-col items-center gap-4">
            <div className="p-4 rounded-full border border-white/10 group-hover:border-cyan-500 transition-colors">
              <Mail className="text-cyan-500" size={24} />
            </div>
            <span className="text-white/60 font-medium tracking-widest uppercase text-xs">Email Us</span>
            <span className="text-2xl font-bold">mohamedasvath01@gmail.com</span>
          </a>
        </div>

        {/* MAIN CTA BUTTONS */}
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          <a
            href="tel:9344790389"
            className="group relative px-16 py-8 bg-cyan-500 text-black font-black uppercase italic tracking-widest text-xl overflow-hidden transition-all hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Call Now</span>
            <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
          </a>

          <button
            onClick={() => {
                document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                // OR window.location.href = "/contact-page"
            }}
            className="group flex items-center gap-4 px-12 py-8 border-b-2 border-white/20 hover:border-cyan-500 transition-all text-white font-black uppercase italic tracking-widest text-xl"
          >
            Direct Contact
            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;