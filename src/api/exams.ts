import useSWR from 'swr';

import { ErrorProps } from '@/ts/interfaces/error';

import client from './client';

export function useExams(page: number, order: number) {
  const { data, error } = useSWR(`/exams?page=${page}&order=${order}&count=25`, fetcher);

  return {
    exams: data,
    isLoading: !data && !error,
    isError: error,
  };
}

async function fetcher(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    const error: ErrorProps = new Error('An error occurred while fetching the data.');
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export async function getExams(page: number, order: number) {
  const response = await client.get(`/exams?page=${page}&order=${order}&count=25`, { withCredentials: true });

  return response;
}

export async function getExamsById(searchInt: string, page: number, order: number) {
  const response = await client.get(`/exams?page=${page}&order=${order}&find=${searchInt}&count=25`, {
    withCredentials: true,
  });

  return response;
}

export async function getExamById(examId: number) {
  const response = await client.get(`/exams/${examId}`, { withCredentials: true });

  return response;
}

export async function getExamsByFilter(
  page: number,
  order: number,
  accepted: boolean | null,
  reviewed: boolean | null,
) {
  const queryParams: string[] = [];
  queryParams.push(`page=${page}`);
  queryParams.push(`order=${order}`);
  queryParams.push(`count=25`);
  if (accepted !== null) {
    queryParams.push(`accepted=${accepted}`);
  }
  if (reviewed !== null) {
    queryParams.push(`reviewed=${reviewed}`);
  }
  const url = `/exams?${queryParams.join('&')}`;
  const response = await client.get(url, { withCredentials: true });

  return response;
}

export async function getExamsCount() {
  const response = await client.get(`/exams/count`, { withCredentials: true });

  return response;
}

export async function putExamReview(examId: number) {
  const response = await client.post(`/exams/review/${examId}`, { withCredentials: true });

  return response;
}

export async function putExamUnreview(examId: number) {
  const response = await client.post(`/exams/unreview/${examId}`, { withCredentials: true });

  return response;
}

export async function markExamIdAsAccepted(examId: number) {
  const response = await client.post(`/exams/accept/${examId}`, { withCredentials: true });

  return response;
}

export async function markExamIdAsRejected(examId: number, reasonId: number, derivation: string) {
  const response = await client.post(`/exams/reject/${examId}?reason=${reasonId}&derivation=${derivation}`, {
    withCredentials: true,
  });

  return response;
}

export async function markExamIdAsLocked(examId: number) {
  const response = client.post(`/exams/lock/${examId}`, { withCredentials: true }); //changed

  return response;
}
