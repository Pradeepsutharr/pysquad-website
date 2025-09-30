import React from "react";
import dynamic from "next/dynamic";

const ReactNextComponent = dynamic(() =>
  import("../components/technologies/react-next")
);

function ReactNext() {
  return <ReactNextComponent />;
}

export default ReactNext;
