import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "../assets/images/avatar.png";
import moment from "moment";

function ChatCard({
  chatRoomName,
  _id,
  participants,
  participantsFull,
  chatRoomType,
  lastMessageInfo,
}) {
  const user = useSelector((state) => state.user.user);

  const { message, time } = lastMessageInfo;

  // const adresserName = participants.find((p) => Number(p) !== Number(user.id));
  const { username: adresserName, imageURL } = participantsFull.find(
    (p) => Number(p.id) !== Number(user.id)
  );
  // console.log(adresserName);
  let groupName = "";
  if (chatRoomType === "MANY_TO_MANY") {
    groupName = participantsFull
      .filter(({ id, username }) => {
        return username !== user.username;
      })
      .map((user) => user.username)
      .join(" | ");
  }
  return (
    <Link
      to={_id}
      className="relative w-full h-18 bg-secondaryDark ease-linear hover:bg-secondaryDarkLight relative flex justify-between items-center px-5 py-2"
    >
      <div className="flex justify-center items-center">
        <div className="relative mr-5 chat_avatar">
          <img src={imageURL ? imageURL : Avatar} alt="avatar" className="w-10 rounded" />
        </div>
        <div className="flex flex-col">
          <span>
            {chatRoomType === "MANY_TO_MANY" ? groupName : adresserName}
          </span>
          <span className="self-start justify-self-start text-fontGrey">
            {message?.length > 15
              ? `${message?.substring(0, 15)} ...`
              : message?.length === undefined
              ? ""
              : `${message?.substring(0, 15)}`}
          </span>
        </div>
      </div>
      <span className="text-red text-sm">
        {moment(time).startOf("min").fromNow()}
      </span>
    </Link>
  );
}

export default ChatCard;
