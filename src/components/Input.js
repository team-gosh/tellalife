import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import MakeReservation from "./MakeReservation";
import faker from "faker";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: "auto"
  },
  media: {
    height: 345
  }
});

function Input() {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={faker.image.animals()}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {faker.lorem.sentence()}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {faker.lorem.text()}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <MakeReservation />
        </CardActions>
      </Card>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={faker.image.city()}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {faker.lorem.sentence()}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {faker.lorem.text()}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <MakeReservation />
        </CardActions>
      </Card>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={faker.image.nature()}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {faker.lorem.sentence()}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {faker.lorem.text()}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <MakeReservation />
        </CardActions>
      </Card>
    </div>
  );
}

export default Input;
