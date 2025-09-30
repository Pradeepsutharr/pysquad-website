import React from "react";
import Image from "next/image";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { testimonial_data } from "@/components/home/data/testimonial-data";

function ClientReviews() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-[#F8FCFB]">
      <div className="container p-0">
        <div className="col-12">
          <div className="flex flex-col text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold  text-textPrimary capitalize">
              what our <span className="text-primary">clients say</span>
            </h2>
            <p className="text-textSecondary font-normal">
              Our clients’ words reflect the value and impact of our solutions
            </p>
          </div>

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
            className="mySwiper"
          >
            {testimonial_data &&
              testimonial_data.map((item, index) => (
                <SwiperSlide key={index} className="py-6">
                  <div className="card border-2 border-primary rounded-2xl  px-6 pb-6 text-center">
                    <Image
                      src={item.client_image}
                      alt={item.client_name}
                      height={50}
                      width={50}
                      className="rounded-full border border-white shadow-lg mx-auto translate-y-[-50%]"
                    />
                    <p className="text-textSecondary">{item.description}</p>
                    <h3 className="text-primary mt-3 font-semibold">
                      {item.client_name}
                    </h3>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>

          {/* <Link
            href=""
            className="text-primary underline text-center block mt-10 capitalize"
          >
            view all testimonials
          </Link> */}
        </div>
      </div>
    </section>
  );
}

export default ClientReviews;
