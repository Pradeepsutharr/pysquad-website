import React from "react";
import {
  Stethoscope,
  Hotel,
  Truck,
  Plane,
  SquareDashedKanban,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { industries } from "@/Data/industries";

function IndustriesWeServe() {
  return (
    <section className=" lg:py-20 py-8 relative">
      <Image
        src="/images/industries_serve_bg.png"
        alt="pysquad_industries"
        fill
        priority
        quality={60}
        className="object-cover opacity-40 z-[-1]"
      />
      <div className="container p-0 md:p-1">
        <div className="col-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-2">
            Industries <span className="text-primary">We Serve</span>
          </h2>
          <p className="text-gray-700 mb-8">
            Every Industry Is Unique, We Build Custom Tech Solutions That Solve
            Real Challenges, Simplify Workflows, And Drive Faster, Smarter
            Growth.
          </p>
        </div>
        <div className="col-12">
          <Swiper
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={100}
            loop={true}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="mySwiper "
          >
            {industries.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="ps-0">
                  <div className="bg-white min-h-[400px] rounded-lg relative shadow-sm p-5 border border-gray-200 text-center hover:shadow-lg transition-shadow industry-card">
                    <div className="content flex flex-col justify-between ">
                      <div>
                        <div className="border-b-2 border-slate-100 py-3 pb-6 w-full flex justify-center mb-5">
                          <span className="industry-icon">{item.icon}</span>
                        </div>
                        <h3 className="text-xl font-medium mb-3 text-primary">
                          {item.title}
                        </h3>
                        <p className="text-textSecondary">{item.description}</p>
                      </div>
                      <div className="absolute left-0 right-0 bottom-6">
                        <Link
                          href="#"
                          className="py-1 px-4 inline-block text-textSecondary hover:text-primary border border-textSecondary hover:border-primary duration-200 rounded-full "
                        >
                          Read more
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* <div className="flex flex-wrap justify-between ">
          {industries.map((item, index) => (
            <div key={index} className="col-12 md:col-3 ps-0">
              <div className="  bg-white rounded-lg shadow-sm p-6 border border-gray-200 flex flex-col items-center text-center hover:shadow-lg transition-shadow industry-card">
                <div className="content">
                  <div className="border-b-2 border-slate-100 py-3 pb-6 w-full flex justify-center mb-5">
                    <span>{item.icon}</span>
                  </div>
                  <h3 className="text-xl font-medium mb-2 text-textPrimary">
                    {item.title}
                  </h3>
                  <p className="text-textSecondary">{item.description}</p>
                  <Link
                    href="#"
                    className="mt-5 py-1 px-4 inline-block text-textSecondary hover:text-primary border border-textSecondary hover:border-primary duration-200 rounded-full "
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}

export default IndustriesWeServe;
