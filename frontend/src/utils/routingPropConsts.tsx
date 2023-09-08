import { TabProps } from "../components/customComponents/Header";

export const landingPageTabs: TabProps[] = [
  { label: "home", href: "/information", target: "" },
  { label: "aboutUs", href: "", target: "" },
  { label: "contactUs", href: "", target: "" },
];

export const landingPageButtons = [
  // { label: "Contacto", href: "#" }, eliminado porque se repetia con contactanos
  { label: "login", href: "/" }
];

export const loginPageButtons = [{ label: "home", href: "/information" }];

export const mainMenuPageButtons = [
  { label: "exams", target: "", href: "/exams"},
  { label: "metrics", target: "_blank", href: "https://sistemed2.secure.isatec.cl/d/f72348cb-4848-45cd-9454-a15765ef954a/metricas-ia?orgId=1"},
  { label: "alerts", target: "", href: "/alerts" },
  { label: "report", target: "_blank", href: "https://sistemed2.secure.isatec.cl/d/edf09258-09f6-4f0a-bb83-61047e1a6733/operacion-ia?orgId=1" },
];

export const mainMenuTabs = [
  { label: "exams", target: "", href: "/exams" },
  { label: "metrics", target: "_blank", href: "https://sistemed2.secure.isatec.cl/d/f72348cb-4848-45cd-9454-a15765ef954a/metricas-ia?orgId=1" },
  { label: "alerts", target: "", href: "/alerts" },
  { label: "report", target: "_blank", href: "https://sistemed2.secure.isatec.cl/d/edf09258-09f6-4f0a-bb83-61047e1a6733/operacion-ia?orgId=1" },
];

export const mainMenuHeaderButtons = [
  { label: "myAccount", href: "#" },
  { label: "logOut", href: "/" },
  { label: "admin", href: "/admin"}
];

export const roles = {
  admin: "Admin",
  doctor: "Doctor",
  operator: "Operator",
  superOperator: "Super Operator"
}
