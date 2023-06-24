import { AxiosResponse } from 'axios';

import client from './client';

const getExamById = async (examId: number): Promise<AxiosResponse> => {
  return await client.get(`/exams/${examId}`, { withCredentials: true });
};

export { getExamById };
