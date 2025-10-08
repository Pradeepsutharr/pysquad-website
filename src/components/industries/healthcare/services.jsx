import Image from "next/image";
import React from "react";
import { services } from "./data/services-data";
import CtaButton from "@/ui/cta-btn";

function Services() {
  return (
    <section className="bg-[#131D1B] py-12 md:py-16 relative">
      <Image
        src="/images/logistics_services_bg.png"
        alt="pysquad"
        fill
        className="object-cover z-[-1] opacity-50"
      />

      <div className="container">
        <div className="col-12">
          <h2 className="text-3xl text-white mb-2 font-semibold capitalize">
            it solutions & services
            <span className="text-primary"> we offer</span>
          </h2>
          <p className=" text-white">
            We offer complete IT solutions from web design and software
            development to automation and tech support helping businesses work
            smarter and grow faster.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-start gap-y-10 mt-6">
          {services?.map((item) => (
            <div key={item.id} className="col-12 md:col-6 lg:col-3">
              <div className="content mx-auto md:max-w-[90%] w-full">
                <span>{item.icon}</span>

                <h3 className="text-white font-medium text-lg my-4">
                  {item.title}
                </h3>
                <p className="text-white font-light ">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="col-12 text-center mt-12 md:mt-16">
          <CtaButton text={"Get Your Free Project Roadmap"} link={"/contact"} />
        </div>
      </div>
    </section>
  );
}

export default Services;
