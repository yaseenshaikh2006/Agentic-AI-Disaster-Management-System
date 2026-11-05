from pydantic import BaseModel, Field
from typing import List, Optional

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

def compute_relief_plan(incident_id: str, severity: str, hazards: Optional[List[str]] = None) -> DispatchRecommendation:
    """Agent 3 heuristic optimization: Matches incident severity and specific hazard taxonomy to specialized relief assets."""
    hazards_context = " ".join(hazards or []).lower()
    incident_ref = incident_id.lower()
    
    # 1. Mass Medical Emergencies / Trauma / Cardiac
    if any(k in hazards_context or k in incident_ref for k in ["medical", "trauma", "cardiac", "casualty", "hospital", "ambulance", "injured", "blood"]):
        assigned_unit = "Mumbai Emergency Paramedic Fleet 1"
        allocated = [
            "100x Advanced Life Support Kits",
            "50x Hemostatic Trauma Packs",
            "15x Portable Oxygen Cylinders"
        ]
        eta = 12 if severity in ["Critical", "High"] else 18
        priority = "URGENT"

    # 2. Cyclone / Gale Storms / Structural Wind Surges
    elif any(k in hazards_context or k in incident_ref for k in ["cyclone", "wind", "storm", "surge", "debris", "roof", "squall"]):
        assigned_unit = "Civil Protection Storm Relief Team B"
        allocated = [
            "600x MRE Ration Packs",
            "300x Tarpaulin Weather Proof Sheets",
            "4x Heavy-Duty Mobile Gensets"
        ]
        eta = 16 if severity in ["Critical", "High"] else 25
        priority = "URGENT"

    # 3. Structural Collapse / Confined Space Search / Landslide
    elif any(k in hazards_context or k in incident_ref for k in ["collapse", "rubble", "structural", "crush", "landslide", "entrapment"]):
        assigned_unit = "Shoring & Urban SAR Brigade 3"
        allocated = [
            "12x Hydraulic Spreaders & Cutters",
            "80x Trauma Stabilization Splints",
            "350x High-Energy Food Rations"
        ]
        eta = 14
        priority = "URGENT"

    # 4. Urban Fire / Explosions / Thermal
    elif any(k in hazards_context or k in incident_ref for k in ["fire", "blaze", "thermal", "smoke", "burn"]):
        assigned_unit = "Quick Response Fire Rescue Fleet 2"
        allocated = [
            "40x Burn Trauma Care Dressings",
            "20x Chemical Air Resuscitators",
            "300x Clean Water Packets"
        ]
        eta = 10
        priority = "URGENT"

    # 5. Flood / Inundation (Standard Hydrological Deployment)
    else:
        if severity in ["Critical", "High"]:
            assigned_unit = "NDRF Rapid Deployment Unit 4"
            allocated = [
                "500x Water Ration Kits",
                "50x Trauma Hemostatic Packs",
                "2x Inflatable Zodiac Boats"
            ]
            eta = 22
            priority = "URGENT"
        else:
            assigned_unit = "BMC Ward Evacuation Brigade 2"
            allocated = [
                "200x Clean Water Packets",
                "25x First Aid Standard Boxes",
                "1x High-Clearance Logistics Truck"
            ]
            eta = 35
            priority = "ROUTINE"

    return DispatchRecommendation(
        mission_id=f"DISPATCH-{incident_id[:8].upper()}",
        target_incident_id=incident_id,
        assigned_unit=assigned_unit,
        supplies_allocated=allocated,
        estimated_arrival_minutes=eta,
        priority=priority
    )
