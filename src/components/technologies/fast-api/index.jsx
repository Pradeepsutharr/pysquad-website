import React from "react";
import FastApiHero from "./hero-sec";
import FastApiServices from "./services";
import NeedSolutions from "../common/need-solutions";
import FastApiExpertise from "./expertise";
import Journey from "../common/journey";
import ClientReviews from "@/common/client-reviews";
import ContactArea from "@/common/contact-area";

function PythonPage() {
  return (
    <>
      <FastApiHero />
      <FastApiServices />
      <NeedSolutions technology={"FastApi"} />
      <FastApiExpertise />
      <Journey />
      <ClientReviews />
      <ContactArea />
    </>
  );
}

export default PythonPage;
