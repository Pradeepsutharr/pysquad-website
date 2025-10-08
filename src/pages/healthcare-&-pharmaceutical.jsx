import React from "react";
import dynamic from "next/dynamic";

const HealthcareComponent = dynamic(() =>
  import("../components/industries/healthcare")
);

function Healthcare() {
  return <HealthcareComponent />;
}

export default Healthcare;
