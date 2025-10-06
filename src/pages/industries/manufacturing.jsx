import React from "react";
import dynamic from "next/dynamic";

const ManufacturingComponent = dynamic(() =>
  import("../../components/industries/manufacturing")
);

function Manufacturing() {
  return <ManufacturingComponent />;
}

export default Manufacturing;
