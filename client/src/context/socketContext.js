import { createContext, useState, useContext, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";

const socketContext = createContext();

let socketURL = "http://localhost:3333";
const socket = io(socketURL, { transports: ["websocket"] });

const SocketPorovider = ({ children }) => {
  // const [socket, setSocket] = useState(null);
  // let socketURL = "http://localhost:3333";
  // const socket = useRef();

  // useEffect(() => {
  //   // socket.current = io(socketURL, { transports: ["websocket"] });
  //   // console.log(socket);
  //   socket.current = io(socketURL, { transports: ["websocket"] });
  // }, [socketURL]);

  const user = useDispatch((state) => state.user.user);

  // useEffect(() => {
  //   console.log(socket);
  //   setSocket(io(socketURL, { transports: ["websocket"] }));
  //   return () => socket?.disconnect();
  // }, [socketURL]);

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
