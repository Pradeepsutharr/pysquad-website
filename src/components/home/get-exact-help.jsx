import { UserCog, Rocket, MonitorSmartphone, RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const helpOptions = [
  {
    icon: "/icons/developers.svg",
    title: "I Need Developers",
    description: "Hire dedicated developers for your project needs.",
    link: "/hire-developers",
  },
  {
    icon: "/icons/soft-solution.svg",
    title: "I Need A Complete Software Solution",
    description: "End-to-end software development.",
    link: "/software",
  },
  {
    icon: "/icons/mvp.svg",
    title: "I Need An MVP",
    description: "Build an MVP fast to test your idea and launch quicker.",
    link: "/mvp",
  },
  {
    icon: "/icons/product.svg",
    title: "I Need To Redesign Or Upgrade My Existing Product",
    description: "Refresh your product & boost performance.",
    link: "/product",
  },
];

export default function GetExactHelp() {
  return (
    <section className="relative bg-neutral-900 py-14">
      <Image
        src="/images/exact_help_bg.png"
        alt="pysquad"
        fill
        priority
        className="object-cover opacity-45 z-[-1]"
      />
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-2 text-white">
          Get The Exact <span className="text-primary">Help You Need</span>
        </h2>
        <p className="text-gray-300 mb-10 text-center">
          End-To-End Software Development Tailored To Your Business &nbsp;From
          Idea To Launch And Beyond.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {helpOptions.map((item, index) => (
            <div
              key={index}
              className="group bg-neutral-800 border border-neutral-700 rounded-lg p-5 flex items-center  transition-all duration-250  hover:shadow-2xl hover:bg-neutral-950 cursor-pointer"
            >
              <div className="col-4 flex flex-col items-center border-e-2 border-neutral-700">
                <Image
                  src={item.icon}
                  width={70}
                  height={70}
                  className="mb-4"
                  alt={item.title}
                />
                <Link
                  href={item.link}
                  className="inline-block text-white  tracking-wide text-sm hover:text-primary hover:underline duration-150 "
                >
                  Expand Details
                </Link>
              </div>
              <div className="col-8">
                <h3 className="text-lg md:text-xl font-medium text-white mb-1 group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="text-gray-300 mb-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
