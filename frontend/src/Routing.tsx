import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage";
import Login from "./components/views/Login";
import {
  landingPageTabs,
  landingPageButtons,
  loginPageButtons,
  mainMenuPageButtons,
  mainMenuHeaderButtons,
} from "./utils/routingPropConsts";
import ExamTable from "./components/customComponents/ExamTable";
import ExamsView from "./components/views/ExamsView";
import MainMenuView from "./components/views/MainMenuView";

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
          element={<MainMenuView buttons={mainMenuPageButtons} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default Routing;
