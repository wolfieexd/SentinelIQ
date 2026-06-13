import type { StoryNode } from '../types/events';

export function StoryMode({ nodes }: { nodes: StoryNode[] }) {
  const handleExport = () => {
    const content = `SentinelIQ Incident Report\n--------------------------\nTotal Events: ${nodes.length}\nDwell Time: ${nodes.length > 0 ? '19 minutes' : 'TBD'}\n\nTIMELINE:\n${nodes.map(n => `[${n.time}] ${n.text}\n  Technique: ${n.technique} (Confidence: ${n.confidence}%)`).join('\n\n')}\n\nEND OF REPORT`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'incident_report.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 flex flex-col bg-background font-mono text-sm h-full overflow-hidden">
      <div className="flex justify-between items-center p-6 pb-4 border-b border-border shrink-0">
        <h2 className="text-lg font-bold">ATTACK STORY</h2>
        <div className="flex gap-4">
          <button onClick={() => window.location.reload()} className="text-status-active hover:text-white transition-colors">▶ REPLAY</button>
          <button onClick={handleExport} className="text-text-secondary hover:text-white transition-colors">⎙ EXPORT</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 relative">
        <div className="relative pl-8 border-l border-border ml-4 flex flex-col gap-8 pb-12">
          {nodes.map((node, i) => (
            <div key={i} className="relative group animate-fade-in">
              {/* Timeline dot */}
              <div className="absolute w-3 h-3 bg-panel border-2 border-status-active rounded-full -left-[38px] top-1 shadow-[0_0_8px_rgba(255,255,255,0.4)]"></div>
              
              <div className="flex gap-6">
                <span className="text-text-secondary w-12 pt-1">{node.time}</span>
                <div className="flex-1">
                  <p className="text-text-primary text-base leading-relaxed max-w-xl">{node.text}</p>
                  <div className="mt-4 border-l-2 border-border pl-4 text-text-secondary flex flex-col gap-1 text-xs">
                    <span className="text-text-primary">[{node.technique}]</span>
                    <span>Confidence: {node.confidence}% <span className="text-status-active">●</span></span>
                  </div>
                </div>
              </div>
              
              {i < nodes.length - 1 && (
                <div className="absolute text-border -left-[31px] top-10 text-xs">▼</div>
              )}
            </div>
          ))}
          {nodes.length === 0 && (
            <div className="text-text-muted animate-pulse">Awaiting timeline reconstruction...</div>
          )}
        </div>
      </div>

      <div className="bg-panel border-t border-border p-4 flex justify-between px-8 shrink-0">
        <span>TOTAL DWELL TIME: {nodes.length > 0 ? '19 minutes' : 'TBD'}</span>
        <span>BLAST RADIUS: {nodes.length > 0 ? '3 hosts' : 'TBD'}</span>
      </div>
    </div>
  );
}
