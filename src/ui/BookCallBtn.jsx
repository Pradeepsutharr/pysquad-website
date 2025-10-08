import React from "react";
import { useEffect, useCallback } from "react";

function useCalendlyStyle() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/calendly/widget.css";
    link.media = "print";
    link.onload = () => (link.media = "all");
    document.head.appendChild(link);
  }, []);
}

function BookCallBtn() {
  useCalendlyStyle();
  useEffect(() => {
    if (!window.Calendly) {
      const script = document.createElement("script");
      script.src = "/calendly/widget.js";
      script.async = true;
      script.onload = () => {};
      document.head.appendChild(script);
    }
  }, []);

  const handleCalendlyPopup = () => {
    window.Calendly.initPopupWidget({
      url: "https://calendly.com/vh-pysquad/meeting-with-pysquad?hide_gdpr_banner=1",
    });
    return false;
  };

  return (
    <>
      {/* Mobile full-width button */}
      <div
        onClick={handleCalendlyPopup}
        className="text-center mx-auto mt-6 w-full block md:hidden px-6"
      >
        <button
          className="gredient-btn inline-block py-2 px-8 rounded-full w-full text-white"
          name="book a call"
          aria-label="book a call"
        >
          Book a call
        </button>
      </div>

      {/* Desktop animated button */}
      <button
        name="open-celendly-btn"
        className="Button hidden md:block w-full  md:w-48 lg:w-52"
        onClick={handleCalendlyPopup}
      >
        <svg
          className="Button-svg w-full h-12 sm:h-14 md:h-18"
          viewBox="0 0 270 80"
        >
          <rect
            className="Button-line Button-line--outer"
            strokeWidth="8"
            stroke="#05DAC3"
            strokeLinecap="round"
            fill="none"
            x="4"
            y="4"
            width="255"
            height="72"
            rx="35"
          />
          <rect
            className="Button-line Button-line--inner"
            strokeWidth="4"
            stroke="#37A8A0"
            strokeLinecap="round"
            fill="none"
            x="4"
            y="4"
            width="255"
            height="72"
            rx="35"
          />
        </svg>
        <span className="Button-content text-primary font-semibold flex items-center gap-2 lg:gap-4 justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
            viewBox="0 0 28 28"
            fill="none"
          >
            <g clipPath="url(#clip0_279_3781)">
              <path
                d="M27.7332 16.7447C27.2069 19.5261 24.7745 22.0309 22.0396 22.5479C20.6107 22.8184 19.212 22.6586 17.8691 22.0598C15.5482 21.0259 13.298 19.8591 11.412 18.1371C9.13954 16.0626 7.21525 13.7001 5.98123 10.8449C5.58804 9.93521 5.33801 8.98592 5.41194 7.97621C5.46571 7.24981 5.76212 6.69326 6.45575 6.3878C6.96723 6.1629 7.46797 5.91181 7.98685 5.70705C8.2315 5.61038 8.50707 5.56674 8.77189 5.55063C9.31496 5.5184 9.54214 5.68557 9.74378 6.18438C10.096 7.05445 10.4139 7.9413 10.8185 8.78653C11.1915 9.5653 11.008 10.0292 10.3991 10.5998C10.0765 10.902 10.0254 11.2027 10.0913 11.5827C10.2371 12.4212 10.6632 13.1295 11.1465 13.8055C12.2669 15.3718 13.677 16.6057 15.4158 17.449C15.6854 17.5799 15.9764 17.6779 16.2674 17.7517C16.6808 17.8578 17.0289 17.8464 17.3677 17.4503C17.9047 16.8199 18.3449 16.7796 19.1018 17.0905C19.9916 17.4564 20.8829 17.8169 21.7748 18.1774C22.2923 18.3868 22.4866 18.6675 22.4933 19.226C22.5014 19.9283 22.2325 20.5573 21.9744 21.1891C21.9038 21.3616 21.8225 21.5308 21.7271 21.7429C22.4489 21.661 23.0727 21.4314 23.6574 21.0978C25.0191 20.3203 25.8741 19.1112 26.5153 17.7235C27.0946 16.4701 27.182 15.1308 27.1585 13.7847C27.0624 8.28034 23.5929 3.46273 18.4021 1.59436C12.5076 -0.527779 5.79035 1.93205 2.64212 7.36596C-1.3019 14.1714 1.46456 22.7755 8.64082 26.0228C13.8464 28.3785 20.1556 26.9969 23.898 22.6821C23.9861 22.5808 24.0701 22.4767 24.1588 22.3753C24.3416 22.1672 24.5614 22.1122 24.7772 22.2981C24.9936 22.4848 24.9761 22.7251 24.7859 22.9191C24.1528 23.565 23.5573 24.2612 22.8583 24.8284C19.62 27.4561 15.8971 28.443 11.7911 27.8186C5.88646 26.9204 1.21386 22.2632 0.203654 16.3782C-0.954415 9.62706 2.92172 3.05589 9.40704 0.776655C16.2029 -1.61201 23.8523 1.68365 26.7693 8.2508C27.9832 10.9832 28.2877 13.8143 27.7332 16.7447Z"
                fill="url(#paint0_linear_279_3781)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_279_3781"
                x1="14"
                y1="-0.00019455"
                x2="14"
                y2="27.9999"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#0A948A" />
                <stop offset="1" stopColor="#0A948A" />
              </linearGradient>
              <clipPath id="clip0_279_3781">
                <rect width="28" height="28" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <span className="text-base md:text-base lg:text-lg">Book A Call</span>
        </span>
      </button>
    </>
  );
}

export default BookCallBtn;
