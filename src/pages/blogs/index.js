import React from "react";
import dynamic from "next/dynamic";
import ContactArea from "@/common/contact-area";
import SEO from "@/common/seo";

const BlogsPgae = dynamic(() => import("../../components/blogs"));

function Blogs() {
  return (
    <>
      <SEO
        ogTitle={"Blogs - Tech Insights & Tutorials"}
        pageTitle={"Blogs - Tech Insights & Tutorials"}
        pageDescription={
          "Explore the latest insights and tech trends on the Pysquad blog. Discover in-depth articles, tutorials, and thought leadership from our experts."
        }
        keywords={
          "Tech blog, software development blog, Odoo blog, Django blog, React blog, AI blog"
        }
      />
      <BlogsPgae />
      <ContactArea />
    </>
  );
}

export default Blogs;
