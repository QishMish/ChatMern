import React from "react";
import { BsFillChatDotsFill } from "react-icons/bs";
import { RiUser2Line } from "react-icons/ri";
import { BsChatSquareText } from "react-icons/bs";
import { BiGroup } from "react-icons/bi";
import { RiSearchLine } from "react-icons/ri";
import { RiContactsLine } from "react-icons/ri";
import { AiOutlineSetting } from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";
import { BsMoon } from "react-icons/bs";
import Avatar from "../../assets/images/avatar.png";
import Logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLogOutUserMutation } from "../../services/appApi";
import { useContentContext } from "../../context/sidebarContext";
import SideBarItem from "./SideBarItem";
import { useSocketContext } from "../../context/socketContext";

function Sidebar() {
  const user = useSelector((state) => state.user);
  const [logOutUser] = useLogOutUserMutation();

  const logOut = async (e) => {
    e.preventDefault();
    await logOutUser(user);
    // localStorage.removeItem("persist:root");
    window.location.replace("/login");
  };

  const icons = [
    // { id: "sideprofile", Icon: RiUser2Line },
    { id: "sidechat", Icon: BsChatSquareText },
    { id: "sidecontacts", Icon: RiContactsLine },
    // { id: "sidechannels", Icon: BiGroup },
    // { id: "sidesearch", Icon: RiSearchLine },
  ];

  const { currentElement } = useContentContext();

  return (
    <section className="flex flex-col items-center justify-between h-100 w-16 h-screen py-6 bg-secondaryDarkLight md:w-20 ">
      <div className="flex flex-col items-center justify-between space-y-6">
        <div className="p-2 rounded-md cursor-pointer md:p-3">
          {/* <BsFillChatDotsFill className="w-8 h-6 cursor-pointer text-purple md:h-8" /> */}
          <img
            src={Logo}
            className="w-8 h-6 cursor-pointer text-purple md:h-8"
            alt="logo"
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-between space-y-6">
        {/* <div className="p-2 rounded-md cursor-pointer active md:p-3">
          <RiUser2Line
            className="w-8 h-6 cursor-pointer text-fontGrey md:h-8"
            id="profile"
          />
        </div> */}

        {/* <div className="p-2 rounded-md cursor-pointer md:p-3">
          {" "}
          <BiGroup
            className="w-8 h-6 cursor-pointer text-fontGrey md:h-8"
            id="groups"
          />
        </div> */}
        {/* 
        <div className="p-2 rounded-md cursor-pointer md:p-3">
          <AiOutlineSetting
            className="w-8 h-6 cursor-pointer text-fontGrey md:h-8"
            id="settings"
          />
        </div> */}
        {icons.map((icon) => (
          <SideBarItem
            Icon={icon.Icon}
            key={icon.id}
            id={icon.id}
            currentElement={currentElement}
          />
        ))}
        {/* <div className="p-2 rounded-md cursor-pointer md:p-3">
          <RiContactsLine
            className="w-8 h-6 cursor-pointer text-fontGrey md:h-8"
            id="contacts"
          />
        </div>
        <div className="p-2 rounded-md cursor-pointer md:p-3">
          <BsChatSquareText
            className="w-8 h-6 cursor-pointer text-fontGrey  active-text md:h-8"
            id="chats"
          />
        </div> */}
      </div>
      <div className="flex flex-col items-center justify-between space-y-6 ">
        {/* <Link to="/login" className="p-2 rounded-md cursor-pointer md:p-3"> */}
        <FiLogIn
          onClick={logOut}
          className="w-8 h-6 cursor-pointer text-red md:h-8"
          id="settings"
        />
        {/* </Link> */}

        {/* <BsMoon className='w-8 h-8 text-secondaryWhite ' /> */}
        {/* <img src={Avatar} width="30px" /> */}
      </div>
    </section>
  );
}

export default Sidebar;
