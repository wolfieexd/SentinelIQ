from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List, Dict, Any
from datetime import datetime

class IncidentBase(SQLModel):
    title: str
    scenario: str
    severity: str
    status: str
    description: str

class Incident(IncidentBase, table=True):
    id: Optional[str] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
class FindingBase(SQLModel):
    agent_name: str
    content: str
    confidence: float
    is_redacted: bool = False

class Finding(FindingBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    incident_id: str = Field(foreign_key="incident.id")
