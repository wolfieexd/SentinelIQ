import { useState } from 'react';

export function Settings() {
  const Toggle = ({ defaultOn = true }) => {
    const [isOn, setIsOn] = useState(defaultOn);
    return (
      <button 
        onClick={() => setIsOn(!isOn)} 
        className={`w-10 h-5 rounded-full relative transition-colors ${isOn ? 'bg-status-active' : 'bg-border'}`}
      >
        <div className={`absolute top-1 w-3 h-3 bg-panel rounded-full transition-all ${isOn ? 'right-1' : 'left-1'}`}></div>
      </button>
    );
  };

  return (
    <div className="flex-1 p-8 overflow-auto font-mono text-sm animate-fade-in">
      <h1 className="text-2xl font-bold text-text-primary mb-2">Platform Settings</h1>
      <p className="text-text-secondary mb-8">Agent configurations, guardrail thresholds, and integrations.</p>
      
      <div className="grid grid-cols-2 gap-8 max-w-5xl">
        <div className="panel">
          <h2 className="font-bold border-b border-border pb-2 mb-4 text-status-active">Agent Swarm Configuration</h2>
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="text-text-primary">Autonomous Actions</span>
            <Toggle />
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="text-text-primary">Require Human Approval (Critical Actions)</span>
            <Toggle />
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="text-text-primary">Reasoning Engine</span>
            <span className="text-text-secondary text-xs">SentinelIQ Investigation Model</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="text-text-primary">Investigation Strategy</span>
            <span className="text-text-secondary text-xs">Multi-Agent Analysis</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="text-text-primary">Pipeline Mode</span>
            <span className="text-text-secondary text-xs">Deterministic Investigation</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-text-primary">Intelligence Layer</span>
            <span className="text-text-secondary text-xs">Foundry IQ <span className="text-status-active font-bold">(Active)</span></span>
          </div>
        </div>

        <div className="panel">
          <h2 className="font-bold border-b border-border pb-2 mb-4 text-severity-critical">Compliance Guardrails</h2>
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="text-text-primary">PII Redaction (Regex + NER)</span>
            <Toggle />
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="text-text-primary">Secret Scanning (AWS, GCP, Azure)</span>
            <Toggle />
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-text-primary">Block Destructive API Calls</span>
            <Toggle />
          </div>
        </div>
      </div>
    </div>
  );
}
