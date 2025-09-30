import Image from "next/image";
import React from "react";

function ProductHero() {
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
          <div className="text-center lg:col-12 col-12 mx-auto">
            <h1 className=" text-3xl text-textPrimary mb-4 lg:text-5xl font-bold lg:leading-snug capitalize">
              Revitalize Your Product with Redesign and Upgrades
            </h1>
            <p className="text-textSecondary leading-loose ">
              Is your existing product in need of a fresh look or enhanced
              functionality? PySquad Informatics offers redesign and upgrade
              services to breathe new life into your product. Our team of
              designers and developers will work closely with you to understand
              your goals and challenges, and then devise a comprehensive plan to
              revitalize your product. Whether it's a UI/UX redesign,
              performance optimization, or feature enhancements, we have the
              expertise to deliver results. We leverage the latest technologies
              and industry best practices to ensure your product remains
              competitive and meets the evolving needs of your users. Contact us
              today to discuss your product redesign or upgrade requirements,
              and let us help you take your product to the next level.Feel free
              to customize and expand upon this content to fit your specific
              requirements and style.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductHero;
