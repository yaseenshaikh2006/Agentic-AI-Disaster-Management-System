import httpx
from typing import List, Optional
from fastapi import APIRouter
from app.agents.prediction import calculate_hazard_risk, TelemetryInput, HazardAssessment

router = APIRouter(prefix="/api/telemetry", tags=["Prediction & Early Warning (Agent 1)"])

# Mumbai monitoring sectors with geographic coordinates
MONITORED_STATIONS = [
    {
        "zone_id": "ZONE-KURLA-EAST",
        "name": "Kurla / BKC (Mithi River Basin)",
        "lat": 19.0657,
        "lon": 72.8687,
        "pop_density": 28000,
        "base_saturation": 0.65,
    },
    {
        "zone_id": "ZONE-DADAR-TIDE",
        "name": "Dadar / Hindmata Low-Point",
        "lat": 19.0178,
        "lon": 72.8478,
        "pop_density": 22000,
        "base_saturation": 0.55,
    },
    {
        "zone_id": "ZONE-ANDHERI-SUBWAY",
        "name": "Andheri Subway Corridor",
        "lat": 19.1197,
        "lon": 72.8464,
        "pop_density": 25000,
        "base_saturation": 0.50,
    },
    {
        "zone_id": "ZONE-COLABA-COAST",
        "name": "Colaba Coastal Line",
        "lat": 18.9067,
        "lon": 72.8147,
        "pop_density": 18000,
        "base_saturation": 0.40,
    },
]

# Preserved mock scenarios for stress tests & offline presentation mode
MOCK_ZONES = [
    TelemetryInput(
        zone_id="ZONE-KURLA-EAST",
        precipitation_mm_hr=92.4,
        water_level_deviation_m=1.9,
        soil_saturation_index=0.91,
        population_density_sq_km=28000,
    ),
    TelemetryInput(
        zone_id="ZONE-DADAR-TIDE",
        precipitation_mm_hr=45.0,
        water_level_deviation_m=0.8,
        soil_saturation_index=0.62,
        population_density_sq_km=22000,
    ),
    TelemetryInput(
        zone_id="ZONE-ANDHERI-SUBWAY",
        precipitation_mm_hr=78.2,
        water_level_deviation_m=1.5,
        soil_saturation_index=0.84,
        population_density_sq_km=25000,
    ),
]

async def fetch_live_sector_telemetry(station: dict) -> TelemetryInput:
    """Fetches real-time precipitation and models physical telemetry inputs."""
    url = (
        f"https://api.open-meteo.com/v1/forecast?"
        f"latitude={station['lat']}&longitude={station['lon']}&"
        f"current=precipitation,rain,relative_humidity_2m"
    )
    try:
        async with httpx.AsyncClient(timeout=4.0) as client:
            res = await client.get(url)
            data = res.json().get("current", {})

            rain = float(data.get("precipitation", 0.0) or data.get("rain", 0.0))
            humidity = float(data.get("relative_humidity_2m", 65.0))

            # Dynamic proxy calculation: rain drives levee height and soil saturation
            water_level = round(min(rain * 0.05, 2.5), 2)
            soil_sat = round(min(station["base_saturation"] + (humidity / 350.0) + (rain * 0.005), 1.0), 2)

            return TelemetryInput(
                zone_id=station["zone_id"],
                precipitation_mm_hr=rain,
                water_level_deviation_m=water_level,
                soil_saturation_index=soil_sat,
                population_density_sq_km=station["pop_density"],
            )
    except Exception as err:
        print(f"Weather fetch failed for {station['zone_id']}, applying default telemetry: {err}")
        return TelemetryInput(
            zone_id=station["zone_id"],
            precipitation_mm_hr=1.5,
            water_level_deviation_m=0.1,
            soil_saturation_index=0.35,
            population_density_sq_km=station["pop_density"],
        )

@router.get("/active-warnings", response_model=List[HazardAssessment])
async def get_active_hazard_warnings(live: bool = True):
    """
    Polls real-time stations through Agent 1's mathematical model.
    Pass ?live=false to run against extreme emergency mock scenarios.
    """
    if not live:
        return [calculate_hazard_risk(zone) for zone in MOCK_ZONES]

    assessments = []
    for station in MONITORED_STATIONS:
        telemetry_data = await fetch_live_sector_telemetry(station)
        assessment = calculate_hazard_risk(telemetry_data)
        assessments.append(assessment)

    return assessments

@router.post("/evaluate-zone", response_model=HazardAssessment)
async def evaluate_custom_zone(telemetry: TelemetryInput):
    """Allows manual sensor ingestion to test hazard scoring."""
    return calculate_hazard_risk(telemetry)
