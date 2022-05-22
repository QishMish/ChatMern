import React, { Fragment, useState, useEffect } from "react";
import LeftBarWrapper from "../LeftBarWrapper";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateConversationsMutation } from "../../services/appApi";
// import SearchInput from "./SearchInput";

function ContactBar({ activeUsers, users }) {
  let navigate = useNavigate();

  const loggedUserId = useSelector(state=>state.user.user.id)
  const conversations = useSelector(state=>state.chat.conversations)?.filter(c=>c.chatRoomType === "ONE_TO_ONE")
  
  const [createConversation, {isLoading, error}] = useCreateConversationsMutation()
  

  const alphabetsInitial = [];


  const getUniqueInitialsFromName = ()=>{
    users.reduce((previousValue, currentValue) => {
      if (!alphabetsInitial.includes(currentValue.username[0])) {
        alphabetsInitial.push(currentValue.username[0]);
      }
      return alphabetsInitial;
    }, alphabetsInitial);
  
  }
  getUniqueInitialsFromName();

  const sendMessage = async(userId)=>{
    const participants = [loggedUserId, userId]
    const exist = conversationExist(userId)
 
    if(exist){
      navigate(`/${exist._id}`)
    }
    const {data}= await createConversation({authorId: loggedUserId,addresserId:userId})
      navigate(`/${data._id}`)
  }
  
  function conversationExist(userId) {
    return conversations.find((c)=>{
      return c.participants.find(p=> {
        if(p === loggedUserId){
          return c.participants.find(p2 => p2 === userId)
        }
      })
    }) 
  }


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
        {/* {users.map((user, index) => {
          return (
            <Fragment key={index} > 
              <div onClick={()=>sendMessage(user.id)} className="flex items-center, justify-between">
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
        })} */}
        {/* {alphabetsInitial.sort().map((symbol) => {
          let contactArr;
        
          console.log(contactArr);
          const contacts = contactArr?.filter((item) =>
            item.username.startsWith(symbol)
          );
          console.log(contacts)

          return contacts?.map((contact, index) => {
            return (
              //Random key must be changed later
              <Fragment key={Math.random()}>
                {index === 0 && (
                  <div className="text-purple text-xl my-4">{symbol}</div>
                )}
                <div
                  className="text-primaryWhite font-semibold text-sm my-2"
                >
                  {contact.username}
                </div>
              </Fragment>
            );
          });
        })} */}
        {
          alphabetsInitial.sort().map(symbol=>{
            const contacts = users.filter((item) =>
            item.username.startsWith(symbol)
            );
            return contacts.map((contact, index)=>{
              return (
                <Fragment key={index}   >
                  {index === 0 && (
                    <div className="text-purple text-xl my-4">{symbol}</div>
                  )}
                  <div
                    className="text-primaryWhite font-semibold text-sm my-2 flex items-center, flex-row justify-between" onClick={()=>sendMessage(contact.id)}
                  >
                    {contact.username}
                    {activeUsers.map((au, index) => {
                    return (
                      Number(contact.id) === Number(au.userId) && (
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
                )
            })
          })
        }
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
      {/* <div className="flex flex-col w-full rouded-sm mt-12 cursor-pointer overflow-scroll h-[calc(100vh_-_268px)] scrollbar-hide"></div> */}
    </LeftBarWrapper>
  );
}

export default ContactBar;
