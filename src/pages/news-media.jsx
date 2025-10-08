import React from "react";
import dynamic from "next/dynamic";
import SEO from "@/common/seo";

const MediaComponent = dynamic(() =>
  import("../components/industries/news-media")
);

function Media() {
  return (
    <>
      <SEO
        pageTitle={"News & Media Digital Solutions | Pysquad"}
        pageDescription={
          "Boost your media brand with Pysquad’s digital publishing, automated content management, audience analytics, secure cloud hosting, and multichannel delivery platforms."
        }
        keywords={
          "media technology, news publishing, content management, digital newsroom, audience analytics, OTT media, web broadcasting"
        }
        ogTitle={"Digitize News & Media | Pysquad"}
        ogUrl={"https://pysquad.com/news-media"}
      />
      <MediaComponent />;
    </>
  );
}
export default Media;
