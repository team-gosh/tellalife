import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';

function Posts(props) {
  const {
    filter,
  } = props;
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    // const matchingPosts = (await axios.get(.....)).data
    // setPosts(matchingPosts);
  }, []);

  return createPosts() 

  function createPosts() {
    // return posts
    // .map(data => <Post data={data} />)
    return <Post />
  }
}

export default Posts;