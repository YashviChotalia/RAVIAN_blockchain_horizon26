# ShriNivesh — Advancing Real-Time Settlement for Modern Markets

![ShriNivesh](https://img.shields.io/badge/ShriNivesh-Real--Time%20Settlement-3b82f6?style=for-the-badge&logo=hyperledger)
![Status](https://img.shields.io/badge/Status-Live%20on%20Vercel-10b981?style=for-the-badge&logo=vercel)
![Tech Stack](https://img.shields.io/badge/Tech-React%20%7C%20Tailwind%20%7C%20Framer-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

> **ShriNivesh** is a high-fidelity, interactive fintech platform demonstrating how a blockchain-based Real-Time Gross Settlement (RTGS) layer — integrated with UPI, PAN, and UCC infrastructure — can enable instant **Delivery-versus-Payment (DVP)** for stock trades on Indian equity exchanges (NSE / BSE).

---

## 🌐 Live Demo

**[https://shrinivesh.vercel.app](https://shrinivesh.vercel.app)**

---

## 🚀 Key Modules

| Module | Description |
|--------|-------------|
| **T+1 Problem** | Visualises capital lockups, clearing delays, and counterparty risk in the current T+1 cycle |
| **Live Transaction** | End-to-end RTGS walkthrough: UCC → Tax Computation → RTGS Debit → Atomic DVP → SEBI Audit in < 5 min |
| **Identity Layer (VTI + UCC)** | Zero-knowledge UCC onboarding — links PAN · Bank Account · Demat Account atomically |
| **Gridlock Simulator** | Demonstrates how T+1 creates settlement deadlocks and how ShriNivesh eliminates them |
| **ShriNivesh Protocol** | Permissioned blockchain architecture: NSE/BSE → Broker → Smart Contract → NSDL/RBI |
| **Clearing Shift** | Evolution from legacy NSCCL to ShriNivesh smart-contract consensus |
| **Atomic Swap Engine** | Interactive DVP simulator — simultaneous irrevocable share + cash transfer |
| **Network Visualizer** | Live distributed ledger with NSE, BSE, RBI, SEBI, NSDL, NSCCL nodes |
| **Time & Cost** | T+1 vs T+0 vs ShriNivesh: Settlement Risk · Capital Locked · Intermediaries comparison |
| **Capital Unlock** | Numerical breakdown of capital freed by instant settlement |
| **Macro Impact** | GDP, capital velocity, and systemic risk reduction at national scale |
| **Liquidity Reuse** | Multi-cycle intraday reuse of settlement capital |
| **Smart Margin** | Dynamic margin rescaling from T+1 (highest) to real-time (near zero) |
| **Risk Scenarios** | Stress-test dashboard: Broker Default, Liquidity Crisis, Node Outage, Fraud |
| **Inst. Risk** | Institutional-grade risk monitoring across settlement participants |
| **SEBI Dashboard** | Real-time regulator view: TPS, block hashes, suspicious trade alerts |
| **Compliance** | Pre-programmed SEBI rules enforced at smart-contract execution level |

---

## 🔑 ShriNivesh RTGS Flow (Live Transaction Module)

```
[Investor] → UCC Verified (PAN + Bank + Demat)
    → Buy Order Placed on NSE with VTI Token
    → Tax Computed: STT + Stamp Duty + SEBI Fee + GST (auto-settled)
    → Net Amount Debited via RBI RTGS
    → Seller Shares Locked in Smart Contract Escrow
    → ShriNivesh DVP Smart Contract Fires (< 240ms)
    → SEBI Immutable Audit Hash Recorded
    → NSDL/CDSL Ownership Updated
    → Contract Note Issued T+0
```
**Total Wall Time: < 2 minutes (demo) · Real-world target: < 5 minutes**

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19 + Vite 7 |
| **Styling** | TailwindCSS 3 |
| **Animations** | Framer Motion 12 |
| **Charts** | Recharts 3 |
| **Icons** | Lucide React |
| **Deployment** | Vercel (auto-deploy on push) |
| **Blockchain Simulation** | Hyperledger Fabric v2.5 (conceptual) |
| **Payment Rail Simulation** | UPI (NPCI) + RTGS (RBI) |

> All consensus logic, identity verification, and transactions are client-side simulations for demonstration purposes.

---

## 💻 Run Locally

```bash
# Clone
git clone https://github.com/YashviChotalia/RAVIAN_blockchain_horizon26.git
cd RAVIAN_blockchain_horizon26

# Install
npm install

# Dev server
npm run dev
# → http://localhost:5173
```

---

## 🚢 Deploy to Vercel

```bash
# Option A: Auto-deploy via GitHub
# 1. Go to https://vercel.com/new
# 2. Import RAVIAN_blockchain_horizon26
# 3. Set project name: shrinivesh
# 4. Framework: Vite (auto-detected) — Root Directory: /
# 5. Click Deploy

# Option B: Vercel CLI
npx vercel --prod
```

The included `vercel.json` handles all SPA routing automatically.

---

## 💡 Vision

**ShriNivesh** envisions India's next-generation market infrastructure — where every rupee and every share moves simultaneously, taxes are settled atomically, and a SEBI-compliant immutable audit trail is created in real-time. Zero counterparty risk. Zero clearing delay. Full regulatory transparency.

> *"ShriNivesh — Advancing Real-Time Settlement for Modern Markets"*
