import uuid
from datetime import datetime
from fastapi import APIRouter, HTTPException
from app.schemas.models import IncidentReportCreate, IncidentRecord
from app.agents.triage import assess_incident

router = APIRouter(prefix="/api/incidents", tags=["Incidents & Triage"])

# In-memory store for active operational sessions
INCIDENTS_DATABASE = []

@router.post("/report", response_model=IncidentRecord)
async def submit_incident_report(report: IncidentReportCreate):
    # Trigger Agent 2: Damage Assessment and Triage
    triage_result = await assess_incident(
        title=report.title,
        description=report.description,
        image_url=report.image_url
    )

    # Persist record
    record = IncidentRecord(
        id=f"INC-{uuid.uuid4().hex[:6].upper()}",
        title=report.title,
        description=report.description,
        latitude=report.latitude,
        longitude=report.longitude,
        image_url=report.image_url,
        triage=triage_result,
        created_at=datetime.utcnow()
    )
    
    INCIDENTS_DATABASE.insert(0, record)
    return record

@router.get("/", response_model=list[IncidentRecord])
async def list_all_incidents():
    return INCIDENTS_DATABASE
