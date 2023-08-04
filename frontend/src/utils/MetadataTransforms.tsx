import { useTranslation } from "react-i18next";
import { Patient } from "./ExamTableConst";

export interface Background {
  id: number;
  name: string;
}
export interface Medication {
  id: number;
  name: string;
  dose: number;
}

export interface Symptom {
  id: number;
  name: string;
  days: number;
  hours: number;
}
export interface ExamMetadata {
  patientId: number;
  birthday: string;
  gender: string;
  backgrounds: Background[];
  medications: Medication[];
  symptoms: Symptom[];
  identifier: string;
  name: string;
  lastName: string;
}

const getAge = (birthday: string | undefined): string => {
  if (birthday === undefined) return '';

  const splittedDate = birthday.split('-');
  if (splittedDate.length != 3) return '';

  const year = parseInt(splittedDate[0]);
  const month = parseInt(splittedDate[1]);
  const day = parseInt(splittedDate[2]);

  const currentDate = new Date();
  let age = currentDate.getFullYear() - year;

  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  if ((month > currentMonth) || (month == currentMonth && day > currentDay)) {
    age = age - 1;
  }

  return age.toString();
};

export const getFullNameToDisplay = (examMetadata: Patient | undefined): string => {
  if (!examMetadata) return '';
  return `${examMetadata?.name} ${examMetadata?.lastName}`;
}

export const getMetadataToDisplay = (examMetadata: Patient | undefined): string => {
  const { t } = useTranslation();
  if (!examMetadata) return '';

  const gender = examMetadata?.gender;
  const age = getAge(examMetadata?.birth);
  return `${t(gender)}, ${age} ${t("yearsOld")}`;
}
