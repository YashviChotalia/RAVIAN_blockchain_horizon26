import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Server } from 'lucide-react';

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

            <div className="bg-[#0f1115] border border-border rounded-xl p-8 h-[600px] relative overflow-hidden flex justify-center items-center shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]">

                {/* Connection Lines setup */}
                <svg className="absolute inset-0 w-full h-full stroke-border stroke-[1]" style={{ zIndex: 0 }}>
                    <circle cx="50%" cy="50%" r="35%" fill="none" />
                    {nodes.map((node, i) => (
                        nodes.map((target, j) => {
                            if (i !== j) {
                                return <line key={`${i}-${j}`} x1={node.x} y1={node.y} x2={target.x} y2={target.y} className="stroke-border/20" />
                            }
                            return null;
                        })
                    ))}
                </svg>

                {/* Central Ledger */}
                <div className="relative z-10 w-48 h-48 bg-panel border-4 border-primary/30 rounded-full flex flex-col items-center justify-center glow text-center">
                    <Server size={32} className="text-primary mb-2" />
                    <span className="font-bold text-lg">Hyperledger Fabric</span>
                    <span className="text-xs text-textMuted">Shared Global State</span>
                </div>

                {/* Nodes */}
                {nodes.map((node, index) => (
                    <div
                        key={index}
                        className="absolute z-20"
                        style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)' }}
                    >
                        <div className="w-16 h-16 bg-background border-2 border-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                            <Server size={24} className="text-primary" />
                        </div>
                        <div className="absolute -bottom-6 whitespace-nowrap left-1/2 -translate-x-1/2 font-bold text-xs bg-panel border border-border px-2 py-1 rounded">
                            {node.title}
                        </div>

                        {/* Simulated Data Packets */}
                        {blocks.map((block) => (
                            <motion.div
                                key={`${block.id}-${index}`}
                                initial={{ scale: 0, opacity: 1, x: '-50%', y: '-50%' }}
                                animate={{
                                    scale: [1, 2, 0],
                                    opacity: [1, 1, 0]
                                }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="absolute top-1/2 left-1/2 w-8 h-8 rounded-full border border-primary/50 pointer-events-none"
                            />
                        ))}
                    </div>
                ))}

                {/* Block History */}
                <div className="absolute top-4 right-4 w-64 bg-panel/80 border border-border rounded-lg p-4 backdrop-blur-md z-30">
                    <h4 className="text-xs font-bold text-textMuted uppercase mb-3 border-b border-border pb-2">Recent Blocks</h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                        {blocks.slice().reverse().map(b => (
                            <motion.div
                                key={b.id}
                                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                                className="flex items-center justify-between text-xs bg-background p-2 rounded border border-border"
                            >
                                <span className="font-mono text-primary flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-success"></span>
                                    #{b.id.toString().slice(-6)}
                                </span>
                                <span className="text-textMuted">{b.txCount} txs</span>
                            </motion.div>
                        ))}
                        {blocks.length === 0 && <span className="text-xs text-textMuted italic">Awaiting blocks...</span>}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default NetworkVisualizer;
