import { createContext, useState, useContext } from "react";

const ContentContext = createContext();

const SideBarProvider = ({ children }) => {
  const [currentElement, setCurrentElement] = useState("sidechat");

  const sideBarContentHandler = (id) => {
    setCurrentElement(id);
  };

  return (
    <ContentContext.Provider value={{ currentElement, sideBarContentHandler }}>
      {children}
    </ContentContext.Provider>
  );
};

const useContentContext = () => {
  const context = useContext(ContentContext);

  if (!context) {
    return new Error("There is no Context");
  } else {
    return context;
  }
};

export { SideBarProvider, useContentContext };
