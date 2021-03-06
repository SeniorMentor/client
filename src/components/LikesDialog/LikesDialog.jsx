import React from 'react';

import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';



const useStyles = makeStyles({
  
});

export default function LikesDialog(props) {
  const classes = useStyles();
  const { onClose, open ,data} = props;
  console.log(data);
  const handleClose = () => {
    onClose(open);
  };

  const handleListItemClick = (value) => {
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Likes</DialogTitle>
      <List>
          {data.length!==0 && data.map((like,index)=>(
            <ListItem key={index} button onClick={() => handleListItemClick("Ayush Tomar")} >
            <ListItemAvatar>
            <Avatar aria-label="recipe" className={classes.avatar}>
            {like.userId.firstName.charAt(0)}
          </Avatar>
            </ListItemAvatar>
            <ListItemText primary={like.userId.firstName+' '+like.userId.lastName}/>
          </ListItem>

          ))}
      
      </List>
    </Dialog>
  );
}


