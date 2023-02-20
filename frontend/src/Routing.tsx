import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/Header";
import CustomizedTables from "./components/Tables";
import Login from "./components/Login";
import MainMenuButton from "./components/MainMenuButton";
import {
  landingPageTabs,
  landingPageButtons,
  loginPageButtons,
  mainMenuPageButtons,
  mainMenuHeaderButtons,
} from "./utils/routingPropConsts";

function Routing(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage tabs={landingPageTabs} buttons={landingPageButtons} onTabChange={(index: number) => {
              console.log(`Tab index changed to ${index}`);
            }} />
          }
        />
        <Route path="/login" element={<Login buttons={loginPageButtons} />} />
        <Route path="/examenes" element={<CustomizedTables />} />
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
