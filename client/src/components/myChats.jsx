import { ChatState } from "../context/chatProvider";
import {useState, useEffect} from "react";
import axios from "axios";
import {getSender} from "../config/chatLogics.js";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import {
    Button,
    Typography
  } from "@mui/material";

function MyChats(props){
    const {chats, setChats, user, currChat, setCurrChat } = ChatState();
    const [loggedUser, setLoggedUser] = useState();

    const fetchChat = async ()=>{
        try{
            const config={
                headers: {
                    Authorization:`Bearer ${user.token}`, 
                },
            };

            const {data} = await axios.get("http://localhost:8383/api/chat",config);
            setChats(data);
        }catch(error){
            const open = {
                vis:true,
                message:"Failed to load the Search Results"
              }
              props.isOpen(open);
        }
    }

    useEffect(()=>{
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChat();
    },
    // eslint-disable-next-line
    [props.fetchAgain])


    return (
        <div id="chat">
            <div id="chatData"> My Chats
                <Button variant="contained">New Group Chat<GroupAddIcon/></Button>
            </div>
            {chats?
            (<div id="chatList">
                {chats.map((chat)=>(<div
                className="chatBox"
                 onClick={()=>{
                    setCurrChat(chat)
                }}
                key={chat._id}>
                    <Typography>{!chat.isGroupChat?
                    (getSender(loggedUser,chat.users)):
                    (chat.chatName)}
                    </Typography>
                </div>))}
            </div>):(<></>)}
        </div>
    )
}

export default MyChats;