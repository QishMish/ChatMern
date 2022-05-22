import React, { useEffect, useRef, useState } from "react";
import Avatar from "../../assets/images/avatar.png";
import { RiUser2Line } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import SearchInput from "../SearchInput";
import LeftBarWrapper from "../LeftBarWrapper";
import ChatCard from "../ChatCard";
import { RiWechatLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useFetchConversationsQuery } from "../../services/appApi";
import { useSocketContext } from "../../context/socketContext";
import Spinner from "../../assets/images/Spinner.png";

function ChatSidebar() {
  const conversations = useSelector((state) => state.chat.conversations);
  const { socket } = useSocketContext();
  const [conversationSearch, setConversationSearch] = useState("");

  const {
    data,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useFetchConversationsQuery();

  useEffect(() => {
    refetch();
  }, []);



  return (
    <LeftBarWrapper>
      <div className="flex flex-row items-center justify-between w-full">
        <span className="text-fontLightGrey py-6 text-xl font-bold text-center">
          Chats
        </span>
        <RiWechatLine className="w-6 h-6 text-fontGrey cursor-pointer" />
      </div>
      <span className="text-fontLightGrey p-6 text-xl font-bold  text-center"></span>
      <SearchInput placeholder="Search channel..." conversationSearch={conversationSearch} setConversationSearch={setConversationSearch} />
      <div className="flex flex-col w-full rouded-sm mt-12 cursor-pointer text-fontLightGrey h-[calc(100vh_-_380px)] overflow-auto">
        <span className="mb-5">Recent</span>
        {isFetching ? (
          <div className="h-full w-full flex items-center justify-center ">
            <img src={Spinner} width="150px" alt="spinnee" />
          </div>
        ) : (
          conversations.map((conversation, index) => {
            return <ChatCard {...conversation} key={index}/>;
          })
        )}
        {}
      </div>
    </LeftBarWrapper>
  );
}

export default ChatSidebar;
