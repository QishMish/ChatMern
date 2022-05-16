import { BrowserRouter } from "react-router-dom";
import { connect } from "socket.io-client";
import Router from "./router/Router";
import "./style/dist/output.css";
import { AuthProvider } from "./context/authContext";
import { MessageProvider } from "./context/messageContext";
import { SocketPorovider } from "./context/socketContext";
import { SideBarProvider } from "./context/sidebarContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <SocketPorovider>
          <AuthProvider>
            <MessageProvider>
              <SideBarProvider>
                <Router />
              </SideBarProvider>
            </MessageProvider>
          </AuthProvider>
        </SocketPorovider>
      </BrowserRouter>
    </>
  );
}

export default App;
