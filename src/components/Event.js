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
  const [events, setEvents] = useState([]);

  useEffect(async () => {
    try {
      const allEvents = (
        await API.graphql({
          query: queries.listEvents
        })
      ).data.listEvents.items;
      allEvents.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      setEvents(allEvents);
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
      <EventPosts filter={filter} events={events} user={user} />
    </div>
  );
}

export default Event;
