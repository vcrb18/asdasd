import client from './client';

export class DiagnosticsApi {
  static async getDiagnostics() {
    const response = await client.get(`/diagnostics`, { withCredentials: true });

    return response;
  }

  static async getDiagnostic(diagnosticId: number) {
    const response = await client.get(`/diagnostics/${diagnosticId}`, { withCredentials: true });

    return response;
  }

  static async getDiagnosticTypes() {
    const response = await client.get(`/diagnostic_types`, { withCredentials: true });

    return response;
  }

  static async getDiagnosticType(diagnostic: string) {
    const response = await client.get(`/diagnostic_types/${diagnostic}`, { withCredentials: true });

    return response;
  }

  static async getDiagnosticTypeByDiagnostic(diagnostic: number) {
    const response = await client.get(`/diagnostic_types/${diagnostic}`, { withCredentials: true });

    return response;
  }

  static async getDoctorDiagnostics(examId: number) {
    const response = await client.get(`/doctor_diagnostics/${examId}`, { withCredentials: true });

    return response;
  }

  static async createDoctorDiagnostic(examId: number, diagnosticId: number) {
    const response = await client.post(
      `/doctor_diagnostics/create`,
      { examId: examId, diagnosticId: diagnosticId },
      { withCredentials: true },
    );

    return response;
  }

  static async deleteDoctorDiagnostics(examId: number, diagnosticId: number) {
    const response = await client.post(`/doctor_diagnostics/delete/${examId}/${diagnosticId}`, {
      withCredentials: true,
    });

    return response;
  }

  static async getDiagnosticPredictions(examId: number) {
    const response = await client.get(`/diagnostic_predictions/${examId}`, { withCredentials: true });

    return response;
  }

  static async updateDiagnosticThreshold(diagnosticId: number, threshold: number) {
    const response = await client.post(
      `/diagnostic_types/edit/${diagnosticId}`,
      { threshold: threshold },
      { withCredentials: true },
    );

    return response;
  }
}
