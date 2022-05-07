import React from "react";
import Avatar from "../../assets/images/avatar.png";
import { RiUser2Line } from "react-icons/ri";

function Profile() {
  return (
    <section className="bg-secondaryDark flex flex-col items-center p-3 w-full h-screen md:w-80">
      <h2 className="text-fontLightGrey p-4 text-lg text-center">My Profile</h2>
      <div className=" flex flex-col items-center my-3">
        <img src={Avatar} className="w-20 h-20" />
        <h3 className="text-fontLightGrey text-lg my-3">John Doe</h3>
        <div className="flex flex-row items-center space-x-2">
          <div className="w-3 h-3 rounded-2xl bg-green flex items-center justify-center">
            <div className="w-1 h-1 rounded-xl bg-black z-10	 "></div>
          </div>
          <span className="text-fontGrey">Active</span>
        </div>
      </div>
      <p className="text-fontGrey text-center">
        If several languages coalesce, the grammar of the resulting language is
        more simple and regular than that of the individual.
      </p>
      <div className="flex flex-col justify-start mt-8 w-48  md:w-60 ">
        <div className="flex flex-row items-center space-x-2 bg-secondaryDarkLight p-2 text-fontLightGrey rounded-t-md">
          <RiUser2Line />
          <h2>About</h2>
        </div>
        <div className="bg-primaryDark space-y-2 p-2 rounded-b-md">
          <div className="test">
            <div className="text-fontGrey">Name</div>
            <div className="text-fontLightGrey text-sm">John Doe</div>
          </div>
          <div className="test">
            <div className="text-fontGrey">Email</div>
            <div className="text-fontLightGrey text-sm">
              Johndoe@123@mail.com
            </div>
          </div>
          <div className="test">
            <div className="text-fontGrey">Location</div>
            <div className="text-fontLightGrey text-sm">California, USA</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
