import json
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel, create_engine, Session
from core.config import settings
from agents.orchestrator import InvestigationOrchestrator
import contextlib

engine = create_engine(settings.DATABASE_URL, connect_args={"check_same_thread": False})

@contextlib.asynccontextmanager
async def lifespan(app: FastAPI):
    SQLModel.metadata.create_all(engine)
    yield

app = FastAPI(title=settings.PROJECT_NAME, lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "SentinelIQ Backend API is running."}


@app.websocket("/api/v1/ws/investigate/{incident_id}")
async def websocket_investigate(websocket: WebSocket, incident_id: str):
    await websocket.accept()
    orchestrator = InvestigationOrchestrator()
    try:
        async for event in orchestrator.run_investigation(incident_id, incident_id, "fast"):
            await websocket.send_text(json.dumps(event))
    except Exception as e:
        await websocket.send_text(json.dumps({"error": str(e)}))
    finally:
        await websocket.close()
