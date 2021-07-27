import React, { useState, useEffect } from "react";
import MakeEventReservation from "./MakeEventReservation";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import CheckoutForm from "./CheckoutForm";


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
  const { eventData, user } = props;
  const [open, setOpen] = useState(false);
  const reservationData = {
    price: eventData.price,
    stripeAccount: eventData.user.stripeAccount,
    id: eventData.reservationID
  };
  const handleClickOpen = () => {
    console.log("handleClickOpen open (should be false)")
    console.log(open)
    setOpen(true);
  };
  const handleClose = () => {
    console.log("handleClickClose open (should be true)")
    console.log(open)
    setOpen(false);
  };
  const attendEvent = async (reservationID) => {
    console.log('attending')
    const newAttendingUser = await API.graphql({
      query: mutations.createAttendingUsers,
      variables: {
        input: {
          reservationID: reservationID,
          userID: user.id,
          seen: false
        }
      }
    });
    console.log("new attending user data");
    console.log(newAttendingUser)
  }
  console.log("event data")
  console.log(eventData)

  // useEffect(() => {
  //   reservationData.price = eventData.price;
  //   reservationData.stripeAccount = eventData.user.stripeAccount;
  //   reservationData.id = eventData.reservationID;
  // }, []);

  return (
    <div className={classes.container}>
      <Card className={classes.post}>
        <CardContent className={classes.area}>
          <CardActionArea className={classes.area}>
            {user && eventData.tellerID === user.id ? (
              <div>
                <Avatar
                  aria-label="avatar"
                  src={eventData.user.avatarURL}
                ></Avatar>
              </div>
            ) : (
              <div className={classes.avatar}>
                <Avatar
                  aria-label="avatar"
                  src={eventData.user.avatarURL}
                ></Avatar>
                  {/* // ? <MakeEventReservation teller={eventData.user} user={user} /> */}
                  {/* // ? <MakeEventReservation teller={eventData.user} user={user} eventData={eventData} /> */}
                {user.id !== eventData.userID && Number(eventData.startDateTime) > new Date().getTime()
                  ? (
                    <div>
                      <CardActions>
                        <Button
                          size="small"
                          variant="outlined"
                          color="primary"
                          onClick={handleClickOpen}
                        >
                          Attend Event
                        </Button>

                        <Dialog
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="form-dialog-title"
                          fullWidth="true"
                        >
                          <DialogTitle id="form-dialog-title">Payment</DialogTitle>
                          <DialogContent>
                            <CheckoutForm
                              user={user}
                              confirmReservation={attendEvent}
                              reservation={reservationData}
                            />
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose} color="primary">
                              Close
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </CardActions>
                    </div>
                  )
                  : <></>
                }

              </div>
            )}
            <CardContent className={classes.container}>
              <Typography gutterBottom variant="h5" component="h3" align="left">
                {eventData.title}
              </Typography>
              {eventData.imageURL ? (
                <CardMedia
                  className={classes.media}
                  component="img"
                  src={eventData.imageURL}
                  title={eventData.title}
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
                {eventData.text}
              </Typography>
            </CardContent>
          </CardActionArea>
        </CardContent>
      </Card>
    </div>
  );
}

export default EventPost;
