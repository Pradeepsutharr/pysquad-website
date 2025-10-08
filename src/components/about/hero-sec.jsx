import React from "react";
import CtaButton from "@/ui/cta-btn";
import Link from "next/link";
import Image from "next/image";

function AboutHeroSec() {
  return (
    <section className="about-hero-sec py-12 md:py-16 lg:py-20 relative">
      <Image
        src="/images/hero_bg.png"
        fill
        alt="pysquad"
        priority
        className="object-cover z-[-1] opacity-45"
      />
      <div className="container p-0">
        <div className="text-center lg:col-9 col-12 mx-auto">
          <h1 className=" text-3xl text-textPrimary mb-4 lg:text-5xl font-bold lg:leading-snug capitalize">
            About pysquad
          </h1>
          <p className="text-textPrimary  ">
            Explore our insightful blogs for the latest trends, expert insights,
            and valuable information in the world of technology, business, and
            innovation. Stay informed, inspired, and discover new perspectives
            with our engaging blog posts.
          </p>
        </div>

        <div className="col-12 lg:col-8 flex flex-wrap justify-center gap-3 mx-auto mt-6">
          {/* <CtaButton text={"meet the team"} link={"/team"} /> */}

          <Link
            href="/contact"
            className="border border-primary px-10 py-3 rounded-lg capitalize text-lg text-primary"
          >
            Work with us
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AboutHeroSec;
