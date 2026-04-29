import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Services from "../pages/Services";
import Portfolio from "../pages/Portfolio";
import Contact from "../pages/Contact";
import Aboutme from "../pages/Aboutme";

export default function AppRouter() {

  return (

    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/about" element={<Aboutme />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />

    </Routes>

  );

}