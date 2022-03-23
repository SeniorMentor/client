import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom'

import Fab from '@mui/material/Fab';
import CreateIcon from '@mui/icons-material/Create';
import {Grid} from '@mui/material'
import { makeStyles } from '@mui/styles';

import { clientGet } from '../../utils/apiClient';
import { PostForm, PostWall, ActivityCard, EventsCard } from '../../components'
import { postApi } from '../../utils/apis';

const useStyles = makeStyles((theme) => ({
    leftContainer:{
      [theme.breakpoints.down('xl')]: {
        display:"none"
      },
    },
    rightContainer:{
      // position:"fixed",
      [theme.breakpoints.down('lg')]: {
        display:"none"
      },
    },
    shortcut:{
      position:"fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
          display:"none"
        },
  }

}))

export default function Home() {
  const classes = useStyles();
  const [posts,setPosts] = useState([])
  const [postCounter,setPostCounter]=useState(0);

  useEffect(() => {
    clientGet(postApi.getAll())
    .then((response)=>{
      var res=response.data
      setPosts(res)
    })
    .catch((err)=>{
      console.log(err);
    })
  }, [postCounter])


  return (
    <div>
        <Grid container direction="row" justifyContent="space-around" spacing={3}>
          <Grid item className={classes.rightContainer} md={4} lg={2}>
            <ActivityCard />
          </Grid>
          <Grid item xs={12} md={8} lg={6}>
              <Grid container direction="column" spacing={3}>
                  <Grid item>
                    <PostForm postCounter={postCounter} setPostCounter={setPostCounter} />
                  </Grid>
                <PostWall posts={posts} />
              </Grid>
          </Grid>
          <Grid item className={classes.rightContainer} md={4} lg={3}>
            <EventsCard />
          </Grid>
        </Grid> 
        <Link to="/createPost">
          <Fab className={classes.shortcut} color="primary" aria-label="add">
            <CreateIcon />
          </Fab>
        </Link>
      </div>
  );
}
