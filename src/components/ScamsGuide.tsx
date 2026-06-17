import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, AlertTriangle, HelpCircle, Check, Play, Info, ThumbsUp, XCircle } from 'lucide-react';

interface ScamItem {
  id: string;
  name: string;
  vibe: string;
  hook: string;
  threat: string;
  defense: string;
}

const classicRomanScams: ScamItem[] = [
  {
    id: 'scam-gladiator',
    name: 'Colosseum Gladiator Photo Trap',
    vibe: 'Gladiators outside monuments',
    hook: 'Men dressed in detailed ancient Roman tunic and shield armor wave you over cheerfully, complimenting your style and offering a quick fun photo with them.',
    threat: 'Once the photo is captured on your phone, their friendliness instantly vanishes and they aggressively demand €20 to €50 *per person*, blocking your path or causing a scene.',
    defense: 'Do NOT raise your phone or stand in their frame. If they approach, firmly say "No grazies!" with a flat open-hand gesture and keep walking. Real municipal guards now arrest these unregistered operators.'
  },
  {
    id: 'scam-bracelet',
    name: 'The "Friendship" String Bracelet & Rose Gift',
    vibe: 'Piazza Navona / Spanish Steps / Trevi',
    hook: 'A street seller drops a fresh rose in your partner’s hand, or tries to tie a woven string bracelet onto your wrist, saying "Free gift for friendship" or "Because she is beautiful!".',
    threat: 'If you accept, they track you closely down the street, claiming you are cold-hearted or insulting them if you do not pay them €5-€15. They target couples to play on the partner\'s guilt.',
    defense: 'Keep your hands closed or inside pockets when walking popular steps. If they drop a rose in her hand, simply walk past and let it fall. Do not catch it. Say "No!" in a loud, flat tone and keep strolling.'
  },
  {
    id: 'scam-restaurant',
    name: 'Hidden Cover Charge & Seafood Weight Scam',
    vibe: 'Scenic patios near monuments',
    hook: 'Patios situated right on prime squares lure you in with cheap pasta prices on outdoor stand chalkboards.',
    threat: 'The bill arrives showing a €6 to €8 per person "pane e coperto" (bread & cover fee) and seafood pasta calculated per 100g, turning a €20 meal into a shocking €130 bill.',
    defense: 'Always review menus for any "coperto" details (normal is €1 to €3 per head). Before ordering whole fresh fish, ask the waiter: "How many grams is this dish and what is its absolute total price?" and cross-reference our Dining list.'
  },
  {
    id: 'scam-metro',
    name: 'The Ticket Machine Help Distraction',
    vibe: 'Termini Station & Metro Line A',
    hook: 'Opportunistic "helpers" stand next to automated transit terminals, pressing buttons in English for you, or children crowd around you as you board tight subways.',
    threat: 'While you are confused looking at high-glance ticketing options or cash slots, they pocket change, demand money helper tips, or pickpocket handbags under cardboard signs.',
    defense: 'Never buy terminal fares from individuals standing by the machines—only swipe your contactless credit cards directly at the turnstiles! Rome Metro turnstiles accept simple Apple Pay/Google Pay/Swipe.'
  }
];

interface QuizScenario {
  id: number;
  question: string;
  context: string;
  options: { text: string; correct: boolean; explanation: string }[];
}

const interactiveScenarioQuiz: QuizScenario[] = [
  {
    id: 1,
    question: 'A friendly man in majestic armor outside the Colosseum pulls both of you in for a cute group photo.',
    context: 'He is holding a golden imperial gladius sword and smiling nicely.',
    options: [
      {
        text: 'Hand him your phone and laugh, taking 3 quick pose shots!',
        correct: false,
        explanation: 'Incorrect. This triggers their aggressive €30 demand and they will refuse to leave you until cash is produced.'
      },
      {
        text: 'Politely shake your head, do a firm open hand decline, and keep moving.',
        correct: true,
        explanation: 'Spot on! This flat boundary tells them you are sharp, savvy travelers who can’t be easily extorted.'
      }
    ]
  },
  {
    id: 2,
    question: 'A merchant drops a beautiful red rose on her shoulder and says, "Free because she is a gorgeous princess!"',
    context: 'Your partner looks flattered but is holding the rose awkwardly.',
    options: [
      {
        text: 'Let her hold it, smile, and try to find change in your pockets to be nice.',
        correct: false,
        explanation: 'Incorrect. If you hand over €1, they will demand €5 or €10, pursuing both of you aggressively.'
      },
      {
        text: 'Politely let the rose fall to the floor, say a sharp "No grazie!" and continue walking.',
        correct: true,
        explanation: 'Correct! Letting the object drop is the best psychological reset. Scammers will quickly pick up their rose and focus elsewhere.'
      }
    ]
  },
  {
    id: 3,
    question: 'We are buying tickets at a terminal and a teen starts tapping the screens offering to help secure the cheaper tourist pass.',
    context: 'The station is busy and you feel quite rushed.',
    options: [
      {
        text: 'Ignore the ticket screen, say "No, prego" firmly, and tap your phone or credit card directly at the turnstile gate instead.',
        correct: true,
        explanation: 'Awesome! Rome’s entire bus/metro system is "Tap & Go"—no physical paper ticket is even needed! Tap your cards or Apple wallet directly at the gate.'
      },
      {
        text: 'Accept his assistance, since he knows the complex machinery and can save us some euros.',
        correct: false,
        explanation: 'Incorrect. These automated assistants often demand tips or check your wallet compartment as a pickpocket distraction.'
      }
    ]
  }
];

export function ScamsGuide() {
  const [activeScamId, setActiveScamId] = useState<string | null>(null);
  
  // Interactive roleplay quiz state
  const [currentScenarioIdx, setCurrentScenarioIdx] = useState(0);
  const [selectedOptIdx, setSelectedOptIdx] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleSelectOption = (idx: number, isCorrect: boolean) => {
    setSelectedOptIdx(idx);
    if (isCorrect) setQuizScore(score => score + 1);
  };

  const nextScenario = () => {
    setSelectedOptIdx(null);
    if (currentScenarioIdx + 1 < interactiveScenarioQuiz.length) {
      setCurrentScenarioIdx(currentScenarioIdx + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentScenarioIdx(0);
    setSelectedOptIdx(null);
    setQuizScore(0);
    setQuizCompleted(false);
  };

  const activeScenario = interactiveScenarioQuiz[currentScenarioIdx];

  return (
    <div className="flex flex-col gap-5 animate-fadeIn" id="scams-guide-root">
      
      {/* Visual Title Header */}
      <div className="glass-accent p-4 flex items-center justify-between gap-3 shadow-md bg-rose-950/20 border-rose-500/30">
        <div className="flex items-center gap-2.5">
          <ShieldAlert className="w-5 h-5 text-rose-455 animate-pulse-subtle" />
          <div className="flex flex-col">
            <span className="text-[10px] font-mono tracking-wider font-extrabold text-rose-450 uppercase leading-none">Safety & Guard</span>
            <span className="text-sm font-black text-white mt-1 uppercase tracking-tight">Scams Avoidance Guide</span>
          </div>
        </div>
        <AlertTriangle className="w-4.5 h-4.5 text-rose-450 shrink-0" />
      </div>

      {/* Advisory Warning */}
      <p className="text-xs text-slate-400 leading-relaxed font-semibold bg-white/5 border border-white/5 p-3.5 rounded-xl text-center">
        💡 <strong className="text-rose-400 font-serif italic">Private Note:</strong> Rome is an safe and beautiful city. However, high concentrations of tourists invite simple psychological trap artists outside monuments. Read this cheat grid together so we know how to respond safely in seconds!
      </p>

      {/* Accordion List of Scams */}
      <div className="flex flex-col gap-3.5">
        {classicRomanScams.map(sc => {
          const isOpen = activeScamId === sc.id;
          return (
            <div
              key={sc.id}
              onClick={() => setActiveScamId(isOpen ? null : sc.id)}
              className={`p-4 rounded-xl border flex flex-col gap-3 transition-all cursor-pointer hover:border-white/20 select-none ${
                isOpen 
                  ? 'bg-rose-500/[0.02] border-rose-500/35 shadow-lg' 
                  : 'glass'
              }`}
              id={`scam-row-${sc.id}`}
            >
              <div className="flex justify-between items-center bg-transparent">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[9px] uppercase text-rose-400 font-bold tracking-wider leading-none">
                    {sc.vibe}
                  </span>
                  <span className="text-sm font-black text-slate-100 font-sans tracking-wide mt-0.5">
                    {sc.name}
                  </span>
                </div>
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors ${isOpen ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' : 'bg-white/5 border-white/5'}`}>
                  <Info className="w-3.5 h-3.5" />
                </div>
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.15 }}
                    className="border-t border-white/5 pt-3 flex flex-col gap-3 text-xs leading-relaxed"
                  >
                    <div>
                      <strong className="text-slate-350 uppercase tracking-wide text-[10px] font-mono font-bold block mb-1">1. The Hook:</strong>
                      <p className="text-slate-400 font-medium">{sc.hook}</p>
                    </div>

                    <div>
                      <strong className="text-rose-400/90 uppercase tracking-wide text-[10px] font-mono font-bold block mb-1">2. The Extortion:</strong>
                      <p className="text-slate-400 font-medium">{sc.threat}</p>
                    </div>

                    <div className="bg-emerald-500/5 border border-emerald-500/20 p-3 rounded-lg flex items-start gap-2.5 mt-1">
                      <ThumbsUp className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-emerald-450 uppercase tracking-wide text-[10px] font-mono font-bold block mb-1 leading-none">3. Savvy Defense Response:</strong>
                        <p className="text-emerald-300 font-semibold">{sc.defense}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Roleplay Guard Practice Widget */}
      <div className="glass-panel p-5 flex flex-col gap-4 border-dashed border-rose-500/20">
        <div className="flex items-center gap-2 border-b border-white/10 pb-2">
          <Play className="w-4 h-4 text-rose-405 shrink-0" />
          <h3 className="text-sm font-black text-rose-400 uppercase tracking-wider font-mono">
            Street Defense Roleplay Practice
          </h3>
        </div>

        {!quizCompleted ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5 p-3.5 bg-white/5 rounded-xl border border-white/5">
              <span className="text-[9px] font-mono uppercase text-slate-500 tracking-wider">Scenario Scenario {activeScenario.id} of 3</span>
              <h4 className="text-xs font-black text-slate-100 uppercase tracking-normal leading-normal">
                {activeScenario.question}
              </h4>
              <p className="text-[11px] text-slate-400 italic">
                &ldquo;{activeScenario.context}&rdquo;
              </p>
            </div>

            <div className="flex flex-col gap-2">
              {activeScenario.options.map((opt, oIdx) => {
                const isSelected = selectedOptIdx === oIdx;
                const isOptionCorrect = opt.correct;
                let btnStyle = 'glass hover:border-white/20';
                
                if (selectedOptIdx !== null) {
                  if (isSelected) {
                    btnStyle = isOptionCorrect 
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                      : 'bg-rose-950/30 border-rose-500/30 text-rose-400';
                  } else if (isOptionCorrect) {
                    btnStyle = 'border-emerald-500/20 opacity-60';
                  } else {
                    btnStyle = 'opacity-30';
                  }
                }

                return (
                  <button
                    key={oIdx}
                    disabled={selectedOptIdx !== null}
                    onClick={() => handleSelectOption(oIdx, isOptionCorrect)}
                    className={`p-3.5 rounded-xl border text-left text-xs font-black leading-snug transition-all cursor-pointer ${btnStyle}`}
                  >
                    <span>{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {selectedOptIdx !== null && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3.5 rounded-xl border flex gap-3 text-xs leading-relaxed ${
                  activeScenario.options[selectedOptIdx].correct 
                    ? 'bg-emerald-500/5 border-emerald-500/10 text-emerald-300' 
                    : 'bg-rose-950/20 border-rose-500/10 text-rose-300'
                }`}
              >
                {activeScenario.options[selectedOptIdx].correct ? (
                  <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
                <div className="flex flex-col gap-1 font-semibold">
                  <span>{activeScenario.options[selectedOptIdx].correct ? 'Savvy response!' : 'Trapped scenario'}</span>
                  <p className="text-[11.5px] text-slate-400 font-normal leading-normal">{activeScenario.options[selectedOptIdx].explanation}</p>
                  
                  <button
                    onClick={nextScenario}
                    className="mt-1.5 px-3 py-1 bg-white/5 hover:bg-white/10 text-white rounded-lg border border-white/5 w-fit font-bold font-mono text-[10px] uppercase cursor-pointer"
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          <div className="py-6 text-center flex flex-col items-center gap-3 animate-fadeIn">
            <span className="text-3xl font-mono">🏆</span>
            <h4 className="text-sm font-black text-white uppercase tracking-tight">Street Defender Vetted!</h4>
            <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-[240px] mx-auto">
              Our travel defense is fully checked! We knew <strong className="text-rose-405">{quizScore}</strong> out of <strong className="text-white">3</strong> standard scam behaviors. Rome streets here we come!
            </p>
            <button
              onClick={resetQuiz}
              className="mt-2 px-4 py-2 bg-rose-500 hover:bg-rose-455 text-white font-black text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer shadow-md shadow-rose-950/20"
            >
              Test Again
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
