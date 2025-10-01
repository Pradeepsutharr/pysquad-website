import React from "react";
import { fastApi_services } from "../../../Data/fast-api-services";

function FastApiServices() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container">
        <h2 className="text-3xl text-textPrimary md:text-4xl font-semibold mb-2 capitalize">
          <span className="text-primary">Services Pysquad Offer </span>
          using FastApi
        </h2>
        <p className="text-textSecondary mb-10">
          Here is how FastApi can empower your development proccess
        </p>

        <div className="flex flex-wrap justify-between lg:gap-y-10">
          {fastApi_services &&
            fastApi_services.map((service) => (
              <div key={service.id} className="col-12 md:col-6 lg:col-4">
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

export default FastApiServices;
