import React from "react";
import dynamic from "next/dynamic";

const FlutterPage = dynamic(() => import("../components/technologies/flutter"));

function Flutter() {
  return <FlutterPage />;
}

export default Flutter;
