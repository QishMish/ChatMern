import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import Reset from "../components/auth/Reset";
import Chat from "../screens/Chat";
import ChatComponent from "../components/chat/ChatComponent";
import ChatRouter from "./ChatRouter";
import ChatHero from "../components/chat/ChatHero";
import Profile from "../components/profile/Profile";

function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/" element={<Chat />}>
          <Route index element={<ChatHero />} />
          <Route path=":chatId" element={<ChatComponent />} />
        </Route>
      </Routes>
    </>
  );
}

export default Router;
