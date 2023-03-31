import CloseIcon from '@mui/icons-material/Close';

const UserBadge=(props)=>{
    return (
        <div className="userBadge" onClick={props.handleFunction}>
            {props.user.name}
            <CloseIcon/>
        </div>
    )
}

export default UserBadge;