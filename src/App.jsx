import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Shield, Coins, Share2, Layers, Clock, Settings, ArrowRight, X, AlertTriangle, Repeat, PieChart, Eye, Fingerprint, Link, RefreshCcw, Globe, BarChart3 } from 'lucide-react';

// Simulated sections
import ProblemVisualization from './components/ProblemVisualization';
import BlockchainArchitecture from './components/BlockchainArchitecture';
import AtomicSimulator from './components/AtomicSimulator';
import NetworkVisualizer from './components/NetworkVisualizer';
import SettlementComparison from './components/SettlementComparison';
import CapitalEfficiency from './components/CapitalEfficiency';
import ComplianceLayer from './components/ComplianceLayer';
import LiquidityReuseSimulator from './components/LiquidityReuseSimulator';
import SmartMarginSystem from './components/SmartMarginSystem';
import RiskFailureScenarios from './components/RiskFailureScenarios';
import RegulatorDashboard from './components/RegulatorDashboard';
import VerifiedIdentityLayer from './components/VerifiedIdentityLayer';
import SettlementGridlock from './components/SettlementGridlock';
import InstitutionalRiskDashboard from './components/InstitutionalRiskDashboard';
import ClearingEvolution from './components/ClearingEvolution';
import MacroImpactDashboard from './components/MacroImpactDashboard';

function App() {
  const [activeTab, setActiveTab] = useState('problem');

  const tabs = [
    { id: 'problem', label: 'T+1 Problem', icon: Clock },
    { id: 'identity', label: 'Identity Layer', icon: Fingerprint },
    { id: 'gridlock', label: 'Gridlock Sim', icon: Link },
    { id: 'architecture', label: 'ShriNivesh Protocol', icon: Layers },
    { id: 'clearing', label: 'Clearing Shift', icon: RefreshCcw },
    { id: 'simulator', label: 'Atomic Swap', icon: Activity },
    { id: 'network', label: 'Network', icon: Share2 },
    { id: 'comparison', label: 'Time & Cost', icon: Coins },
    { id: 'efficiency', label: 'Capital Unlock', icon: Activity },
    { id: 'macro', label: 'Macro Impact', icon: Globe },
    { id: 'liquidity', label: 'Liquidity Reuse', icon: Repeat },
    { id: 'margin', label: 'Smart Margin', icon: PieChart },
    { id: 'risk', label: 'Risk Scenarios', icon: AlertTriangle },
    { id: 'inst_risk', label: 'Inst. Risk', icon: BarChart3 },
    { id: 'regulator', label: 'SEBI Dashboard', icon: Eye },
    { id: 'compliance', label: 'Compliance', icon: Shield },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'problem': return <ProblemVisualization />;
      case 'identity': return <VerifiedIdentityLayer />;
      case 'gridlock': return <SettlementGridlock />;
      case 'architecture': return <BlockchainArchitecture />;
      case 'clearing': return <ClearingEvolution />;
      case 'simulator': return <AtomicSimulator />;
      case 'network': return <NetworkVisualizer />;
      case 'comparison': return <SettlementComparison />;
      case 'efficiency': return <CapitalEfficiency />;
      case 'macro': return <MacroImpactDashboard />;
      case 'liquidity': return <LiquidityReuseSimulator />;
      case 'margin': return <SmartMarginSystem />;
      case 'risk': return <RiskFailureScenarios />;
      case 'inst_risk': return <InstitutionalRiskDashboard />;
      case 'regulator': return <RegulatorDashboard />;
      case 'compliance': return <ComplianceLayer />;
      default: return <ProblemVisualization />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-textMain flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-border bg-panel/50 backdrop-blur-md sticky top-0 z-50">
        <div className="w-full px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden border border-primary/30 flex items-center justify-center glow transition-all hover:scale-105">
              <img src="/shrinivesh-logo.png" alt="ShriNivesh Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">ShriNivesh</h1>
              <p className="text-xs text-textMuted hidden sm:block">Advancing Real-Time Settlement for Modern Markets</p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="px-3 py-1 bg-success/10 border border-success/30 rounded-full flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
              <span className="text-xs font-medium text-success">Network Live</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex w-full overflow-hidden">
        {/* Sidebar Nav */}
        <nav className="w-60 border-r border-border bg-[#0a0a0f]/50 p-4 hidden lg:flex flex-col overflow-y-auto custom-scrollbar">
          <div className="space-y-1 flex-1">
            <h3 className="text-[10px] font-bold text-textMuted/40 uppercase px-3 mb-2 tracking-[0.2em]">Platform Modules</h3>
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-[13.5px] transition-all duration-300 group ${isActive
                    ? 'bg-primary/15 text-primary font-semibold border border-primary/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                    : 'text-textMuted hover:bg-white/5 hover:text-white'
                    }`}
                >
                  <Icon size={20} className={`${isActive ? 'text-primary' : 'text-textMuted/60 group-hover:text-white'} transition-colors`} />
                  <span className="tracking-wide">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="h-10 shrink-0" />
        </nav>

        {/* Mobile Nav Header */}
        <div className="md:hidden flex overflow-x-auto p-4 border-b border-border bg-panel gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm ${activeTab === tab.id ? 'bg-primary text-white' : 'bg-background text-textMuted'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

export default App;
