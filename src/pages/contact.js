import React from "react";
import dynamic from "next/dynamic";
import SEO from "@/components/common/seo";

const ContactPageComponent = dynamic(() => import("../components/contact"));

function Contact() {
  return (
    <>
      <SEO pageTitle={"Contact PySquad | Build great product"} />
      <ContactPageComponent />
    </>
  );
}

export default Contact;
