import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Navbar from "@/components/layout/navbar";
import "@/styles/globals.css";
import Script from "next/script";

import { Barlow } from "next/font/google";

const roboto = Barlow({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <link
        rel="stylesheet"
        href="/calendly/widget.css"
        media="print"
        onLoad={(e) => {
          e.target.media = "all";
        }}
      />
      <Script src="/calendly/widget.js" strategy="lazyOnload" />
      <div className={roboto.className}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </div>
    </>
  );
}
