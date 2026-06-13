# SentinelIQ Architecture

## High-Level System Design

```mermaid
graph TD
    subgraph Frontend [React / Vite Client]
        UI[UI Components]
        State[useInvestigation Hook]
        UI <-->|Props & State| State
    end

    subgraph Backend [FastAPI Server]
        WS[WebSocket Endpoint]
        Orch[Investigation Orchestrator]
        Agents[Specialist Agents]
        Foundry[Foundry IQ RAG]
        
        WS <--> Orch
        Orch --> Agents
        Orch --> Foundry
    end

    subgraph Data [Knowledge Base]
        FAISS[(FAISS Vector Store)]
        Docs[NIST / MITRE / Policies]
        
        Foundry -->|Embeds & Queries| FAISS
        Docs --> FAISS
    end

    State <-->|WS stream| WS
```

## Core Components
- **Frontend**: React 18, TailwindCSS v3 (Custom SOC Dark Theme).
- **Backend**: FastAPI for robust WebSocket streaming and Orchestrator logic.
- **RAG Engine**: `sentence-transformers` (`all-MiniLM-L6-v2`) and `faiss-cpu` for real-time semantic evidence grounding.
