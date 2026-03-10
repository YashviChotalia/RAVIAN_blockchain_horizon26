import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, ShieldCheck, CheckSquare, Search, Lock } from 'lucide-react';

const ComplianceLayer = () => {
    const containerVars = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };
    const itemVars = {
        hidden: { opacity: 0, scale: 0.95 },
        show: { opacity: 1, scale: 1 }
    };

    const principles = [
        { title: 'Permissioned Network', icon: Lock, bg: 'bg-indigo-500/10', color: 'text-indigo-400', desc: 'Read/Write access strictly for regulated entities (Banks, Exchanges, Deps).' },
        { title: 'SEBI Audit Node', icon: Eye, bg: 'bg-primary/10', color: 'text-primary', desc: 'Real-time monitoring, full ledger read access, instant flagged anomaly reporting.' },
        { title: 'Bank-grade Encryption', icon: Shield, bg: 'bg-success/10', color: 'text-success', desc: 'Client wallet identities mapped to PAN via Zero Knowledge Proofs (ZK) ensuring data privacy.' },
        { title: 'Immutable Audit Trail', icon: Search, bg: 'bg-yellow-500/10', color: 'text-yellow-500', desc: 'Every DVP trade stored permanently. Resolves trade disputes instantly with mathematical certainty.' },
        { title: 'Automated Compliance Rules', icon: CheckSquare, bg: 'bg-pink-500/10', color: 'text-pink-400', desc: 'Smart contracts refuse trades failing KYC/AML and foreign investment limit checks.' },
        { title: 'System Resilience', icon: ShieldCheck, bg: 'bg-cyan-500/10', color: 'text-cyan-400', desc: 'Distributed nature prevents SPOF (Single Point of Failure) affecting clearing today.' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <ShieldCheck className="text-success w-8 h-8" />
                <div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-success to-primary">
                        Regulatory Compliance architecture
                    </h2>
                    <p className="text-textMuted mt-1">Built for SEBI Standards. Transparent, secure, and permissioned.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Audit Node Simulation */}
                <div className="bg-panel border border-border p-6 rounded-xl relative overflow-hidden flex flex-col items-center">
                    <div className="w-full flex justify-between items-center mb-6">
                        <span className="font-mono text-xs uppercase tracking-wider text-textMuted font-bold">SEBI Read-Only Node Simulator</span>
                        <span className="bg-success/20 text-success text-xs px-2 py-1 rounded flex gap-2 items-center">
                            <span className="w-2 h-2 bg-success rounded-full animate-pulse" /> Live Monitoring
                        </span>
                    </div>

                    <div className="relative w-48 h-48 border-4 border-primary rounded-full flex justify-center items-center shadow-[0_0_50px_rgba(59,130,246,0.3)] bg-gradient-to-b from-panel to-background">
                        <Eye size={48} className="text-primary z-10 opacity-80" />

                        {/* Radar Sweep */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                            className="absolute inset-0 border-t-2 border-r-2 border-primary rounded-full border-t-transparent w-full h-full opacity-50"
                        />

                        {/* Pings */}
                        <motion.div
                            animate={{ scale: [1, 1.5, 2], opacity: [1, 0, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                            className="absolute w-4 h-4 rounded-full bg-primary/80 left-[80%] top-[30%]"
                        />
                        <motion.div
                            animate={{ scale: [1, 1.5, 2], opacity: [1, 0, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                            className="absolute w-3 h-3 rounded-full bg-success/80 right-[70%] bottom-[20%]"
                        />
                    </div>

                    <div className="mt-8 text-center">
                        <h3 className="text-lg font-bold text-white mb-2">Full Trade Visibility</h3>
                        <p className="text-sm text-textMuted">The regulator maintains a node receiving all blocks simultaneously with exchanges. Real-time market surveillance is automated.</p>
                    </div>
                </div>

                {/* Feature Grid */}
                <motion.div variants={containerVars} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {principles.map((p, i) => {
                        const Icon = p.icon;
                        return (
                            <motion.div key={i} variants={itemVars} className={`p-4 rounded-xl border border-border flex flex-col h-full bg-background`}>
                                <div className="flex gap-3 mb-2 items-center">
                                    <div className={`p-2 rounded-lg ${p.bg}`}>
                                        <Icon className={p.color} size={18} />
                                    </div>
                                    <h4 className="font-bold text-sm text-white">{p.title}</h4>
                                </div>
                                <p className="text-xs text-textMuted leading-relaxed">{p.desc}</p>
                            </motion.div>
                        )
                    })}
                </motion.div>

            </div>
        </div>
    );
};

export default ComplianceLayer;
