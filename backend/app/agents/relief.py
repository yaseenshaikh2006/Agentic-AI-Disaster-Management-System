from pydantic import BaseModel, Field
from typing import List

class ReliefSupplyItem(BaseModel):
    category: str
    available_units: int
    critical_threshold: int
    status: str

class ShelterStatus(BaseModel):
    shelter_id: str
    name: str
    capacity: int
    occupied: int
    occupancy_rate: float
    status: str

class DispatchRecommendation(BaseModel):
    mission_id: str
    target_incident_id: str
    assigned_unit: str
    supplies_allocated: List[str]
    estimated_arrival_minutes: int
    priority: str

def compute_relief_plan(incident_id: str, severity: str, hazards: List[str]) -> DispatchRecommendation:
    """Agent 3 heuristic optimization: Matches incident severity to nearest asset reserves."""
    if severity in ["Critical", "High"]:
        assigned_unit = "NDRF Rapid Deployment Unit 4"
        allocated = ["500x Water Ration Kits", "50x Trauma Hemostatic Packs", "2x Inflatable Zodiac Boats"]
        eta = 22
        priority = "URGENT"
    else:
        assigned_unit = "Civil Defense Volunteer Fleet B"
        allocated = ["100x Clean Water Packets", "20x First Aid Standard Boxes"]
        eta = 45
        priority = "ROUTINE"

    return DispatchRecommendation(
        mission_id=f"DISPATCH-{incident_id[:8]}",
        target_incident_id=incident_id,
        assigned_unit=assigned_unit,
        supplies_allocated=allocated,
        estimated_arrival_minutes=eta,
        priority=priority
    )
