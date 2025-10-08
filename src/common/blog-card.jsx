import Image from "next/image";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";
import { Heart, Share } from "lucide-react";

function BlogCard({ image, alt, date, category, title, slug, blog }) {
  const handleShare = (blog) => {
    const shareData = {
      title: blog.title,
      text: `Check out this blog: ${blog.title}`,
      url: window.location.origin + "/blogs/" + blog?.slug,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard
        .writeText(shareData.url)
        .then(() => alert("Blog URL copied to clipboard"))
        .catch(() => alert("Failed to copy URL"));
    }
  };

  return (
    <div className="blog-card ">
      <div className="image rounded-lg overflow-hidden">
        {!image ? (
          <Skeleton height={462} />
        ) : (
          <Image
            src={image}
            alt={alt}
            width={777}
            height={462}
            className="w-full"
          />
        )}
      </div>
      <div className="flex justify-between items-center my-4 text-textSecondary">
        <div>
          <span>{date}</span>
          <span className="ms-4">{category}</span>
        </div>
        <span onClick={() => handleShare(blog)} className="cursor-pointer">
          <Share size={20} />
        </span>
        {/* <span>
          {liked ? (
            <Heart
              className="cursor-pointer text-primary fill-[red] stroke-[red]"
              onClick={handleLike}
            />
          ) : (
            <Heart
              className="cursor-pointer hover:text-primary"
              onClick={handleLike}
            />
          )}
        </span> */}
      </div>
      <Link
        href={{
          pathname: "/blogs/[slug]",
          query: { slug },
        }}
        className="text-textPrimary font-semibold text-xl hover:text-primary transition-all  duration-300  [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden text-ellipsis line-clamp-2"
      >
        {title || <Skeleton />}
      </Link>
    </div>
  );
}

export default BlogCard;
