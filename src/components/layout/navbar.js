import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import BookCallBtn from "../ui/BookCallBtn";
import nav_menu_data from "./data/nav-menu-data";
import { useRouter } from "next/router";

function Navbar() {
  const location = useRouter();
  const [isActive, setIsActive] = useState(location.route);

  useEffect(() => {
    switch (location.route) {
      case "/career":
      case "/culture":
      case "/about":
      case "/contact":
        setIsActive("/about");
        break;

      case "/blogs/[slug]":
      case "/blogs":
      case "/case-studies":
      case "/case-studies/[slug]":
        setIsActive("/blogs");
        break;

      case "/services":
        setIsActive("/services");
        break;

      case "/python":
      case "/odoo":
      case "/django":
      case "/react-next":
      case "/flutter":
        setIsActive("");
        break;

      case "/":
        setIsActive("/");

      default:
        break;
    }
  }, [location]);

  return (
    <div className={`hidden lg:flex items-center justify-between `}>
      <Link href="/" className="pys-logo w-44">
        <Image
          src="/images/Logo.png"
          alt="logo"
          width={754}
          height={145}
          priority
        />
      </Link>
      <nav>
        <ul className="flex items-center gap-16 relative">
          {nav_menu_data.map((nav_item, idx) => (
            <li key={idx} className="relative nav-link">
              <Link
                href={nav_item.link}
                className={`font-medium text-lg hover:text-primary py-8 ${
                  isActive === nav_item.link
                    ? "text-primary"
                    : "text-textSecondary"
                }`}
              >
                {nav_item.title}
              </Link>

              {nav_item.has_dropdown && (
                <ul className="sub-menu absolute top-full left-0 mt-3 bg-white border-primary border rounded-xl shadow-lg py-2 w-[560px] z-30 ">
                  {nav_item.sub_menus.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 group px-8 transition-colors w-1/2 cursor-pointer  "
                    >
                      <Link
                        href={`${item.link}?id=${item?.id}`}
                        target={item?.title === "Odoo ERP" ? "_blank" : "_self"}
                        as={item.link}
                        className="flex items-center gap-4 w-full py-3"
                      >
                        <div className="sub-menu-icon bg-[#DAF3F1] p-2 rounded-lg">
                          {item.icon}
                        </div>
                        <p className="text-textSecondary text-base font-medium group-hover:text-primary transition-colors">
                          {item.title}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <BookCallBtn />
    </div>
  );
}

export default Navbar;
