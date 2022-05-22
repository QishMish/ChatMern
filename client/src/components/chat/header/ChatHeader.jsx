import React from "react";
import Avatar from "../../../assets/images/avatar.png";
import { BsThreeDots } from "react-icons/bs";
import { useSelector } from "react-redux";

function ChatHeader({conversationId}) {
  const user = useSelector((state) => state.user.user);

  const addresser= useSelector(state=>state.chat.conversations?.find(c=>c._id == conversationId))?.participantsFull.find(
    (p) => Number(p.id) !== Number(user.id)
  );



  return (
    <div className="flex items-center justify-between w-full h-32 px-8 border-b-2 bg-primaryDark border-secondaryDarkLight ">
      <div className="flex items-center justify-between space-x-2 ">
        <img src={addresser?.imageURL ? addresser?.imageURL : Avatar} alt="icon" className="w-12 h-12" />
        <span className="font-semibold text-md text-fontLightGrey">
         {addresser?.username}
        </span>
      </div>
      <BsThreeDots className="w-8 h-8 cursor-pointer text-fontLightGrey"/>
    </div>
  );
}

export default ChatHeader;
