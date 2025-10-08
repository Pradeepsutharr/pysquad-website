import CtaButton from "@/ui/cta-btn";
import Image from "next/image";
import React from "react";

function AviationHero() {
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
            Grow with Pysquad Aviation Solutions
          </h1>
          <p className="text-textPrimary my-6">
            Soar to new heights with Pysquad’s advanced digital transformation
            solutions tailored for aviation. Enhance operational efficiency,
            improve safety, and deliver exceptional passenger experiences with
            cutting-edge technologies designed for airlines, airports, and
            aerospace providers.
          </p>
        </div>
        <div className="col-12 text-center ">
          <CtaButton text={"talk to an expert"} link={"/contact"} />
        </div>
      </div>
    </section>
  );
}

export default AviationHero;
