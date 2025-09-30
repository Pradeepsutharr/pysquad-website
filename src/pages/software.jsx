import React from "react";
import dynamic from "next/dynamic";
import SEO from "@/common/seo";

const SoftwareComponent = dynamic(() => import("../components/software"));

function SoftwareSolutions() {
  return (
    <>
      <SEO pageTitle={"Build Great Software"} />
      <SoftwareComponent />
    </>
  );
}

export default SoftwareSolutions;
