import React from "react";
import dynamic from "next/dynamic";
import SEO from "@/common/seo";

const MarinaComponent = dynamic(() =>
  import("../components/industries/marina")
);

function Marina() {
  return (
    <>
      <SEO
        pageTitle={"Marina Management Software | Pysquad"}
        pageDescription={
          "Revolutionize marina operations with Pysquad’s smart dock management, CRM, asset monitoring, billing automation, and IoT solutions for waterfront businesses."
        }
        keywords={
          "marina management, dock operations, marina CRM, asset monitoring, marina POS, boat slip reservations, marine billing automation"
        }
        ogTitle={"Intelligent Marina Solutions | Pysquad"}
        ogUrl={"https://pysquad.com/marina"}
      />
      <MarinaComponent />
    </>
  );
}

export default Marina;
