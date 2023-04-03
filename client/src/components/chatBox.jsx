import SingleChat from "./singleChat";

function ChatBox({ fetchAgain, setFetchAgain,isOpen }) {

  return (
    <div id="chatBox">
      <SingleChat
        fetchAgain={fetchAgain}
        setFetchAgain={setFetchAgain}
        snack={(e) => {
          isOpen(e);
        }}
      />
    </div>
  );
}

export default ChatBox;
