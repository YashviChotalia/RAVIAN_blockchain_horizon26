import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Clock, Zap, Percent } from 'lucide-react';
import { PieChart as RePieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const SmartMarginSystem = () => {
    const [selectedModel, setSelectedModel] = useState('rt'); // t1, t0, rt

    const COLORS = ['#10b981', '#ef4444', '#f59e0b', '#3b82f6'];

    const models = {
        t1: {
            name: 'T+1 traditional',
            riskDuration: '24 Hours',
            margin: 20,
            locked: 200000,
            free: 800000,
            data: [{ name: 'Free Capital', value: 80 }, { name: 'Required Margin Locked', value: 20 }],
            desc: 'Extensive upfront capital locked to protect clearing corporations from default during the 24 hour latency period.'
        },
        t0: {
            name: 'T+0 Intraday',
            riskDuration: 'EOD / 8 Hours',
            margin: 8,
            locked: 80000,
            free: 920000,
            data: [{ name: 'Free Capital', value: 92 }, { name: 'Required Margin Locked', value: 8 }],
            desc: 'Lower margin required due to intra-day settlement, but still necessitates non-trivial buffers.'
        },
        rt: {
            name: 'Atomic Real-Time',
            riskDuration: '< 5 Minutes',
            margin: 1.5,
            locked: 15000,
            free: 985000,
            data: [{ name: 'Free Capital', value: 98.5 }, { name: 'Required Margin Locked', value: 1.5 }],
            desc: 'Risk exposure virtually eliminated. Nominal margins required only for system operational buffers resulting in maximum liquidity.'
        }
    };

    const current = models[selectedModel];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-primary flex gap-2 items-center">
                        <PieChart /> Smart Margin Rescaling
                    </h2>
                    <p className="text-textMuted mt-1">Dynamically adjusting broker margin requirements based on settlement speed.</p>
                </div>

                <div className="flex bg-panel border border-border rounded-lg p-1 text-sm font-medium">
                    <button onClick={() => setSelectedModel('t1')} className={`px-4 py-2 rounded-md transition-all ${selectedModel === 't1' ? 'bg-danger/20 text-danger shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'text-textMuted hover:bg-background'}`}>T+1 System</button>
                    <button onClick={() => setSelectedModel('t0')} className={`px-4 py-2 rounded-md transition-all ${selectedModel === 't0' ? 'bg-yellow-500/20 text-yellow-500 shadow-[0_0_10px_rgba(245,158,11,0.2)]' : 'text-textMuted hover:bg-background'}`}>T+0 Pilot</button>
                    <button onClick={() => setSelectedModel('rt')} className={`px-4 py-2 rounded-md transition-all ${selectedModel === 'rt' ? 'bg-success/20 text-success shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 'text-textMuted hover:bg-background'}`}>Real-Time DVP</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-panel border border-border p-6 rounded-xl">

                {/* Analytics Readout */}
                <div className="space-y-6">
                    <h3 className="font-bold text-lg text-white border-b border-border pb-2">Profile: {current.name}</h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-background border border-border rounded-xl">
                            <div className="text-xs text-textMuted flex items-center gap-1 mb-2"><Clock size={12} /> Window of Risk</div>
                            <motion.div key={current.riskDuration} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-xl font-bold font-mono">
                                {current.riskDuration}
                            </motion.div>
                        </div>

                        <div className="p-4 bg-primary/10 border border-primary/30 rounded-xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-primary/20 hover:bg-primary/30 transition-all opacity-50 blur-[20px] rounded-full" />
                            <div className="text-xs text-primary flex items-center gap-1 mb-2 relative z-10"><Percent size={12} /> Margin Ratio</div>
                            <motion.div key={current.margin} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-3xl font-bold font-mono text-white relative z-10 glow">
                                {current.margin}%
                            </motion.div>
                        </div>
                    </div>

                    <div className="p-4 border-l-4 border-primary bg-primary/5 rounded-r flex flex-col gap-2">
                        <span className="font-bold text-sm tracking-wide text-white">Example on ₹10,00,000 Portfolio</span>
                        <div className="flex justify-between items-center text-sm font-mono border-b border-border/50 pb-1">
                            <span className="text-textMuted">Free Trading Power:</span>
                            <span className="text-success glow-success transition-all">₹{current.free.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm font-mono pt-1">
                            <span className="text-textMuted">Margin Required:</span>
                            <span className="text-danger transition-all">₹{current.locked.toLocaleString()}</span>
                        </div>
                    </div>

                    <p className="text-sm text-textMuted italic pt-4">"{current.desc}"</p>
                </div>

                {/* Visualizer */}
                <div className="relative h-64 md:h-full min-h-[300px] flex items-center justify-center bg-background border border-border rounded-xl">
                    <ResponsiveContainer width="100%" height="100%">
                        <RePieChart>
                            <Pie
                                data={current.data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                            >
                                {current.data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index === 0 ? COLORS[0] : COLORS[1]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#15151A', borderColor: '#2E2E3A', color: '#F8FAFC', borderRadius: '8px', fontSize: '12px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Legend verticalAlign="bottom" height={36} />
                        </RePieChart>
                    </ResponsiveContainer>

                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center flex-col">
                        <span className="text-xl font-bold font-mono text-textMuted mt-[-30px]">100%</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SmartMarginSystem;
