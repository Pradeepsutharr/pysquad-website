import React from "react";
import dynamic from "next/dynamic";
import SEO from "@/common/seo";

const LmsComponent = dynamic(() => import("../components/industries/lms"));

function LMS() {
  return (
    <>
      <SEO
        pageTitle={"LMS & E-Learning Solutions | Pysquad"}
        pageDescription={
          "Transform online learning with Pysquad’s LMS platforms—adaptive pathways, mobile microlearning, gamification, compliance tracking, and in-depth analytics for education and workforce."
        }
        keywords={
          "LMS platform, e-learning, adaptive learning, online training, gamification, microlearning, compliance tracking, education analytics"
        }
        ogTitle={"Advanced LMS Solutions | Pysquad"}
        ogUrl={"https://pysquad.com/industries/lms"}
      />
      <LmsComponent />
    </>
  );
}

export default LMS;
