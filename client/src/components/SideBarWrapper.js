import React from "react";

import Channels from "../components/Channels";
import Contacts from "../components/Contacts";
import Profile from "../components/Profile";
import Chats from "../components/Chats";
import Search from "../components/Search";
import Navbar from "../components/Navbar/Navbar";
import { useContentContext } from "../context/ContentContext";
import Sidebar from "./sidebar/Sidebar";

const getElement = (el) => {
  switch (el) {
    case "sideprofile":
      return <Profile />;
    case "sidechat":
      return <Chats />;
    case "sidecontacts":
      return <Contacts />;
    case "sidechannels":
      return <Channels />;
    case "sidesearch":
      return <Search />;
    default:
      return <Profile />;
  }
};
function SideBarWrapper() {
  const { currentElement } = useContentContext();
  return (
    <div className="flex min-h-full">
      <Sidebar />
      {getElement(currentElement)}
    </div>
  );
}

export default SideBarWrapper;
