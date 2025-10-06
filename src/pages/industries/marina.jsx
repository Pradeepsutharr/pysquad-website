import React from "react";
import dynamic from "next/dynamic";

const MarinaComponent = dynamic(() =>
  import("../../components/industries/marina")
);

function Marina() {
  return <MarinaComponent />;
}

export default Marina;
