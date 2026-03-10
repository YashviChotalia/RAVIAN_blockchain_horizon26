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
                        <InfinityIcon size={14} /> Atomic DVP
                    </button>
                </div>
            </div>

            <div className="bg-panel border border-border p-6 rounded-xl flex flex-col md:flex-row gap-8 items-center justify-center min-h-[400px] relative overflow-hidden">

                {/* Visualizer Area */}
                <div className="flex-1 w-full max-w-lg relative h-64 flex items-center justify-center">

                    {/* Trader A */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 z-10 bg-background
                           ${mode === 't1' && step >= 1 ? 'border-danger glow-danger' :
                                mode === 'rt' && step >= 1 ? 'border-success glow-success' : 'border-border'}
                       `}>
                            <span className="font-bold font-mono">Trader A</span>
                        </div>
                        <span className="text-xs text-textMuted mt-2 text-center w-32">Has: TCS Shares<br />Needs: Cash</span>
                    </div>

                    {/* Trader B */}
                    <div className="absolute bottom-0 left-0 flex flex-col items-center">
                        <span className="text-xs text-textMuted mb-2 text-center w-32">Has: Cash<br />Needs: RELIANCE</span>
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 z-10 bg-background
                           ${mode === 't1' && step >= 2 ? 'border-danger glow-danger' :
                                mode === 'rt' && step >= 2 ? 'border-success glow-success' : 'border-border'}
                       `}>
                            <span className="font-bold font-mono">Trader B</span>
                        </div>
                    </div>

                    {/* Trader C */}
                    <div className="absolute bottom-0 right-0 flex flex-col items-center">
                        <span className="text-xs text-textMuted mb-2 text-center w-32">Has: RELIANCE<br />Needs: TCS Shares</span>
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 z-10 bg-background
                           ${mode === 't1' && step >= 3 ? 'border-danger glow-danger' :
                                mode === 'rt' && step >= 3 ? 'border-success glow-success' : 'border-border'}
                       `}>
                            <span className="font-bold font-mono">Trader C</span>
                        </div>
                    </div>

                    {/* Connections */}
                    {/* A to B */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                        <defs>
                            <marker id="arrowT1" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" opacity="0.5" />
                            </marker>
                            <marker id="arrowRT" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" opacity="0.8" />
                            </marker>
                        </defs>

                        {step >= 1 && (
                            <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} x1="50%" y1="20%" x2="20%" y2="70%"
                                stroke={mode === 't1' ? '#ef4444' : '#10b981'} strokeWidth="2" strokeDasharray={mode === 't1' ? "5,5" : "0"}
                                opacity={0.5} markerEnd={`url(#arrow${mode === 't1' ? 'T1' : 'RT'})`}
                            />
                        )}
                        {step >= 2 && (
                            <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} x1="20%" y1="80%" x2="80%" y2="80%"
                                stroke={mode === 't1' ? '#ef4444' : '#10b981'} strokeWidth="2" strokeDasharray={mode === 't1' ? "5,5" : "0"}
                                opacity={0.5} markerEnd={`url(#arrow${mode === 't1' ? 'T1' : 'RT'})`}
                            />
                        )}
                        {step >= 3 && (
                            <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} x1="80%" y1="70%" x2="50%" y2="20%"
                                stroke={mode === 't1' ? '#ef4444' : '#10b981'} strokeWidth="2" strokeDasharray={mode === 't1' ? "5,5" : "0"}
                                opacity={0.5} markerEnd={`url(#arrow${mode === 't1' ? 'T1' : 'RT'})`}
                            />
                        )}
                    </svg>

                    {/* Central Icon */}
                    <AnimatePresence>
                        {step >= 4 && mode === 't1' && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-danger bg-danger/10 p-4 rounded-full glow-danger z-20">
                                <AlertTriangle size={36} />
                            </motion.div>
                        )}
                        {step >= 4 && mode === 'rt' && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-success bg-success/10 p-4 rounded-full glow-success z-20 shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                                <InfinityIcon size={36} />
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
