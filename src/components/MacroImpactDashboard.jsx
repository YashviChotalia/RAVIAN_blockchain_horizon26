import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, BarChart2, Globe, TrendingUp, HandCoins, ShieldCheck } from 'lucide-react';

const MacroImpactDashboard = () => {
    // Sliders state
    const [volume, setVolume] = useState(150000); // Daily Volume (Cr INR)
    const [cycle, setCycle] = useState(1); // Trade cycles for capital reuse

    // Modeled calculations based on industry approximations
    // T+1 Margin requirement (~15-20%)
    const t1MarginRate = 0.18;
    const t1LockedCapital = volume * t1MarginRate;

    // Real-Time DVP margin requirements (Pre-funded or Instant atomic swap -> ~2%)
    const rtMarginRate = 0.02;
    const rtLockedCapital = volume * rtMarginRate;

    // Capital Velocity
    const capitalSaved = t1LockedCapital - rtLockedCapital;
    // Real-time allows re-using the same capital `cycle` times
    const effectiveLiquidityMultiplier = capitalSaved * cycle;

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            <div className="mb-6">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500 flex items-center gap-2">
                    <Globe /> Macro-Economic Impact Engine
                </h2>
                <p className="text-textMuted mt-1">Estimating the systemic liquidity unleashed across India's capital markets by upgrading from T+1 to Real-Time DVP.</p>
            </div>

            {/* Input Controls */}
            <div className="bg-panel border border-border p-6 rounded-xl flex flex-col md:flex-row gap-8 items-center justify-between">

                <div className="w-full md:w-1/2 space-y-4">
                    <label className="text-xs font-bold text-textMuted uppercase block tracking-wider">Daily Market Volume (₹ Crores)</label>
                    <div className="flex items-center gap-6">
                        <input
                            type="range"
                            min="50000"
                            max="500000"
                            step="10000"
                            value={volume}
                            onChange={(e) => setVolume(Number(e.target.value))}
                            className="w-full h-1.5 bg-background border border-border rounded-full outline-none appearance-none cursor-pointer accent-primary"
                        />
                        <span className="font-mono text-white text-xl font-bold w-40 border-b border-primary/30 text-right pb-1 shadow-[0_4px_10px_-5px_rgba(59,130,246,0.3)]">₹ {volume.toLocaleString()}</span>
                    </div>
                </div>

                <div className="w-full md:w-1/2 space-y-4">
                    <label className="text-xs font-bold text-textMuted uppercase block tracking-wider">Intraday Capital Velocity (Cycles/Day)</label>
                    <div className="flex items-center gap-6">
                        <input
                            type="range"
                            min="1"
                            max="10"
                            step="1"
                            value={cycle}
                            onChange={(e) => setCycle(Number(e.target.value))}
                            className="w-full h-1.5 bg-background border border-border rounded-full outline-none appearance-none cursor-pointer accent-emerald-400"
                        />
                        <span className="font-mono text-white text-xl font-bold w-20 border-b border-emerald-400/30 text-center pb-1 shadow-[0_4px_10px_-5px_rgba(16,185,129,0.3)]">{cycle}x</span>
                    </div>
                </div>

            </div>

            {/* Output Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                {/* Traditional Locked */}
                <div className="bg-[#15151A] border-l-4 border-danger p-4 rounded-r-xl">
                    <h4 className="text-[10px] font-bold text-textMuted uppercase mb-2">T+1 System Locked Margin</h4>
                    <p className="text-2xl font-mono text-danger">₹{(t1LockedCapital / 1000).toFixed(1)}k Cr</p>
                    <p className="text-xs text-danger/70 mt-1 flex items-center gap-1">Trapped in Clearing Buffers</p>
                </div>

                {/* Real-Time Locked */}
                <div className="bg-[#15151A] border-l-4 border-success p-4 rounded-r-xl">
                    <h4 className="text-[10px] font-bold text-textMuted uppercase mb-2">Real-Time DVP Margin</h4>
                    <p className="text-2xl font-mono text-success">₹{(rtLockedCapital / 1000).toFixed(1)}k Cr</p>
                    <p className="text-xs text-success/70 mt-1 flex items-center gap-1">Fractional Prefunding Required</p>
                </div>

                {/* Capital Freed */}
                <div className="bg-[#15151A] border border-primary/50 bg-primary/10 p-4 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.1)] col-span-1 md:col-span-2 relative overflow-hidden flex flex-col justify-center">
                    <TrendingUp className="absolute right-4 top-4 text-primary opacity-20" size={64} />
                    <h4 className="text-[10px] font-bold text-primary uppercase mb-1">Direct Capital Freed</h4>
                    <p className="text-4xl font-mono text-white glow">₹{(capitalSaved / 1000).toFixed(1)}k Cr</p>
                    <p className="text-[10px] text-textMuted mt-1">Idle capital returned back to market participants.</p>
                </div>

                {/* Multiplier Effect large card */}
                <div className="bg-panel border border-emerald-500/50 p-6 rounded-xl col-span-1 md:col-span-4 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
                    <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-emerald-400 to-teal-600 rounded-l-xl"></div>

                    <div className="z-10 pl-6">
                        <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                            <HandCoins size={16} /> Effective Trading Liquidity Injected
                        </h4>
                        <p className="text-6xl font-mono text-white font-bold tracking-tight glow-success">
                            ₹{(effectiveLiquidityMultiplier / 100000).toFixed(2)} <span className="text-2xl text-emerald-400">Trillion</span>
                        </p>
                        <p className="text-xs text-emerald-400/80 mt-2 font-mono">
                            Based on {cycle} intraday trade cycle{cycle > 1 ? 's' : ''} enabled by instant atomic finality.
                        </p>
                    </div>

                    <div className="z-10 mt-6 md:mt-0 flex gap-4">
                        <div className="bg-background border border-border p-4 rounded-lg flex flex-col items-center">
                            <ShieldCheck className="text-blue-400 mb-2" size={24} />
                            <span className="text-2xl font-bold text-white">{(t1MarginRate * 100).toFixed(0)}% &rarr; {(rtMarginRate * 100).toFixed(0)}%</span>
                            <span className="text-[10px] text-textMuted uppercase">Margin Rate Plunge</span>
                        </div>
                        <div className="bg-background border border-border p-4 rounded-lg flex flex-col items-center">
                            <Activity className="text-orange-400 mb-2" size={24} />
                            <span className="text-2xl font-bold text-white">Zero</span>
                            <span className="text-[10px] text-textMuted uppercase">Duration Risk Limits</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MacroImpactDashboard;
