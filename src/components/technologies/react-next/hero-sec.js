import React from "react";
import Image from "next/image";

function ReactHero() {
  return (
    <>
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container">
          <div className="flex flex-wrap justify-between items-center">
            <div className="col-12 md:col-6 lg:col-7">
              <h1 className="text-3xl lg:text-5xl font-bold lg:leading-tight capitalize text-textPrimary">
                <span>From Static to Soaring: Build Anything with</span>
                <span className="text-primary"> React & Next.js </span>
              </h1>

              <p className="text-textSecondary mt-5">
                Ready to ditch slow websites and clunky interfaces? Pysquad
                harnesses the power of React & Next.js to build lightning-fast,
                dynamic, and scalable web experiences that captivate users and
                skyrocket your business. Let&apos;s craft your future, together.
              </p>
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

export default ReactHero;
