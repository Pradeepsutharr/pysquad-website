import React from "react";
import { testimonial_data } from "@/Data/testimonial-data";
import Image from "next/image";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { MoveLeft, MoveRight } from "lucide-react";
import Link from "next/link";

function ClientReviewArea() {
  return (
    <section className="bg-[#131D1B] py-12 md:py-16">
      <div className="container relative">
        <Swiper
          //   autoplay={{
          //     delay: 2000,
          //     disableOnInteraction: false,
          //   }}
          modules={[Pagination, Navigation, Autoplay]}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          spaceBetween={30}
          loop={true}
          slidesPerView={1}
          className="mySwiper col-12 md:col-8"
        >
          {testimonial_data &&
            testimonial_data.map((item, index) => (
              <SwiperSlide key={index} className="pt-12">
                <div className="card border-2 border-white rounded-[50px] p-10 text-center max-w-[700px] mx-auto relative">
                  <Image
                    src={item.client_image}
                    alt={item.client_name}
                    height={80}
                    width={80}
                    className="rounded-full border-2 border-white shadow-lg left-[45%] top-[-40px] absolute"
                  />
                  <p className="text-white py-10">{item.description}</p>
                  <h3 className="text-primary text-xl font-semibold">
                    {item.client_name}
                  </h3>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
        <div className=" hidden md:flex justify-between">
          <div className="pagination flex gap-1 items-center "></div>
          <button
            name="prev-btn"
            className="custom-prev p-2 border-white border rounded-full absolute top-[50%] left-0 z-10"
          >
            <MoveLeft size={20} color="#ffffff" />
          </button>
          <button
            name="next-btn"
            className="custom-next p-2 border-white border rounded-full absolute top-[50%] right-0 z-10"
          >
            <MoveRight size={20} color="#ffffff" />
          </button>
        </div>

        <div className="text-center mt-10">
          <Link
            href="/testimonials"
            className="text-primary underline font-medium capitalize"
          >
            read all success stories
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ClientReviewArea;
