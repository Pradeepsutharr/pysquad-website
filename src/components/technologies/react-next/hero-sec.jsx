import React from "react";
import Image from "next/image";
import CtaButton from "@/ui/cta-btn";

function ReactHero() {
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
            <div className="col-12 md:col-6 lg:col-7">
              <h1 className="text-3xl lg:text-5xl font-bold lg:leading-tight capitalize text-white">
                <span>From Static to Soaring: Build Anything with</span>
                <span className="text-primary"> React & Next.js </span>
              </h1>

              <p className="text-white mt-5">
                Bring your digital vision to life with React and Next.js.
                Whether building dynamic web applications or full-scale digital
                platforms, these powerful technologies empower you to deliver
                blazing-fast, scalable, and SEO-friendly user experiences across
                all devices.
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
                src="/images/react.svg"
                width={422}
                height={416}
                priority
                fetchPriority="high"
                alt="pysquad_react"
                className="ms-auto w-auto max-h-80 animate-[spin_10s_linear_infinite]"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ReactHero;
