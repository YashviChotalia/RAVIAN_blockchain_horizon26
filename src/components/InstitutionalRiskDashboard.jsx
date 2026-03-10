import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, ShieldAlert, BarChart3, Globe, LineChart } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const InstitutionalRiskDashboard = () => {
    // Generate some mock live exposure data
    const generateData = () => Array.from({ length: 20 }).map((_, i) => ({
        time: i,
        exposure: Math.floor(Math.random() * 400) + 100,
        liquidity: Math.floor(Math.random() * 200) + 800
    }));

    const [data, setData] = useState(generateData());
    const [counterpartyRanks] = useState([
        { id: 'Bank X', exposure: '₹4,500 Cr', risk: 'High', color: 'danger' },
        { id: 'Broker Y', exposure: '₹2,100 Cr', risk: 'Medium', color: 'orange-500' },
        { id: 'Fund Z', exposure: '₹800 Cr', risk: 'Low', color: 'success' },
    ]);

    useEffect(() => {
        const timer = setInterval(() => {
            setData(prev => {
                const newArr = prev.slice(1);
                newArr.push({
                    time: prev[prev.length - 1].time + 1,
                    exposure: Math.floor(Math.random() * 400) + 100,
                    liquidity: Math.floor(Math.random() * 200) + 800
                });
                return newArr;
            });
        }, 1500);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="space-y-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-primary flex items-center gap-2">
                    <BarChart3 /> Institutional Systemic Risk Monitor
                </h2>
                <p className="text-textMuted mt-1">Real-time surveillance of capital availability and market counterparty exposure.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Outstanding Settlement Exposure */}
                <div className="bg-panel border border-danger/30 p-6 rounded-xl flex flex-col justify-between group overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                        <ShieldAlert size={100} />
                    </div>
                    <h3 className="text-xs font-bold text-textMuted uppercase mb-4 flex items-center gap-2">
                        <ShieldAlert size={16} className="text-danger" /> Outstanding Settlement Exposure
                    </h3>
                    <div>
                        <span className="text-4xl font-mono text-white font-bold tracking-tight">₹1.83 Lk Cr</span>
                        <p className="text-xs text-danger mt-2 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-danger animate-pulse" /> T+1 Value at Risk (VaR)</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-border">
                        <p className="text-[10px] text-textMuted uppercase tracking-widest text-success">Predicted Post-DVP:</p>
                        <p className="text-xl font-mono font-bold text-success glow-success">₹0.00</p>
                    </div>
                </div>

                {/* Real-time Capital Availability */}
                <div className="bg-panel border border-border p-6 rounded-xl flex flex-col justify-between col-span-1 md:col-span-2 relative">
                    <h3 className="text-xs font-bold text-textMuted uppercase mb-4 flex items-center gap-2">
                        <Globe size={16} className="text-primary" /> Institutional Liquidity Tracker (Live)
                    </h3>

                    <div className="h-40 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorLiquidity" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorExposure" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Tooltip contentStyle={{ backgroundColor: '#15151A', borderColor: '#2E2E3A', padding: '8px', fontSize: '12px' }} />
                                <Area type="monotone" dataKey="liquidity" stroke="#3b82f6" fillOpacity={1} fill="url(#colorLiquidity)" name="Available Pool" isAnimationActive={false} />
                                <Area type="monotone" dataKey="exposure" stroke="#ef4444" fillOpacity={1} fill="url(#colorExposure)" name="Locked Exposure" isAnimationActive={false} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Liquidity Concentration */}
                <div className="bg-panel border border-border p-6 rounded-xl col-span-1 md:col-span-3">
                    <h3 className="text-xs font-bold text-textMuted uppercase mb-4 flex items-center gap-2 border-b border-border pb-2">
                        <LineChart size={16} className="text-yellow-500" /> Counterparty Risk Segregation (T+1 Vulnerabilities)
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                        {counterpartyRanks.map((cp) => (
                            <div key={cp.id} className="bg-background border border-border p-4 rounded-xl flex flex-col justify-between">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="font-bold text-white text-lg">{cp.id}</span>
                                    <span className={`text-[10px] font-bold px-2 py-1 uppercase tracking-widest rounded bg-${cp.color}/20 text-${cp.color} border border-${cp.color}/50`}>{cp.risk} Risk</span>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <span className="text-xs text-textMuted block mb-1">Unsettled Exposure</span>
                                        <span className="font-mono text-xl">{cp.exposure}</span>
                                    </div>

                                    <div className="w-full bg-border rounded-full h-1.5 flex overflow-hidden">
                                        <div className={`bg-${cp.color} h-full`} style={{ width: cp.risk === 'High' ? '80%' : cp.risk === 'Medium' ? '45%' : '15%' }}></div>
                                    </div>
                                </div>

                                <p className="text-[10px] text-primary/70 mt-4 italic text-center w-full">Atomic settlement mitigates {cp.id} concentration risk entirely.</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default InstitutionalRiskDashboard;
