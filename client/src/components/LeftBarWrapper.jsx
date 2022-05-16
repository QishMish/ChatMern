import React from "react";

function LeftBarWrapper({ children }) {
  return (
    <section className="bg-secondaryDark flex flex-col items-center py-12 px-5 w-[calc(100vw_-_4.688rem)] h-screen md:w-96  h-full min-h-screen ">
      {children}
    </section>
  );
}

export default LeftBarWrapper;
