import React from "react";
import FlutterHero from "./hero-sec";
import FlutterServices from "./services";
import NeedSolutions from "../common/need-solutions";
import FlutterExpertise from "./expertise";
import Journey from "../common/journey";
import ClientReviews from "@/common/client-reviews";
import ContactArea from "@/common/contact-area";

function FlutterPage() {
  return (
    <>
      <FlutterHero />
      <FlutterServices />
      <NeedSolutions technology={"Flutter"} />
      <FlutterExpertise />
      <Journey />
      <ClientReviews />
      <ContactArea />
    </>
  );
}

export default FlutterPage;
