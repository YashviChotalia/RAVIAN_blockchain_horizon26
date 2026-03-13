import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Zap, Cpu, Activity, Server, Users, Landmark, Coins, Database, RefreshCw, Fingerprint } from 'lucide-react';

const NodeInfo = ({ title, desc, position = "top" }) => {
    const posClasses = {
        top: "absolute -top-24 left-1/2 -translate-x-1/2",
        right: "absolute top-1/2 left-full translate-x-4 -translate-y-1/2",
        left: "absolute top-1/2 right-full -translate-x-4 -translate-y-1/2",
    };

    const arrowClasses = {
        top: "absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-panel border-b border-r border-primary/50 rotate-45",
        right: "absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 bg-panel border-l border-b border-primary/50 rotate-45",
        left: "absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-4 bg-panel border-t border-r border-primary/50 rotate-45",
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`${posClasses[position]} w-64 p-3 bg-panel border border-primary/50 rounded-lg shadow-2xl z-50 pointer-events-none`}
        >
            <div className={arrowClasses[position]}></div>
            <h4 className="text-white font-bold text-sm mb-1">{title}</h4>
            <p className="text-xs text-textMuted leading-tight">{desc}</p>
        </motion.div>
    );
};

const BlockchainArchitecture = () => {
    const [hoveredNode, setHoveredNode] = useState(null);

    const nodes = [
        { id: 'traders', title: 'Traders', icon: Users, desc: 'Retail and institutional investors placing buy/sell orders.' },
        { id: 'vti', title: 'Verified Trading Identity Layer (VTI)', icon: Fingerprint, desc: 'Zero-knowledge validator linking PAN, Bank, and Demat accounts securely.' },
        { id: 'brokers', title: 'Broker APIs', icon: Activity, desc: 'Brokers route orders to the blockchain layer and exchange simultaneously.' },
        { id: 'exchange', title: 'Exchange Engine', icon: Server, desc: 'NSE/BSE matching engine handles order matching and broadcasts trades.' },
        { id: 'blockchain', title: 'Blockchain Settlement Layer', icon: Layers, desc: 'Permissioned ledger coordinating ShriNivesh smart contracts instantly.' },
        { id: 'dvp', title: 'Smart Contract: ShriNivesh', icon: Zap, desc: 'Atomic Swap: Executes only if both shares AND cash are present.' },
        { id: 'shares', title: 'Tokenized Shares', icon: Database, desc: 'CBDC or digital representations of equity securely held in vaults.' },
        { id: 'cash', title: 'Tokenized INR', icon: Coins, desc: 'Digital Rupee natively supporting programmable settlements.' },
        { id: 'depositories', title: 'Depositories', icon: Landmark, desc: 'NSDL/CDSL operating nodes to update beneficial ownership.' },
        { id: 'banks', title: 'Banking System', icon: Landmark, desc: 'RBI and Partner Banks maintaining fractional/full CBDC reserves.' },
    ];

    const handleHover = (id) => setHoveredNode(id);
    const handleLeave = () => setHoveredNode(null);

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-success to-emerald-400 flex items-center gap-3">
                    <Zap className="text-success" />
                    Real-Time ShriNivesh Architecture
                </h2>
                <p className="text-textMuted mt-2">ShriNivesh (Real-Time DVP) via smart contracts eliminates clearing delays.</p>
            </div>

            <div className="bg-panel/50 border border-border rounded-xl p-8 relative overflow-hidden flex flex-col items-center">

                {/* Animated Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                {/* Tree Layout */}
                <div className="relative z-10 w-full max-w-3xl">

                    {/* Level 1: Users */}
                    <div className="flex justify-center mb-8 relative">
                        <Node hoverId="traders" node={nodes[0]} onHover={handleHover} onLeave={handleLeave} hovered={hoveredNode} tooltipPos="right" />
                        <div className="absolute h-8 w-px bg-border -bottom-8 left-1/2" />
                    </div>

                    {/* Level 1.5: VTI Layer */}
                    <div className="flex justify-center mb-12 relative w-1/2 mx-auto">
                        <div className="absolute h-12 w-px bg-border -top-12 left-1/2" />
                        <Node hoverId="vti" node={nodes[1]} color="text-indigo-400" border="border-indigo-400/50" onHover={handleHover} onLeave={handleLeave} hovered={hoveredNode} />
                        <div className="absolute h-8 w-px bg-border -bottom-8 left-1/2" />
                    </div>

                    {/* Level 2: Broker & Exchange */}
                    <div className="flex justify-between items-center mb-12 relative w-3/4 mx-auto">
                        <div className="absolute h-px w-full bg-border -top-8 left-0" />
                        <div className="absolute h-8 w-px bg-border -top-8 left-0" />
                        <div className="absolute h-8 w-px bg-border -top-8 right-0" />
                        <div className="absolute h-12 w-px bg-border -bottom-12 left-0" />
                        <div className="absolute h-12 w-px bg-border -bottom-12 right-0" />

                        <Node hoverId="brokers" node={nodes[2]} onHover={handleHover} onLeave={handleLeave} hovered={hoveredNode} />
                        <Node hoverId="exchange" node={nodes[3]} onHover={handleHover} onLeave={handleLeave} hovered={hoveredNode} />
                    </div>

                    {/* Level 3: Blockchain Core */}
                    <div className="flex justify-center mb-12 relative">
                        <div className="absolute h-px w-3/4 bg-border -top-12 left-[12.5%]" />
                        <div className="absolute h-12 w-px bg-border -top-12 left-1/2" />
                        <div className="absolute h-8 w-px bg-success left-1/2 -bottom-8 glow-success" />

                        <motion.div
                            animate={{ boxShadow: ['0 0 10px rgba(16,185,129,0.2)', '0 0 30px rgba(16,185,129,0.5)', '0 0 10px rgba(16,185,129,0.2)'] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="relative"
                            onMouseEnter={() => handleHover('blockchain')}
                            onMouseLeave={handleLeave}
                        >
                            <div className="px-10 py-4 bg-background border-2 border-success rounded-xl flex items-center gap-3">
                                <Layers className="text-success" />
                                <span className="font-bold text-white text-lg">Blockchain Settlement Layer</span>
                            </div>
                            <AnimatePresence>
                                {hoveredNode === 'blockchain' && <NodeInfo title={nodes[4].title} desc={nodes[4].desc} position="right" />}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    {/* Level 4: DVP */}
                    <div className="flex justify-center mb-12 relative">
                        <div className="absolute h-10 w-px bg-primary/50 left-[25%] -bottom-10" />
                        <div className="absolute h-10 w-px bg-yellow-500/50 right-[25%] -bottom-10" />
                        <div className="absolute h-px w-1/2 bg-border left-[25%] -bottom-10" />

                        <motion.div
                            className="relative"
                            onMouseEnter={() => handleHover('dvp')}
                            onMouseLeave={handleLeave}
                        >
                            <div className="w-20 h-20 bg-panel border-2 border-primary rounded-full flex items-center justify-center glow cursor-pointer z-10 relative">
                                <RefreshCw className="text-primary w-8 h-8 animate-spin-slow" />
                            </div>
                            <span className="absolute -right-32 top-1/2 -translate-y-1/2 font-mono text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                                Atomic Contract
                            </span>
                            <AnimatePresence>
                                {hoveredNode === 'dvp' && <NodeInfo title={nodes[5].title} desc={nodes[5].desc} />}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    {/* Level 5: Tokens */}
                    <div className="flex justify-around mb-12 relative w-1/2 mx-auto">
                        <div className="absolute h-10 w-px bg-border left-[10%] -bottom-10" />
                        <div className="absolute h-10 w-px bg-border right-[10%] -bottom-10" />

                        <Node hoverId="shares" node={nodes[6]} color="text-primary" border="border-primary/50" onHover={handleHover} onLeave={handleLeave} hovered={hoveredNode} />
                        <Node hoverId="cash" node={nodes[7]} color="text-yellow-500" border="border-yellow-500/50" onHover={handleHover} onLeave={handleLeave} hovered={hoveredNode} />
                    </div>

                    {/* Level 6: Infra */}
                    <div className="flex justify-around w-1/2 mx-auto">
                        <Node hoverId="depositories" node={nodes[8]} onHover={handleHover} onLeave={handleLeave} hovered={hoveredNode} />
                        <Node hoverId="banks" node={nodes[9]} onHover={handleHover} onLeave={handleLeave} hovered={hoveredNode} />
                    </div>

                </div>
            </div>
        </div>
    );
};

const Node = ({ node, hoverId, onHover, onLeave, hovered, color = "text-textMain", border = "border-border", tooltipPos = "top" }) => {
    const Icon = node.icon;
    return (
        <div
            className="relative flex flex-col items-center"
            onMouseEnter={() => onHover(hoverId)}
            onMouseLeave={onLeave}
        >
            <div className={`w-14 h-14 bg-panel border ${border} rounded-xl flex justify-center items-center shadow-lg transition-transform hover:scale-110 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] cursor-pointer z-10`}>
                <Icon className={color} />
            </div>
            <span className="mt-3 font-medium text-sm text-textMain">{node.title}</span>

            <AnimatePresence>
                {hovered === hoverId && <NodeInfo title={node.title} desc={node.desc} position={tooltipPos} />}
            </AnimatePresence>
        </div>
    );
}

export default BlockchainArchitecture;
