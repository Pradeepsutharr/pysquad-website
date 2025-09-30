import React from "react";
import Image from "next/image";

function FastApiHero() {
  return (
    <>
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container">
          <div className="flex flex-wrap justify-between items-center">
            <div className="col-12 md:col-6 lg:col-6">
              <h1 className="text-3xl lg:text-5xl font-bold lg:leading-tight capitalize text-textPrimary">
                <span>Build High-Performance APIs Faster with</span>
                <span className="text-primary"> FastAPI</span>
              </h1>

              <p className="text-textSecondary mt-5">
                FastAPI is a modern web framework designed to simplify and
                accelerate development, allowing you to build high-performance
                APIs in record time.
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

export default FastApiHero;
