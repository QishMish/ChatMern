import { BrowserRouter } from "react-router-dom";
import { connect } from "socket.io-client";
import Router from "./router/Router";
import "./style/dist/output.css";
import { AuthProvider } from "./context/authContext";
import { MessageProvider } from "./context/messageContext";
import { SocketPorovider } from "./context/socketContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <SocketPorovider>
          <AuthProvider>
            <MessageProvider>
              <Router />
            </MessageProvider>
          </AuthProvider>
        </SocketPorovider>
      </BrowserRouter>
    </>
  );
}

export default App;
