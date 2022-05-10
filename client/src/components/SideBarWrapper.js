import React from "react";

// import Channels from "../components/Channels";
import Chats from "../components/chatSidebar/ChatSidebar";
// import Profile from "../components/Profile";
import Contacts from "../components/contactBar/ContactBar";

// import Search from "../components/Search";
// import Navbar from "../components/Navbar/Navbar";
import { useContentContext } from "../context/sidebarContext";
import Sidebar from "./sidebar/Sidebar";

const getElement = (el) => {
  switch (el) {
    // case "sideprofile":
    //   return <Profile />;
    case "sidechat":
      return <Chats />;
    case "sidecontacts":
      return <Contacts />;
    // case "sidechannels":
    //   return <Channels />;
    // case "sidesearch":
    //   return <Search />;
    default:
      return <Chats />;
  }
};
function SideBarWrapper() {
  const { currentElement } = useContentContext();
  console.log(currentElement);

  return (
    <div className="flex min-h-full">
      <Sidebar />
      {getElement(currentElement)}
    </div>
  );
}

export default SideBarWrapper;
