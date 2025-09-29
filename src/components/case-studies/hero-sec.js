import React from "react";
import { Search } from "lucide-react";

function CaseStudiesHero({ searched, onSearchChange }) {
  return (
    <section>
      <div className="container p-0">
        <div className="flex">
          <div className="col-12">
            <div className="text-center col-12 lg:col-9 mx-auto">
              <h1 className=" text-3xl lg:text-5xl font-bold lg:leading-snug capitalize">
                Client <span className="text-primary">success stories</span>
              </h1>
              <p className="text-textPrimary my-10 ">
                Every project we work on carries its own story of challenges,
                ideas, and solutions. These case studies highlight how we
                partner with clients, tackle real problems, and deliver
                measurable results that create lasting impact.
              </p>
            </div>

            <form>
              <div
                className="flex items-center justify-between border border-primary col-12 md:col-6 rounded-lg mx-auto"
                style={{ paddingTop: "0", paddingBottom: "0" }}
              >
                <input
                  type="text"
                  placeholder="Search Here"
                  className="py-2 w-full focus-visible:outline-none placeholder-primary"
                  value={searched || ""} // keep it controlled
                  onChange={(e) => onSearchChange(e.target.value)}
                />
                <Search className="text-primary" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CaseStudiesHero;
