import client from './client';

export class AdminApi {
  static async postExamIdToAI(examId: string) {
    const response = await client.post(`/ai_analysis/notify/${examId}?forced=true`, { withCredentials: true });

    return response;
  }

  static async getAcceptanceThresholds() {
    const response = await client.get(`/acceptance_thresholds`, { withCredentials: true });

    return response;
  }

  static async updateAcceptanceThresholds(name: string, threshold: number) {
    const response = await client.post(`/acceptance_thresholds`, {
      withCredentials: true,
      name: name,
      threshold: threshold,
    });

    return response;
  }

  static async activateAI(timeActive: number, organizationIds: number[], allOrganizations: boolean) {
    const response = await client.post(`/ai_analysis/activate`, {
      withCredentials: true,
      time: timeActive,
      organizations: organizationIds,
      allOrganizations: allOrganizations,
    });

    return response;
  }

  static async deactivateAI(organizationIds: number[], allOrganizations: boolean) {
    const response = await client.post(`/ai_analysis/deactivate`, {
      withCredentials: true,
      organizations: organizationIds,
      allOrganizations: allOrganizations,
    });

    return response;
  }

  static async getActiveAIOrganizations() {
    const response = await client.get(`/ai_analysis/`, { withCredentials: true });

    return response;
  }

  static async getNormalThresholdMarkers() {
    const response = await client.get(`/normal_threshold_markers`, { withCredentials: true });

    return response;
  }

  static async updateNormalThresholdMarkers(fiducialPoint: string, lowerLimit: number, upperLimit: number) {
    const response = await client.post(`/normal_threshold_markers`, {
      withCredentials: true,
      fiducialPoint: fiducialPoint,
      lowerLimit: lowerLimit,
      upperLimit: upperLimit,
    });

    return response;
  }
}
