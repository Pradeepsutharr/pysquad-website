import React from "react";
import dynamic from "next/dynamic";

const MediaComponent = dynamic(() =>
  import("../components/industries/news-media")
);

function Media() {
  return <MediaComponent />;
}
export default Media;
