import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage";
import Login from "./components/views/Login";
import {
  landingPageTabs,
  landingPageButtons,
  loginPageButtons,
} from "./utils/routingPropConsts";
import ExamTable from "./components/customComponents/ExamTable";
import TablesView from "./components/views/TablesView";

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
          path="/tables"
          element={<TablesView />}
        />

      </Routes>
    </BrowserRouter>
  );
}
export default Routing;
