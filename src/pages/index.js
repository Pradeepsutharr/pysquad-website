import SEO from "@/common/seo";
import dynamic from "next/dynamic";
const HomePage = dynamic(() => import("../components/home"));

export default function Home() {
  return (
    <>
      <SEO
        pageTitle={"Software Development & Technology Solutions"}
        pageDescription={
          "At PySquad, We specialize in Python, Odoo ERP, Django, React/Next.js, AI, Clouds and custom development. Transform your business with us!"
        }
        keywords={
          "software development, Python, Odoo, Django, React, Next.js, AI, custom development, Globally, India, USA, UK, Dubai, Europe, Asia"
        }
      />
      <HomePage />
    </>
  );
}
