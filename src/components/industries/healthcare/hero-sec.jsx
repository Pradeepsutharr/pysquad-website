import CtaButton from "@/ui/cta-btn";
import Image from "next/image";
import React from "react";

function HealthcareHero() {
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
            Grow with Pysquad Healthcare Solutions
          </h1>
          <p className="text-textPrimary my-6">
            Empower your healthcare and pharmaceutical operations with Pysquad
            IT solutions. Enhance patient care, safeguard data, and optimize
            your clinical workflows with smart platforms tailored for providers,
            pharma companies, and healthcare networks.
          </p>
        </div>
        <div className="col-12 text-center ">
          <CtaButton text={"talk to an expert"} link={"/contact"} />
        </div>
      </div>
    </section>
  );
}

export default HealthcareHero;
