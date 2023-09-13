import client from './client';

export class PredictionsApi {
  static async getExamAllAlgorithmPredictions(examId: number) {
    const response = await client.get(`/algorithm_predictions/${examId}`, { withCredentials: true });

    return response;
  }

  static async markDiagnosticPredictionNotDisplayable(examId: number, diagnosticId: number) {
    const response = await client.post(`/diagnostic_predictions/${examId}/${diagnosticId}/not_displayable`, {
      withCredentials: true,
    });

    return response;
  }

  static async getExamPredictedMarkersComputations(examId: number) {
    const response = await client.get(`/predicted_marker_computations/${examId}`, { withCredentials: true });

    return response;
  }

  static async getExamPredictedMarkers(examId: number) {
    const response = await client.get(`/predicted_markers/${examId}`, { withCredentials: true });

    return response;
  }

  static async getRejectedPrediction(examId: number) {
    const response = await client.get(`/rejection_predictions/${examId}`, { withCredentials: true });

    return response;
  }

  static async getSuggestedDiagnostic(examId: number) {
    const response = await client.get(`/suggested_diagnostics/${examId}`, { withCredentials: true });

    return response;
  }
}
