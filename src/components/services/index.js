import React from "react";
import ServicesHero from "./hero";
import ServiceDetails from "./service-details";
import OurExpertise from "./our-expertise";
import ClientReviews from "../common/client-reviews";
import ContactArea from "../common/contact-area";

function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServiceDetails />
      <OurExpertise />
      <ClientReviews />
      <ContactArea />
    </>
  );
}

export default ServicesPage;
