/** @format */

import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";

function Reset() {
  return (
    <section className="flex flex-col items-center justify-center w-full h-screen bg-secondaryDark">
      <h2 className="text-2xl font-semibold text-fontLightGrey">Sign Up</h2>
      <p className="m-3 text-lg text-fontGrey">Get Your Account Now</p>
      <form className="flex flex-col p-12 rounded-sm bg-primaryDark">
        <div className="flex flex-col my-3">
          <label className="my-1 font-medium text-fontGrey "> Email</label>
          <div className="flex h-12 rounded w-80 border-primaryWhite">
            <div className="flex items-center justify-center w-full h-full basis-1/6 bg-secondaryDarkLight rounded-l-md">
              <AiOutlineMail className="text-fontLightGrey" />
            </div>

            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter Email"
              className="w-full p-3 outline-none bg-primaryDarkLight rounded-r-md"
            />
          </div>
        </div>
        <input
          type="submit"
          value="Reset"
          className="h-10 mt-4 font-semibold rounded-sm cursor-pointer w-80 text-primaryWhite bg-purple "
        />
      </form>
      <p className="m-3 text-fontGrey ">
        Remember It?{" "}
        <Link
          to="/register"
          className="cursor-pointer text-fontLightGrey"
        >
          Sign In
        </Link>
      </p>
    </section>
  );
}

export default Reset;
