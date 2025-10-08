import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, Mail, MapPinned, Linkedin } from "lucide-react";
import nav_menu_data from "./data/nav-menu-data";
import BookCallBtn from "@/ui/BookCallBtn";

function MobileNavbar() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const handleToggle = (idx) => setExpanded(expanded === idx ? null : idx);

  return (
    <>
      <div className="flex items-center justify-between">
        <Link href="/" className="block w-36">
          <Image
            src="/images/Logo.png"
            alt="logo"
            width={256}
            height={49}
            priority
          />
        </Link>

        <button
          name="menu-btn"
          className="flex  items-center justify-center "
          onClick={() => setOpen(true)}
          aria-label="Open Menu"
        >
          <Menu className="text-3xl text-primary" />
        </button>
      </div>

      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          open ? "visible bg-black bg-opacity-80" : "invisible bg-transparent"
        }`}
      >
        <aside
          className={`absolute top-0 right-0 bottom-0 w-[320px] bg-white shadow-lg py-5 flex flex-col  transform transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          } z-50 overflow-auto`}
        >
          <div className="flex justify-between px-6 items-center  pb-4">
            <Link href="/" className="block w-36">
              <Image
                src="/images/Logo.png"
                alt="logo"
                width={754}
                height={145}
                priority
              />
            </Link>
            <button
              name="close-btn"
              onClick={() => setOpen(false)}
              className=""
              aria-label="Close menu"
            >
              <X className="text-gray-700 w-6 h-6" />
            </button>
          </div>

          {/* Menu list */}
          <nav className="px-6 mt-5">
            <ul className="space-y-4">
              {nav_menu_data.map((nav_item, idx) => (
                <li key={nav_item.id}>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-3 ">
                    <Link
                      href={nav_item.link}
                      onClick={() => setOpen(false)}
                      className="font-bold text-base text-textPrimary hover:text-primary"
                    >
                      {nav_item.title}
                    </Link>

                    {nav_item.has_dropdown && (
                      <button
                        name="toggle-sub-menu-btn"
                        onClick={() => handleToggle(idx)}
                        className="p-1"
                        aria-label={`Toggle submenu for ${nav_item.title}`}
                      >
                        <svg
                          className={`w-5 h-5 transform transition-transform duration-300 ${
                            expanded === idx ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    )}
                  </div>

                  {nav_item.has_dropdown && expanded === idx && (
                    <ul className="px-3">
                      {nav_item.sub_menus.map((sub, i) => (
                        <li key={i}>
                          <Link
                            href={`${sub.link}?id=${sub?.id}`}
                            target={
                              sub?.title === "Odoo ERP" ? "_blank" : "_self"
                            }
                            as={sub.link}
                            onClick={() => setOpen(false)}
                            className="flex text-sm text-textSecondary hover:text-primary font-semibold py-3 border-b"
                          >
                            {sub.title}
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

          {/* Contact Section */}
          <div className="px-6 mt-auto ">
            <h3 className="font-bold text-lg mb-4">Contact us</h3>

            <div className="flex items-center gap-4 mb-4 text-textSecondary text-sm ">
              <span className="col" style={{ padding: "0px" }}>
                <MapPinned />
              </span>
              <Link
                href="https://www.google.com/maps/place/PySquad+Informatics+LLP/@23.0386088,72.5096226,15z/data=!4m6!3m5!1s0x395e9bfc8ecadbcf:0x6df3775da9ff0330!8m2!3d23.0386088!4d72.5096226!16s%2Fg%2F11qm6hh762?entry=ttu"
                className=""
              >
                A 605, Shilp Aaron, Sindhubhavan Road, Ahmedabad, IN 380054
              </Link>
            </div>

            <div className="flex items-center gap-4 mb-4 text-textSecondary text-sm">
              <span className="col" style={{ padding: "0px" }}>
                <Mail />
              </span>
              <Link href="mailto:solutions@pysquad.com" className="">
                solutions@pysquad.com
              </Link>
            </div>

            <div className="flex items-center gap-4 text-textSecondary text-sm">
              <span className="col" style={{ padding: "0px" }}>
                <Phone />
              </span>
              <Link href="tel:+919898295005" className="">
                +91 9898295005
              </Link>
            </div>
          </div>
        </aside>

        {/* Click outside overlay to close */}
        {open && (
          <div className="absolute inset-0" onClick={() => setOpen(false)} />
        )}
      </div>
    </>
  );
}

export default MobileNavbar;
