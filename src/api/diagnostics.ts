import client from './client';

export async function getDiagnostics() {
  const response = await client.get(`/diagnostics`, { withCredentials: true });

  return response;
}

export async function getDiagnostic(diagnosticId: number) {
  const response = await client.get(`/diagnostics/${diagnosticId}`, { withCredentials: true });

  return response;
}

export async function getDiagnosticTypes() {
  const response = await client.get(`/diagnostic_types`, { withCredentials: true });

  return response;
}

export async function getDiagnosticType(diagnostic: string) {
  const response = await client.get(`/diagnostic_types/${diagnostic}`, { withCredentials: true });

  return response;
}

export async function getDiagnosticTypeByDiagnostic(diagnostic: number) {
  const response = await client.get(`/diagnostic_types/${diagnostic}`, { withCredentials: true });

  return response;
}

export async function getDoctorDiagnostics(examId: number) {
  const response = await client.get(`/doctor_diagnostics/${examId}`, { withCredentials: true });

  return response;
}

export async function createDoctorDiagnostic(examId: number, diagnosticId: number) {
  const response = await client.post(
    `/doctor_diagnostics/create`,
    { examId: examId, diagnosticId: diagnosticId },
    { withCredentials: true },
  );

  return response;
}

export async function deleteDoctorDiagnostics(examId: number, diagnosticId: number) {
  const response = await client.post(`/doctor_diagnostics/delete/${examId}/${diagnosticId}`, {
    withCredentials: true,
  });

  return response;
}

export async function getDiagnosticPredictions(examId: number) {
  const response = await client.get(`/diagnostic_predictions/${examId}`, { withCredentials: true });

  return response;
}

export async function updateDiagnosticThreshold(diagnosticId: number, threshold: number) {
  const response = await client.post(
    `/diagnostic_types/edit/${diagnosticId}`,
    { threshold: threshold },
    { withCredentials: true },
  );

  return response;
}
