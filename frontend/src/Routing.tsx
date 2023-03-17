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
import ExamTable from "./components/customComponents/ExamTable";
import MainMenuView from "./components/views/MainMenuView";
import MetricTabs from "./components/tabs/MetricTab";
import AlertTab from "./components/tabs/AlertsTab";
import AnalisisBox from "./components/customComponents/AnalisisBox";
import DiagnosisComponent from "./components/customComponents/DiagnosisComponent";
import PredictionBox from "./components/customComponents/PredictionBox";
import ExamsView from "./components/views/ExamsView";
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


        <Route path="/patogrid" element={<AnalisisBox />} />

        <Route path="/diagnosis" element={<DiagnosisComponent />} />
        <Route path="/predicciones" element={<PredictionBox />} />

        <Route
          path="/examsview"
          element={
            <ExamsView
              tabs={mainMenuPageButtons}
              buttons={mainMenuHeaderButtons}
            />}
            />
        <Route
          path="/mainmenu"
          element={
            <RequireAuth>
              <MainMenuView tabs={mainMenuPageButtons} buttons={mainMenuHeaderButtons} />
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
