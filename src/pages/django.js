import React from "react";
import dynamic from "next/dynamic";
import SEO from "@/components/common/seo";

const DJangoPage = dynamic(() => import("../components/technologies/django"));

function Django() {
  return (
    <>
      <SEO
        ogTitle={"Django Web Development Services"}
        ogUrl={"https://pysquad.com/django"}
        pageTitle={"Django Web Development Services"}
        pageDescription={
          "We build scalable, secure, and dynamic web applications using the power of Python and Django."
        }
        keywords={
          "Django, Django development, Django REST API, Django CMS, Wagtail, Saleor, Django Company"
        }
      />
      <DJangoPage />
    </>
  );
}

export default Django;
