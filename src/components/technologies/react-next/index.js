import React from "react";
import ReactHero from "./hero-sec";
import ReactServices from "./services";
import NeedSolutions from "../common/need-solutions";
import ReactExpertise from "./expertise";
import Journey from "../common/journey";
import ClientReviews from "@/common/client-reviews";
import ContactArea from "@/common/contact-area";

function ReactPage() {
  return (
    <>
      <ReactHero />
      <ReactServices />
      <NeedSolutions technology={"React"} />
      <ReactExpertise />
      <Journey />
      <ClientReviews />
      <ContactArea />
    </>
  );
}

export default ReactPage;
