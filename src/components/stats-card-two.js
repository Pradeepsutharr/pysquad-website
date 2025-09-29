import React from "react";
import { Users, Award, Star, Handshake } from "lucide-react";

const stats = [
  {
    label: "Happy User",
    value: "50+",
    icon: Users,
  },
  {
    label: "Best Products",
    value: "200",
    icon: Award,
  },
  {
    label: "User Satisfaction",
    value: "98%",
    icon: Star,
  },
  {
    label: "Industries Served",
    value: "13+",
    icon: Handshake,
  },
];

function StatsCardTwo() {
  return (
    <section className=" py-10">
      <div className="container">
        <div className="mx-auto rounded-2xl border border-gray-200 bg-white shadow-sm p-3 lg:p-8">
          <div className="flex flex-wrap stat-cards">
            {stats.map((item, idx) => (
              <div
                key={idx}
                className="col-12 md:col-6 lg:col-3 border-e-0 border-b md:border-b-0 md:border-e border-e-gray-300 flex gap-5 items-center px-5 py-5 lg:p-0"
              >
                <item.icon className="h-10 w-10 text-textSecondary mb-3" />
                <div>
                  <p className="text-2xl font-bold text-primary">
                    {item.value}
                  </p>
                  <p className="text-textSecondary mt-1">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default StatsCardTwo;
