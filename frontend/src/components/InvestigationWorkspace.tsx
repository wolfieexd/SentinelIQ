import { InvestigationPlan } from './InvestigationPlan';
import { GuardrailPanel } from './GuardrailPanel';
import { StoryMode } from './StoryMode';
import { AnalystWorkbench } from './AnalystWorkbench';
import { DecisionCenter } from './DecisionCenter';

export function InvestigationWorkspace({ invState }: { invState: any }) {
  return (
    <div 
      className="flex-1 grid gap-4 p-4 overflow-hidden min-h-0 w-full"
      style={{ gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.3fr) minmax(0, 0.9fr)" }}
    >
      {/* Left Column: Plan and Reasoning */}
      <div className="flex flex-col gap-4 min-h-0 min-w-0">
        <InvestigationPlan steps={invState.planSteps} />
        <GuardrailPanel stats={invState.guardrailStats} />
      </div>

      {/* Center Column: Story Mode & Timeline */}
      <div className="flex flex-col gap-4 min-h-0 min-w-0">
        <div className="panel flex-1 flex flex-col p-0 overflow-hidden min-h-0">
          <StoryMode nodes={invState.storyNodes} />
        </div>
      </div>

      {/* Right Column: Workbench & Action Center */}
      <div className="flex flex-col gap-2 min-h-0 min-w-0">
        <div className="panel h-[35%] shrink-0 flex flex-col p-0 overflow-hidden min-h-0">
          <AnalystWorkbench scenarioId={invState.scenarioId} />
        </div>
        <div className="panel flex-1 flex flex-col p-0 overflow-hidden min-h-0">
          <h2 className="font-mono font-bold border-b border-border pb-2 mb-0 px-3 pt-3 shrink-0">DECISION CENTER</h2>
          <DecisionCenter recommendations={invState.recommendations} foundrySources={invState.foundrySources} />
        </div>
      </div>
    </div>
  );
}
