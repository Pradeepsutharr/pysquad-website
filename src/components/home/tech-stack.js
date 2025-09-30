import React from "react";
import {
  frontend,
  backend,
  dataBase,
  cloud,
  native,
  tools,
  ai,
} from "./data/tech-stack-data";
import CtaButton from "@/ui/cta-btn";
import Image from "next/image";

function TechStack() {
  const [activeTab, setActiveTab] = React.useState(0);

  let data = [];
  switch (activeTab) {
    case 0:
      data = backend;
      break;
    case 1:
      data = frontend;
      break;
    case 2:
      data = dataBase;
      break;
    case 3:
      data = cloud;
      break;
    case 4:
      data = native;
      break;
    case 5:
      data = tools;
      break;
    case 6:
      data = ai;
      break;
    default:
      data = [];
      break;
  }

  return (
    <section className="relative lg:py-20 py-10">
      <Image
        src="/images/tech_stack_bg.png"
        alt="pysquad_tech_stack"
        fill
        className="object-cover z-[-1]"
      />
      <div className="container">
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-2 text-white">
            Build Your Next Big Thing with{" "}
            <span className="text-primary">Our Tech Stack</span>
          </h2>
          <p className="text-gray-300 mb-10 text-center">
            We build future-ready solutions using the most powerful and reliable
            technologies — designed to grow with your business and adapt to
            what’s next.
          </p>
        </div>

        {/* Tabs */}
        <div>
          <div className="flex flex-nowrap tech-btn-group overflow-x-scroll overflow-y-hidden items-center lg:justify-center mt-10 ">
            {[
              "Back end",
              "Front end",
              "Database",
              "Cloud",
              "Native",
              "Tools",
              "AI",
            ].map((tech, index) => (
              <button
                name="filter-btn"
                key={index}
                onClick={() => setActiveTab(index)}
                className={`tech-btn relative whitespace-nowrap min-w-[160px] border-b-2 font-bold border-[#A1A5A4] px-14 leading-loose pb-2 ${
                  activeTab === index ? "active text-primary" : "text-white"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="flex flex-wrap items-center justify-center mt-8">
            {data.map((item, index) => (
              <div
                key={index}
                className="tech-card flex justify-center m-5 outline-white outline-2  outline-dashed  rounded-full"
              >
                <figure className=" flex justify-center items-center w-[100px] h-[100px] m-4 p-4 bg-white rounded-full ">
                  <div className="tech-icon p-4">{item.icon}</div>
                </figure>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-20">
            <CtaButton text={"launch your idea with us"} link={"/contact"} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TechStack;
