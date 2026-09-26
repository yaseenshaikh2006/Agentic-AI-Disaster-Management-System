import math
from pydantic import BaseModel, Field
from typing import List, Optional

class TelemetryInput(BaseModel):
    zone_id: str = Field(..., example="ZONE-MUMBAI-SOUTH")
    precipitation_mm_hr: float = Field(..., example=85.5)  # Rainfall rate
    water_level_deviation_m: float = Field(..., example=1.8) # Levee/riverbank delta
    soil_saturation_index: float = Field(..., example=0.88)  # [0.0 to 1.0]
    population_density_sq_km: int = Field(..., example=21000)

class HazardAssessment(BaseModel):
    zone_id: str
    risk_score: float
    hazard_level: str  # NORMAL, ADVISORY, WARNING, CRITICAL
    evacuation_recommended: bool
    danger_radius_km: float
    alert_message: str

def calculate_hazard_risk(data: TelemetryInput) -> HazardAssessment:
    """
    Implements Geospatial Hazard Potential:
    R = w1*(P / P_max) + w2*(delta_h / h_crit) + w3*S
    """
    P_max = 120.0  # Max reference rain (mm/hr)
    h_crit = 2.0   # Critical water level threshold (m)
    
    w1, w2, w3 = 0.45, 0.35, 0.20
    
    norm_p = min(data.precipitation_mm_hr / P_max, 1.0)
    norm_h = min(max(data.water_level_deviation_m / h_crit, 0.0), 1.0)
    norm_s = min(max(data.soil_saturation_index, 0.0), 1.0)
    
    # Composite risk score R in [0, 1]
    risk_score = round((w1 * norm_p) + (w2 * norm_h) + (w3 * norm_s), 3)
    
    # Dynamic Danger Radius: r = r0 * exp(alpha * R)
    r0 = 1.2
    alpha = 1.5
    danger_radius = round(r0 * math.exp(alpha * risk_score), 2)
    
    if risk_score >= 0.75:
        level = "CRITICAL"
        evac = True
        msg = f"Imminent flash flood and structural collapse danger in {data.zone_id}. Immediate evacuation mandatory."
    elif risk_score >= 0.50:
        level = "WARNING"
        evac = False
        msg = f"Elevated inundation levels detected in {data.zone_id}. Secondary defense deployment recommended."
    elif risk_score >= 0.30:
        level = "ADVISORY"
        evac = False
        msg = f"Moderate runoff observed in {data.zone_id}. Municipal drains monitoring active."
    else:
        level = "NORMAL"
        evac = False
        msg = f"Environmental metrics within nominal thresholds in {data.zone_id}."

    return HazardAssessment(
        zone_id=data.zone_id,
        risk_score=risk_score,
        hazard_level=level,
        evacuation_recommended=evac,
        danger_radius_km=danger_radius,
        alert_message=msg
    )
