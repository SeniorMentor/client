import React from 'react';
import {Link} from "react-router-dom"
import { makeStyles, withStyles } from '@mui/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined';
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined';
import Grid from '@mui/material/Grid';


const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    marginRight: '5px'
  },
}))(Badge);


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
}));

  
const PersonBox = ({chatHead, lastMessage, groupName, newMessages})=>{
    const classes = useStyles(); 
    return (

      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={chatHead} src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
          
          <Grid container direction="row" spacing={1}>
            <Grid item md={9} sm={9} xs={9}>
              <Link to={{ pathname : `/chat/pc/${groupName}`}} style={{textDecoration:"none",color:"inherit"}} >
                <ListItemText
                  primary={chatHead}
                  secondary={
                    <React.Fragment>
                      {lastMessage}
                    </React.Fragment>
                  }
                />
              </Link>
            </Grid>
            <Grid item item md={2} sm={2} xs={2}>
              <IconButton aria-label="cart">
                  <StyledBadge badgeContent={newMessages} color="secondary">
                    <ChatBubbleOutlinedIcon />
                  </StyledBadge> 
                </IconButton>
            </Grid>
          </Grid>
      </ListItem>
      
    )
}

export default PersonBox; 