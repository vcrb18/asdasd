import client from './client';

export async function getExamOperatorMarkers(examId: number) {
  const response = await client.get(`/operator_markers/${examId}`, { withCredentials: true });

  return response;
}

// eslint-disable-next-line
export async function postOperatorMarkers(examId: number, newData: any) {
  const response = await client.post(`/operator_markers/edit/${examId}`, newData, { withCredentials: true });

  return response;
}

export async function deleteOperatorMarkers(examId: number) {
  const response = await client.post(`/operator_markers/delete/${examId}`, { withCredentials: true });

  return response;
}

// eslint-disable-next-line
export async function postOperatorMarkersComputations(examId: number, newData: any) {
  const response = await client.post(`/operator_marker_computations/edit/${examId}`, newData, {
    withCredentials: true,
  });

  return response;
}

export async function deleteOperatorMarkersComputations(examId: number) {
  const response = await client.post(`/operator_marker_computations/delete/${examId}`, { withCredentials: true });

  return response;
}
