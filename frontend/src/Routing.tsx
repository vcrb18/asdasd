import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage";
import Login from "./components/views/Login";
import {
  landingPageTabs,
  landingPageButtons,
  loginPageButtons,
  mainMenuHeaderButtons,
  mainMenuPageButtons,
  roles,
} from "./utils/routingPropConsts";
import MetricTabs from "./components/tabs/MetricTab";
import AlertTab from "./components/tabs/AlertsTab";
import ExamsView from "./components/views/ExamsView";
import RequireAuth from "./components/customComponents/ProtectedRoute";
import TablesView from "./components/views/TablesView";
import AdminView from "./components/views/AdminView";
import ModifyParametersView from "./components/views/ModifyParametersView";
import Exams from "./components/customComponents/exams";

function Routing(): JSX.Element {
  const allRoles = [roles.admin, roles.doctor, roles.operator, roles.superOperator];
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
            <RequireAuth roles={allRoles}>
              <Exams/>
            </RequireAuth>
          }
        />

        <Route
          path="/metrics"
          element={
            <RequireAuth roles={allRoles}>
              <MetricTabs />
            </RequireAuth>
          }
        />
        <Route
          path="/alerts"
          element={
            <RequireAuth roles={allRoles}>
              <AlertTab />
            </RequireAuth>
          }
        />

        <Route
          path="/examsview/:examId"
          element={
            <RequireAuth roles={allRoles}>
            <ExamsView
              tabs={mainMenuPageButtons}
              buttons={mainMenuHeaderButtons}
            />
            </RequireAuth>
          }
        />
        <Route
          path="/mainmenu"
          element={
            <RequireAuth roles={allRoles}>
            <TablesView />
            </RequireAuth>
          }
        />
        <Route
          path="/admin"
          element={
            <RequireAuth roles={[roles.admin, roles.superOperator]}>
            <AdminView />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/modifyparams"
          element={
            <RequireAuth roles={[roles.admin, roles.superOperator]}>
            <ModifyParametersView />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default Routing;
