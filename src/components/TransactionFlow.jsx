import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CreditCard, Fingerprint, Landmark, Database, Zap, CheckCircle2,
    RotateCw, ShieldCheck, Activity, RefreshCcw, Wifi, Timer,
    Receipt, IndianRupee, TrendingUp, Lock, AlertTriangle
} from 'lucide-react';

// ── Trade Constants ───────────────────────────────────────────────────────────
const TRADE = {
    stock: 'RELIANCE INDUSTRIES LTD.',
    exchange: 'NSE',
    qty: 200,
    price: 2500,
    get gross() { return this.qty * this.price; },           // 5,00,000
    stt: 0.001,         // 0.1% Securities Transaction Tax (equity delivery buy)
    gst: 0.18,          // 18% GST on brokerage
    sebiTurnover: 0.00001, // SEBI Turnover fee
    stampDuty: 0.00015, // 0.015% Stamp Duty on buy side
    brokerage: 20,      // flat ₹20 per order
    get sttAmt()        { return Math.round(this.gross * this.stt); },
    get stamAmt()       { return Math.round(this.gross * this.stampDuty * 100) / 100; },
    get sebiAmt()       { return Math.round(this.gross * this.sebiTurnover * 100) / 100; },
    get gstAmt()        { return Math.round(this.brokerage * this.gst * 100) / 100; },
    get totalTax()      { return this.sttAmt + this.stamAmt + this.sebiAmt + this.gstAmt + this.brokerage; },
    get netPayable()    { return this.gross + this.totalTax; },
};

// ── Steps (durations in ms) ────────────────────────────────────────────────────
const STEPS = [
    {
        id: 1, phase: 'KYC & UCC',
        icon: CreditCard, color: 'indigo',
        title: 'UCC Verified — PAN · Bank · Demat',
        duration: 18000,   // 18s
        desc: 'SEBI Unique Client Code derived from PAN linkage. All three pillars verified via NSDL/CDSL & NPCI oracles.',
        detail: [
            { label: 'PAN Lookup',    value: 'NSDL Oracle → ITD / CBDT' },
            { label: 'Bank Mapping',  value: 'NPCI NACH → Account Holder' },
            { label: 'Demat Auth',    value: 'CDSL / NSDL Registrar' },
            { label: 'UCC Issued',    value: 'UCC: MBR-PAN-0X9A  ✓' },
        ],
    },
    {
        id: 2, phase: 'Order Placement',
        icon: Activity, color: 'blue',
        title: 'Buy Order Placed on Exchange',
        duration: 15000,
        desc: 'VTI token attached. Broker skips re-KYC. NSE matching engine finds counterpart instantly.',
        detail: [
            { label: 'Instrument',    value: 'RELIANCE IND. — NSE' },
            { label: 'Order Type',    value: 'Market Buy — 200 Shares' },
            { label: 'VTI Token',     value: '0xVTI_9A8B...7F2D (attached)' },
            { label: 'Matched At',    value: 'NSE Engine — 09:15:03.244' },
        ],
    },
    {
        id: 3, phase: 'Tax Computation',
        icon: Receipt, color: 'yellow',
        title: 'All Taxes & Levies Calculated',
        duration: 20000,
        desc: 'Smart-contract oracle fetches live tax rates. STT, GST, SEBI & Stamp Duty computed atomically — no manual reconciliation.',
        detail: [
            { label: 'STT (0.1%)',          value: `₹${TRADE.sttAmt.toLocaleString('en-IN')}` },
            { label: 'Stamp Duty (0.015%)', value: `₹${TRADE.stamAmt.toLocaleString('en-IN')}` },
            { label: 'SEBI Fee',            value: `₹${TRADE.sebiAmt.toLocaleString('en-IN')}` },
            { label: 'Brokerage + GST',     value: `₹${(TRADE.brokerage + TRADE.gstAmt).toLocaleString('en-IN')}` },
        ],
    },
    {
        id: 4, phase: 'RTGS Debit',
        icon: Landmark, color: 'orange',
        title: 'RTGS Gross Settlement — Funds Transferred',
        duration: 25000,
        desc: 'RBI RTGS settles net-payable amount (gross + all taxes) individually per transaction. No netting — each rupee moves in real-time.',
        detail: [
            { label: 'Rail',          value: 'RBI RTGS (Real-Time Gross)' },
            { label: 'Gross Value',   value: `₹${TRADE.gross.toLocaleString('en-IN')}` },
            { label: 'Total Tax',     value: `₹${TRADE.totalTax.toLocaleString('en-IN')}` },
            { label: 'Net Debited',   value: `₹${TRADE.netPayable.toLocaleString('en-IN')}` },
        ],
    },
    {
        id: 5, phase: 'Securities Lock',
        icon: Lock, color: 'purple',
        title: 'Seller Shares Locked in Smart Escrow',
        duration: 15000,
        desc: 'Seller demat queried. 200 RELIANCE shares locked atomically in smart-contract escrow. Both legs verified simultaneously.',
        detail: [
            { label: 'Demat Query',   value: 'CDSL Oracle → NSDL backup' },
            { label: 'Holdings',      value: '200 RELIANCE — Confirmed' },
            { label: 'Escrow',        value: 'Smart Contract — 0xSCRT...E1A9' },
            { label: 'Dual-Leg',      value: 'Funds ✓   Shares ✓' },
        ],
    },
    {
        id: 6, phase: 'Atomic DVP',
        icon: Zap, color: 'green',
        title: 'ShriNivesh Smart Contract Executes DVP',
        duration: 10000,
        desc: 'Simultaneous irrevocable transfer. ₹500,000 → Seller. 200 RELIANCE → Buyer. Single block. Zero counterparty risk.',
        detail: [
            { label: 'Block',         value: '#A4F9C2 — NSE Mainnet' },
            { label: 'Cash',          value: `₹${TRADE.gross.toLocaleString('en-IN')} → Seller Wallet` },
            { label: 'Shares',        value: '200 RELIANCE → Buyer Demat' },
            { label: 'Latency',       value: '< 240 ms — Real-Time' },
        ],
    },
    {
        id: 7, phase: 'SEBI Audit',
        icon: ShieldCheck, color: 'teal',
        title: 'Immutable Audit — SEBI · ITD · NSDL',
        duration: 5000,
        desc: 'SEBI node records settlement hash. ITD tax ledger updated (STT, stamp duty). NSDL/CDSL update beneficial ownership. Contract note T+0.',
        detail: [
            { label: 'SEBI Hash',     value: '0xSEBI_AB12...9F44 (immutable)' },
            { label: 'ITD Tax Ledger',value: 'STT + Stamp Duty → Govt.' },
            { label: 'Demat Updated', value: 'NSDL / CDSL — Ownership OK' },
            { label: 'Contract Note', value: 'Issued T+0 — 09:15:06.581' },
        ],
    },
];

const TOTAL_MS = STEPS.reduce((s, x) => s + x.duration, 0);   // ~108s  < 2 min

const colorMap = {
    indigo: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/40', text: 'text-indigo-400', glow: 'shadow-[0_0_18px_rgba(99,102,241,0.35)]' },
    blue:   { bg: 'bg-blue-500/10',   border: 'border-blue-500/40',   text: 'text-blue-400',   glow: 'shadow-[0_0_18px_rgba(59,130,246,0.35)]' },
    yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/40', text: 'text-yellow-400', glow: 'shadow-[0_0_18px_rgba(234,179,8,0.35)]' },
    orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/40', text: 'text-orange-400', glow: 'shadow-[0_0_18px_rgba(249,115,22,0.35)]' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/40', text: 'text-purple-400', glow: 'shadow-[0_0_18px_rgba(168,85,247,0.35)]' },
    green:  { bg: 'bg-success/10',    border: 'border-success/40',    text: 'text-success',    glow: 'shadow-[0_0_22px_rgba(16,185,129,0.45)]' },
    teal:   { bg: 'bg-teal-500/10',   border: 'border-teal-500/40',   text: 'text-teal-400',   glow: 'shadow-[0_0_18px_rgba(20,184,166,0.35)]' },
};

// Formats ms as MM:SS
const fmtTime = (ms) => {
    const s = Math.max(0, Math.floor(ms / 1000));
    return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
};

// ── Component ─────────────────────────────────────────────────────────────────
const TransactionFlow = () => {
    const [state, setState] = useState('idle');   // idle | running | done
    const [currentStep, setCurrentStep] = useState(0);
    const [elapsed, setElapsed] = useState(0);
    const startRef = useRef(null);
    const timerRef = useRef(null);
    const stepTimerRef = useRef(null);

    // Wall-clock elapsed ticker
    useEffect(() => {
        if (state !== 'running') return;
        timerRef.current = setInterval(() => {
            setElapsed(Date.now() - startRef.current);
        }, 100);
        return () => clearInterval(timerRef.current);
    }, [state]);

    // Step sequencer
    useEffect(() => {
        if (state !== 'running') return;
        if (currentStep >= STEPS.length) { setState('done'); return; }
        const dur = STEPS[currentStep].duration;
        stepTimerRef.current = setTimeout(() => {
            setCurrentStep(s => s + 1);
        }, dur);
        return () => clearTimeout(stepTimerRef.current);
    }, [state, currentStep]);

    const start = () => {
        startRef.current = Date.now();
        setElapsed(0);
        setCurrentStep(0);
        setState('running');
        setTimeout(() => setCurrentStep(1), 50);
    };

    const reset = () => {
        clearInterval(timerRef.current);
        clearTimeout(stepTimerRef.current);
        setCurrentStep(0); setElapsed(0); setState('idle');
    };

    const done = state === 'done';
    const progressPct = Math.min(100, (elapsed / TOTAL_MS) * 100);
    const remaining = Math.max(0, TOTAL_MS - elapsed);

    return (
        <div className="space-y-6">
            {/* ── Header ── */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-primary to-success flex items-center gap-2">
                        <Wifi className="text-primary" /> Live RTGS Transaction Walkthrough
                    </h2>
                    <p className="text-textMuted mt-1 text-sm">
                        Full-cycle settlement: UCC → Tax Computation → RTGS Debit → Atomic DVP → SEBI Audit — all in <span className="text-success font-bold">&lt; 5 minutes</span>.
                    </p>
                </div>
                <div className="flex gap-3">
                    {state === 'idle' && (
                        <button onClick={start}
                            className="px-6 py-2.5 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                            ▶ Run Full Settlement
                        </button>
                    )}
                    {state === 'running' && (
                        <button onClick={reset}
                            className="px-5 py-2.5 bg-danger/10 border border-danger/30 text-danger text-xs font-bold uppercase tracking-widest rounded-xl flex items-center gap-2 hover:bg-danger/20 transition-all">
                            <AlertTriangle size={13} /> Cancel
                        </button>
                    )}
                    {done && (
                        <button onClick={reset}
                            className="px-5 py-2.5 bg-panel border border-border text-white text-xs font-bold uppercase tracking-widest rounded-xl flex items-center gap-2 hover:bg-white/5 transition-all">
                            <RefreshCcw size={14} /> New Trade
                        </button>
                    )}
                </div>
            </div>

            {/* ── Trade Summary Card ── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                    { label: 'Stock',         value: 'RELIANCE', sub: 'NSE · Equity Delivery',   icon: TrendingUp,    c: 'text-blue-400' },
                    { label: 'Gross Value',   value: `₹${TRADE.gross.toLocaleString('en-IN')}`, sub: '200 × ₹2,500', icon: IndianRupee,  c: 'text-yellow-400' },
                    { label: 'Total Tax',     value: `₹${TRADE.totalTax.toLocaleString('en-IN')}`, sub: 'STT+Stamp+GST+SEBI', icon: Receipt, c: 'text-orange-400' },
                    { label: 'Net Payable',   value: `₹${TRADE.netPayable.toLocaleString('en-IN')}`, sub: 'via RTGS', icon: Landmark, c: 'text-success' },
                ].map((card, i) => {
                    const Icon = card.icon;
                    return (
                        <div key={i} className="bg-panel border border-border rounded-2xl p-4 flex items-start gap-3">
                            <div className={`w-9 h-9 rounded-xl bg-white/5 border border-border flex items-center justify-center flex-shrink-0`}>
                                <Icon size={18} className={card.c} />
                            </div>
                            <div>
                                <p className="text-[9px] text-textMuted uppercase tracking-widest">{card.label}</p>
                                <p className={`font-bold text-sm mt-0.5 ${card.c}`}>{card.value}</p>
                                <p className="text-[9px] text-textMuted/60 mt-0.5">{card.sub}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ── Timer + Progress ── */}
            <div className="bg-panel border border-border rounded-2xl p-4 flex items-center gap-5">
                <div className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center flex-shrink-0 border transition-all
                    ${state === 'running' ? 'bg-primary/10 border-primary/40 glow' : done ? 'bg-success/10 border-success/40' : 'bg-background border-border'}`}>
                    <Timer size={18} className={state === 'running' ? 'text-primary' : done ? 'text-success' : 'text-textMuted'} />
                    <span className={`font-mono font-bold text-[10px] mt-0.5 ${state === 'running' ? 'text-primary' : done ? 'text-success' : 'text-textMuted'}`}>
                        {state === 'idle' ? '00:00' : fmtTime(elapsed)}
                    </span>
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold text-textMuted uppercase tracking-widest">
                            {state === 'idle' ? 'Ready' : done ? 'Settlement Complete' : `Phase ${currentStep} / ${STEPS.length} — ${STEPS[Math.max(0, currentStep - 1)]?.phase ?? ''}`}
                        </span>
                        <span className="text-[10px] font-mono text-textMuted">
                            {state === 'running' ? `${fmtTime(remaining)} remaining` : done ? `Completed in ${fmtTime(elapsed)}` : `< ${fmtTime(TOTAL_MS)} total`}
                        </span>
                    </div>
                    <div className="w-full h-2 bg-background rounded-full overflow-hidden border border-border/40">
                        <motion.div
                            animate={{ width: `${done ? 100 : progressPct}%` }}
                            transition={{ ease: 'linear', duration: 0.1 }}
                            className={`h-full rounded-full ${done ? 'bg-success' : 'bg-primary'}`}
                        />
                    </div>
                </div>
            </div>

            {/* ── Tax Breakdown (visible once tax step active) ── */}
            <AnimatePresence>
                {currentStep >= 3 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl overflow-hidden">
                            <div className="px-5 py-3 border-b border-yellow-500/15 flex items-center gap-2">
                                <Receipt size={14} className="text-yellow-400" />
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-yellow-400">Tax & Duty Breakdown — Live</h4>
                            </div>
                            <table className="w-full text-xs">
                                <thead>
                                    <tr className="bg-background/40">
                                        <th className="text-left px-5 py-2 text-textMuted uppercase text-[9px] tracking-widest font-bold">Levy</th>
                                        <th className="text-left px-5 py-2 text-textMuted uppercase text-[9px] tracking-widest font-bold">Rate</th>
                                        <th className="text-right px-5 py-2 text-textMuted uppercase text-[9px] tracking-widest font-bold">Amount</th>
                                        <th className="text-left px-5 py-2 text-textMuted uppercase text-[9px] tracking-widest font-bold">Recipient</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { name: 'STT (Securities Transaction Tax)', rate: '0.1%', amt: TRADE.sttAmt, to: 'Government of India', c: 'text-orange-400' },
                                        { name: 'Stamp Duty', rate: '0.015%', amt: TRADE.stamAmt, to: 'State Government', c: 'text-yellow-400' },
                                        { name: 'SEBI Turnover Fee', rate: '0.001%', amt: TRADE.sebiAmt, to: 'SEBI', c: 'text-blue-400' },
                                        { name: 'Brokerage', rate: 'Flat', amt: TRADE.brokerage, to: 'Broker', c: 'text-purple-400' },
                                        { name: 'GST on Brokerage', rate: '18%', amt: TRADE.gstAmt, to: 'Government of India', c: 'text-orange-400' },
                                    ].map((r, i) => (
                                        <motion.tr
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.08 }}
                                            className="border-t border-border/20 hover:bg-white/[0.015] transition-colors"
                                        >
                                            <td className="px-5 py-2.5 text-white/80 font-medium">{r.name}</td>
                                            <td className="px-5 py-2.5 text-textMuted font-mono">{r.rate}</td>
                                            <td className={`px-5 py-2.5 font-bold font-mono text-right ${r.c}`}>₹{r.amt.toLocaleString('en-IN')}</td>
                                            <td className="px-5 py-2.5 text-textMuted/70 text-[10px]">{r.to}</td>
                                        </motion.tr>
                                    ))}
                                    <tr className="border-t-2 border-yellow-500/30 bg-yellow-500/5">
                                        <td colSpan={2} className="px-5 py-3 font-bold text-white uppercase tracking-wide">Total Tax Paid</td>
                                        <td className="px-5 py-3 font-bold text-yellow-400 font-mono text-right">₹{TRADE.totalTax.toLocaleString('en-IN')}</td>
                                        <td className="px-5 py-3 text-textMuted/60 text-[10px]">Auto-settled</td>
                                    </tr>
                                    <tr className="bg-success/5 border-t border-success/20">
                                        <td colSpan={2} className="px-5 py-3 font-bold text-white uppercase tracking-wide">Net RTGS Debit</td>
                                        <td className="px-5 py-3 font-bold text-success font-mono text-right">₹{TRADE.netPayable.toLocaleString('en-IN')}</td>
                                        <td className="px-5 py-3 text-textMuted/60 text-[10px]">Buyer → RBI RTGS</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Step Timeline ── */}
            <div className="space-y-3">
                {STEPS.map((step) => {
                    const c = colorMap[step.color];
                    const isActive   = currentStep === step.id;
                    const isComplete = currentStep > step.id || done;
                    const isPending  = currentStep < step.id && !done;
                    const Icon = step.icon;

                    return (
                        <motion.div
                            key={step.id}
                            animate={{ opacity: isPending ? 0.3 : 1 }}
                            transition={{ duration: 0.3 }}
                            className={`rounded-2xl border transition-all duration-500 overflow-hidden
                                ${isActive   ? `${c.bg} ${c.border} ${c.glow}` : ''}
                                ${isComplete ? 'bg-panel border-border/60' : ''}
                                ${isPending  ? 'bg-panel/30 border-border/20' : ''}
                            `}
                        >
                            {/* Header row */}
                            <div className="flex items-center gap-4 p-4">
                                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center flex-shrink-0 transition-all
                                    ${isComplete ? 'bg-success/15 border-success/40' : isActive ? `${c.bg} ${c.border}` : 'bg-panel/50 border-border/30'}`}>
                                    {isComplete
                                        ? <CheckCircle2 size={20} className="text-success" />
                                        : isActive
                                            ? <Icon size={20} className={`${c.text} animate-pulse`} />
                                            : <Icon size={20} className="text-textMuted/30" />
                                    }
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                                        <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded
                                            ${isActive ? `${c.bg} ${c.text}` : isComplete ? 'bg-background text-success' : 'bg-transparent text-textMuted/40'}`}>
                                            Phase {step.id} — {step.phase}
                                        </span>
                                        {step.phase === 'Tax Computation' && (
                                            <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/25">
                                                STT · Stamp · GST · SEBI
                                            </span>
                                        )}
                                        {step.phase === 'RTGS Debit' && (
                                            <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/25">
                                                via RBI RTGS
                                            </span>
                                        )}
                                    </div>
                                    <p className={`font-bold text-sm ${isActive ? 'text-white' : isComplete ? 'text-white/80' : 'text-textMuted/40'}`}>
                                        {step.title}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 flex-shrink-0 text-[10px] font-mono text-textMuted/60">
                                    <Timer size={11} /> {fmtTime(step.duration)}
                                    {isActive && <RotateCw size={14} className={`${c.text} animate-spin ml-1`} />}
                                    {isComplete && <CheckCircle2 size={14} className="text-success ml-1" />}
                                </div>
                            </div>

                            {/* Expanded detail */}
                            <AnimatePresence>
                                {(isActive || isComplete) && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-4 pb-4 pt-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <p className="text-xs text-textMuted leading-relaxed">{step.desc}</p>
                                            <div className="space-y-1.5">
                                                {step.detail.map((d, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, x: 8 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.07 }}
                                                        className="flex items-center justify-between gap-2 bg-background/60 border border-border/30 px-3 py-1.5 rounded-lg text-[10px] font-mono"
                                                    >
                                                        <span className="text-textMuted">{d.label}</span>
                                                        <span className={`font-bold text-right ${isComplete ? 'text-success' : c.text}`}>
                                                            ✓ {d.value}
                                                        </span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>

            {/* ── Final Settlement Banner ── */}
            <AnimatePresence>
                {done && (
                    <motion.div
                        initial={{ opacity: 0, y: 24, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-6 bg-success/10 border border-success/40 rounded-2xl shadow-[0_0_50px_rgba(16,185,129,0.25)]"
                    >
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="w-16 h-16 rounded-full bg-success/20 border-2 border-success flex items-center justify-center flex-shrink-0 shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                                <CheckCircle2 size={36} className="text-success" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-xl text-white mb-1">Real-Time Gross Settlement Complete ✓</h3>
                                <p className="text-sm text-textMuted max-w-2xl">
                                    All taxes paid <span className="text-yellow-400 font-bold">(₹{TRADE.totalTax.toLocaleString('en-IN')} auto-settled)</span>. Net amount
                                    of <span className="text-success font-bold">₹{TRADE.netPayable.toLocaleString('en-IN')}</span> debited via RTGS.
                                    200 RELIANCE transferred atomically. SEBI immutable hash recorded.
                                    <span className="text-success font-bold"> Zero counterparty risk. Zero clearing delay.</span>
                                </p>
                            </div>
                            <div className="flex flex-col items-end gap-2 flex-shrink-0">
                                <span className="text-[9px] text-textMuted uppercase tracking-widest">Total Time</span>
                                <span className="font-mono font-bold text-2xl text-success">{fmtTime(elapsed)}</span>
                                <span className="text-[9px] text-textMuted/60 font-mono">Tx: 0xSN_A4F9...7C2D</span>
                                <span className="text-[9px] px-2 py-0.5 bg-success/15 border border-success/30 rounded text-success font-bold uppercase tracking-widest">T+0 Settled</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TransactionFlow;
