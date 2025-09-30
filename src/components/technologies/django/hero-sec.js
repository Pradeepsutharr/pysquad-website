import React from "react";
import Image from "next/image";
import Link from "next/link";
import CtaButton from "@/ui/cta-btn";

function DjangoHero() {
  return (
    <>
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container p-0">
          <div className="flex flex-wrap justify-between items-center">
            <div className="col-12 md:col-6 lg:col-6">
              <h1 className="text-3xl lg:text-5xl font-bold lg:leading-tight capitalize text-textPrimary">
                <span className="text-primary">creafting powerfull web </span>
                <span>solutions with django</span>
              </h1>

              <p className="text-textSecondary mt-5">
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
            <div className="col-12 md:col-6 lg:col-5">
              <Image
                src=""
                width={220}
                height={220}
                alt="pysquad_django"
                className="ms-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DjangoHero;
