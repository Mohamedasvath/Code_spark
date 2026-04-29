import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* 🔥 FIX 1: freeze scroll properly without layout jump */
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      const scrollY = document.body.style.top;

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        scrolled
          ? "h-[64px] bg-black/90 backdrop-blur-xl border-b border-white/5"
          : "h-[72px] bg-black"
      }`}
    >
      <div className="max-w-[1300px] mx-auto px-6 h-full flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" onClick={() => setIsOpen(false)}>
          <div className="text-lg font-black uppercase text-white">
            Code_<span className="text-indigo-500">Spark</span>
          </div>
        </Link>

        {/* DESKTOP */}
        <div className="hidden lg:flex gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-4 py-1 text-xs uppercase font-bold rounded-full ${
                location.pathname === link.path
                  ? "bg-indigo-600 text-white"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden p-2 text-white bg-white/5 rounded-full border border-white/10"
        >
          <HiMenuAlt3 size={22} />
        </button>
      </div>

      {/* MOBILE MENU FIXED */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 z-[110]"
            />

            {/* DRAWER - SAFE 100dvh FIX */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="fixed top-0 left-0 w-[82%] max-w-sm bg-[#070707] z-[120] border-r border-white/10"
              style={{
                height: "100dvh",   // 🔥 FIX for mobile viewport jump
              }}
            >
              <div className="relative h-full p-6 flex flex-col">

                {/* CLOSE */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-2 bg-white/5 rounded-full border border-white/10"
                >
                  <HiX size={22} />
                </button>

                {/* LINKS */}
                <div className="mt-16 flex flex-col gap-6">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`text-xl font-bold uppercase ${
                          location.pathname === link.path
                            ? "text-indigo-400"
                            : "text-white"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* CTA BOTTOM */}
                <a
                  href="tel:9344790389"
                  className="mt-auto py-3 text-center bg-indigo-600 text-white font-bold uppercase rounded-full"
                >
                  Let’s Connect
                </a>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;