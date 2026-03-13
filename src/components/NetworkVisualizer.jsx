import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Server, RefreshCcw, Zap, Shield, Database, BarChart2, Landmark } from 'lucide-react';

const NetworkVisualizer = () => {
    const [blocks, setBlocks] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setBlocks(curr => {
                const newBlock = { id: Date.now(), txCount: Math.floor(Math.random() * 50) + 10, node: ['NSE', 'BSE', 'RBI', 'SEBI', 'NSDL', 'NSCCL'][Math.floor(Math.random() * 6)] };
                return [...curr.slice(-6), newBlock];
            });
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    // Nodes evenly spaced in a hexagonal ring — all clear of bottom-right corner
    const nodes = [
        { title: 'NSE Node',   x: 50, y: 12, icon: BarChart2,  color: 'text-blue-400',   border: 'border-blue-400/50' },
        { title: 'BSE Node',   x: 82, y: 32, icon: BarChart2,  color: 'text-cyan-400',   border: 'border-cyan-400/50' },
        { title: 'RBI Node',   x: 82, y: 68, icon: Landmark,   color: 'text-yellow-400', border: 'border-yellow-400/50' },
        { title: 'SEBI Audit', x: 50, y: 88, icon: Shield,     color: 'text-green-400',  border: 'border-green-400/50' },
        { title: 'NSDL Node',  x: 18, y: 68, icon: Database,   color: 'text-purple-400', border: 'border-purple-400/50' },
        { title: 'NSCCL Node', x: 18, y: 32, icon: Server,     color: 'text-orange-400', border: 'border-orange-400/50' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
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

            {/* Layout: Visualizer left, Logs right */}
            <div className="flex gap-6 items-stretch">

                {/* ── Main Visualizer Canvas ── */}
                <div className="flex-1 bg-[#0a0a0f] border border-border rounded-2xl relative overflow-hidden h-[520px] shadow-[inset_0_0_80px_rgba(0,0,0,0.9)]">
                    {/* Background dot grid */}
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                    {/* Connection lines: node→center */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                        {nodes.map((node, i) => (
                            <line key={i}
                                x1={`${node.x}%`} y1={`${node.y}%`}
                                x2="50%" y2="50%"
                                stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.15"
                                strokeDasharray="4 6"
                            />
                        ))}
                        {/* Ring outline */}
                        <circle cx="50%" cy="50%" r="38%" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.08" fill="none" strokeDasharray="6 10" />
                    </svg>

                    {/* Central Ledger */}
                    <motion.div
                        animate={{ boxShadow: ['0 0 15px rgba(59,130,246,0.2)', '0 0 40px rgba(59,130,246,0.45)', '0 0 15px rgba(59,130,246,0.2)'] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute z-10 flex flex-col items-center justify-center"
                        style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
                    >
                        <div className="w-28 h-28 bg-panel border-2 border-primary/40 rounded-full flex flex-col items-center justify-center">
                            <Server size={28} className="text-primary mb-1" />
                            <span className="font-bold text-[9px] tracking-[0.2em] uppercase text-white/90">Main Ledger</span>
                            <div className="mt-2 flex gap-1">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-1 h-1 rounded-full bg-primary/50 animate-pulse"
                                        style={{ animationDelay: `${i * 0.25}s` }} />
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Peripheral Nodes */}
                    {nodes.map((node, index) => {
                        const Icon = node.icon;
                        return (
                            <div
                                key={index}
                                className="absolute z-20 flex flex-col items-center group"
                                style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.12 }}
                                    className={`w-14 h-14 bg-background/80 backdrop-blur-md border ${node.border} rounded-2xl flex items-center justify-center shadow-2xl cursor-pointer relative`}
                                >
                                    <Icon size={20} className={node.color} />
                                    <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </motion.div>
                                <div className="mt-2 px-2 py-0.5 bg-panel/80 backdrop-blur-sm border border-border/60 rounded-lg shadow-xl">
                                    <span className={`text-[9px] font-bold uppercase tracking-widest whitespace-nowrap ${node.color}`}>
                                        {node.title}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ── Live Ledger Sync Panel (outside canvas, right column) ── */}
                <div className="w-72 flex flex-col bg-panel border border-border/60 rounded-2xl overflow-hidden shadow-2xl">
                    {/* Panel header */}
                    <div className="px-5 py-4 border-b border-border/40 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                        <h4 className="text-[10px] font-bold text-textMuted uppercase tracking-[0.18em]">Live Ledger Sync</h4>
                    </div>

                    {/* Comparison Table */}
                    <div className="px-4 pt-4 pb-2">
                        <div className="overflow-hidden rounded-xl border border-border/40">
                            <table className="w-full text-[10px]">
                                <thead>
                                    <tr className="bg-background/60">
                                        <th className="text-left px-3 py-2 text-textMuted uppercase tracking-widest font-bold">Metric</th>
                                        <th className="text-left px-3 py-2 text-danger uppercase tracking-widest font-bold">T+1</th>
                                        <th className="text-left px-3 py-2 text-success uppercase tracking-widest font-bold">ShriNivesh</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { metric: 'Settlement Risk', t1: 'High', sn: 'Zero', snGreen: true },
                                        { metric: 'Capital Locked', t1: '₹6L Cr/day', sn: '₹0', snGreen: true },
                                        { metric: 'Intermediaries', t1: '6+', sn: '1 (Smart Contract)', snGreen: true },
                                        { metric: 'Counterparty Risk', t1: '24 hours', sn: '0 seconds', snGreen: true },
                                    ].map((row, i) => (
                                        <tr key={i} className="border-t border-border/20 hover:bg-white/2 transition-colors">
                                            <td className="px-3 py-2.5 font-semibold text-white/80">{row.metric}</td>
                                            <td className="px-3 py-2.5 text-textMuted">{row.t1}</td>
                                            <td className={`px-3 py-2.5 font-bold ${row.snGreen ? 'text-success' : 'text-white'}`}>{row.sn}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Block feed */}
                    <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2 custom-scrollbar mt-2">
                        {blocks.length === 0 && (
                            <div className="flex flex-col items-center py-8 opacity-40">
                                <RefreshCcw className="animate-spin mb-2" size={20} />
                                <span className="text-[10px] font-mono">INITIALIZING...</span>
                            </div>
                        )}
                        {blocks.slice().reverse().map(b => (
                            <motion.div
                                key={b.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center justify-between text-[10px] bg-background/50 border border-border/40 px-3 py-2.5 rounded-xl hover:border-primary/30 transition-all font-mono"
                            >
                                <span className="text-primary font-bold">#{b.id.toString(16).slice(-6).toUpperCase()}</span>
                                <span className="text-textMuted/60 text-[9px]">{b.node}</span>
                                <span className="text-textMuted">{b.txCount} TXS</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default NetworkVisualizer;
