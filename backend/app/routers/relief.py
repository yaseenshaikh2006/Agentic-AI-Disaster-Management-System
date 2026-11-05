from fastapi import APIRouter, Query
from typing import Optional, List
from app.agents.relief import (
    compute_relief_plan, 
    ReliefSupplyItem, 
    ShelterStatus, 
    DispatchRecommendation
)
from app.routers.incidents import INCIDENTS_DATABASE

router = APIRouter(prefix="/api/relief", tags=["Relief & Supply Logistics (Agent 3)"])

CURRENT_INVENTORY = [
    ReliefSupplyItem(category="Water Purification Kits", available_units=1420, critical_threshold=500, status="Optimal"),
    ReliefSupplyItem(category="Trauma & First-Aid Packs", available_units=340, critical_threshold=300, status="Warning"),
    ReliefSupplyItem(category="MRE Ration Packs", available_units=2800, critical_threshold=800, status="Optimal"),
    ReliefSupplyItem(category="Inflatable Rescue Rafts", available_units=18, critical_threshold=15, status="Warning"),
]

ACTIVE_SHELTERS = [
    ShelterStatus(shelter_id="SH-01", name="Bandra Municipal High School", capacity=450, occupied=238, occupancy_rate=52.88, status="Moderate"),
    ShelterStatus(shelter_id="SH-02", name="Andheri Sports Complex EOC", capacity=1200, occupied=1188, occupancy_rate=99.0, status="Critical"),
    ShelterStatus(shelter_id="SH-03", name="Kurla Community Center", capacity=300, occupied=42, occupancy_rate=14.0, status="Optimal"),
]

@router.get("/inventory", response_model=list[ReliefSupplyItem])
async def get_inventory_status():
    return CURRENT_INVENTORY

@router.get("/shelters", response_model=list[ShelterStatus])
async def get_shelter_capacity():
    return ACTIVE_SHELTERS

@router.post("/optimize-dispatch/{incident_id}", response_model=DispatchRecommendation)
async def generate_dispatch_order(
    incident_id: str, 
    severity: str = "Critical",
    hazard: Optional[List[str]] = Query(None)
):
    detected_hazards = list(hazard) if hazard else []

    # If hazards were not provided in query, retrieve them from live in-memory incidents
    if not detected_hazards:
        match = next((inc for inc in INCIDENTS_DATABASE if inc.id == incident_id), None)
        if match and hasattr(match, "triage") and match.triage:
            detected_hazards = getattr(match.triage, "detected_hazards", [])

    return compute_relief_plan(incident_id, severity, detected_hazards)
