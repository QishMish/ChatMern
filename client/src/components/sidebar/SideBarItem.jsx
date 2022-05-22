import React from "react";
import { useContentContext } from "../../context/sidebarContext";

function SideBarItem({ Icon, id, currentElement }) {
  const { sideBarContentHandler } = useContentContext();
  return (
    <div
      className="p-2 rounded-md cursor-pointer md:p-1"
      onClick={() => {
        sideBarContentHandler(id);
      }}
    >
      <Icon
        className={`w-6 h-6 cursor-pointer  md:h-8 ${
          currentElement === id ? "text-purple" : "text- text-fontGrey "
        } `}
        id={id}
      />
    </div>
  );
}

export default SideBarItem;
