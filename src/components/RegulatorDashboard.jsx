import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ShieldAlert, Cpu, Activity, Fingerprint, RefreshCcw, UserCheck } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const RegulatorDashboard = () => {
    const [logs, setLogs] = useState([]);
    const [stats, setStats] = useState({ activeNodes: 12, volume: 1450200, flagged: 0, verifiedIdentities: 42305 });
    const [isLive, setIsLive] = useState(true);

    const genData = () => Array.from({ length: 15 }).map((_, i) => ({ time: i, tps: Math.floor(Math.random() * 500) + 100 }));
    const [chartData, setChartData] = useState(genData());

    useEffect(() => {
        let timer;
        if (isLive) {
            timer = setInterval(() => {
                const newLog = {
                    id: Date.now().toString(16),
                    buyer: `ID-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
                    seller: `ID-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
                    asset: ['RELIANCE', 'TCS', 'HDFC', 'INFY'][Math.floor(Math.random() * 4)],
                    qty: Math.floor(Math.random() * 1000) + 10,
                    value: Math.floor(Math.random() * 5000000),
                    flagged: Math.random() > 0.95, // 5% chance of suspicious trade
                    flagReason: Math.random() > 0.5 ? 'KYC_MISMATCH' : 'VELOCITY_LIMIT',
                    time: new Date().toLocaleTimeString()
                };

                setLogs(prev => [newLog, ...prev].slice(0, 10)); // Keep last 10

                setStats(prev => ({
                    ...prev,
                    volume: prev.volume + newLog.value,
                    flagged: newLog.flagged ? prev.flagged + 1 : prev.flagged,
                    verifiedIdentities: Math.random() > 0.8 ? prev.verifiedIdentities + 1 : prev.verifiedIdentities
                }));

                setChartData(prev => [...prev.slice(1), { time: prev[prev.length - 1].time + 1, tps: Math.floor(Math.random() * 500) + 100 }]);
            }, 1200);
        }
        return () => clearInterval(timer);
    }, [isLive]);

    return (
        <div className="space-y-6 max-w-6xl mx-auto font-sans">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-indigo-500 flex gap-2 items-center">
                        <Eye className="text-teal-400" /> SEBI Oversight Terminal
                    </h2>
                    <p className="text-textMuted mt-1">Real-time transparent ledger access for Securities and Exchange Board of India.</p>
                </div>

                <button
                    onClick={() => setIsLive(!isLive)}
                    className={`px-4 py-2 rounded flex items-center gap-2 font-mono text-xs uppercase font-bold transition-all border ${isLive ? 'border-success bg-success/20 text-success glow-success shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'border-border bg-panel text-textMuted'}`}
                >
                    {isLive ? <><span className="w-2 h-2 rounded-full bg-success animate-pulse" /> Live Stream Active</> : <><RefreshCcw size={14} /> Paused</>}
                </button>
            </div>

            <div className="grid grid-cols-5 gap-4">
                <div className="bg-panel border border-border p-4 rounded-xl relative overflow-hidden group hover:border-indigo-400 transition-all">
                    <UserCheck size={24} className="text-indigo-400 mb-2 opacity-50 absolute right-4 top-4 group-hover:opacity-100 transition-all" />
                    <p className="text-xs text-textMuted font-bold uppercase mb-1">Verified Identities</p>
                    <p className="text-3xl font-mono text-white glow group-hover:scale-105 origin-left transition-transform">{stats.verifiedIdentities.toLocaleString()}</p>
                    <p className="text-[10px] text-indigo-400 mt-2">Active VTI Tokens</p>
                </div>
                <div className="bg-panel border border-border p-4 rounded-xl relative overflow-hidden group hover:border-primary transition-all">
                    <Cpu size={24} className="text-primary mb-2 opacity-50 absolute right-4 top-4 group-hover:opacity-100 transition-all" />
                    <p className="text-xs text-textMuted font-bold uppercase mb-1">Active Nodes</p>
                    <p className="text-3xl font-mono text-white glow group-hover:scale-105 origin-left transition-transform">{stats.activeNodes}/12</p>
                    <p className="text-[10px] text-success mt-2">100% Consensus Health</p>
                </div>
                <div className="bg-panel border border-border p-4 rounded-xl relative overflow-hidden group hover:border-teal-400 transition-all">
                    <Activity size={24} className="text-teal-400 mb-2 opacity-50 absolute right-4 top-4 group-hover:opacity-100 transition-all" />
                    <p className="text-xs text-textMuted font-bold uppercase mb-1">Today's Settled Volume</p>
                    <p className="text-3xl font-mono text-white glow group-hover:scale-105 origin-left transition-transform">₹{(stats.volume / 10000000).toFixed(2)} Cr</p>
                    <p className="text-[10px] text-textMuted mt-2">Atomic Finality Achieved</p>
                </div>
                <div className="bg-panel border border-border p-4 rounded-xl relative overflow-hidden group hover:border-danger transition-all">
                    <ShieldAlert size={24} className="text-danger mb-2 opacity-50 absolute right-4 top-4 group-hover:opacity-100 transition-all" />
                    <p className="text-xs text-textMuted font-bold uppercase mb-1">Transactions Flagged</p>
                    <p className="text-3xl font-mono text-danger glow-danger group-hover:scale-105 origin-left transition-transform">{stats.flagged}</p>
                    <p className="text-[10px] text-danger mt-2">Suspicious Activity Reports</p>
                </div>
                <div className="bg-panel border border-border p-4 rounded-xl">
                    <p className="text-xs text-textMuted font-bold uppercase mb-2">Network TPS</p>
                    <div className="h-16">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <Tooltip contentStyle={{ backgroundColor: '#15151A', borderColor: '#2E2E3A', padding: '4px', fontSize: '10px' }} labelStyle={{ display: 'none' }} />
                                <Line type="monotone" dataKey="tps" stroke="#3b82f6" strokeWidth={2} dot={false} isAnimationActive={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="bg-[#0f1115] border border-border rounded-xl flex flex-col h-96 overflow-hidden">
                <div className="bg-panel border-b border-border p-3 flex justify-between items-center text-xs font-bold text-textMuted uppercase font-mono tracking-wider sticky top-0 z-10">
                    <div className="flex gap-2 items-center"><Fingerprint size={14} /> Live Block Ledger Hash Stream</div>
                    <div>Filter: ALL</div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-2 relative">
                    <AnimatePresence>
                        {logs.map((log) => (
                            <motion.div
                                key={log.id}
                                initial={{ opacity: 0, x: -20, height: 0 }}
                                animate={{ opacity: 1, x: 0, height: 'auto' }}
                                className={`flex items-center justify-between p-3 rounded-lg border text-xs font-mono transition-colors
                    ${log.flagged ? 'bg-danger/10 border-danger text-white glow-danger' : 'bg-background border-border text-textMuted hover:bg-panel hover:text-white'}
                 `}
                            >
                                <div className="flex gap-4 items-center">
                                    <span className="opacity-50 w-16">{log.time}</span>
                                    <span className="text-primary w-24">0x{log.id.toUpperCase()}</span>
                                </div>

                                <div className="flex-1 grid grid-cols-4 gap-4 text-center">
                                    <span>{log.buyer}</span>
                                    <span className="text-success">&rarr;</span>
                                    <span>{log.seller}</span>
                                    <span className="font-bold text-white">{log.qty} {log.asset}</span>
                                </div>

                                <div className="flex gap-4 items-center justify-end w-48">
                                    <span className={log.flagged ? 'text-white font-bold inline-block mr-2' : 'text-success font-bold'}>
                                        ₹{log.value.toLocaleString()}
                                    </span>
                                    {log.flagged ? (
                                        <span className="bg-danger px-2 py-1 rounded text-[10px] text-white font-bold animate-pulse" title={log.flagReason}>{log.flagReason}</span>
                                    ) : (
                                        <span className="bg-success/20 text-success border border-success/50 px-2 py-1 rounded text-[10px]">VERIFIED</span>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {!isLive && logs.length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center text-textMuted tracking-wider font-mono text-sm opacity-50">
                            STREAM INTERRUPTED
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default RegulatorDashboard;
