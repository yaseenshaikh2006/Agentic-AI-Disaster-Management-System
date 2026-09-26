from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class IncidentReportCreate(BaseModel):
    title: str = Field(..., example="Severe Waterlogging and Structural Cracks")
    description: str = Field(..., example="Basement parking submerged, visible wall fracture on ground floor.")
    latitude: float = Field(..., example=19.0760)
    longitude: float = Field(..., example=72.8777)
    image_url: Optional[str] = Field(None, example="https://res.cloudinary.com/demo/image/upload/sample.jpg")
    reported_by: Optional[str] = Field("Citizen_Anonymous")

class AgentTriageResult(BaseModel):
    severity_level: str = Field(..., example="Critical")  # Critical, High, Moderate, Low
    confidence_score: float = Field(..., example=0.94)
    detected_hazards: List[str] = Field(default_factory=list, example=["structural_damage", "flood_inundation"])
    recommended_assets: List[str] = Field(default_factory=list, example=["NDRF Rescue Boat", "Shoring Crew"])
    action_summary: str = Field(..., example="Immediate evacuation required due to potential foundation collapse.")

class IncidentRecord(BaseModel):
    id: str
    title: str
    description: str
    latitude: float
    longitude: float
    image_url: Optional[str]
    triage: AgentTriageResult
    created_at: datetime