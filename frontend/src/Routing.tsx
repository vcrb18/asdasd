import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import MainMenuButton from "./components/MainMenuButton";
import {
  landingPageTabs,
  landingPageButtons,
  loginPageButtons,
  mainMenuPageButtons,
  mainMenuHeaderButtons,
} from "./utils/routingPropConsts";
import ExamTable from "./components/ExamTable";
import ExamsView from "./components/ExamsView";
import PaperLogos from "./components/PaperLogos";

function Routing(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/paperlogos" element={<PaperLogos />} />
        <Route
          path="/"
          element={
            <LandingPage tabs={landingPageTabs} buttons={landingPageButtons} />
          }
        />
        <Route path="/login" element={<Login buttons={loginPageButtons} />} />
        <Route path="/tablaexamenes" element={<ExamTable />} />
        <Route
          path="/examenes"
          element={
            <ExamsView
              tabs={mainMenuPageButtons}
              buttons={mainMenuHeaderButtons}
            />
          }
        />
        <Route
          path="/mainmenu"
          element={
            <MainMenuButton
              pageButtonLabels={mainMenuPageButtons}
              headerButtonLabels={mainMenuHeaderButtons}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default Routing;
