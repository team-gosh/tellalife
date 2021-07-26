import React, { useState, useEffect } from "react";
import EventPosts from "./EventPosts";
// import Input from "./Input"; // Faker code
import EventPosting from "./EventPosting";
import EventFilter from "./EventFilter";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  event: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 20
  }
}));

function Event(props) {
  const classes = useStyles();

  const { user, API, queries, mutations, countriesCitiesList } = props;
  const [filter, setFilter] = useState({
    home: "",
    targetCountry: "",
    targetCity: ""
  });
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    try {
      const allPosts = (
        await API.graphql({
          query: queries.listPosts
        })
      ).data.listPosts.items;
      setPosts(allPosts);
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  return (
    <div className={classes.event}>
      <div>This is Event Component</div>
      <EventFilter
        countriesCitiesList={countriesCitiesList}
        setFilter={setFilter}
      />
      {user && user.isTeller ? (
        <EventPosting user={user} API={API} mutations={mutations} />
      ) : (
        <div />
      )}
      <EventPosts filter={filter} posts={posts} user={user} />
    </div>
  );
}

export default Event;
