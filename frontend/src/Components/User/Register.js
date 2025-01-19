import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./authentication.css";

import Logo from "../../assets/logo_login.png";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [consentGiven, setConsentGiven] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!consentGiven) {
      setError("You must agree to the Privacy Policy to register.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/register`,
        {
          firstName,
          lastName,
          email,
          password,
          consentGiven,
        }
      );

      window.location.href = "/login";
    } catch (error) {
      console.error("Error caught in handleSubmit:", error);

      if (error.response && error.response.data) {
        setError(error.response.data.error);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <section
        className="gradient-form h-full bg-neutral-200 dark:bg-neutral-700"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <div className="container h-full p-10">
          <div className="flex h-full flex-wrap items-center justify-center">
            <div className="xl:w-[80%]">
              <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                <div className="g-0 lg:flex lg:flex-wrap">
                  <div className="px-4 md:px-0 lg:w-6/12">
                    <div className="md:mx-6 md:p-12">
                      <div className="text-center">
                        <img className="mx-auto w-32" src={Logo} alt="logo" />
                        <h4 className="mb-12 mt-2 pb-1 text-xl font-semibold">
                          Welcome to MindScribe
                        </h4>
                        {error && (
                          <p className="text-red-500 text-sm font-medium -mt-8 mb-5">
                            {error}
                          </p>
                        )}
                      </div>

                      <form id="registerForm" onSubmit={handleSubmit}>
                        <p className="mb-4 font-medium">Create an account</p>

                        <div
                          className="relative mb-4"
                          data-twe-input-wrapper-init
                        >
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-[#252D3B] data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                          />
                          <label
                            htmlFor="firstName"
                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-[#252D3B] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                          >
                            First name
                          </label>
                        </div>

                        <div
                          className="relative mb-4"
                          data-twe-input-wrapper-init
                        >
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-[#252D3B] data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                          />
                          <label
                            htmlFor="lastName"
                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-[#252D3B] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                          >
                            Last name
                          </label>
                        </div>

                        <div
                          className="relative mb-4"
                          data-twe-input-wrapper-init
                        >
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-[#252D3B] data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                          />
                          <label
                            htmlFor="email"
                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-[#252D3B] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                          >
                            Email
                          </label>
                        </div>

                        <div
                          className="relative mb-4"
                          data-twe-input-wrapper-init
                        >
                          <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-[#252D3B] data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                          />
                          <label
                            htmlFor="password"
                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-[#252D3B] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                          >
                            Password
                          </label>
                        </div>

                        <div className="relative mb-4">
                          <input
                            type="checkbox"
                            id="privacyPolicyConsent"
                            name="privacyPolicyConsent"
                            checked={consentGiven}
                            onChange={(e) => setConsentGiven(e.target.checked)}
                          />
                          <label
                            htmlFor="privacyPolicyConsent"
                            className="ml-2 text-sm"
                          >
                            I agree to the{" "}
                            <a
                              href="/privacy-policy"
                              target="_blank"
                              className="text-blue-500 underline"
                            >
                              Privacy Policy
                            </a>
                            .
                          </label>
                        </div>

                        <div className="mb-12 pb-1 pt-1 text-center">
                          <button
                            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-[#252D3B] shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                            type="submit"
                            data-twe-ripple-init
                            data-twe-ripple-color="light"
                            style={{
                              background:
                                "linear-gradient(to right, #FFCAD4 0%, #CBC0D3 50%, #D8E2DC 100%)",
                            }}
                          >
                            Register
                          </button>
                        </div>

                        <div className="flex items-center justify-between pb-6">
                          <p className="mb-0 me-2">Already have an account?</p>
                          <button
                            type="button"
                            onClick={goToLogin}
                            className="inline-block rounded border-2 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out hover:border-danger-600 hover:bg-danger-50/50 hover:text-danger-600 focus:border-danger-600 focus:bg-danger-50/50 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-rose-950 dark:focus:bg-rose-950"
                            style={{
                              borderColor: "#252D3B",
                              color: "#252D3B",
                            }}
                            data-twe-ripple-init
                            data-twe-ripple-color="light"
                          >
                            Login
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div
                    className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none"
                    style={{
                      background:
                        "linear-gradient(to right, #FFCAD4 0%, #CBC0D3 50%, #D8E2DC 100%)",
                    }}
                  >
                    <div className="px-4 py-6 text-[#252D3B] md:mx-6 md:p-12">
                      <h4 className="mb-6 text-2xl font-semibold">
                        Your Journey, Your Growth
                      </h4>
                      <p className="text-sm">
                        MindScribe is your partner in self-discovery and
                        emotional well-being. Through guided reflection, mood
                        tracking, and meaningful insights, we empower you to
                        better understand yourself, one day at a time
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
