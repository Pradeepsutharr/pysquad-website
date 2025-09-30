import React from "react";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import Image from "next/image";
import { Share, MoveRight } from "lucide-react";

function CaseStudiesCard({ image, category, slug, title, alt, data }) {
  const handleShare = (data) => {
    const shareData = {
      title: data.project_title,
      text: `Check out this blog: ${data.title}`,
      url: window.location.origin + "/case-studies/" + data?.slug,
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
    <div className="case-study-card shadow-lg bg-white p-4 rounded-xl">
      <div className="image rounded-lg overflow-hidden max-h-[230px] object-cover ">
        {!image ? (
          <Skeleton height={462} />
        ) : (
          <Image src={image} alt={alt} width={777} height={462} />
        )}
      </div>
      <div className="flex justify-between items-center my-2 text-textSecondary">
        <span className="">{category}</span>
        <span onClick={() => handleShare(data)} className="cursor-pointer">
          <Share size={16} />
        </span>
      </div>
      <Link
        href={{
          pathname: "/case-studies/[slug]",
          query: { slug },
        }}
        className="text-textPrimary font-semibold text-xl hover:text-primary transition-all  duration-300  [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden text-ellipsis line-clamp-2"
      >
        {title || <Skeleton />}
      </Link>
      <Link
        href={{
          pathname: "/case-studies/[slug]",
          query: { slug },
        }}
        className="text-textSecondary flex gap-2 mt-3 hover:gap-3  hover:text-primary transition-all  duration-300  "
      >
        {"Read More" || <Skeleton />} <MoveRight />
      </Link>
    </div>
  );
}

export default CaseStudiesCard;
