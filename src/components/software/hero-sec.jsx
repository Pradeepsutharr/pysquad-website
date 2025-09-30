import Image from "next/image";
import React from "react";

function SoftwareHero() {
  return (
    <>
      <section className=" py-12 md:py-16 lg:py-20 relative">
        <Image
          src="/images/hero_bg.png"
          fill
          alt="pysquad"
          priority
          className="object-cover z-[-1] opacity-50"
        />
        <div className="container p-0">
          <div className="text-center lg:col-10 col-12 mx-auto">
            <h1 className=" text-3xl text-textPrimary mb-4 lg:text-5xl font-bold lg:leading-snug capitalize">
              Tailored Software Solutions for Your Business
            </h1>
            <p className="text-textSecondary leading-loose">
              If you're seeking a comprehensive software solution for your
              business, PySquad Informatics is here to help. We specialize in
              delivering customized software solutions that align with your
              unique business requirements. Our team of experts will work
              closely with you to understand your needs and develop a tailored
              software solution that enhances productivity, efficiency, and
              growth. From conceptualization to implementation and ongoing
              support, we ensure that our software solutions are scalable,
              secure, and user-friendly. Contact us today to discuss your
              software needs and discover how we can empower your business.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default SoftwareHero;
