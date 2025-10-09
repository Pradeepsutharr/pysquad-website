import React from "react";
import Image from "next/image";
import CtaButton from "@/ui/cta-btn";

function PythonHero() {
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
        <div className="container p-0">
          <div className="flex flex-wrap justify-between items-center">
            <div className="col-12 md:col-6 lg:col-6">
              <h1 className="text-3xl lg:text-5xl font-bold lg:leading-tight capitalize text-white">
                <span className="text-primary">custom python solutions </span>
                <span>tailored for your growth</span>
              </h1>

              <p className="text-white mt-5">
                We don&apos;t just code, we listen. PySquad becomes an extension
                of your team, collaborating closely to understand your unique
                needs and craft bespoke Python solutions that perfectly align
                with your vision. Let&apos;s embark on this journey together
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
                src="/images/python.svg"
                width={439}
                height={438}
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

export default PythonHero;
