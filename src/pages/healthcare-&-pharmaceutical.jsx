import React from "react";
import dynamic from "next/dynamic";
import SEO from "@/common/seo";

const HealthcareComponent = dynamic(() =>
  import("../components/industries/healthcare")
);

function Healthcare() {
  return (
    <>
      <SEO
        pageTitle={"Healthcare & Pharma IT Solutions | Pysquad"}
        pageDescription={
          "Empower clinics, hospitals, and pharmaceutical firms with Pysquad’s EHR systems, telemedicine platforms, compliance tracking, and secure healthcare cloud solutions."
        }
        keywords={
          "healthcare IT, pharma software, EHR platforms, telemedicine, compliance tracking, patient analytics, drug supply chain, medical cloud hosting"
        }
        ogTitle={"Healthcare & Pharma Solutions by Pysquad"}
        ogUrl={"https://pysquad.com/healthcare-&-pharmaceutical"}
      />
      <HealthcareComponent />
    </>
  );
}

export default Healthcare;
