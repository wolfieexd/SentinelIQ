import { InvestigationPlan } from './InvestigationPlan';
import { GuardrailPanel } from './GuardrailPanel';
import { StoryMode } from './StoryMode';
import type { FoundrySource } from '../types/events';

export function WarRoom({ onClose, invState }: { onClose: () => void, invState: any }) {
  const sources: FoundrySource[] = invState.foundrySources || [];

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col font-mono text-sm overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="h-14 bg-panel border-b border-border flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4 text-text-primary font-bold text-base">
          <div className="flex flex-col">
            <span className="text-lg">⛶ SentinelIQ</span>
            <span className="text-[10px] text-text-secondary font-normal tracking-wider uppercase -mt-1">Autonomous Security Incident Investigator</span>
          </div>
          <span className="text-border ml-2">│</span>
          <span className="text-text-secondary">EXECUTIVE WAR ROOM</span>
          <span className="text-border">│</span>
          <span className="text-status-active flex items-center gap-2 animate-pulse">● {invState.isComplete ? 'POST-MORTEM' : 'ACTIVE'}</span>
        </div>
        <button onClick={onClose} className="text-text-secondary hover:text-white px-3 py-1 border border-transparent hover:border-border transition-colors">
          [Esc] Exit War Room
        </button>
      </div>

      {/* Grid Layout */}
      <div className="flex-1 grid grid-cols-3 grid-rows-2 gap-4 p-4 overflow-hidden bg-black/50">
        
        {/* Story Mode Panel */}
        <div className="panel flex flex-col p-0 overflow-hidden col-span-1 row-span-1">
          <StoryMode nodes={invState.storyNodes} />
        </div>

        {/* Evidence Graph Panel */}
        <div className="panel flex flex-col p-0 overflow-hidden col-span-1 row-span-1 border-severity-high/30">
          <div className="p-3 border-b border-border font-bold flex justify-between">
            <span>EVIDENCE GRAPH</span>
            <span className="text-text-secondary">Lateral Movement Path</span>
          </div>
          <div className="p-4 flex-1 flex items-center justify-center text-text-muted relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center gap-4">
                
                {/* Node 1 */}
                <div className="group relative">
                  <div className={`w-16 h-16 border-2 ${invState.storyNodes.length > 0 ? 'border-severity-low bg-severity-low/10' : 'border-border'} rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]`}>
                    Entry
                  </div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-panel border border-border rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none shadow-xl text-xs">
                    <div className="font-bold text-text-primary mb-1">Initial Access</div>
                    <div className="text-text-secondary">Confidence: 94%</div>
                    <div className="text-status-active">12 correlated events</div>
                  </div>
                </div>

                <div className={`w-16 h-[2px] ${invState.storyNodes.length > 1 ? 'bg-severity-low' : 'bg-border'} relative transition-colors duration-500`}><span className="absolute -top-4 text-[10px] w-full text-center">T1566</span></div>
                
                {/* Node 2 */}
                <div className="group relative">
                  <div className={`w-16 h-16 border-2 ${invState.storyNodes.length > 1 ? 'border-severity-medium bg-severity-medium/10' : 'border-border'} rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer hover:shadow-[0_0_15px_rgba(234,179,8,0.5)]`}>
                    Host
                  </div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-panel border border-border rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none shadow-xl text-xs">
                    <div className="font-bold text-text-primary mb-1">Lateral Movement</div>
                    <div className="text-text-secondary">Confidence: 98%</div>
                    <div className="text-severity-medium">Abnormal Execution</div>
                  </div>
                </div>

                <div className={`w-16 h-[2px] ${invState.storyNodes.length > 3 ? 'bg-severity-medium' : 'bg-border'} relative transition-colors duration-500`}><span className="absolute -top-4 text-[10px] w-full text-center">T1003</span></div>
                
                {/* Node 3 */}
                <div className="group relative">
                  <div className={`w-16 h-16 border-2 ${invState.storyNodes.length > 3 ? 'border-severity-high bg-severity-high/10' : 'border-border'} rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer hover:shadow-[0_0_15px_rgba(249,115,22,0.5)]`}>
                    Target
                  </div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-panel border border-border rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none shadow-xl text-xs">
                    <div className="font-bold text-severity-critical mb-1">Target Reached</div>
                    <div className="text-text-secondary">Confidence: 91%</div>
                    <div className="text-severity-high">High Risk Event</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Reasoning Stream Panel */}
        <div className="panel flex flex-col p-0 overflow-hidden col-span-1 row-span-1">
          <div className="p-3 border-b border-border font-bold">AGENT REASONING STREAM</div>
          <div className="p-4 overflow-auto flex-1 text-xs text-text-secondary flex flex-col gap-3">
            {invState.thoughts.map((thought: any, i: number) => (
              <div key={i} className="animate-fade-in border-l-2 border-border pl-3">
                <div className="flex justify-between text-[10px] mb-1">
                  <span className={thought.agent.includes('Guardrail') ? 'text-severity-critical' : thought.agent.includes('Threat') ? 'text-severity-medium' : 'text-status-active'}>
                    [{thought.agent}]
                  </span>
                  <span>{new Date(thought.timestamp).toLocaleTimeString()}</span>
                </div>
                <div className={thought.agent.includes('Guardrail') ? 'text-text-primary font-bold' : ''}>{thought.message}</div>
                <div className="text-[10px] mt-1 flex gap-2">
                  <span>Conf: {thought.confidence}%</span>
                  {thought.sources_used && <span className="text-text-muted">Source: {thought.sources_used}</span>}
                </div>
              </div>
            ))}
            {invState.thoughts.length === 0 && <div className="text-text-muted animate-pulse">Awaiting agent streams...</div>}
          </div>
        </div>

        {/* Investigation Plan Panel */}
        <div className="col-span-1 row-span-1 h-full overflow-hidden">
          <InvestigationPlan steps={invState.planSteps} />
        </div>

        {/* Foundry IQ Evidence Panel */}
        <div className="panel col-span-1 row-span-1 flex flex-col border-status-active/30 font-mono text-sm relative overflow-hidden">
          <div className="flex justify-between border-b border-border pb-2 mb-4">
            <h2 className="font-bold text-text-primary">FOUNDRY IQ EVIDENCE</h2>
            <span className="bg-background border border-border px-2 py-0.5 rounded text-[10px] text-status-active">RAG ACTIVE</span>
          </div>
          
          <div className="flex-1 flex flex-col overflow-auto">
            {sources.length > 0 ? (
              <div className="animate-fade-in flex flex-col gap-4">
                <div>
                  <h3 className="text-text-secondary text-xs mb-2 uppercase">Retrieved Sources:</h3>
                  <ul className="flex flex-col gap-2">
                    {sources.map((src, i) => (
                      <li key={i} className="flex items-center gap-2 text-text-primary">
                        <span className="text-status-complete">✓</span> {src.collection}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-panel p-3 border-l-2 border-status-active mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-text-secondary">Primary Match:</span>
                    <span className="text-xs font-bold text-status-active">Confidence: {sources[0].confidence}%</span>
                  </div>
                  <span className="text-text-primary">{sources[0].title}</span>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-text-muted animate-pulse text-xs">
                Awaiting vector search completion...
              </div>
            )}
          </div>
        </div>

        {/* Guardrail Panel */}
        <div className="col-span-1 row-span-1 h-full overflow-hidden">
          <GuardrailPanel stats={invState.guardrailStats} />
        </div>

      </div>
    </div>
  );
}
