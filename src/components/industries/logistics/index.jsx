import React from "react";
import LogisticsHeroSec from "./hero-sec";
import Stats from "../common/stats";
import Services from "./services";
import Solutions from "./solutions";
import CaseStudiesArea from "../common/case-studies-area";
import ClientReviewArea from "../common/client-review-area";
import BlogArea from "@/common/blog-area";

function LogisticsComponent() {
  return (
    <>
      <LogisticsHeroSec />
      <Stats />
      <Services />
      <Solutions />
      <CaseStudiesArea />
      <ClientReviewArea />
      <BlogArea />
    </>
  );
}

export default LogisticsComponent;
