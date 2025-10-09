import React from "react";
import { react_services } from "../../../Data/react-services";

function ReactServices() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container">
        <h2 className="text-3xl text-textPrimary md:text-4xl font-semibold mb-2 capitalize">
          <span className="text-primary">Services Pysquad Offer </span>
          using React & Next.js
        </h2>
        <p className="text-textSecondary mb-10">
          From automating tasks to building full-scale applications, we use
          Python to deliver solutions that are simple, effective, and aligned
          with your needs.
        </p>

        <div className="flex flex-wrap justify-between items-start lg:gap-y-10">
          {react_services &&
            react_services.map((service) => (
              <div key={service.id} className="col-12 md:col-6 lg:col-3">
                <div className="card">
                  {service.icon}
                  <h3 className="text-textPrimary text-xl font-semibold my-4">
                    {service.title}
                  </h3>
                  <p className="text-textSecondary pr-10">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default ReactServices;
