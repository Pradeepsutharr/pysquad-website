import { all } from "axios";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

function ContactForm({ borderColor, inputBg, color }) {
  const [status, setStatus] = useState(null);
  const [inputErr, setInputErr] = useState({});
  const [showCaptcha, setshowCaptcha] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setInputErr((prev) => ({ ...prev, [name]: "" }));
  };

  const handleCaptchaChange = (value) => {
    if (value) {
      setCaptchaVerified(true);
    }
  };

  useEffect(() => {
    const allFilled = Object.values(formData).every((val) => val.trim() !== "");
    setshowCaptcha(allFilled);

    if (allFilled && status === "error") {
      setStatus(null);
    }
  }, [formData, status]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErr = {};
    Object.entries(formData).forEach(([key, val]) => {
      if (!val.trim()) newErr[key] = `${key} is required`;
    });

    if (Object.keys(newErr).length > 0) {
      setInputErr(newErr);
      setStatus("error");
      return;
    }

    if (!captchaVerified) {
      alert("Please complete the captcha verification");
      return;
    }

    setStatus("loading");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/contact/pysquad/`,
        formData
      );
      if (response.status === 201) {
        setStatus("success");
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    }
  };

  return (
    <form
      className={`flex flex-col p-4 border  ${borderColor} rounded-xl`}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col md:flex-row gap-2">
        <div className="col-12 md:col-6">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className={`flex p-3 rounded-lg  ${color}  border  ${borderColor} ${inputBg} outline-none  focus-visible:border-primary w-full`}
          />
          {inputErr.name && (
            <span className="text-red-500">{inputErr.name}</span>
          )}
        </div>

        <div className="col-12 md:col-6">
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className={`flex p-3 rounded-lg  ${color}  border  ${borderColor} ${inputBg} outline-none  focus-visible:border-primary w-full`}
          />
          {inputErr.phone && (
            <span className="text-red-500">{inputErr.phone}</span>
          )}
        </div>
      </div>

      <div className="col-12">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={`p-3 rounded-lg  ${color} border ${borderColor} ${inputBg} outline-none  focus-visible:border-primary w-full`}
        />
        {inputErr.email && (
          <span className="text-red-500">{inputErr.email}</span>
        )}
      </div>

      <div className="col-12">
        <textarea
          name="message"
          placeholder="How can we help you ?"
          value={formData.message}
          onChange={handleChange}
          className={`p-3 h-32 rounded-lg  ${color} border ${borderColor} ${inputBg} outline-none  focus-visible:border-primary w-full`}
        ></textarea>
        {inputErr.message && (
          <span className="text-red-500">{inputErr.message}</span>
        )}
      </div>

      <div className="col-6">
        <ReCAPTCHA
          className={`${showCaptcha ? "block" : "hidden"}`}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          onChange={handleCaptchaChange}
        />
      </div>

      <div className="col-12">
        <button
          name="submit-btn"
          type="submit"
          className="bg-gradient-to-r from-primary/70 to-primary text-white py-3 px-6 rounded-lg font-bold w-full self-center"
        >
          {status === "loading" ? "Sending..." : "Submit Now"}
        </button>
      </div>

      {status === "success" && (
        <p className="text-white text-center">Message sent successfully!</p>
      )}
      {status === "error" ? (
        <p className="text-red-300 text-center">
          Something went wrong. Please try again.
        </p>
      ) : (
        <p></p>
      )}
    </form>
  );
}

export default ContactForm;
