import client from './client';

export class OperatorsApi {
  static async getTimeSeries(examId: number) {
    const response = await client.get(`/timeseries/${examId}`, { withCredentials: true });

    return response;
  }
  static async getTimeSeriesById(examId: number) {
    const response = await client.get(`/timeseries/${examId}`, { withCredentials: true });

    return response;
  }
}
