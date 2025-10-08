import React from "react";
import Image from "next/image";
import CtaButton from "@/ui/cta-btn";

function ServicesHero() {
  return (
    <section className="service-hero py-12 md:py-16 lg:py-20 relative">
      <Image
        src="/images/hero_bg.png"
        alt="pysquad"
        fill
        priority
        className="object-cover z-[-1] opacity-45"
      />
      <div className="container py-12 md:py-16 lg:py-20">
        <div className="flex flex-col justify-center items-center text-center">
          <h1 className=" text-3xl lg:text-5xl font-bold lg:leading-snug capitalize">
            <span className="text-textPrimary">Comprehensive </span>
            <span className="text-primary"> IT Solutions & Services </span>
          </h1>

          <p className="text-textSecondary text-xl lg:px-20 mt-6 leading-relaxed">
            PySquad offers a wide range of IT solutions and services to help
            your business thrive in today&apos;s digital landscape. Our team of
            experts provides end-to-end solutions to help you achieve your
            business goals, from web development and design to enterprise
            resource planning, cloud solutions, and more.
          </p>
        </div>

        <div className="flex items-center justify-center mt-10">
          <CtaButton text={"get your free project roadmap"} link={"/contact"} />
        </div>
      </div>
    </section>
  );
}

export default ServicesHero;
