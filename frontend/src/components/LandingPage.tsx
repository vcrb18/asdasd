import React from "react";
import Header from "../components/Header";

export interface LandingPageProps {
  buttons: Array<{ label: string }>;
}

const LandingPage: React.FC<LandingPageProps> = ({ buttons }) => {
  return <Header buttons={buttons} />;
};

export default LandingPage;
