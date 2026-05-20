import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Mail, Phone, MapPin, Check, Sparkles, MessageSquare, ArrowUpRight } from "lucide-react";
import { BookingFormInput } from "../types";

export default function ContactView() {
  const [formData, setFormData] = useState<BookingFormInput>({
    name: "",
    companyName: "",
    email: "",
    phoneNumber: "",
    serviceNeeded: "Photography",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const servicesOption = [
    "Event Photography",
    "Portrait Sessions",
    "Product & Commercial Photography",
    "Wedding Photography",
    "Corporate Video Production",
    "Documentary Filmmaking",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage("Please complete all requested primary fields (Name, Email, Message).");
      return;
    }

    setIsSubmitting(true);

    // Simulate luxury API transmit
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        companyName: "",
        email: "",
        phoneNumber: "",
        serviceNeeded: "Photography",
        message: "",
      });
    }, 1800);
  };

  const handleWhatsAppClick = () => {
    const encodedText = encodeURIComponent(
      `Hello Brain Works Studio Africa, I would like to inquire about booking a session for '${formData.serviceNeeded}' services.`
    );
    window.open(`https://wa.me/233242403450?text=${encodedText}`, "_blank");
  };

  return (
    <div id="contact-view-container" className="pt-28 pb-24 relative overflow-hidden">
      {/* Accent lighting */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-gold/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/10 w-96 h-96 bg-brand-bronze/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* UPPER HEADER */}
        <div className="space-y-4 mb-20 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-850 px-3 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
            <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-300">
              Initiate Booking
            </span>
          </div>
          <h1 className="font-display font-light text-4xl md:text-6xl tracking-tight text-zinc-100 uppercase">
            ENGAGE <span className="font-serif italic text-brand-gold">Consultation</span>
          </h1>
          <p className="text-zinc-500 font-light text-sm md:text-base max-w-xl">
            Register your project specifications inside our encrypted repository. A creative agent will prioritize your case indices within 24 hours.
          </p>
        </div>

        {/* CONTRAST GRID SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* LEFT COLUMN: CONTACT DETAILS & WHATSAPP ROW */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-zinc-400">
                Liaison coordinates
              </span>
              <h2 className="font-display font-light text-2xl md:text-3xl text-zinc-100 uppercase tracking-tight">
                Direct Channels of communication
              </h2>
            </div>

            <div className="space-y-6">
              {/* Email channel */}
              <div className="flex gap-4 p-6 bg-[#070707] border border-zinc-900 rounded-lg group hover:border-brand-gold/25 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-zinc-950 flex items-center justify-center border border-zinc-805 text-zinc-400 group-hover:text-brand-gold transition-colors shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest font-mono text-zinc-500">
                    Transmission Office
                  </span>
                  <a href="mailto:brainworksstudio2@gmail.com" className="block text-zinc-200 hover:text-brand-gold text-sm font-medium transition-colors">
                    brainworksstudio2@gmail.com
                  </a>
                </div>
              </div>

              {/* Direct line */}
              <div className="flex gap-4 p-6 bg-[#070707] border border-zinc-900 rounded-lg group hover:border-brand-gold/25 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-zinc-950 flex items-center justify-center border border-zinc-805 text-zinc-400 group-hover:text-brand-gold transition-colors shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest font-mono text-zinc-500">
                    Live Operator
                  </span>
                  <a href="tel:+233242403450" className="block text-zinc-200 hover:text-brand-gold text-sm font-medium transition-colors">
                    +233.242.403.450
                  </a>
                </div>
              </div>

              {/* Accra Lapaz coordinate */}
              <div className="flex gap-4 p-6 bg-[#070707] border border-zinc-900 rounded-lg group hover:border-brand-gold/25 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-zinc-950 flex items-center justify-center border border-zinc-805 text-zinc-400 group-hover:text-brand-gold transition-colors shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest font-mono text-zinc-500">
                    Accra Headquarters
                  </span>
                  <address className="not-italic text-sm text-zinc-400 font-sans leading-normal">
                    <span className="text-zinc-200 font-medium">Lapaz Commercial Center</span>
                    <p className="text-xs text-zinc-500 mt-1">Accra, Ghana (We travel to your location)</p>
                  </address>
                </div>
              </div>
            </div>

            {/* INSTANT WHATSAPP DIRECT ACTION */}
            <div className="p-8 rounded-xl bg-gradient-to-tr from-[#050510] to-[#0d0d0d] border border-zinc-900 space-y-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#25D366]" />
                <h3 className="font-display font-semibold text-xs uppercase tracking-widest text-[#25D366]">
                  Instant WhatsApp channel
                </h3>
              </div>
              
              <p className="text-xs text-zinc-400 leading-relaxed font-sans font-light">
                Prefer immediate chat coordinates? Communicate directly with a production coordinator on WhatsApp for speedier booking confirmation feedback and schedule validation.
              </p>

              <button
                id="contact-whatsapp-btn"
                onClick={handleWhatsAppClick}
                className="w-full justify-center flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-[#050505] font-display font-semibold uppercase tracking-widest text-xs py-3.5 px-6 rounded-lg transition-all duration-300 cursor-pointer shadow-lg shadow-[#25D366]/5"
              >
                Inquire on WhatsApp
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: CONTACT FORM WITH ANIMATIONS */}
          <div className="lg:col-span-7">
            <div className="bg-[#070707] border border-zinc-900 rounded-2xl p-8 md:p-12 shadow-2xl relative">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="consultation-form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-8"
                  >
                    <div className="space-y-2">
                      <h3 className="text-lg font-display font-semibold text-zinc-200 uppercase tracking-widest">
                        Project Registration
                      </h3>
                      <p className="text-xs text-zinc-500">
                        Please provide all core details to help us parse the cinematic style required.
                      </p>
                    </div>

                    {errorMessage && (
                      <div className="p-4 bg-red-950/40 border border-red-900 rounded-lg text-xs text-red-400 font-mono">
                        {errorMessage}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name input */}
                      <div className="space-y-2">
                        <label htmlFor="reg-name" className="block text-[10px] uppercase tracking-widest font-mono text-zinc-500">
                          Full Name *
                        </label>
                        <input
                          id="reg-name"
                          type="text"
                          name="name"
                          placeholder="Lord/Lady Sterling"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full bg-[#030303] border border-zinc-850 px-4 py-3 rounded text-zinc-200 text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/20"
                          required
                        />
                      </div>

                      {/* Company Name */}
                      <div className="space-y-2">
                        <label htmlFor="reg-company" className="block text-[10px] uppercase tracking-widest font-mono text-zinc-500">
                          Company / Event Name
                        </label>
                        <input
                          id="reg-company"
                          type="text"
                          name="companyName"
                          placeholder="Event, Wedding, or Brand Name"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          className="w-full bg-[#030303] border border-zinc-850 px-4 py-3 rounded text-zinc-200 text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/20"
                        />
                      </div>

                      {/* Email input */}
                      <div className="space-y-2">
                        <label htmlFor="reg-email" className="block text-[10px] uppercase tracking-widest font-mono text-zinc-500">
                          Email Address *
                        </label>
                        <input
                          id="reg-email"
                          type="email"
                          name="email"
                          placeholder="excellent@domain.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-[#030303] border border-zinc-850 px-4 py-3 rounded text-zinc-200 text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/20"
                          required
                        />
                      </div>

                      {/* Phone number */}
                      <div className="space-y-2">
                        <label htmlFor="reg-phone" className="block text-[10px] uppercase tracking-widest font-mono text-zinc-500">
                          Phone Number
                        </label>
                        <input
                          id="reg-phone"
                          type="tel"
                          name="phoneNumber"
                          placeholder="+233 24 240 3450"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          className="w-full bg-[#030303] border border-zinc-850 px-4 py-3 rounded text-zinc-200 text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/20"
                        />
                      </div>
                    </div>

                    {/* Service selection drop downs */}
                    <div className="space-y-2 block">
                      <label htmlFor="reg-service" className="block text-[10px] uppercase tracking-widest font-mono text-zinc-500">
                        Service Coordinate Needed
                      </label>
                      <select
                        id="reg-service"
                        name="serviceNeeded"
                        value={formData.serviceNeeded}
                        onChange={handleInputChange}
                        className="w-full bg-[#030303] border border-zinc-850 px-4 py-3.5 rounded text-zinc-200 text-sm focus:outline-none focus:border-brand-gold cursor-pointer font-mono"
                      >
                        {servicesOption.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#050505]">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message Area */}
                    <div className="space-y-2">
                      <label htmlFor="reg-message" className="block text-[10px] uppercase tracking-widest font-mono text-zinc-500">
                        Project briefing details *
                      </label>
                      <textarea
                        id="reg-message"
                        name="message"
                        rows={5}
                        placeholder="Please elaborate on your project timelines, location coordinate restrictions, and aesthetic priorities..."
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full bg-[#030303] border border-zinc-850 px-4 py-3 rounded text-zinc-200 text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/20"
                        required
                      ></textarea>
                    </div>

                    {/* Submit BUTTON */}
                    <button
                      id="reg-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-brand-gold to-brand-bronze text-[#050505] font-display font-semibold uppercase tracking-widest text-xs py-4 px-6 rounded transition-all duration-300 shadow-xl shadow-brand-gold/10 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 rounded-full border-2 border-[#050505] border-t-transparent animate-spin"></div>
                          Verifying logs...
                        </>
                      ) : (
                        <>
                          Transmit inquiry
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="consultation-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16 space-y-6 flex flex-col items-center justify-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold">
                      <Check className="w-8 h-8 animate-bounce" />
                    </div>

                    <div className="space-y-3">
                      <span className="text-xs font-mono uppercase tracking-[0.3em] text-brand-gold">
                        LOG INDEX #84962 CREATED
                      </span>
                      <h3 className="font-display font-light text-2xl uppercase text-zinc-100 italic">
                        Inquiry Received
                      </h3>
                      <p className="text-zinc-400 font-sans text-xs md:text-sm max-w-sm mx-auto leading-relaxed font-light">
                        Your brand indices have been registered successfully into our core ledger. A creative consultant has been flagged and will respond within 24 hours.
                      </p>
                    </div>

                    <button
                      id="submitted-form-reset"
                      onClick={() => setIsSubmitted(false)}
                      className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono underline hover:text-brand-gold transition-colors"
                    >
                      File another ledger entry
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
