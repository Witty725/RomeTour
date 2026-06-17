import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Sparkles, AlertCircle, CheckCircle2, Navigation, Check, ChevronRight, PhoneCall, Smartphone } from 'lucide-react';
import { neighborhoodNavigationTricks } from '../data';

interface SecurityCheck {
  id: string;
  label: string;
  description: string;
}

const couplesStreetChecklist: SecurityCheck[] = [
  { id: 'sc-1', label: 'Walking Footwear', description: 'Double check if we both have well broken-in walking sneakers or thick strappy sandals.' },
  { id: 'sc-2', label: 'Hydration Vessels', description: 'Do we have reusable bottles packed in our bags to load up for free at Nasoni fountains?' },
  { id: 'sc-3', label: 'Offline Logistics Maps', description: 'Install Uber, FreeNow, or it Taxi from the App store prior to landing.' },
  { id: 'sc-4', label: 'Linen Shawls / Scarf', description: 'Pack one lightweight linen shawl or long wrap inside our daypack for sudden Church visits.' },
  { id: 'sc-5', label: 'Passports & ID copies', description: 'Save a digital photocopy of our US Passports to cloud drive and keep physical IDs handy.' }
];

interface TaxiAppInfo {
  name: string;
  badge: string;
  description: string;
  pros: string;
  bestFor: string;
}

const italyTaxiApps: TaxiAppInfo[] = [
  {
    name: "FREE NOW (MyTaxi)",
    badge: "Vetted White Taxis",
    description: "The most widely used taxi booking app in Rome. Locks in upfront price estimations, tracks your approaching vehicle, and charges your registered credit card directly inside the app.",
    pros: "Safe metered rides, no bill arguments, dual language layout.",
    bestFor: "Standard rides from monuments back to Hilton lodging."
  },
  {
    name: "it Taxi",
    badge: "Official Taxi Union App",
    description: "The national app representing primary dispatch networks (e.g. 3570 team). Best availability in Rome because it bypasses intermediaries to dispatch cars directly from unions.",
    pros: "Superior dispatch availability in rainy or high-demand schedules.",
    bestFor: "Rush hour transits, crowded events, or tight dinner timelines."
  },
  {
    name: "Uber (Premium Black & Vans)",
    badge: "Luxury Private Drivers",
    description: "Standard peer-to-peer UberX is illegal in Italy. In the Uber app, you can book licensed luxury private drivers (NCC - Noleggio con Conducente). High premium vehicles (Mercedes, Audis).",
    pros: "Perfect English-speaking drivers, flawless luxury, immaculate cars.",
    bestFor: "Comfortable transits or special date-night excursions."
  },
  {
    name: "WeTaxi",
    badge: "Upfront Cost Cap",
    description: "Provides a guaranteed maximum price cap for your trip. If the taximeter ends up cheaper, you pay the lower amount. If it goes higher, we pay only the capped fee.",
    pros: "Absolute budget guardrail. Split fare payments with couples.",
    bestFor: "Budget clarity with zero risk of meter detours."
  }
];

export function SecretsTips() {
  const [checkedList, setCheckedList] = useState<Record<string, boolean>>({});
  const [activeTrickIdx, setActiveTrickIdx] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('rome-couple-street-checklist');
    if (saved) {
      try { setCheckedList(JSON.parse(saved)); } catch (_) {}
    }
  }, []);

  const toggleCheck = (id: string) => {
    const nextStates = { ...checkedList, [id]: !checkedList[id] };
    setCheckedList(nextStates);
    localStorage.setItem('rome-couple-street-checklist', JSON.stringify(nextStates));
  };

  const scoreCompleted = Object.values(checkedList).filter(Boolean).length;
  const progressPercent = Math.round((scoreCompleted / couplesStreetChecklist.length) * 100) || 0;

  return (
    <div className="flex flex-col gap-5 animate-fadeIn" id="secrets-tips-root">
      
      {/* Tab Visual Title */}
      <div className="glass-accent p-4 flex items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2.5">
          <Compass className="w-5 h-5 text-rose-455" />
          <div className="flex flex-col">
            <span className="text-[10px] font-mono tracking-wider font-extrabold text-rose-450 uppercase leading-none">Local Navigation & Apps</span>
            <span className="text-sm font-black text-white mt-1 uppercase tracking-tight">Essential Rome Tips</span>
          </div>
        </div>
        <Sparkles className="w-4.5 h-4.5 text-rose-450 shrink-0" />
      </div>

      {/* Italy Car Service & Taxi App download suite */}
      <div className="glass p-5 rounded-2xl border border-white/5 flex flex-col gap-4 shadow-xl">
        <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
          <Smartphone className="w-5 h-5 text-rose-405 shrink-0 animate-pulse" />
          <div className="flex flex-col">
            <h3 className="text-sm font-black text-slate-100 uppercase tracking-tight leading-none">Italy Car Service App Suite</h3>
            <span className="text-[10px] text-slate-400 font-medium mt-1">Download these before landing to bypass airport and street scammers</span>
          </div>
        </div>

        {/* Informative Note Box */}
        <div className="bg-amber-500/[0.04] border border-amber-500/20 p-3 rounded-xl flex items-start gap-2.5 text-[11px] text-amber-300 leading-relaxed font-semibold">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-extrabold uppercase font-mono tracking-wider block mb-0.5">Crucial Ride-Hailing Rules (Rome):</span>
            Italian law prohibits hailing street-side private cars. Regular cabs are licensed <span className="text-white underline decoration-amber-500 font-extrabold">White Taxis</span> with official rates & meters. Never accept rides from drivers waving their hands whispering "Taxi?" inside arrivals terminals!
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-1.5">
          {italyTaxiApps.map((app, aIdx) => (
            <div 
              key={aIdx} 
              className="bg-white/[0.02] border border-white/5 p-3 rounded-xl flex flex-col gap-1.5 hover:border-white/10 transition-colors"
            >
              <div className="flex justify-between items-center gap-2">
                <span className="text-xs font-black text-slate-100 uppercase tracking-wide">{app.name}</span>
                <span className="text-[9px] font-mono font-black text-rose-420 bg-rose-500/10 border border-rose-500/15 py-0.5 px-2 rounded-full">{app.badge}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                {app.description}
              </p>
              <div className="flex flex-col gap-0.5 text-[10.5px] border-t border-white/5 pt-1.5 mt-1">
                <div className="font-medium text-slate-400">
                  <span className="font-black text-rose-400 uppercase font-mono text-[9px] tracking-wide">Key Pro:</span> {app.pros}
                </div>
                <div className="font-medium text-slate-400 mt-0.5">
                  <span className="font-black text-amber-400 uppercase font-mono text-[9px] tracking-wide">Best For:</span> {app.bestFor}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Secrets Interactive Cards list */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider pl-1 font-mono">Neighborhood Hidden Secrets</h3>
        {neighborhoodNavigationTricks.map((trick, idx) => {
          const isOpen = activeTrickIdx === idx;
          return (
            <div
              key={idx}
              onClick={() => setActiveTrickIdx(isOpen ? null : idx)}
              className={`p-4 rounded-xl border flex flex-col gap-2.5 transition-all cursor-pointer hover:border-white/20 select-none ${
                isOpen 
                  ? 'bg-rose-500/[0.02] border-rose-500/30 shadow-md' 
                  : 'glass'
              }`}
              id={`trick-card-${idx}`}
            >
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-black text-slate-100 uppercase tracking-tight flex items-center gap-2.5 leading-none">
                  <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                  <span>{trick.title}</span>
                </h4>
                <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-90 text-rose-400' : ''}`} />
              </div>

              <p className="text-xs text-slate-350 leading-relaxed font-normal">
                {trick.description}
              </p>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.15 }}
                    className="mt-1 border-t border-white/5 pt-3"
                  >
                    <div className="flex items-start gap-2.5 bg-white/5 p-3 rounded-lg border border-white/5 text-[11px] text-rose-300 leading-relaxed font-semibold">
                      <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                      <div>
                        <span className="font-extrabold text-[10px] uppercase font-mono tracking-wider block mb-1 text-rose-400">Couples Action Cheat:</span>
                        {trick.trick}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Interactive Preparedness checklist for Couples street walking */}
      <div className="glass-panel p-5 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4.5 h-4.5 text-rose-400 shrink-0" />
            <h3 className="text-sm font-black text-slate-100 uppercase tracking-wide">
              Daily Street-Ready Checklist
            </h3>
          </div>
          
          <span className="font-mono text-[10px] font-black text-rose-400 bg-rose-500/10 py-0.5 px-2.5 rounded border border-rose-500/20">
            Vetted: {scoreCompleted} / {couplesStreetChecklist.length} ({progressPercent}%)
          </span>
        </div>

        {/* Packing meter timeline visual */}
        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden border border-white/5 leading-none">
          <div 
            className="bg-rose-455 h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex flex-col gap-2.5">
          {couplesStreetChecklist.map(sc => {
            const isChecked = !!checkedList[sc.id];
            return (
              <button
                key={sc.id}
                onClick={() => toggleCheck(sc.id)}
                className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-colors cursor-pointer ${
                  isChecked 
                    ? 'bg-emerald-500/5 border-emerald-500/20 opacity-70' 
                    : 'glass hover:border-white/20'
                }`}
                id={`checklist-btn-${sc.id}`}
              >
                <div className={`mt-0.5 shrink-0 ${isChecked ? 'text-emerald-400' : 'text-slate-550'}`}>
                  {isChecked ? <Check className="w-4 h-4" /> : <div className="w-4 h-4 rounded-sm border border-white/10" />}
                </div>

                <div className="flex flex-col gap-0.5">
                  <span className={`text-xs font-black ${isChecked ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                    {sc.label}
                  </span>
                  <span className="text-[10.5px] text-slate-400 font-medium leading-relaxed">
                    {sc.description}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
