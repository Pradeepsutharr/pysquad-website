import React from "react";
import dynamic from "next/dynamic";
import SEO from "@/common/seo";

const CulturePage = dynamic(() => import("../components/culture"));

function Culture() {
  return (
    <>
      <SEO
        ogTitle={"Culture"}
        pageTitle={"Culture"}
        pageDescription={
          "Join the Pysquad team! Explore our dynamic culture, where innovation, growth, and collaboration thrive. See why Pysquad is an amazing place to work."
        }
        keywords={
          "Company culture, work culture, technology company culture, Ahmedabad jobs, Gujarat jobs"
        }
      />
      <CulturePage />
    </>
  );
}

export default Culture;
