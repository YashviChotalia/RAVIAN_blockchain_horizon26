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
        { title: 'NSE Node', x: '50%', y: '10%' },
        { title: 'BSE Node', x: '80%', y: '30%' },
        { title: 'RBI Node', x: '80%', y: '70%' },
        { title: 'SEBI Audit Node', x: '50%', y: '90%' },
        { title: 'NSDL Node', x: '20%', y: '70%' },
        { title: 'NSCCL Node', x: '20%', y: '30%' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-primary flex gap-2 items-center">
                    <Activity /> Distributed Ledger Visualizer
                </h2>
                <p className="text-textMuted mt-1">Simulating real-time block propagation across permissioned nodes.</p>
            </div>

            <div className={`bg-[#0f1115] border border-border rounded-xl p-8 h-[600px] relative overflow-hidden flex justify-center items-center shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]`}>
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

                {/* Connection Lines setup */}
                <svg className="absolute inset-0 w-full h-full stroke-primary/10 stroke-[1.5]" style={{ zIndex: 0 }}>
                    {nodes.map((node, i) => (
                        nodes.map((target, j) => {
                            if (i < j) {
                                return (
                                    <g key={`${i}-${j}`}>
                                        <line x1={node.x} y1={node.y} x2={target.x} y2={target.y} />
                                        <motion.circle
                                            r="2"
                                            fill="#3b82f6"
                                            initial={{ offsetDistance: "0%" }}
                                            animate={{ offsetDistance: "100%" }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: (i + j) * 0.5 }}
                                            style={{
                                                offsetPath: `path('M ${node.x} ${node.y} L ${target.x} ${target.y}')`,
                                                filter: 'drop-shadow(0 0 4px #3b82f6)'
                                            }}
                                        />
                                    </g>
                                )
                            }
                            return null;
                        })
                    ))}
                </svg>

                {/* Central Ledger */}
                <div className="relative z-10 w-44 h-44 bg-panel/80 backdrop-blur-md border-2 border-primary/40 rounded-full flex flex-col items-center justify-center glow transition-all hover:scale-105 group cursor-default">
                    <Server size={32} className="text-primary mb-2 group-hover:scale-110 transition-transform" />
                    <span className="font-bold text-sm tracking-widest uppercase text-white">Consensus Layer</span>
                    <span className="text-[10px] text-primary/70 font-mono mt-1 tracking-tighter">GLOBAL_STATE_v4.2</span>
                </div>

                {/* Nodes */}
                {nodes.map((node, index) => (
                    <div
                        key={index}
                        className="absolute z-20 group"
                        style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)' }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="w-14 h-14 bg-background border border-primary/50 group-hover:border-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.1)] group-hover:glow transition-all active:scale-95 cursor-pointer"
                        >
                            <Server size={20} className="text-primary/70 group-hover:text-primary transition-colors" />
                        </motion.div>
                        <div className="absolute -bottom-8 whitespace-nowrap left-1/2 -translate-x-1/2 font-bold text-[10px] uppercase tracking-widest bg-panel/90 border border-border px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                            {node.title}
                        </div>
                    </div>
                ))}

                {/* Block History */}
                <div className="absolute top-6 right-6 w-60 bg-panel/40 backdrop-blur-xl border border-border/50 rounded-xl p-4 z-30 shadow-2xl">
                    <h4 className="text-[10px] font-bold text-textMuted uppercase mb-3 tracking-widest flex items-center justify-between">
                        <span>LATEST BLOCKS</span>
                        <div className="flex gap-1">
                            <span className="w-1 h-1 rounded-full bg-success"></span>
                            <span className="w-1 h-1 rounded-full bg-success/50"></span>
                        </div>
                    </h4>
                    <div className="space-y-2 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
                        {blocks.slice().reverse().map(b => (
                            <motion.div
                                key={b.id}
                                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                                className="flex items-center justify-between text-[10px] bg-background/50 border border-border/40 p-2.5 rounded-lg hover:border-primary/40 transition-colors"
                            >
                                <span className="font-mono text-primary flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>
                                    0x{b.id.toString(16).slice(-6).toUpperCase()}
                                </span>
                                <span className="text-textMuted font-mono">{b.txCount} TXS</span>
                            </motion.div>
                        ))}
                        {blocks.length === 0 && (
                            <div className="flex flex-col items-center py-4 opacity-50">
                                <RefreshCcw className="animate-spin mb-2" size={16} />
                                <span className="text-[10px] text-textMuted italic">SYNCING NODE...</span>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default NetworkVisualizer;
