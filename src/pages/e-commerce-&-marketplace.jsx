import React from "react";
import dynamic from "next/dynamic";
import SEO from "@/common/seo";

const MarketplaceComponent = dynamic(() =>
  import("../components/industries/marketplace")
);

function Marketplace() {
  return (
    <>
      <SEO
        pageTitle={"E-Commerce & Marketplace Technology | Pysquad"}
        pageDescription={
          "Build scalable online stores and multivendor marketplaces with Pysquad’s end-to-end e-commerce platforms, automated order processing, and secure payment integrations."
        }
        keywords={
          "e-commerce solutions, marketplace development, online store, multivendor platform, payment integration, order automation, web commerce"
        }
        ogTitle={"Next-Gen E-Commerce Solutions | Pysquad"}
        ogUrl={"https://pysquad.com/e-commerce-&-marketplace"}
      />
      <MarketplaceComponent />;
    </>
  );
}

export default Marketplace;
