import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, ShieldCheck, Database, Server, RefreshCcw, Landmark, Zap, Lock, CreditCard, CheckCircle2 } from 'lucide-react';

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

            <div className="bg-panel border border-border p-6 rounded-xl flex flex-col md:flex-row gap-8 items-center min-h-[600px] relative overflow-hidden">

                {/* Visualizer Area */}
                <div className="w-full relative h-[500px]">
                    <AnimatePresence mode="wait">

                        {/* TRADITIONAL VIEW */}
                        {view === 'traditional' && (
                            <motion.div key="trad" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5 }} className="w-full h-full flex flex-col items-center py-4">

                                {/* Top Layer: Exchange */}
                                <div className="p-4 border border-border rounded-xl bg-background flex flex-col items-center w-64 shadow-xl">
                                    <Server className="text-blue-500 mb-2" size={32} />
                                    <h3 className="font-bold text-white uppercase text-sm">Exchange (NSE/BSE)</h3>
                                    <span className="text-[10px] text-textMuted uppercase tracking-wider">Order Matching Engine</span>
                                </div>

                                {/* Flow Line */}
                                <div className="w-px h-12 bg-gradient-to-b from-blue-500/50 to-danger/50 border-r border-dashed border-border" />

                                {/* Middle Layer: Clearing Corp */}
                                <div className="p-4 border-2 border-danger/40 rounded-xl bg-danger/5 flex flex-col items-center w-80 relative glow-danger group hover:bg-danger/10 transition-colors">
                                    <div className="absolute -top-3 -right-3 bg-danger text-white text-[10px] font-bold px-2.5 py-1 rounded flex items-center gap-1 uppercase tracking-widest shadow-lg">
                                        <Lock size={10} /> Bottleneck
                                    </div>
                                    <ShieldCheck className="text-danger mb-2 group-hover:scale-110 transition-transform" size={32} />
                                    <h3 className="font-bold text-danger uppercase text-sm">Clearing Corp (NSCCL)</h3>
                                    <span className="text-[11px] text-textMuted mt-1 block text-center leading-relaxed font-medium">Overnight Margin Calculation<br />24-Hour Central Counterparty Risk</span>
                                </div>

                                {/* Flow Line Spacing */}
                                <div className="h-4" />

                                {/* Split Flow */}
                                <div className="w-full max-w-lg relative h-12">
                                    <div className="absolute left-0 right-0 top-0 h-px bg-dashed border-t border-danger/30 border-dashed" />
                                    <div className="absolute left-0 top-0 bottom-0 w-px bg-dashed border-l border-danger/30 border-dashed" />
                                    <div className="absolute right-0 top-0 bottom-0 w-px bg-dashed border-r border-danger/30 border-dashed" />
                                </div>

                                {/* Bottom Layer: Banks and Depositories */}
                                <div className="flex justify-between w-full max-w-2xl gap-8">
                                    <div className="p-4 border border-border rounded-xl bg-background/50 flex flex-col items-center flex-1 hover:bg-background transition-colors">
                                        <Landmark className="text-yellow-500 mb-2" size={32} />
                                        <h3 className="font-bold text-white uppercase text-sm text-center">Clearing Banks</h3>
                                        <span className="text-[10px] text-textMuted uppercase">T+1 Fund Settlement</span>
                                    </div>
                                    <div className="p-4 border border-border rounded-xl bg-background/50 flex flex-col items-center flex-1 hover:bg-background transition-colors">
                                        <Database className="text-primary mb-2" size={32} />
                                        <h3 className="font-bold text-white uppercase text-sm text-center">NSDL / CDSL</h3>
                                        <span className="text-[10px] text-textMuted uppercase">T+1 Securities Settlement</span>
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
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-panel border-2 border-blue-500/50 p-2.5 rounded-xl flex items-center gap-2 text-xs font-bold shadow-2xl">
                                        <Server className="text-blue-500" size={16} /> Exchange Node
                                    </div>
                                    <div className="absolute top-1/2 -right-20 -translate-y-1/2 bg-panel border-2 border-primary/50 p-2.5 rounded-xl flex items-center gap-2 text-xs font-bold shadow-2xl">
                                        <Database className="text-primary" size={16} /> Depository Node
                                    </div>
                                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-panel border-2 border-yellow-500/50 p-2.5 rounded-xl flex items-center gap-2 text-xs font-bold shadow-2xl">
                                        <Landmark className="text-yellow-500" size={16} /> Banking Node
                                    </div>
                                    <div className="absolute top-1/2 -left-20 -translate-y-1/2 bg-panel border-2 border-success/50 p-2.5 rounded-xl flex items-center gap-2 text-xs font-bold shadow-2xl">
                                        <CreditCard className="text-success" size={16} /> Identity Node
                                    </div>

                                    {/* Animated validation beams */}
                                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 animate-spin-slow">
                                        <circle cx="160" cy="160" r="120" stroke="#10b981" strokeWidth="2" strokeDasharray="10 80" fill="none" opacity="0.8" />
                                    </svg>
                                </div>

                                <div className="absolute bottom-4 left-4 bg-background border border-border rounded-xl p-5 max-w-sm shadow-2xl z-30">
                                    <h4 className="text-success font-bold text-sm uppercase mb-2 flex items-center gap-2"><CheckCircle2 size={18} /> Consensus Oversight</h4>
                                    <p className="text-[11px] text-textMuted leading-relaxed">The Clearing Corporation shifts from <strong>central risk holder</strong> to <strong>policy node</strong>. Market safety is enforced algorithmically by the smart-contract, eliminating the T+1 exposure window and manual reconciliation bottlenecks.</p>
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
