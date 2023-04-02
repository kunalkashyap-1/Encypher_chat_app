import React, {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const ChatContext = createContext();

const ChatProvider=({children})=>{
    const [currChat, setCurrChat] = useState();
    const [user, setUser] = useState();
    const [notif, setNotif] = useState([]);
    const [chats, setChats] = useState([]);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const navigate = useNavigate();

    useEffect(()=>{
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);

        // if(!userInfo){
        //     navigate("/signup");
        // }
    },[navigate]);

    return (
        <ChatContext.Provider
        value={{
            currChat,
            setCurrChat,
            user,
            setUser,
            notif,
            setNotif,
            chats,
            setChats,
            typing, 
            setTyping,
            isTyping, 
            setIsTyping,
        }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const ChatState = ()=>{
    return useContext(ChatContext);
};

export default ChatProvider;