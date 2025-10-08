import CtaButton from "@/ui/cta-btn";
import Image from "next/image";
import React from "react";
import Stats from "../common/stats";

function MediaHero() {
  return (
    <section className="py-12 md:py-16 relative">
      <Image
        src="/images/hero_bg.png"
        alt="pysquad"
        fill
        priority
        className="object-cover z-[-1] opacity-50"
      />
      <div className="container">
        <div className="text-center lg:col-9 col-12 mx-auto">
          <h1 className=" text-3xl text-textPrimary mb-4 lg:text-5xl font-bold lg:leading-snug capitalize">
            Grow with Pysquad News & Media Solutions
          </h1>
          <p className="text-textPrimary my-6">
            Transform how stories are created, delivered, and monetized with
            Pysquad’s digital solutions for news and media. Streamline editorial
            workflows, maximize audience engagement, and deliver real-time
            content across every screen and channel.
          </p>
        </div>
        <div className="col-12 text-center ">
          <CtaButton text={"talk to an expert"} link={"/contact"} />
        </div>
      </div>
    </section>
  );
}

export default MediaHero;
