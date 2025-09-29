import Link from "next/link";
import React from "react";
import CtaButton from "../ui/cta-btn";
import Image from "next/image";

function Hero() {
  return (
    <section className=" lg:py-20 relative">
      <Image
        src="/images/hero_bg.png"
        alt="pysquad"
        fill
        priority
        fetchPriority="high"
        className="object-cover opacity-40"
      />
      <div className="container lg:py-14">
        <div className=" col-12flex flex-col justify-center text-center lg:py-12 ">
          <h1 className="flex flex-col text-3xl lg:text-5xl font-bold lg:leading-snug capitalize">
            <span className="text-textPrimary">
              Product Builds & IT Services Under One Roof
            </span>
            <span className="text-primary">From Concept to Completion </span>
          </h1>

          <p className="text-textSecondary text-xl lg:px-20 mt-8 leading-relaxed">
            At Pysquad, we design and develop smart digital products while
            offering full-scale IT services all crafted to help your business
            grow faster, operate smoother, and scale with confidence.
          </p>

          <div className="md:flex-row flex-col  justify-center mt-10">
            <CtaButton text={"Design with experts"} link={"/contact"} />
            <Link
              href=""
              className="capitalize mt-4 lg:mt-0 lg:inline block py-3 px-10 text-primary text-lg font-medium border-primary border  rounded-lg"
            >
              See our work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
