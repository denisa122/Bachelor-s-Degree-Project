import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import "./authentication.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  }; 

  return (
    <div>
      <form id="loginForm">
        <h1>Welcome to MindScribe</h1>
        <h3>Login to your account</h3>

        <div>
          <input
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded"
          />
          <label htmlFor="email" className="pointer-events-none">
            Email
          </label>
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded"
          />
          <label htmlFor="password" className="pointer-events-none">
            Password
          </label>
        </div>

        <div className="mb-12 pb-1 pt-1 text-center">
          <button
            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
            type="submit"
            data-twe-ripple-init
            data-twe-ripple-color="light"
            style={{
              background:
                "linear-gradient(to right, #1e3c72, #2a5298, #1abc9c)",
            }}
          >
            Login
          </button>

          {/* Forgot password link */}
          <a href="#!">Forgot password?</a>
        </div>

        {/* <!--Register button--> */}
        <div className="flex items-center justify-between pb-6">
          <p className="mb-0 me-2">Don't have an account?</p>
          <Link to="/register">
            <button
              type="button"
              className="inline-block rounded border-2 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out hover:border-danger-600 hover:bg-danger-50/50 hover:text-danger-600 focus:border-danger-600 focus:bg-danger-50/50 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-rose-950 dark:focus:bg-rose-950"
              style={{ borderColor: "#2a5298", color: "#2a5298" }}
              data-twe-ripple-init
              data-twe-ripple-color="light"
            >
              Register
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
