import React from "react";
import dynamic from "next/dynamic";
import SEO from "@/common/seo";

const AboutPageComponent = dynamic(() => import("../components/about"));

function About() {
  return (
    <>
      <SEO
        ogTitle={"About Us"}
        pageTitle={"About Us"}
        pageDescription={
          "PySquad is your trusted technology partner. Learn about our team, our mission, and how we deliver innovative software solutions."
        }
        keywords={
          "software development company, technology company, about us, company profile"
        }
      />
      <AboutPageComponent />
    </>
  );
}

export default About;
