import { createContext, useState, useContext } from "react";
import { io } from "socket.io-client";

const socketContext = createContext();

const SocketPorovider = ({ children }) => {
  const socket = io("http://localhost:3333", {
    transports: ["websocket"],
    upgrade: false,
  });

  console.log("render");

  return (
    <socketContext.Provider value={{ socket: socket }}>
      {children}
    </socketContext.Provider>
  );
};

const useSocketContext = () => {
  const context = useContext(socketContext);

  if (!context) {
    return new Error("There is no Context");
  } else {
    return context;
  }
};

export { SocketPorovider, useSocketContext };
