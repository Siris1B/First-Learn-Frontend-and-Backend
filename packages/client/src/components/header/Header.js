import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "./logo.png";

export default function Header() {
  const navigate = useNavigate();
  function onBtnLogoutClick() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  if (localStorage.getItem("token")) {
    return (
      <header>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto container">
            <Link to="/languages" className="flex items-center">
              <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Langs
              </span>
            </Link>
            <div className="flex items-center lg:order-2">
              <button
                onClick={() => onBtnLogoutClick()}
                className=" font-medium rounded-lg text-sm px-4 btn btn-outline btn-error "
              >
                Log out
              </button>
            </div>
            <div
              className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            ></div>
          </div>
        </nav>
      </header>
    );
  }
  return "";
}
