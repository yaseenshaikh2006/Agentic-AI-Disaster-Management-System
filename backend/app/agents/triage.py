import os
import json
import asyncio
from google import genai
from google.genai import types
from dotenv import load_dotenv
from app.schemas.models import AgentTriageResult

# Load environment variables from .env
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

# Initialize Client explicitly with API key
client = genai.Client(api_key=api_key)

TRIAGE_SYSTEM_PROMPT = """
You are an Emergency Operations Center (EOC) Damage Assessment and Triage Agent.
Analyze the citizen-submitted incident report and output a strictly valid JSON response.

Evaluation guidelines:
1. severity_level: Must be one of ["Critical", "High", "Moderate", "Low"].
2. confidence_score: Float between 0.0 and 1.0.
3. detected_hazards: Array of concise danger tags (e.g., ["flood_inundation", "structural_failure", "downed_power_lines"]).
4. recommended_assets: Tactical units required (e.g., ["Heavy Water Pump", "NDRF Search and Rescue", "Structural Engineers"]).
5. action_summary: Brief 1-2 sentence military/tactical instruction for first responders.

Return ONLY a JSON object matching this structure:
{
  "severity_level": "Critical",
  "confidence_score": 0.95,
  "detected_hazards": ["flood_inundation"],
  "recommended_assets": ["Inflatable Rescue Boat"],
  "action_summary": "Dispatch rescue team immediately."
}
"""

async def assess_incident(title: str, description: str, image_url: str = None) -> AgentTriageResult:
    prompt_content = f"Title: {title}\nDescription: {description}"
    
    # Avoid appending browser-internal blob: URLs that cannot resolve externally
    if image_url and not str(image_url).startswith("blob:"):
        prompt_content += f"\nVisual Evidence Source: {image_url}"

    try:
        loop = asyncio.get_running_loop()

        def _call_gemini():
            return client.models.generate_content(
                model="gemini-3.6-flash",
                contents=prompt_content,
                config=types.GenerateContentConfig(
                    system_instruction=TRIAGE_SYSTEM_PROMPT,
                    response_mime_type="application/json",
                    temperature=0.1
                ),
            )

        # Strict 5.0 second cutoff: prevents Cloudflare gateway timeouts (502/504)
        response = await asyncio.wait_for(
            loop.run_in_executor(None, _call_gemini),
            timeout=5.0
        )

        parsed_data = json.loads(response.text)
        return AgentTriageResult(**parsed_data)

    except Exception as e:
        print(f"[Agent 2 Resilient Fallback Activated]: {e}")
        desc_lower = description.lower() if description else ""

        if any(w in desc_lower for w in ["flood", "water", "waterlogging", "submerged", "drown", "drainage"]):
            fallback_severity = "High"
            conf = 0.89
            hazards = ["water_ingress", "localized_flooding", "submerged_obstacles"]
            assets = ["Inflatable Rescue Boat", "High-Clearance Evacuation Vehicles"]
            instruction = "Dispatch drainage pump units and aquatic rescue teams to establish water diversion and perimeter safety."
        elif any(w in desc_lower for w in ["fire", "blaze", "smoke", "explosion"]):
            fallback_severity = "Critical"
            conf = 0.94
            hazards = ["thermal_threat", "smoke_inhalation", "structural_compromise"]
            assets = ["Fire & Rescue Battalion", "EMS High-Priority Unit"]
            instruction = "Deploy fire suppression engines immediately and secure a 500m evacuation perimeter."
        elif any(w in desc_lower for w in ["electric", "wire", "pole", "power", "grid"]):
            fallback_severity = "Moderate"
            conf = 0.85
            hazards = ["power_outage", "fallen_lines", "electrical_short_risk"]
            assets = ["Utility Grid Repair Crew", "Mobile Power Generator"]
            instruction = "Isolate local electrical grid feeder and dispatch utility technicians for emergency line repair."
        else:
            fallback_severity = "High" if ("crack" in desc_lower or "storm" in desc_lower) else "Moderate"
            conf = 0.80
            hazards = ["structural_stress", "localized_disruption"]
            assets = ["First Responder Recon Unit", "Civil Protection Team"]
            instruction = "Deploy rapid reconnaissance team to verify site stability and assist nearby civilians."

        return AgentTriageResult(
            severity_level=fallback_severity,
            confidence_score=conf,
            detected_hazards=hazards,
            recommended_assets=assets,
            action_summary=instruction
        ) 
    