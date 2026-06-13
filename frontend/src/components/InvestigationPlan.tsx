import type { PlanStep } from '../types/events';

export function InvestigationPlan({ steps }: { steps: PlanStep[] }) {
  const completedCount = steps.filter(s => s.status === 'complete').length;

  return (
    <div className="panel flex flex-col font-mono text-sm h-full overflow-y-auto pb-6">
      <div className="flex justify-between border-b border-border pb-2 mb-4 shrink-0">
        <h2 className="font-bold">INVESTIGATION PLAN</h2>
        <span className="text-status-active">[IN PROGRESS]</span>
      </div>
      
      <div className="flex flex-col gap-2 flex-1 overflow-visible">
        {steps.map(step => (
          <div key={step.id} className="flex justify-between items-center group cursor-pointer hover:bg-border/30 px-2 py-1 -mx-2 rounded transition-colors">
            <div className="flex items-center gap-3">
              <span className={`w-6 ${step.status === 'complete' ? 'text-status-complete' : step.status === 'active' ? 'text-status-active animate-pulse' : 'text-text-muted'}`}>
                {step.status === 'complete' ? '[✓]' : step.status === 'active' ? '[⟳]' : '[ ]'}
              </span>
              <span className={step.status === 'pending' ? 'text-text-muted' : 'text-text-primary'}>
                {step.name}
              </span>
            </div>
            <span className="text-text-secondary text-xs">{step.summary}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border text-text-secondary flex justify-between">
        <span>Progress: {completedCount} / {Math.max(steps.length, 1)} steps complete</span>
        <div className="w-1/2 bg-background h-1.5 mt-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-status-active h-full transition-all duration-500" 
            style={{ width: steps.length ? `${(completedCount / steps.length) * 100}%` : '0%' }}
          />
        </div>
      </div>
    </div>
  );
}
