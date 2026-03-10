import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, ShieldCheck, Database, Server, RefreshCcw, Landmark, Zap, Lock, CreditCard } from 'lucide-react';

const ClearingEvolution = () => {
    const [view, setView] = useState('traditional'); // traditional, transitional, atomic

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-500 flex items-center gap-2">
                        <RefreshCcw className="text-teal-400" /> Clearing Corporation Transformation
                    </h2>
                    <p className="text-textMuted mt-1">Simulating the evolutionary path from legacy clearing to instant smart-contract settlement.</p>
                </div>

                <div className="flex bg-panel border border-border rounded-lg p-1 text-sm font-medium">
                    <button onClick={() => setView('traditional')} className={`px-4 py-2 rounded-md transition-all ${view === 'traditional' ? 'bg-danger/20 text-danger shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'text-textMuted hover:bg-background'}`}>Legacy (T+1)</button>
                    <button onClick={() => setView('atomic')} className={`px-4 py-2 rounded-md transition-all ${view === 'atomic' ? 'bg-success/20 text-success shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 'text-textMuted hover:bg-background'}`}>Smart Contract Atomic</button>
                </div>
            </div>

            <div className="bg-panel border border-border p-6 rounded-xl flex flex-col md:flex-row gap-8 items-center min-h-[500px] relative overflow-hidden">

                {/* Visualizer Area */}
                <div className="w-full relative h-[400px]">
                    <AnimatePresence mode="wait">

                        {/* TRADITIONAL VIEW */}
                        {view === 'traditional' && (
                            <motion.div key="trad" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5 }} className="w-full h-full flex flex-col items-center justify-between">

                                {/* Top Layer: Exchange */}
                                <div className="p-4 border border-border rounded-xl bg-background flex flex-col items-center w-64">
                                    <Server className="text-blue-500 mb-2" size={32} />
                                    <h3 className="font-bold text-white uppercase text-sm">Exchange (NSE/BSE)</h3>
                                    <span className="text-[10px] text-textMuted">Matches orders on T=0</span>
                                </div>

                                {/* Arrows down */}
                                <div className="flex w-full px-20">
                                    <div className="flex-1 flex justify-center py-4"><div className="w-px h-16 bg-danger/50 border-r border-dashed border-danger"></div></div>
                                </div>

                                {/* Middle Layer: Clearing Corp */}
                                <div className="p-4 border-2 border-danger/50 rounded-xl bg-danger/10 flex flex-col items-center w-80 relative glow-danger">
                                    <div className="absolute -top-3 -right-3 bg-danger text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.5)]">Bottleneck</div>
                                    <ShieldCheck className="text-danger mb-2" size={32} />
                                    <h3 className="font-bold text-danger uppercase text-sm">Clearing Corp (NSCCL/ICCL)</h3>
                                    <span className="text-xs text-textMuted mt-1 block text-center">Calculates margins overnight.<br />Holds central counterparty risk for 24 hours.</span>
                                </div>

                                {/* Arrows splitting */}
                                <div className="flex w-full justify-between px-24 py-4 relative">
                                    <div className="absolute left-1/2 top-0 w-1/2 h-8 border-t border-l border-danger/50 border-dashed transform -translate-x-full"></div>
                                    <div className="absolute right-1/2 top-0 w-1/2 h-8 border-t border-r border-danger/50 border-dashed"></div>
                                </div>

                                {/* Bottom Layer: Banks and Depositories */}
                                <div className="flex justify-between w-full px-10 gap-4">
                                    <div className="p-4 border border-border rounded-xl bg-background flex flex-col items-center flex-1">
                                        <Landmark className="text-yellow-500 mb-2" size={32} />
                                        <h3 className="font-bold text-white uppercase text-sm text-center">Clearing Banks</h3>
                                        <span className="text-[10px] text-textMuted">Settle funds on T+1</span>
                                    </div>
                                    <div className="p-4 border border-border rounded-xl bg-background flex flex-col items-center flex-1">
                                        <Database className="text-primary mb-2" size={32} />
                                        <h3 className="font-bold text-white uppercase text-sm text-center">Depositories (NSDL/CDSL)</h3>
                                        <span className="text-[10px] text-textMuted">Settle securities on T+1</span>
                                    </div>
                                </div>

                            </motion.div>
                        )}

                        {/* ATOMIC VIEW */}
                        {view === 'atomic' && (
                            <motion.div key="atom" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5 }} className="w-full h-full flex flex-col items-center justify-center relative">

                                {/* Central Blockchain Ring */}
                                <div className="relative w-80 h-80 rounded-full border border-success/30 flex items-center justify-center glow-success">

                                    {/* Central Smart Contract */}
                                    <div className="absolute p-6 border-2 border-success bg-success/20 rounded-full flex flex-col items-center justify-center z-20 shadow-[0_0_50px_rgba(16,185,129,0.4)]">
                                        <Lock size={48} className="text-white mb-2 pb-2 border-b border-success/50" />
                                        <Zap size={32} className="text-yellow-400 absolute bottom-4 animate-pulse" />
                                        <h3 className="font-bold text-white uppercase text-[10px] tracking-widest mt-2">DVP Smart<br />Contract</h3>
                                    </div>

                                    {/* Unified Infrastructure Nodes on the ring */}
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-panel border-2 border-blue-500/50 p-2 rounded-lg flex items-center gap-2 text-xs font-bold shadow-lg">
                                        <Server className="text-blue-500" size={16} /> Exchange Node
                                    </div>
                                    <div className="absolute top-1/2 -right-16 -translate-y-1/2 bg-panel border-2 border-primary/50 p-2 rounded-lg flex items-center gap-2 text-xs font-bold shadow-lg">
                                        <Database className="text-primary" size={16} /> Depository Node
                                    </div>
                                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-panel border-2 border-yellow-500/50 p-2 rounded-lg flex items-center gap-2 text-xs font-bold shadow-lg">
                                        <Landmark className="text-yellow-500" size={16} /> Banking Node
                                    </div>
                                    <div className="absolute top-1/2 -left-16 -translate-y-1/2 bg-panel border-2 border-success/50 p-2 rounded-lg flex items-center gap-2 text-xs font-bold shadow-lg">
                                        <CreditCard className="text-success" size={16} /> VTI Identity Oracle
                                    </div>

                                    {/* Animated validation beams */}
                                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 animate-spin-slow">
                                        <circle cx="160" cy="160" r="120" stroke="#10b981" strokeWidth="2" strokeDasharray="10 80" fill="none" opacity="0.8" />
                                    </svg>
                                </div>

                                <div className="absolute bottom-4 left-4 bg-background p-4 border border-border rounded-xl max-w-xs shadow-2xl">
                                    <h4 className="text-success font-bold text-sm uppercase mb-2 flex items-center gap-2"><CheckCircle2 size={16} /> Instant Finality</h4>
                                    <p className="text-xs text-textMuted">The Clearing Corporation evolves from a "central risk holder" into a "governance node" overseeing automated smart contracts. Funds and securities move atomically without passing through intermediary pools.</p>
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default ClearingEvolution;
