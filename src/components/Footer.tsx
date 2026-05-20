import { Camera, Mail, Phone, MapPin, ArrowUp } from "lucide-react";

interface FooterProps {
  setTab: (tab: string) => void;
}

export default function Footer({ setTab }: FooterProps) {
  const handleNavClick = (tabId: string) => {
    setTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer" className="bg-[#030303] border-t border-zinc-900 pt-20 pb-8 relative overflow-hidden">
      {/* Decorative ambient background glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-[140px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-gradient-to-tr from-brand-gold to-zinc-900 border border-brand-gold/20 flex items-center justify-center">
                <Camera className="w-4 h-4 text-zinc-100" />
              </div>
              <div>
                <span className="font-display font-bold text-lg tracking-widest text-zinc-100 block">
                  BWSA
                </span>
                <span className="text-[8px] uppercase tracking-[0.2em] text-brand-gold block font-mono">
                  STUDIO AFRICA
                </span>
              </div>
            </div>
            
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              We craft timeless visuals with passion and creativity. Professional photography, videography, and storytelling across Ghana and the African continent.
            </p>
          </div>

          {/* Directory Navigation Links */}
          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-[0.2em] font-mono text-zinc-400">Directory</h4>
            <ul className="space-y-3">
              {[
                { id: "home", name: "Home Dashboard" },
                { id: "portfolio", name: "Premium Portfolio" },
                { id: "about", name: "Brand & Team Story" },
                { id: "contact", name: "Inquire / Book Consultation" }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    id={`footer-nav-${link.id}`}
                    onClick={() => handleNavClick(link.id)}
                    className="text-zinc-400 hover:text-brand-gold text-sm tracking-wide transition-colors duration-200 cursor-pointer text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
              <li>
                <a
                  id="footer-nav-main-site"
                  href="https://brainworksstudioafrica.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-gold hover:text-zinc-100 text-sm tracking-wide transition-colors duration-200 block"
                >
                  Visit Main Website ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-[0.2em] font-mono text-zinc-400">Inquiries</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-brand-gold mt-1 shrink-0" />
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest font-mono">General & Bookings</p>
                  <a href="mailto:brainworksstudio2@gmail.com" className="text-zinc-300 hover:text-brand-gold text-sm transition-colors">
                    brainworksstudio2@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-brand-gold mt-1 shrink-0" />
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest font-mono">Direct Line</p>
                  <a href="tel:+233242403450" className="text-zinc-300 hover:text-brand-gold text-sm transition-colors">
                    +233.242.403.450
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Global Offices */}
          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-[0.2em] font-mono text-zinc-400">Locations</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li className="flex gap-2.5">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <span className="text-zinc-300 font-medium font-display">Accra, Lapaz</span>
                  <p className="text-xs text-zinc-500 mt-1">Main Ateliers & Creative Space, Ghana</p>
                </div>
              </li>
              <li className="flex gap-2.5">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <span className="text-zinc-300 font-medium">Global Travel</span>
                  <p className="text-xs text-zinc-500 mt-1">We travel to your production location</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-[1px] bg-zinc-900 w-full mb-8"></div>

        {/* Bottom copyright, availability state & back to top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-6 sm:gap-10">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-medium font-mono">
                Available for Q4 Bookings
              </span>
            </div>

            <div className="text-xs text-zinc-600 uppercase tracking-widest font-mono">
              © {currentYear} BRAIN WORKS STUDIO AFRICA. ALL RIGHTS RESERVED.
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-brand-gold transition-colors text-xs uppercase tracking-widest">
              Instagram
            </a>
            <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-brand-gold transition-colors text-xs uppercase tracking-widest">
              Vimeo
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-brand-gold transition-colors text-xs uppercase tracking-widest">
              LinkedIn
            </a>
            
            <button
              id="back-to-top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center justify-center w-8 h-8 rounded border border-zinc-900 hover:border-brand-gold hover:text-brand-gold text-zinc-500 transition-all duration-300 cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
