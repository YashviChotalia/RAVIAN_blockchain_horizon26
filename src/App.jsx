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
    { id: 'architecture', label: 'Blockchain DVP', icon: Layers },
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
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/50 flex items-center justify-center glow text-primary">
              <Shield size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">Project DVP</h1>
              <p className="text-xs text-textMuted hidden sm:block">Real-Time Blockchain Settlement Layer for Indian Markets</p>
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
      <div className="flex-1 flex max-w-7xl mx-auto w-full overflow-hidden">
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

          <div className="mt-8 p-4 bg-primary/5 rounded-2xl border border-primary/10 backdrop-blur-sm">
            <h3 className="text-[10px] font-bold text-primary/70 uppercase mb-3 tracking-[0.2em] flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Hyperledger', 'Solidity', 'Polygon', 'React'].map(tech => (
                <span key={tech} className="px-2 py-1 text-[10px] font-mono bg-background border border-border/50 rounded-md text-textMuted/80">
                  {tech}
                </span>
              ))}
            </div>
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
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full max-w-6xl mx-auto"
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

export default App;
