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

function Routing(): JSX.Element {
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
        <Route path="/examenes" element={<ExamTable />} />
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
