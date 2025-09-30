import React from "react";
import Image from "next/image";
import CtaButton from "@/ui/cta-btn";

function FlutterHero() {
  return (
    <>
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container">
          <div className="flex flex-wrap justify-between items-center">
            <div className="col-12 md:col-6 lg:col-6">
              <h1 className="text-3xl lg:text-5xl font-bold lg:leading-tight capitalize text-textPrimary">
                <span>Build Beautiful & Engaging Mobile Apps with</span>
                <span className="text-primary"> Flutter</span>
              </h1>
              <p className="text-textSecondary my-5">
                In today&apos;s mobile-first world, standing out from the crowd
                requires apps that are stunning, smooth, and perform like
                lightning. Traditional development methods often lead to
                fragmented experiences, ballooning costs, and extended
                timelines. Introducing Flutter – the game-changer that empowers
                PySquad to deliver pixel-perfect mobile apps, native to every
                platform, from a single codebase.
              </p>
              <div className="mt-10 mx-auto text-center md:text-start">
                <CtaButton text={"Connect us now"} link={"/contact"} />
              </div>{" "}
            </div>
            <div className="col-12 md:col-6 lg:col-5">
              <Image
                src=""
                width={220}
                height={220}
                alt="pysquad_python"
                className="ms-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FlutterHero;
