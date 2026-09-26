from fastapi import APIRouter
from app.agents.relief import compute_relief_plan, ReliefSupplyItem, ShelterStatus, DispatchRecommendation

router = APIRouter(prefix="/api/relief", tags=["Relief & Supply Logistics (Agent 3)"])

CURRENT_INVENTORY = [
    ReliefSupplyItem(category="Water Purification Kits", available_units=1420, critical_threshold=500, status="Optimal"),
    ReliefSupplyItem(category="Trauma & First-Aid Packs", available_units=340, critical_threshold=300, status="Warning"),
    ReliefSupplyItem(category="MRE Ration Packs", available_units=2800, critical_threshold=800, status="Optimal"),
    ReliefSupplyItem(category="Inflatable Rescue Rafts", available_units=18, critical_threshold=15, status="Warning"),
]

ACTIVE_SHELTERS = [
    ShelterStatus(shelter_id="SH-01", name="Bandra Municipal High School", capacity=450, occupied=412, occupancy_rate=91.5, status="Critical"),
    ShelterStatus(shelter_id="SH-02", name="Andheri Sports Complex EOC", capacity=1200, occupied=760, occupancy_rate=63.3, status="Operational"),
    ShelterStatus(shelter_id="SH-03", name="Kurla Community Center", capacity=300, occupied=285, occupancy_rate=95.0, status="Full"),
]

@router.get("/inventory", response_model=list[ReliefSupplyItem])
async def get_inventory_status():
    return CURRENT_INVENTORY

@router.get("/shelters", response_model=list[ShelterStatus])
async def get_shelter_capacity():
    return ACTIVE_SHELTERS

@router.post("/optimize-dispatch/{incident_id}", response_model=DispatchRecommendation)
async def generate_dispatch_order(incident_id: str, severity: str = "Critical"):
    return compute_relief_plan(incident_id, severity, ["flood_inundation"])