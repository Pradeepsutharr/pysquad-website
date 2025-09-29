import React from "react";
import Navbar from "./navbar";
import MobileNavbar from "./mobile-navbar";

function Header() {
  return (
    <header className="pys-navbar py-5 w-full shadow-md shadow-neutral-50">
      <div className="container-fluid lg:px-20 px-2 ">
        <div className="lg:block hidden">
          <Navbar />
        </div>

        <div className="lg:hidden block">
          <MobileNavbar />
        </div>
      </div>
    </header>
  );
}

export default Header;
