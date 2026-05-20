import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, Menu, X, PhoneCall, ExternalLink } from "lucide-react";

interface NavbarProps {
  currentTab: string;
  setTab: (tab: string) => void;
}

export default function Navbar({ currentTab, setTab }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "portfolio", label: "Portfolio" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (tabId: string) => {
    setTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header
        id="navbar-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          isScrolled
            ? "bg-[#050505]/80 backdrop-blur-xl border-zinc-900/50 py-4 shadow-2xl"
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo Brand */}
          <button
            id="nav-logo-btn"
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-3 group cursor-pointer text-left"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-tr from-brand-gold to-zinc-900 overflow-hidden border border-brand-gold/30">
              <Camera className="w-5 h-5 text-zinc-100 group-hover:rotate-12 transition-transform duration-500" />
              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-brand-gold"></div>
            </div>
            <div>
              <span className="font-display font-bold text-xl tracking-widest text-zinc-100 block">
                BWSA
              </span>
              <span className="text-[8px] uppercase tracking-[0.2em] text-brand-gold font-light block">
                Brain Works Studio
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm tracking-widest uppercase transition-colors duration-300 relative py-1 cursor-pointer font-display font-medium ${
                  currentTab === item.id
                    ? "text-brand-gold"
                    : "text-zinc-400 hover:text-zinc-100"
                }`}
              >
                {item.label}
                {currentTab === item.id && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-gold"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Call To Action Buttons (Desktop Only) */}
          <div className="hidden md:flex items-center gap-3">
            <a
              id="nav-cta-website"
              href="https://brainworksstudioafrica.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 border border-zinc-805 hover:border-zinc-700 bg-zinc-950/20 hover:bg-zinc-900/40 px-4 py-2 rounded-full text-[11px] uppercase tracking-widest text-zinc-300 transition-all duration-300 cursor-pointer font-display font-medium"
            >
              <span>Main Website</span>
              <ExternalLink className="w-3 h-3 text-zinc-500" />
            </a>

            <button
              id="nav-cta-book"
              onClick={() => handleNavClick("contact")}
              className="flex items-center gap-2 border border-brand-gold/30 hover:border-brand-gold bg-zinc-950/45 hover:bg-brand-gold/10 px-5 py-2 rounded-full text-xs uppercase tracking-widest text-brand-gold transition-all duration-300 hover:shadow-lg hover:shadow-brand-gold/5 cursor-pointer font-display font-semibold"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              Book a Shoot
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-burger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center p-2 text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer (Animations powered by standard Motion React) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-drawer-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#050505] pt-24 px-6 md:hidden flex flex-col justify-between pb-12 overflow-y-auto"
          >
            {/* Background elements */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex flex-col gap-6 mt-8 relative z-10">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-mono">
                  Navigation
                </p>
                <div className="h-[1px] bg-zinc-900 w-full"></div>
              </div>
              <ul className="flex flex-col gap-4">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <button
                      id={`mobile-nav-item-${item.id}`}
                      onClick={() => handleNavClick(item.id)}
                      className={`text-2xl font-display font-light uppercase tracking-wider block py-2 ${
                        currentTab === item.id ? "text-brand-gold font-normal" : "text-zinc-300"
                      }`}
                    >
                      {item.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 relative z-10">
              <a
                id="mobile-cta-website"
                href="https://brainworksstudioafrica.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900/40 py-3.5 px-6 rounded-lg text-xs font-display font-medium uppercase tracking-widest text-zinc-300 transition-all duration-300 cursor-pointer"
              >
                <span>Visit Main Website</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-550" />
              </a>

              <button
                id="mobile-cta-action"
                onClick={() => handleNavClick("contact")}
                className="w-full flex items-center justify-center gap-3 bg-[#C5A059] hover:bg-[#C5A059]/90 py-4 px-6 rounded-lg text-sm font-display font-semibold uppercase tracking-widest text-[#050505] transition-all duration-300"
              >
                <PhoneCall className="w-4 h-4" />
                Book a Shoot
              </button>

              <div className="text-center">
                <p className="text-[10px] text-zinc-600 uppercase tracking-widest leading-relaxed">
                  Brain Works Studio Africa © 2026
                </p>
                <p className="text-[9px] text-brand-gold/50 font-mono mt-1">
                  professional storytelling
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
