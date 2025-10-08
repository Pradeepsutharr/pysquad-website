import React from "react";
import dynamic from "next/dynamic";
import SEO from "@/common/seo";

const LogisticsComponent = dynamic(() =>
  import("../components/industries/logistics")
);

function Logistics() {
  return (
    <>
      <SEO
        pageTitle={"Logistics IT Solutions | Pysquad"}
        pageDescription={
          "Streamline your supply chain and logistics operations with Pysquad. We deliver automation, smart tracking, warehouse management, and freight solutions for modern logistics businesses."
        }
        keywords={
          "logistics IT, supply chain solutions, warehouse management, shipment tracking, transportation software, freight technology, logistics automation"
        }
        ogTitle={"Transform Logistics with Smart IT"}
        ogUrl={"https://pysquad.com/logistics"}
      />
      <LogisticsComponent />
    </>
  );
}

export default Logistics;
