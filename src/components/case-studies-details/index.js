import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState, useTransition } from "react";
import { Calendar, Share, SquareCheck } from "lucide-react";
import ClientReviews from "../common/client-reviews";
import Link from "next/link";
import SEO from "../common/seo";

function CaseStudiesDetailsComponent({ caseStudyData }) {
  const router = useRouter();
  const slug = router.query.slug;
  const [caseData, setCaseData] = useState(caseStudyData || {});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <SEO
        ogUrl={"https://pysquad.com/case-studies"}
        ogTitle={`Case Studies - ${caseStudyData.project_title}`}
        pageTitle={`Case Studies - ${caseStudyData.project_title}`}
        pageDescription={
          "Discover how Pysquad.com has helped businesses succeed. Explore our case studies and see the transformative impact of our software solutions."
        }
        keywords={
          "Case studies, client success stories, Odoo case studies, Django case studies, technology case studies"
        }
      />

      <section className="py-10">
        <div className="container p-0">
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
            <div className="col-12 md:col-10 mx-auto  ">
              <div className="image max-h-[500px] overflow-hidden object-cover">
                <Image
                  src={caseData?.project_images?.detail}
                  alt={caseData?.project_title}
                  height={667}
                  width={1000}
                  priority
                  className="w-full h-auto "
                />
              </div>

              <div className="flex items-center justify-between text-textSecondary my-5">
                <div className="flex items-center gap-3 ">
                  <Calendar size={20} />{" "}
                  {new Date(caseData?.created_at)
                    .toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                    .replace(/\//g, "-")}
                </div>
                <Share size={20} />
              </div>

              <div className="flex items-start justify-between">
                <div className="col-12 md:col-6 lg:col-3 p-0">
                  <div>
                    <div className="image"></div>
                    <h2 className="text-textPrimary text-lg font-semibold capitalize">
                      Client Name
                    </h2>
                    <p className="text-textSecondary">
                      {caseData.customer_info}
                    </p>
                  </div>
                </div>

                <div className="col-12 md:col-6 lg:col-3 p-0">
                  <div>
                    <div className="image"></div>
                    <h2 className="text-textPrimary text-lg font-semibold capitalize">
                      category
                    </h2>
                    <p className="text-textSecondary">{caseData.category}</p>
                  </div>
                </div>

                <div className="col-12 md:col-6 lg:col-3 p-0">
                  <div>
                    <div className="image"></div>
                    <h2 className="text-textPrimary text-lg font-semibold capitalize">
                      technologies
                    </h2>
                    {caseData?.technology?.names && (
                      <p className="text-textSecondary">
                        {caseData.technology.names.join(", ")}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-12 md:col-6 lg:col-3 p-0">
                  <div>
                    <div className="image"></div>
                    <h2 className="text-textPrimary text-lg font-semibold capitalize">
                      technology
                    </h2>
                    <p className="text-textSecondary">
                      {caseData.customer_info}
                    </p>
                  </div>
                </div>
              </div>

              <div className="my-10 md:my-16">
                <h1 className="mb-2 text-3xl lg:text-4xl text-textPrimary font-bold lg:leading-snug capitalize">
                  {caseData.project_title}
                </h1>
                <p className="text-textSecondary mt-1 ">
                  {caseData.project_abstract}
                </p>
              </div>

              <div className="">
                <h3 className="text-3xl capitalize font-semibold text-textPrimary">
                  problem state
                </h3>

                <p
                  className="text-textSecondary leading-loose"
                  dangerouslySetInnerHTML={{
                    __html: caseData?.challenge?.replace(/\\n/g, "<br/>"),
                  }}
                ></p>
              </div>

              <div className="mt-10 md:mt-16">
                <h3 className="text-3xl capitalize font-semibold text-textPrimary">
                  solution:
                </h3>
                <p className="text-textSecondary">
                  {" "}
                  {caseData.solution.detail}
                </p>

                <ul>
                  {caseData?.solution?.steps.map((list, index) => (
                    <div key={index} className="flex items-start gap-2 mt-4">
                      <span className="mt-1">
                        <SquareCheck size={16} color="green" />
                      </span>
                      <li className="text-textSecondary">
                        <strong className="whitespace-nowrap">
                          {list.title}:
                        </strong>{" "}
                        {list.description}{" "}
                      </li>
                    </div>
                  ))}
                </ul>
              </div>

              <div className="mt-10 md:mt-16">
                <h3 className="text-3xl capitalize font-semibold text-textPrimary">
                  Result:
                </h3>
                <p
                  className="text-textSecondary leading-loose"
                  dangerouslySetInnerHTML={{
                    __html: caseData?.result?.replace(/\\n/g, "<br/>"),
                  }}
                ></p>
              </div>
            </div>
          )}
          <div className="col-12 text-center my-10">
            <Link
              href="/case-studies"
              className="uppercase text-primary underline"
            >
              view all case studies
            </Link>
          </div>
        </div>
        <ClientReviews />
      </section>
    </>
  );
}

export default CaseStudiesDetailsComponent;
