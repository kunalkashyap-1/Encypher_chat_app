import { ChatState } from "../context/chatProvider";
import {useState} from "react";
import SideDrawer from "../components/sideDrawer.jsx";
import MyChats from "../components/myChats.jsx";
import ChatBox from "../components/chatBox.jsx";

function ChatPage(props) {
    const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
  return (
    <div>
      {user && <SideDrawer/>}
      <div id="chats">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </div>
    </div>
  );
}

export default ChatPage;
