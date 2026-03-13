import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Clock, Activity } from 'lucide-react';

const tableRows = [
    { metric: 'Settlement Risk',   t1: 'High',        t0: 'Medium',     sn: 'Zero',              snGreen: true },
    { metric: 'Capital Locked',    t1: '₹6L Cr/day',  t0: '₹3L Cr/day', sn: '₹0',               snGreen: true },
    { metric: 'Intermediaries',    t1: '6+',           t0: '4+',         sn: '1 (Smart Contract)', snGreen: true },
    { metric: 'Counterparty Risk', t1: '24 hours',     t0: '~6 hours',   sn: '0 seconds',         snGreen: true },
    { metric: 'Margin Required',   t1: 'Very High',    t0: 'High',       sn: 'Near Zero',         snGreen: true },
    { metric: 'Settlement Window', t1: '1 day',        t0: 'Same day',   sn: 'Real-time',         snGreen: true },
];

const chartData = [
    { name: 'T+1 (Standard)',   timeInHours: 24,   fill: '#ef4444' },
    { name: 'T+0 (SEBI Pilot)', timeInHours: 8,    fill: '#f59e0b' },
    { name: 'ShriNivesh',       timeInHours: 0.08, fill: '#10b981' },
];

const SettlementComparison = () => {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-primary">
                    Settlement Timeline Comparison
                </h2>
                <p className="text-textMuted mt-1">Comparing traditional latency with instant ShriNivesh settlement.</p>
            </div>

            {/* ── Comparison Table ── */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-panel border border-border rounded-2xl overflow-hidden"
            >
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-background/60 border-b border-border">
                            <th className="text-left px-6 py-3.5 text-textMuted uppercase text-[10px] tracking-[0.18em] font-bold">Metric</th>
                            <th className="text-left px-6 py-3.5 text-danger   uppercase text-[10px] tracking-[0.18em] font-bold">T+1</th>
                            <th className="text-left px-6 py-3.5 text-yellow-400 uppercase text-[10px] tracking-[0.18em] font-bold">T+0 Pilot</th>
                            <th className="text-left px-6 py-3.5 text-success  uppercase text-[10px] tracking-[0.18em] font-bold">ShriNivesh</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows.map((row, i) => (
                            <motion.tr
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.06 }}
                                className="border-t border-border/30 hover:bg-white/[0.02] transition-colors"
                            >
                                <td className="px-6 py-3.5 font-semibold text-white/90">{row.metric}</td>
                                <td className="px-6 py-3.5 text-textMuted">{row.t1}</td>
                                <td className="px-6 py-3.5 text-textMuted">{row.t0}</td>
                                <td className={`px-6 py-3.5 font-bold ${row.snGreen ? 'text-success' : 'text-white'}`}>{row.sn}</td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>

            {/* ── Chart + Info Cards ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Bar Chart */}
                <div className="bg-panel border border-border p-6 rounded-xl flex flex-col justify-between">
                    <h3 className="font-bold text-lg mb-4 flex gap-2 items-center">
                        <Clock className="text-primary" /> Resolution Latency (Hours)
                    </h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <XAxis type="number" stroke="#94A3B8" />
                                <YAxis dataKey="name" type="category" stroke="#F8FAFC" width={120} />
                                <Tooltip contentStyle={{ backgroundColor: '#15151A', borderColor: '#2E2E3A', color: '#F8FAFC' }} />
                                <Bar dataKey="timeInHours" radius={[0, 4, 4, 0]} animationDuration={2000}>
                                    {chartData.map((entry, i) => (
                                        <Cell key={i} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Info Cards */}
                <div className="space-y-4">
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="p-4 bg-danger/10 border border-danger/30 rounded-xl">
                        <span className="font-mono text-danger font-bold text-sm bg-danger/20 px-2 rounded mb-2 inline-block">T+1 System</span>
                        <p className="text-sm font-medium mb-1">Duration: ~24 Hours</p>
                        <p className="text-xs text-textMuted">Relying on end-of-day netting and next-day clearing processes. High collateral required.</p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                        <span className="font-mono text-yellow-400 font-bold text-sm bg-yellow-500/20 px-2 rounded mb-2 inline-block">T+0 System</span>
                        <p className="text-sm font-medium mb-1">Duration: ~8 Hours (Same Day)</p>
                        <p className="text-xs text-textMuted">Intraday netting. Requires system overhauls but still uses traditional clearing chokepoints.</p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="p-4 bg-success/10 border border-success/30 rounded-xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-success/0 via-success/10 to-success/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        <span className="font-mono text-success font-bold text-sm bg-success/20 px-2 rounded mb-2 inline-block shadow-[0_0_10px_rgba(16,185,129,0.5)]">ShriNivesh Protocol</span>
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
