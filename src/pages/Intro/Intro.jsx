import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import sm_graphic_1 from "../../assets/img/sm_graphic_1.gif";

import { Grid, Avatar, Zoom, Typography, Box, Button } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';

const data = [
    'Connect with your peers',
    'Find similar students in college',
    'Discover new people',
    'Find your seniors'
];

const useStyles = makeStyles((theme) => ({
    root: {
      height: 180,
    },
    container: {
      display: 'flex',
    },
    button: {
      fontSize: "2rem",
      margin: theme.spacing(1),
      borderRadius: "5%"
    },
    heading :{ 
      ...theme.heading
    },
    subheading : {
      color: '#8a9afb',
      fontSize : "2rem"
    }
}));

  
export default function Intro() {
    const classes = useStyles();
    const [index,setIndex] = useState(0);
    const [phase,setPhase] = useState(false);

    useEffect(() => {
        console.log("called");
        const to = setTimeout(() => {
           console.log("in timeout func")
           setPhase(prev => !prev);
           setIndex(prev => ((prev+1) % data.length));
        }, 2000);
        return () => {
          console.log("cleared");
          clearTimeout(to);
        }
    },[index]);

    // Similar component : https://codesandbox.io/s/material-demo-forked-vcryv?file=/demo.js
    return (
      <Grid container height="100vh" width="100%">
        <Grid container direction="column" justifyContent="center" align="center" item xs={12} sm={6}  style={{background: "#1c1473"}}> 
            <Box height="50vh">
                <Box height="25vh" fontFamily="Nunito">
                  <Typography className={classes.heading}>
                      SENIORMENTOR
                  </Typography>
                  <Zoom in={phase} out={(!phase).toString()}>
                    <Typography className={classes.subheading}>
                      {phase && data[index]}
                    </Typography>
                  </Zoom>
                </Box>
                <Box height="25vh">
                  <Button m={3} component={Link} to={'/login'} variant="outlined" className={classes.button} style={{borderColor:'#8a9afb', color:'#8a9afb'}}>Login</Button>
                  <Button m={3} component={Link} to={'/register'} variant="contained" color="primary" className={classes.button}>Sign Up</Button>
                </Box>
            </Box>
        </Grid>
        <Grid item sm={6} style={{background: "#1c1473"}}>
        <Avatar variant="square" alt="logo" src={sm_graphic_1} style={{ width:"100%", height:"100vh", padding:"1px"}}/>
        </Grid>
      </Grid>
    )
}
