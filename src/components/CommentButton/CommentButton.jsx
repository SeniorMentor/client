import React,{useState,useContext} from 'react';

import {Typography,IconButton} from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat';

import CommentDialog from '../CommentDialog/CommentDialog'
import SnackbarMessage from '../SnackbarMessage/SnackbarMessage'

import UserContext from '../../context/context'

export default function CommentButton({data,postinfo,postCounter,setPostCounter}) {
    // const classes = useStyles();
    const { userData } = useContext(UserContext);
    const[commentCount,setCommentCount]=useState(data.length)

    const [openerror, setOpenerror] =useState(false);
    const [message,setMessage]=useState('');

    const [opendialog, setOpendialog] = useState(false);
    const handleDialogOpen = () => {
      
      if(userData.token===null)
      {
        setOpenerror(true)
        setMessage("Please Login")

      }
      else
      {
        setOpendialog(true);
      }
    };
  
    const handleDialogClose = (value) => {
      setOpendialog(false);
    }; 
    
    
    

  return (
    <div>
      
    <IconButton aria-label="Comment" onClick={handleDialogOpen} size="large">
        <ChatIcon />
        <Typography variant="subtitle2">{commentCount}</Typography>
        
      </IconButton>
      {openerror && (<SnackbarMessage open={openerror} setOpen={setOpenerror} message={message} />)}
      
      
        <CommentDialog open={opendialog} onClose={handleDialogClose} postid={postinfo} commentCount={commentCount} setCommentCount={setCommentCount}/>      </div>
  );
}
