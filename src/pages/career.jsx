import React from "react";
import dynamic from "next/dynamic";
import SEO from "@/common/seo";

const CareerPageComponent = dynamic(() => import("../components/career"));

function CareerPage() {
  return (
    <>
      <SEO
        ogTitle={"Career"}
        pageTitle={"Careers"}
        pageDescription={
          "Build your future at PySquad. Browse our open positions in software development, AI, and other exciting tech fields. Join our team and make an impact"
        }
        keywords={
          "tech jobs, software development jobs, AI jobs, careers in technology, Ahmadabad jobs, Gujarat jobs"
        }
      />
      <CareerPageComponent />
    </>
  );
}

export default CareerPage;
