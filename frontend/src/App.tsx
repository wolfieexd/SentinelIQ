import { useState, useEffect } from 'react'
import { MissionControlBar } from './components/MissionControlBar'
import { InitializationSequence } from './components/InitializationSequence'
import { InvestigationWorkspace } from './components/InvestigationWorkspace'
import { WarRoom } from './components/WarRoom'
import { ThreatFeed } from './components/ThreatFeed'
import { KnowledgeCenter } from './components/KnowledgeCenter'
import { Reports } from './components/Reports'
import { Settings } from './components/Settings'
import { useInvestigation } from './hooks/useInvestigation'

function App() {
  const [activeTab, setActiveTab] = useState<'INCIDENTS' | 'THREAT_FEED' | 'KNOWLEDGE' | 'REPORTS' | 'SETTINGS'>('INCIDENTS')
  const [appState, setAppState] = useState<'HOME' | 'INITIALIZING' | 'WORKSPACE'>('HOME')
  const [isWarRoomOpen, setIsWarRoomOpen] = useState(false)
  const [activeIncidentId, setActiveIncidentId] = useState<string | null>(null)

  const invState = useInvestigation(activeIncidentId)
  
  const startScenario = (scenarioId: string) => {
    setActiveIncidentId(scenarioId)
    setAppState('INITIALIZING')
  }
  
  const handleInitializationComplete = () => {
    setAppState('WORKSPACE')
  }

  // Auto-open war room on completion
  useEffect(() => {
    if (invState.isComplete) {
      setIsWarRoomOpen(true)
    }
  }, [invState.isComplete])

  return (
    <div className="h-screen w-screen flex flex-col bg-background text-text-primary overflow-hidden">
      {/* Top Command Bar */}
      <header className="h-12 border-b border-border bg-panel flex items-center px-4 justify-between shrink-0">
        <div className="flex items-center gap-4">
          <span className="font-mono font-bold text-lg text-text-primary">SentinelIQ</span>
          <div className="h-6 w-[1px] bg-border mx-2"></div>
          <button onClick={() => alert("Global search indexing in demo mode.")} className="text-text-secondary hover:text-text-primary text-sm font-mono transition-colors">Global Search (Cmd+K)</button>
        </div>
        <div className="flex items-center gap-4 text-sm font-mono text-text-secondary">
          {appState === 'WORKSPACE' && activeTab === 'INCIDENTS' && (
            <button 
              onClick={() => setIsWarRoomOpen(true)}
              className="bg-panel border border-border px-3 py-1 hover:border-text-secondary hover:text-text-primary transition-colors flex items-center gap-2"
            >
              <span>⛶ War Room</span>
            </button>
          )}
          <span>Active Incidents: 2</span>
          <span>Analyst: S. Sujan</span>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Left Sidebar */}
        <aside className="w-56 border-r border-border bg-background flex flex-col shrink-0 font-mono text-sm overflow-y-auto">
          <nav className="flex flex-col py-4 min-h-0">
            <button onClick={() => setActiveTab('INCIDENTS')} className={`px-4 py-2 text-left transition-colors ${activeTab === 'INCIDENTS' ? 'text-severity-medium bg-panel border-l-2 border-severity-medium' : 'text-text-secondary hover:text-text-primary hover:bg-panel'}`}>Active Incidents</button>
            <button onClick={() => setActiveTab('THREAT_FEED')} className={`px-4 py-2 text-left transition-colors ${activeTab === 'THREAT_FEED' ? 'text-text-primary bg-panel border-l-2 border-border' : 'text-text-secondary hover:text-text-primary hover:bg-panel'}`}>Threat Feed</button>
            <button onClick={() => setActiveTab('KNOWLEDGE')} className={`px-4 py-2 text-left transition-colors ${activeTab === 'KNOWLEDGE' ? 'text-text-primary bg-panel border-l-2 border-border' : 'text-text-secondary hover:text-text-primary hover:bg-panel'}`}>Knowledge Center</button>
            <button onClick={() => setActiveTab('REPORTS')} className={`px-4 py-2 text-left transition-colors ${activeTab === 'REPORTS' ? 'text-text-primary bg-panel border-l-2 border-border' : 'text-text-secondary hover:text-text-primary hover:bg-panel'}`}>Reports</button>
            <button onClick={() => setActiveTab('SETTINGS')} className={`px-4 py-2 text-left transition-colors ${activeTab === 'SETTINGS' ? 'text-text-primary bg-panel border-l-2 border-border' : 'text-text-secondary hover:text-text-primary hover:bg-panel'}`}>Settings</button>
          </nav>
        </aside>

        {/* Center Workspace */}
        <main className="flex-1 flex flex-col relative overflow-hidden bg-background min-h-0">
          {activeTab === 'THREAT_FEED' && <ThreatFeed />}
          {activeTab === 'KNOWLEDGE' && <KnowledgeCenter />}
          {activeTab === 'REPORTS' && <Reports />}
          {activeTab === 'SETTINGS' && <Settings />}
          
          {activeTab === 'INCIDENTS' && appState === 'HOME' && (
            <div className="flex-1 flex font-mono animate-fade-in">
              {/* Main Content */}
              <div className="flex-1 p-8 flex flex-col">
                <div className="mb-12">
                  <h1 className="text-2xl font-bold text-text-primary mb-2">Autonomous Security Investigation Platform</h1>
                  <p className="text-text-secondary text-base">Select a scenario to observe a complete AI-driven incident investigation.</p>
                </div>
                
                <div className="flex gap-4 mb-12">
                  <button 
                    onClick={() => startScenario('phishing')}
                    className="panel border-border hover:border-text-secondary transition-colors text-left flex-1 group"
                  >
                    <h2 className="font-mono font-bold text-text-primary group-hover:text-status-active transition-colors">Phishing Attack</h2>
                    <p className="text-sm text-text-secondary mt-2">Credential theft via macro</p>
                  </button>
                  <button 
                    onClick={() => startScenario('ransomware')}
                    className="panel border-border hover:border-text-secondary transition-colors text-left flex-1 group"
                  >
                    <h2 className="font-mono font-bold text-text-primary group-hover:text-severity-high transition-colors">Ransomware</h2>
                    <p className="text-sm text-text-secondary mt-2">Lateral movement & encryption</p>
                  </button>
                  <button 
                    onClick={() => startScenario('insider')}
                    className="panel border-border hover:border-text-secondary transition-colors text-left flex-1 group"
                  >
                    <h2 className="font-mono font-bold text-text-primary group-hover:text-severity-critical transition-colors">Insider Threat</h2>
                    <p className="text-sm text-text-secondary mt-2">Data exfiltration & anomalies</p>
                  </button>
                </div>

                <div className="panel border-border max-w-2xl">
                  <h2 className="font-bold border-b border-border pb-2 mb-4">MISSION BRIEF</h2>
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    SentinelIQ autonomously investigates security incidents using multiple specialized reasoning agents.
                  </p>
                  <div className="grid grid-cols-2 gap-y-4 text-sm text-text-primary">
                    <div className="flex items-center gap-3"><span className="text-status-complete font-bold">✓</span> Timeline Reconstruction</div>
                    <div className="flex items-center gap-3"><span className="text-status-complete font-bold">✓</span> Threat Intelligence Correlation</div>
                    <div className="flex items-center gap-3"><span className="text-status-complete font-bold">✓</span> Risk Assessment</div>
                    <div className="flex items-center gap-3"><span className="text-status-complete font-bold">✓</span> Compliance Guardrails</div>
                    <div className="flex items-center gap-3"><span className="text-status-complete font-bold">✓</span> Foundry IQ Grounding</div>
                    <div className="flex items-center gap-3"><span className="text-status-complete font-bold">✓</span> Executive Reporting</div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar Status */}
              <div className="w-80 border-l border-border bg-panel p-6 flex flex-col gap-10 shrink-0">
                <div>
                  <h2 className="font-bold border-b border-border pb-2 mb-4 text-status-active">SYSTEM STATUS</h2>
                  <div className="flex flex-col gap-4 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Agents Online:</span>
                      <span className="text-text-primary font-bold bg-background px-2 py-0.5 rounded border border-border">7</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Knowledge Sources:</span>
                      <span className="text-text-primary font-bold bg-background px-2 py-0.5 rounded border border-border">42</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Foundry IQ:</span>
                      <span className="text-status-complete font-bold">Connected</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Guardrails:</span>
                      <span className="text-status-active font-bold animate-pulse">Active</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="font-bold border-b border-border pb-2 mb-4 text-text-primary">INVESTIGATION FLOW</h2>
                  <div className="flex flex-col items-center gap-2 text-xs text-text-secondary font-bold">
                    <div className="w-full text-center bg-background border border-border py-2 rounded shadow-sm">Alert</div>
                    <span className="text-border">↓</span>
                    <div className="w-full text-center bg-background border border-border py-2 rounded text-severity-medium shadow-sm">Agents</div>
                    <span className="text-border">↓</span>
                    <div className="w-full text-center bg-background border border-border py-2 rounded text-status-active shadow-sm">Foundry IQ</div>
                    <span className="text-border">↓</span>
                    <div className="w-full text-center bg-background border border-border py-2 rounded text-severity-critical shadow-sm">Guardrail</div>
                    <span className="text-border">↓</span>
                    <div className="w-full text-center bg-background border border-border py-2 rounded text-status-complete shadow-sm">Response Plan</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'INCIDENTS' && appState === 'INITIALIZING' && (
            <InitializationSequence scenarioId={activeIncidentId} onComplete={handleInitializationComplete} />
          )}

          {activeTab === 'INCIDENTS' && appState === 'WORKSPACE' && (
            <div className="flex-1 flex flex-col min-h-0">
              {invState.missionStats && (
                <MissionControlBar 
                  status={invState.missionStats.status} 
                  agentsRunning={invState.missionStats.agentsRunning} 
                  eventsCorrelated={invState.missionStats.eventsCorrelated} 
                  confidence={invState.missionStats.confidence} 
                  guardrail={invState.missionStats.guardrail} 
                  sourcesRetrieved={invState.missionStats.sourcesRetrieved}
                />
              )}
              <InvestigationWorkspace invState={invState} />
            </div>
          )}

          {activeTab === 'INCIDENTS' && isWarRoomOpen && <WarRoom onClose={() => setIsWarRoomOpen(false)} invState={invState} />}
        </main>
      </div>
    </div>
  )
}

export default App
