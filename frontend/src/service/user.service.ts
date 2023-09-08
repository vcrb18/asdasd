import axios, { Axios, type AxiosResponse } from "axios";
import useSWR from "swr"
import authHeader from "./auth.header";
import { BasePopperPropsOverrides } from "@mui/x-data-grid";
import { ExamsByFilterParams } from "../utils/ExamTableConst";
const API_URL = "http://localhost:8080/";

function fetcher(url: string) {
  return fetch(url).then((res) => res.json());
}

export const getPublicContent = async (): Promise<AxiosResponse> => {
  return await axios.get(API_URL + "landingPage");
};

export function useExams(page : number, order:number) {

  const { data, error } = useSWR(`/exams?page=${page}&order=${order}&count=25`, fetcher);
  
  
  return {
    exams: data,
    isLoading: !data && !error,
    isError: error,
  };
}
export const getExams = async (page : number, order:number): Promise<AxiosResponse> => {
  return await axios.get(`/exams?page=${page}&order=${order}&count=25`, { withCredentials: true });
};

export const getExamsByFilter = async (examsByFilterParams: ExamsByFilterParams) : Promise<AxiosResponse> => {
  const { searchInt, page, order, accepted, review, screenshot } = examsByFilterParams;
  return await axios.get(`/exams?page=${page}&order=${order}&accepted=${accepted}&reviewed=${review}&screenshot=${screenshot}&find=${searchInt}&count=25`, { withCredentials: true })

}

export const getExamsById = async (searchInt: string, page : number, order:number): Promise<AxiosResponse> => {
  return await axios.get(`/exams?page=${page}&order=${order}&find=${searchInt}&count=25`, { withCredentials: true })
}
// export const getExamPredictedMarkersComputations = async (exam_id: number): Promise<AxiosResponse> => {
//   return await axios.get(`/predicted_markers_computations/${exam_id}`, { withCredentials: true });
// }
export const getExamsCount = async () : Promise<AxiosResponse> => {
  return axios.get(`/exams/count`, {withCredentials: true})
}

export const postExamIdAI = async (examId: string) => {
  return axios.post(`/ai_analysis/notify/${examId}?forced=true`, {withCredentials: true})
}

export const postAIState = async ( turnOn: boolean, timeActive: number, organizationIds: number[], allOrganizations: boolean) => {
  if (!turnOn){
    return axios.post(` /ai_analysis/activate`, { 
      withCredentials: true,
      time: timeActive,
      organizations: organizationIds,
      allOrganizations: allOrganizations,
    });
  }
  else {
    return axios.post(` /ai_analysis/deactivate`, {
      withCredentials: true,
      organizations: organizationIds,
      allOrganizations: allOrganizations,
    });
  }
};

export const getAIActiveOrganizations = async () : Promise<AxiosResponse> => {
  return axios.get(` /ai_analysis/`, {withCredentials: true})
}

export const getExamPredictedMarkersComputations = (
  examId: number
): Promise<AxiosResponse> => {
  return axios.get(`/predicted_marker_computations/${examId}`, {
    withCredentials: true,
  });
};

export const getExam = async (examId: number): Promise<AxiosResponse> => {
  return await axios.get(`/exams/${examId}`, { withCredentials: true });
};

export const getExamAllAlgorithmPredictions = (
  examId: number
): Promise<AxiosResponse> => {
  return axios.get(`/algorithm_predictions/${examId}`, {
    withCredentials: true,
  });
};

export const getSuggestedDiagnostic = async (
  examId: number,
): Promise<AxiosResponse> => {
  return await axios.get(`/algorithm_predictions/${examId}`, {
    withCredentials: true,
  });
};

export const getExamPredictedMarkers = async (examId: number): Promise<AxiosResponse> => {
  return await axios.get(`/predicted_markers/${examId}`, {withCredentials: true})
}

export const getExamOperatorMarkers = async (examId: number): Promise<AxiosResponse> => {
  try{
    let res = await axios.get(`/operator_markers/${examId}`, {withCredentials: true})
    return res;
  }
  catch(error : any){
    return error.response;
  }
}

export const getTimeSeriesById = async (examId: number): Promise<AxiosResponse> => {
  return await axios.get(`/timeseries/${examId}`, {withCredentials: true})
}
export const getTimeSeries = async (examId: number): Promise<AxiosResponse> => {
  return await axios.get(`/timeseries/${examId}`, {withCredentials: true});
}

export const postOperatorMarkers = async (examId: number, newData : any): Promise<AxiosResponse> => {  //deberiamos considerar la posibilidad de multiples comentarios, quiza al menos agregar userid
  return await axios(
    {
      method: 'post', //changed
      url: `/operator_markers/edit/${examId}`,
      data: newData,
      withCredentials: true,
    });
}

export const postOperatorMarkersComputations = async (examId: number, newData : any): Promise<AxiosResponse> => {  //deberiamos considerar la posibilidad de multiples comentarios, quiza al menos agregar userid
  return await axios(
    {
      method: 'post', //changed
      url: `/operator_marker_computations/edit/${examId}`,
      data: newData,
      withCredentials: true,
    });
}


export const deleteOperatorMarkers = async (examId: number): Promise<AxiosResponse> => {
  return await axios.post(`/operator_markers/delete/${examId}`, {withCredentials: true});//changed
}

export const deleteOperatorMarkersComputations = async (examId: number): Promise<AxiosResponse> => {
  return await axios.post(`/operator_marker_computations/delete/${examId}`, {withCredentials: true}); //changed
}
export const putExamReview = async (examId: number): Promise<AxiosResponse> => {
    return await axios.post(`/exams/review/${examId}`, { withCredentials: true }); //changed
}

export const putExamUnreview = async (examId: number): Promise<AxiosResponse> => {
    return await axios.post(`/exams/unreview/${examId}`, { withCredentials: true }); //changed
}

export const markExamIdAsAccepted = async (examId: number): Promise<AxiosResponse> => {
  return await axios.post(`/exams/accept//${examId}`, {withCredentials: true}) //changed
}

export const markExamIdAsRejected = async (examId: number, reasonId: number, derivation: string): Promise<AxiosResponse> => {
  return await axios.post(`/exams/reject/${examId}?reason=${reasonId}&derivation=${derivation}`, {withCredentials: true}) //changed
}
export const getDiagnosticTypeByDiagnostic = async (diagnostic: string,): Promise<AxiosResponse> => {
  return await axios.get(`/diagnostic_types/${diagnostic}`, {withCredentials: true,});
}

export const getDiagnosticTypes = async (): Promise<AxiosResponse> => {
  return await axios.get(`/diagnostic_types/`, {withCredentials: true,});
}

export const createDoctorDiagnostic = async (examId: number, diagnosticId: number): Promise<AxiosResponse> => {
  return await axios.post(`/doctor_diagnostics/create`, {examId: examId, diagnosticId: diagnosticId, withCredentials: true,});
}

export const getDoctorDiagnostics = async (examId: number): Promise<AxiosResponse> => {
  return await axios.get(`/doctor_diagnostics/${examId}`, {withCredentials: true,});
}

export const deleteDoctorDiagnostics = async (examId: number, diagnosticId: number): Promise<AxiosResponse> => {
  return await axios.post(`/doctor_diagnostics/delete/${examId}/${diagnosticId}`, {withCredentials: true,});//changed
}

export const markExamIdAsLocked = async (examId: number): Promise<AxiosResponse> => {
  return await axios.post(`/exams/lock/${examId}`, {withCredentials: true,}); //changed
}

export const markExamIdAsUnlocked = async (examId: number): Promise<AxiosResponse> => {
  return await axios.post(`/exams/unlock/${examId}`, {withCredentials: true,});  //changed
}

export const getDiagnosticPredictions = async (examId: number): Promise<AxiosResponse> => {
  return await axios.get(`/diagnostic_predictions/${examId}`, {withCredentials: true,});  //changed
}

export const getExamDataSistemed2 = async (examId: number): Promise<AxiosResponse> => {
  return await axios.get(`/sistemed2_api/get_exam_data/${examId}`, {
    withCredentials: true,
  });
}

export const acceptExamSistemed2 = async (examId: number, urgency: boolean = false): Promise<AxiosResponse> => {
  return await axios.post(`/sistemed2_api/accept_exam/${examId}`, {
    withCredentials: true,
    urgency: urgency
  });
}

export const rejectExamSistemed2 = async (examId: number, reasonForRejection: number | null | undefined, derivations: string | null | undefined, indications: string =''): Promise<AxiosResponse> => {
  return await axios.post(`/sistemed2_api/reject_exam/${examId}`, {
    withCredentials: true,
    reason_for_rejection: reasonForRejection,
    derivations: derivations,
    indications: indications
  });
}

export const postMarkersSistemed2 = async (examId: number,
  p: number, q: number, r: number, s: number, stFlag: number, t: number, r2: number,
  fc: number, rr: number, pq: number, qrs: number, qt: number, qtc: number, st: number): Promise<AxiosResponse> => {
  return await axios.post(`/sistemed2_api/add_measurements/${examId}`, {
    withCredentials: true,
    p_start: p,
    qrs_start: q,
    r: r,
    qrs_end: s,
    t_start: stFlag,
    t_end: t,
    r2: r2,
    fc: fc,
    rr: rr,
    pq: pq,
    qrs: qrs,
    qt: qt,
    qtc: qtc,
    st: st,
  });
}

export interface DiagnosticSistemed2 {
  ID: number;
  METRIC: number;
}

export const postDiagnosticsSistemed2 = async (examId: number, diagnostics: DiagnosticSistemed2[]): Promise<AxiosResponse> => {
  return await axios.post(`/sistemed2_api/add_suggested_diagnosis/${examId}`, {
    withCredentials: true,
    diagnostics: diagnostics
  });
}

export const markDiagnosticPredictionNotDisplayable = async (examId: number, diagnosticId: number): Promise<AxiosResponse> => {
  return await axios.post(`/diagnostic_predictions/${examId}/${diagnosticId}`, {withCredentials: true,});
}

export const getRejectedPrediction = async (examId: number): Promise<AxiosResponse> => {
  return await axios.get(`/rejection_predictions/${examId}`, {withCredentials: true,});
}

export const getMedicalCenters = async (): Promise<AxiosResponse> => {
  return await axios.get(`/organizations`, {withCredentials: true,});
}

export const getNormalThresholdMarkers = async (): Promise<AxiosResponse> => {
  return await axios.get(`/normal_threshold_markers`, {withCredentials: true,});
}

export const updateNormalThresholdMarkers = async (fiducialPoint: string, lowerLimit: number, upperLimit: number): Promise<AxiosResponse> => {
  return await axios.post(`/normal_threshold_markers`, {withCredentials: true, fiducialPoint: fiducialPoint, lowerLimit: lowerLimit, upperLimit: upperLimit});
}

export const updateDiagnosticThreshold = async (diagnosticId: number, threshold: number): Promise<AxiosResponse> => {
  return await axios.post(`/diagnostic_types/edit/${diagnosticId}`, {withCredentials: true, threshold: threshold});
}

export const getAcceptanceThresholds = async (): Promise<AxiosResponse> => {
  return await axios.get(`/acceptance_thresholds`, {withCredentials: true,});
}

export const updateAcceptanceThresholds = async (name: string, threshold: number): Promise<AxiosResponse> => {
  return await axios.post(`/acceptance_thresholds`, {withCredentials: true, name: name, threshold: threshold});
}