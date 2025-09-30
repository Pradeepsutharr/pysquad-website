import React, { useEffect, useState } from "react";
import CaseStudiesHero from "./hero-sec";
import axios from "axios";
import CaseStudiesCard from "./case-studies-card";
import Skeleton from "react-loading-skeleton";

function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState();

  useEffect(() => {
    const fetchCaseStudies = async () => {
      setLoading(true);
      try {
        const url = searched
          ? `${process.env.NEXT_PUBLIC_API_URL}/case-study/?search=${searched}`
          : `${process.env.NEXT_PUBLIC_API_URL}/case-study/`;

        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
        setCaseStudies(response.data);
      } catch (error) {
        console.error("Error fetching case studies", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, [searched]);

  return (
    <>
      <CaseStudiesHero searched={searched} onSearchChange={setSearched} />

      <section className="py-12 md:py-16">
        <div className="container p-0">
          <div className="flex flex-wrap justify-center items-center">
            {loading
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
              : caseStudies.map((item) => (
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
    </>
  );
}
export default CaseStudiesPage;
