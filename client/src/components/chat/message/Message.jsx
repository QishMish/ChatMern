/** @format */

import React from "react";
import Avatar from "../../../assets/images/avatar.png";
import { BiTime } from "react-icons/bi";
import { useSelector } from "react-redux";

function Message({ username, authorId, message }) {
  const loggedInUser = useSelector((state) => state.user.user.username);

  return (
    <>
      {loggedInUser === username ? (
        <div className="flex flex-row items-end justify-end p-4 space-x-2 ">
          <div className="flex-col text-right">
            <div className="max-w-md px-4 py-2 text-left rounded-lg text-fontLightGrey bg-purple">
              {message}
              <div className="flex items-center justify-end space-x-2 text-sm text-fontGrey">
                <BiTime className="text-fontGrey" />
                <span>{"10:22"}</span>
              </div>
            </div>
            <span className="mt-2 text-fontGrey">{username}</span>
          </div>
          <img src={Avatar} alt="icon" className="justify-end w-8 h-8" />
        </div>
      ) : (
        <div className="flex flex-row items-end p-4 space-x-2">
          <img src={Avatar} alt="icon" className="w-8 h-8 " />
          <div className="flex-col">
            <div className="max-w-md px-4 py-2 rounded-lg text-fontLightGrey bg-purple">
              {message}
              <div className="flex items-center justify-end space-x-2 text-sm text-fontGrey">
                <BiTime className="text-fontGrey" />
                <span>{"10:20"}</span>
              </div>
            </div>
            <span className="mt-2 text-fontGrey">{username}</span>
          </div>
        </div>
      )}
    </>
  );
}

export default Message;
