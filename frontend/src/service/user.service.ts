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
): Promise<AxiosResponse> => {
  return await axios.get(`/algorithm_predictions/${exam_id}`, {
    withCredentials: true,
  });
};

export const getExamPredictedMarkers = async (exam_id: number): Promise<AxiosResponse> => {
  return await axios.get(`/predicted_markers/${exam_id}`, {withCredentials: true})
}

export const getExamOperatorMarkers = async (exam_id: number): Promise<AxiosResponse> => {
  try{
    let res = await axios.get(`/operator_markers/${exam_id}`, {withCredentials: true})
    return res;
  }
  catch(error : any){
    console.log(error.response);
    return error.response;
  }
}

export const getTimeSeriesById = async (exam_id: number): Promise<AxiosResponse> => {
  return await axios.get(`/timeseries/${exam_id}`, {withCredentials: true})
}
export const getTimeSeries = async (exam_id: number): Promise<AxiosResponse> => {
  return await axios.get(`/timeseries/${exam_id}`, {withCredentials: true});
}

export const postOperatorMarkers = async (exam_id: number, newData : any): Promise<AxiosResponse> => {  //deberiamos considerar la posibilidad de multiples comentarios, quiza al menos agregar userid
  return await axios(
    {
      method: 'put',
      url: `/operator_markers/edit/${exam_id}`,
      data: newData,
      withCredentials: true,
    });
}

export const postOperatorMarkersComputations = async (exam_id: number, newData : any): Promise<AxiosResponse> => {  //deberiamos considerar la posibilidad de multiples comentarios, quiza al menos agregar userid
  return await axios(
    {
      method: 'put',
      url: `/operator_marker_computations/edit/${exam_id}`,
      data: newData,
      withCredentials: true,
    });
}


export const deleteOperatorMarkers = async (exam_id: number): Promise<AxiosResponse> => {
  return await axios.delete(`/operator_markers/delete/${exam_id}`, {withCredentials: true});
}

export const deleteOperatorMarkersComputations = async (exam_id: number): Promise<AxiosResponse> => {
  return await axios.delete(`/operator_marker_computations/delete/${exam_id}`, {withCredentials: true});
}
export const putExamReview = async (exam_id: number): Promise<AxiosResponse> => {
    return await axios.put(`/exams/review/${exam_id}`, { withCredentials: true });
}

export const putExamUnreview = async (exam_id: number): Promise<AxiosResponse> => {
    return await axios.put(`/exams/unreview/${exam_id}`, { withCredentials: true });
}

export const markExamIdAsAccepted = async (exam_id: number): Promise<AxiosResponse> => {
  return await axios.put(`/exams/accept//${exam_id}`, {withCredentials: true})
}

export const markExamIdAsRejected = async (exam_id: number): Promise<AxiosResponse> => {
  return await axios.put(`/exams/reject/${exam_id}`, {withCredentials: true})
}