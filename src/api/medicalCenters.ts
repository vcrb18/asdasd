import client from './client';

export async function getMedicalCenters() {
  const reponse = await client.get(`/medical_centers`, { withCredentials: true });

  return reponse;
}
