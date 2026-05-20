import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Eye, Play, SlidersHorizontal, Sparkles } from "lucide-react";
import { PortfolioItem } from "../types";
import { getDirectDriveUrl } from "../utils/driveParser";
import portfolioItemsData from "../data/portfolio.json";

// Cast local json
const portfolioItems = portfolioItemsData as PortfolioItem[];

interface PortfolioViewProps {
  openLightboxWithIndex: (items: PortfolioItem[], index: number) => void;
}

const categories = [
  "All",
  "Photography",
  "Corporate Photography",
  "Videography",
  "Graphic Design",
  "Branding",
];

export default function PortfolioView({ openLightboxWithIndex }: PortfolioViewProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter items matching selection
  const filteredItems = selectedCategory === "All"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <div id="portfolio-view-container" className="pt-28 pb-24 min-h-[80vh] relative">
      <div className="absolute top-20 right-10 w-96 h-96 bg-brand-gold/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Page Title & Tagline */}
        <div className="space-y-4 mb-16 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">
            <Sparkles className="w-3 h-3 text-brand-gold" />
            <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400">
              Curated Masterpieces
            </span>
          </div>
          <h1 className="font-display font-light text-4xl md:text-6xl tracking-tight text-zinc-100 uppercase">
            ESTABLISHED <span className="font-serif italic text-brand-gold">Exposition</span>
          </h1>
          <p className="text-zinc-500 font-light text-sm md:text-base max-w-xl">
            Explore our visual index of client campaigns, corporate storytelling reels, and typographic identity documents. Select filters to traverse catalogs.
          </p>
        </div>

        {/* Category Filters row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-900 pb-8 mb-12">
          {/* Filters List */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 md:pb-0 scrollbar-none">
            <SlidersHorizontal className="w-4 h-4 text-zinc-500 mr-2 shrink-0 hidden md:block" />
            <div className="flex items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  id={`cat-filter-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest font-mono transition-all duration-300 cursor-pointer shrink-0 ${
                    selectedCategory === cat
                      ? "bg-brand-gold text-[#050505] font-semibold"
                      : "bg-zinc-950 text-zinc-400 hover:text-zinc-100 border border-zinc-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest text-right">
            Displaying {filteredItems.length} curated objects
          </div>
        </div>

        {/* MASONRY / GRID LAYOUT WITH FRAMER MOTION TRANSITIONS */}
        <motion.div
          id="portfolio-items-grid"
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                id={`portfolio-card-${item.id}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 15 }}
                className="group relative cursor-pointer overflow-hidden rounded-xl bg-[#080808] border border-zinc-900/60 aspect-[4/5] shadow-xl hover:shadow-2xl hover:border-brand-gold/30 transition-all duration-500"
                onClick={() => openLightboxWithIndex(filteredItems, index)}
              >
                {/* Image / Thumbnail Container with Zoom Effect */}
                <div className="w-full h-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent z-10 transition-opacity duration-300"></div>
                  
                  <img
                    src={getDirectDriveUrl(item.thumbnail)}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out select-none"
                    loading="lazy"
                  />
                  
                  {/* Indicator of Type (Video or Image) */}
                  <div className="absolute top-4 right-4 z-20 flex gap-1.5">
                    {item.type === "video" ? (
                      <span className="bg-black/80 backdrop-blur-md px-2.5 py-1 text-[8px] uppercase tracking-widest font-mono text-brand-gold border border-brand-gold/20 flex items-center gap-1 rounded-full">
                        <Play className="w-2 h-2 fill-current" />
                        Video
                      </span>
                    ) : (
                      <span className="bg-black/80 backdrop-blur-md px-2.5 py-1 text-[8px] uppercase tracking-widest font-mono text-zinc-400 border border-zinc-800/80 rounded-full">
                        Photo
                      </span>
                    )}
                  </div>
                </div>

                {/* Overlying Detail Container */}
                <div className="absolute inset-x-0 bottom-0 z-20 p-6 flex flex-col justify-end space-y-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-[0.25em] font-mono text-brand-gold">
                      {item.category}
                    </span>
                    <span className="text-zinc-600 font-mono text-[9px]">
                      REF ID #{item.id.padStart(3, "0")}
                    </span>
                  </div>

                  <h3 className="font-display font-medium text-lg text-zinc-100 tracking-wide uppercase transition-colors group-hover:text-brand-gold">
                    {item.title}
                  </h3>

                  <p className="text-zinc-400 text-xs font-light line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.description}
                  </p>

                  <div className="pt-2 flex items-center gap-1.5 text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] uppercase font-mono font-bold">
                    <span>Initiate Fullscreen</span>
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GOOGLE DRIVE INTEGRATION GUIDE (DESIGNED FOR JOSHUA / ADMIN) */}
        <div id="drive-integration-guide" className="mt-20 p-6 md:p-8 bg-zinc-950/45 border border-zinc-900 rounded-2xl max-w-4xl mx-auto backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            <div className="space-y-3 max-w-lg">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-brand-gold font-semibold">
                  Dynamic Assets Infrastructure
                </span>
              </div>
              <h3 className="font-display text-lg text-zinc-100 uppercase tracking-wide">
                Google Drive Cloud Linking
              </h3>
              <p className="text-zinc-400 text-xs font-light leading-relaxed">
                Connect your media assets directly to this system without complex database pipelines. Standard sharing links pasted into your local JSON files will automatically stream inside the premium lightbox.
              </p>
            </div>

            <div className="space-y-4 w-full md:w-auto md:min-w-[280px]">
              <div className="space-y-2.5">
                <div className="flex items-start gap-2.5 text-xs text-zinc-400 font-light">
                  <span className="font-mono bg-zinc-900 border border-zinc-850 text-brand-gold w-5 h-5 rounded-md flex items-center justify-center text-[10px] uppercase shrink-0 font-bold">1</span>
                  <span>Upload your high-res image/video directly to your Google Drive.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-zinc-400 font-light">
                  <span className="font-mono bg-zinc-900 border border-zinc-850 text-brand-gold w-5 h-5 rounded-md flex items-center justify-center text-[10px] uppercase shrink-0 font-bold">2</span>
                  <span>Ensure sharing is set to <strong className="text-zinc-300 font-medium">"Anyone with the link can view."</strong></span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-zinc-400 font-light">
                  <span className="font-mono bg-zinc-900 border border-zinc-850 text-brand-gold w-5 h-5 rounded-md flex items-center justify-center text-[10px] uppercase shrink-0 font-bold">3</span>
                  <span>Copy that share URL and paste it into <code className="text-brand-gold font-mono text-[11px] bg-zinc-900/40 px-1 py-0.5 rounded">portfolio.json</code> inside the media fields!</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fallback Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-zinc-950 border border-zinc-900 rounded-xl space-y-4">
            <span className="text-zinc-600 font-mono text-xs">No entries found under this coordinate</span>
            <p className="text-zinc-400 font-display">No portfolio items available in this category.</p>
            <button
              onClick={() => setSelectedCategory("All")}
              className="text-brand-gold uppercase text-xs font-mono underline hover:text-zinc-100"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
