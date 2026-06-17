import React, { useState, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  diningBucketList, 
  romanticEveningRoutes, 
  colosseumDiningGems,
  vaticanDiningGems,
  hotelDiningGems,
  ColosseumVenue,
  DiningSpot, 
  EveningRoute 
} from '../data';
import { 
  Utensils, 
  Sparkles, 
  Heart, 
  MapPin, 
  Compass, 
  Coffee, 
  IceCream, 
  Wine, 
  Coins, 
  Check, 
  Search,
  Camera,
  Navigation,
  HelpCircle,
  Footprints,
  Clock,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Building2
} from 'lucide-react';

export function DiningCouples() {
  const [activeSubTab, setActiveSubTab] = useState<'colosseum' | 'dining' | 'excursions'>('colosseum');
  const [selectedArea, setSelectedArea] = useState<'colosseum' | 'vatican' | 'hotel'>('colosseum');
  const [diningFilter, setDiningFilter] = useState<'All' | 'Trattoria' | 'Espresso Bar' | 'Gelateria' | 'Aperitivo Bar'>('All');
  const [selectedRouteId, setSelectedRouteId] = useState<string>(romanticEveningRoutes[0].id);
  const [activeRouteStopIdx, setActiveRouteStopIdx] = useState<number>(0);
  const [favoriteSpots, setFavoriteSpots] = useState<Record<string, boolean>>({});
  const [visitedSpots, setVisitedSpots] = useState<Record<string, boolean>>({});
  const [openColosseumCats, setOpenColosseumCats] = useState<Record<string, boolean>>({
    breakfast: true,
    coffee: false,
    focus: false,
    lunch: false,
    dinner: false,
    snack: false,
    gelato: false
  });

  // Persist couples checks
  useEffect(() => {
    const savedFavorites = localStorage.getItem('rome-favorite-dining');
    const savedVisited = localStorage.getItem('rome-visited-dining');
    if (savedFavorites) {
      try { setFavoriteSpots(JSON.parse(savedFavorites)); } catch (_) {}
    }
    if (savedVisited) {
      try { setVisitedSpots(JSON.parse(savedVisited)); } catch (_) {}
    }
  }, []);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = { ...favoriteSpots, [id]: !favoriteSpots[id] };
    setFavoriteSpots(updated);
    localStorage.setItem('rome-favorite-dining', JSON.stringify(updated));
  };

  const toggleVisited = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = { ...visitedSpots, [id]: !visitedSpots[id] };
    setVisitedSpots(updated);
    localStorage.setItem('rome-visited-dining', JSON.stringify(updated));
  };

  const currentRoute = romanticEveningRoutes.find(r => r.id === selectedRouteId) || romanticEveningRoutes[0];

  const getDiningIcon = (type: DiningSpot['type']) => {
    switch (type) {
      case 'Trattoria':
        return <Wine className="w-4 h-4 text-rose-450" />;
      case 'Espresso Bar':
        return <Coffee className="w-4 h-4 text-amber-500" />;
      case 'Gelateria':
        return <IceCream className="w-4 h-4 text-emerald-400" />;
      case 'Aperitivo Bar':
        return <Utensils className="w-4 h-4 text-violet-400" />;
    }
  };

  const getDiningBadgeStyle = (type: DiningSpot['type']) => {
    switch (type) {
      case 'Trattoria': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      case 'Espresso Bar': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'Gelateria': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Aperitivo Bar': return 'text-violet-400 bg-violet-500/10 border-violet-500/20';
    }
  };

  const filteredDining = diningBucketList.filter(spot => {
    if (diningFilter === 'All') return true;
    return spot.type === diningFilter;
  });

  const colosseumCategories = [
    { key: 'breakfast', label: 'Breakfast Spots', icon: '🍳', displayName: 'Breakfast' },
    { key: 'coffee', label: 'Coffee & Cafe Bars', icon: '☕', displayName: 'Coffee/Cafe' },
    { key: 'lunch', label: 'Authentic Lunches', icon: '🍝', displayName: 'Lunch' },
    { key: 'dinner', label: 'Traditional Dinners', icon: '🍷', displayName: 'Dinner' },
    { key: 'snack', label: 'Gourmet Street Snacks', icon: '🍕', displayName: 'Snack' },
    { key: 'gelato', label: 'Handcrafted Gelato', icon: '🍦', displayName: 'Gelato' }
  ];

  return (
    <div className="flex flex-col gap-5" id="dining-couples-root">
      {/* Internal Navigation Sub-tabs */}
      <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 backdrop-blur-md gap-1 overflow-x-auto scrollbar-none flex-nowrap">
        <button
          onClick={() => setActiveSubTab('colosseum')}
          className={`flex-1 py-2.5 text-[11px] font-black uppercase rounded-lg transition-all cursor-pointer text-center leading-none shrink-0 px-3.5 ${
            activeSubTab === 'colosseum'
              ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30 shadow-sm font-black'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          id="btn-subtab-colosseum"
        >
          Curated Local Gems 📍
        </button>
        <button
          onClick={() => setActiveSubTab('dining')}
          className={`flex-1 py-2.5 text-[11px] font-black uppercase rounded-lg transition-all cursor-pointer text-center leading-none shrink-0 px-3.5 ${
            activeSubTab === 'dining'
              ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30 shadow-sm font-black'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          id="btn-subtab-dining"
        >
          Bucket List
        </button>
        <button
          onClick={() => setActiveSubTab('excursions')}
          className={`flex-1 py-2.5 text-[11px] font-black uppercase rounded-lg transition-all cursor-pointer text-center leading-none shrink-0 px-3.5 ${
            activeSubTab === 'excursions'
              ? 'bg-rose-500/15 text-rose-405 border border-rose-500/30 shadow-sm font-black'
              : 'text-slate-400 hover:text-slate-205'
          }`}
          id="btn-subtab-excursions"
        >
          Walks & Sunsets
        </button>
      </div>

      {/* Render Dynamic Content panels based on Sub-tabs */}
      <AnimatePresence mode="wait">
        {activeSubTab === 'colosseum' ? (
          <motion.div
            key="colosseum-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-4 text-xs"
          >
            {/* Neighborhood Area Selector Tabs */}
            <div className="flex bg-black/40 p-1 rounded-xl border border-white/5 backdrop-blur-md gap-1">
              {(['colosseum', 'vatican', 'hotel'] as const).map(area => {
                const isAreaActive = selectedArea === area;
                return (
                  <button
                    key={area}
                    onClick={() => setSelectedArea(area)}
                    className={`flex-1 py-2 font-mono text-[9.5px] uppercase font-bold tracking-tight rounded-lg transition-all cursor-pointer text-center leading-none ${
                      isAreaActive
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/35 shadow-sm font-bold'
                        : 'text-slate-400 hover:text-slate-200 border border-transparent'
                    }`}
                  >
                    {area === 'colosseum' ? 'Colosseum' : area === 'vatican' ? 'Vatican & Prati' : 'Hotel Quarter'}
                  </button>
                );
              })}
            </div>

            {/* Context Title Info */}
            <div className="glass p-4 rounded-xl border border-white/5 flex items-start gap-3">
              {(() => {
                switch (selectedArea) {
                  case 'vatican':
                    return <Sparkles className="w-5 h-5 text-amber-400 mt-0.5 shrink-0 animate-pulse-subtle" />;
                  case 'hotel':
                    return <Building2 className="w-5 h-5 text-sky-400 mt-0.5 shrink-0 animate-pulse-subtle" />;
                  default:
                    return <Compass className="w-5 h-5 text-rose-420 mt-0.5 shrink-0" />;
                }
              })()}
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-black text-slate-100 uppercase tracking-tight">
                  {selectedArea === 'colosseum' 
                    ? 'Authentic Colosseum Belt Area' 
                    : selectedArea === 'vatican' 
                      ? 'Authentic Vatican & Prati District' 
                      : 'Hilton Garden Inn Roman Neighborhood'}
                </h3>
                <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                  {selectedArea === 'colosseum' 
                    ? 'Skip the expensive tourist traps directly next to the Colosseum walls! These curated spots are strictly authentic, family-owned, and beloved by Romans.' 
                    : selectedArea === 'vatican' 
                      ? 'Avoid generic microwave tourist menus around St. Peter’s. Prati is an elegant historic district beloved by foodies, filled with epic master bakeries and outstanding trattorias.' 
                      : 'Authentic neighborhood trattorias, historic coffee bars, and artisan pastry shops in San Giovanni, within hand-walk distance from our hotel lobby.'}
                </p>
              </div>
            </div>

            {/* Dropdown Accordions for each Category */}
            <div className="flex flex-col gap-3">
              {colosseumCategories.map(cat => {
                const isOpen = !!openColosseumCats[cat.key];
                const activeGems = selectedArea === 'colosseum' 
                  ? colosseumDiningGems 
                  : selectedArea === 'vatican' 
                    ? vaticanDiningGems 
                    : hotelDiningGems;
                const venues = activeGems[cat.key as keyof typeof activeGems];
                return (
                  <div
                    key={cat.key}
                    className="glass border border-white/5 rounded-xl overflow-hidden shadow-md"
                  >
                    {/* Accordion Trigger */}
                    <button
                      onClick={() => setOpenColosseumCats(prev => ({ ...prev, [cat.key]: !prev[cat.key] }))}
                      className="w-full p-4 flex justify-between items-center bg-white/5 hover:bg-white/10 transition-colors text-left font-black tracking-tight"
                      id={`colosseum-category-btn-${cat.key}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl leading-none">{cat.icon}</span>
                        <div className="flex flex-col">
                          <span className="text-[9px] font-mono uppercase text-rose-400 font-extrabold leading-none tracking-wider">
                            {selectedArea === 'colosseum' ? 'Colosseum Belt' : selectedArea === 'vatican' ? 'Vatican / Prati' : 'Hotel District'}
                          </span>
                          <span className="text-xs font-black text-slate-100 tracking-wide mt-1.5 uppercase">{cat.label}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-rose-400 font-mono font-black">{venues.length} Gems</span>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                      </div>
                    </button>

                    {/* Accordion Content */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="overflow-hidden border-t border-white/5 bg-slate-950/40 text-xs flex flex-col p-3 gap-3.5"
                        >
                          {venues.map((venue, vIdx) => (
                            <div
                              key={vIdx}
                              className="bg-white/[0.02] border border-white/5 p-3.5 rounded-xl flex flex-col gap-2.5 hover:border-white/10 transition-colors"
                              id={`colosseum-venue-${cat.key}-${vIdx}`}
                            >
                              <div className="flex justify-between items-start gap-2">
                                <h4 className="text-xs font-black text-slate-100 uppercase tracking-tight flex items-center gap-2 leading-none">
                                  <span className="w-1.5 h-1.5 bg-rose-455 rounded-full shrink-0" />
                                  <span>{venue.name}</span>
                                </h4>
                              </div>

                              {/* Address */}
                              <div className="flex items-center gap-1.5 text-slate-400 font-semibold text-[10.5px]">
                                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                                <span>{venue.address}</span>
                              </div>

                              {/* Specialty */}
                              <div className="bg-rose-500/[0.03] border border-rose-500/10 p-2.5 rounded-lg">
                                <span className="text-[8.5px] font-mono uppercase tracking-wider font-extrabold text-rose-400 block mb-1">Signature Specialty:</span>
                                <span className="text-slate-200 font-semibold text-[11px] leading-relaxed">{venue.specialty}</span>
                              </div>

                              {/* Insider Tip */}
                              <div className="text-slate-400 text-xs leading-relaxed italic border-l-2 border-slate-700 pl-2.5 py-0.5">
                                &ldquo;{venue.insiderTip}&rdquo;
                              </div>

                              {/* Navigation action buttons */}
                              <div className="flex gap-2 border-t border-white/5 pt-2.5 mt-0.5">
                                <a
                                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venue.name}, ${venue.address}, Rome`)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  referrerPolicy="no-referrer"
                                  className="flex-1 bg-slate-900 hover:bg-slate-850 rounded-lg py-2 border border-slate-800 text-[10.5px] font-extrabold text-slate-200 text-center flex items-center justify-center gap-1.5 cursor-pointer leading-none"
                                >
                                  <Navigation className="w-3 h-3 text-sky-400 animate-pulse" />
                                  <span>MAPS NAV</span>
                                </a>

                                <a
                                  href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(`${venue.name} Rome Italy`)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  referrerPolicy="no-referrer"
                                  className="flex-1 bg-slate-900 hover:bg-slate-850 rounded-lg py-2 border border-slate-800 text-[10.5px] font-extrabold text-slate-200 text-center flex items-center justify-center gap-1.5 cursor-pointer leading-none"
                                >
                                  <Camera className="w-3.5 h-3.5 text-orange-400" />
                                  <span>VIEW PHOTOS</span>
                                </a>
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : activeSubTab === 'dining' ? (
          <motion.div
            key="dining-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-4"
          >
            {/* Filter buttons swiper bar */}
            <div className="flex overflow-x-auto gap-1.5 pb-1 select-none scrollbar-none">
              {(['All', 'Trattoria', 'Espresso Bar', 'Gelateria', 'Aperitivo Bar'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setDiningFilter(f)}
                  className={`px-3 py-1.5 rounded-lg border text-[11px] font-black uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                    diningFilter === f
                      ? 'bg-rose-500/10 text-rose-450 border-rose-500/30 shadow-sm'
                      : 'bg-white/5 text-slate-400 border-white/10 hover:text-slate-200 hover:border-white/20'
                  }`}
                  id={`filter-btn-${f.replace(/\s+/g, '-')}`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Venues lists */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDining.map(spot => {
                const isFav = !!favoriteSpots[spot.id];
                const isVisited = !!visitedSpots[spot.id];
                return (
                  <div
                    key={spot.id}
                    className="glass p-4 flex flex-col justify-between gap-3 relative overflow-hidden transition-all group hover:border-white/20"
                    id={`spot-card-${spot.id}`}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-start gap-2">
                        {/* Title and category badge */}
                        <div className="flex flex-col gap-1">
                          <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-[9px] font-mono uppercase tracking-wider ${getDiningBadgeStyle(spot.type)} w-fit leading-none`}>
                            {getDiningIcon(spot.type)}
                            <span>{spot.type}</span>
                          </div>
                          <h3 className="text-base font-black text-slate-100 group-hover:text-amber-400 transition-colors mt-1 leading-snug">
                            {spot.name}
                          </h3>
                        </div>

                        {/* Interactive favorite and visited checks actions */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={(e) => toggleFavorite(spot.id, e)}
                            className={`p-2 rounded-lg border transition-all cursor-pointer ${
                              isFav 
                                ? 'bg-rose-950/30 border-rose-550 text-rose-400' 
                                : 'bg-slate-900 border-slate-850 text-slate-500 hover:text-rose-400'
                            }`}
                            title="Love this Spot"
                            id={`fav-btn-${spot.id}`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500' : ''}`} />
                          </button>
                          
                          <button
                            onClick={(e) => toggleVisited(spot.id, e)}
                            className={`p-2 rounded-lg border transition-all cursor-pointer ${
                              isVisited 
                                ? 'bg-emerald-950/30 border-emerald-550 text-emerald-400' 
                                : 'bg-slate-900 border-slate-850 text-slate-500 hover:text-emerald-400'
                            }`}
                            title="We ate here!"
                            id={`visited-btn-${spot.id}`}
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Location context */}
                      <span className="text-xs text-slate-450 font-bold flex items-center gap-1.5 leading-none">
                        <MapPin className="w-3.5 h-3.5 text-slate-550 shrink-0" />
                        <span>{spot.neighborhood} • {spot.address}</span>
                      </span>

                      {/* Specialty information */}
                      <p className="text-xs text-slate-350 leading-relaxed font-semibold bg-slate-900/50 p-2.5 rounded-lg border border-slate-900/80 mt-1">
                        <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-amber-500 block mb-0.5">Signature Specialty:</span>
                        {spot.specialty}
                      </p>

                      {/* Soft romantic vibe descriptions */}
                      <p className="text-xs text-slate-400 leading-relaxed font-medium italic">
                        &ldquo;{spot.romanticVibe}&rdquo;
                      </p>
                    </div>

                    {/* Pro-Tips block tailored for our couples getaway */}
                    <div className="border-t border-slate-900 pt-3 flex flex-col gap-3">
                      <div className="text-[11px] text-slate-400 bg-amber-500/5 leading-relaxed p-2.5 rounded-lg border border-amber-500/10">
                        <span className="font-extrabold uppercase text-amber-450 block mb-0.5">Couples Insider Secret:</span>
                        {spot.coupleTip}
                      </div>

                      {/* Physical redirect maps search triggers */}
                      <div className="flex gap-2">
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${spot.name}, ${spot.address}, Rome`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          referrerPolicy="no-referrer"
                          className="flex-1 bg-slate-900 hover:bg-slate-850 rounded-lg py-2 border border-slate-800 text-[11px] font-extrabold text-slate-200 text-center flex items-center justify-center gap-1.5 cursor-pointer leading-none"
                          id={`spot-map-${spot.id}`}
                        >
                          <Navigation className="w-3 h-3 text-sky-400" />
                          <span>GET NAV</span>
                        </a>

                        <a
                          href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(`${spot.name} ${spot.neighborhood} Rome`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          referrerPolicy="no-referrer"
                          className="flex-1 bg-slate-900 hover:bg-slate-850 rounded-lg py-2 border border-slate-800 text-[11px] font-extrabold text-slate-200 text-center flex items-center justify-center gap-1.5 cursor-pointer leading-none"
                          id={`spot-photos-${spot.id}`}
                        >
                          <Camera className="w-3.5 h-3.5 text-orange-400" />
                          <span>VIEW PHOTOS</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : activeSubTab === 'excursions' ? (
          <motion.div
            key="excursions-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-4"
          >
            {/* Route selector buttons */}
            <div className="flex justify-between items-center bg-white/5 p-1 rounded-xl border border-white/10 backdrop-blur-md">
              {romanticEveningRoutes.map(route => {
                const isSelected = selectedRouteId === route.id;
                return (
                  <button
                    key={route.id}
                    onClick={() => {
                      setSelectedRouteId(route.id);
                      setActiveRouteStopIdx(0);
                    }}
                    className={`flex-1 py-2 text-[11px] font-black uppercase rounded-lg transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-rose-500/10 text-rose-400 shadow-sm border border-rose-500/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                    id={`route-select-btn-${route.id}`}
                  >
                    {route.id === 'er-1' ? 'Piazza Fountain Run' : 'Tiber & Island Escape'}
                  </button>
                );
              })}
            </div>

            {/* Interactive Simulated Route Mapping Illustration */}
            <div className="glass-panel p-4 flex flex-col gap-3 relative overflow-hidden">
              <span className="text-[10px] font-mono tracking-wider font-extrabold text-slate-450 uppercase block leading-none">
                Interactive Itinerary Route View (Sanpietrini Path)
              </span>

              {/* Vector connection chart container */}
              <div className="py-4 px-2 bg-white/5 border border-white/5 rounded-xl relative flex justify-between items-center gap-2 overflow-x-auto select-none">
                {/* Connector Line overlay */}
                <div className="absolute left-[10%] right-[10%] top-[45%] h-[2px] bg-white/10 pointer-events-none" />

                {currentRoute.stops.map((stop, idx) => {
                  const isActive = activeRouteStopIdx === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveRouteStopIdx(idx)}
                      className="relative z-10 flex flex-col items-center gap-1.5 shrink-0 w-[22%] focus:outline-none cursor-pointer"
                      id={`stop-pin-btn-${idx}`}
                    >
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                        isActive
                          ? 'bg-rose-505/20 border-rose-400 text-rose-455 scale-110 shadow-[0_0_12px_rgba(244,63,94,0.25)]'
                          : 'bg-white/5 border-white/10 text-slate-500 hover:border-white/20'
                      }`}>
                        <span className="font-mono text-xs font-black">{idx + 1}</span>
                      </div>
                      <span className={`text-[9.5px] uppercase font-black text-center truncate max-w-full leading-tight ${
                        isActive ? 'text-rose-400' : 'text-slate-500'
                      }`}>
                        {stop.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Selected Stop Details */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedRouteId}-${activeRouteStopIdx}`}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 5 }}
                  transition={{ duration: 0.2 }}
                  className="glass p-4 flex flex-col gap-2"
                >
                  <div className="flex justify-between items-center bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 w-fit">
                    <span className="font-mono text-[10px] font-black text-rose-400 leading-none">
                      STOP {activeRouteStopIdx + 1} OF 4
                    </span>
                  </div>

                  <h4 className="text-base font-black text-slate-105 uppercase tracking-wide mt-1">
                    {currentRoute.stops[activeRouteStopIdx].name}
                  </h4>

                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    {currentRoute.stops[activeRouteStopIdx].description}
                  </p>

                  <div className="mt-2.5 pt-2.5 border-t border-slate-950 flex flex-wrap gap-2 text-[11px] font-bold">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${currentRoute.stops[activeRouteStopIdx].name}, Rome Italy`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      referrerPolicy="no-referrer"
                      className="bg-slate-950 hover:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-850 text-slate-205 flex items-center gap-1 cursor-pointer"
                      id={`stop-map-link-${activeRouteStopIdx}`}
                    >
                      <Navigation className="w-3 h-3 text-sky-400" />
                      <span>Check Google Coordinates</span>
                    </a>

                    <a
                      href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(`${currentRoute.stops[activeRouteStopIdx].name} Rome sunset night`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      referrerPolicy="no-referrer"
                      className="bg-slate-950 hover:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-850 text-slate-205 flex items-center gap-1.5 cursor-pointer"
                      id={`stop-img-link-${activeRouteStopIdx}`}
                    >
                      <Camera className="w-3.5 h-3.5 text-orange-400" />
                      <span>Visual Highlights</span>
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Route summary specs block */}
            <div className="bg-slate-950/40 p-5 rounded-2xl border border-slate-900 flex flex-col gap-3">
              <div className="flex flex-col">
                <h3 className="text-base font-black text-slate-105 uppercase tracking-wide">
                  {currentRoute.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-semibold mt-1">
                  {currentRoute.description}
                </p>
              </div>

              {/* Metrics parameters widget */}
              <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-900">
                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-850 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-500 uppercase font-mono">Estimated Duration</span>
                    <span className="text-xs font-black text-slate-200">{currentRoute.duration}</span>
                  </div>
                </div>

                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-850 flex items-center gap-2">
                  <Footprints className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-500 uppercase font-mono">Transit Distance</span>
                    <span className="text-xs font-black text-slate-200">{currentRoute.distance}</span>
                  </div>
                </div>
              </div>

              {/* Intimate couple strategy advisory */}
              <div className="bg-rose-500/5 p-3 rounded-xl border border-rose-500/25 text-xs text-rose-300">
                <span className="font-extrabold uppercase text-rose-450 block mb-0.5">Romantic Couple Recommendation:</span>
                {currentRoute.coupleTip}
              </div>

              <a
                href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(currentRoute.stops[0].name + ', Rome')}&destination=${encodeURIComponent(currentRoute.stops[3].name + ', Rome')}&waypoints=${encodeURIComponent(currentRoute.stops[1].name + ', Rome|' + currentRoute.stops[2].name + ', Rome')}&travelmode=walking`}
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="w-full mt-1.5 py-3 bg-gradient-to-r from-rose-550/20 to-amber-550/20 hover:from-rose-550/30 hover:to-amber-550/30 text-slate-200 text-xs font-black uppercase tracking-wider text-center rounded-xl border border-rose-500/20 hover:border-amber-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                id={`open-full-nav-route-${currentRoute.id}`}
              >
                <Navigation className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Synchronize Whole Path in Google Maps</span>
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
