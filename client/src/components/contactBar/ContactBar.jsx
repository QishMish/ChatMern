import React, { Fragment, useState, useEffect } from "react";
import LeftBarWrapper from "../LeftBarWrapper";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
// import SearchInput from "./SearchInput";

function ContactBar() {
  const users = [
    {
      id: 1,
      username: "tom",
    },
    {
      id: 2,
      username: "john",
    },
    {
      id: 3,
      username: "beth",
    },
    {
      id: 4,
      username: "liza",
    },
    {
      id: 5,
      username: "george",
    },
  ];

  return (
    <LeftBarWrapper>
      <div className="flex flex-row items-center justify-between w-full">
        <span className="text-fontLightGrey py-6 text-xl font-bold text-center">
          Contacts
        </span>
        <AiOutlineUsergroupAdd className="w-6 h-6 text-fontGrey cursor-pointer" />
      </div>
      {/* <SearchInput placeholder="Search users..." /> */}
      <div className="flex flex-col w-full rouded-sm mt-12 cursor-pointer overflow-scroll h-[calc(100vh_-_268px)] scrollbar-hide">
        {users.map((user, index) => {
          return (
            //Random key must be changed later
            <Fragment key={Math.random()}>
              {/* {index === 0 && (
                <div className="text-purple text-xl my-4">{"Users"}</div>
              )} */}
              <div className="text-primaryWhite font-semibold text-sm my-2">
                {user.username}
              </div>
            </Fragment>
          );
        })}
      </div>
      <div className="flex flex-col w-full rouded-sm mt-12 cursor-pointer overflow-scroll h-[calc(100vh_-_268px)] scrollbar-hide"></div>
    </LeftBarWrapper>
  );
}

export default ContactBar;
