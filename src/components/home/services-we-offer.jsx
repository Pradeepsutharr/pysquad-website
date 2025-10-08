import { CloudCog } from "lucide-react";
import Image from "next/image";
import { services } from "@/Data/services";
import { useRouter } from "next/router";
export default function ServicesWeOffer() {
  const router = useRouter();
  return (
    <section className=" py-12 md:py-16 relative">
      <Image
        src="/images/services_we_offer_bg.png"
        alt="pysquad"
        fill
        className="object-cover opacity-40 z-[-1]"
      />
      <div className="container">
        <div className="">
          <div className="">
            <h2 className="text-3xl text-textPrimary md:text-4xl font-semibold mb-2">
              IT Solutions & Services{" "}
              <span className="text-primary">We Offer</span>
            </h2>
            <p className="text-textSecondary mb-10">
              We Offer Complete IT Solutions — From Web Design And Software
              Development To Automation And Tech Support&nbsp; Helping
              Businesses Work Smarter And Grow Faster.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {services.map((item, index) => (
              <div
                key={index}
                className="group bg-white border border-gray-100 rounded-xl px-7 py-8 flex flex-col transition-all duration-250 shadow-sm hover:shadow-md hover:border-primary hover:-translate-y-1 hover:bg-gray-50 cursor-pointer"
              >
                <span className="soluton-icon mb-3">{item.icon}</span>
                <h3 className="text-lg font-medium mb-1 text-textPrimary capitalize">
                  {item.title}
                </h3>
                <p className=" text-base text-textSecondary">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => router.push("/contact")}
              name="cta-btn"
              className="bg-gradient-to-r from-primary to-primary/70 text-white font-semibold px-8 py-3 rounded-full hover:from-primary/90 hover:to-primary/60 transition-all"
            >
              Let’s Discuss Your Needs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
