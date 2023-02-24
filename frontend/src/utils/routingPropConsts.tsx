import { useTranslation } from "react-i18next";

const { t } = useTranslation();

export const landingPageTabs = [
  { label: t("ourProjects") },
  { label: t("aboutUs") },
  { label: t("contactUs") },
];

export const landingPageButtons = [
  { label: t("contact"), href: "#" },
  { label: t("login"), href: "/login" },
];

export const loginPageButtons = [{ label: t("home"), href: "/" }];

export const mainMenuPageButtons = [
  { label: t("examinations"), href: "/examenes" },
  { label: t("metrics"), href: "#" },
  { label: t("alerts"), href: "#" },
  { label: t("report"), href: "#" },
];

export const mainMenuTabs = [
  { label: t("examinations"), href: "#" },
  { label: t("metrics"), href: "#" },
  { label: t("alerts"), href: "#" },
  { label: t("report"), href: "#" },
];

export const mainMenuHeaderButtons = [
  { label: t("myAccount"), href: "#" },
  { label: t("logOut"), href: "/" },
];
