import React from "react";
import PythonHero from "./hero-sec";
import PythonServices from "./services";
import NeedSolutions from "../common/need-solutions";
import PythonExpertise from "./expertise";
import Journey from "../common/journey";
import ClientReviews from "@/components/common/client-reviews";
import ContactArea from "@/components/common/contact-area";

function PythonPage() {
  return (
    <>
      <PythonHero />
      <PythonServices />
      <NeedSolutions technology={"Python"} />
      <PythonExpertise />
      <Journey />
      <ClientReviews />
      <ContactArea />
    </>
  );
}

export default PythonPage;
