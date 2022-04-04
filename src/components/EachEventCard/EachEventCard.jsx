import React from "react";

import { Card,Chip, CardHeader, CardActionArea,Paper, Button, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AttachmentIcon from '@mui/icons-material/Attachment';


import useStyles from "./styles";



export default function EachEventCard(props) {
  const {data}=props
  console.log(props)
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea component={Link} to={`/`}>

      <Typography variant="h6" component="p" style={{paddingBottom:"10px"}}>
        {data.eventName}
      </Typography>
      <Typography >
        {data.eventDescription}
      </Typography>

      <Chip
        sx={{ mt: 2, mr: 1 }}
        color="primary"
        label={data.date}
        variant="filled"
      />
      <Chip
        sx={{mt:2,mr:1}}
        color="primary"
        label={data.time}
        variant="filled"
      />
      <Chip
        sx={{mt:2,mr:1}}
        color="primary"
        variant="filled"
            icon={<AttachmentIcon style={{marginLeft:15}}/>}

      /> 
      <Chip
        sx={{mt:2,mr:1}}
        color="primary"
        label={data.collegeName}
        variant="filled"

          />

      <Chip
            sx={{ mt: 2, mr: 1 }}
            color={data.going ? "success" : "primary"}
            label="Going"
            variant={data.going ? "filled" : "outlined"}
       />
      
      </CardActionArea>

    </Card>
  );
}
