import React from 'react';
import { makeStyles } from '@mui/styles';
import Notification from '../../components/Notification/Notification'

const useStyles = makeStyles({
  notifs:{
    width:"100%",
  }

});

export default function NotificationPage() {
  return (
    <Notification occupyParts={8} /> 
  )
}
