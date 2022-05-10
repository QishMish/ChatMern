import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "../screens/Register";
import Login from "../screens/Login";
import Reset from "../screens/Reset";
import Chat from "../screens/Chat";
import ChatComponent from "../components/chat/ChatComponent";
import ChatRouter from "./ChatRouter";
import ChatHero from "../components/chat/ChatHero";
import Profile from "../components/profile/Profile";
import { useSelector } from "react-redux";

function Router() {
  const user = useSelector((state) => state.user);
  console.log(user);

  return (
    <>
      <Routes>
        <Route path="/" element={!user && <Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<Reset />} />
        {user && (
          <Route path="/" element={<Chat />}>
            <Route index element={<ChatHero />} />
            <Route path=":conversationId" element={<ChatComponent />} />
          </Route>
        )}
      </Routes>
    </>
  );
}

export default Router;
