import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import BlogsHero from "./hero";
import axios from "axios";
import BlogCard from "../common/blog-card";
import Skeleton from "react-loading-skeleton";

function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searched, setSearched] = useState();

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const url = searched
          ? `${process.env.NEXT_PUBLIC_API_URL}/blogs/?is_for_pysquad=true&search=${searched}`
          : `${process.env.NEXT_PUBLIC_API_URL}/blogs/?is_for_pysquad=true`;
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "Application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });

        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [searched]);

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0,
  });

  useEffect(() => {
    if (inView && visibleCount < blogs.length) {
      setLoadingMore(true);
      const timeout = setTimeout(() => {
        setVisibleCount((prev) => prev + 6);
        setLoadingMore(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [inView, visibleCount, blogs.length]);

  return (
    <>
      <BlogsHero searched={searched} onSearchChange={setSearched} />
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container p-0">
          <div className="flex flex-wrap items-center justify-between gap-y-6">
            {loading
              ? Array(3)
                  .fill(null)
                  .map((_, i) => (
                    <div key={i} className="col-12 sm:col-6 lg:col-4 px-2 mb-6">
                      <Skeleton baseColor="#E6EBFB" height={200} />
                      <div className="flex justify-between items-center">
                        <div className="flex gap-4 mt-2 mb-2">
                          <Skeleton width={100} baseColor="#E6EBFB" />
                          <Skeleton width={70} baseColor="#E6EBFB" />
                        </div>
                        <Skeleton
                          width={20}
                          height={20}
                          baseColor="#E6EBFB"
                          borderRadius={100}
                        />
                      </div>
                      <Skeleton baseColor="#E6EBFB" count={2} />
                    </div>
                  ))
              : blogs?.slice(0, visibleCount).map((blog) => (
                  <div key={blog?.id} className="col-12 md:col-6 lg:col-4">
                    <div className="">
                      <BlogCard
                        image={blog?.bg_image}
                        alt={blog?.title}
                        date={blog?.modified}
                        category={blog?.category?.title}
                        title={blog?.title}
                        slug={blog?.slug}
                      />
                    </div>
                  </div>
                ))}

            {loadingMore &&
              Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={`loadmore-${i}`}
                  className="col-12 md:col-6 lg:col-4 p-4 rounded-lg mb-6"
                >
                  <Skeleton baseColor="#E6EBFB" height={200} />
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4 mt-2 mb-2">
                      <Skeleton width={100} baseColor="#E6EBFB" />
                      <Skeleton width={70} baseColor="#E6EBFB" />
                    </div>
                    <Skeleton
                      width={20}
                      height={20}
                      baseColor="#E6EBFB"
                      borderRadius={100}
                    />
                  </div>
                  <Skeleton baseColor="#E6EBFB" count={2} />
                </div>
              ))}
          </div>
          {visibleCount < blogs.length && (
            <div ref={ref} className="h-10 mt-4"></div>
          )}
        </div>
      </section>
    </>
  );
}

export default BlogsPage;
