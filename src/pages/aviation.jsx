import React from "react";
import dynamic from "next/dynamic";
import SEO from "@/common/seo";

const AviationComponent = dynamic(() =>
  import("../components/industries/aviation")
);

function Aviation() {
  return (
    <>
      <SEO
        pageTitle={"Aviation Technology & Cloud | Pysquad"}
        pageDescription={
          "Grow aviation operations with Pysquad’s predictive analytics, flight scheduling, digital twins, AR/VR crew training, and secure cloud for airlines and airports."
        }
        keywords={
          "aviation IT, airline software, predictive maintenance, flight scheduling, digital twins, AR/VR training, cloud aviation"
        }
        ogTitle={"Aviation IT Solutions | Pysquad"}
        ogUrl={"https://pysquad.com/industries/aviation"}
      />
      <AviationComponent />;
    </>
  );
}

export default Aviation;
