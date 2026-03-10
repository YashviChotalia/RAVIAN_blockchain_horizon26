import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertOctagon, ShieldX, WifiOff, FileWarning, MoveRight, Layers, Fingerprint } from 'lucide-react';

const RiskFailureScenarios = () => {
    const [activeScenario, setActiveScenario] = useState(null);

    const scenarios = [
        {
            id: 1,
            title: 'Broker Default (Insolvency)',
            icon: ShieldX,
            color: 'danger',
            desc: 'A major trading member files for bankruptcy intra-day while massive trades are pending clearing.',
            tradResponse: 'Disaster. Clearing corp must step in using Settlement Guarantee Fund. Systemic risk spike. Trades may be unwound causing market panic.',
            rtResponse: 'Non-issue. Every trade settles instantly upon matching. If funds are missing, the smart contract simply rejects the execution. Zero unwinding required.',
            visual: <div className="flex gap-4 items-center justify-center p-4">
                <div className="text-center font-mono text-xs w-24 p-2 bg-danger/10 border border-danger text-danger glow-danger">
                    <ShieldX size={32} className="mx-auto block text-danger" />
                    <span className="block mt-2">BROKER</span>
                </div>
                <MoveRight className="text-textMuted" />
                <div className="relative group p-2 bg-panel border-4 border-success w-24 rounded-full flex justify-center text-success glow-success">
                    <Layers size={32} />
                    <span className="absolute -top-8 text-[10px] font-mono text-success bg-success/20 px-1 whitespace-nowrap">REJECTED</span>
                </div>
                <MoveRight className="text-textMuted" />
                <div className="text-center font-mono text-xs w-24 p-2 bg-background border border-border">
                    <ShieldX size={32} className="mx-auto block text-textMuted" />
                    <span className="block mt-2">COUNTERPARTY<br /><span className="text-[10px] text-success">SAFE</span></span>
                </div>
            </div>
        },
        {
            id: 2,
            title: 'Liquidity Shortage',
            icon: AlertOctagon,
            color: 'yellow-500',
            desc: 'Buyer submits an order but lacks the exact capital needed precisely at settlement time.',
            tradResponse: 'Margin call issued. If unmet by EOD, penalty applied and trade is auctioned in the "short delivery" window resulting in severe delays.',
            rtResponse: 'Pre-Trade verification. The exchange engine queries the ledger and mathematically verifies CBDC balance before order even hits matching engine.',
            visual: <div className="flex gap-4 items-center justify-center p-4">
                <div className="font-mono text-xs bg-panel border border-border p-4 w-40">
                    <span className="block mb-2 font-bold text-textMuted">Ledger Query</span>
                    <span className="flex justify-between">REQ: <span className="text-yellow-500">₹1L</span></span>
                    <span className="flex justify-between">BAL: <span className="text-danger">₹50K</span></span>
                </div>
                <MoveRight className="text-textMuted" />
                <div className="text-center font-mono text-xs p-4 bg-primary/20 border-2 border-primary w-40 text-primary glow">
                    <AlertOctagon size={32} className="mx-auto block text-primary" />
                    <span className="block mt-2 font-bold tracking-widest text-primary">PREVENTED</span>
                </div>
            </div>
        },
        {
            id: 3,
            title: 'Central Node Outage',
            icon: WifiOff,
            color: 'orange-500',
            desc: 'The primary clearing corporation datacenter experiences a massive fiber cut causing 100% downtime.',
            tradResponse: 'Market trading halts entirely. Panic ensues as clearing cannot proceed, freezing billions in value indefinitely until recovery protocols succeed.',
            rtResponse: 'Network persists. Operations continue seamlessly via distributed consortium nodes (Exchanges, Depositories, RBI). Consensus remains operational.',
            visual: <div className="grid grid-cols-2 grid-rows-2 gap-4 h-32 w-48 text-[10px] font-mono mx-auto">
                <div className="bg-panel border-2 border-primary rounded grow flex items-center justify-center text-primary shadow-[0_0_10px_rgba(59,130,246,0.3)]">NODE 1</div>
                <div className="bg-danger/20 border-2 border-danger rounded flex flex-col items-center justify-center text-danger opacity-50 relative">
                    NODE 2 <WifiOff size={16} className="absolute inset-0 m-auto text-danger" />
                </div>
                <div className="bg-panel border-2 border-primary rounded grow flex items-center justify-center text-primary shadow-[0_0_10px_rgba(59,130,246,0.3)]">NODE 3</div>
                <div className="bg-panel border-2 border-primary rounded grow flex items-center justify-center text-primary shadow-[0_0_10px_rgba(59,130,246,0.3)]">NODE 4</div>
            </div>
        },
        {
            id: 4,
            title: 'Sophisticated Trade Fraud',
            icon: Fingerprint,
            color: 'pink-500',
            desc: 'Malicious actor attempts to double-spend shares or spoof settlement instructions via API manipulation.',
            tradResponse: 'Fraud detected heavily post-trade during end-of-day complex reconciliation requiring forensic audit.',
            rtResponse: 'Cryptographic Failure. Transaction rejected by consensus protocol instantly due to invalid signatures or state discrepancy prior to block inclusion.',
            visual: <div className="flex gap-4 items-center justify-center p-4">
                <div className="font-mono text-[10px] bg-background border border-pink-500/50 p-2 text-pink-500 rounded text-center leading-none">
                    HASH: <span className="text-white block mt-1">0xAFF...</span><br />SIG: INVALID
                </div>
                <div className="text-white">=/=</div>
                <div className="font-mono text-[10px] bg-panel border border-border p-2 text-textMuted rounded text-center leading-none">
                    EXPECT: <span className="text-white block mt-1">0xB22...</span>
                </div>
                <div className="ml-4 font-mono text-xs p-2 bg-danger/20 text-danger border border-danger glow-danger">
                    BLOCK<br />REJECT
                </div>
            </div>
        }
    ];

    return (
        <div className="space-y-6">
            <div className="mb-8">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-primary flex gap-2 items-center">
                    <AlertOctagon /> System Resilience & Failure Mitigation
                </h2>
                <p className="text-textMuted mt-1">Simulating how the real-time blockchain infra handles worst-case market scenarios.</p>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
                {scenarios.map((s) => {
                    const Icon = s.icon;
                    const isActive = activeScenario?.id === s.id;
                    return (
                        <button
                            key={s.id}
                            onClick={() => setActiveScenario(s)}
                            className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center transition-all min-h-[120px] ${isActive
                                ? `bg-panel border-${s.color} shadow-[0_0_15px_currentColor]`
                                : 'bg-background hover:bg-panel border-border text-textMuted hover:text-white'
                                }`}
                        >
                            <Icon size={32} className={`mb-3 ${isActive ? `text-${s.color} animate-pulse` : ''}`} />
                            <span className="text-xs font-bold font-mono leading-tight">{s.title}</span>
                        </button>
                    )
                })}
            </div>

            <AnimatePresence mode="wait">
                {activeScenario ? (
                    <motion.div
                        key={activeScenario.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-panel border border-border rounded-xl p-6"
                    >
                        <div className="flex items-center gap-3 border-b border-border pb-4 mb-4">
                            {activeScenario.icon({ size: 24, className: `text-${activeScenario.color}` })}
                            <h3 className="text-xl font-bold text-white shrink-0">{activeScenario.title}</h3>
                            <p className="text-sm text-textMuted italic ml-4">{activeScenario.desc}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                            <div className="space-y-2">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-danger bg-danger/10 px-2 py-1 rounded inline-block">Traditional T+1 Response</span>
                                <p className="text-sm border-l-2 border-danger pl-3 text-textMuted">{activeScenario.tradResponse}</p>
                            </div>
                            <div className="space-y-2">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-success bg-success/10 px-2 py-1 rounded inline-block lg:float-right">Blockchain Real-Time Response</span>
                                <p className="text-sm border-r-2 border-success pr-3 text-right font-medium text-white">{activeScenario.rtResponse}</p>
                            </div>
                        </div>

                        <div className="w-full bg-[#0a0a0f] border border-border rounded-lg min-h-[160px] flex items-center justify-center relative overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
                            <span className="absolute top-2 left-3 font-mono text-[10px] text-textMuted uppercase">Simulation Viewer</span>
                            {activeScenario.visual}
                        </div>
                    </motion.div>
                ) : (
                    <div className="bg-panel/30 border border-dashed border-border rounded-xl p-12 text-center flex flex-col items-center justify-center">
                        <FileWarning size={48} className="text-textMuted mb-4 opacity-50" />
                        <p className="text-textMuted font-mono">Select a failure scenario above to simulate the infrastructure response.</p>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default RiskFailureScenarios;
