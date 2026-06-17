import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home,
  Compass, 
  Utensils, 
  BookOpen, 
  Sparkles, 
  AlertTriangle,
  MapPin,
  FolderHeart,
  Wallet
} from 'lucide-react';
import { HomeDashboard } from './components/HomeDashboard';
import { TimelineTracker } from './components/TimelineTracker';
import { DiningCouples } from './components/DiningCouples';
import { CouplesPhrasebook } from './components/CouplesPhrasebook';
import { SecretsTips } from './components/SecretsTips';
import { ScamsGuide } from './components/ScamsGuide';
import { RomeMemoryVault } from './components/RomeMemoryVault';
import { EmergencyVitalShield } from './components/EmergencyVitalShield';
import { WalletVault } from './components/WalletVault';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'timeline' | 'dining' | 'wallet' | 'phrasebook' | 'secrets' | 'scams'>('home');
  const [isMemoryVaultOpen, setIsMemoryVaultOpen] = useState<boolean>(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen text-slate-100 flex flex-col items-center pb-28 relative" id="app-root-container">
      
      {/* Dynamic Glow Mesh Background Layer */}
      <div className="mesh-bg" />

      {/* Main Container */}
      <div className="w-full max-w-md px-4 sm:px-6 z-10 flex flex-col gap-5 pt-6 pb-20 relative">
        
        {/* TOP ANCHORED VITAL COMMAND BUTTONS */}
        <div className="flex justify-between items-center w-full gap-2.5 mt-1">
          {/* Top Left: Memory Vault Scavenger Quest */}
          <button
            onClick={() => setIsMemoryVaultOpen(true)}
            className="flex-1 py-2 px-3 bg-white/5 hover:bg-white/10 active:scale-95 text-slate-350 hover:text-rose-400 font-mono font-black text-[9.5px] uppercase tracking-wider rounded-xl border border-white/5 transition-all flex items-center justify-center gap-1.5 cursor-pointer leading-none"
            id="anchor-btn-vault"
          >
            <FolderHeart className="w-3.5 h-3.5 text-rose-455 shrink-0" />
            <span>📸 Memory Vault</span>
          </button>

          {/* Top Right: Emergency Services & US Embassy Vital Shield */}
          <button
            onClick={() => setIsEmergencyOpen(true)}
            className="flex-1 py-2 px-3 bg-red-950/20 hover:bg-red-950/30 active:scale-95 text-red-200 hover:text-red-350 font-mono font-black text-[9.5px] uppercase tracking-wider rounded-xl border border-red-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer leading-none animate-pulse"
            id="anchor-btn-emergency"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
            <span>🚨 Vital Shield</span>
          </button>
        </div>

        {/* APP BRAND HEADER SECTION */}
        <header className="text-center flex flex-col items-center gap-1.5 mt-2">
          <h1 className="text-4xl font-extrabold text-white tracking-widest font-serif italic py-1 leading-none bg-gradient-to-b from-neutral-100 via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
            Roma Aeterna
          </h1>
          
          <p className="text-xs text-rose-400 font-semibold tracking-wide flex items-center justify-center gap-1.5 leading-none mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-rose-450 shrink-0" />
            <span className="font-serif italic">Rome Travel Vault • June 30 – July 3, 2026</span>
          </p>
        </header>

        {/* PRIMARY COMPONENT PANEL RENDERER */}
        <main className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'home' && <HomeDashboard />}
              {activeTab === 'timeline' && <TimelineTracker />}
              {activeTab === 'dining' && <DiningCouples />}
              {activeTab === 'wallet' && <WalletVault />}
              {activeTab === 'phrasebook' && <CouplesPhrasebook />}
              {activeTab === 'secrets' && <SecretsTips />}
              {activeTab === 'scams' && <ScamsGuide />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* HORIZONTAL SCROLL PILL DOCK NAVIGATION FOR BOTTOM BAR */}
      <nav 
        className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] max-w-md bg-black/95 backdrop-blur-2xl rounded-2xl border border-white/10 p-2 shadow-2xl flex items-center gap-1 overflow-x-auto scrollbar-none z-50 flex-nowrap"
        id="scrolling-bottom-nav"
      >
        {/* Home Tab */}
        <button
          onClick={() => setActiveTab('home')}
          className={`py-2 px-3 rounded-xl text-center flex flex-col items-center gap-1 cursor-pointer transition-all shrink-0 min-w-[70px] ${
            activeTab === 'home'
              ? 'text-rose-400 bg-white/10 border border-white/10 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
          id="dock-tab-home"
        >
          <Home className={`w-4 h-4 ${activeTab === 'home' ? 'scale-110 text-rose-405' : ''}`} />
          <span className="text-[9px] font-black uppercase tracking-wider leading-none">Home</span>
        </button>

        {/* Timeline Tab */}
        <button
          onClick={() => setActiveTab('timeline')}
          className={`py-2 px-3 rounded-xl text-center flex flex-col items-center gap-1 cursor-pointer transition-all shrink-0 min-w-[75px] ${
            activeTab === 'timeline'
              ? 'text-rose-400 bg-white/10 border border-white/10 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
          id="dock-tab-timeline"
        >
          <Compass className={`w-4 h-4 ${activeTab === 'timeline' ? 'scale-110 text-rose-405' : ''}`} />
          <span className="text-[9px] font-black uppercase tracking-wider leading-none">Itinerary</span>
        </button>

        {/* Dining Walks Tab */}
        <button
          onClick={() => setActiveTab('dining')}
          className={`py-2 px-3 rounded-xl text-center flex flex-col items-center gap-1 cursor-pointer transition-all shrink-0 min-w-[90px] ${
            activeTab === 'dining'
              ? 'text-rose-405 bg-white/10 border border-white/10 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
          id="dock-tab-dining"
        >
          <Utensils className={`w-4 h-4 ${activeTab === 'dining' ? 'scale-110 text-rose-405' : ''}`} />
          <span className="text-[9px] font-black uppercase tracking-wider leading-none">Eats & Walks</span>
        </button>

        {/* Wallet Tab */}
        <button
          onClick={() => setActiveTab('wallet')}
          className={`py-2 px-3 rounded-xl text-center flex flex-col items-center gap-1 cursor-pointer transition-all shrink-0 min-w-[75px] ${
            activeTab === 'wallet'
              ? 'text-indigo-400 bg-white/10 border border-white/10 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
          id="dock-tab-wallet"
        >
          <Wallet className={`w-4 h-4 ${activeTab === 'wallet' ? 'scale-110 text-indigo-400' : ''}`} />
          <span className="text-[9px] font-black uppercase tracking-wider leading-none">Wallet</span>
        </button>

        {/* Phrasebook Tab */}
        <button
          onClick={() => setActiveTab('phrasebook')}
          className={`py-2 px-3 rounded-xl text-center flex flex-col items-center gap-1 cursor-pointer transition-all shrink-0 min-w-[85px] ${
            activeTab === 'phrasebook'
              ? 'text-rose-405 bg-white/10 border border-white/10 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
          id="dock-tab-phrasebook"
        >
          <BookOpen className={`w-4 h-4 ${activeTab === 'phrasebook' ? 'scale-110 text-rose-405' : ''}`} />
          <span className="text-[9px] font-black uppercase tracking-wider leading-none">Phrasebook</span>
        </button>

        {/* Secrets Tab */}
        <button
          onClick={() => setActiveTab('secrets')}
          className={`py-2 px-3 rounded-xl text-center flex flex-col items-center gap-1 cursor-pointer transition-all shrink-0 min-w-[75px] ${
            activeTab === 'secrets'
              ? 'text-rose-400 bg-white/10 border border-white/10 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
          id="dock-tab-secrets"
        >
          <Sparkles className={`w-4 h-4 ${activeTab === 'secrets' ? 'scale-110 text-rose-405' : ''}`} />
          <span className="text-[9px] font-black uppercase tracking-wider leading-none">Tips</span>
        </button>

        {/* Scams Tab */}
        <button
          onClick={() => setActiveTab('scams')}
          className={`py-2 px-3 rounded-xl text-center flex flex-col items-center gap-1 cursor-pointer transition-all shrink-0 min-w-[70px] ${
            activeTab === 'scams'
              ? 'text-rose-400 bg-white/10 border border-white/10 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
          id="dock-tab-scams"
        >
          <AlertTriangle className={`w-4 h-4 ${activeTab === 'scams' ? 'scale-110 text-rose-405' : ''}`} />
          <span className="text-[9px] font-black uppercase tracking-wider leading-none">Scams</span>
        </button>
      </nav>

      {/* MODAL OVERLAY PORTALS */}
      <AnimatePresence>
        {isMemoryVaultOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 overflow-y-auto flex items-start justify-center p-4 pt-10"
            id="portal-memory-vault"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="w-full max-w-md"
            >
              <RomeMemoryVault onClose={() => setIsMemoryVaultOpen(false)} />
            </motion.div>
          </motion.div>
        )}

        {isEmergencyOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 overflow-y-auto flex items-start justify-center p-4 pt-10"
            id="portal-emergency-shield"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="w-full max-w-md"
            >
              <EmergencyVitalShield onClose={() => setIsEmergencyOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
