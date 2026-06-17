import React from 'react';
import { 
  Phone, 
  MapPin, 
  Navigation, 
  HeartHandshake, 
  BookOpen, 
  Home, 
  HelpCircle, 
  AlertTriangle,
  X,
  Search
} from 'lucide-react';

interface EmergencyVitalShieldProps {
  onClose?: () => void;
}

export function EmergencyVitalShield({ onClose }: EmergencyVitalShieldProps) {
  const emergencyNumbers = [
    { number: '112', label: 'General European Emergency', desc: 'Any crisis - Police, Fire, or Ambulance dispatcher.', accent: 'border-red-500/30 bg-red-500/5 hover:bg-red-500/10 text-red-400' },
    { number: '118', label: 'Medical Emergency / Ambulance', desc: 'Direct emergency medical technician routing.', accent: 'border-rose-500/30 bg-rose-500/5 hover:bg-rose-500/10 text-rose-400' },
    { number: '113', label: 'State Police (Polizia di Stato)', desc: 'Direct criminal safety line dispatcher.', accent: 'border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10 text-blue-400' },
    { number: '115', label: 'Fire Department (Vigili del Fuoco)', desc: 'Fire, rescue, and structural security assistance.', accent: 'border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10 text-amber-400' }
  ];

  const handleDial = (num: string) => {
    // Standard phone dialing tel anchor protocol
    window.location.href = `tel:${num}`;
  };

  const embassyCoords = 'Embassy of the United States, Via Vittorio Veneto 121, 00187 Roma RM, Italy';

  return (
    <div className="glass-panel p-5 flex flex-col gap-4 relative text-left" id="emergency-shield-modal-view">
      
      {/* Top Banner Row */}
      <div className="flex justify-between items-center border-b border-red-500/20 pb-3 leading-none">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-red-500/10 rounded-xl border border-red-500/25 text-red-500 shrink-0">
            <AlertTriangle className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <span className="text-[9px] font-mono font-black text-red-400 uppercase tracking-widest leading-none">
              Vital Shield Portal
            </span>
            <h3 className="text-sm font-black text-white uppercase tracking-tight mt-1 leading-none">
              🚨 Emergency Services & US Embassy
            </h3>
          </div>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
            id="close-emergency-modal-btn"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <p className="text-[11.5px] text-slate-400 font-semibold leading-relaxed">
        Rest easy on your trip! Having key official contact lines and protocols preloaded offline in your pocket removes any travel panic. Tap any red number card to directly initiate a dial loop on your phone.
      </p>

      {/* 1. LOCAL CRISIS LINES */}
      <div className="flex flex-col gap-2.5">
        <span className="text-[9.5px] font-mono tracking-wider font-extrabold uppercase text-slate-500">
          Critical Italian Emergency Dispatch Nodes:
        </span>
        
        <div className="flex flex-col gap-2">
          {emergencyNumbers.map((item) => (
            <button
              key={item.number}
              onClick={() => handleDial(item.number)}
              className={`border p-3 rounded-xl flex items-center justify-between text-left transition-all active:scale-98 cursor-pointer gap-2 ${item.accent}`}
              id={`dial-card-${item.number}`}
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-black uppercase font-mono tracking-wider">
                  {item.label}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold leading-normal">
                  {item.desc}
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 py-1 px-2.5 rounded-lg border border-white/5 font-mono text-sm font-black">
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span>{item.number}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 2. US EMBASSY ROME INTEL */}
      <div className="bg-slate-950/40 p-4 rounded-xl border border-white/5 flex flex-col gap-2.5">
        <div className="flex items-center gap-1.5 text-xs font-black text-sky-400 uppercase tracking-wider leading-none">
          <HeartHandshake className="w-4 h-4 text-sky-450 shrink-0" />
          <span>United States Embassy (Rome)</span>
        </div>

        <p className="text-[11px] text-slate-400 leading-normal font-semibold">
          Lost passports, urgent consular crises, civil emergencies, or sudden citizen assistance needs. They are located centrally in Rome with active 24/7 citizen guards.
        </p>

        <div className="bg-slate-900 p-3 rounded-lg border border-white/5 flex flex-col gap-2 text-[11.5px]">
          {/* Address */}
          <div className="flex flex-col gap-1">
            <span className="text-[8px] font-mono uppercase text-slate-550 font-extrabold">Embassy Address</span>
            <div className="flex justify-between items-start gap-4">
              <span className="font-bold text-slate-200">Via Vittorio Veneto, 121, 00187 Roma RM</span>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(embassyCoords)}`}
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="bg-sky-500/15 hover:bg-sky-500/25 text-sky-400 border border-sky-500/25 p-1 rounded transition-colors shrink-0"
                id="embassy-routing-link"
              >
                <Navigation className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="h-[1px] bg-white/5 my-1" />

          {/* Critical Phone Numbers */}
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-[8px] font-mono uppercase text-slate-550 font-extrabold">24/7 Citizen Emergency Registry Line</span>
              <span className="font-bold text-slate-200">+39 06&nbsp;46741</span>
            </div>
            <button
              onClick={() => handleDial('+390646741')}
              className="bg-white/5 hover:bg-white/10 text-slate-250 py-1 px-2.5 border border-white/5 rounded-lg text-[10px] font-extrabold uppercase flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Phone className="w-3 h-3 text-slate-405" /> Dial
            </button>
          </div>
        </div>
      </div>

      {/* 3. PHARMACY rotational GUIDES */}
      <div className="bg-[#121c17] p-4 rounded-xl border border-emerald-500/10 flex flex-col gap-2.5">
        <div className="flex items-center gap-1.5 text-xs font-black text-emerald-400 uppercase tracking-wider leading-none">
          <BookOpen className="w-4 h-4 text-emerald-450 shrink-0" />
          <span>Farmacia di Turno (24H Guide)</span>
        </div>

        <p className="text-[11px] text-slate-400 leading-relaxed font-semibold">
          In Italy, pharmacies rotate overnight shifts (<strong className="text-emerald-400">Farmacia di Turno</strong>). By law, every closed pharmacy posts an official printed roster on their glass door specifying which nearest locations are open right now. Look for the <strong className="text-emerald-400">flashing bright green cross</strong> neon light at night!
        </p>

        {/* Search nearby button */}
        <a
          href="https://www.google.com/maps/search/?api=1&query=farmacia"
          target="_blank"
          rel="noopener noreferrer"
          referrerPolicy="no-referrer"
          className="bg-emerald-500/10 hover:bg-emerald-500/25 text-emerald-400 hover:text-emerald-300 border border-emerald-500/20 text-xs font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer w-full text-center"
          id="search-nearby-pharmacies"
        >
          <Search className="w-4 h-4 text-emerald-400" />
          <span>Search Nearby Pharmacies on Maps</span>
        </a>

        {/* Cheat vocabulary cards */}
        <div className="flex flex-col gap-1.5 border-t border-white/5 pt-2.5 text-[11px] font-bold">
          <span className="text-[8px] font-mono uppercase text-slate-550 font-extrabold mb-1">Over-the-Counter Italian Phrases:</span>
          
          <div className="flex justify-between items-center border-b border-white/5 pb-1 gap-2 text-left">
            <span className="text-slate-300 font-medium">&ldquo;Nearest night pharmacy?&rdquo;</span>
            <span className="text-emerald-400 font-black italic">&ldquo;La farmacia di turno più vicina?&rdquo;</span>
          </div>

          <div className="flex justify-between items-center border-b border-white/5 pb-1 gap-2 text-left">
            <span className="text-slate-300 font-medium">&ldquo;I need a painkiller/ibuprofen.&rdquo;</span>
            <span className="text-emerald-400 font-black italic">&ldquo;Ho bisogno di un antidolorifico/ibuprofene.&rdquo;</span>
          </div>

          <div className="flex justify-between items-center gap-2 text-left">
            <span className="text-slate-300 font-medium">&ldquo;Can I buy this without prescription?&rdquo;</span>
            <span className="text-emerald-400 font-black italic">&ldquo;Posso comprarlo senza ricetta?&rdquo;</span>
          </div>
        </div>
      </div>

    </div>
  );
}
