import React from "react";
import Image from "next/image";

function PythonHero() {
  return (
    <>
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container p-0">
          <div className="flex flex-wrap justify-between items-center">
            <div className="col-12 md:col-6 lg:col-6">
              <h1 className="text-3xl lg:text-5xl font-bold lg:leading-tight capitalize text-textPrimary">
                <span className="text-primary">custom python solutions </span>
                <span>tailored for your growth</span>
              </h1>

              <p className="text-textSecondary mt-5">
                We don&apos;t just code, we listen. PySquad becomes an extension
                of your team, collaborating closely to understand your unique
                needs and craft bespoke Python solutions that perfectly align
                with your vision. Let&apos;s embark on this journey together
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

export default PythonHero;
