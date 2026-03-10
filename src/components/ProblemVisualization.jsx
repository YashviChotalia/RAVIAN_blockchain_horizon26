import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, Activity, Coins, Lock, TrendingDown, Layers, Globe, Database, CheckCircle2 } from 'lucide-react';

const ProblemVisualization = () => {
    const containerVars = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVars = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    const steps = [
        { title: 'Trader', desc: '10:00 AM (T)', icon: <Activity className="text-primary w-6 h-6" /> },
        { title: 'Broker', desc: 'Execution', icon: <Layers className="text-purple-400 w-6 h-6" /> },
        { title: 'Exchange', desc: 'Matching', icon: <Globe className="text-blue-400 w-6 h-6" /> },
        { title: 'Clearing Corp', desc: 'Lockup (T+1)', icon: <Lock className="text-danger w-6 h-6" /> },
        { title: 'Depository', desc: 'Transfer', icon: <Database className="text-orange-400 w-6 h-6" /> },
        { title: 'Settlement', desc: 'Next Day', icon: <CheckCircle2 className="text-success w-6 h-6" /> }
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                    The T+1 Settlement Problem
                </h2>
                <p className="text-textMuted mt-2">Millions locked in clearing corporations every 24 hours.</p>
            </div>

            <motion.div
                variants={containerVars}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
                <motion.div variants={itemVars} className="p-6 bg-panel/50 border border-border rounded-xl flex flex-col justify-between group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-xl bg-danger/10 flex items-center justify-center text-danger group-hover:glow-danger transition-all">
                            <Lock size={24} />
                        </div>
                        <span className="text-xs bg-danger/20 text-danger px-2 py-1 rounded">Daily Lockup</span>
                    </div>
                    <h3 className="text-3xl font-bold font-mono">₹6+ Lakh Cr</h3>
                    <p className="text-sm text-textMuted mt-1">Capital sitting idle, unable to be deployed for liquidity.</p>
                </motion.div>

                <motion.div variants={itemVars} className="p-6 bg-panel/50 border border-border rounded-xl flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center text-yellow-500">
                            <AlertTriangle size={24} />
                        </div>
                        <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded">Systemic Risk</span>
                    </div>
                    <h3 className="text-xl font-bold">Counterparty Risk</h3>
                    <p className="text-sm text-textMuted mt-1">If a broker defaults during the 24-hour window, widespread reversals occur.</p>
                </motion.div>

                <motion.div variants={itemVars} className="p-6 bg-panel/50 border border-border rounded-xl flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <TrendingDown size={24} />
                        </div>
                        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Capital Inefficiency</span>
                    </div>
                    <h3 className="text-xl font-bold">High Margins</h3>
                    <p className="text-sm text-textMuted mt-1">Brokers must post massive collateral to guarantee delayed settlements.</p>
                </motion.div>
            </motion.div>

            {/* Traditional Flow Diagram */}
            <div className="p-6 bg-panel/30 border border-border rounded-xl mt-8">
                <h3 className="text-lg font-bold mb-8">Current T+1 Settlement Flow (High Latency)</h3>

                <div className="relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-border -translate-y-1/2 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="h-full bg-gradient-to-r from-border via-primary to-border"
                        />
                    </div>

                    <div className="relative z-10 grid grid-cols-2 md:grid-cols-6 gap-4">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.4 }}
                                className="flex flex-col items-center text-center"
                            >
                                <div className="w-14 h-14 bg-background border-2 border-border flex justify-center items-center rounded-2xl mb-3 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                                    {step.icon}
                                </div>
                                <span className="font-semibold text-sm text-textMain">{step.title}</span>
                                <span className="text-xs text-textMuted mt-1">{step.desc}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-danger/10 border border-danger/30 rounded-full">
                        <Clock className="w-4 h-4 text-danger animate-spin-slow" />
                        <span className="text-sm text-danger font-medium">Over 24 hours of operational delay and risk exposure</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProblemVisualization;
