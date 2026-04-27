import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Volume2, 
  X, 
  Trophy, 
  Play, 
  CheckCircle2,
  XCircle,
  HelpCircle,
  Map as MapIcon,
  Compass,
  Zap,
  ChevronRight
} from 'lucide-react';
import { LEVELS } from './constants';
import { Level } from './types';

// Design System / Theme
const theme = {
  bg: 'bg-sky-400',
  accent: 'text-orange-500',
  glass: 'bg-white/30 backdrop-blur-2xl border-white/40',
  glassDark: 'bg-blue-900/20 backdrop-blur-3xl border-white/10',
  card: 'bg-white/20 border-white/20',
  gradient: 'from-blue-600 via-sky-400 to-orange-100'
};

// Components
const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="h-4 w-full bg-blue-900/20 rounded-full overflow-hidden backdrop-blur-sm border border-white/20">
    <motion.div 
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 shadow-[0_0_20px_rgba(251,191,36,0.4)]"
    />
  </div>
);

const QuestButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false,
  className = '' 
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  disabled?: boolean;
  className?: string;
}) => {
  const variants = {
    primary: 'bg-orange-500 hover:bg-orange-600 text-white shadow-xl shadow-orange-500/20 font-black',
    secondary: 'bg-blue-600/20 hover:bg-blue-600/30 text-white backdrop-blur-md border border-white/20 font-bold',
    outline: 'border-2 border-yellow-500/50 hover:border-yellow-500 text-white hover:bg-yellow-500/10 font-bold',
    danger: 'bg-rose-600 hover:bg-rose-500 text-white font-bold'
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05, y: -2, rotateZ: 1 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`px-8 py-4 rounded-3xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default function App() {
  const [currentLevelIndex, setCurrentLevelIndex] = useState<number | null>(null);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [lives, setLives] = useState(10);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [scrambledSelected, setScrambledSelected] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  const currentLevel = currentLevelIndex !== null ? LEVELS[currentLevelIndex] : null;
  const currentExercise = currentLevel?.exercises[exerciseIndex];

  useEffect(() => {
    if (currentLevelIndex !== null) {
      setShowIntro(true);
    }
  }, [currentLevelIndex]);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleCheck = () => {
    if (!currentExercise || feedback) return;

    let isCorrect = false;
    if (currentExercise.type === 'SCRAMBLE') {
      isCorrect = scrambledSelected.join(' ') === currentExercise.target;
    } else if (currentExercise.type === 'FIND_ALL') {
      const sortedSelected = [...selectedOptions].sort();
      const sortedTargets = [...(currentExercise.targets || [])].sort();
      isCorrect = sortedSelected.length === sortedTargets.length && sortedSelected.every((v, i) => v === sortedTargets[i]);
    } else if (currentExercise.type === 'SORT') {
      isCorrect = selectedOption === currentExercise.target;
    } else {
      isCorrect = selectedOption === currentExercise.target;
    }

    if (isCorrect) {
      setFeedback('correct');
      speak(currentExercise.target);
    } else {
      setFeedback('incorrect');
      setLives(prev => {
        const next = prev - 1;
        if (next <= 0) setIsGameOver(true);
        return next;
      });
      speak('Inténtalo de nuevo');
    }
  };

  const toggleScramble = (word: string) => {
    if (feedback) return;
    if (scrambledSelected.includes(word)) {
      setScrambledSelected(prev => prev.filter(w => w !== word));
    } else {
      setScrambledSelected(prev => [...prev, word]);
    }
  };

  const nextExercise = () => {
    setFeedback(null);
    setSelectedOption(null);
    setSelectedOptions([]);
    setScrambledSelected([]);
    
    if (currentLevel && exerciseIndex < currentLevel.exercises.length - 1) {
      setExerciseIndex(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const restart = () => {
    setLives(10);
    setExerciseIndex(0);
    setFeedback(null);
    setSelectedOption(null);
    setIsGameOver(false);
    setIsComplete(false);
  };

  const handleExitLevel = () => {
    setCurrentLevelIndex(null);
    restart();
  };

  // Background Adventure Layers
  const Background = () => (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className={`absolute inset-0 bg-gradient-to-b ${theme.gradient}`} />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[-20%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.2),transparent_70%)] blur-3xl" 
      />
      
      {/* Simulation of depth/3D with particles or blur layers */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.1, 0.4, 0.1],
            y: [0, -150, 0],
            x: [0, Math.random() * 80, 0]
          }}
          transition={{ 
            duration: 8 + Math.random() * 8, 
            repeat: Infinity, 
            delay: i * 1.5 
          }}
          className="absolute bg-white/20 rounded-full blur-2xl pill"
          style={{
            width: Math.random() * 400 + 200,
            height: Math.random() * 3,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        />
      ))}
    </div>
  );

  if (currentLevelIndex === null) {
    return (
      <div className={`min-h-screen ${theme.bg} text-white flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden`}>
        <Background />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-4xl text-center"
        >
          <div className="mb-8 flex justify-center gap-4">
            <div className="p-4 bg-yellow-400/20 rounded-full border border-yellow-400/40 backdrop-blur-xl animate-bounce">
              <Compass className="w-12 h-12 text-yellow-500" />
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-200">
            SPANISH COLORS
          </h1>
          <p className="text-orange-500 font-black uppercase tracking-[0.5em] mb-16 text-sm">Master the Rainbow in Spanish</p>
          
          <div className="grid gap-12 sm:grid-cols-3 relative">
            {/* The Path Connector */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 -z-10 hidden sm:block" />
            
            {LEVELS.map((level, idx) => (
              <motion.button
                key={level.id}
                viewport={{ once: true }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  restart();
                  setCurrentLevelIndex(idx);
                }}
                className={`relative group flex flex-col items-center p-8 rounded-[4rem] transition-all perspective-1000 ${theme.glass}`}
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 flex items-center justify-center shadow-2xl shadow-orange-500/30 mb-6 group-hover:rotate-[360deg] transition-transform duration-700">
                  <Zap className="w-10 h-10 text-white" fill="white" />
                </div>
                
                <h3 className="text-2xl font-black mb-2 text-blue-900">{level.title}</h3>
                <p className="text-blue-900/60 text-xs font-bold uppercase tracking-widest leading-relaxed px-4">
                  {level.exercises.length} Exercises
                </p>

                {/* Card glow effect */}
                <div className="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/10 rounded-[4rem] transition-colors -z-10" />
              </motion.button>
            ))}
          </div>

          <div className="mt-20 flex justify-center gap-8 text-white/40 font-mono text-[10px] uppercase tracking-widest">
            <span>// 3D Rendering Simulated</span>
            <span>// 30 Exercises Installed</span>
            <span>// Adventure Engine v1.0</span>
          </div>
        </motion.div>
      </div>
    );
  }

  if (isGameOver) {
    return (
      <div className={`min-h-screen ${theme.bg} text-white flex flex-col items-center justify-center p-6 relative overflow-hidden`}>
        <Background />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`text-center z-10 p-16 rounded-[4rem] max-w-xl w-full border ${theme.glassDark}`}>
          <XCircle className="w-32 h-32 text-rose-500 mx-auto mb-8 drop-shadow-[0_0_30px_rgba(244,63,94,0.4)]" />
          <h1 className="text-5xl font-black mb-4 tracking-tight">MISSION FAILED</h1>
          <p className="text-white/60 mb-12 text-lg font-bold">Your energy has depleted. Return to base and try again.</p>
          <div className="flex flex-col gap-4">
            <QuestButton onClick={restart} className="w-full py-5 text-xl">Re-Initiate Quest</QuestButton>
            <QuestButton variant="secondary" onClick={handleExitLevel} className="w-full">Return to Map</QuestButton>
          </div>
        </motion.div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className={`min-h-screen ${theme.bg} text-white flex flex-col items-center justify-center p-6 relative overflow-hidden`}>
        <Background />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`text-center z-10 p-16 rounded-[4rem] max-w-xl w-full border border-orange-500/50 ${theme.glassDark}`}>
          <div className="relative mb-10">
            <Trophy className="w-40 h-40 text-yellow-500 mx-auto animate-bounce" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-400/20 rounded-full blur-[60px] animate-pulse -z-10" />
          </div>
          <h1 className="text-5xl font-black mb-4 tracking-tighter text-blue-900">LEVEL CONQUERED</h1>
          <p className="text-blue-900/60 mb-12 text-xl font-bold">You are mastering the Spanish foundations!</p>
          <QuestButton onClick={handleExitLevel} className="w-full py-6 text-2xl">Return to the Path</QuestButton>
        </motion.div>
      </div>
    );
  }

  if (showIntro && currentLevel) {
    return (
      <div className={`min-h-screen ${theme.bg} flex flex-col items-center justify-center p-6 relative overflow-hidden`}>
        <Background />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`relative z-10 p-12 rounded-[4rem] shadow-2xl border max-w-xl w-full text-center ${theme.glass}`}
        >
          <div className="w-24 h-24 bg-orange-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-orange-500/30 rotate-12">
            <HelpCircle className="w-14 h-14 text-white" />
          </div>
          <h2 className="text-4xl font-black mb-8 text-blue-900 tracking-tight">{currentLevel.title}</h2>
          <div className="p-8 bg-blue-900/10 rounded-[2rem] border border-white/20 mb-12 text-left">
            <p className="text-xl text-blue-900 leading-relaxed font-medium">
              {currentLevel.explanationIntro}
            </p>
          </div>
          <QuestButton onClick={() => setShowIntro(false)} className="w-full py-6 text-2xl">
            ACCEPT CHALLENGE
          </QuestButton>
        </motion.div>
      </div>
    );
  }

  const progress = (exerciseIndex / (currentLevel?.exercises.length || 1)) * 100;

  return (
    <div className={`min-h-screen ${theme.bg} text-white font-sans flex flex-col relative overflow-hidden`}>
      <Background />

      {/* Header */}
      <header className="p-4 md:p-8 flex items-center gap-10 max-w-5xl mx-auto w-full relative z-40">
        <motion.button 
          whileHover={{ rotate: 90 }}
          onClick={handleExitLevel} 
          className="text-blue-900/40 hover:text-orange-500 transition-colors"
        >
          <X className="w-10 h-10" />
        </motion.button>
        <div className="flex-1">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] font-black tracking-widest text-blue-900 uppercase">Quest Progression</span>
            <span className="text-[10px] font-mono text-blue-900/40">{Math.round(progress)}% Complete</span>
          </div>
          <ProgressBar progress={progress} />
        </div>
        <div className={`flex items-center gap-3 text-red-500 font-black px-6 py-3 rounded-full border border-white/40 ${theme.glass}`}>
          <Heart className="w-6 h-6 fill-current" />
          <span className="text-2xl">{lives}</span>
        </div>
      </header>

      {/* Main Quest Gameplay */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-8 flex flex-col items-center relative z-10">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentExercise?.id}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            className="w-full flex flex-col gap-12"
          >
            {/* Instruction Banner */}
            <div className="flex items-center justify-center gap-4">
              <Compass className="w-6 h-6 text-orange-500" />
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-[0.2em] text-center text-blue-900">
                {currentExercise?.instruction}
              </h2>
            </div>

            {/* Prompt Area (3D Box Simulation) */}
            <motion.div 
              className={`flex flex-col items-center justify-center gap-8 p-12 md:p-16 rounded-[4rem] shadow-3xl relative group border-2 border-white/50 overflow-hidden ${theme.glass} ${currentLevel?.id === 3 ? 'bg-indigo-900/40 border-indigo-400/30' : ''}`}
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Internal glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.3),transparent_70%)]" />
              
              <div className="relative z-10 flex flex-col items-center gap-6 w-full">
                <div className="flex items-center gap-6">
                  {currentExercise?.audioText && (
                    <motion.button 
                      whileHover={{ scale: 1.1, rotateZ: 5 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => speak(currentExercise.audioText!)}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-[2rem] bg-orange-500 flex items-center justify-center shadow-2xl shadow-orange-500/40 hover:bg-orange-600 transition-colors"
                    >
                      <Volume2 className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </motion.button>
                  )}
                  <p className="text-3xl md:text-5xl font-black tracking-tight text-blue-900 leading-tight text-center">
                    {currentExercise?.type === 'SCRAMBLE' ? currentExercise.prompt : (
                      currentExercise?.prompt.split('___').map((part, i, arr) => (
                        <React.Fragment key={i}>
                          {part}
                          {i < arr.length - 1 && (
                            <span className="inline-block min-w-[2em] h-[0.8em] border-b-4 border-orange-500 mx-2 relative top-1 bg-blue-900/5 rounded-md" />
                          )}
                        </React.Fragment>
                      ))
                    )}
                  </p>
                </div>
                <p className="text-blue-900/50 text-xl md:text-2xl font-medium font-serif italic text-center">{currentExercise?.translation}</p>
                
                {/* Scrambled Area */}
                {currentExercise?.type === 'SCRAMBLE' && (
                  <div className="mt-8 flex flex-wrap justify-center gap-3 min-h-[4rem] w-full p-4 rounded-[2rem] bg-blue-900/5 border border-blue-900/10">
                    {scrambledSelected.map((word, idx) => (
                      <motion.button
                        key={`${word}-${idx}`}
                        layout
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        onClick={() => toggleScramble(word)}
                        className="px-6 py-3 bg-white text-blue-900 rounded-2xl font-black shadow-lg border-2 border-blue-100"
                      >
                        {word}
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* Find All Selected Area */}
                {currentExercise?.type === 'FIND_ALL' && (
                  <div className="mt-8 flex flex-wrap justify-center gap-2">
                    {selectedOptions.map(opt => (
                      <span key={opt} className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-bold shadow-lg">
                        {opt}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Interaction Area (Adventure Gear Choice) */}
            <div className="w-full max-w-2xl mx-auto">
              {currentExercise?.type === 'SCRAMBLE' ? (
                <div className="flex flex-wrap justify-center gap-4">
                  {currentExercise.scrambledWords?.map((word, idx) => {
                    const isUsed = scrambledSelected.includes(word);
                    return (
                      <motion.button
                        key={`${word}-${idx}`}
                        whileHover={!isUsed ? { scale: 1.05 } : {}}
                        whileTap={!isUsed ? { scale: 0.95 } : {}}
                        onClick={() => toggleScramble(word)}
                        disabled={isUsed || !!feedback}
                        className={`
                          px-8 py-4 rounded-3xl text-2xl font-black border-2 transition-all duration-300
                          ${isUsed 
                            ? 'opacity-0 scale-90 pointer-events-none' 
                            : 'bg-white border-blue-100 text-blue-900 hover:border-orange-200 hover:shadow-xl'}
                        `}
                      >
                        {word}
                      </motion.button>
                    )
                  })}
                </div>
              ) : currentExercise?.type === 'FIND_ALL' ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {currentExercise.choices?.map(choice => (
                    <motion.button
                      key={choice}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (feedback) return;
                        setSelectedOptions(prev => 
                          prev.includes(choice) ? prev.filter(c => c !== choice) : [...prev, choice]
                        );
                      }}
                      className={`
                        p-6 rounded-[2rem] text-xl font-black border-2 transition-all duration-300
                        ${selectedOptions.includes(choice) 
                          ? 'border-orange-500 bg-orange-500 text-white' 
                          : 'bg-white/40 border-white/20 text-blue-900'}
                      `}
                    >
                      {choice}
                    </motion.button>
                  ))}
                </div>
              ) : currentExercise?.type === 'SORT' ? (
                <div className="flex flex-col items-center gap-12">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="p-12 bg-white rounded-[3rem] shadow-2xl border-4 border-blue-100 flex items-center justify-center min-w-[250px]"
                  >
                    <span className="text-4xl font-black text-blue-900">{currentExercise.prompt}</span>
                  </motion.div>

                  <div className="grid grid-cols-2 gap-8 w-full max-w-xl">
                    {currentExercise.choices?.map(basket => (
                      <motion.button
                        key={basket}
                        disabled={!!feedback}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedOption(basket)}
                        className={`
                          relative flex flex-col items-center gap-4 transition-all duration-300
                          ${selectedOption === basket ? 'scale-110' : 'opacity-80 hover:opacity-100'}
                        `}
                      >
                        <div className={`
                          w-full aspect-square rounded-[3rem] border-4 flex flex-col items-center justify-end p-6 relative overflow-hidden transition-colors
                          ${selectedOption === basket ? 'bg-orange-500/20 border-orange-500' : 'bg-blue-900/10 border-blue-900/20'}
                          ${feedback && basket === currentExercise.target ? 'bg-emerald-500/20 border-emerald-500' : ''}
                          ${feedback === 'incorrect' && selectedOption === basket ? 'bg-rose-500/20 border-rose-500' : ''}
                        `}>
                          {/* Inner Basket Visualization */}
                          <div className={`absolute bottom-0 left-0 right-0 h-1/2 bg-blue-900/10 border-t-2 border-blue-900/20 transition-colors ${selectedOption === basket ? 'bg-orange-500/20 border-orange-500/30' : ''}`} />
                          
                          <div className="relative z-10 flex flex-col items-center gap-2">
                             <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${selectedOption === basket ? 'bg-orange-500 text-white' : 'bg-blue-900/20 text-blue-900'}`}>
                              {basket.charAt(0)}
                            </div>
                            <span className="text-2xl font-black text-blue-900 uppercase tracking-wider">{basket}</span>
                          </div>
                        </div>

                        {selectedOption === basket && !feedback && (
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-black shadow-lg"
                          >
                            Selected
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentExercise?.choices?.map(choice => (
                    <button
                      key={choice}
                      disabled={!!feedback}
                      onClick={() => setSelectedOption(choice)}
                      className={`
                        group relative p-6 md:p-8 rounded-[2.5rem] text-2xl md:text-3xl font-black border-2 transition-all duration-300 text-center
                        flex items-center justify-center gap-4 overflow-hidden
                        ${selectedOption === choice 
                          ? 'border-orange-500 bg-orange-500/20 text-orange-600 shadow-2xl shadow-orange-500/20' 
                          : 'border-white/20 hover:border-white/50 bg-white/40 text-blue-900'}
                        ${feedback && choice === currentExercise.target ? 'border-emerald-500 bg-emerald-500/20 text-emerald-600' : ''}
                        ${feedback === 'incorrect' && selectedOption === choice ? 'border-rose-500 bg-rose-500/20 text-rose-600' : ''}
                      `}
                    >
                      {choice}
                      {selectedOption === choice && !feedback && (
                        <div className="absolute right-6 w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm">
                          ✓
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistence Controls */}
      <footer className="p-8 pb-16 max-w-4xl mx-auto w-full relative z-40 overflow-hidden">
        <AnimatePresence mode="wait">
          {!feedback ? (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="w-full flex justify-center"
            >
              <QuestButton 
                disabled={
                  currentExercise?.type === 'SCRAMBLE' ? scrambledSelected.length === 0 :
                  currentExercise?.type === 'FIND_ALL' ? selectedOptions.length === 0 :
                  currentExercise?.type === 'SORT' ? !selectedOption :
                  !selectedOption
                }
                onClick={handleCheck}
                className="w-full md:w-80 py-8 text-3xl tracking-widest"
              >
                STRIKE
              </QuestButton>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 100 }} 
              animate={{ opacity: 1, y: 0 }} 
              className={`p-10 rounded-[3rem] shadow-[0_-10px_50px_rgba(0,0,0,0.5)] ${
                feedback === 'correct' ? 'bg-[#10b981]' : 'bg-[#f43f5e]'
              }`}
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="flex items-center gap-8 w-full">
                  <div className="w-24 h-24 rounded-[2.5rem] flex items-center justify-center shrink-0 bg-white/20 shadow-inner">
                    {feedback === 'correct' ? (
                      <CheckCircle2 className="w-14 h-14 text-white" />
                    ) : (
                      <XCircle className="w-14 h-14 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-4xl font-black mb-2 text-white">
                      {feedback === 'correct' ? 'VICTORY!' : 'MISSED!'}
                    </h3>
                    <p className="text-white/80 text-xl font-bold italic font-serif">
                       "{currentExercise?.translation}"
                    </p>
                    {feedback === 'incorrect' && (
                       <p className="text-white mt-2 text-2xl font-black">
                        Correct form: <span className="underline decoration-white/40">
                          {currentExercise?.type === 'FIND_ALL' ? currentExercise.targets?.join(', ') : currentExercise?.target}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
                <QuestButton 
                  onClick={nextExercise} 
                  className={`w-full md:w-auto px-20 py-8 text-2xl bg-white text-black hover:bg-white/90 shadow-2xl`}
                >
                  NEXT
                </QuestButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </footer>
    </div>
  );
}
