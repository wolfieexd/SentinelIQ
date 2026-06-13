interface MissionControlProps {
  status: 'INITIALIZING' | 'ACTIVE' | 'COMPLETE' | 'BLOCKED';
  agentsRunning: number;
  eventsCorrelated: number;
  confidence: number;
  guardrail: string;
  sourcesRetrieved: number;
}

export function MissionControlBar({ status, agentsRunning, eventsCorrelated, confidence, guardrail, sourcesRetrieved }: MissionControlProps) {
  return (
    <div className="min-h-[2rem] shrink-0 bg-panel border-b border-border flex items-center px-4 py-1.5 font-mono text-xs text-text-secondary w-full overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-hide">
      <div className="flex items-center gap-6 w-max">
        <div className="flex items-center gap-2">
          <span>INVESTIGATION STATUS</span>
          <span className="text-border">│</span>
          <div className="flex items-center gap-2 text-status-active font-bold">
            <span className="animate-pulse">●</span>
            {status}
          </div>
        </div>
        <span className="text-border">│</span>
        <span>Elapsed: 00:24</span>
        <span className="text-border">│</span>
        <span>Agents Running: {agentsRunning}/7</span>
        <span className="text-border">│</span>
        <span>Events Correlated: {eventsCorrelated}</span>
        <span className="text-border">│</span>
        <span>Sources Retrieved: {sourcesRetrieved}</span>
        <span className="text-border">│</span>
        <span>Overall Confidence: {confidence}%</span>
        <span className="text-border">│</span>
        <span>Guardrail: {guardrail}</span>
      </div>
    </div>
  )
}
