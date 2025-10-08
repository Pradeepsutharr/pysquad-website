import Image from "next/image";
import React from "react";

function CultureGallery() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto p-0">
        <div className="flex flex-wrap justify-between items-center">
          <div className="col-12 md:col-4">
            <h2 className="text-primary text-xl lg:text-4xl font-semibold leading-normal">
              Community Contributions
            </h2>
            <p className="text-textSecondary mt-6 pe-0 lg:pe-6">
              At Pysquad Informatics LLP, we believe great ideas grow when
              people have freedom. We give our team the independence to be
              creative and solve problems. Whether it’s trying a new project
              approach or working flexible hours, our employees have the freedom
              to make choices that help them and our clients succeed.
            </p>
          </div>

          <div className="md:col-6 col-12">
            <div className="image-grid justify-between grid grid-cols-10 grid-rows-11">
              <div className=" grid col-start-1 col-end-7 row-start-1 row-end-10 shadow-lg ">
                {" "}
                <Image
                  className="object-cover w-full h-full border-4 border-white rounded-lg"
                  src="https://storage.googleapis.com/pys-web-live/assets/img/culture/img1.png"
                  alt="pysquad"
                  width={500}
                  height={500}
                />
              </div>
              <div className=" grid col-start-2 col-end-7 row-start-8 row-end-13 shadow-lg ">
                <Image
                  className="object-cover w-full h-full border-4 border-white rounded-lg"
                  src="https://storage.googleapis.com/pys-web-live/assets/img/culture/img4.png"
                  alt="pysquad"
                  width={500}
                  height={500}
                />
              </div>
              <div className=" grid col-start-6 col-end-12 row-start-2 row-end-10 shadow-lg ">
                <Image
                  className="object-cover w-full h-full border-4 border-white rounded-lg"
                  src="https://storage.googleapis.com/pys-web-live/assets/img/culture/img2.png"
                  alt="pysquad"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center mt-12">
          <div className="md:col-6 col-12">
            <div className="image-grid justify-between grid grid-cols-10 grid-rows-11">
              <div className=" grid col-start-1 col-end-7 row-start-1 row-end-10 shadow-lg ">
                {" "}
                <Image
                  className="object-cover w-full h-full border-4 border-white rounded-lg"
                  src="https://storage.googleapis.com/pys-web-live/assets/img/culture/img3.png"
                  alt="pysquad"
                  width={500}
                  height={500}
                />
              </div>
              <div className=" grid col-start-6 col-end-12 row-start-2 row-end-10 shadow-lg ">
                <Image
                  className="object-cover w-full h-full border-4 border-white rounded-lg"
                  src="https://storage.googleapis.com/pys-web-live/assets/img/culture/img5.png"
                  alt="pysquad"
                  width={500}
                  height={500}
                />
              </div>
              <div className=" grid col-start-2 col-end-7 row-start-8 row-end-13 shadow-lg ">
                <Image
                  className="object-cover w-full h-full border-4 border-white rounded-lg"
                  src="https://storage.googleapis.com/pys-web-live/assets/img/culture/img2.png"
                  alt="pysquad"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>

          <div className="col-12 md:col-4">
            <h2 className="text-primary text-xl lg:text-4xl font-semibold leading-normal">
              A Canvas for Creativity
            </h2>
            <p className="text-textSecondary mt-6 pe-0 lg:pe-6">
              Our company culture is a canvas for creativity. Whether
              you&apos;re a coder, designer, or marketing wizard, we encourage
              everyone to infuse their unique creativity into their work. This
              is where ideas are nurtured and solutions are crafted with a
              personal touch. The lead ensures that the project stays in-line
              with client&apos;s requirements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CultureGallery;
