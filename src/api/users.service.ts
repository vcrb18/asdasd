import { AxiosResponse } from 'axios';

import client from './client';

export const getExamById = async (examId: number): Promise<AxiosResponse> => {
  return await client.get(`/exams/${examId}`, { withCredentials: true });
};

export const postExamIdAI = async (examId: string) => {
  return client.post(`/ai_analysis/notify/${examId}?forced=true`, { withCredentials: true });
};

export const activateAI = async (timeActive: number, organizationIds: number[], allOrganizations: boolean) => {
  const requestData = {
    withCredentials: true,
    organizations: organizationIds,
    allOrganizations: allOrganizations,
    time: timeActive,
  };

  return client.post('/ai_analysis/activate', requestData);
};

export const deactivateAI = async (organizationIds: number[], allOrganizations: boolean) => {
  const requestData = {
    withCredentials: true,
    organizations: organizationIds,
    allOrganizations: allOrganizations,
  };

  return client.post('/ai_analysis/deactivate', requestData);
};

export const getAIActiveOrganizations = async (): Promise<AxiosResponse> => {
  return client.get(`/ai_analysis/`, { withCredentials: true });
};

export const getMedicalCenters = async (): Promise<AxiosResponse> => {
  return await client.get(`/organizations`, { withCredentials: true });
};
