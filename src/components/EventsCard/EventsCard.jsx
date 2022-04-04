import React from 'react';

import {Card,CardHeader,CardActions,Button,Divider} from '@mui/material'
import {Link} from 'react-router-dom'

import useStyles from './styles';
import Notification from '../Notification/Notification'; 
import EachEventCard from '../EachEventCard/EachEventCard';


const sampleEvents = [
  {
    eventName: "Event Name 1",
    eventDescription: "Event description 1",
    date: "29 March",
    time: "time 1",
    collegeName: "Fr. Conceicao Rodrigues College of Engineering",
    going: false,
  },
  {
    eventName: "Event Name 2",
    eventDescription: "Event description 2",
    date: "31 March",
    time: "time 2",
    collegeName: "Fr. Conceicao Rodrigues College of Engineering",
    going: true,
  },
];

export default function ActivityCard() {
    const classes = useStyles();

    return (
      <Card className={classes.card}>
        <CardHeader title="Events"/>
        <Divider />
        <CardActions>
          <Notification occupyParts={12}/> 
        </CardActions>
        {sampleEvents.length ? (
          sampleEvents.map((eachEvent)=>(
            <EachEventCard data={eachEvent} />
          ))
        ):null}

        <Link to="/notifications">
          <Button size="small">Show More</Button>
        </Link>
      </Card>
  );
}
