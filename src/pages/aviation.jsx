import React from "react";
import dynamic from "next/dynamic";

const AviationComponent = dynamic(() =>
  import("../components/industries/aviation")
);

function Aviation() {
  return <AviationComponent />;
}

export default Aviation;
