import React, { useContext, useRef, useEffect, useState } from "react";
import ChatHeader from "./header/ChatHeader";
import SendMessage from "./sendMessage/SendMessage";
import Message from "./message/Message";
import messageContext from "../../context/messageContext";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useDeleteConversationsMutation, useFetchConversationMessagesQuery } from "../../services/appApi";
import Spinner from "../../assets/images/Spinner.png";
import { useSocketContext } from "../../context/socketContext";
import { addMessage } from "../../features/chatSlice";

function ChatComponent() {
  const { conversationId } = useParams();
  const messages = useSelector((state) => state.chat.messages);
  const { socket } = useSocketContext();
  const dispatch = useDispatch();
  const [prevRoom, setprevRoom] = useState("")
  const [currentRoom, setCurrentRoom] = useState("")
  // const context = useContext(messageContext);
  // const { messagesState, fetchMessages } = context;
  // const { messages, error: e, errorMessage, loading } = messagesState;
  const scrollRef = useRef();
  const prevRoomsRef = useRef();
  const currRoomsRef = useRef();
   
  const {
    data,
    // data: messages,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useFetchConversationMessagesQuery(conversationId);

  useEffect(() => {
    refetch();
  }, [conversationId, refetch]);

  const [deleteConversation, {isLoading:deleteLoading, error:deleteError}] = useDeleteConversationsMutation()

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
   
  }, [messages]);

  // useEffect(() => {

  //   console.log("render");
  //   // return () => deleteEmptyConversation()
  //   return ()=> deleteEmptyConversation()

  // }, [conversationId])
  
  const deleteEmptyConversation = async()=>{
    console.log(messages);
    if(messages.length < 1){
      refetch();
      await deleteConversation(prevRoomsRef.current)
    }
  }
  
  useEffect(() => {
    currRoomsRef.current = conversationId
    socket?.off("join-conversation")?.emit("join-conversation",prevRoomsRef.current ,currRoomsRef.current )
    
    socket?.off("get-new-message")?.on("get-new-message", (msg) => {
      console.log("new message")
      dispatch(addMessage(msg));
    });
    
    return ()=> prevRoomsRef.current = conversationId


  }, [conversationId,socket]);



  // const isFetching = false;

  return (
    <section className="flex flex-col w-screen h-screen bg-primaryDark">
      <ChatHeader conversationId = {conversationId}/>
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
      <SendMessage conversationId={currRoomsRef.current} />
    </section>
  );
}

export default ChatComponent;
