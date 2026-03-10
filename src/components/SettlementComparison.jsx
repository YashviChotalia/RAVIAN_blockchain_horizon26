import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock, TrendingDown, BatteryCharging, Activity } from 'lucide-react';

const SettlementComparison = () => {
    const data = [
        { name: 'T+1 (Standard)', timeInHours: 24, fill: '#ef4444' }, // Danger
        { name: 'T+0 (SEBI Pilot)', timeInHours: 8, fill: '#f59e0b' }, // Warning
        { name: 'DVP Blockchain', timeInHours: 0.08, fill: '#10b981' } // Success
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-primary">
                    Settlement Timeline Comparison
                </h2>
                <p className="text-textMuted mt-1">Comparing traditional latency with instant blockchain settlement.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Chart */}
                <div className="bg-panel border border-border p-6 rounded-xl flex flex-col justify-between">
                    <h3 className="font-bold text-lg mb-4 flex gap-2 items-center">
                        <Clock className="text-primary" /> Resolution Latency (Hours)
                    </h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <XAxis type="number" stroke="#94A3B8" />
                                <YAxis dataKey="name" type="category" stroke="#F8FAFC" width={120} />
                                <Tooltip contentStyle={{ backgroundColor: '#15151A', borderColor: '#2E2E3A', color: '#F8FAFC' }} />
                                <Bar dataKey="timeInHours" radius={[0, 4, 4, 0]} animationDuration={2000} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Info Cards */}
                <div className="space-y-4">

                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="p-4 bg-danger/10 border border-danger/30 rounded-lg">
                        <span className="font-mono text-danger font-bold text-sm bg-danger/20 px-2 rounded mb-2 inline-block">T+1 System</span>
                        <p className="text-sm font-medium mb-1">Duration: ~24 Hours</p>
                        <p className="text-xs text-textMuted">Relying on end-of-day netting and next-day clearing processes. High collateral required.</p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                        <span className="font-mono text-yellow-500 font-bold text-sm bg-yellow-500/20 px-2 rounded mb-2 inline-block">T+0 System</span>
                        <p className="text-sm font-medium mb-1">Duration: ~8 Hours (Same Day)</p>
                        <p className="text-xs text-textMuted">Intraday netting. Requires system overhauls but still uses traditional clearing chokepoints.</p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="p-4 bg-success/10 border border-success/30 rounded-lg relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-success/0 via-success/10 to-success/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        <span className="font-mono text-success font-bold text-sm bg-success/20 px-2 rounded mb-2 inline-block shadow-[0_0_10px_rgba(16,185,129,0.5)]">Blockchain DVP</span>
                        <p className="text-lg font-bold mb-1 text-white flex items-center gap-2">
                            <Activity className="text-success w-5 h-5" /> &lt; 5 Minutes
                        </p>
                        <p className="text-sm text-textMuted">True atomic settlement. Zero clearing delay. Smart contract confirms and updates ledgers instantly.</p>
                    </motion.div>

                </div>
            </div>

        </div>
    );
};

export default SettlementComparison;
