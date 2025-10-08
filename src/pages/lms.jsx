import React from "react";
import dynamic from "next/dynamic";

const LmsComponent = dynamic(() => import("../components/industries/lms"));

function LMS() {
  return <LmsComponent />;
}

export default LMS;
