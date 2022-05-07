import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ChatComponent from "../components/chat/ChatComponent";
import ChatHero from "../components/chat/ChatHero";
import ChatSidebar from "../components/chatSidebar/ChatSidebar";
import Sidebar from "../components/sidebar/Sidebar";

export default function ChatRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ChatComponent />}>
          <Route path="/:chatId" element={<ChatHero />} />
        </Route>
      </Routes>
    </>
  );
}
