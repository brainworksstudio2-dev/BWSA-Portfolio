import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Play, Volume2, VolumeX, Eye, AlertTriangle, ExternalLink } from "lucide-react";
import { PortfolioItem } from "../types";
import { getDirectDriveUrl, getStreamableVideoUrl, isGoogleDriveUrl, getDriveEmbedUrl } from "../utils/driveParser";
import { getYouTubeId, getYouTubeEmbedUrl } from "../utils/youtubeParser";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  items: PortfolioItem[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

export default function Lightbox({
  isOpen,
  onClose,
  items,
  currentIndex,
  setCurrentIndex,
}: LightboxProps) {
  const currentItem = items[currentIndex];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasVideoError, setHasVideoError] = useState(false);

  // Close with Esc, navigate with Arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, items]);

  // Restart video playback and reset state when media changes
  useEffect(() => {
    setHasVideoError(false);
    if (currentItem && !isGoogleDriveUrl(currentItem.mediaUrl) && !getYouTubeId(currentItem.mediaUrl) && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [currentIndex, currentItem]);


  if (!isOpen || !currentItem) return null;

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + items.length) % items.length);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        id="lightbox-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col justify-between bg-[#030303]/95 backdrop-blur-md overflow-hidden p-4 md:p-8"
      >
        {/* UPPER STATUS BAR */}
        <div className="flex items-center justify-between w-full relative z-10 mb-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-brand-gold uppercase tracking-[0.3em] font-mono">
              {currentItem.category}
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-zinc-500 font-mono text-xs">
                {String(currentIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-500 font-mono text-xs">
                {String(items.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {currentItem.type === "video" && !isGoogleDriveUrl(currentItem.mediaUrl) && !getYouTubeId(currentItem.mediaUrl) && (
              <>
                <button
                  id="lightbox-mute"
                  onClick={toggleMute}
                  className="p-2.5 rounded-full bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-brand-gold transition-colors cursor-pointer"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <button
                  id="lightbox-playback"
                  onClick={togglePlay}
                  className="p-2.5 rounded-full bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-brand-gold transition-colors cursor-pointer"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <span className="block w-5 h-5 flex items-center justify-center font-bold text-xs">❚❚</span>
                  ) : (
                    <Play className="w-5 h-5 fill-current" />
                  )}
                </button>
              </>
            )}
            <button
              id="lightbox-close"
              onClick={onClose}
              className="p-2.5 rounded-full bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-brand-gold transition-colors cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CENTER GALLERY PORTION WITH ARROWS */}
        <div className="flex-1 flex items-center justify-between relative min-h-0 w-full mb-6">
          {/* Previous Arrow */}
          <button
            id="lightbox-arrow-left"
            onClick={handlePrev}
            className="absolute left-0 md:left-4 z-10 p-4 rounded-full bg-zinc-900/40 hover:bg-brand-gold/10 hover:border-brand-gold/20 text-zinc-400 hover:text-brand-gold transition-all duration-300 cursor-pointer border border-transparent-30 shadow-2xl"
            aria-label="Previous item"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Current Media Render container */}
          <div className="w-full h-full max-w-5xl mx-auto flex items-center justify-center relative p-2 md:p-8">
            <motion.div
              key={currentItem.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="max-h-full max-w-full rounded-lg overflow-hidden border border-zinc-900/60 shadow-2xl relative"
            >
              {currentItem.type === "image" ? (
                <img
                  id="lightbox-image-render"
                  src={getDirectDriveUrl(currentItem.mediaUrl)}
                  alt={currentItem.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[70vh] md:max-h-[75vh] w-auto max-w-full object-contain object-center select-none"
                />
              ) : getYouTubeId(currentItem.mediaUrl) ? (
                <div className="w-[85vw] max-w-4xl aspect-video flex flex-col items-center justify-center bg-black rounded-lg overflow-hidden border border-zinc-900 shadow-2xl relative">
                  <iframe
                    id="lightbox-youtube-render"
                    src={getYouTubeEmbedUrl(currentItem.mediaUrl)}
                    className="w-full h-full border-none"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : isGoogleDriveUrl(currentItem.mediaUrl) ? (
                <div className="w-[85vw] max-w-4xl h-[45vh] md:h-[60vh] flex flex-col items-center justify-center bg-black rounded-lg overflow-hidden border border-zinc-900 shadow-2xl relative">
                  <iframe
                    id="lightbox-iframe-render"
                    src={getDriveEmbedUrl(currentItem.mediaUrl)}
                    className="w-full h-full border-none"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                </div>
              ) : hasVideoError ? (
                <div className="flex flex-col items-center justify-center text-center p-8 md:p-12 bg-zinc-950/95 border border-zinc-900 rounded-xl space-y-6 max-w-md mx-auto my-6">
                  <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                    <AlertTriangle className="w-8 h-8 font-light shadow-lg" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-zinc-100 font-display text-base font-semibold uppercase tracking-wider">
                      Preview Format Unsupported
                    </h4>
                    <p className="text-zinc-400 text-xs leading-relaxed font-light">
                      This browser environment cannot decode this video codec directly inside the sandbox. Stream is fully functional when played natively in broad-codec tab wrappers.
                    </p>
                  </div>
                  <a
                    href={currentItem.mediaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#C5A059] hover:bg-[#C5A059]/90 text-zinc-950 font-display font-semibold text-xs uppercase tracking-widest px-6 py-3 rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Open Native Stream</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ) : (
                <video
                  id="lightbox-video-render"
                  ref={videoRef}
                  src={getStreamableVideoUrl(currentItem.mediaUrl)}
                  loop
                  muted={isMuted}
                  autoPlay={isPlaying}
                  onError={() => {
                    console.warn("Video render error occurred. Utilizing system fallback handler.");
                    setHasVideoError(true);
                  }}
                  className="max-h-[70vh] md:max-h-[75vh] w-auto max-w-full object-contain object-center"
                  playsInline
                />
              )}
            </motion.div>
          </div>

          {/* Next Arrow */}
          <button
            id="lightbox-arrow-right"
            onClick={handleNext}
            className="absolute right-0 md:right-4 z-10 p-4 rounded-full bg-zinc-900/40 hover:bg-brand-gold/10 hover:border-brand-gold/20 text-zinc-400 hover:text-brand-gold transition-all duration-300 cursor-pointer border border-transparent-30 shadow-2xl"
            aria-label="Next item"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* BOTTOM METADATA EXPANSION */}
        <div className="w-full max-w-4xl mx-auto text-center border-t border-zinc-900 pt-6 mt-auto">
          <div className="space-y-2">
            <h3 className="font-display font-semibold text-lg md:text-2xl text-zinc-100 tracking-wide uppercase">
              {currentItem.title}
            </h3>
            <p className="text-xs md:text-sm text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              {currentItem.description}
            </p>
          </div>
          <div className="flex justify-center gap-3 mt-4">
            <span className="text-[10px] bg-zinc-900 px-3 py-1 rounded-full text-zinc-500 font-mono tracking-widest uppercase">
              Type: {currentItem.type}
            </span>
            <span className="text-[10px] bg-zinc-900 px-3 py-1 rounded-full text-zinc-500 font-mono tracking-widest uppercase">
              Client Project
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
