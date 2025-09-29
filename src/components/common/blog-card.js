import Image from "next/image";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";
import { Heart } from "lucide-react";

function BlogCard({ image, alt, date, category, title, slug }) {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
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
        <span>
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
        </span>
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
