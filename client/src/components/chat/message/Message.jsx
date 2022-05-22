import React from "react";
import Avatar from "../../../assets/images/avatar.png";
import { BiTime } from "react-icons/bi";
import { useSelector } from "react-redux";
import moment from "moment"

function Message({ username, authorId, message, createdAt, conversationId}) {
  const loggedInUser = useSelector((state) => state.user.user.username);
  const currentConversation = useSelector((state) => state.chat.conversations)?.find(c=>c._id === conversationId);

  
  const userImg = currentConversation?.participantsFull?.find(x=>x.username === username).imageURL


  return (
    <>
      {loggedInUser === username ? (
        <div className="flex flex-row items-end justify-end p-4 space-x-2 ">
          <div className="flex-col text-right">
            <div className="max-w-md px-4 py-2 text-left rounded-lg text-fontLightGrey bg-purple">
              {message}
              <div className="flex items-center justify-end space-x-2 text-sm text-fontGrey">
                <BiTime className="text-fontGrey" />
                <span>{moment(createdAt).startOf("min").fromNow()}</span>
              </div>
            </div>
            <span className="mt-2 text-fontGrey">{username}</span>
          </div>
          <img src={userImg ? userImg : Avatar} alt="icon" className="justify-end w-8 h-8" />
        </div>
      ) : (
        <div className="flex flex-row items-end  p-4 space-x-2">
          <img src={userImg ? userImg : Avatar} alt="icon" className="w-8 h-8 " />
          <div className="flex-col">
            <div className="max-w-md px-4 py-2 rounded-lg text-fontLightGrey bg-purple">
              {message}
              <div className="flex items-center justify-end space-x-2 text-sm text-fontGrey">
                <BiTime className="text-fontGrey" />
                <span>{moment(createdAt).startOf("min").fromNow()}</span>
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
