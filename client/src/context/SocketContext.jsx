import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketURL = import.meta.env.VITE_SOCKET_URL || "http://localhost:4000";
    const newSocket = io(socketURL, {
      withCredentials: true,
      transports: ["websocket"],
    });
    setSocket(newSocket);

    return () => newSocket.close(); // Clean up on unmount
  }, []);

  useEffect(() => {
    if (currentUser && socket) {
      socket.emit("newUser", currentUser.id);
    }
  }, [currentUser, socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

