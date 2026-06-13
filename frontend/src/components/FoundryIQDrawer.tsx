import type { FoundrySource } from '../types/events';

export function FoundryIQDrawer({ isOpen, onClose, sources }: { isOpen: boolean; onClose: () => void, sources: FoundrySource[] }) {
  if (!isOpen) return null;

  const primarySource = sources[0];
  const additionalSources = sources.slice(1);

  return (
    <div className="fixed inset-y-0 right-0 w-[600px] bg-background border-l border-border shadow-2xl flex flex-col font-mono text-sm z-50 transform transition-transform duration-300">
      <div className="p-4 border-b border-border bg-panel flex justify-between items-center">
        <h2 className="font-bold text-text-primary flex items-center gap-2">
          GROUNDED EVIDENCE <span className="bg-background border border-border px-2 py-0.5 rounded text-xs ml-2 text-status-active">[Foundry IQ]</span>
        </h2>
        <button onClick={onClose} className="text-text-secondary hover:text-white px-2 py-1 border border-transparent hover:border-border">
          [✕]
        </button>
      </div>
      
      <div className="flex-1 overflow-auto p-6 flex flex-col gap-6">
        
        {primarySource ? (
          <>
            <div>
              <h3 className="border-b border-border pb-2 mb-4 font-bold text-text-primary">RETRIEVED SOURCE</h3>
              <table className="w-full text-left mb-6">
                <tbody>
                  <tr><td className="text-text-secondary w-24 py-1">Title:</td><td className="text-text-primary">{primarySource.title}</td></tr>
                  <tr><td className="text-text-secondary py-1">Collection:</td><td className="text-text-primary">{primarySource.collection}</td></tr>
                  <tr><td className="text-text-secondary py-1">Match:</td><td className="text-text-primary font-bold flex items-center gap-2"><div className="w-24 bg-panel h-2"><div className="bg-status-active h-full" style={{width: `${primarySource.confidence}%`}}></div></div> {primarySource.confidence}%</td></tr>
                </tbody>
              </table>

              <div className="bg-panel p-4 border-l-2 border-l-status-active mb-6 animate-fade-in">
                <h4 className="text-text-secondary text-xs mb-2">Excerpt:</h4>
                <p className="text-text-primary leading-relaxed">
                  "{primarySource.excerpt}"
                </p>
              </div>
            </div>

            {additionalSources.length > 0 && (
              <div>
                <h3 className="border-b border-border pb-2 mb-4 font-bold text-text-primary">ADDITIONAL SOURCES</h3>
                <div className="flex flex-col gap-2">
                  {additionalSources.map((src, i) => (
                    <div key={i} className="flex justify-between items-center p-2 hover:bg-panel border border-transparent hover:border-border cursor-pointer">
                      <span className="text-text-primary">[{i+2}] {src.collection} · {src.title.split(':')[0]}</span>
                      <span className="text-text-secondary">{src.confidence}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-text-muted animate-pulse">Querying Knowledge Base...</div>
        )}
      </div>
    </div>
  );
}
