import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Repeat, Zap, TrendingUp, AlertCircle, PlayCircle } from 'lucide-react';

const LiquidityReuseSimulator = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [cycles, setCycles] = useState(0);
    const baseCapital = 50000;

    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setCycles(c => {
                    if (c >= 9) {
                        setIsPlaying(false);
                        clearInterval(interval);
                        return 10;
                    }
                    return c + 1;
                });
            }, 1500);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center gap-2">
                        <Repeat /> Liquidity Reuse Simulator
                    </h2>
                    <p className="text-textMuted mt-1">Real-time settlement enables executing multiple trades sequentially with the exact same capital pool.</p>
                </div>

                <button
                    onClick={() => {
                        setCycles(0);
                        setIsPlaying(true);
                    }}
                    disabled={isPlaying}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all ${isPlaying ? 'bg-panel text-textMuted cursor-not-allowed' : 'bg-primary text-white hover:bg-primary/90 glow hover:scale-105'}`}
                >
                    {isPlaying ? <span className="flex items-center gap-2"><Zap size={16} className="animate-pulse text-yellow-500" /> Simulating Day...</span> : <span className="flex items-center gap-2"><PlayCircle size={16} /> Start Trading Day</span>}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* T+1 Constraints */}
                <div className="p-6 bg-danger/10 border border-danger/30 rounded-xl relative overflow-hidden">
                    <div className="absolute top-4 right-4 text-danger/50">
                        <AlertCircle size={48} />
                    </div>
                    <span className="text-xs font-bold font-mono text-danger bg-danger/20 px-2 py-1 rounded">TRADITIONAL T+1 LIMIT</span>
                    <h3 className="text-2xl font-bold mt-4 font-mono">₹{baseCapital.toLocaleString()}</h3>
                    <p className="text-sm text-textMuted mt-1 mb-6">Starting Capital Base</p>

                    <div className="space-y-3">
                        <div className="p-3 bg-panel/50 border border-border rounded flex justify-between items-center opacity-50">
                            <span className="text-xs">Trade 1 Execute</span>
                            <span className="font-mono text-xs">₹{baseCapital.toLocaleString()} Locked</span>
                        </div>
                        <div className="p-3 bg-panel/50 border border-danger/50 rounded flex justify-between items-center text-danger">
                            <span className="text-xs flex items-center gap-1"><AlertCircle size={12} /> Blocking Duration</span>
                            <span className="font-mono text-xs font-bold">24 Hours (Clearing)</span>
                        </div>
                        <div className="p-3 bg-panel/50 border border-border rounded flex justify-between items-center opacity-50">
                            <span className="text-xs">Next Available Trade</span>
                            <span className="font-mono text-xs">Tomorrow (T+1)</span>
                        </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-danger/20">
                        <p className="text-sm text-textMuted">Max Daily Volume per ₹{baseCapital.toLocaleString()}:</p>
                        <p className="text-2xl font-bold font-mono text-white mt-1">₹{baseCapital.toLocaleString()}</p>
                    </div>
                </div>

                {/* Real-time Velocity */}
                <div className="p-6 bg-success/10 border border-success/30 rounded-xl relative overflow-hidden">
                    <div className="absolute top-4 right-4 text-success/20">
                        <Zap size={64} />
                    </div>
                    <span className="text-xs font-bold font-mono text-success bg-success/20 px-2 py-1 rounded">BLOCKCHAIN DVP VELOCITY</span>
                    <h3 className="text-2xl font-bold mt-4 font-mono">₹{baseCapital.toLocaleString()}</h3>
                    <p className="text-sm text-textMuted mt-1 mb-4">Starting Capital Base</p>

                    <div className="h-48 overflow-hidden relative rounded border border-success/20 bg-background/50 p-2 space-y-2">
                        <AnimatePresence>
                            {Array.from({ length: cycles }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="p-2 bg-success/20 border border-success/40 rounded flex justify-between text-xs font-mono glow-success z-10 relative"
                                >
                                    <span>Trade Cycle {i + 1}</span>
                                    <span className="text-success font-bold text-right hover:scale-110 flex items-center gap-2">
                                        + ₹{baseCapital.toLocaleString()}
                                        <span className="text-[10px] bg-success text-background px-1 rounded-sm tracking-tighter">SETTLED</span>
                                    </span>
                                </motion.div>
                            ))}
                            {!isPlaying && cycles === 0 && (
                                <div className="absolute inset-0 flex items-center justify-center text-xs text-textMuted">Click Start to simulate</div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="mt-6 pt-4 border-t border-success/30 flex justify-between items-end relative z-10">
                        <div>
                            <p className="text-sm text-success">Total Daily Trading Volume:</p>
                            <motion.p key={cycles} initial={{ scale: 1.5, color: '#fff' }} animate={{ scale: 1, color: '#10b981' }} className="text-3xl font-bold font-mono text-white mt-1 glow">
                                ₹{((cycles === 0 ? 1 : cycles) * baseCapital).toLocaleString()}
                            </motion.p>
                        </div>
                        {cycles > 1 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center text-primary gap-1 font-bold">
                                <TrendingUp size={16} /> {cycles}x Efficient
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiquidityReuseSimulator;
