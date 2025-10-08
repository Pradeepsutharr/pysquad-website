import React from "react";
import dynamic from "next/dynamic";
import SEO from "@/common/seo";

const ReactNextComponent = dynamic(() =>
  import("../components/technologies/react-next")
);

function ReactNext() {
  return (
    <>
      <SEO
        pageTitle={"React.js, Next.js Development Company"}
        pageDescription={
          "Create blazing-fast, user-centric web experiences with Pysquad's React and Next.js development. We build responsive, SEO-optimized, and highly performant web apps."
        }
        keywords={
          "React.js, Next.js, React development, Next.js development, JavaScript, front-end development, web apps"
        }
        ogTitle={"Build with React & Next.js | Pysquad"}
        ogUrl={"https://pysquad.com/react-next"}
      />
      <ReactNextComponent />
    </>
  );
}

export default ReactNext;
