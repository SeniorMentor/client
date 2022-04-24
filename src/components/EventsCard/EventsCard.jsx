import React from 'react';

import {Card,CardHeader,CardActions,Button,Divider} from '@mui/material'
import {Link} from 'react-router-dom'

import useStyles from './styles';
import Notification from '../Notification/Notification'; 
import EachEventCard from '../EachEventCard/EachEventCard';


export default function EventsCard(props) {
  const{events}=props
    const classes = useStyles();

    return (
      <Card className={classes.card}>
        <CardHeader title="Events"/>
        <Divider />
        <CardActions>
          <Notification occupyParts={12}/> 
        </CardActions>
        {events.length ? (
          events.map((eachEvent, i) => (
            i<2 ?
              <EachEventCard data={eachEvent} /> : null
          ))
        ):null}

        <Link to="/events">
          <Button size="small">Show More</Button>
        </Link>
      </Card>
  );
}
