import { useState, useEffect } from 'react';

export function InitializationSequence({ scenarioId, onComplete }: { scenarioId: string | null, onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  
  const sequences: Record<string, string[]> = {
    phishing: [
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "INVESTIGATION INITIALIZED",
      "Case ID: INV-2024-0342   Scenario: Phishing Attack",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "",
      "Indexing Evidence Sources...",
      "  ✓  Email Headers               (14 messages)",
      "  ✓  Endpoint Logs               (1,247 events)",
      "  ✓  Active Directory Events     (89 records)",
      "  ✓  Network Flow Data           (432 connections)",
      "  ✓  EDR Alerts                  (6 detections)",
      "",
      "Evidence package validated. 5 sources, 1,788 events.",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "Launching Agent Team...",
      "  [ONLINE]  Investigation Orchestrator",
      "  [ONLINE]  Timeline Reconstruction Agent",
      "  [ONLINE]  Email Analysis Agent",
      "  [ONLINE]  Threat Intelligence Agent",
      "  [ONLINE]  Risk Assessment Agent",
      "  [ONLINE]  Response Planning Agent",
      "  [STANDBY] Compliance Guardrail Agent",
      "",
      "Orchestrator has generated investigation plan.",
      "Agents dispatched. Investigation underway.",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    ],
    ransomware: [
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "INVESTIGATION INITIALIZED",
      "Case ID: INV-2024-0891   Scenario: Ransomware",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "",
      "Indexing Evidence Sources...",
      "  ✓  File System Telemetry       (24,591 events)",
      "  ✓  SMB/RPC Traffic             (12,403 connections)",
      "  ✓  Volume Shadow Copies        (Status: DELETED)",
      "  ✓  Process Execution Logs      (1,482 events)",
      "  ✓  EDR Alerts                  (18 detections)",
      "",
      "Evidence package validated. High-priority encryption indicators detected.",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "Launching Agent Team...",
      "  [ONLINE]  Investigation Orchestrator",
      "  [ONLINE]  Timeline Reconstruction Agent",
      "  [ONLINE]  Lateral Movement Agent",
      "  [ONLINE]  Malware Analysis Agent",
      "  [ONLINE]  Recovery Planning Agent",
      "  [ONLINE]  Executive Briefing Agent",
      "  [STANDBY] Compliance Guardrail Agent",
      "",
      "Orchestrator has generated investigation plan.",
      "Agents dispatched. Investigation underway.",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    ],
    insider: [
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "INVESTIGATION INITIALIZED",
      "Case ID: INV-2024-1105   Scenario: Insider Threat",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "",
      "Indexing Evidence Sources...",
      "  ✓  Badge Access Records        (4 facility entries)",
      "  ✓  SharePoint Audit Logs       (482 downloads)",
      "  ✓  USB Device Activity         (2 connections)",
      "  ✓  DLP Agent Alerts            (14 policy violations)",
      "  ✓  VPN Connection Logs         (3 sessions)",
      "",
      "Evidence package validated. Significant behavioral anomalies detected.",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "Launching Agent Team...",
      "  [ONLINE]  Investigation Orchestrator",
      "  [ONLINE]  Timeline Reconstruction Agent",
      "  [ONLINE]  User Behavior Analysis Agent",
      "  [ONLINE]  Data Exfiltration Agent",
      "  [ONLINE]  Legal & HR Compliance Agent",
      "  [ONLINE]  Response Planning Agent",
      "  [ACTIVE]  Compliance Guardrail Agent",
      "",
      "Orchestrator has generated investigation plan.",
      "Agents dispatched. Investigation underway.",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    ]
  };

  const sequence = sequences[scenarioId || 'phishing'] || sequences['phishing'];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < sequence.length) {
        setLines(prev => [...prev, sequence[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 800);
      }
    }, 150);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="flex-1 bg-background text-text-primary p-8 font-mono text-sm overflow-auto">
      <div className="max-w-3xl whitespace-pre">
        {lines.map((line, i) => (
          <div key={i} className="min-h-[1.25rem]">{line}</div>
        ))}
      </div>
    </div>
  );
}
