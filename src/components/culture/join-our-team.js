import React from "react";
import CtaButton from "../ui/cta-btn";

function JoinOurTeam() {
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="col-12 lg:col-9 mx-auto text-center border rounded-xl">
          <div className="p-8">
            <h2 className="text-3xl md:text-4xl font-semibold  mb-2 text-textPrimary capitalize">
              Think you’ll fit right in? We’d love to meet you
            </h2>
            <p className="text-textSecondary mb-10 ">
              If you’re ready to learn, grow, and make an impact, this is the
              place for you.
            </p>

            <CtaButton text={"join our team"} link={"/contact"} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default JoinOurTeam;
