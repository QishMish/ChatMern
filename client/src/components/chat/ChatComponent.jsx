import React, { useContext, useRef, useEffect, useState } from "react";
import ChatHeader from "./header/ChatHeader";
import SendMessage from "./sendMessage/SendMessage";
import Message from "./message/Message";
import messageContext from "../../context/messageContext";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFetchConversationMessagesQuery } from "../../services/appApi";
import Spinner from "../../assets/images/Spinner.png";
import { useSocketContext } from "../../context/socketContext";
import { addMessage } from "../../features/chatSlice";

function ChatComponent() {
  const { conversationId } = useParams();
  const messages = useSelector((state) => state.chat.messages);
  const { socket } = useSocketContext();
  const dispatch = useDispatch();
  // const context = useContext(messageContext);
  // const { messagesState, fetchMessages } = context;
  // const { messages, error: e, errorMessage, loading } = messagesState;
  const scrollRef = useRef();
  const {
    data,
    // data: messages,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useFetchConversationMessagesQuery(conversationId);

  // console.log(useFetchConversationMessagesQuery());

  useEffect(() => {
    refetch();
    // fetchConversationMessages(conversationId);
  }, [conversationId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on("get-new-message", (msg) => {
      dispatch(addMessage(msg));
      // console.log(msg);
    });
  }, []);
  // const isFetching = false;

  return (
    <section className="flex flex-col w-screen h-screen bg-primaryDark">
      <ChatHeader />
      <div className="h-full px-4 overflow-y-auto spacing-y-4 scrollbar-hide">
        {isFetching ? (
          <div className="h-full w-full flex items-center justify-center ">
            <img src={Spinner} alt="spinnee" />
          </div>
        ) : (
          messages.map((message, index) => {
            return (
              <div ref={scrollRef} key={index}>
                <Message {...message} />
              </div>
            );
          })
        )}
      </div>
      <SendMessage conversationId={conversationId} />
    </section>
  );
}

export default ChatComponent;
