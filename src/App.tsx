import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Camera, 
  Tv, 
  ExternalLink, 
  Lock, 
  Unlock, 
  Trash2, 
  Plus, 
  RotateCcw, 
  Check, 
  Eye, 
  Sparkles, 
  Play, 
  LayoutGrid,
  AlertCircle,
  Video,
  Image as ImageIcon
} from "lucide-react";
import Lightbox from "./components/Lightbox";
import { PortfolioItem } from "./types";
import { getDirectDriveUrl } from "./utils/driveParser";
import { getYouTubeId, getYouTubeThumbnail } from "./utils/youtubeParser";

// Import initialized Firestore database instance
import { db } from "./lib/firebase";
import { collection, onSnapshot, doc, setDoc, deleteDoc } from "firebase/firestore";

// Premium 9 Categories from Brain Works Studio Africa
const CATEGORIES = [
  "Brand Films",
  "Commercials",
  "Event Production",
  "Documentaries",
  "Real Estate",
  "Social Content",
  "Photography",
  "Drone Work",
  "Design & Motion"
];

// Premium Sample Defaults for Brain Works Studio Africa (for empty database seeding)
const INITIAL_WORKS: PortfolioItem[] = [];

export default function App() {
  // Real-time Firestore records
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isDbLoading, setIsDbLoading] = useState(true);

  // Hidden Admin URL Activation Check
  const [showAdminEntry, setShowAdminEntry] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Create workspace form state
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Brand Films");
  const [newType, setNewType] = useState<"video" | "image">("video");
  const [newMediaUrl, setNewMediaUrl] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [formError, setFormError] = useState("");

  // Lightbox selection State
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Secret Admin Query Parameter check on initial load & Firestore subscription
  useEffect(() => {
    // 1. Detect /admin path to expose authorization links
    if (window.location.pathname.startsWith("/admin")) {
      setShowAdminEntry(true);
    }

    // 2. Real-time Firebase Firestore Subscription
    setIsDbLoading(true);
    const collectionRef = collection(db, "portfolio_works");

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const dbList: PortfolioItem[] = [];
      snapshot.forEach((docSnap) => {
        dbList.push(docSnap.data() as PortfolioItem);
      });

      // If document snapshot is completely empty, auto-seed the database with premium defaults so it's not empty on startup!
      if (snapshot.empty) {
        console.info("Firestore portfolio collection is currently empty. Seeding defaults...");
        INITIAL_WORKS.forEach(async (item) => {
          try {
            await setDoc(doc(db, "portfolio_works", item.id), item);
          } catch (err) {
            console.error("Seeding initial defaults failed:", err);
          }
        });
      } else {
        // Deterministic Sorting:
        // Prioritize custom items (newest timestamp first), followed by alphabetical original samples
        dbList.sort((a, b) => {
          const aVal = a.id.startsWith("bwsa_") ? parseInt(a.id.replace("bwsa_", ""), 10) : 0;
          const bVal = b.id.startsWith("bwsa_") ? parseInt(b.id.replace("bwsa_", ""), 10) : 0;

          if (aVal !== bVal) {
            return bVal - aVal; // Newest custom published work first
          }
          return a.title.localeCompare(b.title); // Consistent order for starters
        });

        setItems(dbList);
        setIsDbLoading(false);
      }
    }, (error) => {
      console.error("Real-time snapshot error. Please double-check your security rules or connection:", error);
      setIsDbLoading(false);
      setFormError("Remote synchronization connection is currently restricted. Displaying local cache.");
    });

    return () => unsubscribe();
  }, []);

  // Handle Admin Passkey Submission
  const handleAdminVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPass = adminPassword.trim();
    if (cleanPass === "Br@1nW0rk") {
      setIsAdminMode(true);
      setShowAdminLogin(false);
      setAdminPassword("");
      setLoginError("");
      setSuccessMsg("Administrator Mode unlocked. You can now post and manage portfolio items.");
      setTimeout(() => setSuccessMsg(""), 4000);
    } else {
      setLoginError("Invalid password. Please request the correct owner credentials.");
    }
  };

  // Exit Admin privileges
  const handleAdminExit = () => {
    setIsAdminMode(false);
    setSuccessMsg("");
  };

  // Reset to original samples in Firestore
  const handleResetDefaults = async () => {
    if (window.confirm("RESET DATABASE: This will overwrite your current Firestore collection database records with the design sample defaults. Proceed?")) {
      try {
        setSuccessMsg("Erasing and re-syncing default premium presets...");
        // Delete current list
        for (const item of items) {
          await deleteDoc(doc(db, "portfolio_works", item.id));
        }
        // Write defaults
        for (const dw of INITIAL_WORKS) {
          await setDoc(doc(db, "portfolio_works", dw.id), dw);
        }
        setSuccessMsg("Database defaulted successfully.");
        setTimeout(() => setSuccessMsg(""), 4000);
      } catch (err) {
        setFormError("Failed to update remote records. Please audit project Firestore security write permission rules.");
      }
    }
  };

  // Publish new image or video directly to Firestore
  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setSuccessMsg("");

    if (!newTitle.trim()) {
      setFormError("Please enter a title for the showcase asset.");
      return;
    }
    if (!newMediaUrl.trim()) {
      setFormError("Please provide an asset media link URL.");
      return;
    }

    let resolvedThumbnail = "";
    if (newType === "video") {
      const ytId = getYouTubeId(newMediaUrl);
      if (!ytId) {
        setFormError("Format UNSUPPORTED: Please provide a valid, standard YouTube sharing or video link.");
        return;
      }
      resolvedThumbnail = getYouTubeThumbnail(newMediaUrl);
    } else {
      resolvedThumbnail = getDirectDriveUrl(newMediaUrl);
    }

    const docId = "bwsa_" + Date.now();
    const newItem: PortfolioItem = {
      id: docId,
      title: newTitle.trim(),
      category: newCategory,
      type: newType,
      mediaUrl: newMediaUrl.trim(),
      thumbnail: resolvedThumbnail,
      description: newDescription.trim() || "A creative production project crafted by Brain Works Studio Africa."
    };

    try {
      // Save directly to Firestore for global instant propagation
      await setDoc(doc(db, "portfolio_works", docId), newItem);
      
      // Reset inputs
      setNewTitle("");
      setNewMediaUrl("");
      setNewDescription("");
      setSuccessMsg(`"${newItem.title}" has been successfully published to Firebase Firestore database!`);
      setTimeout(() => setSuccessMsg(""), 5000);
    } catch (err) {
      console.error("Firestore write failure:", err);
      setFormError("Error writing to Firestore. Ensure security rules are applied for public database updates.");
    }
  };

  // Delete live collection record
  const handleDeleteItem = async (idToDelete: string, title: string) => {
    if (window.confirm(`ARE YOU SURE? This will permanently delete course video / photograph "${title}" from Firebase storage collection.`)) {
      try {
        await deleteDoc(doc(db, "portfolio_works", idToDelete));
        setSuccessMsg(`"${title}" deleted successfully from live Firestore.`);
        setTimeout(() => setSuccessMsg(""), 3000);
      } catch (err) {
        console.error("Firestore delete error:", err);
        setFormError("Delete permission rejected. Check Firestore rules configurations.");
      }
    }
  };

  const filteredItems = items.filter(item => {
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  return (
    <div className="min-h-screen bg-[#040404] text-[#F3F4F6] flex flex-col justify-between selection:bg-[#C5A059] selection:text-[#040404] relative uppercase-none">
      
      {/* Premium ambient light fields */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-5%] left-[-5%] w-[500px] h-[500px] bg-[#C5A059] opacity-[0.03] blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-[#C5A059] opacity-[0.02] blur-[150px] rounded-full"></div>
      </div>

      {/* HEADER BAR */}
      <header className="sticky top-0 z-40 bg-[#040404]/90 backdrop-blur-md border-b border-zinc-950/60 p-4 transition-all duration-300">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Logo signature layout */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#040404] border border-zinc-850 flex items-center justify-center overflow-hidden p-1 shadow-sm">
              <img src="/logo.png" alt="BWSA Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="block text-[10px] sm:text-xs font-semibold tracking-[0.15em] sm:tracking-[0.2em] font-display text-zinc-100 uppercase leading-tight">
                Brain Works Studio
              </span>
              <span className="block text-[7px] sm:text-[8px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-mono text-zinc-500">
                Africa (BWSA)
              </span>
            </div>
          </div>

          {/* Nav / Anchor settings */}
          <div className="flex items-center gap-3">
            {/* LINK TO THE MAIN WEBSITE (CRITICAL USER MANDATE) */}
            <a
              id="main-website-link"
              href="https://brainworksstudioafrica.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 border border-zinc-900 hover:border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900/40 px-2.5 sm:px-3.5 py-1.5 rounded-md text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-widest text-[#C5A059] font-semibold transition-all duration-300 shadow-sm"
            >
              <span className="hidden sm:inline">Main Website Link</span>
              <span className="sm:hidden">Website</span>
              <ExternalLink className="w-3 h-3 text-zinc-500 hidden sm:block" />
            </a>

            {/* HIDDEN ADMIN PORTAL TRIGGERS (ONLY VISIBLE VIA SECRET URL QUERY ?admin=true) */}
            {showAdminEntry && (
              isAdminMode ? (
                <button
                  id="admin-logout-btn"
                  onClick={handleAdminExit}
                  className="flex items-center gap-1 sm:gap-1.5 bg-[#C5A059]/10 border border-[#C5A059]/30 hover:border-[#C5A059] text-[#C5A059] px-2 sm:px-3 py-1.5 rounded-md text-[8px] sm:text-[9px] uppercase tracking-wider sm:tracking-widest font-mono font-semibold transition-colors cursor-pointer"
                >
                  <Unlock className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                  <span className="hidden sm:inline">Admin Mode Active</span>
                  <span className="sm:hidden">Active</span>
                </button>
              ) : (
                <button
                  id="admin-login-trigger"
                  onClick={() => {
                    setShowAdminLogin(true);
                    setLoginError("");
                  }}
                  className="flex items-center gap-1 sm:gap-1.5 bg-zinc-900/80 border border-zinc-850 hover:border-[#C5A059] text-zinc-300 hover:text-[#C5A059] px-2 sm:px-3 py-1.5 rounded-md text-[8px] sm:text-[9px] uppercase tracking-wider sm:tracking-widest font-mono transition-colors cursor-pointer font-medium"
                  title="Unlock Authorized Administrator Board"
                >
                  <Lock className="w-3 h-3 text-[#C5A059] shrink-0" />
                  <span className="hidden sm:inline">Admin Login</span>
                  <span className="sm:hidden">Login</span>
                </button>
              )
            )}
          </div>
        </div>
      </header>

      {/* CORE DISPLAY INSIGNIA HERO */}
      <section className="relative z-10 pt-16 pb-6 px-4 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-zinc-950 border border-zinc-900 px-3.5 py-1.5 rounded-full text-[9px] uppercase tracking-widest font-mono text-zinc-400 mb-6 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-ping"></span>
          <span>Live Firebase Production Archives</span>
        </div>
        <h1 className="font-display font-light text-3xl sm:text-5xl lg:text-6xl tracking-tight text-zinc-100 leading-none uppercase">
          Crafting Elite Films <br />
          <span className="font-semibold text-[#C5A059] tracking-normal font-sans text-xl sm:text-4xl">& Images Across Africa</span>
        </h1>
        <div className="w-20 h-[1.5px] bg-[#C5A059] mx-auto my-6"></div>
        <p className="text-zinc-400 font-light text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
          Welcome to the high-performance media portfolio wrapper of Brain Works Studio Africa. Pasting new YouTube urls within the protected dashboard propagates them live here immediately.
        </p>
      </section>

      {/* WORKSPACE AREA */}
      <main className="relative z-10 flex-grow max-w-6xl w-full mx-auto px-4 pb-24 space-y-12">
        
        {/* ADMIN DASHBOARD CONSOLE (SHOWN ONLY WHEN ADMIN STATE IS ACTIVE) */}
        <AnimatePresence>
          {isAdminMode && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-6 bg-zinc-950/90 border border-[#C5A059]/30 rounded-2xl relative shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/5 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-4 mb-6">
                <div>
                  <h2 className="text-xs font-semibold tracking-widest uppercase text-zinc-100 flex items-center gap-2 font-display">
                    <Unlock className="w-4 h-4 text-[#C5A059]" />
                    Real-time Firebase Creator Portal
                  </h2>
                  <p className="text-[10px] text-zinc-500 font-mono mt-0.5 uppercase tracking-wide">
                    Records will post to your remote Firestore. Default backups are restored with one click.
                  </p>
                </div>
                
                <button
                  onClick={handleResetDefaults}
                  className="flex items-center gap-1.5 bg-red-950/20 border border-red-900/30 hover:border-red-600 text-red-400 py-1.5 px-3 rounded text-[10px] uppercase tracking-wider font-mono transition-all hover:bg-red-950/50 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  Restore Initial Defaults
                </button>
              </div>

              {/* Add item Form */}
              <form onSubmit={handleAddItem} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  
                  {/* Title */}
                  <div className="md:col-span-4 space-y-1.5">
                    <label className="block text-[9px] uppercase tracking-wider font-mono text-zinc-500 font-semibold">
                      Work Title
                    </label>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. Traditional Wedding Documentary Accra"
                      className="w-full bg-[#050505] border border-zinc-900 rounded p-2.5 text-xs focus:outline-none focus:border-[#C5A059] text-zinc-100"
                    />
                  </div>

                  {/* Category Selection Tag */}
                  <div className="md:col-span-3 space-y-1.5">
                    <label className="block text-[9px] uppercase tracking-wider font-mono text-zinc-500 font-semibold">
                      Select Category
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => {
                        const val = e.target.value;
                        setNewCategory(val);
                        // Auto-toggle sensible showcase formats
                        if (val === "Photography") {
                          setNewType("image");
                        } else {
                          setNewType("video");
                        }
                      }}
                      className="w-full bg-[#050505] border border-zinc-900 rounded p-2.5 text-xs text-zinc-100 focus:outline-none focus:border-[#C5A059] cursor-pointer"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat} className="bg-zinc-950 text-zinc-100">
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Asset Type */}
                  <div className="md:col-span-2 space-y-1.5 font-semibold">
                    <label className="block text-[9px] uppercase tracking-wider font-mono text-zinc-500 font-semibold">
                      Media Type
                    </label>
                    <div className="flex rounded bg-[#050505] p-1 border border-zinc-900">
                      <button
                        type="button"
                        onClick={() => setNewType("video")}
                        className={`flex-1 flex items-center justify-center gap-1 py-1.5 text-[9px] uppercase tracking-widest rounded transition-colors cursor-pointer ${
                          newType === "video" 
                          ? "bg-[#C5A059] text-zinc-950 font-bold" 
                          : "text-zinc-500 hover:text-zinc-350"
                        }`}
                      >
                        <Video className="w-3 h-3 shrink-0" />
                        Video
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewType("image")}
                        className={`flex-1 flex items-center justify-center gap-1 py-1.5 text-[9px] uppercase tracking-widest rounded transition-all cursor-pointer ${
                          newType === "image" 
                          ? "bg-[#C5A059] text-zinc-950 font-bold" 
                          : "text-zinc-500 hover:text-zinc-350"
                        }`}
                      >
                        <ImageIcon className="w-3 h-3 shrink-0" />
                        Photo
                      </button>
                    </div>
                  </div>

                  {/* Media Link */}
                  <div className="md:col-span-3 space-y-1.5">
                    <label className="block text-[9px] uppercase tracking-wider font-mono text-zinc-500 font-semibold">
                      {newType === "video" ? "YouTube URL Link" : "Image Link (Direct / URL link)"}
                    </label>
                    <input
                      type="text"
                      value={newMediaUrl}
                      onChange={(e) => setNewMediaUrl(e.target.value)}
                      placeholder={
                        newType === "video" 
                        ? "https://www.youtube.com/watch?v=..." 
                        : "e.g. https://images.unsplash.com/..."
                      }
                      className="w-full bg-[#050505] border border-zinc-900 rounded p-2.5 text-xs focus:outline-none focus:border-[#C5A059] text-zinc-100 font-mono text-[11px]"
                    />
                  </div>
                </div>

                {/* Description info */}
                <div className="space-y-1.5">
                  <label className="block text-[9px] uppercase tracking-wider font-mono text-zinc-500 font-semibold">
                    Showcase Description Details
                  </label>
                  <textarea
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Provide a detailed cinematic context concerning drone shots, corporate branding details..."
                    rows={2}
                    className="w-full bg-[#050505] border border-zinc-900 rounded p-2.5 text-xs focus:outline-none focus:border-[#C5A059] resize-none text-zinc-100"
                  />
                </div>

                {/* Action trigger */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <div className="text-[10px] text-zinc-500 italic max-w-lg font-light leading-normal">
                    {newType === "video" ? (
                      <span className="text-[#C5A059]/80 font-mono">
                        💡 System parses YouTube IDs automatically and fetches premium covers instantly.
                      </span>
                    ) : (
                      <span>For photography and design flyers, make sure the image URL is direct and shared publicly.</span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-1.5 bg-[#C5A059] hover:bg-[#C5A059]/90 text-zinc-950 font-display font-bold text-[11px] uppercase tracking-widest px-6 py-3 rounded transition-all duration-300 shadow-md cursor-pointer shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5 text-zinc-950 stroke-[3px]" />
                    Publish Live Link
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FEEDBACK BANNER ALERTS */}
        <AnimatePresence>
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-green-950/20 border border-green-900/40 text-green-300 p-4 rounded-xl flex items-center gap-2.5 text-xs max-w-4xl mx-auto"
            >
              <Check className="w-4 h-4 text-green-400 shrink-0" />
              <span>{successMsg}</span>
            </motion.div>
          )}
          {formError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-950/20 border border-red-900/40 text-red-350 p-4 rounded-xl flex items-center gap-2.5 text-xs max-w-4xl mx-auto"
            >
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{formError}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PORTFOLIO GRID CONTROLS / TABS */}
        <div className="flex flex-col gap-4 border-b border-zinc-950/80 pb-6 relative z-10">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#C5A059] font-bold">
              Explore Our Premium Work Categories
            </span>
            <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase hidden sm:inline">
              {filteredItems.length} High-Res Assets Rendered
            </span>
          </div>
          
          <div className="flex overflow-x-auto scrollbar-none gap-2 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth">
            <button
              onClick={() => setActiveCategory("all")}
              className={`flex items-center gap-1.5 py-2.5 px-4 rounded-lg text-[10px] sm:text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeCategory === "all"
                  ? "bg-[#C5A059] text-zinc-950 font-bold"
                  : "bg-zinc-950/45 text-zinc-400 hover:text-zinc-200 border border-zinc-900/50 hover:border-zinc-800"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 shrink-0" />
              All Work ({items.length})
            </button>

            {CATEGORIES.map((cat) => {
              const count = items.filter(it => it.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-2 py-2.5 px-4 rounded-lg text-[10px] sm:text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    activeCategory === cat
                      ? "bg-[#C5A059] text-zinc-950 font-bold"
                      : "bg-zinc-950/45 text-zinc-400 hover:text-zinc-200 border border-zinc-900/50 hover:border-zinc-800"
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono ${
                    activeCategory === cat ? "bg-black/15 text-zinc-950 font-bold" : "bg-zinc-900 text-zinc-500"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* LOADING SHIMMER ELEMENT */}
        {isDbLoading && items.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((val) => (
              <div 
                key={val} 
                className="bg-zinc-950/40 border border-zinc-900 rounded-xl h-[280px] animate-pulse relative overflow-hidden flex flex-col justify-end p-5 space-y-3"
              >
                <div className="w-12 h-4 bg-zinc-900 rounded"></div>
                <div className="w-3/4 h-6 bg-zinc-900 rounded"></div>
                <div className="w-full h-4 bg-zinc-900 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          /* RESPONSIVE PICTURE AND VIDEO GRID */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => {
                const bgThumbnail = item.type === "video" 
                  ? getYouTubeThumbnail(item.mediaUrl) 
                  : getDirectDriveUrl(item.thumbnail || item.mediaUrl);

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35 }}
                    className="group relative bg-[#060606] border border-zinc-900/80 rounded-xl overflow-hidden shadow-xl aspect-[4/3] flex flex-col justify-end"
                  >
                    {/* Background Visual Wrapper */}
                    <div className="absolute inset-0 z-0">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020202]/98 via-black/35 to-black/10 group-hover:via-black/25 transition-all z-10 duration-300"></div>
                      <img
                        src={bgThumbnail}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out select-none"
                      />
                    </div>

                    {/* Media Type Indicator */}
                    <div className="absolute top-4 left-4 z-20 flex gap-2">
                      <span className="inline-flex items-center gap-1 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] uppercase font-mono tracking-widest text-[#C5A059] border border-[#C5A059]/15 font-semibold">
                        {item.type === "video" ? <Tv className="w-2.5 h-2.5 text-[#C5A059]" /> : <Camera className="w-2.5 h-2.5 text-[#C5A059]" />}
                        {item.category}
                      </span>
                    </div>

                    {/* ADMIN DELETE FUNCTIONALITY */}
                    {isAdminMode && (
                      <div className="absolute top-4 right-4 z-20 font-semibold">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteItem(item.id, item.title);
                          }}
                          className="bg-black/90 p-2.5 rounded-lg border border-red-900/40 text-red-400 hover:text-red-100 hover:bg-red-950 transition-all cursor-pointer shadow-lg"
                          title="Erase live record from Firestore"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {/* TITLE / METADATA SUMMARY */}
                    <div className="absolute inset-x-0 bottom-0 p-5 z-20 space-y-2.5">
                      <div className="transform translate-y-1.5 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="text-[8px] uppercase font-mono tracking-widest font-bold text-zinc-500">
                          {item.type === "video" ? "Videography / Reel" : "Photography / Visuals"}
                        </span>
                        <h3 className="font-display font-medium text-sm sm:text-base text-zinc-100 uppercase tracking-wide group-hover:text-[#C5A059] transition-colors mt-0.5 line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-[11px] text-zinc-400 font-light mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <button
                          onClick={() => {
                            setLightboxIndex(idx);
                            setIsLightboxOpen(true);
                          }}
                          className="inline-flex items-center gap-1.5 text-[9px] uppercase font-mono tracking-widest text-[#C5A059] font-bold group-hover:underline cursor-pointer font-semibold"
                        >
                          {item.type === "video" ? (
                            <>
                              <Play className="w-3 h-3 fill-current text-[#C5A059]" />
                              <span>Play Stream</span>
                            </>
                          ) : (
                            <>
                              <Eye className="w-3 h-3 text-[#C5A059]" />
                              <span>View Still</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* FEEDBACK EMPTY STATE */}
        {!isDbLoading && filteredItems.length === 0 && (
          <div className="text-center py-24 bg-zinc-950/70 border border-zinc-900/80 rounded-2xl max-w-lg mx-auto space-y-4">
            <Tv className="w-12 h-12 text-zinc-650 mx-auto stroke-[1.2px]" />
            <div className="space-y-1.5">
              <h4 className="font-display text-zinc-300 font-medium tracking-wide uppercase text-sm">
                No Media Found In Context
              </h4>
              <p className="text-zinc-500 text-xs font-light max-w-xs mx-auto leading-relaxed">
                Add beautiful videography captures or still photo highlights under this category to populate here instantly.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-zinc-950 bg-[#030303] py-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          
          <div className="space-y-2">
            <h4 className="font-display text-xs text-zinc-300 tracking-[0.3em] uppercase font-extrabold">
              Brain Works Studio Africa
            </h4>
            <p className="text-[9px] text-zinc-500 font-mono tracking-wide uppercase leading-normal">
              PRESERVING MEMORIES. CONSTRUCTING RAW DIGITAL POWER AND STORY DEPTH. <br />
              ACCRA, GHANA • WE OPERATE GLOBALLY
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="https://brainworksstudioafrica.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C5A059] hover:text-zinc-100 text-xs font-display font-semibold tracking-widest uppercase transition-colors"
            >
              Main Website Link ↗
            </a>
            <span className="text-zinc-800 hidden sm:inline">|</span>
            <span className="text-[10px] text-zinc-500 font-mono text-zinc-500 font-medium">
              © 2026 BWSA PORTFOLIO. ALL RIGHTS RESERVED.
            </span>
          </div>

        </div>
      </footer>

      {/* ADMIN PASSCODE GATE MODAL */}
      <AnimatePresence>
        {showAdminLogin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAdminLogin(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-zinc-950 border border-zinc-900 rounded-2xl p-6 w-full max-w-sm overflow-hidden shadow-2xl z-10"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#C5A059]/5 rounded-full blur-xl pointer-events-none"></div>

              <div className="text-center space-y-1.5 mb-6">
                <Lock className="w-8 h-8 text-[#C5A059] mx-auto animate-bounce mt-2" />
                <h3 className="font-display font-medium text-base text-zinc-100 uppercase tracking-wider">
                  Admin Verification
                </h3>
                <p className="text-[10px] text-zinc-400 font-light leading-relaxed">
                  Provide custom administrative permissions passphrase to modify visual link databases.
                </p>
              </div>

              <form onSubmit={handleAdminVerify} className="space-y-4">
                <div className="space-y-2">
                  <span className="text-[9px] uppercase tracking-wider font-mono text-zinc-500 block font-semibold">
                    Admin Passkey
                  </span>
                  <input
                    type="password"
                    placeholder="e.g. admin or bwsa"
                    value={adminPassword}
                    onChange={(e) => {
                      setAdminPassword(e.target.value);
                      setLoginError("");
                    }}
                    autoFocus
                    className="w-full bg-[#040404] border border-zinc-900 rounded p-3 text-xs text-zinc-100 focus:outline-none focus:border-[#C5A059] font-mono tracking-widest text-center"
                  />
                  {loginError && (
                    <span className="text-red-400 text-[10px] block text-center font-mono mt-1">
                      ⚠️ {loginError}
                    </span>
                  )}
                </div>

                <div className="flex gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAdminLogin(false)}
                    className="flex-1 bg-zinc-900 hover:bg-zinc-850 text-zinc-400 py-2.5 rounded text-[11px] uppercase tracking-wider transition-colors font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#C5A059] hover:bg-[#C5A059]/90 text-zinc-950 font-display font-bold py-2.5 rounded text-[11px] uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    Authorize
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL LIGHTBOX CONTROLS */}
      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        items={filteredItems}
        currentIndex={lightboxIndex}
        setCurrentIndex={setLightboxIndex}
      />
    </div>
  );
}
