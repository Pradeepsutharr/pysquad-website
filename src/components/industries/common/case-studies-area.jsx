import React, { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import CaseStudiesCard from "@/components/case-studies/case-studies-card";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function CaseStudiesArea() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/case-study/`,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        setCaseStudies(response.data);
      } catch (error) {
        console.error("Error fetching case studies:", error);
      }
    });
  }, []);

  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="col-12 flex items-end justify-between">
          <div>
            <h2 className="text-3xl text-textPrimary mb-2 font-semibold capitalize">
              our work
            </h2>
            <p className="text-textSecondary">
              A detailed look at how we solved real client challenges with
              measurable results
            </p>
          </div>

          <div>
            <Link href="/case-studies" className="text-primary underline">
              View All
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between">
          {isPending
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
            : caseStudies?.slice(0, 3).map((item) => (
                <div key={item.id} className="col-12 md:col-6 lg:col-4">
                  <div className="">
                    <CaseStudiesCard
                      image={item.project_images}
                      alt={item.slug}
                      date={item.modified}
                      category={item.category}
                      title={item.project_title}
                      slug={item.slug}
                      data={item}
                    />
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}

export default CaseStudiesArea;
