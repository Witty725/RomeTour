import React, { useState } from 'react';
import { 
  CloudSun, 
  MapPin, 
  Copy, 
  Check, 
  Calendar, 
  Wifi
} from 'lucide-react';
import { 
  romeItinerary, 
  RomeDay 
} from '../data';

export function HomeDashboard() {
  const [selectedDayIdx, setSelectedDayIdx] = useState<number>(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeDay: RomeDay = romeItinerary[selectedDayIdx];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn" id="home-dashboard-root">
      
      {/* 1. US CITIZEN WEATHER HUB */}
      <div className="glass-accent p-4 relative overflow-hidden flex flex-col gap-3 rounded-2xl border border-rose-500/10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-rose-500/10 to-transparent rounded-full -mr-8 -mt-8 pointer-events-none" />
        
        <div className="flex justify-between items-center bg-transparent">
          <div className="flex items-center gap-2">
            <CloudSun className="w-5 h-5 text-rose-400 animate-pulse-subtle" />
            <span className="font-serif font-black text-sm uppercase text-slate-100 tracking-tight">Weather Station Rome</span>
          </div>
          <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono py-0.5 px-2.5 rounded-full font-black uppercase">
            Live Feed
          </span>
        </div>

        <div className="flex justify-between items-center pt-1 border-b border-white/5 pb-3">
          <div className="flex flex-col">
            <span className="text-3xl font-mono font-black text-rose-400 leading-none">87°F</span>
            <span className="text-[10px] text-slate-400 font-semibold uppercase font-mono tracking-wider mt-1.5 leading-none">
              Feels Like 92°F
            </span>
          </div>

          <div className="flex flex-col border-l border-white/10 pl-4 text-right">
            <span className="text-sm font-black text-slate-100 uppercase tracking-tight">Sunny & Clear</span>
            <span className="text-[10px] text-rose-300 font-bold font-mono tracking-wide mt-1 animate-pulse">
              UV Index: 9 (Very High)
            </span>
          </div>
        </div>

        {/* US-Familiar Metrics */}
        <div className="grid grid-cols-3 gap-2.5 text-[11px] font-semibold text-slate-300">
          <div className="bg-white/5 py-1.5 px-2.5 rounded-xl border border-white/5 flex flex-col leading-none">
            <span className="text-[8px] text-slate-500 uppercase tracking-wider font-mono">High Temp</span>
            <span className="font-mono text-slate-100 mt-1 font-bold">91°F</span>
          </div>
          
          <div className="bg-white/5 py-1.5 px-2.5 rounded-xl border border-white/5 flex flex-col leading-none">
            <span className="text-[8px] text-slate-500 uppercase tracking-wider font-mono">Low Temp</span>
            <span className="font-mono text-slate-100 mt-1 font-bold">68°F</span>
          </div>

          <div className="bg-white/5 py-1.5 px-2.5 rounded-xl border border-white/5 flex flex-col leading-none">
            <span className="text-[8px] text-slate-500 uppercase tracking-wider font-mono">Wind Speed</span>
            <span className="font-mono text-slate-100 mt-1 font-bold">6 mph N</span>
          </div>
        </div>

        <div className="text-[10.5px] text-slate-400 leading-normal font-medium bg-black/30 p-2 rounded-lg border border-white/5">
          💡 <strong className="text-amber-500 font-mono">Advisory:</strong> Highest summer sun is from 12PM to 4PM. Drink lots of water from <span className="text-rose-400 font-bold underline">Nasoni public fountains</span>!
        </div>
      </div>

      {/* 🚀 OFFLINE TRAVEL VAULT BANNER */}
      <div className="glass p-3.5 relative overflow-hidden flex items-center justify-between gap-3 rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.01]">
        <div className="absolute top-0 right-0 w-24 h-24 bg-radial from-emerald-500/5 to-transparent rounded-full -mr-6 -mt-6 pointer-events-none" />
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
            <Wifi className="w-4 h-4 shrink-0" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[9px] font-mono font-black uppercase text-emerald-400 tracking-wider">OFFLINE VAULT SHIELD ACTIVE</span>
            <span className="text-xs font-semibold text-slate-205 mt-0.5 leading-tight">All digital tickets, maps & details pre-cached local</span>
          </div>
        </div>
        <div className="flex shrink-0">
          <span className="text-[9px] font-mono font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase leading-none">
            Offline 100%
          </span>
        </div>
      </div>

      {/* 2. AT-A-GLANCE DAILY SUMMARY & MAPS ACTION */}
      <div className="flex flex-col gap-3.5" id="daily-summary-section">
        <h3 className="text-xs uppercase font-mono tracking-widest text-slate-400 font-black flex items-center gap-1.5 leading-none">
          <Calendar className="w-4 h-4 text-rose-500" />
          <span>🗓️ Day Digest</span>
        </h3>

        <div className="flex flex-col gap-3">
          {/* Day selection tabs */}
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 backdrop-blur-md">
            {romeItinerary.map((day, idx) => {
              const isSelected = selectedDayIdx === idx;
              return (
                <button
                  key={day.dayNumber}
                  onClick={() => setSelectedDayIdx(idx)}
                  className={`flex-1 py-2 text-center rounded-lg transition-all text-xs font-black uppercase tracking-tight cursor-pointer ${
                    isSelected 
                      ? 'bg-rose-500/20 text-rose-450 border border-rose-500/30 font-bold' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                  id={`summary-day-btn-${day.dayNumber}`}
                >
                  Day {day.dayNumber}
                </button>
              );
            })}
          </div>

          {/* Selected Day Narrative */}
          <div className="glass p-4 rounded-xl border border-white/5 flex flex-col gap-3 text-left">
            <div className="flex justify-between items-start leading-none gap-2">
              <div className="text-left">
                <span className="text-[9px] font-mono font-black uppercase tracking-wider text-rose-400">
                  {activeDay.date}
                </span>
                <h4 className="text-sm font-black text-slate-100 mt-1 leading-snug">
                  {activeDay.theme}
                </h4>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-semibold text-left">
              {activeDay.narrative}
            </p>

            <div className="w-full bg-white/5 h-[1px] my-1" />

            {/* Chronological checklist of key events for this day */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono tracking-wider font-extrabold uppercase text-slate-500">
                Checklist & Vouchers
              </span>

              {activeDay.activities.map((act) => (
                <div 
                  key={act.id}
                  className="bg-slate-950/40 p-3 rounded-lg border border-white/5 flex flex-col gap-2 hover:border-white/10 transition-colors"
                  id={`digest-item-${act.id}`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                      <span className="text-xs font-bold text-slate-200">{act.time} • {act.title}</span>
                    </div>
                    {act.confirmation && (
                      <span className="text-[10px] font-mono bg-rose-500/10 text-rose-400 px-1.5 py-0.5 rounded border border-rose-500/20 leading-none">
                        {act.confirmation.split(': ')[1] || act.confirmation}
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-400 pl-4 font-normal leading-normal">
                    {act.description}
                  </p>

                  {/* Direct Google Maps launch button! */}
                  <div className="flex flex-wrap gap-2 pl-4 mt-0.5">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${act.title}, ${act.location}, Rome`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      referrerPolicy="no-referrer"
                      className="bg-sky-500/15 hover:bg-sky-500/25 text-sky-400 hover:text-sky-350 border border-sky-500/20 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 transition-colors cursor-pointer"
                      id={`summary-map-redirect-${act.id}`}
                    >
                      <MapPin className="w-3 h-3 text-sky-400 shrink-0" />
                      <span>Google Maps Route</span>
                    </a>
                    
                    {act.confirmation && (
                      <button
                        onClick={() => handleCopy(act.confirmation || '', act.id)}
                        className="bg-white/5 hover:bg-white/10 text-slate-355 hover:text-slate-205 border border-white/5 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 transition-all cursor-pointer"
                        id={`summary-copy-btn-${act.id}`}
                      >
                        {copiedId === act.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-500" />}
                        <span>{copiedId === act.id ? 'Copied' : 'Copy Code'}</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
