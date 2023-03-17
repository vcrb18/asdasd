import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage";
import Login from "./components/views/Login";
import {
  landingPageTabs,
  landingPageButtons,
  loginPageButtons,
} from "./utils/routingPropConsts";
import ExamTable from "./components/customComponents/ExamTable";
import ExamsView from "./components/tabs/ExamsTab";
import MainMenuView from "./components/views/MainMenuView";
import MetricTabs from "./components/tabs/MetricTab";
import AlertTab from "./components/tabs/AlertsTab";
import AnalisisBox from "./components/customComponents/AnalisisBox";
import RequireAuth from "./components/customComponents/ProtectedRoute";

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
        <Route
          path="/tablaexamenes"
          element={
            <RequireAuth>
              <ExamTable />
            </RequireAuth>
          }
        />
        <Route
          path="/exams"
          element={
            <RequireAuth>
              <ExamsView
                tabs={mainMenuPageButtons}
                buttons={mainMenuHeaderButtons}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/metrics"
          element={
            <RequireAuth>
              <MetricTabs
                tabs={mainMenuPageButtons}
                buttons={mainMenuHeaderButtons}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/alerts"
          element={
            <RequireAuth>
              <AlertTab
                tabs={mainMenuPageButtons}
                buttons={mainMenuHeaderButtons}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/mainmenu"
          element={
            <RequireAuth>
              <MainMenuView />
            </RequireAuth>
          }
        />
        <Route
          path="/patogrid"
          element={
            <RequireAuth>
              <AnalisisBox />
            </RequireAuth>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
export default Routing;
