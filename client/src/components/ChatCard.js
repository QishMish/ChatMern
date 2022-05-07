import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../assets/images/avatar.png";

function ChatCard({ chatRoomName, _id }) {
  return (
    <Link
      to={_id}
      className="relative w-full h-18 bg-secondaryDark ease-linear hover:bg-secondaryDarkLight relative flex justify-between items-center px-5 py-2"
    >
      <div className="flex justify-center items-center">
        <div className="relative mr-5 chat_avatar">
          <img src={Avatar} alt="avatar" className="w-10 rounded" />
        </div>
        <div className="flex flex-col">
          <span>{chatRoomName}</span>
          <span className="self-start justify-self-start">chat text</span>
        </div>
      </div>
      <span>time</span>
    </Link>
  );
}

export default ChatCard;
