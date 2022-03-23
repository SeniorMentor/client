import React,{useContext} from "react";
import Message from "./Message/Message"; 
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import UserContext from '../../../context/context'; 

/*
message = [{
    from : {
        _id : 
        first_name : 
        last_name :
        body :  
    }
}]
*/


const useStyles = makeStyles((theme) => ({
    stb : {
        height : "60%",
        overfloe : "auto"
    }, 
}));

const Messages = ({messages}) => {
    const { userData } = useContext(UserContext);
    let myId = null
    if(userData &&  userData.token) { 
        myId = userData.token.userId; 
    }
    
    return (
        <Box style={{height:"60vh"}}>
            {
                messages.map((x,i)=>{
                    return (
                        <Message key={i} message={x} myId={myId}/>
                    )
                })
            }
        </Box>
    )
}

export default Messages; 