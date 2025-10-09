import React from "react";
import Image from "next/image";
import Link from "next/link";
import CtaButton from "@/ui/cta-btn";

function DjangoHero() {
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
          <div className="flex flex-wrap justify-center md:justify-between items-center">
            <div className="col-12 md:col-6 lg:col-6">
              <h1 className="text-3xl lg:text-5xl font-bold lg:leading-tight capitalize text-white">
                <span className="text-primary">creafting powerfull web </span>
                <span>solutions with django</span>
              </h1>

              <p className="text-white mt-5">
                Experience the magic of Django. Whether you&apos;re building a
                simple blog, a dynamic e-commerce platform, or anything in
                between, Django empowers you to create powerful, secure, and
                future-proof web applications with unparalleled ease.
              </p>

              <div className="mt-10 mx-auto text-center md:text-start">
                <CtaButton
                  text={"Get Your Free Project Roadmap"}
                  link={"/contact"}
                />
              </div>
            </div>
            <div className="col-12 md:col-6 lg:col-5 ">
              <Image
                src="/images/django.svg"
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

export default DjangoHero;
