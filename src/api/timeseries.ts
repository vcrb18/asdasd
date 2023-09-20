import client from './client';

export async function getTimeSeries(examId: number) {
  const response = await client.get(`/timeseries/${examId}`, { withCredentials: true });

  return response;
}
export async function getTimeSeriesById(examId: number) {
  const response = await client.get(`/timeseries/${examId}`, { withCredentials: true });

  return response;
}
