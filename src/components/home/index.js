import React from "react";
import Hero from "./hero";
import HeroNew from "./hero-new";
import StatsCardTwo from "@/components/stats-card-two";
import IndustriesWeServe from "./industries-we-serve";
import GetExactHelp from "./get-exact-help";
import ServicesWeOffer from "./services-we-offer";
import TechStack from "./tech-stack";
import Testimonials from "./testimonials";
import BlogArea from "../common/blog-area";
import ContactArea from "../common/contact-area";
import StatsCards from "../Stats-card";

function HomePage() {
  return (
    <>
      <Hero />
      {/* <HeroNew /> */}
      <StatsCardTwo />
      {/* <StatsCards /> */}
      <IndustriesWeServe />
      <GetExactHelp />
      <ServicesWeOffer />
      <TechStack />
      <Testimonials />
      <BlogArea />
      <ContactArea />
    </>
  );
}

export default HomePage;
