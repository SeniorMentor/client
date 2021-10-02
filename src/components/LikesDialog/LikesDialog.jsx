import React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';


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
            <ListItem key={index} button onClick={() => handleListItemClick("Ayush Tomar")} key="1">
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


