import React from "react";
import ChatHeader from "./header/ChatHeader";
import SendMessage from "./sendMessage/SendMessage";

export default function ChatHero() {
  return (
    <section className="flex flex-col w-screen h-screen bg-primaryDark">
      {/* <ChatHeader /> */}
      <div className="h-full px-4 overflow-y-auto spacing-y-4 scrollbar-hide"></div>
      {/* <SendMessage /> */}
    </section>
  );
}
