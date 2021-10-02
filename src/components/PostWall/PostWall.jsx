import React from 'react';

import PostCard from '../PostCard/PostCard'
import {Grid,TextField} from '@mui/material'

export default function PostWall({posts}) {
  return (
    <>
    {posts.length!==0 && posts.map((post,index)=>(
        <Grid item key={index}>
          <PostCard key={index} post={post}/>
        </Grid>
      ))}
    </>
  );
}
