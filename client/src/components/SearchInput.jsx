import React from "react";
import { BiSearch } from "react-icons/bi";

function SearchInput({ placeholder,conversationSearch, setConversationSearch, ...props }) {
  return (
    <div className="relative">
      <input
        type="text"
        className="h-12 w-72 md:w-90 pr-8 pl-12 focus:outline-none bg-secondaryDarkLight text-fontGrey"
        placeholder={placeholder ? placeholder : "Search"}
        {...props}
        value={conversationSearch}
        onChange={(e)=>setConversationSearch(e.target.value)}
      />
      <div className="absolute top-1/2 -translate-y-1/2 left-3">
        <BiSearch className="fa fa-search text-fontGrey z-20 w-4 h-4 md:w-6 md:h-6" />
      </div>
    </div>
  );
}

export default SearchInput;
