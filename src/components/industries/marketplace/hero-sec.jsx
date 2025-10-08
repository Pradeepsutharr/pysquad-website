import CtaButton from "@/ui/cta-btn";
import Image from "next/image";
import React from "react";

function MarketplaceHero() {
  return (
    <section className="py-12 md:py-16 relative">
      <Image
        src="/images/hero_bg.png"
        alt="pysquad"
        fill
        priority
        className="object-cover z-[-1] opacity-50"
      />
      <div className="container">
        <div className="text-center lg:col-9 col-12 mx-auto">
          <h1 className=" text-3xl text-textPrimary mb-4 lg:text-5xl font-bold lg:leading-snug capitalize">
            Grow with Pysquad E-Commerce Solutions
          </h1>
          <p className="text-textPrimary my-6">
            Accelerate your online business with Pysquad’s innovative e-commerce
            and marketplace solutions. Launch, scale, and manage marketplaces or
            e-stores with robust, scalable platforms that empower commerce,
            enhance customer experience, and drive revenue.
          </p>
        </div>
        <div className="col-12 text-center ">
          <CtaButton text={"talk to an expert"} link={"/contact"} />
        </div>
      </div>
    </section>
  );
}

export default MarketplaceHero;
