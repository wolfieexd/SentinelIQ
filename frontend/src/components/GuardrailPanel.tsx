import type { GuardrailStats } from '../types/events';

export function GuardrailPanel({ stats }: { stats: GuardrailStats }) {
  return (
    <div className={`panel flex flex-col font-mono text-sm border-status-active/30 transition-all duration-300 h-full overflow-y-auto pb-6 ${stats.secretsRedacted > 0 || stats.piiRemoved > 0 ? 'border-status-active shadow-[0_0_15px_rgba(255,255,255,0.1)]' : ''}`}>
      <div className="flex justify-between border-b border-border pb-2 mb-4 shrink-0">
        <h2 className="font-bold">COMPLIANCE GUARDRAIL</h2>
        <span className="text-status-active">[ACTIVE]</span>
      </div>
      
      <div className="flex flex-col gap-3 flex-1 overflow-visible">
        <GuardrailRow label="Secrets Redacted" count={stats.secretsRedacted} action="inspect" highlight={stats.secretsRedacted > 0} />
        <GuardrailRow label="PII Removed" count={stats.piiRemoved} action="inspect" highlight={stats.piiRemoved > 0} />
        <GuardrailRow label="Unsafe Actions Blocked" count={stats.actionsBlocked} action="inspect" highlight={stats.actionsBlocked > 0} />
        <GuardrailRow label="Pending Human Approvals" count={stats.approvalsPending} action="REQUIRES ACTION" highlight={stats.approvalsPending > 0} />
      </div>
      
      <div className="mt-6 pt-4 border-t border-border text-text-primary bg-background/50 p-2 rounded">
        Guardrail Status: <span className="text-status-active font-bold">{(stats.secretsRedacted > 0 || stats.piiRemoved > 0) ? 'PASSED WITH REDACTIONS' : 'MONITORING'}</span>
      </div>
    </div>
  );
}

function GuardrailRow({ label, count, action, highlight = false }: { label: string, count: number, action: string, highlight?: boolean }) {
  return (
    <div className={`flex justify-between items-center group cursor-pointer px-2 py-1 -mx-2 rounded transition-all duration-300 ${highlight ? 'bg-panel' : 'hover:bg-border/30'}`}>
      <div className="flex gap-4 w-48">
        <span className={highlight ? 'text-status-active font-bold' : 'text-text-primary'}>{label}</span>
      </div>
      <span className={`w-8 text-right font-bold ${highlight ? 'text-status-active' : 'text-text-primary'}`}>{count}</span>
      <span className={`text-xs ml-4 ${highlight ? 'text-status-active font-bold' : 'text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity'}`}>
        ↗ {action}
      </span>
    </div>
  );
}
