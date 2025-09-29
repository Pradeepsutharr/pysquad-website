import Image from "next/image";
import React from "react";

const facilities = [
  {
    id: "1",
    image: "https://picsum.photos/500",
    title: "Why Work at Pysquad",
    description:
      "More than 25 services designed to make technology simple and impactful",
  },
  {
    id: "2",
    image: "https://picsum.photos/500",
    title: "Growth & Innovation Focus",
    description:
      "Work on AI, cloud, and digital products, learn new tech, and grow your skills every day.",
  },
  {
    id: "3",
    image: "https://picsum.photos/500",
    title: "Culture & Creativity",
    description:
      "Be part of a supportive team where your ideas are heard and you can experiment freely.",
  },
  {
    id: "4",
    image: "https://picsum.photos/500",
    title: "Future & Opportunity",
    description:
      "Get project ownership, global exposure, and hands-on learning with cutting-edge tools.",
  },
];

function CareerHeroSec() {
  return (
    <>
      <section className="py-12 md:py-16 lg:py-20 relative">
        <Image
          src="/images/hero_bg.png"
          alt="join_pysquad"
          fill
          priority
          className=" object-cover z-[-1]"
        />
        <div className="container p-0">
          <div className="col-12 text-center">
            <h1 className="flex text-textPrimary flex-col text-3xl lg:text-5xl font-bold lg:leading-snug capitalize">
              join our team
            </h1>

            <p className="text-textSecondary text-xl lg:px-20 mt-4 leading-relaxed">
              At Pysquad, we believe that innovation comes from collaboration
              and creativity. Here, every team member has the freedom to
              experiment, share ideas, and build products that make a real
              impact. If you are passionate about technology and solving complex
              challenges, this is the place for you to grow and thrive
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container p-0">
          <div className="facilities flex flex-wrap items-center justify-between ">
            {facilities?.map((item) => (
              <div key={item.id} className="col-12 md:col-6 lg:col-3">
                <div className="bg-[#E8F5F4] p-[4px] rounded-2xl">
                  <div className="flex flex-col items-center text-center  rounded-2xl border border-[#E8F5F4] bg-white  px-6 py-6 ">
                    <div className="mb-4">
                      <Image
                        src={item.image}
                        alt="pysquad"
                        width={100}
                        height={100}
                        className="rounded-full w-auto h-auto"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-bold text-textPrimary mb-1">
                        {item.title}
                      </h4>
                    </div>
                    <p className=" text-textSecondary  text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default CareerHeroSec;
