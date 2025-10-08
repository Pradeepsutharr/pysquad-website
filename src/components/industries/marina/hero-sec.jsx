import CtaButton from "@/ui/cta-btn";
import Image from "next/image";
import React from "react";

function MarinaHero() {
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
            Grow with Pysquad Marina Solutions
          </h1>
          <p className="text-textPrimary my-6">
            Unlock new levels of operational excellence with Pysquad IT
            solutions for marinas. Simplify dock management, enhance member
            experiences, and streamline every aspect of marina operations using
            modern software built for waterfront businesses.
          </p>
        </div>
        <div className="col-12 text-center ">
          <CtaButton text={"talk to an expert"} link={"/contact"} />
        </div>
      </div>
    </section>
  );
}

export default MarinaHero;
