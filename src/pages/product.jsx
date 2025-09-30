import React from "react";
import dynamic from "next/dynamic";
import SEO from "@/components/common/seo";

const ProductComponent = dynamic(() => import("../components/product"));

function Product() {
  return (
    <>
      <SEO
        pageTitle={"Upgrade, Customize or Migrate your website or product"}
      />
      <ProductComponent />
    </>
  );
}

export default Product;
