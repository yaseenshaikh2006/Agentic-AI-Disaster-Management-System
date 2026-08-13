export function calculateRisk(disasterType, severity) {
  let score = 0;

  // Severity score
  const severityScores = {
    Low: 1,
    Medium: 2,
    High: 3,
    Critical: 4,
  };

  score += severityScores[severity] || 0;

  // Disaster-specific risk
  const disasterScores = {
    Flood: 2,
    Fire: 2,
    Earthquake: 3,
    Cyclone: 3,
    Landslide: 3,
  };

  score += disasterScores[disasterType] || 0;

  if (score >= 7) {
    return {
      level: "Critical Risk",
      color: "bg-red-600",
      textColor: "text-red-700",
      icon: "🚨",
      message: "Immediate attention and emergency response required.",
    };
  }

  if (score >= 5) {
    return {
      level: "High Risk",
      color: "bg-orange-500",
      textColor: "text-orange-700",
      icon: "🔴",
      message: "High priority situation. Authorities should respond quickly.",
    };
  }

  if (score >= 3) {
    return {
      level: "Medium Risk",
      color: "bg-yellow-500",
      textColor: "text-yellow-700",
      icon: "🟡",
      message: "Situation requires monitoring and preventive action.",
    };
  }

  return {
    level: "Low Risk",
    color: "bg-green-500",
    textColor: "text-green-700",
    icon: "🟢",
    message: "Low immediate risk. Continue monitoring the situation.",
  };
}