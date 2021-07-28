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
import axios from "axios";

import CircularProgress from "@material-ui/core/CircularProgress";
import Airplane from "../airplane_blue.png";



import moment from "moment";
moment().format();





const useStyles = makeStyles((theme) => ({
  container: {
    width: 300,
    minHeight: 200,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
    [theme.breakpoints.up("md")]: {
      width: 800,
      minHeight: 300,
      marginTop: 50
    }

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
  },
  submitButton: {
		display: "flex",
		justifyContent: "flex-end",
  },
  avatarContainer: {
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	avatarName: {
		color: "gray",
		color: "#28345a",
		marginLeft: 5,
	},
	date: {
		color: "gray",
		marginLeft: 5,
	},
	infoContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "flex-start",
  },
  flag: {
		fontSize: 20,
		[theme.breakpoints.up("md")]: {
			fontSize: 35,
		},
	},
  icon: {
		marginLeft: 2,
		marginRight: 2,
		height: 20,
		weight: 20,
		[theme.breakpoints.up("md")]: {
			height: 30,
			weight: 30,
		},
  },
  flagContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
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
  const [ uniHomeFlag, setUniHomeFlag ] = useState("");
	const [ uniCountryFlag, setUniCountryFlag ] = useState("");
	const [ isLoading, setLoading ] = useState(true);


  useEffect(async () => {
		// get flags
		const homeFlag = await axios.post("https://countriesnow.space/api/v0.1/countries/flag/unicode", {
			country: eventData.home_country,
		});

		const currentFlag = await axios.post("https://countriesnow.space/api/v0.1/countries/flag/unicode", {
			country: eventData.country,
		});
		setUniHomeFlag(homeFlag.data.data.unicodeFlag);
		setUniCountryFlag(currentFlag.data.data.unicodeFlag);
		setLoading(false);
	}, []);

  const handleClickOpen = () => {
    console.log("handleClickOpen open (should be false)")
    setOpen(true);
    console.log(open)
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

            {user && eventData.tellerID === user.id ? (
              <div className={classes.avatarContainer}>
                <Avatar
                  aria-label="avatar"
                  src={eventData.user.avatarURL}
                ></Avatar>
                <div className={classes.infoContainer}>
							<span className={classes.avatarName}>{eventData.user.name}</span>
							<span className={classes.date}>{moment(eventData.createdAt).fromNow()}</span>
						</div>
              </div>
            ) : (
              <div className={classes.avatarContainer}>
                <Avatar
                  aria-label="avatar"
                  src={eventData.user.avatarURL}
                ></Avatar>
                <div className={classes.infoContainer}>
							<span className={classes.avatarName}>{eventData.user.name}</span>
							<span className={classes.date}>{moment(eventData.createdAt).fromNow()}</span>
						</div>
                

              </div>
            )}
            	{isLoading === true ? (
						<CircularProgress size={20} className={classes.circle} />
					) : (
						<div className={classes.flagContainer}>
							<span className={classes.flag}>{uniHomeFlag} </span>
							<span />
							--- <img src={Airplane} className={classes.icon} /> -->
							<span className={classes.flag}>{uniCountryFlag} </span>
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
            {user.id !== eventData.userID && Number(eventData.startDateTime) > new Date().getTime()
                  // ? <MakeEventReservation teller={eventData.user} user={user} />
                  // ? <MakeEventReservation teller={eventData.user} user={user} eventData={eventData} />
                  ? (
                    <div className={classes.submitButton}>
                        <Button
                          size="medium"
                          variant="contained"color="primary"
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
                              setOpen={setOpen}
                            />
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose} color="primary">
                              Close
                            </Button>
                          </DialogActions>
                        </Dialog>
                    </div>
                  )
                  : <></>
                }
        </CardContent>
      </Card>
    </div>
  );
}

export default EventPost;
