import React from 'react';
import clsx from  'clsx';
import moment from 'moment';
import { Link } from 'react-router-dom'

import {Card,Typography,CardHeader,CardContent,CardActions,CardActionArea,Avatar,Chip } from '@mui/material'
import { makeStyles } from '@mui/styles';

import LikeButton from '../LikeButton/LikeButton'
import CommentButton from '../CommentButton/CommentButton'

const useStyles = makeStyles((theme) => ({
    
    card:{
        margin:"auto",
        minWidth: 50,
        minHeight:150,
        borderRadius:"20px",
        // borderBottom:"3px solid #3f51b5",
        // backgroundColor:"#f5f6fa"
        
    },
    likeIcon:{
        color:"#e0245e"
    },
    unlikeIcon:{
        color:"none"
    },
    image:{
        width: "150px",
        height:"150px",
        objectFit:"contain",


    }
    
    
}))



export default function SeperatePostCard({post,postCounter,setPostCounter}) {
    const classes = useStyles();
    var postFullname=post.userId.firstName+' '+post.userId.lastName;
    
    return (
    <Card id={post._id} className={clsx(classes.card)}>
    <CardActionArea component={Link} to={`/post/${post._id}`}>

    <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {post.userId.firstName.charAt(0)}
          </Avatar>
        }
        
        title= {postFullname} 
        subheader={moment(post.createdAt).fromNow()}
      />

      <CardContent>
        {
          post.tags.map((tag,idx) =>
            <Chip label={tag.name} key={idx} variant="filled" sx={{mr:1,mb:1}}/>  
          )
        }
        <Typography variant="body2" color="textPrimary" component="p">
        {post.body}
        </Typography>
        {post.attachment && (
          <img className={classes.image} src={post.attachment} alt=""/>
        )}
        

      </CardContent>
      </CardActionArea>

      <CardActions disableSpacing>
            <LikeButton data={post.likes} postinfo={post._id}/>
            <CommentButton postinfo={post._id} data={post.comments}/>
        
        {/* <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {userData.token && userData.token.userId===post.userId && (<MenuItem onClick={handleClose}>Edit Post</MenuItem>)}
        {userData.token && userData.token.userId===post.userId && (<MenuItem onClick={handleClose}>Delete Post</MenuItem>)}
        {userData.token && userData.token.userId!==post.userId && (<MenuItem onClick={handleClose}>Report</MenuItem>)}
      </Menu> */}

    </CardActions>

  </Card>
  );
}