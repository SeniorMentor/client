import React from 'react';

import {Grid} from '@mui/material'

import PostCard from '../PostCard/PostCard'

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
