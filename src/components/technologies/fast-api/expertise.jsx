import React from "react";
import { fastApi_expertise } from "../../../Data/fast-api-expertise";

function FastApiExpertise() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container">
        <div className="col-12">
          <h2 className="text-3xl text-textPrimary md:text-4xl font-semibold mb-2 capitalize">
            <span className="text-primary">Why Work with Pysquad </span>
            for FastApi
          </h2>
          <p className="text-textSecondary mb-10">
            FastAPI is a Python web framework based on ASGI (Asynchronous Server
            Gateway Interface) and built on top of Starlette. It offers several
            key advantages for developers
          </p>
        </div>

        <div className="flex flex-wrap justify-between lg:gap-y-10">
          {fastApi_expertise &&
            fastApi_expertise.map((item) => (
              <div key={item.id} className="col-12 md:col-6 tech-expertise">
                <div className="expertise-card flex items-center justify-between">
                  <div className="text-content col-8 p-0">
                    <h3 className="text-textPrimary text-xl font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-textSecondary">{item.description}</p>
                  </div>
                  <div className="col-4">
                    <span className="tech-expertise-icon border-2 border-primary rounded-3xl h-[100px] w-[100px] flex items-center justify-center">
                      {item.icon}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default FastApiExpertise;
