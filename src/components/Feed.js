import React, { useState, useEffect } from "react";
import Posts from "./Posts";
import Input from "./Input";
import Posting from "./Posting";

function Feed(props) {
  const {
    user, 
    API,
    queries,
    mutations
  } = props;
  const [filter, setFilter] = useState({});
  const [posts, setPosts] = useState([]);
  console.log('user in feed')
  console.log(user)

  useEffect(async () => {
    const response = await API.graphql({
      query: queries.listPosts
    })
    console.log("response in feed")
    console.log(response)
    setPosts(response.data.listPosts.items)
  }, [])

  return (
    <div className="Feed">
      {/* <h1>Feed</h1> */}
      <div className="filter">
        {/* <h2>Filter</h2> */}
        {/* <Posting user={user} /> */}
        {user && user.isTeller ? <Posting user={user} API={API} mutations={mutations} /> : <div></div>}
      </div>
      <Posts filter={filter} posts={posts} user={user}/>
      {/* <Input /> */}
    </div>
  );
}

export default Feed;
