import React from "react";
import Link from "next/link";
import StatsCards from "@/components/Stats-card";

function HeroNew() {
  return (
    <section className="hero-two lg:py-20">
      <div className="container lg:py-20">
        <div className="flex flex-col justify-center text-center lg:py-20 ">
          <h1 className="text-textPrimary flex flex-col text-5xl lg:text-8xl font-semibold leading-loose">
            Automate. Engage. Convert. Powered by AI.
          </h1>

          <p className="text-textSecondary text-xl lg:px-20 mt-8 leading-relaxed lg:w-3/4 lg:mx-auto">
            At Pysquad, we design and develop smart digital products while
            offering full-scale IT services all crafted to help your business
            grow faster, operate smoother, and scale with confidence.
          </p>

          <div className="md:flex-row flex-col  justify-center mt-10">
            <Link
              href=""
              className="capitalize lg:mr-6 lg:inline block gredient-btn py-4 px-10 text-white text-lg font-medium rounded-lg shadow-lg"
            >
              Get Started
            </Link>
            <Link
              href=""
              className="capitalize mt-4 lg:mt-0 lg:inline block py-4 px-10 text-white bg-textPrimary text-lg font-medium rounded-lg shadow-lg"
            >
              learn more
            </Link>
          </div>
        </div>

        <div className="lg:w-4/5 mx-auto">
          <StatsCards />
        </div>
      </div>
    </section>
  );
}

export default HeroNew;
