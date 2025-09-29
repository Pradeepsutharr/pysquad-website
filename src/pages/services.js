import React from "react";
import dynamic from "next/dynamic";
import SEO from "@/components/common/seo";
const ServicesPage = dynamic(() => import("../components/services"));

function Services() {
  return (
    <>
      <SEO
        pageTitle={"Web development | App | AI services | ERP services | ERP"}
        ogTitle={"Web development | App | AI services | ERP services | ERP"}
        ogUrl={"https://pysquad.com/services"}
        pageDescription={
          "PySquad is a leading web app development company World wide. We provide custom web design & development services using modern technologies at affordable cost."
        }
        keywords={
          "Web development, App Development, Aws solutions, Azure Solutions, API design, ERP Services"
        }
      />
      <ServicesPage />
    </>
  );
}

export default Services;
