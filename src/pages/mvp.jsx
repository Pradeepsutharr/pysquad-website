import React from "react";
import dynamic from "next/dynamic";
import SEO from "@/components/common/seo";

const MvpComponent = dynamic(() => import("../components/mvp"));

function Mvp() {
  return (
    <>
      <SEO pageTitle={"Transform Your Idea into a MVP"} />
      <MvpComponent />
    </>
  );
}

export default Mvp;
