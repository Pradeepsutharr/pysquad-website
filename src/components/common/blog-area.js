import React, { useEffect, useState } from "react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import BlogCard from "./blog-card";
import Image from "next/image";

function BlogArea() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/blogs/?is_for_pysquad=true`,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        const filteredBlogs = response.data.slice(0, 3);
        setBlogs(filteredBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section className="relative lg:py-20 md:py-16 py-12">
      <Image
        src="/images/blog_sec_bg.png"
        alt="pysquad_blogs"
        fill
        priority
        className="object-cover opacity-50 z-[-1]"
      />
      <div className="container p-0">
        <div className="col-12">
          <h2 className="text-3xl md:text-4xl font-semibold capitalize mb-2 text-textPrimary">
            featured <span className="text-primary">blogs</span>
          </h2>
          <p className="text-textSecondary mb-10 text-xl">
            We offer complete IT solutions — from web design and software
            development to automation and tech support — helping businesses work
            smarter and grow faster.
          </p>
        </div>
        <div className="flex flex-wrap justify-between items-center">
          {loading
            ? Array(3)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className="col-12 sm:col-6 lg:col-4 px-2 mb-6">
                    <Skeleton
                      height={192}
                      baseColor="#E6EBFB"
                      className="rounded-xl mb-2"
                    />
                    <Skeleton
                      count={2.6}
                      baseColor="#E6EBFB"
                      className="rounded-xl mb-2"
                    />
                  </div>
                ))
            : blogs.map((blog) => (
                <div key={blog.id} className="col-12 md:col-6 lg:col-4">
                  <div className="">
                    <BlogCard
                      image={blog.bg_image}
                      alt={blog.title}
                      date={blog.modified}
                      category={blog.category.title}
                      title={blog.title}
                      slug={blog.slug}
                      blog={blog}
                    />
                  </div>
                </div>
              ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blogs"
            className="text-primary underline uppercase font-medium"
          >
            view all blogs
          </Link>
        </div>
      </div>
    </section>
  );
}

export default BlogArea;
