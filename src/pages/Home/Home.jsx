import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom'

import Fab from '@mui/material/Fab';
import CreateIcon from '@mui/icons-material/Create';
import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles';

import { clientGet } from '../../utils/apiClient';
import { PostForm, PostWall, ActivityCard, EventsCard, Filter } from '../../components'
import { postApi,eventsApi } from '../../utils/apis';
import { colors } from '../../utils/constants'

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
  const [posts, setPosts] = useState([])
  const [events,setEvents] = useState([])
  const [postCounter,setPostCounter]=useState(0);

  // Filters
  const [college, setCollege] = useState(null);
  const [tag, setTag] = useState(null);

  const applyFilter = async () => {
    if(!tag && !college){
      return;
    }
    const posts = await getPosts();
    setPosts(posts);
  }

  const getPosts = async () => {
    return new Promise((resolve, reject)=>{
      clientGet(postApi.getAll(),{
        params: { college, tag }
      },true)
        .then((response) => resolve(response.data))
        .catch((err) => reject(err));
    })
  };

  useEffect(() => {
    clientGet(postApi.getAll())
    .then((response)=>{
      var res=response.data
      setPosts(res)
    })
    .catch((err)=>{
      console.log(err);
    })

    clientGet(eventsApi.events())
      .then((response) => {
        console.log(response)
        setEvents(response.data)
      })
      .catch((err) => {
      console.log(err)
    })
  }, [postCounter])


  return (
    <div>
        <Grid container direction="row" justifyContent="space-around" spacing={3} style={{background: colors.primaryLight}}>
          <Grid item className={classes.rightContainer} md={4} lg={2}>
            <Filter setCollege={setCollege} setTag={setTag} applyFilter={applyFilter}/>
          </Grid>
          <Grid item xs={12} md={8} lg={6}>
              <Grid container direction="column" spacing={3}>
                  <Grid item>
                    <PostForm setPostCounter={setPostCounter} />
                  </Grid>
                <PostWall posts={posts}/>
              </Grid>
          </Grid>
          <Grid item className={classes.rightContainer} md={4} lg={3}>
            <EventsCard events={events} />
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
