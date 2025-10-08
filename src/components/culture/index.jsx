import React from "react";
import Hero from "../home/hero";
import CultureHero from "./hero-sec";
import CultureGallery from "./gallery";
import EmployeeBenefits from "./employee-benefits";
import Events from "./events";
import JoinOurTeam from "./join-our-team";
import ContactArea from "@/common/contact-area";
// import SEO from "../common/seo";

function CulturePageComponent() {
  return (
    <>
      {/* <SEO /> */}
      <CultureHero />
      <CultureGallery />
      <EmployeeBenefits />
      <Events />
      <JoinOurTeam />
      <ContactArea />
    </>
  );
}

export default CulturePageComponent;
