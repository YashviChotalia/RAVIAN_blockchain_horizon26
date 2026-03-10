import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Landmark, Database, ShieldCheck, CreditCard, Lock, CheckCircle2, RotateCw, ExternalLink, Network } from 'lucide-react';

const VerifiedIdentityLayer = () => {
    const [formData, setFormData] = useState({ pan: '', bank: '', demat: '' });
    const [status, setStatus] = useState('idle'); // idle, verifying, success
    const [activeStep, setActiveStep] = useState(0); // 0: init, 1: pan, 2: bank, 3: demat, 4: minting, 5: done
    const [hashes, setHashes] = useState({ pan: '', bank: '', demat: '', vti: '' });

    const handleVerify = () => {
        setStatus('verifying');
        setActiveStep(1);
        setTimeout(() => setActiveStep(2), 1000);
        setTimeout(() => setActiveStep(3), 2000);
        setTimeout(() => setActiveStep(4), 3000);
        setTimeout(() => {
            setHashes({
                pan: `0xPANx${Math.random().toString(16).slice(2, 10).toUpperCase()}...`,
                bank: `0xBNKx${Math.random().toString(16).slice(2, 10).toUpperCase()}...`,
                demat: `0xDMTx${Math.random().toString(16).slice(2, 10).toUpperCase()}...`,
                vti: `0xVTI_x${Math.random().toString(16).slice(2, 10).toUpperCase()}...`
            });
            setActiveStep(5);
            setStatus('success');
        }, 4500);
    };



    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-primary flex items-center gap-2">
                    <Fingerprint /> Verified Trading Identity (VTI) Layer
                </h2>
                <p className="text-textMuted mt-1">Unifying KYC, Asset Ownership, and Payment Rails for Instant Atomic Validation.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Onboarding Form */}
                <div className="bg-panel border border-border rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                        <ShieldCheck size={120} />
                    </div>

                    <h3 className="font-bold text-lg mb-4 text-white">Trader Onboarding</h3>
                    <p className="text-xs text-textMuted mb-6">Link government identity with financial rails to mint a zero-knowledge trading profile.</p>

                    <div className="space-y-6">
                        <div>
                            <label className="text-[10px] font-bold text-textMuted uppercase mb-1.5 block tracking-widest pl-1">PAN Number (Identity)</label>
                            <div className="relative group">
                                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted w-4 h-4 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    value={formData.pan}
                                    onChange={e => setFormData({ ...formData, pan: e.target.value.toUpperCase() })}
                                    placeholder="ABCDE1234F"
                                    maxLength={10}
                                    disabled={status !== 'idle'}
                                    className="w-full bg-background/50 border border-border rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:border-primary/50 focus:ring-4 focus:ring-primary/5 focus:outline-none disabled:opacity-50 transition-all font-mono tracking-wider"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-textMuted uppercase mb-1.5 block tracking-widest pl-1">Bank Account (Funds)</label>
                            <div className="relative group">
                                <Landmark className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted w-4 h-4 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    value={formData.bank}
                                    onChange={e => setFormData({ ...formData, bank: e.target.value })}
                                    placeholder="000123456789 (HDFC/SBI)"
                                    disabled={status !== 'idle'}
                                    className="w-full bg-background/50 border border-border rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:border-primary/50 focus:ring-4 focus:ring-primary/5 focus:outline-none disabled:opacity-50 transition-all font-mono tracking-wider"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-textMuted uppercase mb-1.5 block tracking-widest pl-1">Demat Account (Securities)</label>
                            <div className="relative group">
                                <Database className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted w-4 h-4 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    value={formData.demat}
                                    onChange={e => setFormData({ ...formData, demat: e.target.value })}
                                    placeholder="IN3001234567890"
                                    disabled={status !== 'idle'}
                                    className="w-full bg-background/50 border border-border rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:border-primary/50 focus:ring-4 focus:ring-primary/5 focus:outline-none disabled:opacity-50 transition-all font-mono tracking-wider"
                                />
                            </div>
                        </div>

                        {status === 'idle' && (
                            <button
                                onClick={handleVerify}
                                disabled={!formData.pan || !formData.bank || !formData.demat}
                                className="w-full mt-4 bg-primary text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest glow hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-30 disabled:hover:scale-100 disabled:glow-none"
                            >
                                Verify & Mint Identity Token
                            </button>
                        )}

                        {status === 'verifying' && (
                            <div className="w-full mt-4 bg-primary/10 border border-primary/30 text-primary py-3 rounded-xl text-xs font-bold uppercase tracking-widest flex justify-center items-center gap-3">
                                <RotateCw className="animate-spin w-4 h-4" /> Validating via Interoperable APIs...
                            </div>
                        )}

                        {status === 'success' && (
                            <div className="w-full mt-4 bg-success/20 border border-success text-success py-3 rounded-xl text-xs font-bold uppercase tracking-widest flex justify-center items-center gap-2 glow-success">
                                <CheckCircle2 className="w-4 h-4" /> Identity Verified & Linked
                            </div>
                        )}
                    </div>
                </div>

                {/* Token Architecture Visualizer */}
                <div className="bg-panel border border-border rounded-xl p-6 flex flex-col justify-between">
                    <div>
                        <h3 className="font-bold text-lg mb-2 text-white flex items-center gap-2">
                            <Lock className="text-indigo-400" /> Identity Token Architecture
                        </h3>
                        <p className="text-xs text-textMuted mb-4">Zero-Knowledge Proofs (ZKP) ensure sensitive data remains off-chain. Only cryptographic proofs are stored for smart contract validation.</p>
                    </div>

                    <div className="flex-1 bg-[#0a0a0f] border border-border rounded-xl p-4 flex flex-col gap-3 relative overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                        {/* Verification Steps Overlay */}
                        <AnimatePresence>
                            {status === 'verifying' && activeStep < 5 && (
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-[#0a0a0f]/80 backdrop-blur-sm z-10 flex flex-col justify-center items-center text-primary font-mono text-sm gap-2"
                                >
                                    <RotateCw className="animate-spin mb-2" size={32} />
                                    {activeStep === 1 && <span>[1/3] Querying NSDL/CDSL for PAN...</span>}
                                    {activeStep === 2 && <span>[2/3] Ping NPCI/Bank API for Account Info...</span>}
                                    {activeStep === 3 && <span>[3/3] Validating Demat Ownership Auth...</span>}
                                    {activeStep === 4 && <span className="text-indigo-400">Minting Cryptographic Wrapper...</span>}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Token Data Visuals */}
                        <div className={`p-3 rounded border transition-all ${status === 'success' ? 'bg-success/10 border-success/30' : 'bg-background border-border opacity-50'}`}>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[10px] font-bold text-textMuted uppercase flex items-center gap-1"><CreditCard size={10} /> KYC Hash Proof</span>
                                {status === 'success' && <CheckCircle2 size={12} className="text-success" />}
                            </div>
                            <div className="font-mono text-xs text-indigo-300">
                                {status === 'success' ? hashes.pan : 'Waiting for verification...'}
                            </div>
                        </div>

                        <div className={`p-3 rounded border transition-all ${status === 'success' ? 'bg-success/10 border-success/30' : 'bg-background border-border opacity-50'}`}>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[10px] font-bold text-textMuted uppercase flex items-center gap-1"><Landmark size={10} /> Funds Access Auth</span>
                                {status === 'success' && <CheckCircle2 size={12} className="text-success" />}
                            </div>
                            <div className="font-mono text-xs text-indigo-300">
                                {status === 'success' ? hashes.bank : 'Waiting for verification...'}
                            </div>
                        </div>

                        <div className={`p-3 rounded border transition-all ${status === 'success' ? 'bg-success/10 border-success/30' : 'bg-background border-border opacity-50'}`}>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[10px] font-bold text-textMuted uppercase flex items-center gap-1"><Database size={10} /> Securities Vault Auth</span>
                                {status === 'success' && <CheckCircle2 size={12} className="text-success" />}
                            </div>
                            <div className="font-mono text-xs text-indigo-300">
                                {status === 'success' ? hashes.demat : 'Waiting for verification...'}
                            </div>
                        </div>

                        {/* Smart Contract Binding */}
                        <div className={`mt-2 p-2 rounded-lg text-center transition-all ${status === 'success' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/50 glow' : 'opacity-0'}`}>
                            <span className="text-[10px] font-mono font-bold tracking-widest uppercase block mb-1">Unified VTI Token</span>
                            <span className="font-mono text-xs">{hashes.vti}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {/* Clearing Corp Integration */}
                <div className="bg-panel border border-border p-6 rounded-xl relative">
                    <h3 className="font-bold text-lg mb-4 text-white flex items-center gap-2">
                        <Network className="text-blue-400" /> Clearing Corp Paradigm Shift
                    </h3>
                    <p className="text-sm text-textMuted mb-6">How pre-verified identity tokens bypass traditional multi-hop settlement friction.</p>

                    <div className="relative">
                        {/* Traditional */}
                        <div className="flex items-center gap-2 mb-6">
                            <span className="w-16 text-xs text-danger font-bold text-right">T+1</span>
                            <div className="flex-1 bg-background rounded-full h-8 flex overflow-hidden border border-border">
                                <div className="w-1/3 bg-danger/20 border-r border-danger/50 flex items-center justify-center text-[10px] text-danger hover:bg-danger/40 transition-colors" title="Broker Verification">Broker</div>
                                <div className="w-1/3 bg-orange-500/20 border-r border-orange-500/50 flex items-center justify-center text-[10px] text-orange-500 hover:bg-orange-500/40 transition-colors" title="Clearing Corp Verification">NSCCL</div>
                                <div className="w-1/3 bg-yellow-500/20 flex items-center justify-center text-[10px] text-yellow-500 hover:bg-yellow-500/40 transition-colors" title="Depository Verification">NSDL</div>
                            </div>
                        </div>

                        {/* VTI Layer */}
                        <div className="flex items-center gap-2">
                            <span className="w-16 text-xs text-success font-bold text-right glow-success">Real-Time</span>
                            <div className="flex-1 bg-background rounded-full h-8 flex overflow-hidden border border-border relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-success/20 to-primary/20 blur-md" />
                                <div className="w-full relative z-10 flex items-center justify-center gap-2 text-xs font-bold text-white shadow-[inset_0_0_10px_rgba(16,185,129,0.3)]">
                                    <Fingerprint size={12} className="text-success" /> Auto-Verified by Smart Contract VTI
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security & Privacy */}
                <div className="bg-background border border-border p-6 rounded-xl flex flex-col justify-center">
                    <h3 className="font-bold text-lg mb-4 text-white flex items-center gap-2">
                        <ShieldCheck className="text-success" /> Data Privacy & ZK Proofs
                    </h3>
                    <ul className="space-y-4 text-sm text-textMuted">
                        <li className="flex gap-3 items-start">
                            <div className="mt-1 p-1 bg-success/10 rounded"><CheckCircle2 size={14} className="text-success" /></div>
                            <div><strong className="text-white block">No PII on Ledger</strong>PAN and Bank Account strings are never stored on the blockchain, only their cryptographic hashes.</div>
                        </li>
                        <li className="flex gap-3 items-start">
                            <div className="mt-1 p-1 bg-success/10 rounded"><CheckCircle2 size={14} className="text-success" /></div>
                            <div><strong className="text-white block">Regulator Audit Keys</strong>SEBI nodes possess specific decryption keys to map a VTI token back to a PAN during investigations.</div>
                        </li>
                        <li className="flex gap-3 items-start">
                            <div className="mt-1 p-1 bg-success/10 rounded"><CheckCircle2 size={14} className="text-success" /></div>
                            <div><strong className="text-white block">Permissioned Oracle Validators</strong>Identity verification is performed by restricted Oracle nodes run by NSDL/Banks.</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default VerifiedIdentityLayer;
