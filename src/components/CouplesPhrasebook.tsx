import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Smile, Sparkles, Volume2, HelpCircle, Check } from 'lucide-react';
import { usefulItalianPhrases } from '../data';

interface Phrase {
  phrase: string;
  translation: string;
  pronunciation?: string;
  category?: 'Romantic' | 'Dining' | 'Essential';
}

const customPhrases: Phrase[] = [
  { phrase: 'Un tavolo per due, per favore.', translation: 'A table for two, please.', pronunciation: 'Oon tah-voh-loh pehr dweh, pehr fah-voh-reh', category: 'Dining' },
  { phrase: 'Possiamo sedere all\'aperto?', translation: 'Are we able to sit outside?', pronunciation: 'Pohs-syah-moh seh-deh-reh ahl-ah-pehr-toh', category: 'Dining' },
  { phrase: 'La specialità della casa?', translation: 'What is the house specialty?', pronunciation: 'Lah speh-chah-lee-tah dehl-lah kah-sah', category: 'Dining' },
  { phrase: 'L\'acqua del rubinetto va benissimo, grazie.', translation: 'Tap water is completely fine, thank you.', pronunciation: 'Lahk-wah dehl roo-bee-neht-toh vah beh-nees-see-moh, grah-tsyeh', category: 'Dining' },
  { phrase: 'Il conto, per favore.', translation: 'The bill, please.', pronunciation: 'Eel kohn-toh, pehr fah-voh-reh', category: 'Dining' },
  { phrase: 'Sei bellissima.', translation: 'You are gorgeous (feminine).', pronunciation: 'Seh-ee beh-lees-see-mah', category: 'Romantic' },
  { phrase: 'Sei bellissimo.', translation: 'You are gorgeous (masculine).', pronunciation: 'Seh-ee beh-lees-see-moh', category: 'Romantic' },
  { phrase: 'Ti amo con tutto il cuore.', translation: 'I love you with all my heart.', pronunciation: 'Tee ah-moh kohn toot-toh eel kwor-eh', category: 'Romantic' },
  { phrase: 'Prendiamo un gelato insieme?', translation: 'Shall we grab a gelato together?', pronunciation: 'Prehn-dyah-moh oon jeh-lah-toh een-syeh-meh', category: 'Dining' },
  { phrase: 'Baciami alla fontana.', translation: 'Kiss me at the fountain.', pronunciation: 'Bah-chah-mee ahl-lah fohn-tah-nah', category: 'Romantic' },
  { phrase: 'Grazie mille per la vostra ospitalità.', translation: 'Thank you very much for your lovely hospitality.', pronunciation: 'Grah-tsyeh meel-leh pehr lah vohs-trah ohs-pee-tah-lee-tah', category: 'Essential' },
  { phrase: "Arrivederci Roma!", translation: "Goodbye Rome!", pronunciation: "Ah-ree-veh-dehr-chee roh-mah", category: "Essential" },
  { phrase: 'Buongiorno, mia cara / mio caro.', translation: 'Good morning, my dear.', pronunciation: 'Bwohn-jor-noh, mee-ah kah-rah / mee-oh kah-roh', category: 'Romantic' },
  { phrase: 'Un\'altra caraffa di vino rosso, per favore.', translation: 'Another carafe of red wine, please.', pronunciation: 'Oon-ahl-trah kah-rahf-fah dee vee-noh rohs-soh, pehr fah-voh-reh', category: 'Dining' }
];

export function CouplesPhrasebook() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Romantic' | 'Dining' | 'Essential'>('All');
  const [activePhraseIdx, setActivePhraseIdx] = useState<number | null>(null);
  const [speakingIdx, setSpeakingIdx] = useState<number | null>(null);
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  
  // Interactive Flashcard states
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 });
  const [quizIndex, setQuizIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [quizPhase, setQuizPhase] = useState<'learning' | 'completed'>('learning');
  
  const filteredPhrases = customPhrases.filter(p => selectedCategory === 'All' || p.category === selectedCategory);

  // Pre-load synthesis voices for faster offline play
  useEffect(() => {
    const handleVoices = () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.getVoices();
        setVoicesLoaded(true);
      }
    };
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = handleVoices;
      handleVoices();
    }
  }, []);

  const handleSpeak = (text: string, index: number, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation(); // Avoid triggering card toggle if clicked on button itself
    }
    
    if (!('speechSynthesis' in window)) {
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'it-IT';
      
      // Attempt to load specifically an Italian voice
      const voices = window.speechSynthesis.getVoices();
      const italianVoice = voices.find(v => v.lang.startsWith('it'));
      if (italianVoice) {
        utterance.voice = italianVoice;
      }
      
      utterance.rate = 0.85; // slightly slower for high-fidelity comprehension
      
      utterance.onstart = () => setSpeakingIdx(index);
      utterance.onend = () => setSpeakingIdx(null);
      utterance.onerror = () => setSpeakingIdx(null);

      window.speechSynthesis.speak(utterance);
    } catch (_) {
      setSpeakingIdx(null);
    }
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setQuizScore({ correct: 0, total: 0 });
    setQuizPhase('learning');
    setIsFlipped(false);
  };

  const handleNextQuiz = (known: boolean) => {
    if (known) {
      setQuizScore(prev => ({ ...prev, correct: prev.correct + 1 }));
    }
    setQuizScore(prev => ({ ...prev, total: prev.total + 1 }));
    
    setIsFlipped(false);
    setTimeout(() => {
      if (quizIndex + 1 < customPhrases.length) {
        setQuizIndex(quizIndex + 1);
      } else {
        setQuizPhase('completed');
      }
    }, 150);
  };

  const activeQuizItem = customPhrases[quizIndex];

  return (
    <div className="flex flex-col gap-5 animate-fadeIn" id="couples-phrasebook-root">
      
      {/* Visual Header */}
      <div className="glass-accent p-4 flex items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2.5">
          <BookOpen className="w-5 h-5 text-rose-450" />
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-mono tracking-wider font-extrabold text-rose-405 uppercase leading-none">Couples Italian</span>
            <span className="text-sm font-black text-white mt-1 uppercase tracking-tight">Italian Couples Phrasebook</span>
          </div>
        </div>
        <Smile className="w-4.5 h-4.5 text-rose-450 shrink-0" />
      </div>

      <p className="text-[11.5px] text-slate-400 font-semibold leading-relaxed text-left -mt-2">
        Tap any block to see physical pronunciation tips. Tap the active <span className="text-rose-400 underline decoration-rose-500/30">speaker button</span> to hear real-time offline local audio.
      </p>

      {/* Mode Selector tabs */}
      <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 backdrop-blur-md text-[11px] font-black uppercase tracking-wider">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${selectedCategory === 'All' ? 'bg-white/10 text-white border border-white/20 font-black' : 'text-slate-400 hover:text-white'}`}
        >
          All
        </button>
        <button
          onClick={() => setSelectedCategory('Romantic')}
          className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${selectedCategory === 'Romantic' ? 'bg-white/10 text-white border border-white/20 font-black' : 'text-slate-400 hover:text-white'}`}
        >
          Love
        </button>
        <button
          onClick={() => setSelectedCategory('Dining')}
          className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${selectedCategory === 'Dining' ? 'bg-white/10 text-white border border-white/20 font-black' : 'text-slate-400 hover:text-white'}`}
        >
          Dining
        </button>
        <button
          onClick={() => setSelectedCategory('Essential')}
          className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${selectedCategory === 'Essential' ? 'bg-white/10 text-white border border-white/20 font-black' : 'text-slate-400 hover:text-white'}`}
        >
          Essential
        </button>
      </div>

      {/* Phrases List */}
      <div className="flex flex-col gap-3 max-h-[360px] overflow-y-auto pr-1">
        {filteredPhrases.map((item, idx) => {
          const isActive = activePhraseIdx === idx;
          const isSpeaking = speakingIdx === idx;
          return (
            <div
              key={idx}
              onClick={() => setActivePhraseIdx(isActive ? null : idx)}
              className={`glass p-3.5 flex flex-col gap-1.5 transition-all cursor-pointer hover:border-white/20 relative ${isActive ? 'bg-white/[0.04] border-rose-500/30 shadow-md' : 'border-white/5'}`}
              id={`phrase-card-${idx}`}
            >
              <div className="flex justify-between items-start gap-4">
                <span className="text-sm font-black text-rose-400 italic font-serif text-left">
                  &ldquo;{item.phrase}&rdquo;
                </span>
                
                {/* Standalone speech button next to every phrase */}
                <button
                  onClick={(e) => handleSpeak(item.phrase, idx, e)}
                  className={`p-1.5 rounded-full border flex items-center justify-center transition-all shrink-0 cursor-pointer ${
                    isSpeaking 
                      ? 'bg-rose-550/30 text-rose-400 border-rose-500 animate-pulse' 
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-200'
                  }`}
                  title="Listen Pronunciation"
                  id={`phrase-speak-btn-${idx}`}
                >
                  <Volume2 className={`w-4.5 h-4.5 ${isSpeaking ? 'scale-110' : ''}`} />
                </button>
              </div>
              
              <span className="text-xs text-slate-300 font-semibold leading-normal text-left">
                {item.translation}
              </span>

              <AnimatePresence>
                {isActive && item.pronunciation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.15 }}
                    className="border-t border-white/5 pt-2 mt-1.5 flex flex-col gap-1 text-[11px] text-left"
                  >
                    <span className="font-mono text-slate-405 uppercase tracking-widest text-[8.5px]">Pronunciation:</span>
                    <span className="text-rose-250 font-medium italic font-serif bg-white/5 py-1 px-2.5 rounded-lg border border-white/5 w-fit">
                      {item.pronunciation}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Couple Practice Flashcards Game widget */}
      <div className="glass-panel p-5 flex flex-col gap-3.5 border-dashed border-rose-500/20 bg-rose-500/[0.01]">
        <div className="flex justify-between items-center border-b border-white/10 pb-2 leading-none">
          <div className="flex items-center gap-1.5 text-xs font-black uppercase text-rose-400 tracking-wider">
            <Sparkles className="w-4 h-4 text-rose-405" />
            <span>Couple Flashcard Quiz</span>
          </div>
          <span className="text-[10px] uppercase font-mono font-bold text-slate-400">
            Card {quizIndex + 1} of {customPhrases.length}
          </span>
        </div>

        {quizPhase === 'learning' ? (
          <div className="flex flex-col gap-3">
            {/* Animated card flipper scene */}
            <div 
              onClick={() => setIsFlipped(!isFlipped)}
              className="h-28 relative cursor-pointer group select-none perspective"
            >
              <div className={`w-full h-full duration-300 transform-style preserve-3d relative transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}>
                
                {/* Front Side */}
                <div className="absolute inset-0 backface-hidden bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-center items-center text-center gap-2">
                  <span className="text-[9px] font-mono tracking-widest uppercase text-slate-450 font-bold">What does this mean?</span>
                  <span className="text-base font-black text-rose-300 font-serif italic">
                    &ldquo;{activeQuizItem.phrase}&rdquo;
                  </span>
                  <span className="text-[10px] text-slate-500 italic mt-1 flex items-center gap-1">
                    <HelpCircle className="w-3 h-3 text-slate-550" /> Click card to reveal translation
                  </span>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-rose-500/0.5 border border-rose-500/20 rounded-2xl p-4 flex flex-col justify-center items-center text-center gap-2">
                  <span className="text-[9px] font-mono tracking-widest uppercase text-rose-400 font-bold">Translation</span>
                  <span className="text-sm font-black text-white">
                    {activeQuizItem.translation}
                  </span>
                  <span className="text-[10px] text-slate-400 italic">
                    {activeQuizItem.pronunciation}
                  </span>
                </div>

              </div>
            </div>

            {/* Verification selectors */}
            <div className="flex gap-2.5 mt-1">
              <button
                onClick={() => handleNextQuiz(false)}
                className="flex-1 py-2 bg-white/5 hover:bg-rose-950/20 text-slate-300 hover:text-rose-405 font-black text-[11px] uppercase tracking-wider rounded-xl border border-white/5 transition-all cursor-pointer"
              >
                Need Practice
              </button>
              <button
                onClick={() => handleNextQuiz(true)}
                className="flex-1 py-2 bg-rose-550/20 hover:bg-rose-550/25 text-rose-400 font-black text-[11px] uppercase tracking-wider rounded-xl border border-rose-550/30 transition-all cursor-pointer"
              >
                We Got It!
              </button>
            </div>
          </div>
        ) : (
          <div className="py-6 text-center flex flex-col items-center gap-3 animate-fadeIn">
            <span className="text-3xl font-mono">🏆</span>
            <h4 className="text-sm font-black text-white uppercase tracking-tight">Italian Practice Completed!</h4>
            <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-[240px] mx-auto">
              Our couple vocabulary is fully checked! We knew <strong className="text-rose-400">{quizScore.correct}</strong> out of <strong className="text-white">{quizScore.total}</strong> typical Roman phrases.
            </p>
            <button
              onClick={resetQuiz}
              className="mt-2 px-4 py-2 bg-rose-500 hover:bg-rose-450 text-white font-black text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer shadow-md shadow-rose-950/20"
            >
              Practice Again
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
