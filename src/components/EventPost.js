import React from "react";
import MakeReservation from "./MakeReservation";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20
  },
  post: {
    width: 300,
    minHeight: 200,
    display: "flex",
    alignItems: "flex-start",
    [theme.breakpoints.up("md")]: {
      width: 800,
      minHeight: 300,
      marginTop: 50
    }
  },
  avatar: {
    display: "flex",
    justifyContent: "space-between"
  },
  area: {
    width: "100%"
  }
}));

function EventPost(props) {
  const classes = useStyles();
  const { postData, user } = props;

  return (
    <div className={classes.container}>
      <Card className={classes.post}>
        <CardContent className={classes.area}>
          <CardActionArea className={classes.area}>
            {user && postData.userID === user.id ? (
              <div>
                <Avatar
                  aria-label="avatar"
                  src={postData.user.avatarURL}
                ></Avatar>
              </div>
            ) : (
              <div className={classes.avatar}>
                <Avatar
                  aria-label="avatar"
                  src={postData.user.avatarURL}
                ></Avatar>
                <MakeReservation teller={postData.user} user={user} />
              </div>
            )}
            <CardContent className={classes.container}>
              <Typography gutterBottom variant="h5" component="h3" align="left">
                {postData.title}
              </Typography>
              {postData.imageURL ? (
                <CardMedia
                  className={classes.media}
                  component="img"
                  src={postData.imageURL}
                  title={postData.title}
                />
              ) : (
                <></>
              )}
              <Typography
                variant="body2"
                color="textSecondary"
                variant="body1"
                align="left"
              >
                {postData.text}
              </Typography>
            </CardContent>
          </CardActionArea>
        </CardContent>
      </Card>
    </div>
  );
}

export default EventPost;