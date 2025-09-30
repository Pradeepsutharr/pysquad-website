import Head from "next/head";

const SEO = ({
  pageTitle,
  pageDescription,
  keywords,
  ogImage,
  ogTitle,
  ogUrl,
}) => (
  <>
    <Head>
      <title>{pageTitle}</title>
      <link rel="icon" href="/favicon.png" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />

      <meta
        name="description"
        content={`${
          pageDescription ??
          "PySquad: Custom web, app, cloud, and AI solutions for diverse industries – eCommerce, LMS, CMS, ERP, logistics, pharma, and more."
        }`}
      />
      <meta
        name="keywords"
        content={`${
          keywords ??
          "Python, Django, Odoo, React, Next.js, API development, ERP solutions, AI solutions, web development, software development"
        }`}
      />
      <meta property="og:title" content={ogTitle ?? "Pysquad"} />
      <meta
        property="og:description"
        content={`${
          pageDescription ??
          "Building Web, app, cloud and AI solutions. PySquad is helping to various industries like eCommerce, LMS, CMS, ERP, Logistics, Pharma, Media etc..."
        }`}
      />
      <meta property="og:url" content={ogUrl ?? "https://pysquad.com/"} />
      <meta property="og:site_name" content="pysquad" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <meta name="copyright" content="PySquad" />
      <meta name="distribution" content="Global" />
      <meta name="author" content="PySquad" />
      <meta name="owner" content="pysquad.com" />

      <meta property="twitter:account_id" content="1732400986700804096" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@pysquad_info" />

      <meta name="robots" content="follow, index, max-image-preview:large" />
      <link rel="canonical" href={`https://pysquad.com/`} />

      <meta
        property="og:image"
        content={
          ogImage ?? "https://www.pysquad.com/assets/img/logo/pysquad-logo.png"
        }
      />
    </Head>
  </>
);

export default SEO;
