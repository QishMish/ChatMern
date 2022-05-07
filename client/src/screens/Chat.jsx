/** @format */

import React, { useState } from "react";
import ChatSidebar from "../components/chatSidebar/ChatSidebar";
import Profile from "../components/profile/Profile";
import Sidebar from "../components/sidebar/Sidebar";
import ChatComponent from "../components/chat/ChatComponent";
import ChatHero from "../components/chat/ChatHero";
import ChatRouter from "../router/ChatRouter";
import { Outlet } from "react-router-dom";

function Chat() {
  const enums = {
    profile: "profile",
    chat: "chats",
    contact: "contacts",
  };
  const [selected, setSelected] = useState("profile");

  const selectComponentHandler = (e) => {
    let id = e.target.id ? e.target.id : e.target.farthestViewportElement.id;
    setSelected(id);
  };

  return (
    <section className="flex flex-row">
      <Sidebar />
      <ChatSidebar />
      <Outlet />
    </section>
  );
}

export default Chat;
