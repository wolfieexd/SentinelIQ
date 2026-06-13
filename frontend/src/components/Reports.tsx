export function Reports() {
  return (
    <div className="flex-1 p-8 overflow-auto font-mono text-sm animate-fade-in">
      <h1 className="text-2xl font-bold text-text-primary mb-2">Executive Reports</h1>
      <p className="text-text-secondary mb-8">Auto-generated War Room summaries and post-mortem analyses.</p>
      
      <table className="w-full max-w-5xl text-left border-collapse">
        <thead>
          <tr className="border-b border-border text-text-secondary">
            <th className="pb-2 font-normal">Report ID</th>
            <th className="pb-2 font-normal">Incident Type</th>
            <th className="pb-2 font-normal">Generated</th>
            <th className="pb-2 font-normal">Status</th>
            <th className="pb-2 font-normal text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border/50 hover:bg-panel transition-colors">
            <td className="py-4 text-text-primary">REP-2024-0341</td>
            <td className="py-4 text-severity-high">Ransomware Containment</td>
            <td className="py-4 text-text-secondary">Yesterday, 14:30</td>
            <td className="py-4"><span className="bg-status-complete/20 text-status-complete px-2 py-1 rounded text-xs">Finalized</span></td>
            <td className="py-4 text-right">
              <button onClick={() => alert("Generating executive report...")} className="text-status-active hover:underline">Download PDF</button>
            </td>
          </tr>
          <tr className="border-b border-border/50 hover:bg-panel transition-colors">
            <td className="py-4 text-text-primary">REP-2024-0340</td>
            <td className="py-4 text-severity-medium">Phishing Campaign</td>
            <td className="py-4 text-text-secondary">Mar 12, 09:15</td>
            <td className="py-4"><span className="bg-status-complete/20 text-status-complete px-2 py-1 rounded text-xs">Finalized</span></td>
            <td className="py-4 text-right">
              <button onClick={() => alert("Generating executive report...")} className="text-status-active hover:underline">Download PDF</button>
            </td>
          </tr>
          <tr className="border-b border-border/50 hover:bg-panel transition-colors">
            <td className="py-4 text-text-primary">REP-2024-0339</td>
            <td className="py-4 text-severity-critical">Insider Threat: Exfiltration</td>
            <td className="py-4 text-text-secondary">Mar 10, 03:45</td>
            <td className="py-4"><span className="bg-status-active/20 text-status-active px-2 py-1 rounded text-xs">Pending Legal Review</span></td>
            <td className="py-4 text-right">
              <button onClick={() => alert("Generating executive report...")} className="text-status-active hover:underline">Download PDF</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
