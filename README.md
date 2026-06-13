# SentinelIQ

## Project Overview
SentinelIQ is an AI-powered, autonomous security incident investigation platform built for enterprise SOC teams. It leverages a coordinated swarm of specialized agents to investigate cyber incidents, reconstruct attack timelines, identify root causes, and ground remediation recommendations using Enterprise Knowledge via Foundry IQ.

## Problem Statement
Modern Security Operations Centers (SOCs) are overwhelmed by alert fatigue, fragmented data, and slow manual investigation processes. Analysts spend hours manually correlating threat intelligence, digging through logs, and mapping events to frameworks like MITRE ATT&CK before they can even begin remediation. SentinelIQ automates this entire pipeline instantly and deterministically.

## Screenshots

- **Home Dashboard**: `![Home Dashboard](./docs/assets/home_dashboard.png)`
- **Executive War Room**: `![Executive War Room](./docs/assets/war_room.png)`
- **Phishing Investigation**: `![Phishing Investigation](./docs/assets/phishing.png)`
- **Ransomware Investigation**: `![Ransomware Investigation](./docs/assets/ransomware.png)`
- **Insider Threat Investigation**: `![Insider Threat Investigation](./docs/assets/insider.png)`
- **Foundry IQ Knowledge Center**: `![Knowledge Center](./docs/assets/knowledge.png)`
- **Settings & Configuration**: `![Settings](./docs/assets/settings.png)`

## 🏆 Quick Start (Judge Guide)

### Environment Setup
Before running the application, copy the example environment file.

On Linux/macOS:
```bash
cp .env.example .env
```
On Windows:
```cmd
copy .env.example .env
```

### Docker Setup
Start the application using Docker Compose (Note: Our Dockerfile is optimized for CPU-inference to guarantee rapid build times for local evaluation):
```bash
git clone <repo>
cd SentinelIQ
cp .env.example .env
docker compose up --build
```

**Open the Application:**
Navigate to [http://localhost:5173](http://localhost:5173) in your browser.

## Architecture
SentinelIQ utilizes a React (Vite/Tailwind) frontend communicating via WebSockets to a FastAPI Python backend. The backend orchestrates a multi-agent investigation lifecycle using deterministic flows and embeds enterprise knowledge via a local FAISS vector database.

For a detailed breakdown, please see our [Architecture Diagram](./docs/architecture.md).

## Microsoft Agents League & Foundry IQ Integration
This project directly addresses the **Microsoft Agents League** hackathon requirements by utilizing a multi-agent framework grounded in enterprise reality. 
- **Foundry IQ (RAG)**: We integrated a semantic retrieval system (`FAISS` and `sentence-transformers`) that mimics Foundry IQ. Agents pull real-time enterprise policies, NIST guidelines, and MITRE playbooks to validate their findings. Click `[Why?]` on generated response plans to see the deterministic source grounding.

## Multi-Agent Workflow
1. **Alert Ingestion**: Incident triggers the orchestrator.
2. **Timeline Reconstruction Agent**: Rebuilds the narrative.
3. **Threat Intelligence Agent**: Correlates IOCs and CVEs.
4. **Risk Assessment Agent**: Evaluates business impact.
5. **Compliance Guardrails**: Intercepts PII, secrets, or destructive API calls.
6. **Response Planning Agent**: Grounds remediation in Foundry IQ playbooks.

## Demo Scenarios
Click one of the following scenarios on the home screen to watch the autonomous investigation:
- **Phishing**: Credential theft via macro.
- **Ransomware**: Lateral movement & encryption.
- **Insider Threat**: Data exfiltration & anomalies.

## Features
- **Investigation Plan**: Watch agents check off tasks in real-time.
- **Attack Story Mode**: A cinematic, human-readable timeline mapping directly to MITRE ATT&CK.
- **Compliance Guardrail**: Visual interception of PII or destructive scripts.
- **War Room**: The final auto-generated executive summary with a correlated evidence graph.

## Tech Stack
- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Python, FastAPI, WebSockets
- **AI/Data**: FAISS (CPU), sentence-transformers, PyTorch
- **Deployment**: Docker, Docker Compose

## Running Locally (Without Docker)

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
pip install torch faiss-cpu sentence-transformers --extra-index-url https://download.pytorch.org/whl/cpu
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Documentation Package
We have prepared a complete demo package for judges:
- [Architecture Diagram](./docs/architecture.md)
- [Workflow Diagram](./docs/workflow.md)
- [Judge Walkthrough](./docs/judge_walkthrough.md)
- [Pitch Script](./docs/pitch_script.md)

## Author
**Analyst: S. Sujan**
