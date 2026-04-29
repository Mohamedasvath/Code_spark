import { useState } from "react";
import api from "../../api/axios";
import { motion, AnimatePresence } from "framer-motion";
import Notification from "../Canvas3D/Notification";

export default function ContactPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        budget: "",
        message: ""
    });

    const [errors, setErrors] = useState({});
    const [notification, setNotification] = useState(null);
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        let newErrors = {};

        if (!form.name.trim()) newErrors.name = "Name is required";
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(form.email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (form.phone && !/^\d+$/.test(form.phone)) {
            newErrors.phone = "Phone must contain only numbers";
        }

        if (form.budget && isNaN(Number(form.budget))) {
            newErrors.budget = "Budget must be a number";
        }

        if (!form.message.trim()) newErrors.message = "Message cannot be empty";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);

        try {
            await api.post("/api/contact", {
                ...form,
                budget: form.budget ? Number(form.budget) : undefined
            });

            setNotification({
                type: "success",
                message: "Your message has been sent successfully"
            });

            setForm({ name: "", email: "", phone: "", projectType: "", budget: "", message: "" });
            setErrors({});
        } catch (err) {
            setNotification({
                type: "error",
                message: "Something went wrong. Please try again"
            });
        } finally {
            setLoading(false);
            setTimeout(() => setNotification(null), 4000);
        }
    };

    return (
        // Added flex-col and overflow-hidden to prevent double scrollbars
        <div className="min-h-screen w-full bg-black flex flex-col items-center justify-start md:justify-center p-6 pt-32 pb-16 overflow-hidden">
            
            {/* Notification */}
            <AnimatePresence>
                {notification && (
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        className="fixed top-24 right-5 z-[200]"
                    >
                        <Notification
                            type={notification.type}
                            message={notification.message}
                            isVisible={!!notification}
                            onClose={() => setNotification(null)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative w-full max-w-4xl"
            >
                {/* Background Blurs */}
                <div className="absolute -top-10 -left-10 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative z-10 bg-white/[0.02] backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl">
                    <div className="mb-8 text-center">
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic">
                            CONTACT <span className="text-indigo-500 not-italic">CODE SPARK</span>
                        </h1>
                        <p className="text-neutral-500 mt-3 font-medium tracking-widest text-xs uppercase">
                            Let's Architect Your Digital Future
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col">
                            <label className="text-[10px] text-indigo-400 font-black uppercase tracking-widest ml-1 mb-1">Full Name</label>
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className={`w-full p-4 rounded-xl bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} text-white focus:border-indigo-500 outline-none transition-all`}
                            />
                            {errors.name && <span className="text-red-400 text-[10px] mt-1 ml-1">{errors.name}</span>}
                        </div>

                        <div className="flex flex-col">
                            <label className="text-[10px] text-indigo-400 font-black uppercase tracking-widest ml-1 mb-1">Email Address</label>
                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                className={`w-full p-4 rounded-xl bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} text-white focus:border-indigo-500 outline-none transition-all`}
                            />
                            {errors.email && <span className="text-red-400 text-[10px] mt-1 ml-1">{errors.email}</span>}
                        </div>

                        <div className="flex flex-col">
                            <label className="text-[10px] text-indigo-400 font-black uppercase tracking-widest ml-1 mb-1">Phone Number</label>
                            <input
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="+91 00000 00000"
                                className={`w-full p-4 rounded-xl bg-white/5 border ${errors.phone ? 'border-red-500' : 'border-white/10'} text-white focus:border-indigo-500 outline-none transition-all`}
                            />
                            {errors.phone && <span className="text-red-400 text-[10px] mt-1 ml-1">{errors.phone}</span>}
                        </div>

                        <div className="flex flex-col">
                            <label className="text-[10px] text-indigo-400 font-black uppercase tracking-widest ml-1 mb-1">Project Type</label>
                            <input
                                name="projectType"
                                value={form.projectType}
                                onChange={handleChange}
                                placeholder="Web / App / SaaS"
                                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-indigo-500 outline-none transition-all"
                            />
                        </div>

                        <div className="md:col-span-2 flex flex-col">
                            <label className="text-[10px] text-indigo-400 font-black uppercase tracking-widest ml-1 mb-1">Estimated Budget ($)</label>
                            <input
                                type="number"
                                name="budget"
                                value={form.budget}
                                onChange={handleChange}
                                placeholder="2000"
                                className={`w-full p-4 rounded-xl bg-white/5 border ${errors.budget ? 'border-red-500' : 'border-white/10'} text-white focus:border-indigo-500 outline-none transition-all`}
                            />
                            {errors.budget && <span className="text-red-400 text-[10px] mt-1 ml-1">{errors.budget}</span>}
                        </div>

                        <div className="md:col-span-2 flex flex-col">
                            <label className="text-[10px] text-indigo-400 font-black uppercase tracking-widest ml-1 mb-1">Message</label>
                            <textarea
                                name="message"
                                rows="4"
                                value={form.message}
                                onChange={handleChange}
                                placeholder="Describe your vision..."
                                className={`w-full p-4 rounded-xl bg-white/5 border ${errors.message ? 'border-red-500' : 'border-white/10'} text-white focus:border-indigo-500 outline-none resize-none transition-all`}
                            />
                            {errors.message && <span className="text-red-400 text-[10px] mt-1 ml-1">{errors.message}</span>}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            disabled={loading}
                            type="submit"
                            className={`md:col-span-2 w-full mt-4 p-4 rounded-full font-black uppercase tracking-[0.3em] text-[11px] transition-all ${
                                loading
                                    ? "bg-neutral-800 text-neutral-500 cursor-wait"
                                    : "bg-white text-black hover:bg-indigo-600 hover:text-white"
                            }`}
                        >
                            {loading ? "Transmitting..." : "Send Protocol"}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}