import { useState } from 'react';

export function AnalystWorkbench({ scenarioId }: { scenarioId?: string | null }) {
  const [isEditing, setIsEditing] = useState(false);

  const summaries = {
    phishing: {
      vector: "Phishing attachment via spoofed vendor email",
      reasoning: "Email header analysis identified a spoofed sender domain. The attachment triggered PowerShell execution within 2 minutes of open...",
      confidence: "94%",
      hypotheses: [
        { text: "● Phishing-initiated", prob: "72%", label: "[Primary]", active: true },
        { text: "● Exposed RDP endpoint", prob: "18%", label: "[Possible]", active: false }
      ]
    },
    ransomware: {
      vector: "Lateral movement via compromised admin credentials",
      reasoning: "File system telemetry indicates mass encryption matching BlackCat signatures. Preceded by SMB enumeration from a newly created service account...",
      confidence: "88%",
      hypotheses: [
        { text: "● Stolen credentials", prob: "81%", label: "[Primary]", active: true },
        { text: "● Unpatched vulnerability", prob: "12%", label: "[Possible]", active: false }
      ]
    },
    insider: {
      vector: "Unauthorized data staging by authenticated user",
      reasoning: "Badge logs show physical presence during off-hours. Concurrent SharePoint bulk downloads detected exceeding 99th percentile of baseline...",
      confidence: "91%",
      hypotheses: [
        { text: "● Intentional Exfiltration", prob: "89%", label: "[Primary]", active: true },
        { text: "● Account Takeover", prob: "8%", label: "[Possible]", active: false }
      ]
    }
  };

  const summary = summaries[(scenarioId as keyof typeof summaries)] || summaries.phishing;

  return (
    <div className="flex-1 overflow-y-auto min-h-0 bg-background p-2.5 font-mono text-sm pb-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-bold text-text-primary text-xs">AUTO-GENERATED SUMMARY</h2>
        <div className="flex gap-2 text-[10px]">
          <button onClick={() => setIsEditing(!isEditing)} className={`${isEditing ? 'text-text-primary' : 'text-text-secondary'} hover:text-white`}>[{isEditing ? 'Save' : 'Edit'}]</button>
          <button onClick={() => alert("Downloading Incident Report (PDF)...")} className="text-text-secondary hover:text-white">[Export]</button>
        </div>
      </div>

      <div className="bg-panel border border-border p-2.5 mb-3 relative">
        <h3 className="text-text-secondary mb-0.5 text-[10px]">Most Likely Initial Compromise Vector:</h3>
        <p className="text-text-primary mb-2 text-xs">{summary.vector}</p>
        
        <h3 className="text-text-secondary mb-0.5 text-[10px]">Reasoning:</h3>
        <p className="text-text-primary leading-tight text-[11px] mb-1.5">
          {summary.reasoning}
        </p>
        <button onClick={() => alert("Opening Full Analysis Module...")} className="text-status-active hover:underline text-[10px] mb-2 flex items-center gap-1">
          View Full Analysis <span>→</span>
        </button>
        
        <div className="pt-2 border-t border-border flex justify-between items-center text-[10px]">
          <span>Confidence: {summary.confidence} <span className="text-status-active">●</span></span>
          <button className="bg-background border border-border px-2 py-0.5 rounded hover:bg-border transition-colors text-[10px]">
            Source: Foundry IQ
          </button>
        </div>
      </div>

      <h3 className="font-bold text-text-primary mb-1 text-[10px]">Analyst Notes</h3>
      <textarea 
        readOnly={!isEditing}
        className={`w-full bg-panel border ${isEditing ? 'border-status-active' : 'border-border'} p-2 text-text-primary mb-3 resize-none focus:outline-none focus:border-text-secondary h-12 text-[11px] transition-colors`}
        placeholder="[Click to add notes...]"
      ></textarea>

      <h3 className="font-bold text-text-primary mb-1.5 text-[10px]">Hypotheses Under Review:</h3>
      <div className="flex flex-col gap-1 text-[11px]">
        {summary.hypotheses.map((h, i) => (
          <div key={i} className={`flex justify-between p-1 ${h.active ? 'text-text-primary bg-panel border border-border' : 'text-text-secondary'}`}>
            <span>{h.text}</span>
            <div className="flex gap-3">
              <span>{h.prob}</span>
              <span className={`${h.active ? 'text-status-active' : ''} w-16 text-right`}>{h.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
