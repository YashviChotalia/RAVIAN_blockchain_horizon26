import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CreditCard, Fingerprint, Landmark, Database, Zap, CheckCircle2,
    ArrowRight, RotateCw, ShieldCheck, Coins, Activity, Lock,
    RefreshCcw, AlertTriangle, Wifi
} from 'lucide-react';

// ── Step data ────────────────────────────────────────────────────────────────
const STEPS = [
    {
        id: 1, phase: 'KYC & UCC',
        title: 'UCC Verification via PAN',
        desc: 'SEBI-mandated Unique Client Code is derived from PAN + Bank + Demat linkage. The system queries CDSL/NSDL and NPCI to confirm all three are mapped.',
        rail: null,
        color: 'indigo',
        icon: CreditCard,
        detail: [
            { label: 'PAN Lookup',         value: 'NSDL Oracle → ITD / CBDT',        status: 'ok' },
            { label: 'Bank Mapping',       value: 'NPCI NACH → Account Holder',       status: 'ok' },
            { label: 'Demat Auth',         value: 'CDSL / NSDL Registrar',            status: 'ok' },
            { label: 'UCC Generated',      value: 'UCC: MBR-PAN-0X9A',               status: 'ok' },
        ],
    },
    {
        id: 2, phase: 'Order Placement',
        title: 'Investor Places Buy Order',
        desc: 'Buyer submits order via broker platform. VTI token is attached — broker does NOT re-run KYC. Exchange receives the order with a pre-verified identity proof.',
        rail: null,
        color: 'blue',
        icon: Activity,
        detail: [
            { label: 'Instrument',         value: 'RELIANCE IND. — NSE',               status: 'ok' },
            { label: 'Order Type',         value: 'Market Buy — 200 Shares',           status: 'ok' },
            { label: 'VTI Token',          value: '0xVTI_9A8B...7F2D (attached)',      status: 'ok' },
            { label: 'Exchange Received',  value: 'NSE Matching Engine — 09:15:03',    status: 'ok' },
        ],
    },
    {
        id: 3, phase: 'Payment Rail',
        title: 'Funds Transfer — UPI / RTGS via PAN',
        desc: 'Fund debit is triggered atomically via NPCI (UPI for retail) or RBI RTGS (for institutional). PAN acts as the universal identifier bridging Bank Account ↔ Demat ↔ Settlement Wallet.',
        rail: 'UPI / RTGS',
        color: 'yellow',
        icon: Landmark,
        detail: [
            { label: 'Rail Selected',      value: 'UPI (Retail) / RTGS (Inst.)',       status: 'ok' },
            { label: 'PAN as Bridge',      value: 'PAN → Bank A/c → Settlement A/c',  status: 'ok' },
            { label: 'Amount Debited',     value: '₹5,00,000 (200 × ₹2,500)',          status: 'ok' },
            { label: 'Tokenised INR Lock', value: 'CBDC Pool → Smart Contract Escrow', status: 'ok' },
        ],
    },
    {
        id: 4, phase: 'Securities Check',
        title: 'Seller Securities Verified',
        desc: "Seller's Demat (NSDL/CDSL) is queried in real-time. Shares are locked in smart-contract escrow. No overnight position is taken — both legs are verified simultaneously.",
        rail: null,
        color: 'purple',
        icon: Database,
        detail: [
            { label: 'Demat Query',        value: 'CDSL Oracle → NSDL backup',         status: 'ok' },
            { label: 'Holdings Check',     value: '200 RELIANCE — Confirmed',           status: 'ok' },
            { label: 'Shares Locked',      value: 'Smart Contract Escrow',             status: 'ok' },
            { label: 'Dual-Leg Ready',     value: 'Funds ✓  &  Shares ✓',             status: 'ok' },
        ],
    },
    {
        id: 5, phase: 'Atomic Execution',
        title: 'ShriNivesh Smart Contract Fires',
        desc: 'DVP condition met: funds AND securities locked. Smart contract atomically transfers ₹5,00,000 → Seller, 200 RELIANCE → Buyer. Both legs settle in the same block — no counterparty risk.',
        rail: 'BlockChain',
        color: 'green',
        icon: Zap,
        detail: [
            { label: 'DVP Triggered',      value: 'Block #A4F9C2 — confirmed',          status: 'ok' },
            { label: 'Cash Transferred',   value: '₹5,00,000 → Seller Wallet',          status: 'ok' },
            { label: 'Shares Transferred', value: '200 RELIANCE → Buyer Demat',         status: 'ok' },
            { label: 'Latency',            value: '< 240ms (real-time)',                status: 'ok' },
        ],
    },
    {
        id: 6, phase: 'Settlement & Audit',
        title: 'SEBI Audit & Ledger Update',
        desc: 'SEBI Audit Node records the settlement hash. NSDL/CDSL update beneficial ownership. Broker receives confirmation. PAN-linked ledger entry is immutable — fully SEBI-compliant.',
        rail: null,
        color: 'teal',
        icon: ShieldCheck,
        detail: [
            { label: 'SEBI Hash',          value: '0xSEBI_AB12...9F44 (immutable)',     status: 'ok' },
            { label: 'Demat Updated',      value: 'NSDL / CDSL — Ownership Transferred', status: 'ok' },
            { label: 'PAN Ledger',         value: 'ITD linked — tax-audit ready',        status: 'ok' },
            { label: 'Broker Confirmed',   value: 'Contract Note Issued T+0',            status: 'ok' },
        ],
    },
];

const colorMap = {
    indigo: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/40', text: 'text-indigo-400', glow: 'shadow-[0_0_20px_rgba(99,102,241,0.35)]', dot: 'bg-indigo-400' },
    blue:   { bg: 'bg-blue-500/10',   border: 'border-blue-500/40',   text: 'text-blue-400',   glow: 'shadow-[0_0_20px_rgba(59,130,246,0.35)]',  dot: 'bg-blue-400' },
    yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/40', text: 'text-yellow-400', glow: 'shadow-[0_0_20px_rgba(234,179,8,0.35)]',    dot: 'bg-yellow-400' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/40', text: 'text-purple-400', glow: 'shadow-[0_0_20px_rgba(168,85,247,0.35)]',   dot: 'bg-purple-400' },
    green:  { bg: 'bg-success/10',    border: 'border-success/40',    text: 'text-success',    glow: 'shadow-[0_0_25px_rgba(16,185,129,0.45)]',   dot: 'bg-success' },
    teal:   { bg: 'bg-teal-500/10',   border: 'border-teal-500/40',   text: 'text-teal-400',   glow: 'shadow-[0_0_20px_rgba(20,184,166,0.35)]',   dot: 'bg-teal-400' },
};

// ── Component ─────────────────────────────────────────────────────────────────
const TransactionFlow = () => {
    const [running, setRunning] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);   // 0 = idle
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (!running) return;
        if (currentStep >= STEPS.length) { setDone(true); setRunning(false); return; }
        const t = setTimeout(() => setCurrentStep(s => s + 1), 1600);
        return () => clearTimeout(t);
    }, [running, currentStep]);

    const reset = () => { setCurrentStep(0); setDone(false); setRunning(false); };
    const start = () => { reset(); setTimeout(() => { setRunning(true); setCurrentStep(1); }, 50); };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-primary to-success flex items-center gap-2">
                        <Wifi className="text-primary" /> Live Transaction Walkthrough
                    </h2>
                    <p className="text-textMuted mt-1 text-sm">
                        End-to-end settlement from UCC verification → UPI/RTGS debit → Atomic DVP → SEBI audit.
                    </p>
                </div>

                <div className="flex gap-3">
                    {!running && !done && (
                        <button onClick={start}
                            className="px-6 py-2.5 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                            ▶ Run Transaction
                        </button>
                    )}
                    {running && (
                        <div className="px-5 py-2.5 bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest rounded-xl flex items-center gap-2">
                            <RotateCw size={14} className="animate-spin" /> Processing…
                        </div>
                    )}
                    {done && (
                        <button onClick={reset}
                            className="px-5 py-2.5 bg-panel border border-border text-white text-xs font-bold uppercase tracking-widest rounded-xl flex items-center gap-2 hover:bg-white/5 transition-all">
                            <RefreshCcw size={14} /> Reset
                        </button>
                    )}
                </div>
            </div>

            {/* UPI / RTGS rail banner */}
            <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl flex flex-wrap gap-6 items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/30 flex items-center justify-center">
                        <Landmark size={20} className="text-yellow-400" />
                    </div>
                    <div>
                        <p className="text-[10px] text-textMuted uppercase tracking-widest">Payment Integration</p>
                        <p className="font-bold text-white text-sm">UPI (Retail) + RTGS (Institutional)</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
                        <CreditCard size={20} className="text-indigo-400" />
                    </div>
                    <div>
                        <p className="text-[10px] text-textMuted uppercase tracking-widest">Identity Bridge</p>
                        <p className="font-bold text-white text-sm">PAN → Bank A/c → Demat → UCC</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-success/15 border border-success/30 flex items-center justify-center">
                        <Zap size={20} className="text-success" />
                    </div>
                    <div>
                        <p className="text-[10px] text-textMuted uppercase tracking-widest">Settlement</p>
                        <p className="font-bold text-white text-sm">Atomic DVP — &lt; 240ms</p>
                    </div>
                </div>
            </div>

            {/* Steps timeline */}
            <div className="space-y-4">
                {STEPS.map((step, idx) => {
                    const c = colorMap[step.color];
                    const isActive  = currentStep === step.id;
                    const isComplete = currentStep > step.id || done;
                    const Icon = step.icon;

                    return (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0.25, y: 6 }}
                            animate={{ opacity: (isActive || isComplete || currentStep === 0) ? 1 : 0.3, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`rounded-2xl border transition-all duration-500 overflow-hidden
                                ${isActive  ? `${c.bg} ${c.border} ${c.glow}` : ''}
                                ${isComplete ? 'bg-panel border-border' : ''}
                                ${(!isActive && !isComplete) ? 'bg-panel/40 border-border/30' : ''}
                            `}
                        >
                            {/* Step header */}
                            <div className="flex items-center gap-4 p-4 cursor-default">
                                {/* Step number / icon */}
                                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 transition-all
                                    ${isComplete ? 'bg-success/15 border-success/40' : isActive ? `${c.bg} ${c.border}` : 'bg-panel border-border'}`}>
                                    {isComplete
                                        ? <CheckCircle2 size={22} className="text-success" />
                                        : isActive
                                            ? <Icon size={22} className={`${c.text} animate-pulse`} />
                                            : <Icon size={22} className="text-textMuted/40" />
                                    }
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                                        <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${isActive ? `${c.bg} ${c.text}` : 'bg-background text-textMuted'}`}>
                                            Phase {step.id} — {step.phase}
                                        </span>
                                        {step.rail && (
                                            <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/30">
                                                via {step.rail}
                                            </span>
                                        )}
                                    </div>
                                    <p className={`font-bold text-sm ${isActive ? 'text-white' : isComplete ? 'text-white/80' : 'text-textMuted/50'}`}>{step.title}</p>
                                </div>

                                {isActive && <RotateCw size={16} className={`${c.text} animate-spin flex-shrink-0`} />}
                                {isComplete && <CheckCircle2 size={16} className="text-success flex-shrink-0" />}
                            </div>

                            {/* Expanded detail when active or complete */}
                            <AnimatePresence>
                                {(isActive || isComplete) && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.35 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-4 pb-5 pt-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Description */}
                                            <p className="text-xs text-textMuted leading-relaxed md:col-span-1">{step.desc}</p>

                                            {/* Detail table */}
                                            <div className="space-y-1.5">
                                                {step.detail.map((d, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, x: 10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.08 }}
                                                        className="flex items-center justify-between gap-2 bg-background/60 border border-border/40 px-3 py-1.5 rounded-lg text-[10px] font-mono"
                                                    >
                                                        <span className="text-textMuted">{d.label}</span>
                                                        <span className={`font-bold text-right ${d.status === 'ok' ? (isComplete ? 'text-success' : c.text) : 'text-danger'}`}>
                                                            {d.status === 'ok' ? '✓ ' : '✗ '}{d.value}
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

            {/* Success banner */}
            <AnimatePresence>
                {done && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-6 bg-success/10 border border-success/40 rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.25)] flex flex-col md:flex-row items-center gap-6"
                    >
                        <div className="w-16 h-16 rounded-full bg-success/20 border border-success flex items-center justify-center flex-shrink-0 shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                            <CheckCircle2 size={36} className="text-success" />
                        </div>
                        <div>
                            <h3 className="font-bold text-xl text-white mb-1">Settlement Complete — T+0 ✓</h3>
                            <p className="text-sm text-textMuted max-w-xl">
                                Transaction settled in <span className="text-success font-bold">&lt; 240ms</span>. PAN-linked UPI/RTGS debit confirmed, 200 RELIANCE shares transferred atomically, SEBI audit hash recorded immutably. <span className="text-success font-bold">Zero counterparty risk. Zero clearing delay.</span>
                            </p>
                        </div>
                        <div className="ml-auto flex flex-col items-end gap-2">
                            <span className="text-[10px] text-textMuted uppercase tracking-widest">Tx Hash</span>
                            <span className="font-mono text-xs text-primary bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20">0xSN_A4F9...7C2D</span>
                            <span className="font-mono text-[10px] text-textMuted">Block #A4F9C2 · NSE Mainnet</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TransactionFlow;
