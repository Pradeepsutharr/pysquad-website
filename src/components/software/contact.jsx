import React from "react";
import { Check } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";

const ContactForm = dynamic(() => import("../../form/contact-form"), {
  ssr: false,
});

function SoftwareContact() {
  return (
    <section className="py-12 md:py-16 relative">
      <Image
        src="/images/hero_bg.png"
        fill
        alt="pysquad"
        priority
        className="object-cover z-[-1] opacity-40"
      />
      <div className="container">
        <div className="flex flex-wrap justify-between items-start">
          <div className="col-12 md:col-6 lg:col-6">
            <h2 className="text-3xl text-textPrimary md:text-4xl font-semibold mb-4 capitalize">
              Start Your Project with
              <span className="text-primary"> PySquad </span>
            </h2>
            <p className="text-textSecondary mb-10">
              PySquad Informatics provides experienced developers proficient in
              Python, Django, React, and more. Our team excels in both frontend
              and backend development, turning your ideas into reality
              efficiently. Connect with us to discuss your project needs
            </p>

            <ul className="flex flex-col gap-4">
              <li className="text-textSecondary  flex items-center gap-3">
                <Check size={20} color="#0a948a" />
                <span> Experienced developers, designers, and experts</span>
              </li>
              <li className="text-textSecondary  flex items-center gap-3">
                <Check size={20} color="#0a948a" />
                <span> Continuously upgrading skills</span>
              </li>
              <li className="text-textSecondary  flex items-center gap-3">
                <Check size={20} color="#0a948a" />
                <span> Customer-centric mindset</span>
              </li>
              <li className="text-textSecondary  flex items-center gap-3">
                <Check size={20} color="#0a948a" />
                <span> Collaborative approach with clients</span>
              </li>
            </ul>
          </div>

          <div className="col-12 md:col-6 lg:col-5">
            <ContactForm
              borderColor={"border-primary"}
              inputBg={"bg-[#F9F9F9]"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SoftwareContact;
