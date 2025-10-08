import React from "react";
import axios from "axios";
import dynamic from "next/dynamic";

const CaseStudiesDetailsComponent = dynamic(() =>
  import("../../components/case-studies-details")
);
const ContactArea = dynamic(() => import("../../common/contact-area"));

function CaseStudiesDetails({ caseStudyData }) {
  return (
    <>
      <CaseStudiesDetailsComponent caseStudyData={caseStudyData} />
      <ContactArea />
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/case-study/${params.slug}/`,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    return {
      props: {
        caseStudyData: response.data,
      },
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      props: {
        caseStudyData: null,
      },
    };
  }
}

export default CaseStudiesDetails;
