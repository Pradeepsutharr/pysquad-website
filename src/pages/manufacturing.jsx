import React from "react";
import dynamic from "next/dynamic";
import SEO from "@/common/seo";

const ManufacturingComponent = dynamic(() =>
  import("../components/industries/manufacturing")
);

function Manufacturing() {
  return (
    <>
      <SEO
        pageTitle={"Manufacturing Automation & IT | Pysquad"}
        pageDescription={
          "Drive efficiency in manufacturing with Pysquad’s IIoT integration, robotics, quality analytics, digital twins, and cloud-based smart factory solutions."
        }
        keywords={
          "manufacturing automation, IIoT, robotics, quality analytics, smart factory, digital twins, manufacturing cloud"
        }
        ogTitle={"Manufacturing Digital Solutions | Pysquad"}
        ogUrl={"https://pysquad.com/manufacturing"}
      />
      <ManufacturingComponent />;
    </>
  );
}

export default Manufacturing;
