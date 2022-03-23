import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';



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


