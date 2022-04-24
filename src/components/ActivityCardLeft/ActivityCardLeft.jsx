import React from 'react';

import {Card,CardHeader,CardActions,Button,Divider} from '@mui/material'
import {Link} from 'react-router-dom'

import useStyles from './styles';
import Notification from '../Notification/Notification'; 

export default function ActivityCard() {
    const classes = useStyles();

    return (
      <Card className={classes.card} style={{background:"#b5c1c9"}}>
        <CardHeader title="Activity Tab"/>
        <Divider />
        <CardActions>
          <Notification occupyParts={12}/> 
        </CardActions>
        <Link to="/notifications">
          <Button size="small">Show More</Button>
        </Link>
      </Card>
  );
}
