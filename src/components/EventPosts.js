import React from "react";
import EventPost from "./EventPost";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 20
  }
}));

function EventPosts(props) {
  const classes = useStyles();

  const { filter, events, user } = props;

  return (
    <div className={classes.container}>
      {events
        .filter((eventData) =>
          filter.home ? filter.home === eventData.user.home_country : true
        )
        .filter((eventData) =>
          filter.targetCountry
            ? filter.targetCountry === eventData.country
            : true
        )
        .filter((eventData) =>
          filter.targetCity ? filter.targetCity === eventData.city : true
        )
        .map((eventData) => <EventPost eventData={eventData} user={user} />)
        .reverse()}
    </div>
  );
}

export default EventPosts;
