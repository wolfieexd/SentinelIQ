# SentinelIQ: Judge Walkthrough

Welcome to the SentinelIQ demo. Follow these exact steps to ensure a flawless presentation.

## Setup
1. Ensure the Python backend is running: `cd backend && uvicorn main:app --reload`
2. Ensure the Vite frontend is running: `cd frontend && npm run dev`
3. Open your browser to `http://localhost:5173`
4. Maximize the browser window.

## The Demo (The "Insider Threat" Flow)

**1. The Home Screen**
- Point out the clean, professional, non-startup aesthetic.
- Explain that we are selecting the **Insider Threat** scenario.
- Click **[Insider Threat]**.

**2. The Workspace (0-15 seconds)**
- Do not click anything during this phase. Let the system run automatically.
- **Point out the Mission Control Bar**: Show how it tracks "Agents Running", "Events Correlated", and the new **"Sources Retrieved"** counter.
- **Point out the Attack Story**: Watch it dynamically populate with the 3:00 AM badge swipe and the USB connection.
- **Highlight the Guardrail Panel**: When the data exfiltration occurs, watch the Guardrail panel turn red, proving that the system intercepted PII before it left the network.

**3. The Decision Center (15-20 seconds)**
- The Response Plan will generate at the bottom right.
- Tell the judges: "We don't just rely on hallucinations. Our agents ground every decision."
- Click the **[Why?]** button next to the "Isolate Endpoint" recommendation.
- The **Foundry IQ Drawer** will slide out. Show the judges the 3 sources retrieved (IR Playbook, MITRE, Security Policy), proving real semantic RAG is working via FAISS.

**4. The War Room (20 seconds)**
- The investigation completes and automatically transitions into the **War Room**.
- Explain: "Instead of making analysts read logs, we generate a final executive War Room view."
- Highlight the Evidence Graph showing the lateral movement path.
