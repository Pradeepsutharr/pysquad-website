import { Section } from "lucide-react";
import Image from "next/image";
import React from "react";

function ContactHeroSec() {
  return (
    <section className="relative py-12 md:py-16">
      <Image
        src="/images/hero_bg.png"
        alt="pysquad"
        fill
        priority
        fetchPriority="high"
        className="object-cover opacity-45"
      />
      <div className="container">
        <div className="col-12 text-center">
          <h1 className=" text-3xl text-textPrimary mb-4 lg:text-5xl font-bold lg:leading-snug capitalize">
            Contact Us
          </h1>
          <p className="text-textPrimary  ">
            Get in touch with us and we’ll respond as soon as possible
          </p>
        </div>
      </div>
    </section>
  );
}

export default ContactHeroSec;
