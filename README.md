# Real-Time Blockchain Settlement Infrastructure for Indian Capital Markets

![Project DVP Shield](https://img.shields.io/badge/Project-DVP-3b82f6?style=for-the-badge&logo=hyperledger)
![Status](https://img.shields.io/badge/Status-Live_Demo-10b981?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Tech-React_%7C_Tailwind_%7C_Framer-blue?style=for-the-badge)

A highly polished, interactive React application demonstrating how a blockchain-based settlement layer can enable near-instant **Delivery-versus-Payment (DVP)** for stock trades on Indian equity exchanges such as the NSE and BSE. 

This platform moves beyond a simple blockchain swap simulation; it visualizes an entire future financial market settlement ecosystem capable of dramatically reducing capital lock-up, systemic risks, and friction in traditional T+1 cycles.

---

## 🚀 Key Modules and Features

The application is structured into professional fintech dashboards suitable for regulators, exchanges, and institutional investors:

### 1. Market Problem Simulator (T+1 Constraints)
Visualizes the current T+1 settlement infrastructure, clearly illustrating capital lockups across clearing corporations, operational complexities, and the counterparty risk windows existing today.

### 2. Verified Trading Identity Layer (VTI)
A unified Zero-Knowledge onboarding and verification system. It conceptually links a trader's **PAN (Identity)**, **Bank Account (Payment Rails)**, and **Demat Account (Securities Vault)** to automatically mint a cryptographic identity token, required for DVP participation without exposing PII on the ledger.

### 3. Blockchain Settlement Architecture
An interactive, animated map illustrating a permissioned consortium network (e.g., Hyperledger/Polygon CDK). It covers the journey from retail/institutional traders directly to broker APIs, the exchange matching engine, and down to the smart-contract settlement layer involving SEBI, RBI, and Depositories.

### 4. Atomic Swap DVP Trade Engine
An interactive simulator executing trades where tokenized securities and tokenized INR are simultaneously verified via the VTI layer and swapped within seconds. Highlights instant consensus processing and finality.

### 5. Liquidity Reuse Simulator
Calculates and simulates the macroeconomic impact of real-time trading. Shows how capital can be reused for multiple market transactions on the exact same day ("capital velocity"), rather than being immobilized by legacy clearing buffers.

### 6. Capital Efficiency Dashboard
Provides numerical breakdowns displaying how much capital is locked in traditional systems versus the exponential liquidity unlocked using instant blockchain infrastructure.

### 7. Smart Margin Rescaling System
Visualizes dynamic margin adjusting. Contrasts margin requirements across T+1 (Highest Margin), T+0 (Medium Margin), and Atomic Real-Time (Virtually zero margins due to mitigated risk).

### 8. System Resilience & Failure Scenarios
A stress-test mitigation dashboard illustrating how blockchain consensus mitigates worst-case scenarios, such as Broker Default/Insolvency, Liquidity Shortages, Central Node Outages, and Fraudulent Trade Execution.

### 9. SEBI Regulatory Oversight Terminal
A dedicated regulator dashboard providing real-time ledger monitoring. Capabilities include tracking active consensus nodes, monitoring network TPS (Transactions Per Second), observing live block hashes, and tracking automatically flagged suspicious trades.

### 10. Compliance Layer
Simulates pre-programmed SEBI regulatory rules on smart contracts (like short-selling bans or foreign investment caps), blocking non-compliant trades at the ledger-level *before* execution.

---

## 🛠️ Technology Stack
- **Framework:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** [TailwindCSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Data Visualization:** [Recharts](https://recharts.org/)
- **Icons:** [Lucide React](https://lucide.dev/)

*Note: All backend consensus logic, identities, and transactions in this repository are simulated purely on the client-side for immediate demonstration purposes.*

---

## 💻 How to Run Locally

You can run this demonstration locally entirely offline using Node.js:

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd blockchain-settlement-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the Application:**
   Open your browser and navigate to `http://localhost:5173`.

---

## 💡 Vision
This project aims to serve as a high-fidelity prototype envisioning **"India’s Future Market Infrastructure"**—propelling capital markets toward a safer, near-instant settlement reality.
