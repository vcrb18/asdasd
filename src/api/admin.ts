import client from './client';

export async function postExamIdToAI(examId: string) {
  const response = await client.post(`/ai_analysis/notify/${examId}?forced=true`, { withCredentials: true });

  return response;
}

export async function getAcceptanceThresholds() {
  const response = await client.get(`/acceptance_thresholds`, { withCredentials: true });

  return response;
}

export async function updateAcceptanceThresholds(name: string, threshold: number) {
  const response = await client.post(`/acceptance_thresholds`, {
    withCredentials: true,
    name: name,
    threshold: threshold,
  });

  return response;
}

export async function activateAI(timeActive: number, organizationIds: number[], allOrganizations: boolean) {
  const response = await client.post(`/ai_analysis/activate`, {
    withCredentials: true,
    time: timeActive,
    organizations: organizationIds,
    allOrganizations: allOrganizations,
  });

  return response;
}

export async function deactivateAI(organizationIds: number[], allOrganizations: boolean) {
  const response = await client.post(`/ai_analysis/deactivate`, {
    withCredentials: true,
    organizations: organizationIds,
    allOrganizations: allOrganizations,
  });

  return response;
}

export async function getActiveAIOrganizations() {
  const response = await client.get(`/ai_analysis/`, { withCredentials: true });

  return response;
}

export async function getNormalThresholdMarkers() {
  const response = await client.get(`/normal_threshold_markers`, { withCredentials: true });

  return response;
}

export async function updateNormalThresholdMarkers(fiducialPoint: string, lowerLimit: number, upperLimit: number) {
  const response = await client.post(`/normal_threshold_markers`, {
    withCredentials: true,
    fiducialPoint: fiducialPoint,
    lowerLimit: lowerLimit,
    upperLimit: upperLimit,
  });

  return response;
}
