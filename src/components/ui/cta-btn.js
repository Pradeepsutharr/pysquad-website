import Link from "next/link";
import React from "react";

function CtaButton({ text, link }) {
  return (
    <Link
      href={link}
      className="capitalize lg:mr-6 lg:inline block gredient-btn py-3 px-10 text-white text-lg font-medium border-primary border rounded-lg"
    >
      {text}
    </Link>
  );
}

export default CtaButton;
