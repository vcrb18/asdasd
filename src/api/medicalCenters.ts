import client from './client';

export class MedicalCentersApi {
  static async getMedicalCenters() {
    const reponse = await client.get(`/medical_centers`, { withCredentials: true });

    return reponse;
  }
}
