import React, { useState } from "react";
import { BiImage } from "react-icons/bi";
import { AiOutlineSend } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import { MdAttachFile } from "react-icons/md";
import { useSendPrivateMessageMutation } from "../../../services/appApi";
import { useSelector, useDispatch } from "react-redux";
import { useSocketContext } from "../../../context/socketContext";
import { addMessage } from "../../../features/chatSlice";
import Picker from 'emoji-picker-react';


function SendMessage({ conversationId }) {
  const [message, setMessage] = useState("");
  const author = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const { socket } = useSocketContext();
  const chatRoomType = useSelector((state) => state.chat.conversations)?.find(c=>c._id === conversationId)?.chatRoomType
  const [isOpenEmoji, setIsOpenEmoji] = useState(false);



  const [sendPrivateMessage, { isLoading, error }] =
    useSendPrivateMessageMutation();

  const addreserId = useSelector((state) =>
    state.chat.conversations.find((el) => el._id === conversationId)
  )?.participants.find((p) => p !== author.id);

  const onMessageSubmitHandler = async(e) => {
    e.preventDefault();
    setIsOpenEmoji(false);
    if(!message){
      return
    }
    const messageData = {
      authorId: author.id,
      addresserId: addreserId,
      message: message,
    };
    socket.emit("new-message", {
      ...messageData,
      conversationId,
      username: author.username,
      chatRoomType: chatRoomType
    });
    console.log(conversationId);
    // dispatch(
    //   addMessage({
    //     ...messageData,
    //     username: author.username,
    //     createdAt: new Date(),
    //     conversationId: conversationId,
    //     message: message,
    //   })
    // );
    setMessage("");
  };
  const onEmojiClick = (event, emojiObject) => {
    setMessage(msg=> msg.concat(emojiObject.emoji))
  };
  return (
    <div className="flex items-center justify-between w-full h-32 px-8 border-t-2 border-b-2 bg-primaryDark border-secondaryDarkLight ">
      {/* <form onSubmit={(e) => onMessageSubmitHandler(e)}> */}
      <input
        type="search"
        className="text-fontLightGrey form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal  bg-secondaryDarkLight bg-white bg-clip-padding  rounded-r-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  h-12"
        placeholder="Enter New Message"
        aria-label="Search"
        aria-describedby="button-addon2"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      {/* </form> */}
      <div
          className={isOpenEmoji ? "block absolute right-1 bottom-20" : "hidden "}
        >
          {/* {chosenEmoji ? (
            <span>You chose: {chosenEmoji.emoji}</span>
          ) : (
            <span>No emoji Chosen</span>
          )} */}
          <Picker onEmojiClick={onEmojiClick} />
        </div>
        <BsEmojiSmile
          className="w-8 cursor-pointer text-purple md:w-12"
          onClick={() => setIsOpenEmoji(!isOpenEmoji)}
        />
      {/* <BsEmojiSmile className="w-8 cursor-pointer text-purple md:w-12" /> */}
      <MdAttachFile className="w-8 cursor-pointer text-purple md:w-12" />
      <BiImage className="w-8 cursor-pointer text-purple md:w-12" />
      <div
        onClick={(e) => onMessageSubmitHandler(e)}
        className="p-4 rounded-md cursor-pointer bg-purple text-primaryWhite "
      >
        <AiOutlineSend />
      </div>
    </div>
  );
}

export default SendMessage;
