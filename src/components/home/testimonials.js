import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { testimonial_data } from "./data/testimonial-data";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { Star, StarHalf } from "lucide-react";

function Testimonials() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const videoRef = useRef(null);

  const openModal = (videoUrl) => {
    setActiveVideo(videoUrl);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setActiveVideo(null);
  };

  const swiperRef = useRef(null);
  const paginationRef = useRef(null);

  const [paginationEl, setPaginationEl] = useState(null);

  useEffect(() => {
    if (swiperRef.current && paginationEl) {
      swiperRef.current.params.pagination.el = paginationEl;
      swiperRef.current.pagination.init();
      swiperRef.current.pagination.update();
    }
  }, [paginationEl]);

  return (
    <section className="lg:py-20 md:py-16 py-12">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-semibold capitalize mb-2 text-textPrimary">
          hear it from <span className="text-primary">our clients</span>
        </h2>
        <p className="text-textSecondary mb-10 ">
          We offer complete IT solutions — from web design and software
          development to automation and tech support — helping businesses work
          smarter and grow faster.
        </p>
        <div className="flex flex-wrap justify-between items-center relative">
          <Swiper
            spaceBetween={30}
            // navigation={true}
            modules={[Pagination]}
            onBeforeInit={(swiper) => {
              swiper.params.pagination.el = paginationRef.current;
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 50,
              },
            }}
            pagination={{
              el: paginationEl,
              clickable: true,
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="mySwiper"
          >
            {testimonial_data.map((item, index) => (
              <SwiperSlide
                key={index}
                className="rounded-md  flex flex-col gap-2"
              >
                <div
                  className="relative rounded-md overflow-hidden shadow-md cursor-pointer"
                  onClick={() => openModal(item.video)}
                >
                  <Image
                    src={item.poster}
                    alt="Client video thumbnail"
                    className="w-full h-auto rounded-sm brightness-50"
                    width={320}
                    height={180}
                    priority
                  />
                  {/* Play button centered */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white bg-opacity-100 rounded-full p-3">
                      <svg
                        className="w-8 h-8 text-gray-800"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center absolute bottom-4 left-5">
                    <div className="image rounded-full overflow-hidden w-[50px] h-[50px] ">
                      <Image
                        src={item.client_image}
                        alt={item.client_name}
                        className="w-full h-full object-cover"
                        height={100}
                        width={100}
                      />
                    </div>

                    <div>
                      <h3 className=" font-semibold text-lg text-white">
                        {item.client_name}
                      </h3>
                      <span className="flex items-center text-yellow-300 ">
                        {" "}
                        <Star className="fill-yellow-300 w-[15px]" />{" "}
                        <Star className="fill-yellow-300 w-[15px]" />{" "}
                        <Star className="fill-yellow-300 w-[15px]" />{" "}
                        <Star className="fill-yellow-300 w-[15px]" />{" "}
                        <StarHalf className="fill-yellow-300 w-[15px]" />{" "}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-left mt-3">
                  <p className="text-textSecondary italic text-base ">
                    “This company transformed our business with their
                    outstanding service and support. Highly recommend!”
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex flex-wrap justify-between items-center mt-10">
          <div
            ref={(node) => setPaginationEl(node)}
            className="mb-6 col-8 flex gap-2 custom-pagination col cursor-pointer "
          ></div>
          <Link
            href="#"
            className="capitalize underline text-primary font-medium whitespace-nowrap text-right"
          >
            view all testimonials
          </Link>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-black rounded-lg max-w-6xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={videoRef}
              controls
              autoPlay
              className="w-full h-auto rounded-lg"
              src={activeVideo}
            >
              Your browser does not support the video tag.
            </video>
            <button
              name="close-modal-btn"
              onClick={closeModal}
              className="absolute top-2 right-3 text-white text-3xl font-bold focus:outline-none"
              aria-label="Close video modal"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Testimonials;
