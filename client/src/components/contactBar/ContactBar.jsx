import React, { Fragment, useState, useEffect } from "react";
import LeftBarWrapper from "../LeftBarWrapper";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
// import SearchInput from "./SearchInput";

function ContactBar({ activeUsers, users }) {
  return (
    <LeftBarWrapper>
      <div className="flex flex-row items-center justify-between w-full">
        <span className="text-fontLightGrey py-6 text-xl font-bold text-center">
          Contacts
        </span>
        <AiOutlineUsergroupAdd className="w-6 h-6 text-fontGrey cursor-pointer" />
      </div>
      {/* <SearchInput placeholder="Search users..." /> */}
      <div className="flex flex-col px-4 w-full rouded-sm mt-12 cursor-pointer overflow-scroll h-[calc(100vh_-_268px)] scrollbar-hide">
        {users.map((user, index) => {
          return (
            <Fragment key={index}>
              {/* {index === 0 && (
                <div className="text-purple text-xl my-4">{"Users"}</div>
              )} */}
              <div className="flex items-center, justify-between">
                <div className="text-primaryWhite font-semibold text-sm my-2">
                  {user.username}
                </div>
                {activeUsers.map((au, index) => {
                  return (
                    Number(user.id) === Number(au.userId) && (
                      <div
                        key={index}
                        className="w-3 h-3 rounded-2xl bg-green flex items-center justify-center"
                      >
                        <div className="w-1 h-1 rounded-xl bg-black z-10	 "></div>
                      </div>
                    )
                  );
                })}
              </div>
            </Fragment>
          );
        })}
        {/* 
        {users.map((user, index) => {
          return (
            <Fragment key={index}>
              <div className="text-primaryWhite font-semibold text-sm my-2">
                {user.username}
              </div>
            </Fragment>
          );
        })} */}
      </div>
      <div className="flex flex-col w-full rouded-sm mt-12 cursor-pointer overflow-scroll h-[calc(100vh_-_268px)] scrollbar-hide"></div>
    </LeftBarWrapper>
  );
}

export default ContactBar;
