import React, { useState, useEffect } from "react";
import MakeReservation from "./MakeReservation";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  post: {
    marginTop: 50,
    maxWidth: 500,
    alignSelf: "center",
    textAlign: "left"
  }
}));

function Post(props) {
  const classes = useStyles();

  const { postData, user } = props;

  return (
    // <div className={classes.post}>
    // 	<h3>{postData.title}</h3>
    // 	<p>{postData.text}</p>
    // 	{user && postData.userID === user.id ? <div /> : <MakeReservation teller={postData.user} user={user} />}
    // </div>
    <div>
      <Card className={classes.post}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h3">
              {postData.title}
            </Typography>
            {postData.image
              ? <CardMedia
                  className={classes.media}
                  component="img"
                  src={postData.image}
                  title={postData.title}
                />
              : <></>
            }
            <Typography variant="body2" color="textSecondary" component="p">
              {postData.text}
            </Typography>
          </CardContent>
        </CardActionArea>
        {user && postData.userID === user.id ? (
          <div />
        ) : (
          <MakeReservation
            className={classes.reservationButton}
            teller={postData.user}
            user={user}
          />
        )}
      </Card>
    </div>
  );
}

export default Post;
