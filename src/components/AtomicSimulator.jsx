import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight, CheckCircle, Clock, Check, RefreshCcw, HandCoins, UserCheck, Key, ShieldCheck, Fingerprint } from 'lucide-react';

const AtomicSimulator = () => {
    const [tradeStatus, setTradeStatus] = useState('idle'); // idle, identifying, checking, swapping, complete

    const startTrade = () => {
        setTradeStatus('identifying');
        setTimeout(() => setTradeStatus('checking'), 1500);
        setTimeout(() => setTradeStatus('swapping'), 3000);
        setTimeout(() => setTradeStatus('complete'), 5000);
    };

    const resetTrade = () => setTradeStatus('idle');

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-emerald-400">
                        DVP Atomic Swap Engine
                    </h2>
                    <p className="text-textMuted mt-1">Simulating simultaneous transfer of securities and cash.</p>
                </div>

                {tradeStatus === 'complete' ? (
                    <button
                        onClick={resetTrade}
                        className="px-4 py-2 bg-panel border border-border rounded-lg text-sm flex gap-2 items-center hover:bg-panel/80 transition-all font-medium"
                    >
                        <RefreshCcw size={16} /> New Trade
                    </button>
                ) : (
                    <button
                        onClick={startTrade}
                        disabled={tradeStatus !== 'idle'}
                        className={`px-6 py-2 rounded-lg text-sm flex gap-2 items-center font-bold tracking-wide transition-all ${tradeStatus === 'idle'
                            ? 'bg-primary text-white hover:bg-primary/90 hover:scale-105 shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                            : 'bg-primary/50 text-white/50 cursor-not-allowed'
                            }`}
                    >
                        {tradeStatus === 'idle' ? 'Execute Trade' : 'Processing...'}
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Buyer */}
                <div className="p-6 bg-panel/50 border border-border rounded-2xl flex flex-col items-center">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all duration-500
              ${tradeStatus === 'idle' ? 'bg-panel border-2 border-primary/30 text-primary' :
                            (tradeStatus === 'identifying' || tradeStatus === 'checking') ? 'bg-primary/10 border-2 border-primary animate-pulse text-primary' :
                                'bg-success/10 border-2 border-success text-success glow-success'}
           `}>
                        <UserCheck size={36} />
                    </div>

                    <h3 className="font-bold text-lg mb-4">Buyer Wallet</h3>

                    <div className="w-full space-y-3 bg-background p-4 rounded-xl border border-border font-mono text-sm">
                        <div className="flex justify-between border-b border-border/50 pb-2">
                            <span className="text-textMuted text-xs flex gap-1 items-center"><Fingerprint size={12} /> VTI Token</span>
                            <span className={`font-bold transition-all ${tradeStatus === 'idle' ? 'text-textMuted' : 'text-indigo-400 glow'}`}>
                                {tradeStatus === 'idle' ? 'Unverified' : '0xBUYR...'}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-textMuted text-xs">Tokenized INR</span>
                            <span className={`font-bold transition-all ${tradeStatus === 'complete' ? 'text-danger' : 'text-success'}`}>
                                {tradeStatus === 'complete' ? '₹0.00' : '₹5,00,000'}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-textMuted text-xs">RELIANCE Tokens</span>
                            <span className={`font-bold transition-all ${tradeStatus === 'complete' ? 'text-success glow-success' : 'text-textMuted'}`}>
                                {tradeStatus === 'complete' ? '200 Shares' : '0 Shares'}
                            </span>
                        </div>
                    </div>

                    {tradeStatus === 'identifying' && (
                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-indigo-400 mt-4 flex items-center gap-1">
                            <Fingerprint size={12} className="animate-pulse" /> Validating Identity (VTI)...
                        </motion.span>
                    )}

                    {tradeStatus === 'checking' && (
                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-primary mt-4 flex items-center gap-1">
                            <Clock size={12} className="animate-spin-slow" /> Verifying Funds...
                        </motion.span>
                    )}
                </div>

                {/* Smart Contract Engine */}
                <div className="flex flex-col items-center justify-center p-4">

                    {tradeStatus === 'idle' && (
                        <div className="text-textMuted flex flex-col items-center opacity-50">
                            <Key size={48} className="mb-2" />
                            <span className="text-xs font-mono">Awaiting Contract</span>
                        </div>
                    )}

                    {tradeStatus === 'identifying' && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center text-indigo-400">
                            <Fingerprint size={48} className="mb-2 animate-pulse glow shadow-[0_0_15px_rgba(99,102,241,0.5)] rounded-full" />
                            <span className="text-xs font-mono font-bold text-center">KYC & Asset Identity <br />Verification</span>
                        </motion.div>
                    )}

                    {tradeStatus === 'checking' && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center text-primary">
                            <ShieldCheck size={48} className="mb-2 animate-pulse glow" />
                            <span className="text-xs font-mono font-bold text-center">Validating Ownership <br />& Funds</span>
                        </motion.div>
                    )}

                    {tradeStatus === 'swapping' && (
                        <motion.div initial={{ rotate: 0 }} animate={{ rotate: 180 }} transition={{ duration: 1, ease: 'easeInOut' }} className="flex items-center justify-center w-24 h-24 bg-primary/20 rounded-full border border-primary glow">
                            <ArrowLeftRight size={40} className="text-white" />
                        </motion.div>
                    )}

                    {tradeStatus === 'complete' && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} type="spring" className="flex flex-col items-center text-success">
                            <div className="w-24 h-24 bg-success/20 rounded-full border border-success flex items-center justify-center glow-success mb-2">
                                <Check size={48} className="text-white" />
                            </div>
                            <span className="text-xs font-mono font-bold text-center uppercase tracking-wider text-success p-1 bg-success/10 rounded">Atomic Swap Finalized</span>
                        </motion.div>
                    )}
                </div>

                {/* Seller */}
                <div className="p-6 bg-panel/50 border border-border rounded-2xl flex flex-col items-center">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all duration-500
              ${tradeStatus === 'idle' ? 'bg-panel border-2 border-yellow-500/30 text-yellow-500' :
                            (tradeStatus === 'identifying' || tradeStatus === 'checking') ? 'bg-yellow-500/10 border-2 border-yellow-500 animate-pulse text-yellow-500' :
                                'bg-success/10 border-2 border-success text-success glow-success'}
           `}>
                        <HandCoins size={36} />
                    </div>

                    <h3 className="font-bold text-lg mb-4">Seller Wallet</h3>

                    <div className="w-full space-y-3 bg-background p-4 rounded-xl border border-border font-mono text-sm">
                        <div className="flex justify-between border-b border-border/50 pb-2">
                            <span className="text-textMuted text-xs flex gap-1 items-center"><Fingerprint size={12} /> VTI Token</span>
                            <span className={`font-bold transition-all ${tradeStatus === 'idle' ? 'text-textMuted' : 'text-indigo-400 glow'}`}>
                                {tradeStatus === 'idle' ? 'Unverified' : '0xSELLR...'}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-textMuted text-xs">Tokenized INR</span>
                            <span className={`font-bold transition-all ${tradeStatus === 'complete' ? 'text-success glow-success' : 'text-textMuted'}`}>
                                {tradeStatus === 'complete' ? '₹5,00,000' : '₹0.00'}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-textMuted text-xs">RELIANCE Tokens</span>
                            <span className={`font-bold transition-all ${tradeStatus === 'complete' ? 'text-danger' : 'text-success'}`}>
                                {tradeStatus === 'complete' ? '0 Shares' : '200 Shares'}
                            </span>
                        </div>
                    </div>

                    {tradeStatus === 'identifying' && (
                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-indigo-400 mt-4 flex items-center gap-1">
                            <Fingerprint size={12} className="animate-pulse" /> Validating Identity (VTI)...
                        </motion.span>
                    )}

                    {tradeStatus === 'checking' && (
                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-yellow-500 mt-4 flex items-center gap-1">
                            <Clock size={12} className="animate-spin-slow" /> Verifying Assets...
                        </motion.span>
                    )}
                </div>
            </div>

            {/* Terminal Output Simulation */}
            <div className="mt-8 bg-[#0d0d12] border border-border rounded-xl p-4 font-mono text-xs overflow-hidden h-40">
                <div className="flex items-center gap-2 mb-2 text-textMuted border-b border-border pb-2">
                    <div className="w-3 h-3 rounded-full bg-danger"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-success"></div>
                    <span className="ml-2 uppercase tracking-wides text-[10px]">Contract Execution Logs</span>
                </div>
                <div className="space-y-1 h-full overflow-y-auto pr-2">
                    <p className="text-textMuted">[{new Date().toLocaleTimeString()}] System idle. Awaiting order input...</p>
                    {tradeStatus !== 'idle' && (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-primary">
                            [{new Date().toLocaleTimeString()}] [ORDER_RCV] Buy 200 RELIANCE @ ₹2500 for ₹5,00,000
                        </motion.p>
                    )}
                    {tradeStatus !== 'idle' && (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-primary">
                            [{new Date().toLocaleTimeString()}] [MATCH] Exchange matching engine found a counterpart. Routing to Settlement Layer...
                        </motion.p>
                    )}
                    {(tradeStatus !== 'idle' && tradeStatus !== 'identifying') && (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-indigo-400">
                            [{new Date().toLocaleTimeString()}] [IDENTITY_OK] Both parties possess valid Verified Trading Identity (VTI) Tokens. PAN/Bank/Demat mappings verified seamlessly via Oracle...
                        </motion.p>
                    )}
                    {(tradeStatus === 'swapping' || tradeStatus === 'complete') && (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-yellow-400">
                            [{new Date().toLocaleTimeString()}] [SHRINIVESH_LOCK] Buyer funds locked... Seller shares locked...
                        </motion.p>
                    )}
                    {(tradeStatus === 'swapping' || tradeStatus === 'complete') && (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-yellow-400">
                            [{new Date().toLocaleTimeString()}] [EXECUTE] Executing simultaneous transfer instruction...
                        </motion.p>
                    )}
                    {tradeStatus === 'complete' && (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-success font-bold mt-2">
                            [{new Date().toLocaleTimeString()}] [SUCCESS] Block Confirmed. TxHash: 0x9a8b...7c2f. Settlement completed in 240ms.
                        </motion.p>
                    )}
                </div>
            </div>

        </div>
    );
};

export default AtomicSimulator;
