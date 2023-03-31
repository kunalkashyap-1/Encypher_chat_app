export const getSender=(loggedUser,users)=>{
    const [sender] = users.filter(user => user._id !== loggedUser._id);
    return sender;
};

export const getGroupData=(loggedUser,users)=>{
    // console.log(users);
    return {
        name:users.chatName
    }
};