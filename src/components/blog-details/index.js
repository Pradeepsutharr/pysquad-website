import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Calendar, Share, Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  atomDark,
  a11yDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";

import parse from "html-react-parser";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import SEO from "../common/seo";

function BlogsDetailsPage({ blogData }) {
  const router = useRouter();
  const slug = router.query.slug;
  const [loading, setLoading] = useState(true);
  const [blogDetails, setBlogDetails] = useState(blogData || {});

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const CodeBlock = ({ code }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    };

    return (
      <div className="relative group mb-4">
        <button
          name="copy-btn"
          onClick={handleCopy}
          className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded hover:bg-gray-600 z-10"
        >
          {copied ? "Copied" : <Copy />}
        </button>
        <SyntaxHighlighter
          language="python"
          style={atomDark}
          customStyle={{ borderRadius: "8px", paddingTop: "2rem" }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    );
  };

  const renderHTMLWithCode = (htmlContent) => {
    return parse(htmlContent, {
      replace: (node) => {
        if (node.name === "pre" && node.children?.[0]?.data) {
          const rawCode = node.children[0].data;
          return <CodeBlock code={rawCode} />;
        }
      },
    });
  };

  return (
    <>
      <SEO
        ogTitle={blogData?.title}
        ogUrl={"https://www.pysquad.com"}
        ogImage={blogData?.bg_image}
        pageTitle={`${blogData?.title}`}
        pageDescription={`${
          blogData?.title ??
          "Explore the latest insights and tech trends on the Pysquad blog. Discover in-depth articles, tutorials, and thought leadership from our experts."
        }`}
        keywords={`${
          blogData?.keywords ??
          "pysquad blogs, python blogs, odoo blogs, ai blogs, django blogs"
        }`}
      />
      {loading ? (
        <section className="py-12 animate-pulse">
          <div className="container">
            <div className="col-12 md:col-10 mx-auto">
              {/* Banner Image */}
              <div className="w-full h-[300px] md:h-[500px] bg-[#E6EBFB] rounded-xl mb-6"></div>

              {/* Date + Share */}
              <div className="flex items-center justify-between my-5">
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 bg-[#E6EBFB] rounded-full"></div>
                  <div className="w-24 h-4 bg-[#E6EBFB] rounded"></div>
                </div>
                <div className="w-6 h-6 bg-[#E6EBFB] rounded-full"></div>
              </div>

              {/* Blog Content Skeleton Lines */}
              <div className="space-y-4">
                <div className="w-full h-5 bg-[#E6EBFB] rounded"></div>
                <div className="w-full h-5 bg-[#E6EBFB] rounded"></div>
                <div className="w-full h-5 bg-[#E6EBFB] rounded"></div>
                <div className="w-full h-5 bg-[#E6EBFB] rounded"></div>
                <div className="w-3/4 h-5 bg-[#E6EBFB] rounded"></div>
                <div className="w-full h-5 bg-[#E6EBFB] rounded"></div>
                <div className="w-5/6 h-5 bg-[#E6EBFB] rounded"></div>
              </div>

              {/* View All Blogs Button */}
              <div className="w-32 h-5 bg-[#E6EBFB] rounded mx-auto mt-10"></div>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-12">
          <div className="container">
            <div className="col-12 md:col-10  mx-auto">
              <Image
                src={blogDetails.bg_image}
                alt={blogDetails.title}
                width={1200}
                height={630}
                priority
                className="rounded-xl"
              />

              <div className="flex items-center justify-between text-textSecondary my-5">
                <div className="flex items-center gap-4 ">
                  <Calendar /> {blogDetails.modified}
                </div>
                <Share />
              </div>

              <div className="blog-content  space-y-4 text-paragraph font-regular">
                {typeof blogDetails.content === "string" ? (
                  renderHTMLWithCode(blogDetails.content)
                ) : (
                  <Skeleton height={20} count={10} />
                )}
              </div>
            </div>

            <Link
              href="/blogs"
              className="text-primary underline font-semibold text-center block mt-10"
            >
              view all blogs
            </Link>
          </div>
        </section>
      )}
    </>
  );
}

export default BlogsDetailsPage;
