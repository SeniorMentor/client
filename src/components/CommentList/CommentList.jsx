import React,{useState} from 'react'
import {Typography,Paper,CardHeader,Avatar,CardContent,IconButton} from '@material-ui/core'
import moment from 'moment';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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

export default function CommentList({post}) {
    const classes = useStyles();
    const[allComments,setAllComments]=useState(post.comments)
  return (
      <>
    {allComments.length!=0 &&  allComments.map((comment,index)=>(
    <Paper className={clsx(classes.root,classes.comment)} key={index}>
         
           
         <CardHeader
       avatar={
         <Avatar aria-label="recipe" className={classes.avatar}>
           {comment.userId.firstName.charAt(0)}
         </Avatar>
       }
       action={
         <IconButton aria-label="settings" aria-haspopup="true" >
           <MoreVertIcon />
         </IconButton>
       } 
       
       
       title= {comment.userId.firstName+' '+comment.userId.lastName} 
       subheader={moment(comment.createdAt).fromNow()}
     />
     <CardContent>
       <Typography variant="body2" color="textPrimary" component="p">
       {comment.body}
       </Typography>
       

     </CardContent>
     </Paper>
    ))}
    </>
  );
}
