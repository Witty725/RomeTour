import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  MapPin, 
  Sparkles, 
  Trash2, 
  Check, 
  Camera, 
  Download, 
  X, 
  ChevronRight, 
  FolderHeart,
  Share2
} from 'lucide-react';

export interface ScavengerMission {
  id: string;
  day: number;
  title: string;
  location: string;
  description: string;
  hint: string;
}

export const SCAVENGER_MISSIONS: ScavengerMission[] = [
  {
    id: 'day1-1',
    day: 1,
    title: 'First Rome Sip',
    location: 'Piazza Navona',
    description: 'Enjoying our first evening Aperol Spritz together inside Piazza Navona 🍹',
    hint: 'Look for an outdoor cafe table with a sweeping perspective of Bernini\'s central Fountain.'
  },
  {
    id: 'day1-2',
    day: 1,
    title: 'Spanish Steps Seating',
    location: 'Spanish Steps',
    description: 'Take a romantic selfie sitting hand-in-hand halfway up the Spanish Steps after dark 🌌',
    hint: 'Frame the glowing Trinità dei Monti church twin towers in the nighttime background.'
  },
  {
    id: 'day2-1',
    day: 2,
    title: 'Selfie with a Lion Cage',
    location: 'Colosseum Underground',
    description: 'Colosseum Underground Selfie near the ancient wood cages & tunnels 🦁',
    hint: 'Pristinely frame the ancient wood pulley lifts and heavy gated stone cells.'
  },
  {
    id: 'day2-2',
    day: 2,
    title: 'Imperial Valley Overlook',
    location: 'Palatine Overlook',
    description: 'Breathtaking Roman Forum panoramic view holding hands over the valley overlook 🏛️',
    hint: 'Stand at the north edge of the Palatine ruins to capture the bricks of the Curia below.'
  },
  {
    id: 'day2-3',
    day: 2,
    title: 'Roman Candle-Lit Toast',
    location: 'Trattoria Saporito',
    description: 'Ask your server to take a picture of you two on our date on the first night 🍷',
    hint: 'Hold your red wine glasses clinking together with the glowing table candle in between.'
  },
  {
    id: 'day3-1',
    day: 3,
    title: 'St. Peter\'s Dome Frame',
    location: 'St. Peter\'s Square',
    description: 'A grand selfie framing the massive dome arches from the epic Vatican Square ⛪',
    hint: 'Step backwards near the focal Egyptian obelisk to capture the circular pillars.'
  },
  {
    id: 'day3-2',
    day: 3,
    title: 'Sunset Kiss Panoramic',
    location: 'Janiculum Hill Panoramic',
    description: 'A kiss portrait at the high Janiculum Hill overlook with the Roman skyline behind us 🌅',
    hint: 'Stand near the viewing telescope fence during the 8:30 PM Golden hour.'
  },
  {
    id: 'day3-3',
    day: 3,
    title: 'Trastevere Fairy Lanes',
    location: 'Trastevere Alleyways',
    description: 'Strolling couples shot underneath the hanging ivy and romantic fairy lights 🌿',
    hint: 'Locate a cobblestone lane between Via del Moro and Piazza Santa Maria.'
  },
  {
    id: 'day4-1',
    day: 4,
    title: 'Trevi Fountain Tossing',
    location: 'Trevi Fountain',
    description: 'Trevi Fountain split-second shot of us tossing a coin while kissing 🪙',
    hint: 'Toss with your right hand over your left shoulder for historical Roman good luck.'
  },
  {
    id: 'day4-2',
    day: 4,
    title: 'Oculus Alignment Shot',
    location: 'Pantheon Interior',
    description: 'Selfie looking direct upward to match the ancient open dome skylight oculus 🏛️',
    hint: 'Wait until the midday sunbeam slants perfectly diagonally across the golden marble floor.'
  },
  {
    id: 'day4-3',
    day: 4,
    title: 'Gelato Bite For Two',
    location: 'Giolitti Gelateria',
    description: 'Feeding each other the final creamy spoons of rich handcrafted Roman Gelato 🍦',
    hint: 'Show off matching colorful fruit flavors with the high-vault historical cafe logo behind.'
  }
];

interface RomeMemoryVaultProps {
  onClose?: () => void;
}

export function RomeMemoryVault({ onClose }: RomeMemoryVaultProps) {
  const [selectedTab, setSelectedTab] = useState<'all' | 'day1' | 'day2' | 'day3' | 'day4'>('all');
  const [photos, setPhotos] = useState<Record<string, string>>({});
  const fileInputRef = useRef<Record<string, HTMLInputElement | null>>({});

  // Sync photos with local storage persistently
  useEffect(() => {
    const saved = localStorage.getItem('rome-scavenger-hunt-photos');
    if (saved) {
      try {
        setPhotos(JSON.parse(saved));
      } catch (err) {
        console.error('Failed to parse scavenger hunt pictures', err);
      }
    }
  }, []);

  // Optimized base64 image resizer to keep localStorage footprint ultra-safe (<50KB per image)
  const handlePhotoUpload = (missionId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 500; // Optimal portrait width
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7); // 70% quality keeps average picture under 45KB!
          
          const newPhotos = { ...photos, [missionId]: compressedBase64 };
          setPhotos(newPhotos);
          localStorage.setItem('rome-scavenger-hunt-photos', JSON.stringify(newPhotos));
        }
      };
    };
  };

  const handleRemovePhoto = (missionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Do you want to delete this treasure memory from our adventure hunt?')) {
      const newPhotos = { ...photos };
      delete newPhotos[missionId];
      setPhotos(newPhotos);
      localStorage.setItem('rome-scavenger-hunt-photos', JSON.stringify(newPhotos));
    }
  };

  const downloadSinglePhoto = (photoBase64: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = photoBase64;
    link.download = `roma_couples_scavenger_${title.toLowerCase().replace(/\s+/g, '_')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Compile and download completed Polaroids into a styled offline HTML binder
  const exportFullScrapbook = () => {
    const completedMissions = SCAVENGER_MISSIONS.filter(m => photos[m.id]);
    if (completedMissions.length === 0) {
      alert('Toss some coins! Upload at least one memory photo to export our digital scrapbook scrapbook.');
      return;
    }

    const scrapbookHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Our Rome Travel Scavenger Scrapbook 📸</title>
  <style>
    body {
      background-color: #0b0f19;
      color: #fafafa;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
      padding: 50px 20px;
      margin: 0;
      text-align: center;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
    }
    h1 {
      font-family: Georgia, Garamond, serif;
      font-size: 3rem;
      font-style: italic;
      color: #fda4af;
      margin-bottom: 5px;
    }
    p.subtitle {
      color: #64748b;
      font-size: 1.1rem;
      font-weight: 500;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-bottom: 50px;
    }
    .scrapbook-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 40px;
      margin-top: 20px;
    }
    .polaroid {
      background: #fdfbf7;
      padding: 16px 16px 36px 16px;
      border-radius: 4px;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
      color: #1c1917;
      max-width: 310px;
      transform: rotate(var(--rot));
      transition: transform 0.3s;
    }
    .polaroid:hover {
      transform: scale(1.06) rotate(0deg) !important;
      z-index: 10;
    }
    .photo-area {
      width: 100%;
      height: 230px;
      object-fit: cover;
      border: 1px solid rgba(0,0,0,0.06);
      border-radius: 2px;
    }
    .title {
      font-family: "Courier New", Courier, monospace;
      font-weight: 800;
      font-size: 1.1rem;
      margin-top: 18px;
      text-transform: uppercase;
      letter-spacing: 0.02em;
    }
    .meta {
      font-family: -apple-system, sans-serif;
      font-size: 0.75rem;
      color: #e11d48;
      margin-top: 8px;
      font-weight: 800;
      letter-spacing: 0.05em;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Our Roman Scrapbook</h1>
    <p class="subtitle">Pictures Scavenger Hunt • Completed: ${completedMissions.length} of ${SCAVENGER_MISSIONS.length}</p>
    <div class="scrapbook-grid">
      ${completedMissions.map((m, idx) => {
        const rotations = [-3, 2, -1.5, 3, -2.5, 1.8];
        const rot = rotations[idx % rotations.length];
        return `
        <div class="polaroid" style="--rot: ${rot}deg">
          <img src="${photos[m.id]}" class="photo-area" alt="${m.title}" />
          <div class="title">${m.title}</div>
          <div class="meta">Day ${m.day} • ${m.location}</div>
        </div>
        `;
      }).join('')}
    </div>
  </div>
</body>
</html>
    `;

    const blob = new Blob([scrapbookHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Our_Roman_Scavenger_Scrapbook.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredMissions = SCAVENGER_MISSIONS.filter(m => {
    if (selectedTab === 'all') return true;
    return `day${m.day}` === selectedTab;
  });

  const totalCompleted = SCAVENGER_MISSIONS.filter(m => photos[m.id]).length;
  const progressPercent = Math.round((totalCompleted / SCAVENGER_MISSIONS.length) * 100);

  return (
    <div className="glass-panel p-5 flex flex-col gap-4 relative text-left" id="memory-vault-modal-view">
      
      {/* Top Banner Row */}
      <div className="flex justify-between items-center border-b border-white/10 pb-3 leading-none">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-rose-500/10 rounded-xl border border-rose-500/25 text-rose-405">
            <FolderHeart className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[9px] font-mono font-black text-rose-400 uppercase tracking-widest leading-none">
              Couple Quest Active
            </span>
            <h3 className="text-sm font-black text-white uppercase tracking-tight mt-1 leading-none">
              📸 Rome Scavenger Hunt
            </h3>
          </div>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
            id="close-vault-modal-btn"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <p className="text-[11.5px] text-slate-400 font-semibold leading-relaxed">
        Let&rsquo;s fill our Roman Scrapbook together! Spot the romantic locations during our itinerary, take corresponding pictures, and upload them below. Everything saves completely offline and secure on your device.
      </p>

      {/* Progress Metrics Bar */}
      <div className="bg-slate-950/50 p-3.5 rounded-xl border border-white/5 flex flex-col gap-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-slate-300">Scrapbook Progress bar</span>
          <span className="font-mono text-rose-400 font-extrabold">{totalCompleted} / {SCAVENGER_MISSIONS.length} Photos</span>
        </div>
        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/10 relative">
          <motion.div 
            className="bg-gradient-to-r from-rose-500 to-amber-500 h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
        <div className="flex justify-between items-center mt-1 pt-1 border-t border-white/5 text-[11px] font-bold">
          <span className="text-slate-400">Completion: {progressPercent}%</span>
          {totalCompleted > 0 && (
            <button
              onClick={exportFullScrapbook}
              className="text-rose-400 flex items-center gap-1 hover:text-rose-350 cursor-pointer transition-colors"
              id="export-scrapbook-btn"
            >
              <Share2 className="w-3 h-3 text-rose-455" />
              <span>Export Couple Scrapbook</span>
            </button>
          )}
        </div>
      </div>

      {/* Day Selector Pills */}
      <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 backdrop-blur-md gap-1 overflow-x-auto scrollbar-none flex-nowrap">
        {(['all', 'day1', 'day2', 'day3', 'day4'] as const).map((tab) => {
          const isSelected = selectedTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`flex-1 py-1.5 text-[10.5px] font-black uppercase rounded-lg transition-all cursor-pointer text-center leading-none px-3 shrink-0 ${
                isSelected
                  ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                  : 'text-slate-405 hover:text-slate-200'
              }`}
            >
              {tab === 'all' ? 'All Days' : `Day ${tab.replace('day', '')}`}
            </button>
          );
        })}
      </div>

      {/* Missions Grid/List */}
      <div className="flex flex-col gap-4 max-h-[480px] overflow-y-auto pr-1 scrollbar-thin">
        <AnimatePresence mode="popLayout">
          {filteredMissions.map((m) => {
            const uploadedPhoto = photos[m.id];
            return (
              <motion.div
                key={m.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-slate-950/30 p-3 rounded-2xl border border-white/5 flex flex-col gap-3 relative hover:border-white/10 transition-all text-left"
                id={`scavenger-item-${m.id}`}
              >
                <div className="flex justify-between items-start leading-none">
                  <div>
                    <span className="text-[9px] font-mono uppercase bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded-md font-bold">
                      Day {m.day} • {m.location}
                    </span>
                    <h4 className="text-xs font-black text-slate-100 uppercase tracking-wide mt-1.5">
                      {m.title}
                    </h4>
                  </div>
                  {uploadedPhoto && (
                    <span className="p-1 bg-emerald-500/10 rounded-full border border-emerald-500/30 text-emerald-400">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed font-semibold">
                  {m.description}
                </p>

                {/* Picture Box */}
                {uploadedPhoto ? (
                  /* Polaroid Presentation Box */
                  <div className="bg-[#fcfbf9] p-2.5 rounded-xl border border-black/10 shadow-lg flex flex-col items-center gap-2 mx-auto w-full max-w-[280px]">
                    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-black/5 bg-stone-900">
                      <img 
                        src={uploadedPhoto} 
                        className="w-full h-full object-cover" 
                        alt={m.title} 
                      />
                      <button
                        onClick={(e) => handleRemovePhoto(m.id, e)}
                        className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-rose-600/90 rounded-full text-white transition-colors cursor-pointer border border-white/10"
                        title="Delete Photocard"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-center font-mono font-black text-[10.5px] text-stone-800 tracking-wide leading-none pb-1 uppercase py-0.5">
                      &hearts; {m.title} &hearts;
                    </div>
                    <div className="flex gap-2.5 w-full border-t border-stone-200/50 pt-2 font-black text-[9px] text-[#e11d48] uppercase tracking-wider justify-center">
                      <button
                        onClick={(e) => downloadSinglePhoto(uploadedPhoto, m.title, e)}
                        className="flex items-center gap-1 hover:text-rose-800 cursor-pointer"
                        id={`download-single-${m.id}`}
                      >
                        <Download className="w-3 h-3" />
                        <span>Download Polaroid</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Upload Prompt Trigger area */
                  <div 
                    onClick={() => fileInputRef.current[m.id]?.click()}
                    className="border border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center gap-2 cursor-pointer hover:border-rose-500/30 hover:bg-rose-500/[0.01] transition-all bg-black/20"
                    id={`upload-box-${m.id}`}
                  >
                    <Camera className="w-6 h-6 text-slate-500 animate-pulse" />
                    <div className="flex flex-col leading-tight p-0.5">
                      <span className="text-[11px] font-black uppercase text-slate-300">Tap to Scan / Upload Photo</span>
                      <span className="text-[9px] text-slate-505 font-mono font-medium mt-0.5 italic">
                        Hint: {m.hint}
                      </span>
                    </div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      ref={el => fileInputRef.current[m.id] = el}
                      onChange={(e) => handlePhotoUpload(m.id, e)}
                      className="hidden" 
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

    </div>
  );
}
