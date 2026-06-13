import { useState } from 'react';
import { FoundryIQDrawer } from './FoundryIQDrawer';
import type { Recommendation, FoundrySource } from '../types/events';

export function DecisionCenter({ recommendations, foundrySources = [] }: { recommendations: Recommendation[], foundrySources?: FoundrySource[] }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const getRiskColor = (risk: string) => {
    const r = risk.toLowerCase();
    if (r.includes('low')) return 'text-status-active';
    if (r.includes('medium')) return 'text-severity-medium';
    if (r.includes('high') || r.includes('critical')) return 'text-severity-critical';
    return 'text-text-secondary';
  };

  return (
    <div className="flex-1 flex flex-col font-mono text-sm bg-background min-h-0">
      <FoundryIQDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} sources={foundrySources} />
      
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-2.5 pb-6 min-h-0">
        <div className="flex flex-col gap-3">
          {recommendations.map((act, i) => (
            <div key={i} className="flex border-b border-border/50 pb-3 group hover:bg-panel/50 transition-colors animate-fade-in">
              {/* Left Side (60%) */}
              <div className="w-[60%] pr-4 flex flex-col gap-1">
                <div className="text-text-primary font-bold leading-tight flex items-start gap-1.5 text-[12px]">
                  <span className="text-text-secondary font-normal text-[11px] mt-0.5">[{act.id}]</span>
                  <span>{act.action}</span>
                </div>
                <div className="text-text-secondary text-[10px] leading-relaxed mt-0.5 pr-2">{act.impact}</div>
                <div className="flex gap-1.5 mt-1.5">
                  <button onClick={() => alert("Action Approved. Execution initiated.")} className="bg-panel border border-border px-1.5 py-0.5 hover:text-status-complete hover:border-status-complete transition-colors text-[9px]">[APPROVE]</button>
                  <button onClick={() => alert("Action Rejected. Removed from plan.")} className="bg-panel border border-border px-1.5 py-0.5 hover:text-severity-critical hover:border-severity-critical transition-colors text-[9px]">[Reject]</button>
                  <button onClick={() => setIsDrawerOpen(true)} className="text-status-active hover:underline px-1.5 py-0.5 text-[9px]">[Why?]</button>
                </div>
              </div>

              {/* Right Side (40%) */}
              <div className="w-[40%] border-l border-border/30 pl-6 flex flex-col justify-center">
                <div className="grid grid-cols-[50px_1fr] gap-y-1.5 items-center">
                  <span className="text-text-muted text-[10px]">Type:</span>
                  <span className="text-text-secondary whitespace-nowrap text-[10px]">{act.action_type}</span>
                  
                  <span className="text-text-muted text-[10px]">Risk:</span>
                  <span className={`whitespace-nowrap font-bold text-[10px] ${getRiskColor(act.risk)}`}>{act.risk}</span>
                  
                  <span className="text-text-muted text-[10px]">Source:</span>
                  <span className="text-text-secondary whitespace-nowrap text-[10px]">{act.source}</span>
                </div>
              </div>
            </div>
          ))}
          {recommendations.length === 0 && (
            <div className="py-6 text-center text-[11px] text-text-muted animate-pulse">Awaiting Response Plan Generation...</div>
          )}
        </div>
      </div>

      <div className={`p-2.5 border-t border-border bg-panel shrink-0 text-[10px] text-text-secondary flex ${0 > 0 ? 'justify-between' : 'justify-end'}`}>
        {0 > 0 && <span>Destructive actions requiring SOC Lead approval: <span className="text-text-primary">0</span></span>}
        <span>Pending approvals: <span className="text-status-active font-bold">{recommendations.length}</span></span>
      </div>
    </div>
  );
}
