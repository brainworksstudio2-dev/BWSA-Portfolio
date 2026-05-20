import { motion } from "motion/react";
import { Camera, Award, Sparkles, Cpu, Shield, Globe, Layers, Laptop } from "lucide-react";
import { CreativeTeamMember, EquipmentItem } from "../types";

const teamMembers: CreativeTeamMember[] = [
  {
    name: "Joshua Doe",
    role: "Founder & Lead Photographer",
    bio: "With over 10 years capturing breathtaking portrait sessions, commercial product setups, and rich cultural events across Ghana, Joshua directs the vision of BWSA with high focus and creative rigor.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Michael Otoo Bekoe",
    role: "Co-Founder & Director of Videography",
    bio: "A technical purist specialized in cinematic high-definition compositions, framing, and capturing corporate, documentary, and wedding films with stellar visual performance.",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Emmanuel Atta",
    role: "Creative Director & Lead Stylist",
    bio: "Emmanuel aligns mood, props, lighting, and layout with organic precision. He is the mastermind behind the stunning visual alignment and aesthetic style of our commercials.",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Johnson Courage Yao",
    role: "Production & Aerial Cinematographer",
    bio: "Courage oversees technical on-set logistics and is our licensed drone operator, specializing in stunning landscape and event aerial shots across West Africa.",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Albert Makafui Kakabiku",
    role: "Lead Cinematic Editor & Sound Architect",
    bio: "Albert handles precise color pipelines, multi-cam pacing, and custom narrative audio design to forge high-emotion films and unforgettable corporate spots.",
    imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
  },
];

const equipmentList: EquipmentItem[] = [
  {
    category: "Camera Systems",
    items: [
      "Sony FX6 & FX3 Cinema Line Cameras",
      "Sony Alpha A7RV Professional Stills System",
      "Canon R5 Mirrorless 8K Stills & Video",
    ],
  },
  {
    category: "Optics & Glass",
    items: [
      "Sony G-Master 24-70mm f/2.8 II Lens",
      "Sony G-Master 70-200mm f/2.8 OSS II",
      "Sigma Art High-Speed Prime Lens Array",
    ],
  },
  {
    category: "Grip, Lighting & Flight",
    items: [
      "DJI Mavic 3 Pro Cine Drone Platform",
      "Aputure Light Storm 600d & 300d lighting arrays",
      "DJI Ronin RS3 Pro Camera Gimbal stabilizers",
    ],
  },
  {
    category: "Post & Color Systems",
    items: [
      "DaVinci Resolve Advanced Studio suite",
      "Mac Studio M2 Max & specialized editing nodes",
      "BenQ Photovue calibrated color reference displays",
    ],
  },
];

const metrics = [
  { value: "10+", label: "Years of Storytelling", icon: Award },
  { value: "500+", label: "Completed Shoots", icon: Globe },
  { value: "98%", label: "Client Satisfaction", icon: Sparkles },
  { value: "Accra", label: "Lapaz Headquarters", icon: Camera },
];

export default function AboutView() {
  return (
    <div id="about-view-container" className="pt-28 pb-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/3 left-1/4 w-[30rem] h-[30rem] bg-brand-bronze/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/10 w-[35rem] h-[35rem] bg-brand-gold/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* UPPER TITLE */}
        <div id="about-intro-headers" className="space-y-4 mb-20 text-center md:text-left">
          <span className="text-xs uppercase tracking-[0.3em] font-mono text-brand-gold block">
            BEHIND THE CAPTURE
          </span>
          <h1 className="font-display font-light text-4xl md:text-6xl tracking-tight text-zinc-100 uppercase">
            CRAFTED BY <span className="font-serif italic text-brand-gold">Intent</span>
          </h1>
          <p className="text-zinc-500 font-light text-sm md:text-base max-w-xl">
            A boutique collective of world-class creators operating at the delicate intersection of high-fashion photography and premium brand architecture.
          </p>
        </div>

        {/* CORE BRAND STORY */}
        <section id="about-brand-story" className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-28 items-center">
          <div className="relative aspect-video lg:aspect-[4/5] rounded-xl overflow-hidden border border-zinc-900 group shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent z-10 opacity-70"></div>
            <img
              src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1200&q=80"
              alt="Luxury Camera Set"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
            />
            {/* Superimposed minimalist card */}
            <div className="absolute bottom-6 left-6 right-6 z-20 bg-[#050505]/80 backdrop-blur-md p-6 rounded-lg border border-zinc-900/40">
              <span className="text-[10px] uppercase font-mono tracking-widest text-brand-gold block mb-1">
                BWSA Heritage
              </span>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Photographing commercial masterpieces, weddings, and premium corporate campaigns under meticulous creative guidance, establishing permanent benchmarks across Africa.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-brand-gold">
                OUR MANIFESTO
              </span>
              <h2 className="font-display font-light text-3xl md:text-4xl text-zinc-100 tracking-tight leading-tight uppercase">
                Constructing clean visual authority
              </h2>
            </div>

            <p className="text-zinc-400 font-light leading-relaxed text-sm md:text-base">
              At Brain Works Studio Africa (BWSA), we eschew standard content volumes in favor of high-fidelity storytelling. Every pixel is rendered intentionally, and every camera move is motivated by the story's emotional center. 
              <br />
              <br />
              Whether capturing vibrant portrait sessions across Ghana, covering massive corporate events, or engineering documentary films for pioneering African brands, we capture the defining lines that convert casual viewers into lifelong advocates.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-zinc-900">
              <div className="space-y-2">
                <h4 className="font-display font-semibold text-zinc-200 text-sm uppercase tracking-wider flex items-center gap-2">
                  <Shield className="w-4 h-4 text-brand-gold" />
                  Absolute Integrity
                </h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Pruned quality indices, respecting visual silence and premium luxury spatial rules.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-display font-semibold text-zinc-200 text-sm uppercase tracking-wider flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-brand-gold" />
                  Cinematic Engineering
                </h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Employing reference anamorphic primetime lenses and industry-standard 8K structures.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* METRICS DISCIPLINE */}
        <section id="about-metrics" className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-16 px-8 rounded-xl bg-gradient-to-b from-zinc-950 to-[#030303] border border-zinc-900/60 mb-28 shadow-xl">
          {metrics.map((metric, i) => {
            const IconComp = metric.icon;
            return (
              <div key={i} className="text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-zinc-900/80 flex items-center justify-center border border-zinc-800/40 text-brand-gold mx-auto mb-2">
                  <IconComp className="w-5 h-5" />
                </div>
                <div className="font-display font-bold text-3xl md:text-4xl text-zinc-100 tracking-tight">
                  {metric.value}
                </div>
                <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
                  {metric.label}
                </div>
              </div>
            );
          })}
        </section>

        {/* THE EXPERT TEAM SECTION */}
        <section id="about-team-section" className="space-y-12 mb-28">
          <div className="text-center space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-brand-gold">
              THE ARTIFACT ENGINEERS
            </span>
            <h2 className="font-display font-light text-2xl md:text-4xl tracking-tight text-zinc-100 uppercase">
              CREATIVE STEWArDS
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
              Highly specialized individuals trained to direct lighting coordinates and package layouts with pixel-perfect control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, i) => (
              <div
                key={i}
                className="bg-zinc-950/40 border border-zinc-900/60 rounded-xl overflow-hidden hover:border-brand-gold/20 transition-all duration-300 group shadow-md"
              >
                {/* Monochrome image cover */}
                <div className="aspect-[4/5] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent z-10 opacity-60"></div>
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out select-none"
                    loading="lazy"
                  />
                </div>

                <div className="p-6 space-y-3">
                  <div>
                    <span className="text-xs text-brand-gold font-mono uppercase tracking-widest">
                      {member.role}
                    </span>
                    <h3 className="font-display font-medium text-lg text-zinc-200 uppercase mt-0.5">
                      {member.name}
                    </h3>
                  </div>

                  <p className="text-zinc-500 text-xs leading-relaxed font-light font-sans">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EQUIPMENT Bento Grid PANEL */}
        <section id="about-hardware-section" className="space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-brand-gold">
              PRODUCTION CALIBER
            </span>
            <h2 className="font-display font-light text-2xl md:text-4xl tracking-tight text-zinc-100 uppercase">
              TECHNICAL COORDINATES
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm max-w-lg mx-auto">
              Our in-house armamentarium of premier equipment guarantees raw reference resolution and unmatched color rendering capability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {equipmentList.map((item, i) => (
              <div
                key={i}
                className="p-8 bg-[#070707] border border-zinc-900 rounded-xl space-y-6 hover:border-brand-gold/15 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <Laptop className="w-5 h-5 text-brand-gold shrink-0" />
                  <h3 className="font-display font-semibold text-xs tracking-widest text-zinc-200 uppercase">
                    {item.category}
                  </h3>
                </div>
                
                <div className="h-[1px] bg-zinc-900 w-full"></div>

                <ul className="space-y-3">
                  {item.items.map((hardware, idx) => (
                    <li key={idx} className="space-y-1">
                      <p className="text-zinc-300 font-sans text-xs font-medium">
                        {hardware}
                      </p>
                      <span className="text-[9px] text-zinc-600 font-mono uppercase tracking-widest">
                        Studio Ready
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
