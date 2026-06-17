import React, { useState, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  romeItinerary, 
  ActivityItem, 
  RomeDay,
  travelWallet
} from '../data';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Compass, 
  Utensils, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Camera, 
  Share2, 
  ExternalLink,
  Sunset,
  Sunrise,
  Moon,
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  ChevronUp,
  Plane,
  Hotel,
  Shirt,
  FileText,
  Briefcase,
  CheckSquare,
  Ticket,
  Wifi
} from 'lucide-react';

interface PrepItem {
  text: string;
  category: 'wardrobe' | 'tickets' | 'documents' | 'essentials';
}

const dailyPrepChecklists: Record<number, PrepItem[]> = {
  0: [
    { text: "Smart-casual / Elegant outfit (Dress nicely for sunset roof garden)", category: "wardrobe" },
    { text: "Light breathable clothing layers suited for flight transit", category: "wardrobe" },
    { text: "Restaurant Roof Garden Table RSVP details & arrival advisory", category: "tickets" },
    { text: "Physical credit card (ensure your primary card is ready for Hilton check-in)", category: "documents" },
    { text: "Printed hotel & Delta outbound confirmations", category: "documents" },
    { text: "Fully charged iPhones & phone camera preview check", category: "essentials" },
    { text: "EU travel outlet power adapter in day bags", category: "essentials" }
  ],
  1: [
    { text: "STRICT Vatican Modesty Attire: Shoulders, knees, and toes MUST be covered! No hats allowed", category: "wardrobe" },
    { text: "Highly comfortable, broken-in walking sneakers (essential for rough cobblestone paths)", category: "wardrobe" },
    { text: "Light, highly breathable garments (predicted High of 87°F with High UV Index 9)", category: "wardrobe" },
    { text: "Tour Guy skip-the-line group tour pass (Booking #1037174)", category: "tickets" },
    { text: "St. Peter's Basilica online QR vouchers (Codes: 759995 & 769968)", category: "tickets" },
    { text: "Original physical US Passports (security checking strictly requires actual physical IDs)", category: "documents" },
    { text: "Printed copies or local offline PDF versions of passports on phone and wallet", category: "documents" },
    { text: "2x Reusable collapsible water bottles (for free cold refills at public Nasoni fountains)", category: "essentials" },
    { text: "High-capacity portable battery powerbank & charging cords", category: "essentials" },
    { text: "Pack of Compeed Blister Plasters / quick bandages in day bags", category: "essentials" },
    { text: "Compact linen shawl or wrap (for quick shoulder coverage adjustments)", category: "essentials" },
    { text: "Sunscreen lotion (apply 30+ SPF before departure) & sunglasses", category: "essentials" },
    { text: "🎒 Pro Tip: Do NOT leave with any bulky backpacks, tripods, or pocketknives (forbidden!)", category: "essentials" }
  ],
  2: [
    { text: "Lightweight, pale cool clothing (July warmth, close to zero shade on Forum walk)", category: "wardrobe" },
    { text: "Durable, supportive walking shoes or sandals with strap support", category: "wardrobe" },
    { text: "Sunhat, visor, or wrap & sunglasses", category: "wardrobe" },
    { text: "Colosseum VIP Underground & Arena ticket (Pass GPCOQDJW8LDK668P - Show up by 12:30 PM!)", category: "tickets" },
    { text: "Roman Forum & Palatine Hill combo entry voucher", category: "tickets" },
    { text: "Original physical US Passports (strict name checks against tickets on security lines)", category: "documents" },
    { text: "Sunscreen supply (apply beforehand and carry inside purse)", category: "essentials" },
    { text: "Collapsible water bottles for Forum hydration (Nasone fountains located inside)", category: "essentials" },
    { text: "Charged camera & phone, with extra pocket backup battery pack", category: "essentials" },
    { text: "🎒 Pro Tip: NO big backpacks, drones, or knives are permitted under any condition!", category: "essentials" }
  ],
  3: [
    { text: "Comfortable layered flying wear (adaptable from July warmth to air-con plane cabin)", category: "wardrobe" },
    { text: "Slip-on or easy-to-remove shoes for smoother transit checkpoint screens", category: "wardrobe" },
    { text: "Delta return flights digital check-in boarding passes (H9AC4L)", category: "tickets" },
    { text: "Vatican Limo Services private ride voucher (ROM-SHUTTLE-7291)", category: "tickets" },
    { text: "Original physical US Passports in hand-carry luggage (do NOT pack in checked baggage!)", category: "documents" },
    { text: "Global Allianz destination protector insurance documentation", category: "documents" },
    { text: "Check hotel room safe, all drawers, and bathroom hangers for remaining belongings", category: "essentials" },
    { text: "Place active portable lithium powerbanks in cabin bags ONLY (forbidden in checked cargo bags)", category: "essentials" },
    { text: "Pocket Euro change for traditional parting coin tosses in the fountains", category: "essentials" }
  ]
};

export function TimelineTracker() {
  const [activeDayIndex, setActiveDayIndex] = useState<number>(0);
  const [expandedActivities, setExpandedActivities] = useState<Record<string, boolean>>({});
  const [completedActivities, setCompletedActivities] = useState<Record<string, boolean>>({});
  const [bookmarkedActivities, setBookmarkedActivities] = useState<Record<string, boolean>>({});
  const [checkedPrepItems, setCheckedPrepItems] = useState<Record<string, boolean>>({});
  const [checklistCollapsed, setChecklistCollapsed] = useState<boolean>(false);

  // Load persistence states for checked items
  useEffect(() => {
    const savedCompleted = localStorage.getItem('rome-completed-activities');
    const savedBookmarked = localStorage.getItem('rome-bookmarked-activities');
    const savedCheckedPrep = localStorage.getItem('rome-checked-prep-items');
    if (savedCompleted) {
      try { setCompletedActivities(JSON.parse(savedCompleted)); } catch (_) {}
    }
    if (savedBookmarked) {
      try { setBookmarkedActivities(JSON.parse(savedBookmarked)); } catch (_) {}
    }
    if (savedCheckedPrep) {
      try { setCheckedPrepItems(JSON.parse(savedCheckedPrep)); } catch (_) {}
    }
  }, []);

  // Auto-manage checklist expand state based on completion level when switching days
  useEffect(() => {
    const activeItems = dailyPrepChecklists[activeDayIndex] || [];
    const total = activeItems.length;
    let checkedCount = 0;
    activeItems.forEach((_, idx) => {
      const key = `prep-${activeDayIndex}-${idx}`;
      if (checkedPrepItems[key]) checkedCount++;
    });
    
    if (total > 0 && checkedCount === total) {
      setChecklistCollapsed(true);
    } else {
      setChecklistCollapsed(false);
    }
  }, [activeDayIndex]);

  const togglePrepItem = (dayNumber: number, idx: number) => {
    const key = `prep-${dayNumber}-${idx}`;
    const updated = { ...checkedPrepItems, [key]: !checkedPrepItems[key] };
    setCheckedPrepItems(updated);
    localStorage.setItem('rome-checked-prep-items', JSON.stringify(updated));
  };

  const activeDay: RomeDay = romeItinerary[activeDayIndex];

  // Helper selectors
  const toggleComplete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = { ...completedActivities, [id]: !completedActivities[id] };
    setCompletedActivities(updated);
    localStorage.setItem('rome-completed-activities', JSON.stringify(updated));
  };

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = { ...bookmarkedActivities, [id]: !bookmarkedActivities[id] };
    setBookmarkedActivities(updated);
    localStorage.setItem('rome-bookmarked-activities', JSON.stringify(updated));
  };

  const toggleExpand = (id: string) => {
    setExpandedActivities(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'tour':
        return <Compass className="w-4 h-4 text-amber-400" id={`icon-tour-${activeDayIndex}`} />;
      case 'dining':
        return <Utensils className="w-4 h-4 text-emerald-400" id={`icon-dining-${activeDayIndex}`} />;
      case 'excursion':
        return <Sparkles className="w-4 h-4 text-indigo-400" id={`icon-excursion-${activeDayIndex}`} />;
      case 'flight':
        return <Plane className="w-4 h-4 text-sky-400" id={`icon-flight-${activeDayIndex}`} />;
      case 'hotel':
        return <Hotel className="w-4 h-4 text-emerald-400" id={`icon-hotel-${activeDayIndex}`} />;
      case 'transit':
        return <Clock className="w-4 h-4 text-rose-405" id={`icon-transit-${activeDayIndex}`} />;
      case 'monument':
        return <Camera className="w-4 h-4 text-rose-400" id={`icon-monument-${activeDayIndex}`} />;
      default:
        return <Calendar className="w-4 h-4 text-slate-400" id={`icon-default-${activeDayIndex}`} />;
    }
  };

  const getPeriodIcon = (period: ActivityItem['period']) => {
    switch (period) {
      case 'Morning':
        return <Sunrise className="w-4 h-4 text-amber-300" />;
      case 'Afternoon':
        return <Sunset className="w-4 h-4 text-orange-400" />;
      case 'Evening':
        return <Moon className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <div className="flex flex-col gap-6" id="timeline-tracker-root">
      {/* 3-Day Pill Swiper Selector */}
      <div className="flex justify-between items-center bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
        {romeItinerary.map((day, idx) => {
          const isSelected = activeDayIndex === idx;
          return (
            <button
              key={day.dayNumber}
              onClick={() => setActiveDayIndex(idx)}
              className={`flex-1 py-3 px-2 rounded-xl text-center transition-all relative flex flex-col items-center gap-1 cursor-pointer ${
                isSelected 
                  ? 'bg-white/10 text-white font-bold shadow-md border border-white/20' 
                  : 'text-slate-400 hover:text-slate-205 hover:bg-white/5'
              }`}
              id={`day-selector-btn-${day.dayNumber}`}
            >
              <span className="text-[10px] font-black tracking-widest uppercase text-rose-400 leading-none">
                Day 0{day.dayNumber}
              </span>
              <span className="text-sm font-extrabold leading-none mt-1">
                {day.date.split(',')[0]}
              </span>
              {isSelected && (
                <motion.div 
                  layoutId="activeDayGlow" 
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-rose-400 rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Day Jolt Intro Panel */}
      <motion.div 
        key={`intro-${activeDayIndex}`}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="glass-panel p-5 relative overflow-hidden flex flex-col gap-3"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-radial from-amber-500/5 to-transparent rounded-full -mr-12 -mt-12 pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-800/80 pb-3">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono tracking-wider font-extrabold text-amber-500/90 uppercase">
              Current Focus Itinerary
            </span>
            <h2 className="text-lg font-black text-white uppercase tracking-tight mt-0.5">
              {activeDay.theme}
            </h2>
          </div>

          <div className="bg-slate-950/80 border border-slate-850 py-1.5 px-3 rounded-xl flex items-center gap-2 self-start sm:self-center">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <div className="flex flex-col leading-none text-left">
              <span className="text-[9px] text-slate-500 font-mono">July 2026 Forecast</span>
              <span className="text-xs font-black text-slate-200 mt-0.5">H: {activeDay.weatherHigh}°F • L: {activeDay.weatherLow}°F</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed font-medium">
          {activeDay.narrative}
        </p>

        <div className="text-[11px] text-slate-500 font-mono italic flex items-center gap-1 bg-slate-950/40 py-1 px-2.5 rounded-lg w-fit">
          <span className="text-amber-500 font-black">Weather Note:</span> {activeDay.weatherDesc}
        </div>
      </motion.div>

      {/* 🎒 Day Pre-Departure Prep Checklist */}
      {(() => {
        const prepItems = dailyPrepChecklists[activeDayIndex] || [];
        const totalChecks = prepItems.length;
        let checksDone = 0;
        prepItems.forEach((_, idx) => {
          if (checkedPrepItems[`prep-${activeDayIndex}-${idx}`]) checksDone++;
        });
        const pct = totalChecks > 0 ? Math.round((checksDone / totalChecks) * 100) : 0;

        return (
          <motion.div
            key={`checklist-card-${activeDayIndex}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="glass-panel p-4 flex flex-col gap-3 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-rose-500/5 to-transparent rounded-full -mr-8 -mt-8 pointer-events-none" />
            
            <div className="flex justify-between items-center border-b border-white/5 pb-2 cursor-pointer select-none" onClick={() => setChecklistCollapsed(!checklistCollapsed)}>
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4.5 h-4.5 text-rose-500 shrink-0" />
                <h3 className="text-sm font-black text-white uppercase tracking-tight">🎒 Prep & Bag Checklist</h3>
              </div>
              <button 
                className="text-xs font-mono font-bold text-rose-455 bg-rose-500/10 hover:bg-rose-500/15 border border-rose-500/20 py-1 px-2.5 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                id="toggle-checklist-collapse"
              >
                <span>{checksDone}/{totalChecks} Done</span>
                {checklistCollapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Progress Bar */}
            <div className="flex flex-col gap-1.5 -mt-1">
              <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden relative border border-white/5">
                <div 
                  className="bg-gradient-to-r from-rose-550 via-rose-400 to-amber-450 h-full rounded-full transition-all duration-300"
                  style={{ width: `${pct}%` }}
                />
              </div>
              {pct === 100 ? (
                <span className="text-[10px] text-emerald-400 font-extrabold flex items-center gap-1 mt-0.5 animate-pulse">
                  ✓ Ready! You're prepared to safely leave your Hilton room and enjoy Rome!
                </span>
              ) : (
                <span className="text-[10px] text-slate-400 font-semibold">
                  Review and check off daily essentials before leaving. Sourced in real-time.
                </span>
              )}
            </div>

            <AnimatePresence initial={false}>
              {!checklistCollapsed && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden flex flex-col gap-2 mt-1"
                >
                  {prepItems.map((item, idx) => {
                    const isChecked = !!checkedPrepItems[`prep-${activeDayIndex}-${idx}`];
                    
                    // Categorized badges/colors
                    let categoryLabel = "";
                    let categoryIcon = null;
                    let badgeClass = "";
                    
                    if (item.category === 'wardrobe') {
                      categoryLabel = "What to Wear";
                      categoryIcon = <Shirt className="w-3 h-3 text-rose-400" />;
                      badgeClass = "bg-rose-500/10 border-rose-500/20 text-rose-350";
                    } else if (item.category === 'tickets') {
                      categoryLabel = "Tickets Required";
                      categoryIcon = <Ticket className="w-3 h-3 text-amber-400" />;
                      badgeClass = "bg-amber-500/10 border-amber-500/20 text-amber-350";
                    } else if (item.category === 'documents') {
                      categoryLabel = "Required IDs & Papers";
                      categoryIcon = <FileText className="w-3 h-3 text-sky-400" />;
                      badgeClass = "bg-sky-500/10 border-sky-500/20 text-sky-350";
                    } else {
                      categoryLabel = "Essential Gear Check";
                      categoryIcon = <Briefcase className="w-3 h-3 text-emerald-400" />;
                      badgeClass = "bg-emerald-500/10 border-emerald-500/20 text-emerald-350";
                    }

                    return (
                      <div
                        key={idx}
                        onClick={() => togglePrepItem(activeDayIndex, idx)}
                        className={`min-h-[44px] py-2 px-3 rounded-xl border flex items-start gap-3 select-none cursor-pointer transition-all active:scale-[0.985] ${
                          isChecked 
                            ? 'bg-emerald-500/[0.03] border-emerald-500/20 opacity-65' 
                            : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                        }`}
                        id={`prep-item-row-${activeDayIndex}-${idx}`}
                      >
                        {/* Circle Checkbox */}
                        <div className={`w-5.5 h-5.5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                          isChecked 
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 scale-105' 
                            : 'border-slate-700 text-transparent'
                        }`}>
                          <span className="text-[10px] font-black">{isChecked ? "✓" : ""}</span>
                        </div>

                        {/* Text and category */}
                        <div className="flex-1 flex flex-col gap-1 leading-none text-left">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={`text-[8.5px] font-mono tracking-wider font-extrabold px-1.5 py-0.5 rounded border uppercase flex items-center gap-1 ${badgeClass}`}>
                              {categoryIcon}
                              <span>{categoryLabel}</span>
                            </span>
                          </div>
                          <span className={`text-xs mt-1 leading-relaxed font-semibold ${isChecked ? 'line-through text-slate-500 font-normal' : 'text-slate-200'}`}>
                            {item.text}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })()}

      {/* Vertical Activities Timeline */}
      <div className="flex flex-col gap-4 relative">
        {/* Custom Timeline line decoration */}
        <div className="absolute top-4 bottom-4 left-5.5 w-[1.5px] bg-slate-800 pointer-events-none" />

        <AnimatePresence mode="wait">
          {activeDay.activities.map((activity, itemIdx) => {
            const isCompleted = !!completedActivities[activity.id];
            const isBookmarked = !!bookmarkedActivities[activity.id];
            const isExpanded = !!expandedActivities[activity.id];

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2, delay: itemIdx * 0.05 }}
                className={`relative flex gap-4 p-4 rounded-xl border transition-all ${
                  isCompleted 
                    ? 'bg-white/5 border-white/5 opacity-60' 
                    : 'glass hover:border-white/20 shadow-md'
                }`}
                id={`activity-card-${activity.id}`}
              >
                {/* Timeline Icon Node Pin */}
                <div className="relative z-10 flex flex-col items-center shrink-0">
                  <button 
                    onClick={(e) => toggleComplete(activity.id, e)}
                    className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
                      isCompleted 
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                        : 'bg-white/5 border-white/10 text-slate-350 hover:border-white/20'
                    }`}
                    title={isCompleted ? 'Mark step as active' : 'Mark step as completed'}
                    id={`complete-btn-${activity.id}`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : getActivityIcon(activity.type)}
                  </button>
                  <span className="text-[9px] font-bold text-slate-500 mt-1 uppercase tracking-tight">
                    {activity.period}
                  </span>
                </div>

                {/* Content Area */}
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col">
                      {/* Period Header */}
                      <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-slate-500 leading-none">
                        {getPeriodIcon(activity.period)}
                        <span>{activity.period} • {activity.time}</span>
                      </div>
                      
                      <h3 className={`text-base font-black tracking-tight mt-1 leading-snug cursor-pointer flex items-center gap-1.5 ${
                        isCompleted ? 'line-through text-slate-500' : 'text-slate-100'
                      }`}
                      onClick={() => toggleExpand(activity.id)}
                      >
                        {activity.title}
                      </h3>
                    </div>

                    {/* Quick action bookmark or toggle */}
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={(e) => toggleBookmark(activity.id, e)}
                        className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                          isBookmarked 
                            ? 'bg-amber-950/40 border-amber-500/40 text-amber-400' 
                            : 'bg-slate-900/60 border-slate-850 text-slate-500 hover:text-slate-300'
                        }`}
                        title="Pin this event"
                        id={`bookmark-btn-${activity.id}`}
                      >
                        {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Location badge */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="font-semibold">{activity.location}</span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {activity.description}
                  </p>

                  {/* Strict dress code warnings flag */}
                  {activity.dressCode && (
                    <div className="bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 rounded-lg p-2.5 flex items-start gap-2 text-[11px] text-red-300">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-extrabold uppercase">Strict Dress Code Advisory:</span>{' '}
                        <span>{activity.dressCode}</span>
                      </div>
                    </div>
                  )}

                  {/* Expand and Collapse details handler */}
                  <div className="flex items-center justify-between mt-1 pt-1">
                    <button 
                      onClick={() => toggleExpand(activity.id)}
                      className="text-xs font-semibold text-amber-450 hover:text-amber-300 flex items-center gap-1 py-1 cursor-pointer"
                      id={`expand-details-btn-${activity.id}`}
                    >
                      <span>{isExpanded ? 'Hide Pro Tips & Logistics' : 'Reveal Pro Tips & Details'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {activity.duration && (
                      <span className="text-[10px] font-mono text-slate-500 bg-slate-900/60 border border-slate-850 px-2 py-0.5 rounded-md leading-none">
                        Est. {activity.duration}
                      </span>
                    )}
                  </div>

                  {/* Expanded block sections */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden border-t border-slate-900 mt-2.5 pt-3 flex flex-col gap-3"
                      >
                        {/* Confirmation Codes details */}
                        {activity.confirmation && (
                          <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-850 flex items-center justify-between text-xs">
                            <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Confirmation Pass Code</span>
                            <span className="font-mono text-amber-400 font-extrabold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 select-all">
                              {activity.confirmation}
                            </span>
                          </div>
                        )}

                        {/* Tour Sights list */}
                        {activity.sights && activity.sights.length > 0 && (
                          <div className="flex flex-col gap-2 bg-rose-500/[0.03] border border-rose-500/15 p-3 rounded-xl">
                            <span className="text-[10px] font-mono tracking-widest text-rose-455 uppercase block font-extrabold leading-none">
                              📍 Tour Sightseeing Trail ({activity.sights.length} Sights Visited)
                            </span>
                            <ul className="list-none flex flex-col gap-1.5 mt-1.5">
                              {activity.sights.map((sight, idx) => (
                                <li key={idx} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed font-semibold">
                                  <span className="text-rose-455 shrink-0 font-extrabold">✓</span>
                                  <span>{sight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* ==============================================
                            INTEGRATED TICKETS AND DIGITAL WALLET VAULT
                           ============================================== */}

                        {/* Hilton check-in pass (r0-afternoon) */}
                        {activity.id === 'r0-afternoon' && (
                          <div className="bg-gradient-to-br from-emerald-950/20 to-teal-950/20 border-2 border-emerald-500/30 rounded-xl p-3.5 flex flex-col gap-2.5 shadow-lg relative overflow-hidden text-xs">
                            <div className="absolute right-0 bottom-0 text-[5rem] font-black select-none text-emerald-500/[0.03] leading-none pointer-events-none">HLTN</div>
                            <div className="flex items-center gap-1.5 border-b border-white/5 pb-2">
                              <span className="text-xs font-black uppercase text-emerald-400 tracking-wider">🎟️ HILTON DIGITAL GUEST VOUCHER</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-[11.5px] text-slate-300">
                              <div>
                                <span className="text-slate-550 font-extrabold font-mono text-[8.5px] block uppercase">CONFIRMATION</span>
                                <span className="font-mono text-amber-400 font-extrabold">{travelWallet.hotel.confirmation}</span>
                              </div>
                              <div>
                                <span className="text-slate-550 font-extrabold font-mono text-[8.5px] block uppercase">HONORS NUMBER</span>
                                <span className="text-slate-200 font-bold">{travelWallet.hotel.honorsNum}</span>
                              </div>
                              <div className="col-span-2">
                                <span className="text-slate-550 font-extrabold font-mono text-[8.5px] block uppercase">ROOM CLASSIFICATION</span>
                                <span className="text-emerald-300 font-extrabold">{travelWallet.hotel.roomType}</span>
                              </div>
                              <div>
                                <span className="text-slate-550 font-extrabold font-mono text-[8.5px] block uppercase">CHECK-IN</span>
                                <span className="font-semibold text-slate-200">{travelWallet.hotel.checkIn.date} @ {travelWallet.hotel.checkIn.time}</span>
                              </div>
                              <div>
                                <span className="text-slate-550 font-extrabold font-mono text-[8.5px] block uppercase">CHECK-OUT</span>
                                <span className="font-semibold text-slate-200">{travelWallet.hotel.checkOut.date} @ {travelWallet.hotel.checkOut.time}</span>
                              </div>
                              <div className="col-span-2">
                                <span className="text-slate-550 font-extrabold font-mono text-[8.5px] block uppercase">CARD ON RECORD</span>
                                <span className="text-slate-300 font-bold">{travelWallet.hotel.cardOnRef}</span>
                              </div>
                            </div>

                            {/* Trip insurance details nested */}
                            <div className="border-t border-white/5 pt-2.5 mt-1 flex flex-col gap-1.5 text-[10.5px]">
                              <span className="text-slate-500 font-bold font-mono text-[8.5px] uppercase">Nested Couple Protective Policies</span>
                              <div className="flex justify-between items-center bg-black/40 p-2 rounded-lg border border-white/5">
                                <div className="flex flex-col">
                                  <span className="text-slate-200 font-extrabold">{travelWallet.insuranceAllianz.provider}</span>
                                  <span className="text-slate-400 text-[10px]">Policy: {travelWallet.insuranceAllianz.policyNumber}</span>
                                </div>
                                <span className="text-rose-455 font-extrabold uppercase text-[9px] font-mono shrink-0">ALLIANZ ACTIVE</span>
                              </div>
                              <div className="flex justify-between items-center bg-black/40 p-2 rounded-lg border border-white/5">
                                <div className="flex flex-col">
                                  <span className="text-slate-200 font-extrabold">{travelWallet.insuranceAmex.provider}</span>
                                  <span className="text-slate-400 text-[10px]">Shield Policy: {travelWallet.insuranceAmex.policyNumber}</span>
                                </div>
                                <span className="text-amber-400 font-extrabold uppercase text-[9px] font-mono shrink-0">AMEX INCLUDED</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Roof Garden reservation voucher (r0-evening) */}
                        {activity.id === 'r0-evening' && (
                          <div className="bg-gradient-to-br from-indigo-950/20 to-rose-950/20 border border-indigo-505/30 rounded-xl p-3.5 flex flex-col gap-2 text-xs relative overflow-hidden">
                            <div className="absolute right-0 bottom-0 text-[5rem] font-black select-none text-indigo-500/[0.03] leading-none pointer-events-none">ROOF</div>
                            <div className="flex items-center gap-1.5 border-b border-white/5 pb-2">
                              <span className="text-xs font-black uppercase text-indigo-455 tracking-wider">🍷 ROOF GARDEN SECURE COUPE RESERVATION</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-[11.5px] text-slate-300">
                              <div>
                                <span className="text-slate-550 font-extrabold font-mono text-[8.5px] block uppercase">RESERVATION PARTY</span>
                                <span className="text-slate-200 font-extrabold">Evans Couple (2 Adults)</span>
                              </div>
                              <div>
                                <span className="text-slate-550 font-extrabold font-mono text-[8.5px] block uppercase">STATUS CODE</span>
                                <span className="text-emerald-400 font-black">VETTED & CONFIRMED</span>
                              </div>
                              <div className="col-span-2 text-left bg-black/40 border border-white/5 p-2 rounded-lg text-[10.5px]">
                                <span className="text-[8px] font-mono text-indigo-400 font-extrabold uppercase block mb-0.5">Special Requests Note:</span>
                                Table with direct panoramic edge viewpoint overlooking the ancient forum columns. Candlelit setup confirmed.
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Rome in a day VIP tour ticket details (r1-morning) */}
                        {activity.id === 'r1-morning' && (
                          <div className="bg-gradient-to-br from-amber-950/30 to-orange-950/20 border-2 border-amber-500/30 rounded-xl p-3.5 flex flex-col gap-2 text-xs relative overflow-hidden">
                            <div className="absolute right-0 bottom-0 text-[5rem] font-black select-none text-amber-500/[0.03] leading-none pointer-events-none">TOUR</div>
                            <div className="flex items-center gap-1.5 border-b border-white/5 pb-2">
                              <span className="text-xs font-black uppercase text-amber-400 tracking-wider">🎫 TOUR GUY VIP EVENT PASS</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-[11.5px] text-slate-300">
                              <div>
                                <span className="text-slate-550 font-extrabold font-mono text-[8.5px] block uppercase">BOOKING REFERENCE</span>
                                <span className="font-mono text-amber-400 font-black">{activity.confirmation}</span>
                              </div>
                              <div>
                                <span className="text-slate-550 font-extrabold font-mono text-[8.5px] block uppercase">GROUP DETAILS</span>
                                <span className="text-slate-200 font-bold">Anthony & Jeanine (2 Adults)</span>
                              </div>
                              <div className="col-span-2 text-left bg-black/40 border border-white/5 p-2 rounded-lg text-[10.5px]">
                                <span className="text-[8px] font-mono text-amber-400 font-extrabold uppercase block mb-1">Checklist & Security Guidelines:</span>
                                • Spot colors: Look for bright Red polo uniforms.<br />
                                • Guards will deny entry for shoulders/knees exposed.<br />
                                • Zero pocketknives or major luggage checked bag support.
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Basilica Entry voucher (r1-evening) */}
                        {activity.id === 'r1-evening' && (
                          <div className="bg-gradient-to-br from-purple-950/20 to-indigo-950/20 border border-purple-500/30 rounded-xl p-3.5 flex flex-col gap-2 text-xs relative overflow-hidden">
                            <div className="absolute right-0 bottom-0 text-[5rem] font-black select-none text-purple-500/[0.03] leading-none pointer-events-none">STPTR</div>
                            <div className="flex items-center gap-1.5 border-b border-white/5 pb-2">
                              <span className="text-xs font-black uppercase text-purple-400 tracking-wider">⛪ SEAMLESS BASILICA ENTRY PASS</span>
                            </div>
                            <div className="grid grid-cols-2 gap-1.5 text-[11.5px] text-slate-300">
                              <div>
                                <span className="text-slate-550 font-extrabold font-mono text-[8.5px] block uppercase">RESERVATION CODE</span>
                                <span className="font-mono text-amber-300 font-bold">TIE-725688</span>
                              </div>
                              <div>
                                <span className="text-slate-550 font-extrabold font-mono text-[8.5px] block uppercase">AUDIO ACCESS CODE</span>
                                <span className="font-mono text-emerald-400 font-bold">2 AUDIO UNITS</span>
                              </div>
                              <div className="col-span-2 flex flex-col gap-1 border-t border-white/5 pt-1.5 mt-0.5 text-[10.5px]">
                                <div className="flex justify-between">
                                  <span className="text-slate-400">Jeanine Pagels Pass ID:</span>
                                  <span className="font-mono font-bold text-slate-200">759995</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-400">Anthony Evans Pass ID:</span>
                                  <span className="font-mono font-bold text-slate-200">769968</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Colosseum Underground Pass voucher (r2-afternoon-vip) */}
                        {activity.id === 'r2-afternoon-vip' && (
                          <div className="bg-gradient-to-br from-rose-950/20 to-red-950/20 border-2 border-rose-500/30 rounded-xl p-3.5 flex flex-col gap-2 text-xs relative overflow-hidden">
                            <div className="absolute right-0 bottom-0 text-[5rem] font-black select-none text-rose-500/[0.03] leading-none pointer-events-none">COLOS</div>
                            <div className="flex items-center gap-1.5 border-b border-white/5 pb-2">
                              <span className="text-xs font-black uppercase text-rose-400 tracking-wider">🛡️ COLOSSEUM VIP OVERPASS STUB</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                              <div>
                                <span className="text-slate-550 font-extrabold font-mono text-[8.5px] block uppercase">MAIN REFERENCE</span>
                                <span className="font-mono text-amber-400 font-extrabold">GPCOQDJW8LDK668P</span>
                              </div>
                              <div>
                                <span className="text-slate-550 font-extrabold font-mono text-[8.5px] block uppercase">GATE TIMING</span>
                                <span className="text-slate-200 font-extrabold">July 2, 2026 @ 1:00 PM</span>
                              </div>
                              <div className="col-span-2 flex flex-col gap-1 border-t border-white/5 pt-1.5 text-[10px]">
                                <div className="flex justify-between">
                                  <span className="text-slate-405">Anthony Pass Code:</span>
                                  <span className="font-mono font-semibold text-slate-200">SPCOKP7QVN8A867X</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-405">Jeanine Pass Code:</span>
                                  <span className="font-mono font-semibold text-slate-200">SPCO535XWEKJ6YVX</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Airport Private transfer voucher (r3-morning) */}
                        {activity.id === 'r3-morning' && (
                          <div className="bg-gradient-to-br from-slate-900 to-zinc-900 border border-white/10 rounded-xl p-3.5 flex flex-col gap-2 text-xs relative overflow-hidden">
                            <div className="absolute right-0 bottom-0 text-[5rem] font-black select-none text-slate-500/[0.03] leading-none pointer-events-none">LIMO</div>
                            <div className="flex items-center gap-1.5 border-b border-white/5 pb-2">
                              <span className="text-xs font-black uppercase text-slate-300 tracking-wider">🚗 EXECUTIVE VEHICLE PASS</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-[11.5px] text-slate-300">
                              <div>
                                <span className="text-slate-550 font-extrabold font-mono text-[8.5px] block uppercase">DISPATCH CONFIRMATION</span>
                                <span className="font-mono text-amber-400 font-extrabold">ROM-SHUTTLE-7291</span>
                              </div>
                              <div>
                                <span className="text-slate-550 font-extrabold font-mono text-[8.5px] block uppercase">LIVERY FLEET</span>
                                <span className="text-slate-200 font-bold">Vatican Limo Services</span>
                              </div>
                              <div>
                                <span className="text-slate-550 font-extrabold font-mono text-[8.5px] block uppercase">ASSIGNED CLASS</span>
                                <span className="text-rose-455 font-bold font-mono">MERCEDES E-CLASS</span>
                              </div>
                              <div>
                                <span className="text-slate-550 font-extrabold font-mono text-[8.5px] block uppercase">PICK-UP ADDRESS</span>
                                <span className="text-slate-200 font-bold">Hilton Garden Inn Lobby</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Flight Boarding check voucher (r3-flight) */}
                        {activity.id === 'r3-flight' && (
                          <div className="bg-gradient-to-br from-sky-950/20 to-blue-950/25 border-2 border-sky-500/30 rounded-xl p-3.5 flex flex-col gap-2.5 text-xs relative overflow-hidden">
                            <div className="absolute right-0 bottom-0 text-[5rem] font-black select-none text-sky-500/[0.03] leading-none pointer-events-none">DELTA</div>
                            <div className="flex items-center justify-between border-b border-white/5 pb-2">
                              <span className="text-xs font-black uppercase text-sky-400 tracking-wider">✈️ DELTA DIGITAL BOARDING TICKET</span>
                              <span className="font-mono text-[9px] bg-sky-500/15 text-sky-400 px-2 py-0.5 rounded-full border border-sky-500/10 font-bold">{travelWallet.flights.confirmation}</span>
                            </div>
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center justify-between border-b border-white/5 pb-2 text-center select-none bg-black/20 p-2.5 rounded-xl">
                                <div className="text-left">
                                  <span className="text-[8px] font-mono text-slate-500 uppercase block font-black leading-none">ORIGIN</span>
                                  <span className="text-lg font-black text-white leading-none block mt-1.5">FCO</span>
                                  <span className="text-[9px] text-slate-400 mt-1 block">Rome, Italy</span>
                                </div>
                                <div className="flex flex-col items-center">
                                  <span className="text-[8.5px] text-sky-405 font-mono font-semibold">DL0215</span>
                                  <div className="w-16 h-[1.5px] bg-slate-800 relative my-1">
                                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] shrink-0 font-black">✈</span>
                                  </div>
                                  <span className="text-[9px] text-slate-500 font-mono">11h 9m</span>
                                </div>
                                <div className="text-right">
                                  <span className="text-[8px] font-mono text-slate-500 uppercase block font-black leading-none">TARGET</span>
                                  <span className="text-lg font-black text-white leading-none block mt-1.5">ATL</span>
                                  <span className="text-[9px] text-slate-400 mt-1 block">Atlanta, GA</span>
                                </div>
                              </div>

                              <div className="flex flex-col gap-1.5 text-[11px] text-slate-300">
                                <span className="text-[9px] font-mono font-black text-slate-500 uppercase block leading-none">Vetted Passengers Details</span>
                                {travelWallet.flights.passengers.map((passenger, pIdx) => (
                                  <div key={pIdx} className="flex justify-between items-center bg-black/20 p-2 rounded-lg border border-white/5">
                                    <div className="flex flex-col">
                                      <span className="text-slate-200 font-bold">{passenger.name}</span>
                                      <span className="text-[9.5px] text-slate-400 font-mono">Ticket: {passenger.eTicket}</span>
                                    </div>
                                    <div className="text-right">
                                      <span className="text-amber-400 font-mono font-extrabold text-[11.5px] block">{passenger.seat}</span>
                                      <span className="text-[8.5px] text-slate-500 font-medium block">{passenger.class.split(' ')[1]} Class</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Custom couples bullet suggestions */}
                        {activity.tips && activity.tips.length > 0 && (
                          <div className="flex flex-col gap-1.5">
                            <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block font-black">
                              Couple-Tailored Secrets
                            </span>
                            <ul className="list-none flex flex-col gap-1">
                              {activity.tips.map((tip, idx) => (
                                <li key={idx} className="text-xs text-slate-450 flex items-start gap-1.5 leading-relaxed font-medium">
                                  <span className="text-amber-500 mt-1 shrink-0 font-black">•</span>
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Search links for navigation and visual matching */}
                        <div className="flex flex-wrap gap-2 pt-1">
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${activity.title}, ${activity.location}, Rome`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            referrerPolicy="no-referrer"
                            className="bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 hover:text-sky-300 border border-sky-500/20 hover:border-sky-500/30 font-bold text-[11px] px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                            id={`maps-redirect-${activity.id}`}
                          >
                            <MapPin className="w-3.5 h-3.5 text-sky-450" />
                            <span>Navigate Google Maps</span>
                          </a>

                          <a
                            href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(`${activity.title} Rome Italy ${activity.location}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            referrerPolicy="no-referrer"
                            className="bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 hover:text-orange-300 border border-orange-500/15 hover:border-orange-500/25 font-bold text-[11px] px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                            id={`images-redirect-${activity.id}`}
                          >
                            <Camera className="w-3.5 h-3.5 text-orange-400" />
                            <span>Preview Locations</span>
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
