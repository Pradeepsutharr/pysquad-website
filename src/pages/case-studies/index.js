import React from "react";
import dynamic from "next/dynamic";
import SEO from "@/common/seo";

const CaseStudiesPage = dynamic(() => import("../../components/case-studies"));

function CaseStudies() {
  return (
    <>
      <SEO
        ogUrl={"https://pysquad.com/case-studies"}
        ogTitle={"Case Studies - Proven Success"}
        pageTitle={"Case Studies - Proven Success"}
        pageDescription={
          "Discover how Pysquad.com has helped businesses succeed. Explore our case studies and see the transformative impact of our software solutions."
        }
        keywords={
          "Case studies, client success stories, Odoo case studies, Django case studies, technology case studies"
        }
      />
      <CaseStudiesPage />
    </>
  );
}

export default CaseStudies;
