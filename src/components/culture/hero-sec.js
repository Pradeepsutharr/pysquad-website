import Image from "next/image";
import React from "react";

function CultureHero() {
  return (
    <section className="py-12 md:py-16 lg:py-20 relative">
      <Image
        src="/images/hero_bg.png"
        alt="join_pysquad"
        fill
        priority
        fetchPriority="high"
        className=" object-cover"
      />
      <div className="container">
        <div className="col-12 text-center">
          <h1 className="capitalize text-textPrimary text-3xl lg:text-5xl font-bold lg:leading-snug">
            <span className="text-primary">Life at </span>
            pysquad
          </h1>
        </div>
      </div>
    </section>
  );
}

export default CultureHero;
