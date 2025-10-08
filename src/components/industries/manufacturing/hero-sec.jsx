import CtaButton from "@/ui/cta-btn";
import Image from "next/image";
import React from "react";
import Stats from "../common/stats";

function ManufacturingHero() {
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
            Grow with Pysquad Manufacturing Solutions
          </h1>
          <p className="text-textPrimary my-6">
            Revolutionize your manufacturing processes with Pysquad’s
            cutting-edge digital transformation technologies. Enhance
            productivity, reduce downtime, and increase product quality through
            smart automation and data-driven insights tailored for modern
            manufacturers.
          </p>
        </div>
        <div className="col-12 text-center ">
          <CtaButton text={"talk to an expert"} link={"/contact"} />
        </div>
      </div>
    </section>
  );
}

export default ManufacturingHero;
