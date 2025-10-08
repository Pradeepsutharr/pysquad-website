import Image from "next/image";
import React from "react";
import { journey_items } from "@/Data/project-journey";

function Journey() {
  return (
    <section className="journey-sec py-12 md:py-16 lg:py-20 relative">
      <Image
        src="/images/journey_bg.png"
        alt="pysquad"
        fill
        priority
        className="object-cover z-[-1]"
      />
      <div className="container p-0">
        <div className="flex">
          <div className="col-12 text-center">
            <h2 className="text-3xl text-white md:text-4xl font-semibold mb-2 capitalize">
              <span className="text-primary">your journey </span>
              with us
            </h2>
            <p className="text-white mb-10">
              From start to finish, your project is in safe hands—delivered on
              time, exactly as promised
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-between journey-timeline relative">
          {journey_items?.map((item) => (
            <div
              key={item.id}
              className="col-12 md:col-3 lg:col-2 text-center flex flex-col  items-center journey-card relative"
            >
              <div className="outline-white outline-dashed outline-2 rounded-full p-2">
                <figure className="bg-primary w-[60px] h-[60px] rounded-full flex items-center justify-center">
                  <span className="">{item.icon}</span>
                </figure>
              </div>

              <h3 className="text-white text-lg font-semibold my-4">
                {item.title}
              </h3>
              <p className="text-white text-sm ">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Journey;
