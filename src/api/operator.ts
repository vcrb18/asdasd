import client from './client';

export class OperatorsApi {
  static async getExamOperatorMarkers(examId: number) {
    const response = await client.get(`/operator_markers/${examId}`, { withCredentials: true });

    return response;
  }

  // eslint-disable-next-line
  static async postOperatorMarkers(examId: number, newData: any) {
    const response = await client.post(`/operator_markers/edit/${examId}`, newData, { withCredentials: true });

    return response;
  }

  static async deleteOperatorMarkers(examId: number) {
    const response = await client.post(`/operator_markers/delete/${examId}`, { withCredentials: true });

    return response;
  }
  // eslint-disable-next-line
  static async postOperatorMarkersComputations(examId: number, newData: any) {
    const response = await client.post(`/operator_marker_computations/edit/${examId}`, newData, {
      withCredentials: true,
    });

    return response;
  }

  static async deleteOperatorMarkersComputations(examId: number) {
    const response = await client.post(`/operator_marker_computations/delete/${examId}`, { withCredentials: true });

    return response;
  }
}
