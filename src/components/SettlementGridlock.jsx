import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, Unlock, AlertTriangle, ArrowRight, GitCommit, Infinity as InfinityIcon } from 'lucide-react';

const SettlementGridlock = () => {
    const [mode, setMode] = useState('t1'); // t1 or rt
    const [step, setStep] = useState(0);

    // Gridlock scenario:
    // A wants to buy from B. B wants to buy from C. C wants to buy from A.
    // In T+1, they need upfront margin / capital, or they wait for T+1 settlement to get funds.

    useEffect(() => {
        let timer;
        if (step < 4) {
            timer = setTimeout(() => {
                setStep(s => s + 1);
            }, 2500);
        }
        return () => clearTimeout(timer);
    }, [step, mode]);

    const handleModeSwitch = (newMode) => {
        setMode(newMode);
        setStep(0);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-500 flex items-center gap-2">
                        <Link /> Settlement Gridlock Simulation
                    </h2>
                    <p className="text-textMuted mt-1">Demonstrating how delayed settlement creates capital deadlocks.</p>
                </div>

                <div className="flex bg-[#0f1115] border border-border rounded-xl p-1.5 text-xs font-bold uppercase tracking-widest shadow-inner">
                    <button
                        onClick={() => handleModeSwitch('t1')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all ${mode === 't1' ? 'bg-danger/20 text-danger border border-danger/30 glow-danger' : 'text-textMuted hover:text-white'}`}
                    >
                        <AlertTriangle size={14} /> Legacy T+1
                    </button>
                    <button
                        onClick={() => handleModeSwitch('rt')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all ${mode === 'rt' ? 'bg-success/20 text-success border border-success/30 glow-success' : 'text-textMuted hover:text-white'}`}
                    >
                        <InfinityIcon size={14} /> ShriNivesh Protocol
                    </button>
                </div>
            </div>

            <div className="bg-panel border border-border p-6 rounded-2xl flex flex-col lg:flex-row gap-12 items-center justify-center min-h-[500px] relative overflow-hidden">

                {/* Visualizer Area */}
                <div className="flex-1 w-full max-w-2xl relative h-80 flex items-center justify-center">

                    {/* Trader A */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
                        <div className={`w-20 h-20 rounded-full flex flex-col items-center justify-center border-2 transition-all duration-500 bg-background/80 backdrop-blur-sm
                           ${mode === 't1' && step >= 1 ? 'border-danger glow-danger shadow-[0_0_20px_rgba(239,68,68,0.3)]' :
                                mode === 'rt' && step >= 1 ? 'border-success glow-success shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'border-border'}
                       `}>
                            <span className="font-bold text-[10px] text-textMuted uppercase tracking-tighter">Trader</span>
                            <span className="text-xl font-bold font-mono">A</span>
                        </div>
                        <div className="mt-3 px-3 py-1 bg-panel/50 border border-border rounded-lg text-center shadow-lg">
                            <span className="text-[10px] font-bold text-white uppercase block">Has: TCS Shares</span>
                            <span className="text-[9px] text-primary uppercase font-mono tracking-tighter">Needs: Cash</span>
                        </div>
                    </div>

                    {/* Trader B */}
                    <div className="absolute bottom-4 left-4 flex flex-col items-center z-20">
                        <div className="mb-3 px-3 py-1 bg-panel/50 border border-border rounded-lg text-center shadow-lg">
                            <span className="text-[10px] font-bold text-white uppercase block">Has: Cash</span>
                            <span className="text-[9px] text-primary uppercase font-mono tracking-tighter">Needs: RELIANCE</span>
                        </div>
                        <div className={`w-20 h-20 rounded-full flex flex-col items-center justify-center border-2 transition-all duration-500 bg-background/80 backdrop-blur-sm
                           ${mode === 't1' && step >= 2 ? 'border-danger glow-danger shadow-[0_0_20px_rgba(239,68,68,0.3)]' :
                                mode === 'rt' && step >= 2 ? 'border-success glow-success shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'border-border'}
                       `}>
                            <span className="font-bold text-[10px] text-textMuted uppercase tracking-tighter">Trader</span>
                            <span className="text-xl font-bold font-mono">B</span>
                        </div>
                    </div>

                    {/* Trader C */}
                    <div className="absolute bottom-4 right-4 flex flex-col items-center z-20">
                        <div className="mb-3 px-3 py-1 bg-panel/50 border border-border rounded-lg text-center shadow-lg">
                            <span className="text-[10px] font-bold text-white uppercase block">Has: RELIANCE</span>
                            <span className="text-[9px] text-primary uppercase font-mono tracking-tighter">Needs: TCS Shares</span>
                        </div>
                        <div className={`w-20 h-20 rounded-full flex flex-col items-center justify-center border-2 transition-all duration-500 bg-background/80 backdrop-blur-sm
                           ${mode === 't1' && step >= 3 ? 'border-danger glow-danger shadow-[0_0_20px_rgba(239,68,68,0.3)]' :
                                mode === 'rt' && step >= 3 ? 'border-success glow-success shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'border-border'}
                       `}>
                            <span className="font-bold text-[10px] text-textMuted uppercase tracking-tighter">Trader</span>
                            <span className="text-xl font-bold font-mono">C</span>
                        </div>
                    </div>

                    {/* Connections */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
                        <defs>
                            <marker id="arrowT1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                                <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                            </marker>
                            <marker id="arrowRT" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                                <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                            </marker>
                        </defs>

                        {step >= 1 && (
                            <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} x1="45%" y1="25%" x2="15%" y2="65%"
                                stroke={mode === 't1' ? '#ef4444' : '#10b981'} strokeWidth="2.5" strokeDasharray={mode === 't1' ? "6,4" : "0"}
                                markerEnd={`url(#arrow${mode === 't1' ? 'T1' : 'RT'})`}
                            />
                        )}
                        {step >= 2 && (
                            <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} x1="25%" y1="75%" x2="75%" y2="75%"
                                stroke={mode === 't1' ? '#ef4444' : '#10b981'} strokeWidth="2.5" strokeDasharray={mode === 't1' ? "6,4" : "0"}
                                markerEnd={`url(#arrow${mode === 't1' ? 'T1' : 'RT'})`}
                            />
                        )}
                        {step >= 3 && (
                            <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} x1="85%" y1="65%" x2="55%" y2="25%"
                                stroke={mode === 't1' ? '#ef4444' : '#10b981'} strokeWidth="2.5" strokeDasharray={mode === 't1' ? "6,4" : "0"}
                                markerEnd={`url(#arrow${mode === 't1' ? 'T1' : 'RT'})`}
                            />
                        )}
                    </svg>

                    {/* Central Icon */}
                    <AnimatePresence>
                        {step >= 4 && mode === 't1' && (
                            <motion.div initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-danger bg-danger/10 p-6 rounded-full glow-danger z-30 border border-danger/50 shadow-2xl">
                                <AlertTriangle size={48} className="animate-bounce" />
                            </motion.div>
                        )}
                        {step >= 4 && mode === 'rt' && (
                            <motion.div initial={{ scale: 0, rotate: 45 }} animate={{ scale: 1, rotate: 0 }} className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-success bg-success/10 p-6 rounded-full glow-success z-30 border border-success/50 shadow-[0_0_50px_rgba(16,185,129,0.6)]">
                                <InfinityIcon size={48} className="animate-pulse" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Explanation Panel */}
                <div className="w-full md:w-80 bg-background border border-border rounded-xl p-4 shadow-xl z-20">
                    <h3 className="font-bold text-lg mb-3 border-b border-border pb-2">Simulation Log</h3>
                    <div className="space-y-3 text-sm font-mono">
                        <div className={`transition-opacity ${step >= 1 ? 'opacity-100' : 'opacity-30'}`}>
                            <span className="text-primary font-bold">1.</span> Trader A sells TCS to B.
                        </div>
                        <div className={`transition-opacity ${step >= 2 ? 'opacity-100' : 'opacity-30'}`}>
                            <span className="text-primary font-bold">2.</span> Trader B buys RELIANCE from C.
                        </div>
                        <div className={`transition-opacity ${step >= 3 ? 'opacity-100' : 'opacity-30'}`}>
                            <span className="text-primary font-bold">3.</span> Trader C buys TCS from A.
                        </div>

                        <div className="mt-4 pt-4 border-t border-border/50">
                            {mode === 't1' ? (
                                <div className={`text-danger ${step >= 4 ? 'opacity-100 animate-pulse' : 'opacity-0'}`}>
                                    <strong className="flex items-center gap-1 mb-1"><AlertTriangle size={14} /> SYSTEM GRIDLOCK</strong>
                                    <p className="text-xs text-textMuted">Since trades settle tomorrow (T+1), B's cash is locked, C cannot receive funds to buy A's shares, and A cannot deliver. <strong>Massive external margin injections are required to break the lock.</strong></p>
                                </div>
                            ) : (
                                <div className={`text-success ${step >= 4 ? 'opacity-100' : 'opacity-0'}`}>
                                    <strong className="flex items-center gap-1 mb-1"><Unlock size={14} /> FREE FLOW CONTINUOUS</strong>
                                    <p className="text-xs text-textMuted text-white font-sans font-medium">Atomic smart contracts settle Trade 1 instantly. B's cash moves to A, A's shares move to B. C and A can instantly execute the remaining cycle. <strong>Zero gridlock. Ultimate capital velocity.</strong></p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SettlementGridlock;
