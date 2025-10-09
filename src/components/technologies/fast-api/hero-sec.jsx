import React from "react";
import Image from "next/image";
import CtaButton from "@/ui/cta-btn";

function FastApiHero() {
  return (
    <>
      <section className="py-12 md:py-16 lg:py-20 relative">
        <Image
          src="/images/tech_hero_bg.png"
          alt="pysquad"
          fill
          priority
          quality={100}
          className="object-cover z-[-1]"
        />
        <div className="container">
          <div className="flex flex-wrap justify-between items-center">
            <div className="col-12 md:col-6 lg:col-6">
              <h1 className="text-3xl lg:text-5xl font-bold lg:leading-tight capitalize text-white">
                <span>Build High-Performance APIs Faster with</span>
                <span className="text-primary"> FastAPI</span>
              </h1>

              <p className="text-white mt-5">
                Unlock the full potential of Python development with FastAPI.
                Whether building high-performance RESTful APIs, scalable
                microservices, or real-time dashboards, FastAPI empowers you to
                ship secure and efficient applications—faster than ever before.
              </p>

              <div className="mt-10 mx-auto text-center md:text-start">
                <CtaButton
                  text={"Get Your Free Project Roadmap"}
                  link={"/contact"}
                />
              </div>
            </div>
            <div className="col-12 md:col-6 lg:col-5">
              <Image
                src="/images/fastapi.svg"
                width={422}
                height={416}
                priority
                fetchPriority="high"
                alt="pysquad_python"
                className="max-h-80 md:w-auto ms-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FastApiHero;
