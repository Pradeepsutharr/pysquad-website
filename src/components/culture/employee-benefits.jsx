import React from "react";
import { benefits } from "@/Data/employee-benefits";

function EmployeeBenefits() {
  return (
    <section className="bg-[#131D1B] py-12 md:py-16">
      <div className="container p-0">
        <div className="col-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-2 text-white capitalize">
            employee <span className="text-primary">benefits</span>
          </h2>
          <p className="text-white mb-10 text-center">
            We value our team and provide benefits that support your growth,
            well-being, and success—inside and outside the office
          </p>
        </div>

        <div className="flex flex-wrap justify-between items-center">
          {benefits?.map((item) => (
            <div key={item.id} className="col-12 md:col-3 lg:col-2 ">
              <div className="bg-[#E8F5F4] p-[4px] clip-hex-reverse rounded-2xl min-h-32">
                <div className="flex flex-col items-center justify-center text-center clip-hex-reverse rounded-2xl border border-[#E8F5F4] bg-white  px-4 py-4 min-h-32">
                  <div className="mb-4">{item.icon}</div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-primary ">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EmployeeBenefits;
