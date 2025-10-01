import Script from "next/script";

const LinkedInButton = () => {
  return (
    <>
      <Script src="https://platform.linkedin.com/in.js" strategy="lazyOnload">
        {`lang: en_US`}
      </Script>

      <div>
        <script
          type="IN/FollowCompany"
          data-id={process.env.NEXT_PUBLIC_LINKEDIN_COMPANY_ID}
        ></script>
      </div>
    </>
  );
};

export default LinkedInButton;
