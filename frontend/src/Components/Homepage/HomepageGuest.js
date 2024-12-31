import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import PageUnderDevelopment from "../PageUnderDevelopment";

const HomepageGuest = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="mt-8 text-lg text-center">
        If you already have an account, you can{" "}
        {/** TODO Change back to /login after I change the entry point to the app back to this page*/}
        <Link to="/" className="font-medium underline">
          log in
        </Link>
        .
      </p>
      <PageUnderDevelopment />
    </div>
  );
};

export default HomepageGuest;
