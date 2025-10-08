import React from "react";
import dynamic from "next/dynamic";

const MarketplaceComponent = dynamic(() =>
  import("../components/industries/marketplace")
);

function Marketplace() {
  return <MarketplaceComponent />;
}

export default Marketplace;
