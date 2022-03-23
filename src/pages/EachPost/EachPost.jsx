import React,{useState,useEffect} from 'react'
import clsx from 'clsx';
import axios from 'axios';

import {Typography,Grid} from '@mui/material'
import { makeStyles } from '@mui/styles';

import SeperatePostCard from '../../components/SeperatePostCard/SeperatePostCard';
import CommentList from '../../components/CommentList/CommentList'
import InfoBar from '../../components/InfoBar/InfoBar'

const useStyles = makeStyles({
  root:{
    borderRadius:"20px",
    margin:"auto"

  },
  infobar:{
    padding:"1rem",
    width:"100%",

  },
  postpaper:{
    margin:"auto",
        minWidth: 50,
        minHeight:150,
  },
  comment:{
    marginTop:"1rem"
  },
  image:{
    width: "150px",
    height:"150px",
    objectFit:"contain",


}

});

export default function EachPost() {
  const classes = useStyles();
  const[post,setPost]=useState(null)
  const [postCounter,setPostCounter]=useState(1)
    const arr = window.location.href.split("/"); 
    const currentPostId = arr[arr.length-1];
    useEffect(() => {
      axios.get(`${process.env.REACT_APP_API_ENDPOINT}/post/${currentPostId}`)
      .then((response)=>{
        setPost(response.data)
      })
      .catch((err)=>{
        console.log(err);
      })
    }, [])
  
  return (
    <div>
      
      <Grid container spacing={2} justifyContent='center'>
        {post && (
          <>
          <Grid item xs={12} sm={8}>
            <SeperatePostCard post={post} postCounter={postCounter} setPostCounter={setPostCounter} />
        </Grid>
        <Grid item xs={12} sm={8}>
       <InfoBar post={post} />
       </Grid>
       <Grid item xs={12} sm={8}>
       <Typography id="comments" className={clsx(classes.root)} variant="h5">Comments</Typography>
       <CommentList post={post} />

       </Grid>

          
          </>
        )}
       
        </Grid>

        
    </div>
  );
}

