import React from "react";

// import Channels from "../components/Channels";
import Chats from "./chatSidebar/ChatSidebar";
// import Profile from "../components/Profile";
import Contacts from "./contactBar/ContactBar";
import Profile from './profile/Profile'

// import Search from "../components/Search";
// import Navbar from "../components/Navbar/Navbar";
import { useContentContext } from "../context/sidebarContext";
import Sidebar from "./sidebar/Sidebar";

const getElement = (el, activeUsers, users) => {
  switch (el) {
    case "sideprofile":
      return <Profile />;
    case "sidechat":
      return <Chats />;
    case "sidecontacts":
      return <Contacts activeUsers={activeUsers} users={users} />;
    // case "sidechannels":
    //   return <Channels />;
    // case "sidesearch":
    //   return <Search />;
    default:
      return <Chats />;
  }
};
function SideBarWrapper({ activeUsers, users }) {
  const { currentElement } = useContentContext();

  return (
    <div className="flex min-h-full">
      <Sidebar />
      {getElement(currentElement, activeUsers, users)}
    </div>
  );
}

export default SideBarWrapper;
