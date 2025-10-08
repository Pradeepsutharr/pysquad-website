import React from "react";
import dynamic from "next/dynamic";

const LogisticsComponent = dynamic(() =>
  import("../components/industries/logistics")
);

function Logistics() {
  return <LogisticsComponent />;
}

export default Logistics;
