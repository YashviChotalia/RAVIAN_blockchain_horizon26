import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Server, RefreshCcw } from 'lucide-react';

const NetworkVisualizer = () => {
    const [blocks, setBlocks] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setBlocks(curr => {
                const newBlock = { id: Date.now(), txCount: Math.floor(Math.random() * 50) + 10 };
                return [...curr.slice(-5), newBlock];
            });
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const nodes = [
        { title: 'NSE Node', x: 50, y: 15 },
        { title: 'BSE Node', x: 80, y: 35 },
        { title: 'RBI Node', x: 75, y: 75 },
        { title: 'SEBI Audit', x: 50, y: 85 },
        { title: 'NSDL Node', x: 25, y: 75 },
        { title: 'NSCCL Node', x: 20, y: 35 },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-primary flex gap-2 items-center">
                        <Activity /> Distributed Ledger Visualizer
                    </h2>
                    <p className="text-textMuted mt-1 text-sm italic">Institutional Consensus Network (Hyperledger Fabric v2.5)</p>
                </div>
                <div className="flex items-center gap-4 bg-panel border border-border px-4 py-2 rounded-lg">
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] text-textMuted uppercase font-bold">Latency</span>
                        <span className="text-xs text-success font-mono">12ms</span>
                    </div>
                    <div className="w-px h-8 bg-border" />
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] text-textMuted uppercase font-bold">Status</span>
                        <span className="text-xs text-primary font-mono">Synced</span>
                    </div>
                </div>
            </div>

            <div className={`bg-[#0a0a0f] border border-border rounded-2xl p-8 h-[600px] relative overflow-hidden flex justify-center items-center shadow-[inset_0_0_80px_rgba(0,0,0,0.9)]`}>
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                {/* Connection Lines setup */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                    {nodes.map((node, i) => (
                        nodes.map((target, j) => {
                            if (i < j) {
                                return (
                                    <line
                                        key={`${i}-${j}`}
                                        x1={`${node.x}%`} y1={`${node.y}%`}
                                        x2={`${target.x}%`} y2={`${target.y}%`}
                                        className="stroke-primary/10 stroke-[1]"
                                    />
                                )
                            }
                            return null;
                        })
                    ))}
                </svg>

                {/* Central Ledger */}
                <div className="relative z-10 w-40 h-40 bg-panel border border-primary/30 rounded-full flex flex-col items-center justify-center glow transition-all hover:scale-105 group cursor-default">
                    <Server size={28} className="text-primary mb-2 group-hover:scale-110 transition-transform" />
                    <span className="font-bold text-[10px] tracking-[0.2em] uppercase text-white/90">Main Ledger</span>
                    <div className="mt-2 flex gap-1">
                        {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-primary/40 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />)}
                    </div>
                </div>

                {/* Nodes */}
                {nodes.map((node, index) => (
                    <div
                        key={index}
                        className="absolute z-20 flex flex-col items-center group"
                        style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.1, borderColor: '#3b82f6' }}
                            className="w-14 h-14 bg-background/80 backdrop-blur-md border border-border group-hover:border-primary/50 rounded-2xl flex items-center justify-center shadow-2xl transition-all cursor-pointer relative overflow-hidden"
                        >
                            <Server size={20} className="text-textMuted group-hover:text-primary transition-colors" />
                            {/* Pulse effect */}
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>

                        <div className="mt-3 px-3 py-1 bg-panel/80 backdrop-blur-sm border border-border rounded-lg shadow-xl">
                            <span className="text-[10px] font-bold text-white uppercase tracking-widest whitespace-nowrap">
                                {node.title}
                            </span>
                        </div>
                    </div>
                ))}

                {/* Block History */}
                <div className="absolute top-8 right-8 w-64 bg-panel/30 backdrop-blur-xl border border-border/50 rounded-2xl p-5 z-30 shadow-2xl">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/30">
                        <h4 className="text-[10px] font-bold text-textMuted uppercase tracking-widest flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> Live Ledger Sync
                        </h4>
                    </div>
                    <div className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                        {blocks.slice().reverse().map(b => (
                            <motion.div
                                key={b.id}
                                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                                className="flex items-center justify-between text-[10px] bg-background/50 border border-border/40 p-3 rounded-xl hover:border-primary/30 transition-all font-mono"
                            >
                                <span className="text-primary font-bold">#{b.id.toString(16).slice(-6).toUpperCase()}</span>
                                <span className="text-textMuted">{b.txCount} TXS</span>
                            </motion.div>
                        ))}
                        {blocks.length === 0 && (
                            <div className="flex flex-col items-center py-6 opacity-40">
                                <RefreshCcw className="animate-spin mb-2" size={20} />
                                <span className="text-[10px] font-mono">INITIALIZING...</span>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default NetworkVisualizer;
