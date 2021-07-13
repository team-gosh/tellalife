import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';

function Posts(props) {
  const {
    filter,
    posts,
    user
  } = props;
  // const [posts, setPosts] = useState([]);

  useEffect(async () => {
    // const matchingPosts = (await axios.get(.....)).data
    // setPosts(matchingPosts);
  }, []);

  return (
    <div className='Posts'>
      {posts.map(postData => <Post postData={postData} user={user}/>)}
    </div>
  )

  // function createPosts() {
  //   return posts
  //   .map(data => <Post data={data} />)
  //   // return <Post />
  // }
}

export default Posts;
