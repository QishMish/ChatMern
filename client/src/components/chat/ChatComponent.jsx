/** @format */

import React, { useContext, useEffect, useState } from "react";
import ChatHeader from "./header/ChatHeader";
import SendMessage from "./sendMessage/SendMessage";
import Message from "./message/Message";
import messageContext from "../../context/messageContext";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFetchConversationMessagesQuery } from "../../services/appApi";

function ChatComponent() {
  const { conversationId } = useParams();
  const messages = useSelector((state) => state.chat.messages);

  // const context = useContext(messageContext);
  // const { messagesState, fetchMessages } = context;
  // const { messages, error: e, errorMessage, loading } = messagesState;

  const { data, isLoading, error } =
    useFetchConversationMessagesQuery(conversationId);

  // console.log(useFetchConversationMessagesQuery());

  useEffect(() => {
    // fetchConversationMessages(conversationId);
  }, [conversationId]);

  return (
    <section className="flex flex-col w-screen h-screen bg-primaryDark">
      <ChatHeader />
      <div className="h-full px-4 overflow-y-auto spacing-y-4 scrollbar-hide">
        {isLoading ? (
          <h1>Loading</h1>
        ) : (
          data.map((message, index) => {
            return <Message {...message} key={index} />;
          })
        )}
      </div>
      <SendMessage />
    </section>
  );
}

export default ChatComponent;
