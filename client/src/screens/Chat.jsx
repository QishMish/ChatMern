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
import { io } from "socket.io-client";
import { useRetrieveUsersQuery, useFetchLoggedUserQuery } from "../services/appApi";
import {addToken} from '../features/userSlice.js'

function Chat() {
  const { socket } = useSocketContext();
  const [activeUsers, setActiveUsers] = useState([]);
  const user = useSelector((state) => state.user.user);
  const {data:currentUser,error:currentUserErr, isLoading:loadingCurrentUser, isFetching:currentUserIsFetching, refetch:refetchCurrentUser} = useFetchLoggedUserQuery();

  const {
    data: users,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useRetrieveUsersQuery();

  useEffect(() => {
    socket?.emit("user-joined", user.id);
    socket?.on("active-users", (users) => {
      setActiveUsers(users);
    });
    refetch();
    return () => socket?.disconnect();
  }, [user]);

  return (
    <section className="flex flex-row h-full">
      {/* <Sidebar /> */}
      <SideBarWrapper
        activeUsers={activeUsers?.filter((u) => u.userId !== user.id)}
        users={users?.filter((u) => u.id !== user.id)}
      />
      {/* <ChatSidebar /> */}
      <Outlet />
    </section>
  );
}

export default Chat;
