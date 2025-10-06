import React from "react";
import LmsHero from "./hero-sec";
import Stats from "../common/stats";
import Services from "./services";
import Solutions from "./solutions";
import CaseStudiesArea from "../common/case-studies-area";
import ClientReviewArea from "../common/client-review-area";
import BlogArea from "@/common/blog-area";

function LmsComponent() {
  return (
    <>
      <LmsHero />
      <Stats />
      <Services />
      <Solutions />
      <CaseStudiesArea />
      <ClientReviewArea />
      <BlogArea />
    </>
  );
}

export default LmsComponent;
