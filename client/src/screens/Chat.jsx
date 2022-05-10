/** @format */

import React, { useEffect, useState } from "react";
import ChatSidebar from "../components/chatSidebar/ChatSidebar";
import Profile from "../components/profile/Profile";
import Sidebar from "../components/sidebar/Sidebar";
import ChatComponent from "../components/chat/ChatComponent";
import ChatHero from "../components/chat/ChatHero";
import ChatRouter from "../router/ChatRouter";
import { Outlet } from "react-router-dom";
import SideBarWrapper from "../components/SideBarWrapper";
import { SocketPorovider, useSocketContext } from "../context/socketContext";
import { useSelector } from "react-redux";

function Chat() {
  const { socket, test } = useSocketContext();

  const user = useSelector((state) => state.user.user);

  const [selected, setSelected] = useState("profile");

  useEffect(() => {
    socket?.emit("user-joined", user.id);
    // setTimeout(() => console.log(socket), 3000);
    // return socket.disconnect();
    console.log(socket);
    return () => socket?.disconnect();
  });

  const selectComponentHandler = (e) => {
    let id = e.target.id ? e.target.id : e.target.farthestViewportElement.id;
    setSelected(id);
  };

  return (
    <SocketPorovider>
      <section className="flex flex-row">
        {/* <Sidebar /> */}
        <SideBarWrapper />
        {/* <ChatSidebar /> */}
        <Outlet />
      </section>
    </SocketPorovider>
  );
}

export default Chat;
