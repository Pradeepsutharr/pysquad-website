import React from "react";
import DjangoHero from "./hero-sec";
import DjangoServices from "./services";
import NeedSolutions from "../common/need-solutions";
import DjangoExpertise from "./expertise";
import Journey from "../common/journey";
import ClientReviews from "@/common/client-reviews";
import ContactArea from "@/common/contact-area";

function DjangoPage() {
  return (
    <>
      <DjangoHero />
      <DjangoServices />
      <NeedSolutions technology={"Django"} />
      <DjangoExpertise />
      <Journey />
      <ClientReviews />
      <ContactArea />
    </>
  );
}

export default DjangoPage;
