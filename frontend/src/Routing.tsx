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
import ExamsView from "./components/tabs/ExamsTab";
import MainMenuView from "./components/views/MainMenuView";
import MetricTabs from "./components/tabs/MetricTab";
import AlertTab from "./components/tabs/AlertsTab";
import AnalisisBox from "./components/customComponents/AnalisisBox";

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
          path="/exams"
          element={
            <ExamsView
              tabs={mainMenuPageButtons}
              buttons={mainMenuHeaderButtons}
            />
          }
        />
        <Route
          path="/metrics"
          element={
            <MetricTabs
              tabs={mainMenuPageButtons}
              buttons={mainMenuHeaderButtons}
            />
          }
        />
        <Route
          path="/alerts"
          element={
            <AlertTab
              tabs={mainMenuPageButtons}
              buttons={mainMenuHeaderButtons}
            />
          }
        />

        <Route path="/mainmenu" element={<MainMenuView />} />

        <Route path="/patogrid" element={<AnalisisBox />} />
      </Routes>
    </BrowserRouter>
  );
}
export default Routing;
