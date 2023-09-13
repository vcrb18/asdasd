import axios from 'axios';

import { DiagnosticSistemed2, FiducialPoints } from '@/ts/interfaces/exam';

export class SistemedApi {
  static async getExamDataSistemed2(examId: number) {
    const response = await axios.get(`/sistemed2_api/get_exam_data/${examId}`, { withCredentials: true });

    return response;
  }

  static async acceptExamSistemed2(examId: number, urgency = false) {
    const response = await axios.post(`/sistemed2_api/accept_exam/${examId}`, {
      withCredentials: true,
      urgency: urgency,
    });

    return response;
  }

  static async rejectExamSistemed2(
    examId: number,
    reasonForRejection: number | null | undefined,
    derivations: string | null | undefined,
    indications = '',
  ) {
    const response = await axios.post(`/sistemed2_api/reject_exam/${examId}`, {
      withCredentials: true,
      reason_for_rejection: reasonForRejection,
      derivations: derivations,
      indications: indications,
    });

    return response;
  }

  static async postMarkersSistemed2(examId: number, points: FiducialPoints) {
    const requestBody = {
      p_start: points.p,
      qrs_start: points.q,
      r: points.r,
      qrs_end: points.s,
      t_start: points.stFlag,
      t_end: points.t,
      r2: points.r2,
      fc: points.fc,
      rr: points.rr,
      pq: points.pq,
      qrs: points.qrs,
      qt: points.qt,
      qtc: points.qtc,
      st: points.st,
    };
    const response = await axios.post(`/sistemed2_api/add_measurements/${examId}`, requestBody, {
      withCredentials: true,
    });

    return response;
  }

  static async postDiagnosticsSistemed2(examId: number, diagnostics: DiagnosticSistemed2[]) {
    const response = await axios.post(`/sistemed2_api/add_suggested_diagnosis/${examId}`, {
      withCredentials: true,
      diagnostics: diagnostics,
    });

    return response;
  }
}
