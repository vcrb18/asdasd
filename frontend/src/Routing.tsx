import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage";
import Login from "./components/views/Login";
import {
  landingPageTabs,
  landingPageButtons,
  loginPageButtons,
} from "./utils/routingPropConsts";
import ExamTable from "./components/customComponents/ExamTable";
import MainMenuView from "./components/views/MainMenuView";
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
          path="/mainmenu"
          element={<MainMenuView />}
        />
        <Route
          path="/tables"
          element={<TablesView index={0} />}
        />

      </Routes>
    </BrowserRouter>
  );
}
export default Routing;
