import React from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import ContactArea from "@/components/common/contact-area";
import SEO from "@/components/common/seo";
const BlogsDetailsPage = dynamic(() => import("../../components/blog-details"));

function BlogDetails({ blogData }) {
  return (
    <>
      <BlogsDetailsPage blogData={blogData} />
      <ContactArea />
    </>
  );
}
export async function getServerSideProps({ params }) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/blogs/${params.slug}/`,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    return {
      props: {
        blogData: response.data,
      },
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      props: {
        blogData: null,
      },
    };
  }
}

export default BlogDetails;
