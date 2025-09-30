import CtaButton from "@/ui/cta-btn";
import Image from "next/image";
import React from "react";

function NeedSolutions({ technology }) {
  return (
    <section className="tech-need-soution py-12 md:py-16 lg:py-20 relative">
      <Image
        src="/images/tech_need_solution.png"
        alt="pysquad"
        fill
        priority
        className="object-cover z-[-1]"
      />
      <div className="container p-0">
        <div className="flex flex-col text-center">
          <div className="col-12">
            <h2 className="text-3xl text-primary md:text-3xl font-semibold  capitalize">
              Need expert {technology} solutions?
            </h2>
            <h3 className="text-4xl font-semibold capitalize my-6 text-white">
              Hire our developers and get it done right
            </h3>
          </div>

          <div className="col-12 md:col-4 mx-auto">
            <CtaButton text={"hire a developer & build"} link={"/contact"} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default NeedSolutions;
