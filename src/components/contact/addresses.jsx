import React from "react";
import { MapPin } from "lucide-react";

const addresses = [
  {
    id: "1",
    country: "Ahmedabad - India",
    address:
      "A 605, Shilp Aaron, Sindhu Bhavan Road, Ahmedabad,IN 380054, India",
  },
  // {
  //   id: "2",
  //   country: "Ahmedabad - India",
  //   address:
  //     "A-703,7th Floor, Samudra Complex,Nr Hotel Klassic Gold, C G Road,Ahmedabad - 380009",
  // },
  // {
  //   id: "3",
  //   country: "Ahmedabad - India",
  //   address:
  //     "A-703,7th Floor, Samudra Complex,Nr Hotel Klassic Gold, C G Road,Ahmedabad - 380009",
  // },
  // {
  //   id: "4",
  //   country: "Ahmedabad - India",
  //   address:
  //     "A-703,7th Floor, Samudra Complex,Nr Hotel Klassic Gold, C G Road,Ahmedabad - 380009",
  // },
];

function Addresses() {
  return (
    <section className="py-12 md:py-16">
      <div className="container p-0">
        <div className="col-12 text-center">
          <h2 className="text-3xl  capitalize text-textPrimary mb-2 font-semibold">
            where to
            <span className="text-primary"> find us</span>
          </h2>
          <p className="mb-7 text-textSecondary font-medium">
            Our doors are open! Come meet us at our Office
          </p>
        </div>

        <div className="addresses flex flex-wrap items-center justify-center">
          {addresses?.map((item) => (
            <div key={item.id} className="col-12 md:col-6 lg:col-3">
              <div className="bg-[#E8F5F4] p-[4px]  rounded-2xl">
                <div className="flex flex-col rounded-2xl border border-[#E8F5F4] bg-white  px-9 py-10 ">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-primary mb-1 flex gap-2 items-center">
                      <MapPin size={20} /> {item.country}
                    </h3>
                  </div>
                  <p className=" text-textSecondary font-medium leading-loose mt-5">
                    {item.address}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Addresses;
