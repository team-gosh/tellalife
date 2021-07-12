import React, { useState, useEffect } from "react";
import Posts from "./Posts";
import Input from "./Input";

function Feed(props) {
  const { user } = props;
  const [filter, setFilter] = useState({});

  return (
    <div className="Feed">
      {/* <h1>Feed</h1> */}
      <div className="filter">
        <h2>Filter</h2>
      </div>
      {/* <Posts filter={filter} /> */}
      <Input />
    </div>
  );
}

export default Feed;
