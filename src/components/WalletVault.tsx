import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Ticket, 
  MapPin, 
  Copy, 
  Check, 
  Plane, 
  Hotel, 
  Compass, 
  Utensils, 
  ShieldCheck, 
  PhoneCall, 
  ChevronDown, 
  Info, 
  AlertTriangle,
  ExternalLink,
  CreditCard,
  Sparkles,
  Wifi
} from 'lucide-react';
import { travelWallet } from '../data';

export function WalletVault() {
  const [expandedDoc, setExpandedDoc] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [docFilter, setDocFilter] = useState<'all' | 'transit' | 'hotel' | 'tours' | 'insurance'>('all');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const getDocIcon = (type: string) => {
    switch (type) {
      case 'flight': return <Plane className="w-5 h-5 text-sky-400" />;
      case 'hotel': return <Hotel className="w-5 h-5 text-emerald-400" />;
      case 'tour': return <Compass className="w-5 h-5 text-orange-400" />;
      case 'dining': return <Utensils className="w-5 h-5 text-rose-455" />;
      case 'insurance': return <ShieldCheck className="w-5 h-5 text-indigo-400" />;
      default: return <Ticket className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="flex flex-col gap-5 animate-fadeIn" id="wallet-vault-root">
      
      {/* WALLET HEADER / HERO CARD */}
      <div className="bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-slate-900 border border-white/10 rounded-2xl p-5 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-violet-500/10 to-transparent rounded-full -mr-6 -mt-6 pointer-events-none" />
        
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-extrabold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> SECURE TRAVEL WALLET
            </span>
            <h2 className="text-xl font-bold font-serif text-slate-100 tracking-wide">Anthony & Jeanine</h2>
          </div>
          <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl">
            <CreditCard className="w-5 h-5 text-indigo-300" />
          </div>
        </div>

        <div className="mt-8 flex justify-between items-end border-t border-white/5 pt-4">
          <div className="flex flex-col">
            <span className="text-[8px] font-mono text-slate-500 uppercase font-bold">Encrypted Local Key</span>
            <span className="font-mono text-[11px] text-slate-300">RA-7256-EMERGENCY</span>
          </div>

          <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold text-emerald-400">
            <Wifi className="w-3.5 h-3.5 animate-pulse" />
            <span>OFFLINE ACCESSIBLE</span>
          </div>
        </div>
      </div>

      {/* FILTER BUTTONS ROW */}
      <div className="flex overflow-x-auto gap-1.5 select-none pb-1 scrollbar-none flex-nowrap" id="wallet-filter-container">
        {(['all', 'transit', 'hotel', 'tours', 'insurance'] as const).map(f => (
          <button
            key={f}
            onClick={() => setDocFilter(f)}
            className={`px-3.5 py-2 rounded-xl text-[10px] font-mono uppercase tracking-wider font-extrabold border shrink-0 transition-all cursor-pointer ${
              docFilter === f
                ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
                : 'bg-white/5 text-slate-400 border-white/5 hover:text-slate-205'
            }`}
            id={`wallet-filter-${f}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* DOCUMENT VAULT ACCORDION LIST */}
      <div className="flex flex-col gap-3 relative z-10-wallet" id="wallet-accordion-container">
        
        {/* DELTA FLIGHTS ACCORDION */}
        {(docFilter === 'all' || docFilter === 'transit') && (
          <div className="glass rounded-xl border border-white/5 overflow-hidden">
            <button
              onClick={() => setExpandedDoc(expandedDoc === 'flights' ? null : 'flights')}
              className="w-full p-4 flex justify-between items-center hover:bg-white/5 cursor-pointer text-left"
              id="wallet-doc-flights"
            >
              <div className="flex items-center gap-3">
                {getDocIcon('flight')}
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono uppercase text-sky-400 font-bold leading-none">Airline Booking</span>
                  <span className="text-sm font-black text-slate-100 tracking-wide mt-1">Delta Air Lines flights</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded leading-none">H9AC4L</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expandedDoc === 'flights' ? 'rotate-180' : ''}`} />
              </div>
            </button>

            <AnimatePresence>
              {expandedDoc === 'flights' && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden border-t border-white/5 bg-slate-950/40 text-xs flex flex-col p-4 gap-3 leading-normal"
                >
                  <div className="flex justify-between items-center p-2.5 bg-black/40 rounded-lg">
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-bold">Delta Confirmation Code</span>
                    <button
                      onClick={() => handleCopy(travelWallet.flights.confirmation, 'cf-flights')}
                      className="flex items-center gap-1 text-sky-400 hover:text-sky-300 font-mono font-bold"
                    >
                      <span className="bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded text-[11px] text-sky-300 select-all font-mono font-extrabold">{travelWallet.flights.confirmation}</span>
                      {copiedId === 'cf-flights' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black leading-none">Passengers & Seats</span>
                    {travelWallet.flights.passengers.map((p, pIdx) => (
                      <div key={pIdx} className="bg-white/5 p-2 rounded border border-white/5 flex flex-col gap-1">
                        <div className="flex justify-between items-center font-bold text-slate-200">
                          <span>{p.name}</span>
                          <span className="text-amber-400">Seat {p.seat}</span>
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-400 font-mono leading-none">
                          <span>Ticket: {p.eTicket}</span>
                          <span>{p.class}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3.5 mt-1 border-t border-white/5 pt-3">
                    <div>
                      <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest font-black block leading-none mb-1.5">Return Journey: Friday, July 3, 2026</span>
                      <p className="font-bold text-slate-300 text-xs flex justify-between">
                        <span>{travelWallet.flights.return.flightNum} ({travelWallet.flights.return.aircraft})</span>
                        <span className="text-[10px] font-semibold font-mono text-slate-500">Duration: {travelWallet.flights.return.duration}</span>
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1">Depart: {travelWallet.flights.return.departure} @ <span className="text-slate-202 font-bold">{travelWallet.flights.return.departureTime.split('@')[1]}</span></p>
                      <p className="text-[11px] text-slate-400 font-medium">Arrive: {travelWallet.flights.return.arrival} @ <span className="text-slate-202 font-bold">{travelWallet.flights.return.arrivalTime.split('@')[1]}</span></p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* HILTON HOTEL RECORD ACCORDION */}
        {(docFilter === 'all' || docFilter === 'hotel') && (
          <div className="glass rounded-xl border border-white/5 overflow-hidden">
            <button
              onClick={() => setExpandedDoc(expandedDoc === 'hotel' ? null : 'hotel')}
              className="w-full p-4 flex justify-between items-center hover:bg-white/5 cursor-pointer text-left"
              id="wallet-doc-hotel"
            >
              <div className="flex items-center gap-3">
                {getDocIcon('hotel')}
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold leading-none">Hotel stay</span>
                  <span className="text-sm font-black text-slate-100 tracking-wide mt-1">Hilton Garden Inn Rome Colosseum</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded leading-none">3400671259</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expandedDoc === 'hotel' ? 'rotate-180' : ''}`} />
              </div>
            </button>

            <AnimatePresence>
              {expandedDoc === 'hotel' && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden border-t border-white/5 bg-slate-950/40 text-xs flex flex-col p-4 gap-3 leading-normal"
                >
                  <div className="flex justify-between items-center p-2.5 bg-black/40 rounded-lg">
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-bold">Res. Code</span>
                    <button
                      onClick={() => handleCopy(travelWallet.hotel.confirmation, 'cf-hotel')}
                      className="flex items-center gap-1 font-mono font-bold"
                    >
                      <span className="bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-emerald-400 font-mono font-extrabold select-all">{travelWallet.hotel.confirmation}</span>
                      {copiedId === 'cf-hotel' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    </button>
                  </div>

                  <div className="flex flex-col gap-1 pb-1">
                    <h4 className="font-black text-slate-100 text-sm leading-snug">{travelWallet.hotel.hotelName}</h4>
                    <p className="text-slate-400 text-xs">{travelWallet.hotel.address}</p>
                    <p className="text-slate-400 text-xs font-mono font-bold mt-1">Phone: {travelWallet.hotel.phone}</p>
                  </div>

                  {/* Direct Google Maps launch button */}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${travelWallet.hotel.hotelName}, ${travelWallet.hotel.address}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="bg-sky-500/10 hover:bg-sky-500/25 text-sky-400 hover:text-sky-300 border border-sky-500/20 text-xs font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer w-full text-center"
                    id="hotel-map-redirect"
                  >
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    <span>Open Hilton Location on Maps</span>
                  </a>

                  <div className="grid grid-cols-2 gap-2 mt-1 font-medium">
                    <div className="bg-white/5 p-2 rounded border border-white/5">
                      <span className="text-[9px] text-slate-500 font-mono uppercase font-black">Check-In: 2:00 PM</span>
                      <p className="font-bold text-slate-200 text-xs mt-0.5">{travelWallet.hotel.checkIn.date.split(',')[1]}</p>
                    </div>

                    <div className="bg-white/5 p-2 rounded border border-white/5">
                      <span className="text-[9px] text-slate-500 font-mono uppercase font-black">Check-Out: 12:00 PM</span>
                      <p className="font-bold text-slate-200 text-xs mt-0.5">{travelWallet.hotel.checkOut.date.split(',')[1]}</p>
                    </div>
                  </div>

                  <div className="bg-white/5 p-3 rounded-lg border border-white/5 flex flex-col gap-1.5 leading-normal">
                    <div className="flex justify-between items-center text-xs border-b border-white/5 pb-1">
                      <span className="text-slate-450">Room Category</span>
                      <strong className="text-slate-200">{travelWallet.hotel.roomType}</strong>
                    </div>

                    <div className="flex justify-between items-center text-xs border-b border-white/5 pb-1">
                      <span className="text-slate-450">Cost & Fees Paid</span>
                      <strong className="text-slate-200">{travelWallet.hotel.pointsAndCash}</strong>
                    </div>

                    <div className="flex justify-between items-center text-xs border-b border-white/5 pb-1">
                      <span className="text-slate-450">Card on Record</span>
                      <strong className="text-slate-200">{travelWallet.hotel.cardOnRef}</strong>
                    </div>

                    <div className="flex justify-between items-center text-xs leading-none">
                      <span className="text-slate-450">Honors ID</span>
                      <strong className="text-slate-200">{travelWallet.hotel.honorsNum}</strong>
                    </div>
                  </div>

                  <p className="text-[10.5px] text-slate-400 bg-emerald-500/5 border border-emerald-500/20 p-2.5 rounded-lg font-medium leading-relaxed">
                    🌟 <strong className="text-emerald-450 font-bold">Honors Benefit:</strong> {travelWallet.hotel.notes}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* TOUR GUY Guided Rome VIP Tour ACCORDION */}
        {(docFilter === 'all' || docFilter === 'tours') && (
          <div className="glass rounded-xl border border-white/5 overflow-hidden">
            <button
              onClick={() => setExpandedDoc(expandedDoc === 'tourguy' ? null : 'tourguy')}
              className="w-full p-4 flex justify-between items-center hover:bg-white/5 cursor-pointer text-left"
              id="wallet-doc-tourguy"
            >
              <div className="flex items-center gap-3">
                {getDocIcon('tour')}
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono uppercase text-orange-400 font-bold leading-none">VIP Rome Grand Tour</span>
                  <span className="text-sm font-black text-slate-100 tracking-wide mt-1">Tour Guy: Vatican & Colosseum</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded leading-none">#1037174</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expandedDoc === 'tourguy' ? 'rotate-180' : ''}`} />
              </div>
            </button>

            <AnimatePresence>
              {expandedDoc === 'tourguy' && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden border-t border-white/5 bg-slate-950/40 text-xs flex flex-col p-4 gap-3.5 leading-normal"
                >
                  <div className="flex justify-between items-center p-2.5 bg-black/40 rounded-lg">
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-bold">Booking Reference</span>
                    <button
                      onClick={() => handleCopy(travelWallet.tourGuy.bookingId, 'cf-tourguy')}
                      className="flex items-center gap-1 font-mono font-bold"
                    >
                      <span className="bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 text-orange-400 font-mono font-extrabold select-all">#{travelWallet.tourGuy.bookingId}</span>
                      {copiedId === 'cf-tourguy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    </button>
                  </div>

                  <div className="flex flex-col gap-1.5 pb-1">
                    <h4 className="font-black text-slate-100 text-sm leading-snug">{travelWallet.tourGuy.tourName}</h4>
                    <p className="text-slate-450 font-bold text-xs">Date: {travelWallet.tourGuy.date}  •  Duration: {travelWallet.tourGuy.duration}</p>
                    <p className="text-slate-400 text-xs font-mono font-medium">Visitor Lead: {travelWallet.tourGuy.customerName}</p>
                  </div>

                  <div className="bg-orange-500/5 border border-orange-500/20 p-3 rounded-lg flex flex-col gap-2">
                    <div className="flex items-start gap-2 text-orange-300 font-bold">
                      <MapPin className="w-4 h-4 text-orange-405 shrink-0 mt-0.5" />
                      <div>
                        <span className="uppercase text-[9px] font-mono font-black tracking-wider block">Meeting Point (Meet at 09:15 AM)</span>
                        <p className="text-xs leading-normal font-semibold mt-0.5">{travelWallet.tourGuy.meetingPoint}</p>
                      </div>
                    </div>
                    <p className="text-[11.5px] text-slate-400 italic pl-6 font-medium">
                      {travelWallet.tourGuy.directions}
                    </p>
                    
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Colosseo Metro Stop Rome Newsstand`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      referrerPolicy="no-referrer"
                      className="bg-sky-500/10 hover:bg-sky-500/25 text-sky-455 border border-sky-500/20 text-[10.5px] font-extrabold py-1.5 px-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer w-fit self-end mt-1"
                      id="tourguy-map-redirect"
                    >
                      <MapPin className="w-3 h-3 text-sky-400" />
                      <span>Route Meeting Point</span>
                    </a>
                  </div>

                  <div className="flex flex-col gap-2 bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-red-300">
                    <span className="text-[9.5px] font-mono uppercase font-black text-red-400 flex items-center gap-1 leading-none">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> STRICT TOUR RULES & CODE
                    </span>
                    <ul className="list-disc pl-4 flex flex-col gap-1.5 text-[11px] font-semibold text-slate-350">
                      {travelWallet.tourGuy.checklist.map((c, cIdx) => (
                        <li key={cIdx}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* COLOSSEUM VIP UNDERGROUND TICKET ACCORDION */}
        {(docFilter === 'all' || docFilter === 'tours') && (
          <div className="glass rounded-xl border border-white/5 overflow-hidden">
            <button
              onClick={() => setExpandedDoc(expandedDoc === 'colosseum' ? null : 'colosseum')}
              className="w-full p-4 flex justify-between items-center hover:bg-white/5 cursor-pointer text-left"
              id="wallet-doc-colosseum"
            >
              <div className="flex items-center gap-3">
                {getDocIcon('monument')}
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono uppercase text-amber-400 font-bold leading-none">Arena & Sotterranei VIP</span>
                  <span className="text-sm font-black text-slate-100 tracking-wide mt-1">Colosseum Underground Chamber</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded leading-none">GPCOQD</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expandedDoc === 'colosseum' ? 'rotate-180' : ''}`} />
              </div>
            </button>

            <AnimatePresence>
              {expandedDoc === 'colosseum' && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden border-t border-white/5 bg-slate-950/40 text-xs flex flex-col p-4 gap-3.5 leading-normal"
                >
                  <div className="flex justify-between items-center p-2.5 bg-black/40 rounded-lg">
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-bold">Reservation Reference</span>
                    <button
                      onClick={() => handleCopy(travelWallet.colosseumVip.reservationNum, 'cf-colosseum')}
                      className="flex items-center gap-1 font-mono font-bold"
                    >
                      <span className="bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-amber-400 font-mono font-extrabold select-all">{travelWallet.colosseumVip.reservationNum}</span>
                      {copiedId === 'cf-colosseum' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    </button>
                  </div>

                  <div className="flex flex-col gap-1">
                    <h4 className="font-black text-slate-100 text-sm leading-snug">{travelWallet.colosseumVip.type}</h4>
                    <p className="text-slate-440 font-bold text-xs mt-1">Date: Thursday, July 2, 2026 @ 13:00 (1:00 PM)</p>
                    <p className="text-red-300 font-semibold font-mono text-[10.5px]">Show up for checks by 12:30 PM (30 minutes prior)</p>
                  </div>

                  {/* Individual Ticket QR Pass Codes */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[9.5px] font-mono text-slate-550 uppercase tracking-widest font-black leading-none">Individual Ticket Passes</span>
                    {travelWallet.colosseumVip.tickets.map((t, tIdx) => (
                      <div key={tIdx} className="bg-slate-900 border border-white/5 p-2.5 rounded flex items-center justify-between text-xs font-semibold">
                        <div className="flex flex-col">
                          <span className="text-slate-200">{t.holder}</span>
                          <span className="text-[10px] text-slate-450 font-mono">Price: {t.price}</span>
                        </div>
                        <button
                          onClick={() => handleCopy(t.ticketCode, `tk-col-${tIdx}`)}
                          className="flex items-center gap-1 font-mono text-amber-400 hover:text-amber-300"
                        >
                          <span className="bg-white/5 border border-white/10 px-1.5 py-0.5 rounded leading-none select-all font-mono font-bold">{t.ticketCode}</span>
                          {copiedId === `tk-col-${tIdx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-550" />}
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="bg-amber-500/5 border border-amber-500/20 p-3 rounded-lg flex flex-col gap-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-450 font-extrabold flex items-center gap-1">
                      <Info className="w-3.5 h-3.5" /> Essential Gladiator Hall Rules
                    </span>
                    <ul className="list-disc pl-4 flex flex-col gap-1 text-[11px] text-slate-350 font-semibold leading-relaxed">
                      {travelWallet.colosseumVip.guidelines.map((g, gIdx) => (
                        <li key={gIdx}>{g}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ST. PETER'S BASILICA ONLINE PASS ACCORDION */}
        {(docFilter === 'all' || docFilter === 'tours') && (
          <div className="glass rounded-xl border border-white/5 overflow-hidden">
            <button
              onClick={() => setExpandedDoc(expandedDoc === 'basilica' ? null : 'basilica')}
              className="w-full p-4 flex justify-between items-center hover:bg-white/5 cursor-pointer text-left"
              id="wallet-doc-basilica"
            >
              <div className="flex items-center gap-3">
                {getDocIcon('tour')}
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono uppercase text-sky-400 font-bold leading-none">Basilica di San Pietro</span>
                  <span className="text-sm font-black text-slate-100 tracking-wide mt-1">St. Peter's Basilica Sacred Entrance</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded leading-none">TIE-7256</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expandedDoc === 'basilica' ? 'rotate-180' : ''}`} />
              </div>
            </button>

            <AnimatePresence>
              {expandedDoc === 'basilica' && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden border-t border-white/5 bg-slate-950/40 text-xs flex flex-col p-4 gap-3.5 leading-normal"
                >
                  <div className="flex justify-between items-center p-2.5 bg-black/40 rounded-lg">
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-bold">Booking Code</span>
                    <button
                      onClick={() => handleCopy(travelWallet.basilica.bookingCode, 'cf-basilica')}
                      className="flex items-center gap-1 font-mono font-bold"
                    >
                      <span className="bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 text-sky-400 font-mono font-extrabold select-all">{travelWallet.basilica.bookingCode}</span>
                      {copiedId === 'cf-basilica' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    </button>
                  </div>

                  <div className="flex flex-col gap-1 pb-1">
                    <h4 className="font-black text-slate-100 text-sm leading-none">St. Peter's Basilica Online Reservation</h4>
                    <p className="text-slate-440 font-bold text-xs mt-1.5 font-medium">Date: {travelWallet.basilica.date} @ 18:00 (6:00 PM)</p>
                    <p className="text-slate-400 text-[10.5px]">Quantity: {travelWallet.basilica.quantity}  • Includes Digital Audioguide</p>
                  </div>

                  {/* Individual Code ticket names */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[9.5px] font-mono text-slate-550 uppercase tracking-widest font-black leading-none">Individual Ticket Code</span>
                    {travelWallet.basilica.visitors.map((v, vIdx) => (
                      <div key={vIdx} className="bg-slate-900 border border-white/5 p-2.5 rounded flex items-center justify-between text-xs font-semibold">
                        <span className="text-slate-205">{v.name}</span>
                        <button
                          onClick={() => handleCopy(v.ticketCode, `tk-bas-${vIdx}`)}
                          className="flex items-center gap-1 font-mono text-sky-400 hover:text-sky-300"
                        >
                          <span className="bg-white/5 border border-white/10 px-1.5 py-0.5 rounded leading-none select-all font-bold">{v.ticketCode}</span>
                          {copiedId === `tk-bas-${vIdx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-550" />}
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="bg-sky-500/5 border border-sky-500/20 p-3 rounded-lg flex flex-col gap-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-extrabold flex items-center gap-1 leading-none">
                      <MapPin className="w-3.5 h-3.5" /> Group Meeting Point & Colonnade
                    </span>
                    <p className="text-[11.5px] text-slate-205 font-bold">Access Gate: {travelWallet.basilica.accessPoint}</p>
                    <p className="text-[11.5px] text-slate-400 leading-normal italic mt-1 font-medium">
                      {travelWallet.basilica.routeReservedInfo}
                    </p>
                    
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Largo del Colonnato Rome`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      referrerPolicy="no-referrer"
                      className="bg-sky-500/10 hover:bg-sky-500/25 text-sky-455 border border-sky-500/20 text-[10.5px] font-extrabold py-1.5 px-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer w-fit self-end mt-1"
                      id="basilica-map-redirect"
                    >
                      <MapPin className="w-3 h-3 text-sky-400" />
                      <span>Route Meeting Point</span>
                    </a>
                  </div>

                  <p className="text-[10.5px] text-slate-400 bg-red-500/5 border border-red-500/20 p-2.5 rounded-lg font-medium leading-relaxed">
                    ⚠️ <strong className="text-red-400 font-bold">Advisory note:</strong> {travelWallet.basilica.notes}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* SKYLINE DINNER RESERVATION ACCORDION */}
        {(docFilter === 'all' || docFilter === 'hotel') && (
          <div className="glass rounded-xl border border-white/5 overflow-hidden">
            <button
              onClick={() => setExpandedDoc(expandedDoc === 'dinner' ? null : 'dinner')}
              className="w-full p-4 flex justify-between items-center hover:bg-white/5 cursor-pointer text-left"
              id="wallet-doc-dinner"
            >
              <div className="flex items-center gap-3">
                {getDocIcon('dining')}
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono uppercase text-rose-400 font-bold leading-none">Rooftop Sky Dinner</span>
                  <span className="text-sm font-black text-slate-100 tracking-wide mt-1">Ristorante Forum Roof Garden</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-rose-455 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded leading-none">Confirmed</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expandedDoc === 'dinner' ? 'rotate-180' : ''}`} />
              </div>
            </button>

            <AnimatePresence>
              {expandedDoc === 'dinner' && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden border-t border-white/5 bg-slate-950/40 text-xs flex flex-col p-4 gap-3.5 leading-normal"
                >
                  <div className="flex flex-col gap-1 pb-1">
                    <h4 className="font-black text-slate-100 text-sm leading-snug">{travelWallet.dinner.restaurantName}</h4>
                    <p className="text-slate-440 font-bold text-xs mt-1">Tuesday, June 30, 2026 @ 19:00 (7:00 PM)</p>
                    <p className="text-slate-400 text-xs mt-1">Address: {travelWallet.dinner.address}</p>
                    <p className="text-slate-400 text-xs font-mono font-medium">Booked Under: Anthony Evans  •  Guests Count: {travelWallet.dinner.guestsCount} Persons</p>
                    <p className="text-slate-400 text-xs font-mono font-medium">Email: {travelWallet.dinner.emailContact}  •  Phone: {travelWallet.dinner.phone}</p>
                  </div>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${travelWallet.dinner.restaurantName}, ${travelWallet.dinner.address}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="bg-sky-500/10 hover:bg-sky-500/25 text-sky-400 hover:text-sky-300 border border-sky-500/20 text-xs font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer w-full text-center"
                    id="dinner-map-redirect"
                  >
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    <span>Restaurant Location on Google Maps</span>
                  </a>

                  <p className="text-[10.5px] text-slate-400 bg-amber-500/5 border border-amber-500/20 p-2.5 rounded-lg font-medium leading-relaxed">
                    🕒 <strong className="text-amber-505 font-bold">Arrival warning:</strong> {travelWallet.dinner.notes}
                  </p>

                  <p className="text-[10.5px] text-slate-400 bg-red-500/5 border border-red-500/20 p-2.5 rounded-lg font-medium leading-relaxed">
                    ⚠️ <strong className="text-red-400 font-bold">Cancellation policy fee:</strong> {travelWallet.dinner.noShowFee}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ALLIANZ TRAVEL INSURANCE ACCORDION */}
        {(docFilter === 'all' || docFilter === 'insurance') && (
          <div className="glass rounded-xl border border-white/5 overflow-hidden">
            <button
              onClick={() => setExpandedDoc(expandedDoc === 'allianz' ? null : 'allianz')}
              className="w-full p-4 flex justify-between items-center hover:bg-white/5 cursor-pointer text-left"
              id="wallet-doc-allianz"
            >
              <div className="flex items-center gap-3">
                {getDocIcon('insurance')}
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold leading-none">Security Assurance I</span>
                  <span className="text-sm font-black text-slate-100 tracking-wide mt-1">Allianz Global Protect II</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded leading-none">EUSP253</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expandedDoc === 'allianz' ? 'rotate-180' : ''}`} />
              </div>
            </button>

            <AnimatePresence>
              {expandedDoc === 'allianz' && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden border-t border-white/5 bg-slate-950/40 text-xs flex flex-col p-4 gap-3.5 leading-normal"
                >
                  <div className="flex justify-between items-center p-2.5 bg-black/40 rounded-lg">
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-bold">Policy Number</span>
                    <button
                      onClick={() => handleCopy(travelWallet.insuranceAllianz.policyNumber, 'cf-allianz')}
                      className="flex items-center gap-1 font-mono font-bold"
                    >
                      <span className="bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 text-indigo-300 font-mono font-extrabold select-all">{travelWallet.insuranceAllianz.policyNumber}</span>
                      {copiedId === 'cf-allianz' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    </button>
                  </div>

                  <div className="bg-white/5 p-3 rounded-lg border border-white/5 flex flex-col gap-1.5 leading-normal font-medium">
                    <div className="flex justify-between items-center text-xs pb-1 border-b border-white/5">
                      <span className="text-slate-450">Insured Lead</span>
                      <strong className="text-slate-200">{travelWallet.insuranceAllianz.holder}</strong>
                    </div>

                    <div className="flex justify-between items-center text-xs pb-1 border-b border-white/5">
                      <span className="text-slate-450">Amt Paid</span>
                      <strong className="text-slate-200 font-mono">{travelWallet.insuranceAllianz.cost}</strong>
                    </div>

                    <div className="flex justify-between items-center text-xs pb-1 border-b border-white/5">
                      <span className="text-slate-450">Purchased Date</span>
                      <strong className="text-slate-200 font-mono">{travelWallet.insuranceAllianz.purchaseDate}</strong>
                    </div>

                    <div className="flex justify-between items-center text-xs leading-none">
                      <span className="text-slate-450">Active Dates</span>
                      <strong className="text-slate-200 font-mono">{travelWallet.insuranceAllianz.travelDates}</strong>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 pb-1">
                    <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest font-black leading-none">24/7 Contacts Helpline</span>
                    {travelWallet.insuranceAllianz.phones.map((p, pIdx) => (
                      <div key={pIdx} className="bg-slate-900 border border-white/5 p-2 rounded flex items-center gap-2.5 font-mono text-xs font-semibold">
                        <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="text-slate-200">{p}</span>
                      </div>
                    ))}
                    {travelWallet.insuranceAllianz.email && (
                      <p className="text-[11px] text-slate-400 font-mono mt-1 font-medium">Email: <span className="text-rose-300 font-bold underline select-all">{travelWallet.insuranceAllianz.email}</span></p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* AMERICAN EXPRESS PROTECTION ACCORDION */}
        {(docFilter === 'all' || docFilter === 'insurance') && (
          <div className="glass rounded-xl border border-white/5 overflow-hidden">
            <button
              onClick={() => setExpandedDoc(expandedDoc === 'amex' ? null : 'amex')}
              className="w-full p-4 flex justify-between items-center hover:bg-white/5 cursor-pointer text-left"
              id="wallet-doc-amex"
            >
              <div className="flex items-center gap-3">
                {getDocIcon('insurance')}
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold leading-none">Security Assurance II</span>
                  <span className="text-sm font-black text-slate-100 tracking-wide mt-1">American Express Protection</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded leading-none">5000293</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expandedDoc === 'amex' ? 'rotate-180' : ''}`} />
              </div>
            </button>

            <AnimatePresence>
              {expandedDoc === 'amex' && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden border-t border-white/5 bg-slate-950/40 text-xs flex flex-col p-4 gap-3.5 leading-normal"
                >
                  <div className="flex justify-between items-center p-2.5 bg-black/40 rounded-lg">
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-bold">Enrolled Policy ID</span>
                    <button
                      onClick={() => handleCopy(travelWallet.insuranceAmex.policyNumber, 'cf-amex')}
                      className="flex items-center gap-1 font-mono font-bold"
                    >
                      <span className="bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 text-indigo-300 font-mono font-extrabold select-all">{travelWallet.insuranceAmex.policyNumber}</span>
                      {copiedId === 'cf-amex' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    </button>
                  </div>

                  <div className="bg-white/5 p-3 rounded-lg border border-white/5 flex flex-col gap-1.5 leading-normal font-medium">
                    <div className="flex justify-between items-center text-xs pb-1 border-b border-white/5">
                      <span className="text-slate-450 border-white/5">Insured Member</span>
                      <strong className="text-slate-200">{travelWallet.insuranceAmex.holder}</strong>
                    </div>

                    <div className="flex justify-between items-center text-xs pb-1 border-b border-white/5">
                      <span className="text-slate-450">Enrolled Date</span>
                      <strong className="text-slate-200 font-mono">{travelWallet.insuranceAmex.purchaseDate}</strong>
                    </div>

                    <div className="flex justify-between items-center text-xs leading-none">
                      <span className="text-slate-450 border-white/5">Active Dates</span>
                      <strong className="text-slate-200 font-mono">{travelWallet.insuranceAmex.travelDates}</strong>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 font-semibold">
                    <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest font-black leading-none">Helpline Customer Call</span>
                    <div className="bg-slate-900 border border-white/5 p-2 rounded flex items-center gap-2.5 font-mono text-xs">
                      <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-slate-200">1-800-228-6855</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

      </div>
    </div>
  );
}
