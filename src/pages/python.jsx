import React from "react";
import dynamic from "next/dynamic";
import SEO from "@/common/seo";

const PythonPage = dynamic(() => import("../components/technologies/python"));

function Python() {
  return (
    <>
      <SEO
        pageTitle={"Best Python company"}
        ogTitle={"Best Python Company"}
        ogUrl={"https://pysquad.com/python"}
        pageDescription={
          "PySquad delivers exceptional Python development solutions. Build robust web apps, automate tasks, and harness data science with our Python expertise."
        }
        keywords={
          " Python, Python development, Python web development, data science, automation, software development, machine learning"
        }
      />
      <PythonPage />
    </>
  );
}

export default Python;
