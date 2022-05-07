/** @format */

import React, { useContext, useEffect } from "react";
import ChatHeader from "./header/ChatHeader";
import SendMessage from "./sendMessage/SendMessage";
import Message from "./message/Message";
import messageContext from "../../context/messageContext";

function ChatComponent() {
  const context = useContext(messageContext);
  const { messagesState, fetchMessages } = context;
  const { messages, error, errorMessage, loading } = messagesState;

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <section className="flex flex-col w-screen h-screen bg-primaryDark">
      <ChatHeader />
      <div className="h-full px-4 overflow-y-auto spacing-y-4 scrollbar-hide">
        {messages.map((product, index) => {
          return <Message {...product} key={index} />;
        })}
      </div>
      <SendMessage />
    </section>
  );
}

export default ChatComponent;
