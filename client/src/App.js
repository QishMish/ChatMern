import { BrowserRouter } from "react-router-dom";
import { connect } from "socket.io-client";
import Router from "./router/Router";
import "./style/dist/output.css";
import { AuthProvider } from "./context/authContext";
import { MessageProvider } from "./context/messageContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <MessageProvider>
            <Router />
          </MessageProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
