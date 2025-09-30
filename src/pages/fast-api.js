import React from "react";
import dynamic from "next/dynamic";

const FastApiComponent = dynamic(() =>
  import("../components/technologies/fast-api")
);

function FastApi() {
  return <FastApiComponent />;
}

export default FastApi;
