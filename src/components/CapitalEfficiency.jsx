import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, AreaChart, Area, ResponsiveContainer } from 'recharts';
import { TrendingUp, RefreshCw, BarChart2, ShieldAlert } from 'lucide-react';

const RANDOM_OFFSETS = Array.from({ length: 10 }).map(() => Math.random() * 50000 - 25000);

const CapitalEfficiency = () => {
    const [valConfig, setValConfig] = useState(600000); // 6L Crores Daily Config

    const traditionalLock = valConfig;
    const blockchainLock = valConfig * 0.20; // 80% reduction
    const unlocked = traditionalLock - blockchainLock;

    const data = useMemo(() => Array.from({ length: 10 }).map((_, i) => ({
        day: `Day ${i + 1}`,
        traditionalStatus: traditionalLock,
        blockchainStatus: blockchainLock + RANDOM_OFFSETS[i], // fluctuate
        unlockedCapital: unlocked
    })), [traditionalLock, blockchainLock, unlocked]);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-success to-primary">
                    Capital Liquidity Calculator
                </h2>
                <p className="text-textMuted mt-1">Demonstrating massive unblocking of margin collateral across brokers.</p>
            </div>

            <div className="bg-panel border border-border p-6 rounded-xl flex flex-col md:flex-row gap-8">

                {/* Simulator controls */}
                <div className="w-full md:w-1/3 flex flex-col gap-6">
                    <div className="p-4 bg-background border border-border rounded-lg">
                        <h3 className="text-sm font-bold flex gap-2 items-center mb-4 text-textMain">
                            <BarChart2 className="w-4 h-4 text-primary" /> Adjusted Daily Turnover (Cr)
                        </h3>

                        <input
                            type="range"
                            min={100000}
                            max={1500000}
                            step={50000}
                            value={valConfig}
                            onChange={(e) => setValConfig(Number(e.target.value))}
                            className="w-full accent-primary h-2 bg-panel rounded-lg appearance-none cursor-pointer mb-2"
                        />
                        <div className="text-right font-mono font-bold text-lg text-primary">₹{(valConfig / 100000).toFixed(1)}L Cr</div>
                    </div>

                    <div className="p-4 bg-danger/10 border border-danger/30 rounded-lg">
                        <h3 className="text-xs font-bold text-danger uppercase mb-1 flex items-center gap-1">
                            <ShieldAlert size={14} /> Locked in T+1 (Avg)
                        </h3>
                        <motion.div key={traditionalLock} initial={{ scale: 1.1, color: '#fff' }} animate={{ scale: 1, color: '#ef4444' }} className="text-2xl font-bold font-mono">
                            ₹{(traditionalLock / 100000).toFixed(1)}L
                        </motion.div>
                        <p className="text-[10px] text-textMuted mt-1">Kept as guarantees by NSCCL/ICCL per day.</p>
                    </div>
                </div>

                {/* Dash Data */}
                <div className="w-full md:w-2/3 flex flex-col justify-between">

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="p-4 bg-success/10 border border-success/30 rounded-lg flex flex-col">
                            <span className="text-xs font-bold text-success uppercase mb-1">New Required Margin</span>
                            <motion.span key={blockchainLock} initial={{ scale: 1.1, color: '#fff' }} animate={{ scale: 1, color: '#10b981' }} className="text-3xl font-bold font-mono">
                                ₹{(blockchainLock / 100000).toFixed(1)}L
                            </motion.span>
                            <span className="text-xs mt-auto font-mono text-textMuted pt-2">80% Efficiency Gain</span>
                        </div>

                        <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg flex flex-col relative overflow-hidden group">
                            <div className="absolute inset-0 bg-primary/20 blur-[20px] rounded-full group-hover:blur-[30px] transition-all opacity-50" />
                            <span className="text-xs font-bold text-primary uppercase mb-1 z-10 flex gap-2 items-center">
                                <TrendingUp size={14} /> Capital UNLOCKED
                            </span>
                            <motion.span key={unlocked} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-3xl font-bold font-mono text-white z-10 glow">
                                + ₹{(unlocked / 100000).toFixed(1)}L
                            </motion.span>
                            <span className="text-xs mt-auto font-mono text-textMuted pt-2 z-10">Free to re-enter markets</span>
                        </div>
                    </div>

                    <div className="h-48 w-full border border-border bg-background rounded-lg p-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorLock" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="day" stroke="#94A3B8" fontSize={10} />
                                <YAxis stroke="#94A3B8" fontSize={10} tickFormatter={(val) => `₹${val / 100000}L`} />
                                <Tooltip contentStyle={{ backgroundColor: '#15151A', borderColor: '#2E2E3A' }} formatter={(val) => `₹${Number(val).toLocaleString()}`} />
                                <Area type="monotone" dataKey="blockchainStatus" stroke="#10b981" fillOpacity={1} fill="url(#colorLock)" />
                            </AreaChart>
                        </ResponsiveContainer>
                        <p className="text-[10px] text-center text-textMuted mt-1">Simulated 10-day volatility buffer requirements</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CapitalEfficiency;
