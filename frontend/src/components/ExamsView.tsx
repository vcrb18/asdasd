import React from "react";
import Header from "./Header";
import { mainMenuHeaderButtons, mainMenuPageButtons } from "../utils/routingPropConsts";

export default function ExamsView() {
  return (
    <Paper>
      <Header tabs={mainMenuPageButtons} buttons={mainMenuHeaderButtons} />
    </Paper>
  );
}
