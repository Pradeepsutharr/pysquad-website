import React from "react";
import Journey from "../technologies/common/journey";
import MvpContact from "./contact";
import MvpHero from "./hero-sec";

function MvpComponent() {
  return (
    <>
      <MvpHero />
      <Journey />
      <MvpContact />
    </>
  );
}

export default MvpComponent;
