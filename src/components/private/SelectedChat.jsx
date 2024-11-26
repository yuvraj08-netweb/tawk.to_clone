/* eslint-disable no-unused-vars */
import { Avatar, ScrollShadow } from "@nextui-org/react";
import EmojiPicker from "emoji-picker-react";
import { Input } from "postcss";
import { useEffect, useRef, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FaArrowDown } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { toast } from "sonner";
import socketIO from "socket.io-client";
const socket = socketIO.connect("https://chatappgagan.onrender.com/", {
  transports: ["websocket"],
});

const SelectedChat = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("user")) || null;
  const loggedInUserId = loggedInUser ? loggedInUser._id : null;
  const [isEmojiShow, setIsEmojiShow] = useState(false);
  const isMediumOrLargeScreen = window.innerWidth <= 768; // Adjust the breakpoint as needed
  const [content, setContent] = useState("");
  const [groupId, setGroupId] = useState("");
  const scrollableDivRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
const selectedChat = null;
  const handleSendMessage = () => {
    if (!content) {
      toast.error("Please type something to send");
      return;
    }
    if (!groupId) {
      toast.error("Please select a group to send message");
      return;
    }
    socket.emit("chat message", {
      group: groupId,
      content,
      userId: loggedInUserId,
    });
    setContent("");
  };

  const handleEmojiClick = (emoji) => {
    // console.log(emoji)
    setContent((prev) => prev + emoji.emoji);
  };
  const scrollToBottom = () => {
    const scrollableDiv = scrollableDivRef.current;
    if (scrollableDiv) {
      scrollableDiv.scrollTop =
        scrollableDiv.scrollHeight - scrollableDiv.clientHeight;
    }
  };
  useEffect(() => {
    socket.on("chat message", (data) => {
      console.log("sockets", data);
      //   setCurrentGroup(data.group);
      checkScrollPosition();
      scrollToBottom();
    });
    // scrollToBottom();
    const checkScrollPosition = () => {
      if (scrollableDivRef.current) {
        const div = scrollableDivRef.current;
        const isScrollable = div.scrollHeight > div.clientHeight;

        if (isScrollable) {
          const isAtBottom =
            div.scrollTop + div.clientHeight === div.scrollHeight;
          setIsAtBottom(isAtBottom);
        }
      }
    };
    checkScrollPosition();
    scrollToBottom();
  }, [groupId]);

  return (
    <div>
      <div className="w-full border-l h-screen overflow-hidden">
        <div className="top flex justify-between w-full py-3 px-4 border-b items-center min-h-[10vh]">
          <div className="flex items-center gap-2">
            <Avatar
              showFallback
              name={selectedChat?.name || "Admin"}
              src={selectedChat?.avatar}
              size="md"
            />

            <p className="text-gray-600">{selectedChat?.name}</p>
          </div>
          {/* <GroupDropDown
                groupId={groupId}
                fetchGroup={fetchGroup}
                currentGroup={currentGroup}
              /> */}
        </div>
        <div className="bottom flex flex-col justify-between max-h-[88vh]">
          <ScrollShadow
            ref={scrollableDivRef}
            className="chatsSection overflow-y-scroll flex flex-col p-3 min-h-[78vh] relative"
          >
            {selectedChat ? (
              <></>
            ) : (
              <div className="no-messages">No group selected</div>
            )}
          </ScrollShadow>
          {!isAtBottom && (
            <FaArrowDown
              onClick={scrollToBottom}
              className="absolute right-[37%] bottom-[60px] animate-bounce cursor-pointer text-blue-500 hover:text-blue-800 bg-zinc-300 hover:bg-zinc-500 p-2 rounded-full shadow border border-white"
              size={"42px"}
            />
          )}

          <div className="sendMessage flex items-center gap-2 px-4">
            {isEmojiShow && (
              <div className="absolute top-[140px]">
                <EmojiPicker
                  width={"300px"}
                  height={"400px"}
                  emojiStyle={"native"}
                  onEmojiClick={handleEmojiClick}
                />
              </div>
            )}
            {!isMediumOrLargeScreen && (
              <BsEmojiSmile
                size={"30px"}
                className={`cursor-pointer hover:text-black ${
                  isEmojiShow ? "text-black" : "text-zinc-500"
                }`}
                onClick={() => setIsEmojiShow((prev) => !prev)}
              />
            )}
            <Input
              isClearable
              type="text"
              size="lg"
              variant="bordered"
              placeholder="Type your message..."
              color="primary"
              value={content}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
              defaultValue=""
              onChange={(e) => setContent(e.target.value)}
              onClear={() => setContent("")}
            />
            <IoSend
              onClick={handleSendMessage}
              size={"30px"}
              className="text-gray-500 hover:text-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedChat;
