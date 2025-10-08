import axios from "axios";
import { useEffect, useState, useRef } from "react";

export default function JobOpenings() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openJobId, setOpenJobId] = useState(null);
  const [jobOpenings, setJobOpenings] = useState([]);
  const [searched, setSearched] = useState("");

  useEffect(() => {
    const fetchJobsOpenings = async () => {
      try {
        const url = searched
          ? `${process.env.NEXT_PUBLIC_API_URL}/job/category/?search=${searched}`
          : `${process.env.NEXT_PUBLIC_API_URL}/job/category/`;
        const response = await axios.get(url);
        setJobOpenings(response.data);
        if (!selectedCategory && response.data.length > 0) {
          setSelectedCategory(response.data[0].id);
        }
      } catch (error) {
        console.error("Error fetching jobs", error);
      }
    };
    fetchJobsOpenings();
  }, [searched, selectedCategory]);

  const selectedCatObj = jobOpenings.find((cat) => cat.id === selectedCategory);
  const openings = selectedCatObj?.openings || [];

  return (
    <section className="bg-[#131D1B] py-12 md:py-16">
      <div className="container p-0">
        <div className="col-12 text-center">
          <h2 className="text-3xl text-white mb-2 font-semibold">
            Your Next Career{" "}
            <span className="text-primary">Opportunity Awaits</span>
          </h2>
          <p className="text-sm mb-7 text-gray-200">
            Pysquad is looking for talented professionals in tech and design
            find the role that fits you
          </p>
        </div>

        <div className="flex items-start flex-wrap">
          {/* Category Sidebar */}
          <div className="col-12 md:col-4 lg:col-3">
            <div className="bg-white rounded-lg p-6 ">
              <h2 className="mb-6 text-textPrimary font-medium text-lg">
                Join Us in These Industries
              </h2>
              <div className="flex flex-col gap-3">
                {jobOpenings?.map((cat) => (
                  <label
                    key={cat.id}
                    className="flex items-center cursor-pointer py-1"
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat.id}
                      onChange={() => {
                        setSelectedCategory(cat.id);
                        setOpenJobId(null);
                      }}
                      className="accent-primary mr-2"
                    />
                    <span
                      className={
                        selectedCategory === cat.id
                          ? "text-primary"
                          : "text-textPrimary"
                      }
                    >
                      {cat.category}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Accordion Job Listings */}
          <div className="col-12 md:col-8 lg:col-9">
            <div className="flex flex-col flex-1 gap-5">
              {openings.length === 0 && (
                <div className="bg-[#f8fafc] rounded-lg shadow-md p-6 w-full text-center text-gray-600">
                  <h4 className="text-primary text-3xl font-semibold mb-5">
                    Oops!
                  </h4>
                  <p> Share Your Resume – We’ll Reach Out When a Role Opens</p>
                </div>
              )}

              {openings.map((job) => (
                <AccordionItem
                  key={job.id}
                  job={job}
                  isOpen={openJobId === job.id}
                  toggle={() =>
                    setOpenJobId(openJobId === job.id ? null : job.id)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AccordionItem({ job, isOpen, toggle }) {
  const ref = useRef(null);

  return (
    <div className="bg-[#f8fafc] rounded-lg shadow-md w-full">
      <div className="px-6  " onClick={toggle}>
        <div className="flex justify-between items-center cursor-pointer py-4 border-b border-b-gray-300">
          <div className="">
            <p className="text-base text-[#222926] font-semibold">
              {job.position}
            </p>
            <p className="text-sm text-gray-600">
              Experience : {job.experience} Years
            </p>
          </div>
          <button
            name="apply-btn"
            className="text-primary font-medium hover:underline"
          >
            Apply Now
          </button>
        </div>
      </div>

      <div
        ref={ref}
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight: isOpen ? `${ref.current?.scrollHeight}px` : "0px",
        }}
      >
        <div className="px-6 pb-6 pt-2 text-[#202727]">
          <div className="flex flex-col gap-4">
            <p className="capitalize">
              <strong>Job title:</strong> {job.position}
            </p>
            <p className="capitalize">
              <strong>Experience Required:</strong> {job.experience} years
            </p>
            <p className="capitalize">
              <strong>Location:</strong> {job.location}
            </p>
          </div>
          <div
            className="job-description mt-4"
            dangerouslySetInnerHTML={{ __html: job.description }}
          />
        </div>
      </div>
    </div>
  );
}
