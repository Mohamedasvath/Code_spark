import { motion } from "framer-motion";

const AboutSection = () => {
  const techStack = [
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Tailwind CSS",
    "Framer Motion",
    "REST API Development",
    "Vercel Deployment",
    "Git & GitHub",
  ];

  const stats = [
    {
      number: "20+",
      title: "Projects Delivered",
      desc: "Business websites, dashboards & automation platforms",
    },
    {
      number: "100%",
      title: "Responsive Design",
      desc: "Perfect experience across mobile, tablet and desktop",
    },
    {
      number: "24/7",
      title: "Support & Updates",
      desc: "Reliable maintenance and long-term improvement support",
    },
    {
      number: "MERN",
      title: "Core Expertise",
      desc: "Modern scalable full stack development solutions",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section className="bg-black text-white py-24 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* TOP HEADER */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-indigo-500 font-black tracking-[0.4em] uppercase text-xs mb-4">
            About Code Spark
          </p>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black italic uppercase leading-[0.95] tracking-tight">
            Building Premium
            <br />
            <span className="text-indigo-500 not-italic">
              Digital Experiences
            </span>
          </h2>

          <p className="text-neutral-400 mt-6 max-w-3xl mx-auto leading-relaxed">
            We create high-performance websites, business systems, dashboards,
            and digital platforms that help brands grow faster, look stronger,
            and convert better.
          </p>
        </motion.div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* LEFT CONTENT */}
          <div className="space-y-8">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="space-y-5 text-neutral-400 leading-relaxed"
            >
              <p>
                Hi, I'm{" "}
                <span className="text-blue-500 font-bold">
                  Mohamed Asvath
                </span>{" "}
                — a passionate Full Stack Web Developer focused on building
                modern, scalable, and premium web applications using the{" "}
                <span className="text-indigo-400 font-semibold">
                  MERN Stack
                </span>
                .
              </p>

              <p>
                My work combines strong backend architecture, smooth frontend
                interactions, and business-focused solutions to create digital
                products that are not only beautiful but also powerful.
              </p>

              <p>
                From workshop management systems to admin dashboards, landing
                pages, ecommerce platforms, and automation systems — every
                project is built with performance, security, and long-term
                scalability in mind.
              </p>
            </motion.div>

            {/* FEATURE BLOCK */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="border border-white/10 rounded-3xl p-8 bg-white/[0.02]"
            >
              <h3 className="text-2xl font-black uppercase italic mb-4">
                What Makes Us Different
              </h3>

              <div className="space-y-4 text-neutral-400">
                <p>• Premium UI/UX focused development</p>
                <p>• Fast-loading & SEO-friendly architecture</p>
                <p>• Secure backend systems with scalable structure</p>
                <p>• Business-first solutions, not just beautiful design</p>
              </div>
            </motion.div>

            {/* BUTTON */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => (window.location.href = "/contact")}
                className="group px-8 py-4 rounded-full bg-white text-black font-black uppercase tracking-[0.2em] text-xs hover:bg-indigo-600 hover:text-white transition-all duration-300"
              >
                Start a Project
              </button>
            </motion.div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="space-y-8">
            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {stats.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border border-white/10 rounded-3xl p-6 bg-white/[0.02] hover:border-indigo-500/40 transition-all"
                >
                  <h3 className="text-3xl font-black text-indigo-500 mb-2">
                    {item.number}
                  </h3>

                  <h4 className="font-bold uppercase text-sm mb-2">
                    {item.title}
                  </h4>

                  <p className="text-sm text-neutral-500 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* TECH STACK */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="border border-white/10 rounded-3xl p-8 bg-white/[0.02]"
            >
              <h3 className="text-2xl font-black uppercase italic mb-6">
                Technology Stack
              </h3>

              <div className="flex flex-wrap gap-3">
                {techStack.map((tech, index) => (
                  <motion.span
                    key={index}
                    variants={itemVariants}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold tracking-widest uppercase text-neutral-300 hover:border-indigo-500 transition-all"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* FINAL TEXT */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
              className="border-l-2 border-indigo-500/30 pl-6 text-neutral-400 leading-relaxed"
            >
              <p>
                I believe every business deserves a premium digital presence.
                Great websites are not just designed — they are engineered for
                trust, growth, and real business impact.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;