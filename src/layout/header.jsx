import React from "react";
import { useState, useEffect } from "react";
import Navbar from "./navbar";
import MobileNavbar from "./mobile-navbar";

function Header() {
  const [headerFixed, setHeaderFixed] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setHeaderFixed(window.scrollY > 500);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header
      className={`pys-navbar py-5 w-full bg-white ${
        headerFixed ? "header-fixed" : ""
      }`}
    >
      <div className="container-fluid lg:px-20 md:px-8 px-2 ">
        <div className="hidden md:block">
          <Navbar />
        </div>

        <div className="block md:hidden ">
          <MobileNavbar />
        </div>
      </div>
    </header>
  );
}

export default Header;
