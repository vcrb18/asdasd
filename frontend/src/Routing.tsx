import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/Header";
import CustomizedTables from "./components/Tables";
import Login from "./components/Login";
import MainMenuButton from "./components/MainMenuButton";

function Routing(): JSX.Element {
  const landingPageTabs = [
    { label: "Sobre Nosotros" },
    { label: "Contactanos" },
  ];

  const landingPageButtons = [
    { label: "Contacto" },
    { label: "Idioma" },
    { label: "Iniciar Sesión" },
  ];

  const loginPageButtons = [{ label: "Idioma" }];

  const mainMenuPageButtons = [
    { label: "Exámenes" },
    { label: "Métricas" },
    { label: "Alertas" },
    { label: "Descargar Reporte" },
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage tabs={landingPageTabs} buttons={landingPageButtons} />
          }
        />
        <Route path="/login" element={<Login buttons={loginPageButtons} />} />
        <Route path="/examenes" element={<CustomizedTables />} />
        <Route
          path="/mainmenu"
          element={<MainMenuButton buttonLabels={mainMenuPageButtons} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default Routing;
