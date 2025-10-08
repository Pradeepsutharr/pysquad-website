import Link from "next/link";
import {
  Mail,
  ArrowRight,
  Instagram,
  Linkedin,
  Facebook,
  Github,
  Twitter,
  // Skype,
} from "lucide-react";
import Image from "next/image";
import LinkedInButton from "@/ui/linkedin-btn";
import { social_links } from "./data/social-media-links";

export default function Footer() {
  return (
    <footer className="bg-[#131D1B] text-[#B4B4B4] text-sm pt-12 md:pt-16">
      <div className="container p-0">
        {/* Left Column */}
        <div className="flex flex-wrap justify-between">
          <div className="lg:col-4 md:col-6 col-12">
            <div className="w-36">
              <Image
                src="/images/Logo_light.png"
                width={187}
                height={35}
                alt="pysquad_logo"
                className="h-6 mb-4"
              />
            </div>
            <p className=" leading-normal font-normal mb-3">
              Contact us today to learn more about how PySquad Informatics can
              help your business succeed with our web, app, ai and cloud
              services.
            </p>
            <Link
              href="mailto:solutions@psquad.com"
              className="flex items-center gap-2 text-primary my-4"
            >
              <Mail size={16} /> Solutions@pysquad.com
            </Link>
            <div className="flex flex-col gap-1 ">
              <p className="mb-1 font-semibold leading-normal text-white">
                India
              </p>
              <Link
                href="tel:+91 8980255005"
                className="mb-1 font-normal leading-normal"
              >
                +91 8980255005
              </Link>
              <p className="mb-1 font-normal leading-normal">
                A 605, Shilp Aaron, Sindhu Bhavan Road, Ahmedabad, IN 380054,
                India
              </p>
            </div>
          </div>

          {/* Middle Column */}
          <div className="lg:col-3 md:col-6 col-12">
            <ul className="space-y-4 font-normal">
              <li>
                <Link href="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-primary">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-primary">
                  Case studies
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Column */}
          <div className="lg:col-3 md:col-6 col-12">
            <h2 className="font-medium mb-3">Newsletter</h2>
            <form className="flex mb-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 rounded-l bg-white text-textPrimary focus:outline-none"
              />
              <button
                name="submit-btn"
                aria-label="submit"
                type="submit"
                className="bg-textPrimary px-4 py-2 rounded-r hover:bg-primary transition flex items-center justify-center"
              >
                <ArrowRight size={18} />
              </button>
            </form>

            <h3 className="font-medium mb-3">Our Products</h3>
            <div className="flex items-center mb-4">
              <Image
                src="/images/sharelyze.png"
                alt="ShareLyze"
                width={54}
                height={50}
                className=""
              />
              <span className="ms-2">ShareLyze</span>
            </div>

            <div className="flex space-x-4 items-center text-xl">
              <div className="flex space-x-4 items-center">
                {social_links.map((item) => (
                  <Link
                    key={item.id}
                    href={item.url}
                    aria-label={item.title}
                    className="footer-social-icon bg-white w-6 h-6 rounded-full flex justify-center items-center hover:bg-primary duration-300"
                  >
                    <span className="">{item.icon}</span>
                  </Link>
                ))}
              </div>

              <span className="mb-1">
                <LinkedInButton />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-6">
        <div className="container flex flex-col md:flex-row flex-wrap justify-center md:justify-between text-center md:text-start py-6 text-gray-400 text-xs">
          <p>
            © Copyright {new Date().getFullYear()} PySquad Informatics LLP. All
            Rights Reserved
          </p>
          <div className="flex flex-col  md:flex-row space-x-6">
            <Link href="/terms-conditions" className="hover:text-primary">
              Terms and conditions
            </Link>
            <Link href="/privacy-policy" className="hover:text-primary">
              Privacy policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
