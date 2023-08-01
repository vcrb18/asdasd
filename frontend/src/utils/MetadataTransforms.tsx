import { useTranslation } from "react-i18next";

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

const remapGender = (gender: string | undefined): string => {
  switch (gender) {
    case "HOMBRE":
      return "male";
    case "MUJER":
      return "female";
    default:
      return "";
  }
};

const getAge = (birthday: string | undefined): string => {
  if (birthday === undefined) return '';

  const splittedDate = birthday.split('-');
  if (splittedDate.length != 3) return '';

  const day = parseInt(splittedDate[0]);
  const month = parseInt(splittedDate[1]);
  const year = parseInt(splittedDate[2]);

  const currentDate = new Date();
  let age = currentDate.getFullYear() - year;

  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  if ((month > currentMonth) || (month == currentMonth && day > currentDay)) {
    age = age - 1;
  }

  return age.toString();
};

export const getMetadataToDisplay = (examMetadata: ExamMetadata | null): string => {
  const { t } = useTranslation();
  if (!examMetadata) return '';

  const gender = remapGender(examMetadata?.gender);
  const age = getAge(examMetadata?.birthday);
  return `${t(gender)}, ${age} ${t("yearsOld")}`;
}
