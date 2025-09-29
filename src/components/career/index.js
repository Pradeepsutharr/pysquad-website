import React from "react";
import CareerHeroSec from "./hero-sec";
import JobOpenings from "./jobs";
import ContactArea from "../common/contact-area";

function CareerPageComponent() {
  return (
    <>
      <CareerHeroSec />
      <JobOpenings />
      <ContactArea />
    </>
  );
}

export default CareerPageComponent;
