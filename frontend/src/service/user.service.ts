import axios, { type AxiosResponse } from "axios";
import useSWR from "swr"
import authHeader from "./auth.header";
const API_URL = "http://localhost:8080/";

function fetcher(url: string) {
  console.log(`url: ${url}`);
  return fetch(url).then((res) => res.json());
}

export const getPublicContent = async (): Promise<AxiosResponse> => {
  return await axios.get(API_URL + "landingPage");
};

export function useExams(page : number, order:number) {

  const { data, error } = useSWR(`/exams?page=${page}&order=${order}&count=25`, fetcher);
  console.log('Inside the useExams. data:');
  console.log(data);
  
  
  return {
    exams: data,
    isLoading: !data && !error,
    isError: error,
  };
}
export const getExams = async (page : number, order:number): Promise<AxiosResponse> => {
  return await axios.get(`/exams?page=${page}&order=${order}&count=25`, { withCredentials: true });
};

export const getExamsById = async (searchInt: string, page : number, order:number): Promise<AxiosResponse> => {
  return await axios.get(`/exams?page=${page}&order=${order}&find=${searchInt}`, { withCredentials: true })
}
// export const getExamPredictedMarkersComputations = async (exam_id: number): Promise<AxiosResponse> => {
//   return await axios.get(`/predicted_markers_computations/${exam_id}`, { withCredentials: true });
// }
export const getExamsCount = async () : Promise<AxiosResponse> => {
  return axios.get(`/exams/count`, {withCredentials: true})
}

export const getExamPredictedMarkersComputations = (
  exam_id: number
): Promise<AxiosResponse> => {
  return axios.get(`/predicted_marker_computations/${exam_id}`, {
    withCredentials: true,
  });
};
// Esto se ve de la siguiente manera:
// {
//   "exam_id": 107220,
//   "fc": 66.00660066006601,
//   "rr": 909,
//   "pq": 191,
//   "qrs": 155,
//   "qt": 405,
//   "qtc": 424.788823481098,
//   "st": 0.47500000000000003
// }

export const getExam = async (exam_id: number): Promise<AxiosResponse> => {
  return await axios.get(`/exams/${exam_id}`, { withCredentials: true });
};

export const getExamAllAlgorithmPredictions = (
  exam_id: number
): Promise<AxiosResponse> => {
  return axios.get(`/algorithm_predictions/${exam_id}`, {
    withCredentials: true,
  });
};

// Esto se ve de la siguiente manera:
// {
//   "exam_id": 107220,
//   "patient_id": null,
//   "created_at": "2023-03-16T14:23:46.000Z"
// }

export const getSuggestedDiagnostic = async (
  exam_id: number,
  type_id: number
): Promise<AxiosResponse> => {
  return await axios.get(`/algorithm_predictions/${exam_id}`, {
    withCredentials: true,
  });
};

export const getExamPredictedMarkers = async (exam_id: number): Promise<AxiosResponse> => {
  return await axios.get(`/predicted_markers/${exam_id}`, {withCredentials: true})
}

export const getTimeSeriesById = async (exam_id: number): Promise<AxiosResponse> => {
  return await axios.get(`/timeseries/${exam_id}`, {withCredentials: true})
}
export const getTimeSeries = async (exam_id: number): Promise<AxiosResponse> => {
  return await axios.get(`/time_series/${exam_id}`, {withCredentials: true});
}
