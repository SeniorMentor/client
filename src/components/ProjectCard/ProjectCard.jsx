import React,{useState} from 'react';

import {Paper,Typography} from '@mui/material'
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import CreateIcon from '@mui/icons-material/Create';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import ProjectCardDialog from '../ProjectCardDialog/ProjectCardDialog'

const useStyles = makeStyles((theme) => ({
  
    root:{
        width:"90%",
        margin:"1rem",
        
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      margin: '0.5rem 0 0.2rem 0',
    }
  }))
export default function ProjectCard({editflag,changeflag,setChangeflag,data}) {
  const[projectOpen,setProjectOpen]=useState(false)

    const classes = useStyles();
    const handleProjectDialogOpen = () => {
      setProjectOpen(true);
  };
  const handleProjectDialogClose = () => {
    setProjectOpen(false);
  }; 
  const startdate = new Date(data.startDate)
  const enddate = new Date(data.endDate)

  return (
    <>
    <Paper elevation={0}  className={classes.root}>
      
      <Card  variant="outlined">
        <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Project Title
        </Typography>
        <Typography variant="h5" component="h2">
          {data.title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Description
        </Typography>
        <Typography  component="p">
          {data.description}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Start Date
        </Typography>
        <Typography  component="p">
            {startdate.toLocaleDateString()}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          End Date
        </Typography>
        <Typography  component="p">
            {enddate.toLocaleDateString()}
        </Typography>
      </CardContent>
      </Card>
        {editflag && (
          <>
         
        <IconButton aria-label="edit" className={classes.margin} onClick={handleProjectDialogOpen}>
          <CreateIcon />
        </IconButton>
        </>
        )}

        <ProjectCardDialog open={projectOpen} onClose={handleProjectDialogClose} changeflag={changeflag} setChangeflag={setChangeflag} data={data}/>

        
    </Paper>
    </>
  );
}
