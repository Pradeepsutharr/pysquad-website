import React from "react";
import CtaButton from "@/ui/cta-btn";
import Image from "next/image";

function OurExpertise() {
  return (
    <section className="service-our-expertise py-12 md:py-16 lg:py-20 relative">
      <Image
        src="/images/service_our_expertise.png"
        fill
        alt="pysquad"
        priority
        className="object-cover z-[-1]"
      />
      <div className="container">
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-3xl md:text-4xl font-semibold  text-white">
            Your Idea, Our Expertise
          </h2>
          <p className="text-white my-8 text-center font-normal">
            Every business starts with an idea, but turning that idea into
            reality requires the{" "}
            <span className="text-primary">right guidance and tools.</span> From
            building a strong digital presence to streamlining operations with
            <span className="text-primary">smart solutions,</span> we{" "}
            <span className="text-primary"> help you at every step.</span> Let
            us simplify the process so you can focus on what matters most -
            <span className="text-primary">growing your business.</span>
          </p>

          <CtaButton text={"request a free quote"} link={"/contact"} />
        </div>
      </div>
    </section>
  );
}

export default OurExpertise;
