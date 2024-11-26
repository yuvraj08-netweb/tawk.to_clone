const NoChatSelected = () => {
  return (
    <div className="!flex flex-col justify-center items-center !w-full !h-full">
        <h2 className="text-3xl font-bold text-gray-500 select-none !text-center">Select a chat to start the conversation</h2>
        <img src="/undraw_chat_bot.svg" alt="No chat selected" className="!hidden md:!block" />
    </div>
  )
}

export default NoChatSelected