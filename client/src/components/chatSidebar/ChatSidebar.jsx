import React, { useEffect } from "react";
import Avatar from "../../assets/images/avatar.png";
import { RiUser2Line } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import SearchInput from "../SearchInput";
import LeftBarWrapper from "../LeftBarWrapper";
import ChatCard from "../ChatCard";
import { RiWechatLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useFetchConversationsMutation } from "../../services/appApi";
import { useSocketContext } from "../../context/socketContext";
function ChatSidebar() {
  const conversations = useSelector((state) => state.chat);

  const { socket } = useSocketContext();

  const [fetchConversations, { isLoading, error }] =
    useFetchConversationsMutation();

  useEffect(() => {
    fetchCOnversationData();
    console.log(isLoading);
  }, []);

  const fetchCOnversationData = async () => {
    await fetchConversations();
  };

  return (
    <LeftBarWrapper>
      <div className="flex flex-row items-center justify-between w-full">
        <span className="text-fontLightGrey py-6 text-xl font-bold text-center">
          Chats
        </span>
        <RiWechatLine className="w-6 h-6 text-fontGrey cursor-pointer" />
      </div>

      <h2 className="text-fontLightGrey p-6 text-xl font-bold  text-center"></h2>

      <SearchInput placeholder="Search channel..." />
      <div className="flex flex-col w-full rouded-sm mt-12 cursor-pointer text-fontLightGrey h-[calc(100vh_-_380px)] overflow-auto">
        <span className="mb-5">Recent</span>
        {isLoading ? (
          <h1>Loading</h1>
        ) : (
          conversations?.map((conversation, index) => {
            return <ChatCard {...conversation} key={index} />;
          })
        )}
        {}
      </div>
    </LeftBarWrapper>
  );
}

export default ChatSidebar;
