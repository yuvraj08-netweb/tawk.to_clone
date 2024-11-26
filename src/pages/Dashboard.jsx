import React, { useState } from "react";
import Sidebar from "../components/private/Sidebar";

import SelectedChat from "../components/private/SelectedChat";
import NoChatSelected from "../components/private/NoChatSelected";

const Dashboard = () => {
  // const loggedInUser = JSON.parse(localStorage.getItem("user"))
  const [groupId, setGroupId] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  const [showMainSection, setShowMainSection] = useState(true);
  const [showMessage, setShowMessage] = useState(true);

  const [selected, setSelected] = React.useState("chats");
  const isMediumOrLargeScreen = window.innerWidth <= 768; // Adjust the breakpoint as needed

  const selectedChat = null;

  return (
    <>
      <div className="flex">
        <Sidebar
          setGroupId={setGroupId}
          currentGroupId={groupId}
          showMessage={showMessage}
          setMessage={setShowMessage}
          setMainSection={setShowMainSection}
          isMediumOrLargeScreen={isMediumOrLargeScreen}
          selected={selected}
          setSelected={setSelected}
        />
        <div className={selectedChat
                      ? "containerRight !w-full block"
                      : "md:block hidden !w-full"}>
          {showMainSection ? (
            selectedChat ? (
              <SelectedChat />
            ) : (
              <NoChatSelected />
            )
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
