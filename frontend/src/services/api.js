import axios from 'axios';

const api = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const submitIncidentReport = async (payload) => {
  const response = await api.post('/api/incidents/report', payload);
  return response.data;
};

export const submitIncident = submitIncidentReport;

export const listIncidents = async () => {
  const response = await api.get('/api/incidents/');
  return response.data;
};

export const getActiveWarnings = async () => {
  const response = await api.get('/api/telemetry/active-warnings');
  return response.data;
};

export const getIncidentById = async (incidentId) => {
  const response = await api.get(`/api/incidents/${incidentId}`);
  return response.data;
};

export const getReliefInventory = async () => {
  const response = await api.get('/api/relief/inventory');
  return response.data;
};

export const getShelterCapacities = async () => {
  const response = await api.get('/api/relief/shelters');
  return response.data;
};

export const optimizeDispatch = async (incidentId, severity = 'Critical') => {
  const response = await api.post(`/api/relief/optimize-dispatch/${incidentId}?severity=${encodeURIComponent(severity)}`);
  return response.data;
};

export default api; 
