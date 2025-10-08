import CtaButton from "@/ui/cta-btn";
import Image from "next/image";
import React from "react";

function LogisticsHeroSec() {
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
            Grow with Pysquad Logistics
          </h1>
          <p className="text-textPrimary my-6">
            Scale faster with Pysquad Logistics and truly future-ready
            solutions. Lower operational costs, streamline shipments, and
            enhance visibility. IT-first supply chain, smart inventory systems,
            managed services, drive business to new horizons.
          </p>
        </div>
        <div className="col-12 text-center ">
          <CtaButton text={"talk to an expert"} link={"/contact"} />
        </div>
      </div>
    </section>
  );
}

export default LogisticsHeroSec;
