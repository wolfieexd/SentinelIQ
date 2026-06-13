import asyncio
from datetime import datetime
from typing import AsyncGenerator, Dict, Any
from models.events import (
    PlanEvent, PlanStep, PlanUpdateEvent, MissionUpdateEvent,
    ThoughtEvent, StoryUpdateEvent, GuardrailUpdateEvent,
    RecommendationUpdateEvent, ActionRecommendation, InvestigationCompleteEvent,
    FoundrySourceUpdateEvent
)
from integration.foundry import FoundryIQIntegration

class InvestigationOrchestrator:
    def __init__(self):
        self.workflow_state = "INITIALIZING"
        self.foundry = FoundryIQIntegration()
        
    async def run_investigation(self, incident_id: str, scenario: str, mode: str = "fast") -> AsyncGenerator[Dict[str, Any], None]:
        speed = 0.5 if mode == "fast" else 1.5
        
        # Determine RAG Query based on scenario
        rag_query = ""
        if scenario == "ransomware":
            rag_query = "ransomware lateral movement isolation"
        elif scenario == "insider":
            rag_query = "insider threat data exfiltration USB"
        else:
            rag_query = "phishing account compromise credential reset"
            
        # Pre-fetch Foundry sources
        retrieved_sources = self.foundry.query(rag_query, top_k=3)
        num_sources = len(retrieved_sources)
        
        # Emit initial Plan
        yield PlanEvent(
            timestamp=datetime.utcnow().isoformat(),
            steps=[
                PlanStep(id="ingest", name="Ingest and normalize evidence", status="active", summary="Indexing 5 sources"),
                PlanStep(id="correlate", name="Parse and correlate log events", status="pending"),
                PlanStep(id="timeline", name="Reconstruct attack timeline", status="pending"),
                PlanStep(id="mitre", name="Map ATT&CK techniques", status="pending"),
                PlanStep(id="risk", name="Assess risk and business impact", status="pending"),
                PlanStep(id="response", name="Generate response plan", status="pending"),
                PlanStep(id="guardrail", name="Guardrail validation", status="pending")
            ]
        ).model_dump()
        
        # Initial Mission Update
        yield MissionUpdateEvent(
            timestamp=datetime.utcnow().isoformat(),
            status="ACTIVE", elapsed="00:03", agents_running=7, events_correlated=0, confidence=0, guardrail="STANDBY", sources_retrieved=0
        ).model_dump()
        
        await asyncio.sleep(speed)
        
        # 3-8 sec: Plan updates, Mission Control, Reasoning
        yield PlanUpdateEvent(timestamp=datetime.utcnow().isoformat(), step_id="ingest", status="complete", summary="1,788 events").model_dump()
        yield PlanUpdateEvent(timestamp=datetime.utcnow().isoformat(), step_id="correlate", status="active", summary="Correlating").model_dump()
        yield MissionUpdateEvent(timestamp=datetime.utcnow().isoformat(), status="ACTIVE", elapsed="00:05", agents_running=7, events_correlated=247, confidence=45, guardrail="ACTIVE", sources_retrieved=0).model_dump()
        yield ThoughtEvent(timestamp=datetime.utcnow().isoformat(), agent="Timeline Reconstruction Agent", message="247 events successfully correlated across sources.", confidence=95).model_dump()
        yield PlanUpdateEvent(timestamp=datetime.utcnow().isoformat(), step_id="correlate", status="complete", summary="247 events").model_dump()
        
        await asyncio.sleep(speed * 2)
        
        # 8-12 sec: Evidence Graph, Attack Story, MITRE
        yield PlanUpdateEvent(timestamp=datetime.utcnow().isoformat(), step_id="timeline", status="active", summary="Building graph").model_dump()
        
        if scenario == "ransomware":
            yield StoryUpdateEvent(timestamp=datetime.utcnow().isoformat(), time="02:14", text="Suspicious RDP login detected.", technique="T1133", confidence=90).model_dump()
            yield ThoughtEvent(timestamp=datetime.utcnow().isoformat(), agent="Threat Intelligence Agent", message="Identified initial access vector: External Remote Services (T1133)", confidence=90, sources_used="TI DB").model_dump()
            await asyncio.sleep(speed)
            yield StoryUpdateEvent(timestamp=datetime.utcnow().isoformat(), time="02:22", text="Lateral movement via SMB.", technique="T1021.002", confidence=95).model_dump()
        elif scenario == "insider":
            yield StoryUpdateEvent(timestamp=datetime.utcnow().isoformat(), time="03:02", text="Badge Access Detected at odd hours.", technique="T1078", confidence=99).model_dump()
            yield ThoughtEvent(timestamp=datetime.utcnow().isoformat(), agent="Threat Intelligence Agent", message="Identified behavioral anomaly: Unusual physical access.", confidence=95, sources_used="Badge Logs").model_dump()
            await asyncio.sleep(speed)
            yield StoryUpdateEvent(timestamp=datetime.utcnow().isoformat(), time="03:11", text="Sensitive SharePoint Downloads.", technique="T1213.002", confidence=98).model_dump()
            await asyncio.sleep(speed / 2)
            yield StoryUpdateEvent(timestamp=datetime.utcnow().isoformat(), time="03:17", text="EDR Agent Disabled.", technique="T1562.001", confidence=100).model_dump()
        else:
            yield StoryUpdateEvent(timestamp=datetime.utcnow().isoformat(), time="09:12", text="Employee opened a phishing email.", technique="T1566.001", confidence=94).model_dump()
            yield ThoughtEvent(timestamp=datetime.utcnow().isoformat(), agent="Threat Intelligence Agent", message="Identified initial access vector: Spearphishing Attachment (T1566.001)", confidence=94, sources_used="TI DB").model_dump()
            await asyncio.sleep(speed)
            yield StoryUpdateEvent(timestamp=datetime.utcnow().isoformat(), time="09:14", text="Macro execution via Word.", technique="T1059.001", confidence=98).model_dump()
            
        yield PlanUpdateEvent(timestamp=datetime.utcnow().isoformat(), step_id="timeline", status="complete", summary="Timeline compiled").model_dump()
        yield PlanUpdateEvent(timestamp=datetime.utcnow().isoformat(), step_id="mitre", status="complete", summary="Techniques mapped").model_dump()
        yield MissionUpdateEvent(timestamp=datetime.utcnow().isoformat(), status="ACTIVE", elapsed="00:10", agents_running=5, events_correlated=1788, confidence=82, guardrail="ACTIVE", sources_retrieved=0).model_dump()
        
        await asyncio.sleep(speed * 2)
        
        # 12-16 sec: Guardrail catches PII/Secrets, Risk Assessed
        yield PlanUpdateEvent(timestamp=datetime.utcnow().isoformat(), step_id="risk", status="complete", summary="Score: 87/100").model_dump()
        yield PlanUpdateEvent(timestamp=datetime.utcnow().isoformat(), step_id="guardrail", status="active", summary="Scanning outputs").model_dump()
        
        if scenario == "ransomware":
            yield ThoughtEvent(timestamp=datetime.utcnow().isoformat(), agent="Compliance Guardrail Agent", message="Intercepted destructive script execution command.", confidence=100).model_dump()
            yield GuardrailUpdateEvent(timestamp=datetime.utcnow().isoformat(), secrets_redacted=0, pii_removed=0, actions_blocked=1, approvals_pending=2).model_dump()
            yield StoryUpdateEvent(timestamp=datetime.utcnow().isoformat(), time="02:35", text="Mass file encryption started.", technique="T1486", confidence=99).model_dump()
        elif scenario == "insider":
            yield ThoughtEvent(timestamp=datetime.utcnow().isoformat(), agent="Compliance Guardrail Agent", message="Intercepted USB transfer of PII database.", confidence=100).model_dump()
            yield GuardrailUpdateEvent(timestamp=datetime.utcnow().isoformat(), secrets_redacted=0, pii_removed=18500, actions_blocked=1, approvals_pending=1).model_dump()
            yield StoryUpdateEvent(timestamp=datetime.utcnow().isoformat(), time="03:26", text="USB Device Connected.", technique="T1052.001", confidence=95).model_dump()
            await asyncio.sleep(speed / 2)
            yield StoryUpdateEvent(timestamp=datetime.utcnow().isoformat(), time="03:31", text="Data Exfiltration Suspected.", technique="T1048", confidence=92).model_dump()
        else:
            yield ThoughtEvent(timestamp=datetime.utcnow().isoformat(), agent="Compliance Guardrail Agent", message="Intercepted AWS Secret Key (AKIAIOS...) in log dump.", confidence=100).model_dump()
            yield GuardrailUpdateEvent(timestamp=datetime.utcnow().isoformat(), secrets_redacted=5, pii_removed=12, actions_blocked=2, approvals_pending=1).model_dump()
            yield StoryUpdateEvent(timestamp=datetime.utcnow().isoformat(), time="09:23", text="Credential dump (LSASS).", technique="T1003.001", confidence=91).model_dump()
        
        await asyncio.sleep(speed * 2)
        
        # 16-20 sec: Response Plan, Foundry IQ, Investigation Complete
        if scenario == "phishing":
            yield StoryUpdateEvent(timestamp=datetime.utcnow().isoformat(), time="09:31", text="Exfiltration to external IP.", technique="T1048.002", confidence=83).model_dump()
            
        yield PlanUpdateEvent(timestamp=datetime.utcnow().isoformat(), step_id="response", status="active", summary="Grounding with Foundry IQ").model_dump()
        await asyncio.sleep(speed)
        
        # Emit the actual retrieved sources!
        if retrieved_sources:
            yield FoundrySourceUpdateEvent(timestamp=datetime.utcnow().isoformat(), sources=retrieved_sources).model_dump()
            yield MissionUpdateEvent(timestamp=datetime.utcnow().isoformat(), status="ACTIVE", elapsed="00:16", agents_running=3, events_correlated=1788, confidence=90, guardrail="ACTIVE", sources_retrieved=num_sources).model_dump()
        
        yield RecommendationUpdateEvent(
            timestamp=datetime.utcnow().isoformat(),
            recommendations=[
                ActionRecommendation(id=1, action="Isolate Endpoint", action_type="Containment", risk="Low", source="Foundry IQ", impact="Interrupts user session"),
                ActionRecommendation(id=2, action="Revoke Credentials", action_type="Containment", risk="Medium", source="Foundry IQ", impact="Affects AD account")
            ]
        ).model_dump()
        yield PlanUpdateEvent(timestamp=datetime.utcnow().isoformat(), step_id="response", status="complete", summary="Response generated").model_dump()
        yield PlanUpdateEvent(timestamp=datetime.utcnow().isoformat(), step_id="guardrail", status="complete", summary="PASSED WITH REDACTIONS").model_dump()
        yield MissionUpdateEvent(timestamp=datetime.utcnow().isoformat(), status="COMPLETE", elapsed="00:18", agents_running=0, events_correlated=1788, confidence=94, guardrail="PASSED", sources_retrieved=num_sources).model_dump()
        yield InvestigationCompleteEvent(timestamp=datetime.utcnow().isoformat()).model_dump()
