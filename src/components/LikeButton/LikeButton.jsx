import React,{useContext,useState,useEffect} from 'react';
import axios from 'axios'

import FavoriteIcon from '@mui/icons-material/Favorite';
import {Typography,IconButton } from '@mui/material'
import { makeStyles } from '@mui/styles';

import SnackbarMessage from '../SnackbarMessage/SnackbarMessage'
import UserContext from '../../context/context'


const useStyles = makeStyles((theme) => ({
    likeIcon:{
        color:"#e0245e"
    },
    unlikeIcon:{
        color:"none"
    }
}))



export default function LikeButton({postinfo,data,postCounter,setPostCounter}) {
  const classes = useStyles();
  const { userData } = useContext(UserContext);
  const [like, setlike] = useState(false)
  const[likeCount,setLikeCount]=useState(data.length)
  useEffect(() => {
    if(userData.token && userData.loggedIn===true && like && data.find((like) => like.userId === userData.token.userId))
    {
      setlike(like.isLike)
      console.log(like);
    }
  }, [data])
  const handleClick=()=>{
    console.log(userData)
    if(userData.token===null)
      {
        setOpenerror(true)
        setMessage("Please Login")
      }
      else
      {

        axios.put(`${process.env.REACT_APP_API_ENDPOINT}/post/like/${postinfo}`,{},{
          headers:{
              authorization: userData.tokenNumber
      }
      })
      .then(()=>{
        if(postCounter)
        {
          setPostCounter(postCounter+1)
        }
        setlike(!like)
        if(!like===true)
        {
          setLikeCount(likeCount+1)
        }
        else
        {
          setLikeCount(likeCount-1)
        }
       
      })
  
        
      }
  }

    const [openerror, setOpenerror] =useState(false);
    const [message,setMessage]=useState('');

  return (
    <div>
      <IconButton onClick={handleClick} aria-label="Like" size="large">
        <FavoriteIcon className={like?classes.likeIcon:classes.unlikeIcon} />
        <Typography variant="subtitle2">{likeCount}</Typography>

      </IconButton>
      {openerror && (<SnackbarMessage open={openerror} setOpen={setOpenerror} message={message} />)}
    </div>
  );
}
