import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage";
import Login from "./components/views/Login";
import {
  landingPageTabs,
  landingPageButtons,
  loginPageButtons,
  mainMenuHeaderButtons,
  mainMenuPageButtons,
} from "./utils/routingPropConsts";
import ExamTable from "./components/tables/ExamTable";
import MetricTabs from "./components/tabs/MetricTab";
import AlertTab from "./components/tabs/AlertsTab";
import AnalisisBox from "./components/customComponents/AnalisisBox";
import DiagnosisComponent from "./components/customComponents/DiagnosisComponent";
import PredictionBox from "./components/customComponents/PredictionBox";
import ExamsView from "./components/views/ExamsView";
import RequireAuth from "./components/customComponents/ProtectedRoute";
import TablesView from "./components/views/TablesView";
import ExamsTab from "./components/tabs/ExamsTab";

function Routing(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/information"
          element={
            <LandingPage tabs={landingPageTabs} buttons={landingPageButtons} />
          }
        />
        <Route path="/" element={<Login buttons={loginPageButtons} />} />

        <Route path="/tables" element={<TablesView />} />

        <Route
          path="/exams"
          element={
            <RequireAuth>
              <ExamsTab />
            </RequireAuth>
          }
        />

        <Route
          path="/metrics"
          element={
            <RequireAuth>
              <MetricTabs />
            </RequireAuth>
          }
        />
        <Route
          path="/alerts"
          element={
            <RequireAuth>
              <AlertTab />
            </RequireAuth>
          }
        />

        <Route
          path="/examsview/:examId"
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
            // <RequireAuth>
            <TablesView />
            // </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default Routing;
