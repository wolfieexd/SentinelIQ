export function ThreatFeed() {
  return (
    <div className="flex-1 p-8 overflow-auto font-mono text-sm animate-fade-in">
      <h1 className="text-2xl font-bold text-text-primary mb-2">Global Threat Feed</h1>
      <p className="text-text-secondary mb-8">Live intelligence streams correlating ATT&CK behaviors across the enterprise.</p>
      
      <div className="flex flex-col gap-4 max-w-4xl">
        <div className="panel border-l-2 border-severity-high">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-text-primary">New Campaign: Scattered Spider Variant</span>
            <span className="text-text-secondary">2 mins ago</span>
          </div>
          <p className="text-text-secondary mb-4">Adversaries are leveraging social engineering against IT help desks to gain initial access, followed by rapid exfiltration.</p>
          <div className="flex gap-2 text-xs">
            <span className="bg-background border border-border px-2 py-1 rounded text-text-secondary">T1566.001</span>
            <span className="bg-background border border-border px-2 py-1 rounded text-text-secondary">T1078</span>
            <span className="bg-background border border-border px-2 py-1 rounded text-status-active">Foundry IQ Indexed</span>
          </div>
        </div>

        <div className="panel border-l-2 border-severity-medium">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-text-primary">Emerging Vulnerability: CVE-2024-XXXX</span>
            <span className="text-text-secondary">45 mins ago</span>
          </div>
          <p className="text-text-secondary mb-4">Unauthenticated RCE detected in edge VPN appliances. Threat intel agents are currently scanning internal logs for exploitation attempts.</p>
          <div className="flex gap-2 text-xs">
            <span className="bg-background border border-border px-2 py-1 rounded text-text-secondary">T1190</span>
            <span className="bg-background border border-border px-2 py-1 rounded text-status-active">Scan Active</span>
          </div>
        </div>
        
        <div className="panel border-l-2 border-severity-low">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-text-primary">Identity Anomalies Detected</span>
            <span className="text-text-secondary">3 hours ago</span>
          </div>
          <p className="text-text-secondary mb-4">Unusual volume of impossible travel alerts flagged across EMEA region. Automatically contained by identity guardrails.</p>
          <div className="flex gap-2 text-xs">
            <span className="bg-background border border-border px-2 py-1 rounded text-text-secondary">T1078.004</span>
            <span className="bg-background border border-border px-2 py-1 rounded text-status-complete">Contained</span>
          </div>
        </div>
      </div>
    </div>
  );
}
