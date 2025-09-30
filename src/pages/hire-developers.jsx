import React from "react";
import dynamic from "next/dynamic";
import SEO from "@/components/common/seo";

const HireDeveloperComponent = dynamic(() =>
  import("../components/hire-developer")
);

function HireDevelopers() {
  return (
    <>
      <SEO pageTitle={"Hire Expert Software Developers"} />
      <HireDeveloperComponent />
    </>
  );
}

export default HireDevelopers;
