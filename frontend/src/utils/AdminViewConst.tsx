export const timeRestrictionSelect = [
  0,
  15,
  20,
  30,
  90,
  100,
  120,
  150,
  180,
  350,
  360,
  720,
  1440,
];

export const timeSelect = [
  0,
  5,
  10,
  15,
  60,
  180,
  360,
  720,
  1440,
];

export const AdminViewBoxStyle = {
  bgcolor: "#E4EDEF", 
  marginX: "10%",
  marginY: "2%", 
  paddingY: "2%", 
  paddingX: "2%",
  borderRadius: 4,
}

export interface MedicalCenter {
  organizationId: number;
  legalName: string;
  responseTime: number;
}