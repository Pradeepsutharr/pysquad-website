import React from "react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Hexagon } from "lucide-react";
import { history_data } from "./data/history-data";

function OurJourney() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-[#131D1B]">
      <div className="container">
        <div className="col-12">
          <h2 className="text-3xl capitalize md:text-4xl font-semibold text-center mb-2 text-white">
            our
            <span className="text-primary"> journey</span>
          </h2>
          <p className="text-gray-300 mb-10 text-center mt-4">
            From our early beginnings to where we are today, Pysquad has grown
            with one goal in mind creating technology that drives meaningful
            impact
          </p>
        </div>

        <div className="our-journey-slider relative">
          <Swiper
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={30}
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
            {history_data.map((item, index) => (
              <SwiperSlide
                key={index}
                className="rounded-md  flex flex-col  gap-2"
              >
                <div className=" px-0 md:px-6 lg:px-10 flex flex-col justify-center items-center text-center">
                  <div className="icon">
                    <Hexagon fill="#131D1B" color="white" size={50} />
                  </div>

                  <h2 className="text-white text-xl font-semibold">
                    {item.year}
                  </h2>
                  <p className="text-white font-light md:mt-10 mt-6 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default OurJourney;
