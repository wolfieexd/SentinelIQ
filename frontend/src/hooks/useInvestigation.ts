import { useState, useEffect, useRef } from 'react';
import type { PlanStep, MissionStats, GuardrailStats, Thought, StoryNode, Recommendation, FoundrySource } from '../types/events';

export function useInvestigation(incidentId: string | null) {
  const [planSteps, setPlanSteps] = useState<PlanStep[]>([]);
  const [missionStats, setMissionStats] = useState<MissionStats | null>(null);
  const [guardrailStats, setGuardrailStats] = useState<GuardrailStats>({ secretsRedacted: 0, piiRemoved: 0, actionsBlocked: 0, approvalsPending: 0 });
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [storyNodes, setStoryNodes] = useState<StoryNode[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [foundrySources, setFoundrySources] = useState<FoundrySource[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!incidentId) return;

    ws.current = new WebSocket(`ws://127.0.0.1:8000/api/v1/ws/investigate/${incidentId}`);

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case 'plan':
          setPlanSteps(data.steps);
          break;
        case 'plan_update':
          setPlanSteps(prev => prev.map(step => 
            step.id === data.step_id ? { ...step, status: data.status, summary: data.summary || step.summary } : step
          ));
          break;
        case 'mission_update':
          setMissionStats({
            status: data.status,
            elapsed: data.elapsed,
            agentsRunning: data.agents_running,
            eventsCorrelated: data.events_correlated,
            confidence: data.confidence,
            guardrail: data.guardrail,
            sourcesRetrieved: data.sources_retrieved || 0
          });
          break;
        case 'thought':
          setThoughts(prev => [...prev, { agent: data.agent, message: data.message, confidence: data.confidence, timestamp: data.timestamp }]);
          break;
        case 'story_update':
          setStoryNodes(prev => [...prev, { time: data.time, text: data.text, technique: data.technique, confidence: data.confidence }]);
          break;
        case 'guardrail_update':
          setGuardrailStats({
            secretsRedacted: data.secrets_redacted,
            piiRemoved: data.pii_removed,
            actionsBlocked: data.actions_blocked,
            approvalsPending: data.approvals_pending
          });
          break;
        case 'recommendation_update':
          setRecommendations(data.recommendations);
          break;
        case 'foundry_source_update':
          setFoundrySources(data.sources);
          break;
        case 'investigation_complete':
          setIsComplete(true);
          break;
      }
    };

    return () => {
      if (ws.current) ws.current.close();
    };
  }, [incidentId]);

  return { planSteps, missionStats, guardrailStats, thoughts, storyNodes, recommendations, foundrySources, isComplete, scenarioId: incidentId };
}
