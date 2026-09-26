from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import incidents, relief, telemetry

app = FastAPI(
    title="AntiCalamity - Agentic AI Disaster Management Engine",
    description="Multi-agent orchestration backend for prediction, damage triage, and relief distribution.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register all 3 agent routers
app.include_router(telemetry.router)
app.include_router(incidents.router)
app.include_router(relief.router)

@app.get("/api/health")
async def health_check():
    return {
        "status": "online",
        "system": "AntiCalamity Agentic Core",
        "agents": {
            "prediction_agent": "active",
            "triage_agent": "active",
            "relief_agent": "active"
        }
    }
