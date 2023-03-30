const UserListItem = ({user, handleFunction})=>{
    console.log(user);

    return (
        <>
        <div 
        onClick={handleFunction}
        id="userList"
        >
            <img alt={user.name} src={user.image}/>
            <div>
                <p>{user.name}</p>
                <p>{user.email}</p>
            </div>
        </div>
        </>
    )
}

export default UserListItem;