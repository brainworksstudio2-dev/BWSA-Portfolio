import { motion } from "motion/react";
import { Play, ArrowRight, Camera, Tv, Sparkles, Award, Layers, Quote, CheckCircle } from "lucide-react";
import { PortfolioItem, Testimonial } from "../types";
import portfolioItemsData from "../data/portfolio.json";

// Cast portfolio items
const portfolioItems = portfolioItemsData as PortfolioItem[];

interface HomeViewProps {
  setTab: (tab: string) => void;
  openLightboxWithIndex: (items: PortfolioItem[], index: number) => void;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Kofi Owusu",
    company: "Legacy Events Ghana",
    quote: "BWSA's team captures moments with breathtaking soul and emotional depth. Their coverage of our high-scale events became beautiful motion structures that we treasure forever.",
    rating: 5,
  },
  {
    id: "2",
    name: "Amaa Mensah",
    company: "Creative Lead, Studio Accra",
    quote: "Our cinematic campaign films were crafted with utmost professionalism. They possess standard global calibration right here in West Africa. Absolute recommendation!",
    rating: 5,
  },
  {
    id: "3",
    name: "Michael Asante",
    company: "Asante Capital Group",
    quote: "The corporate video documentary BWSA designed for our investor roadmap was visually stunning and highly polished. Unmatched work and premium timelines.",
    rating: 5,
  },
];

const services = [
  {
    icon: Camera,
    title: "Portrait Sessions & Fashion",
    desc: "Stunning images that freeze your most precious moments, high-concept portraits, and custom branding cards.",
    list: ["Studio Modeling", "Vibrant Lighting Design", "Color Retouching & Grading"],
  },
  {
    icon: Play,
    title: "Cinematic Videography & Films",
    desc: "Vivid, high-definition wedding reels, documentaries, and cinematic corporate scripts that bring stories to life.",
    list: ["Aerial Drone Footage", "Multi-cam Event Capture", "High-Fidelity Audio Setup"],
  },
  {
    icon: Award,
    title: "Wedding & Event Photography",
    desc: "Sorrow-free, romantic, and culturally rich visual preservation of weddings, engagements, and special assemblies.",
    list: ["Pre-Wedding Sessions", "Continuous Day-Of Capture", "Luxury Print Albums"],
  },
  {
    icon: Layers,
    title: "Commercial & Brand Campaigns",
    desc: "Exquisite commercial photography and short campaigns showcasing retail products, workspaces, and corporate leaders.",
    list: ["Product Headshots", "Social Media Rollouts", "Aesthetic Brand Promos"],
  },
];

export default function HomeView({ setTab, openLightboxWithIndex }: HomeViewProps) {
  // Get 3 interesting featured items
  const featuredItems = portfolioItems.slice(0, 3);

  return (
    <div id="home-view-container" className="pt-0">
      {/* LUXURY HERO BANNER */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Cinematic Backdrop Video/Image Layer with premium dark mask */}
        <div className="absolute inset-0 z-0 bg-[#020202]">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#050505] z-10"></div>
          
          {/* Ambient Video loop behind banner for a truly live breathing atmosphere */}
          <video
            src="https://assets.mixkit.co/videos/preview/mixkit-glamor-model-under-studio-lights-40073-large.mp4"
            autoPlay
            loop
            muted
            className="w-full h-full object-cover opacity-35 object-center select-none"
            playsInline
          />
        </div>

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-[35rem] h-[35rem] bg-brand-gold/10 rounded-full ambient-glow z-[2]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] bg-brand-bronze/10 rounded-full ambient-glow z-[2]"></div>

        {/* Content Frame */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center space-y-8 max-w-4xl mt-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-zinc-900/60 border border-brand-gold/20 px-4 py-1.5 rounded-full"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-mono text-zinc-300">
              High-End Visual Production House
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="font-display font-light text-4xl sm:text-6xl md:text-8xl tracking-tight leading-none text-zinc-100"
          >
            CREATING <br />
            <span className="font-serif italic text-brand-gold">Extraordinary</span> VISUALS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="text-sm md:text-lg text-zinc-400 max-w-2xl mx-auto font-sans font-light leading-relaxed tracking-wide"
          >
            Crafting professional photography, wedding films, corporate campaigns, and vivid storytelling across Ghana and Africa. We do not just capture light—we freeze emotion.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button
              id="hero-cta-portfolio"
              onClick={() => {
                setTab("portfolio");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gradient-to-r from-brand-gold to-brand-bronze hover:from-brand-gold/90 hover:to-brand-bronze/90 text-[#050505] font-display font-semibold uppercase tracking-widest text-xs px-8 py-4 rounded-full transition-all duration-300 shadow-xl shadow-brand-gold/10 cursor-pointer"
            >
              View Portfolio
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="hero-cta-contact"
              onClick={() => {
                setTab("contact");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 border border-zinc-700 hover:border-brand-gold hover:bg-zinc-950 bg-transparent text-zinc-300 hover:text-brand-gold font-display font-semibold uppercase tracking-widest text-xs px-8 py-4 rounded-full transition-all duration-300 cursor-pointer"
            >
              Book a Shoot
            </button>
          </motion.div>
        </div>

        {/* Dynamic down indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-zinc-500 font-mono text-[9px] uppercase tracking-[0.3em]">
          <span>Explore Essence</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-brand-gold/80 to-transparent"></div>
        </div>
      </section>

      {/* INTRODUCTION SECTION */}
      <section className="bg-[#050505] py-24 border-t border-zinc-900 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-mono block">
              OUR STATEMENT
            </span>
            <h2 className="font-display font-light text-3xl md:text-5xl tracking-tight text-zinc-100 leading-tight">
              An Elite Creative Partner for Narrative Visuals in Africa
            </h2>
            <div className="w-20 h-[1.5px] bg-brand-gold"></div>
          </div>
          <div>
            <p className="text-zinc-400 font-light leading-relaxed text-sm md:text-base space-y-4">
              Brain Works Studio Africa (BWSA) is a premier visual storytelling and professional production house in Ghana. We operate on a single layout rule: that exceptional moments and corporate missions require visuals of equal clarity and depth.
              <br />
              <br />
              With over a decade of dedicated campaigns, wedding coverage, portrait sessions, and documentary edits across Accra and the West African zone, our creative specialists and directors construct beautiful assets designed to preserve memories and foster raw brand authority.
            </p>
          </div>
        </div>
      </section>

      {/* REFINED SERVICES GRID */}
      <section className="bg-[#030303] py-24 border-t border-zinc-900 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section Header */}
          <div className="text-center space-y-4 mb-20">
            <span className="text-xs uppercase tracking-[0.3em] font-mono text-brand-gold">
              SERVICE PILLARS
            </span>
            <h2 className="font-display font-light text-3xl md:text-5xl tracking-tight text-zinc-100 uppercase">
              EXPERTISE OF HIGH DISTINCTION
            </h2>
            <p className="text-zinc-500 text-sm md:text-base max-w-xl mx-auto font-sans font-light">
              Meticulously executed professional disciplines covering cinema format shoots, brand identities, and commercial architecture photography.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const IconComp = service.icon;
              return (
                <div
                  key={index}
                  className="bg-[#070707] border border-zinc-900/80 p-8 rounded-xl space-y-6 hover:border-brand-gold/35 hover:bg-[#090909] transition-all duration-300 group shadow-lg"
                >
                  <div className="w-12 h-12 rounded-lg bg-zinc-950 flex items-center justify-center border border-zinc-800 text-zinc-400 group-hover:text-brand-gold group-hover:border-brand-gold/30 transition-colors duration-300">
                    <IconComp className="w-6 h-6" />
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-display font-semibold text-lg text-zinc-200 tracking-wide uppercase">
                      {service.title}
                    </h3>
                    <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-zinc-900">
                    {service.list.map((item, id) => (
                      <li key={id} className="flex items-center gap-2 text-zinc-400 font-mono text-[10px]">
                        <CheckCircle className="w-3 h-3 text-brand-gold shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED PORTFOLIO PREVIEW */}
      <section className="bg-[#050505] py-24 border-t border-zinc-900 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-16">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.3em] font-mono text-brand-gold block">
                CURATED COMPOSITIONS
              </span>
              <h2 className="font-display font-light text-3xl md:text-5xl tracking-tight text-zinc-100 uppercase">
                FEATURED WORK
              </h2>
            </div>

            <button
              id="featured-view-portfolio-nav"
              onClick={() => {
                setTab("portfolio");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-2 text-brand-gold hover:text-zinc-100 transition-colors duration-200 uppercase tracking-widest text-xs font-mono border-b border-brand-gold/30 hover:border-zinc-100 pb-1 cursor-pointer"
            >
              Explore Full Gallery
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => openLightboxWithIndex(featuredItems, idx)}
                className="group relative cursor-pointer overflow-hidden rounded-xl border border-zinc-900 bg-zinc-950 aspect-[4/5] shadow-2xl"
              >
                {/* Image backdrop with hover scale */}
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {item.type === "video" && (
                    <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 border border-brand-gold/30 flex items-center justify-center">
                      <Play className="w-3.5 h-3.5 text-brand-gold fill-current ml-0.5" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end space-y-2">
                  <span className="text-[9px] uppercase tracking-[0.25em] font-mono text-brand-gold">
                    {item.category}
                  </span>
                  <h3 className="font-display font-medium text-lg text-zinc-100 tracking-wide uppercase transition-colors group-hover:text-brand-gold">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 text-xs font-light line-clamp-2">
                    {item.description}
                  </p>
                  
                  <div className="pt-2 flex items-center gap-1.5 text-brand-gold group-hover:translate-x-1.5 transition-transform duration-300 text-[10px] uppercase font-mono font-bold">
                    <span>View Concept</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="bg-[#030303] py-24 border-t border-zinc-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/10 w-96 h-96 bg-brand-bronze/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center space-y-16">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] font-mono text-brand-gold">
              EDITORIAL PRAISE
            </span>
            <h2 className="font-display font-light text-3xl md:text-5xl tracking-tight text-zinc-100 uppercase">
              CLIENT TESTIMONIALS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-[#070707] border border-zinc-900 p-8 rounded-xl shadow-xl relative flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <Quote className="w-8 h-8 text-brand-gold/20" />
                  <p className="text-zinc-300 font-serif italic text-sm md:text-base leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-8 border-t border-zinc-900 mt-8">
                  <span className="font-display font-semibold text-zinc-200 block text-sm uppercase tracking-wide">
                    {t.name}
                  </span>
                  <span className="text-[10px] text-brand-gold font-mono uppercase tracking-widest block mt-0.5">
                    {t.company}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL TRANSITIONAL CALL TO ACTION SECTION */}
      <section className="bg-gradient-to-t from-[#030303] to-[#050505] py-28 border-t border-zinc-900 relative text-center">
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06),transparent_60%)] pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-8 relative z-10">
          <span className="text-xs uppercase tracking-[0.3em] font-mono text-brand-gold block">
            PARTNER WITH EXCELLENCE
          </span>
          <h2 className="font-display font-light text-4xl md:text-6xl tracking-tight text-zinc-100 uppercase leading-tight">
            Ready to project your luxury story?
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Inquire today to schedule an in-depth creative briefing. Let us design and manufacture cinematic assets that build timeless value for your brand.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              id="cta-bottom-book"
              onClick={() => {
                setTab("contact");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-brand-gold to-brand-bronze text-[#050505] font-display font-semibold uppercase tracking-widest text-xs px-8 py-4 rounded-full transition-all duration-300 cursor-pointer shadow-lg shadow-brand-gold/10"
            >
              Consult an agent
            </button>
            <button
              id="cta-bottom-portfolio"
              onClick={() => {
                setTab("portfolio");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 border border-zinc-800 hover:border-zinc-700 bg-zinc-950 px-8 py-4 rounded-full text-xs text-zinc-400 font-display font-medium uppercase tracking-widest transition-all duration-300 cursor-pointer"
            >
              Examine coordinates
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
