import React from "react";
import AboutHeroSec from "./hero-sec";
import CompanyDetails from "./company-details";
import OurJourney from "./our-journey";
import OurMissionVision from "./mission-vision";
import OurTeam from "./our-team";
import HowWeWork from "./how-we-work";
import ContactArea from "@/common/contact-area";

function AboutPageComponent() {
  return (
    <>
      <AboutHeroSec />
      <CompanyDetails />
      <OurJourney />
      <OurMissionVision />
      <HowWeWork />
      {/* <OurTeam /> */}
      <ContactArea />
    </>
  );
}

export default AboutPageComponent;
