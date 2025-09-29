import React from "react";
import Link from "next/link";
import {
  Linkedin,
  Instagram,
  Github,
  Facebook,
  Twitter,
  PhoneCall,
  Mail,
} from "lucide-react";
import ContactForm from "../form/contact-form";

function ContactFormArea() {
  return (
    <section>
      <div className="container">
        <div className="col-12 p-4 lg:p-20 mx-auto flex flex-wrap justify-between items-center bg-[#FBFDFD] border border-primary rounded-xl">
          <div className="col-12 md:col-6 ">
            <h2 className="text-primary text-3xl font-bold ">Let's Connect</h2>
            <p className="text-textSecondary font-medium py-2 lg:my-3">
              Questions, comments, or suggestions? Simply fill in the form and
              we’ll be in touch shortly.
            </p>

            <div className="call flex flex-col gap-2 font-medium mt-5">
              <Link
                href="tel:+91 8980255005"
                className="text-primary flex items-center gap-3"
              >
                <PhoneCall size={20} />
                +91 8980255005
              </Link>
              <Link
                href="mailto:solutions@pysquad.com"
                className="text-primary flex items-center gap-3"
              >
                <Mail size={20} />
                solutions@pysquad.com
              </Link>
            </div>

            <div className="social-connect">
              <h3 className="text-textPrimary text-2xl font-semibold mt-5">
                Connect with us
              </h3>
              <p className="text-textSecondary font-medium">
                Stay in the loop. Connect, share, and grow with us on social
              </p>

              <div className="social-contact flex gap-4 mt-4">
                <Link
                  href="https://www.linkedin.com/company/pysquad-informatics/"
                  target="_blank"
                  className="text-textPrimary hover:bg-[#0077B5] hover:text-white duration-200 bg-[#E5F4F3] min-h-10 min-w-10 rounded-full flex justify-center items-center"
                >
                  <Linkedin />
                </Link>
                <Link
                  href="https://www.instagram.com/pysquad_informatics/"
                  target="_blank"
                  className="text-textPrimary hover:bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 hover:text-white duration-200 bg-[#E5F4F3] min-h-10 min-w-10 rounded-full flex justify-center items-center"
                >
                  <Instagram />
                </Link>
                <Link
                  href="https://www.facebook.com/people/PySquad/61554988294334/#"
                  target="_blank"
                  className="text-textPrimary hover:bg-[#1877F2] hover:text-white duration-200 bg-[#E5F4F3] min-h-10 min-w-10 rounded-full flex justify-center items-center"
                >
                  <Facebook />
                </Link>
                <Link
                  href="https://twitter.com/pysquad_info"
                  target="_blank"
                  className="text-textPrimary hover:bg-black hover:text-white duration-200 bg-[#E5F4F3] min-h-10 min-w-10 rounded-full flex justify-center items-center"
                >
                  <Twitter />
                </Link>
                <Link
                  href="https://twitter.com/pysquad_info"
                  target="_blank"
                  className="text-textPrimary hover:bg-black hover:text-white duration-200 bg-[#E5F4F3] min-h-10 min-w-10 rounded-full flex justify-center items-center"
                >
                  <Github />
                </Link>
              </div>
            </div>
          </div>

          <div className="col-12 md:col-6">
            <ContactForm
              borderColor={"border-primary"}
              inputBg={"bg-[#F9F9F9]"}
              color={"text-textPrimary"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactFormArea;
