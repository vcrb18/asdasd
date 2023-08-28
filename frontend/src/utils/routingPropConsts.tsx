export const landingPageTabs = [
  { label: "home", href: "/information" },
  { label: "aboutUs", href: "" },
  { label: "contactUs", href: "" },
];

export const landingPageButtons = [
  // { label: "Contacto", href: "#" }, eliminado porque se repetia con contactanos
  { label: "login", href: "/" }
];

export const loginPageButtons = [{ label: "home", href: "/information" }];

export const mainMenuPageButtons = [
  { label: "exams", target: "", href: "/exams"},
  { label: "metrics", target: "_blank", href: "/metrics"},
  { label: "alerts", target: "", href: "/alerts" },
  { label: "report", target: "_blank", href: "/reports" },
];

export const mainMenuTabs = [
  { label: "exams", target: "", href: "/exams" },
  { label: "metrics", target: "_blank", href: "/metrics" },
  { label: "alerts", target: "", href: "/alerts" },
  { label: "report", target: "_blank", href: "/reports" },
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
