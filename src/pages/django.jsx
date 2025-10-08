import React from "react";
import dynamic from "next/dynamic";
import SEO from "@/common/seo";

const DJangoPage = dynamic(() => import("../components/technologies/django"));

function Django() {
  return (
    <>
      <SEO
        pageTitle={"Django Web Development Services | Pysquad"}
        pageDescription={
          "We build scalable, secure, and dynamic web applications using the power of Python and Django. Build robust, future-ready applications with Django and Pysquad. From secure APIs to dynamic web platforms, trust our Django experts for scalable, maintainable backend solutions."
        }
        keywords={
          "Django, Django development, Django REST API, Django CMS, Wagtail, Saleor, Django Company, Django consulting, Django automation"
        }
        ogTitle={"Django Web Apps by Pysquad"}
        ogUrl={"https://pysquad.com/django"}
      />
      <DJangoPage />
    </>
  );
}

export default Django;
