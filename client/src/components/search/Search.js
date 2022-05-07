import React, { useState, useEffect } from "react";
import LeftBarWrapper from "./LeftBarWrapper";
import SearchInput from "./SearchInput";
import SearchUserItem from "./SearchUserItem";

function Search() {
  return (
    <LeftBarWrapper>
      <span className="text-fontLightGrey py-6 text-xl font-bold text-center">
        Search
      </span>
      <SearchInput placeholder="Search for users" />
      <div className="flex flex-col w-full rouded-sm mt-12 cursor-pointer"></div>
    </LeftBarWrapper>
  );
}

export default Search;
