import React from "react";
import dynamic from "next/dynamic";
import SEO from "@/common/seo";

const FlutterPage = dynamic(() => import("../components/technologies/flutter"));

function Flutter() {
  return (
    <>
      <SEO
        pageTitle={"Flutter App Developers | Pysquad"}
        pageDescription={
          "Launch superior cross-platform apps with Flutter and Pysquad. Smooth mobile and web experiences, expressive design, and high-performance from one codebase."
        }
        keywords={
          "Flutter development, flutter mobile apps, cross-platform apps, flutter web, mobile UI, Dart apps, Flutter consulting, multi-platform app"
        }
        ogTitle={"Flutter App Development by Pysquad"}
        ogUrl={"https://pysquad.com/flutter"}
      />
      <FlutterPage />
    </>
  );
}

export default Flutter;
