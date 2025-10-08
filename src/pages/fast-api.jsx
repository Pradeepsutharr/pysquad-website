import React from "react";
import dynamic from "next/dynamic";
import SEO from "@/common/seo";

const FastApiComponent = dynamic(() =>
  import("../components/technologies/fast-api")
);

function FastApi() {
  return (
    <>
      <SEO
        pageTitle={"FastAPI Development Services | Pysquad"}
        pageDescription={
          "Build high-performance web APIs with Pysquad's FastAPI expertise. Explore our services, case studies, and get started on your project today."
        }
        keywords={
          "FastAPI, FastAPI development, Python API development, web API development, REST API, high-performance APIs, scalable APIs, Pysquad"
        }
        ogTitle={"FastAPI Backend Experts | Pysquad"}
        ogUrl={"https://pysquad.com/fast-api"}
      />
      <FastApiComponent />
    </>
  );
}

export default FastApi;
