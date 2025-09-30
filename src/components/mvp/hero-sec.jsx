import Image from "next/image";
import React from "react";

function MvpHero() {
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
              Transform Your Idea into a Minimum Viable Product{" "}
              <span className="text-primary">(MVP)</span>
            </h1>
            <p className="text-textSecondary leading-loose ">
              Do you have a groundbreaking idea for a product and want to test
              its viability in the market? PySquad Informatics specializes in
              transforming ideas into Minimum Viable Products (MVPs). Our team
              will work closely with you to define the core features and
              functionalities of your product and develop a scaled-down version
              that demonstrates its value to potential users and investors. With
              our agile development approach and deep technical expertise, we
              can rapidly prototype and iterate on your MVP, allowing you to
              validate your idea and gather valuable feedback. Contact us today
              to discuss your MVP vision and let us bring your idea to life.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default MvpHero;
