export interface PlanStep {
  id: string;
  name: string;
  status: 'pending' | 'active' | 'complete';
  summary: string;
}

export interface MissionStats {
  status: 'INITIALIZING' | 'ACTIVE' | 'COMPLETE' | 'BLOCKED';
  elapsed: string;
  agentsRunning: number;
  eventsCorrelated: number;
  confidence: number;
  guardrail: string;
  sourcesRetrieved: number;
}

export interface FoundrySource {
  title: string;
  collection: string;
  excerpt: string;
  confidence: number;
}

export interface GuardrailStats {
  secretsRedacted: number;
  piiRemoved: number;
  actionsBlocked: number;
  approvalsPending: number;
}

export interface Thought {
  agent: string;
  message: string;
  confidence: number;
  timestamp: string;
}

export interface StoryNode {
  time: string;
  text: string;
  technique: string;
  confidence: number;
}

export interface Recommendation {
  id: number;
  action: string;
  action_type: string;
  risk: string;
  source: string;
  impact: string;
}
