import { FileText, ShieldCheck, Network } from 'lucide-react';

export function KnowledgeCenter() {
  return (
    <div className="flex-1 p-8 overflow-auto font-mono text-sm animate-fade-in">
      <h1 className="text-2xl font-bold text-text-primary mb-2">Foundry IQ Knowledge Base</h1>
      <p className="text-text-secondary mb-8">Vector-embedded enterprise policies and playbooks for semantic agent retrieval.</p>
      
      <div className="grid grid-cols-3 gap-6 max-w-6xl">
        <div className="panel flex flex-col items-center justify-center p-8 text-center border-status-active/50 group hover:border-status-active transition-colors">
          <div className="mb-4 text-text-secondary group-hover:text-status-active transition-colors">
            <FileText size={48} strokeWidth={1.5} />
          </div>
          <h2 className="font-bold text-text-primary mb-2">Incident Response Playbooks</h2>
          <p className="text-text-secondary text-xs mb-4">14 documents embedded</p>
          <div className="flex items-center gap-2 border border-border/50 bg-background px-3 py-1 rounded">
            <span className="w-1.5 h-1.5 bg-status-active rounded-full animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.5)]"></span>
            <span className="text-text-secondary text-[10px] uppercase tracking-wider">Status: Synced</span>
          </div>
        </div>

        <div className="panel flex flex-col items-center justify-center p-8 text-center border-status-active/50 group hover:border-status-active transition-colors">
          <div className="mb-4 text-text-secondary group-hover:text-status-active transition-colors">
            <ShieldCheck size={48} strokeWidth={1.5} />
          </div>
          <h2 className="font-bold text-text-primary mb-2">Security Policies</h2>
          <p className="text-text-secondary text-xs mb-4">8 documents embedded</p>
          <div className="flex items-center gap-2 border border-border/50 bg-background px-3 py-1 rounded">
            <span className="w-1.5 h-1.5 bg-status-active rounded-full animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.5)]"></span>
            <span className="text-text-secondary text-[10px] uppercase tracking-wider">Status: Synced</span>
          </div>
        </div>

        <div className="panel flex flex-col items-center justify-center p-8 text-center border-status-active/50 group hover:border-status-active transition-colors">
          <div className="mb-4 text-text-secondary group-hover:text-status-active transition-colors">
            <Network size={48} strokeWidth={1.5} />
          </div>
          <h2 className="font-bold text-text-primary mb-2">MITRE ATT&CK Corpus</h2>
          <p className="text-text-secondary text-xs mb-4">193 techniques embedded</p>
          <div className="flex items-center gap-2 border border-border/50 bg-background px-3 py-1 rounded">
            <span className="w-1.5 h-1.5 bg-status-active rounded-full animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.5)]"></span>
            <span className="text-text-secondary text-[10px] uppercase tracking-wider">Status: Synced</span>
          </div>
        </div>
      </div>

      <div className="mt-8 panel max-w-6xl">
        <h2 className="font-bold border-b border-border pb-2 mb-4">FAISS VECTOR STORE STATUS</h2>
        <table className="w-full text-left">
          <tbody>
            <tr className="border-b border-border/50">
              <td className="py-2 text-text-secondary">Embedding Model</td>
              <td className="py-2 text-text-primary">all-MiniLM-L6-v2</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-2 text-text-secondary">Vector Dimensions</td>
              <td className="py-2 text-text-primary">384</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-2 text-text-secondary">Total Chunks</td>
              <td className="py-2 text-text-primary font-bold">1,482</td>
            </tr>
            <tr>
              <td className="py-2 text-text-secondary">Agent Retrieval Integration</td>
              <td className="py-2 text-status-active font-bold">Active</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
