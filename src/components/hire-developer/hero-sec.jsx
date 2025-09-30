import React from "react";
import Image from "next/image";

function HireDevHero() {
  return (
    <>
      <section className=" py-12 md:py-16 lg:py-20 relative">
        <Image
          src="/images/hero_bg.png"
          fill
          alt="pysquad"
          priority
          className="object-cover z-[-1] opacity-50"
        />
        <div className="container p-0">
          <div className="text-center lg:col-9 col-12 mx-auto">
            <h1 className=" text-3xl text-textPrimary mb-4 lg:text-5xl font-bold lg:leading-snug capitalize">
              Expert Developers for Your Project
            </h1>
            <p className="text-textSecondary leading-loose">
              Whatever your goal or project size, we will handle it utilizing
              standards compliance. We hope you will be 100% satisfied.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default HireDevHero;
