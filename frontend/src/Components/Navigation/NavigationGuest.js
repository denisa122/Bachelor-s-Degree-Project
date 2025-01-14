import React from "react";
import { NavLink } from "react-router-dom";
import { Link, animateScroll as scroll } from "react-scroll";

import Logo from "../../assets/logo-navbar.png";

const NavigationGuest = () => {
  return (
    <nav
      class="navGuest flex w-full flex-wrap items-center justify-between bg-zinc-50 py-2 shadow-dark-mild dark:bg-neutral-700 lg:py-1.5 lg:px-[210px]"
      data-twe-navbar-ref
    >
      <div class="flex w-full flex-wrap items-center justify-between px-3">
        <div>
          <a class="mx-2 my-1 flex items-center lg:mb-0 lg:mt-0" href="#">
            <img
              class="me-2"
              src={Logo}
              style={{ width: "80px" }}
              alt="TE Logo"
              loading="lazy"
            />
          </a>
        </div>

        <button
          class="block border-0 bg-transparent px-2 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
          type="button"
          data-twe-collapse-init
          data-twe-target="#navbarSupportedContent4"
          aria-controls="navbarSupportedContent4"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="[&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </button>

        <div
          class="!visible mt-2 hidden flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto"
          id="navbarSupportedContent4"
          data-twe-collapse-item
        >
          <ul
            class="list-style-none me-auto flex flex-col ps-0 lg:mt-1 lg:flex-row"
            data-twe-navbar-nav-ref
          >
            <li class="my-4 ps-2 lg:my-0 lg:pe-1 lg:ps-2" data-twe-nav-item-ref>
              <Link
                className="transition duration-200 hover:cursor-pointer hover:text-[#5A77AC] hover:ease-in-out focus:text-[#5A77AC] active:text-[#5A77AC] motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                activeClass="active"
                to="features"
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
              >
                Features
              </Link>
            </li>

            <li class="my-4 ps-2 lg:my-0 lg:pe-1 lg:ps-2" data-twe-nav-item-ref>
              <Link
                className="transition duration-200 hover:cursor-pointer hover:text-[#5A77AC] hover:ease-in-out focus:text-[#5A77AC] active:text-[#5A77AC] motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                activeClass="active"
                to="shareWithTherapist"
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
              >
                Share with Your Therapist
              </Link>
            </li>

            <li class="my-4 ps-2 lg:my-0 lg:pe-1 lg:ps-2" data-twe-nav-item-ref>
              <Link
                className="transition duration-200 hover:cursor-pointer hover:text-[#5A77AC] hover:ease-in-out focus:text-[#5A77AC] active:text-[#5A77AC] motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                activeClass="active"
                to="testimonials"
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
              >
                Testimonials
              </Link>
            </li>
          </ul>

          <div class="flex items-center">
            <a
              href="/login"
              data-twe-ripple-init
              data-twe-ripple-color="light"
              class="me-3 inline-block rounded px-2 pb-2 pt-2.5 font-medium leading-normal text-[#5A77AC] hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 dark:text-secondary-600 dark:hover:text-secondary-500 dark:focus:text-secondary-500 dark:active:text-secondary-500"
            >
              Login
            </a>
            <a
              href="/register"
              data-twe-ripple-init
              data-twe-ripple-color="light"
              class="me-3 inline-block bg-[#5A77AC] rounded px-6 pb-2 pt-2.5 text-medium font-medium leading-normal text-[#ffe5d9] shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
            >
              Get MindScribe for free
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationGuest;
