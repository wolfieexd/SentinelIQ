from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class BaseEvent(BaseModel):
    type: str
    timestamp: str

class PlanStep(BaseModel):
    id: str
    name: str
    status: str
    summary: str = ""

class PlanEvent(BaseEvent):
    type: str = "plan"
    steps: List[PlanStep]

class PlanUpdateEvent(BaseEvent):
    type: str = "plan_update"
    step_id: str
    status: str
    summary: str = ""

class MissionUpdateEvent(BaseEvent):
    type: str = "mission_update"
    status: str
    elapsed: str
    agents_running: int
    events_correlated: int
    confidence: int
    guardrail: str
    sources_retrieved: int = 0

class ThoughtEvent(BaseEvent):
    type: str = "thought"
    agent: str
    message: str
    confidence: int
    sources_used: Optional[str] = None

class StoryUpdateEvent(BaseEvent):
    type: str = "story_update"
    time: str
    text: str
    technique: str
    confidence: int

class GuardrailUpdateEvent(BaseEvent):
    type: str = "guardrail_update"
    secrets_redacted: int
    pii_removed: int
    actions_blocked: int
    approvals_pending: int
    latest_interception: Optional[Dict[str, Any]] = None

class ActionRecommendation(BaseModel):
    id: int
    action: str
    action_type: str
    risk: str
    source: str
    impact: str

class RecommendationUpdateEvent(BaseEvent):
    type: str = "recommendation_update"
    recommendations: List[ActionRecommendation]

class FoundrySourceUpdateEvent(BaseEvent):
    type: str = "foundry_source_update"
    sources: List[Dict[str, Any]]

class InvestigationCompleteEvent(BaseEvent):
    type: str = "investigation_complete"
