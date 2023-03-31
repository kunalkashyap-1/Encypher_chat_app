import SingleChat from "./singleChat";
import { ChatState } from "../context/chatProvider";

function ChatBox({ fetchAgain, setFetchAgain },props) {
  const { currChat } = ChatState();

  return (
    // <div style={{display:currChat?"flex":"none"}}>
    <div id="chatBox">
      <SingleChat
        fetchAgain={fetchAgain}
        setFetchAgain={setFetchAgain}
        isOpen={(e) => {
          props.isOpen(e);
        }}
      />
    </div>
  );
}

export default ChatBox;
