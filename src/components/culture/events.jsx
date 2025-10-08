import Image from "next/image";
import React from "react";

const event_items = [
  {
    id: "1",
    image: "https://picsum.photos/500",
    title: "",
  },
  {
    id: "2",
    image: "https://picsum.photos/500",
    title: "",
  },
  {
    id: "3",
    image: "https://picsum.photos/500",
    title: "",
  },
  {
    id: "4",
    image: "https://picsum.photos/500",
    title: "",
  },
  {
    id: "5",
    image: "https://picsum.photos/500",
    title: "",
  },
  {
    id: "6",
    image: "https://picsum.photos/500",
    title: "",
  },
  {
    id: "7",
    image: "https://picsum.photos/500",
    title: "",
  },
  {
    id: "8",
    image: "https://picsum.photos/500",
    title: "",
  },
];

function Events() {
  return (
    <section className="py-12 md:py-16">
      <div className="container p-0">
        <div className="col-12 lg:col-10 mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-2 text-primary capitalize">
            Festivals & events
          </h2>
          <p className="text-textSecondary mb-10 text-center">
            From vibrant festivals to fun-filled team events, we believe every
            celebration is a chance to connect, recharge, and create memories
            that last beyond the workplace
          </p>
        </div>

        <div className="events flex flex-wrap items-center justify-between">
          {event_items?.map((item) => (
            <div key={item.id} className="col-12 md:col-6 lg:col-3">
              <div className="bg-[#E8F5F4] p-[4px] rounded-2xl ">
                <div className="flex flex-col items-center text-center overflow-hidden rounded-2xl border border-[#E8F5F4] bg-white">
                  <Image
                    src={item.image}
                    alt="pysquad_events"
                    width={100}
                    height={100}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Events;
