import React from "react";
import { Search } from "lucide-react";

function BlogsHero({ searched, onSearchChange }) {
  return (
    <section className="blogs-hero py-12 md:py-16 lg:py-20">
      <div className="container p-0">
        <div className="text-center lg:col-9 col-12 mx-auto">
          <h1 className=" text-3xl lg:text-5xl font-bold lg:leading-snug capitalize">
            featured <span className="text-primary">Blogs</span>
          </h1>
          <p className="text-textPrimary mb-10 ">
            Explore our insightful blogs for the latest trends, expert insights,
            and valuable information in the world of technology, business, and
            innovation. Stay informed, inspired, and discover new perspectives
            with our engaging blog posts.
          </p>
        </div>

        <form>
          <div
            className="flex items-center justify-between border border-primary lg:col-6 md:col-8 col-10 rounded-lg mx-auto"
            style={{ paddingTop: "0", paddingBottom: "0" }}
          >
            <input
              type="text"
              placeholder="Search Here"
              className="py-2 w-full focus-visible:outline-none placeholder-primary"
              value={searched || ""}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <Search className="text-primary" />
          </div>
        </form>
      </div>
    </section>
  );
}

export default BlogsHero;
