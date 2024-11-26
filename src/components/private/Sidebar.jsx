/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { TbMessageDots } from "react-icons/tb";
// import { MdExitToApp } from "react-icons/md";
import {
  Avatar,
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tooltip,
} from "@nextui-org/react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { User } from "@nextui-org/user";

export default function Sidebar({
  showMessage,
  setMainSection,
  setMessage,
  isMediumOrLargeScreen,
}) {
  const [users, setUsers] = useState([]);
  const nav = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("user")) || null;

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch(
        "https://flawless-candy-turtle.glitch.me/user/users"
      );
      const data = await response.json();
      console.log(data);
      setUsers(data.users);
    }
    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully!");
    nav("/signup");
  };

  const handleShowMessage = () => {
    if (!isMediumOrLargeScreen) {
      setMessage((prev) => !prev);
    } else {
      if (showMessage) {
        return;
      }
      setMessage((prev) => !prev);
      setMainSection(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="left flex flex-col  justify-between py-4 px-3">
        <div id="top" className="flex flex-col gap-3">
          <Tooltip
            size="lg"
            showArrow={true}
            content={!showMessage ? "Open Sidebar" : "Close Sidebar"}
          >
            <Button onClick={handleShowMessage} variant="light" isIconOnly>
              <TbMessageDots size={"40px"} color="#45474B" />
            </Button>
          </Tooltip>
        </div>
        <div id="bottom">
          <Dropdown placement="bottom-end" backdrop="blur" showArrow>
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                showFallback
                size="md"
                src={
                  loggedInUser
                    ? loggedInUser.profileImage
                    : "https://avatars.dicebear.com/api/avataaars/1.svg"
                }
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">
                  {loggedInUser ? loggedInUser.email : "You're not Logged In"}
                </p>
              </DropdownItem>
              <DropdownItem
                key="configurations"
                onClick={() => nav(`/user/${loggedInUser._id}`)}
              >
                My Profile
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  window.open("https://forms.gle/8Wnn4HmJAABeNtwu7", "_blank");
                }}
                key="help_and_feedback"
              >
                Help & Feedback
              </DropdownItem>
              <DropdownItem onClick={handleLogout} key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      <Divider orientation="vertical" className="" />

      {showMessage && (
        <div
          className={`right py-4 px-3 ${
            isMediumOrLargeScreen  ? "!min-w-[100vw]" : "!min-w-[25vw]"
          }`}
        >
          <div className="flex items-center justify-between pb-1">
            <h1 className="text-4xl font-bold">Messages</h1>
          </div>

          <Divider className="my-4" />
          <div className="flex flex-col gap-4 items-start max-h-[84vh] overflow-y-auto">
            {users.length > 0 ? (
              users.map((user,idx) => {
                return (
                  <div key={idx}>
                    <User
                      name={user.name}
                      description={user.email}
                      avatarProps={{
                        src: user.profileImage,
                      }}
                    />
                  </div>
                );
              })
            ) : (
              <p className="text-xl font-semibold">No Chats available</p>
            )}
          </div>
        </div>
      )}

      {/* {selected === "chats" ? (
        <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Start a Chat
                </ModalHeader>
                <ModalBody>
                  <Input
                    isClearable
                    label="Search by username"
                    placeholder="Type to search... eg-: Laxya"
                    size="lg"
                    value={inputValue}
                    onClear={clearInputValue}
                    onChange={(e) => onInputChangeHandle(e)}
                    startContent={
                      <Search  className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                    }
                  />
                  {filteredUsers.map((user) => (
                    <div
                      key={user._id}
                      className="flex items-center border-2 p-4 rounded-xl justify-between"
                    >
                      <div className="flex items-center gap-3 w-[70%]">
                        <Avatar
                          showFallback
                          isBordered
                          radius="lg"
                          src={user.profileImage}
                          size="lg"
                        />
                        <div className="flex flex-col font-semibold overflow-hidden max-w-[calc(100% - 4.5rem)]">
                          <p
                            className="text-xl truncate text-ellipsis"
                            style={{ textOverflow: "ellipsis" }}
                          >
                            {user.name}
                          </p>
                          <p
                            className="text-gray-500 truncate text-ellipsis"
                            style={{ textOverflow: "ellipsis" }}
                          >
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 w-[30%]">
                        <Button
                          onClick={() => handleIndividualChatCreate(user._id)}
                          className="font-semibold mr-2"
                          variant="flat"
                          color="primary"
                        >
                          Start a Chat
                        </Button>
                      </div>
                    </div>
                  ))}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      ) : (
        <>
        </>
      )} */}
    </div>
  );
}
