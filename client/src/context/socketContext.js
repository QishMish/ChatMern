import { createContext, useState, useContext, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";

const socketContext = createContext();

const SocketPorovider = ({ children }) => {
  const [socket, setSetsocket] = useState(null);
  useEffect(() => {
    let socketURL = "http://localhost:3333";
    setSetsocket(io(socketURL, { transports: ["websocket"] }));
  }, []);

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
