import React,{useEffect, useState, useContext} from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import {Paper} from '@mui/material'
import UserContext from '../../context/context' 
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import { makeStyles } from '@mui/styles';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Box from '@mui/material/Box';


const useStyles = makeStyles({
  notifs:{
    width:"100%",
  }

});

const notifTypeMap = {
  1 : "New Chat",
  2 : "New Comment"
}

export default function Notification({occupyParts}) {
  const classes = useStyles();
  const { userData } = useContext(UserContext);
  const [notifications, setNotifications] = useState([]); 

  useEffect(()=>{
    let token = null;
    if(userData) { 
      token = userData.tokenNumber; 
    }
    token = localStorage.getItem('auth-token'); 
    if(token){
      axios.defaults.headers.common['authorization'] = token; 
    }
    const fetchData = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/notifications`);
      const notifications = res.data; 
      setNotifications(notifications); 
    } 
    fetchData();
  },[]);

  const seenNotification = async (notificationId) => {
    const res = await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/notification/${notificationId}`);
    if(res.data){ 
      setNotifications(prev => prev.filter((x)=>{
        return (x._id !== notificationId)
      }))
    }
  }
  const pTIG = occupyParts || 8; //partsToOccupyInGrid
  return (
    <div>
      { 
        notifications.map((notification, i)=>{
          return (
            <ListItem key={i} alignItems="flex-start">
              <Grid container direction="row" spacing={1}>
                <Grid item md={pTIG} sm={pTIG} xs={pTIG}>
                    <Box display="flex" justifyContent="space-between">
                      <Box>
                        <Link to={{ pathname : `${notification.route}`}} style={{textDecoration:"none",color:"inherit"}} >
                          <ListItemText
                            primary={notifTypeMap[notification.type]}
                            secondary={
                              <React.Fragment>
                                {notification.message}
                              </React.Fragment>
                            }
                          />
                        </Link>
                      </Box>
                      <Box> 
                        <CheckBoxIcon onClick={()=>{seenNotification(notification._id)}} style={{ fontSize: "2rem", color:"lightGreen"}} />
                      </Box>
                    </Box>
                </Grid>
              </Grid>
            </ListItem>  
          )
        })
      }
    </div>
  );
}
