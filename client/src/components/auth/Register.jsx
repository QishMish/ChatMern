import React, { useState, useEffect, useContext } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { RiUser2Line } from "react-icons/ri";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import authContext from "../../context/authContext";

function Register() {
  const context = useContext(authContext);
  const { userState, registerHandler } = context;

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { username, email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username,
      email,
      password,
    };
    registerHandler(userData);
  };

  return (
    <section className="h-screen w-full bg-secondaryDark flex flex-col justify-center	items-center">
      <h2 className="font-semibold text-2xl text-fontLightGrey">Sign Up</h2>
      <p className="m-3 text-lg text-fontGrey">Get Your Account Now</p>
      <form
        className="flex flex-col p-12 bg-primaryDark rounded-sm"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col my-3">
          <label className="my-1 text-fontGrey font-medium	"> Email</label>
          <div className="flex h-12 w-80   border-primaryWhite">
            <div className="w-full h-full basis-1/6 bg-secondaryDarkLight flex justify-center	items-center rounded-l-md">
              <AiOutlineMail className="text-fontLightGrey" />
            </div>

            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter Email"
              className="  bg-primaryDarkLight outline-none p-3 w-full rounded-r-md"
              value={email}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="flex flex-col my-3">
          <label className="my-1 text-fontGrey font-medium	 "> UserName</label>
          <div className="flex h-12 w-80   border-primaryWhite">
            <div className="w-full h-full basis-1/6 bg-secondaryDarkLight flex justify-center	items-center rounded-l-md">
              <RiUser2Line className="text-fontLightGrey" />
            </div>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter Username"
              className="  bg-primaryDarkLight outline-none p-3 w-full rounded-r-md"
              value={username}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="flex flex-col my-3">
          <label className="my-1 text-fontGrey font-medium"> Password</label>
          <div className="flex h-12 w-80  border-primaryWhite">
            <div className="w-full h-full basis-1/6 bg-secondaryDarkLight flex justify-center	items-center rounded-l-md">
              <RiLockPasswordLine className="text-fontLightGrey" />
            </div>
            <input
              type="text"
              name="password"
              id="password"
              placeholder="Enter Password"
              className="  bg-primaryDarkLight outline-none p-3 w-full rounded-r-md"
              value={password}
              onChange={onChange}
            />
          </div>
        </div>
        {/* <Link to="/chat"> */}
          <input
            type="submit"
            value="Sign Up"
            className="h-10 mt-4 w-80 rounded-sm text-primaryWhite bg-purple font-semibold cursor-pointer "
          />
        {/* </Link> */}
      </form>
      <p className="m-3 text-fontGrey ">
        Already Have An Account?{" "}
        <Link to="/login" className="text-fontLightGrey cursor-pointer">
          Sign In
        </Link>
      </p>
    </section>
  );
}

export default Register;
