import Link from "next/link";
import React, { useEffect, useState } from "react";
import { service_data } from "../../Data/service-details";
import Image from "next/image";
import { useRouter } from "next/router";

function ServiceDetails() {
  const router = useRouter();
  const queryId = router.query.id;
  const [isActive, setIsActive] = useState("1");
  const [serviceData, setServiceData] = useState([]);

  useEffect(() => {
    if (queryId) setIsActive(queryId || "1");
    // console.log(isActive);
    setServiceData(service_data);
  }, [queryId, isActive]);

  return (
    <section className="service-details py-12 md:py-16 lg:py-20">
      <div className="container p-0">
        <div className="flex flex-wrap">
          <div className="col-12 md:col-4 ">
            <div className="side-bar">
              <ul className="service-list bg-[#F3FAF9] rounded-lg px-10 py-6">
                {service_data &&
                  service_data.map((service) => (
                    <li key={service.id} className="service-item">
                      <Link
                        href="/services"
                        className={`py-3 mb-2 inline-block hover:text-primary duration-200 w-full ${
                          isActive === service.id
                            ? "text-primary"
                            : "text-textPrimary"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setIsActive(service.id);
                        }}
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="col-12 md:col-8">
            {serviceData &&
              serviceData.map((service) => {
                if (isActive === service.id) {
                  return (
                    <div
                      key={service.id}
                      className="service-detail-card relative"
                    >
                      <div className="flex items-center gap-3">
                        <span className="icon">{service.icon}</span>
                        <h3 className="capitalize text-2xl font-semibold text-primary">
                          {service.title}
                        </h3>
                      </div>

                      <p className="text-textSecondary">{service.headline}</p>

                      <div className="mt-8">
                        <h4 className="text-primary capitalize text-2xl font-semibold">
                          importance
                        </h4>
                        <ul className="mt-5">
                          {service?.importance?.map((item, index) => (
                            <li
                              key={index}
                              className="text-textSecondary font-medium mt-4 flex items-center gap-2"
                            >
                              <span className="text-primary">&#9679;</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <p className="mt-10 text-textSecondary">
                        {service.description}
                      </p>
                      <Image
                        src={service.bg_image}
                        alt={service.title}
                        width={250}
                        height={300}
                        style={{
                          maxHeight: "450px",
                          minWidth: "250px",
                        }}
                        className="w-auto h-auto absolute z-[-1] opacity-10 top-[50%] right-0 translate-y-[-50%]"
                      />
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceDetails;
