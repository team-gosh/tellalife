import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

import { API } from "aws-amplify";
import * as mutations from "../graphql/mutations";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1)
  }
}));

export default function EventSubmission(props) {
  const {
    setOpen,
    teller,
    date,
    setDate,
    user,
    duration,
    setDuration,
    disable
  } = props;
  const [dialog, setDialog] = useState(false);

  const handleClickOpen = async () => {
    setDialog(true);
    const dataForNewReservation = {
      duration: Number(duration),
      price: (Number(duration) / 30) * Number(teller.price),
      startDateTime: String(date),
      status: "pending",
      tellerID: teller.id,
      tellerName: teller.name, // TODO changed to unique username
      type: "pair"
    };
    console.log("dataForNewReservation");
    console.log(dataForNewReservation);
    const newReservation = await API.graphql({
      query: mutations.createReservation,
      variables: { input: dataForNewReservation }
    });
    console.log(newReservation);
    //newReservation.data.createReservatoin.id is new reservation id
    const newAttendingListener = await API.graphql({
      query: mutations.createAttendingUsers,
      variables: {
        input: {
          reservationID: newReservation.data.createReservation.id,
          userID: user.id,
          seen: false
        }
      }
    });
    const newAttendingTeller = await API.graphql({
      query: mutations.createAttendingUsers,
      variables: {
        input: {
          reservationID: newReservation.data.createReservation.id,
          userID: teller.id,
          seen: false
        }
      }
    });
  };

  const classes = useStyles();

  const handleClose = () => {
    setDialog(false);
    setOpen(false);
    setDate("");
    setDuration("");
  };

  return (
    <div className={classes.dialog}>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={handleClose}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        color="primary"
        disabled={disable}
        onClick={handleClickOpen}
      >
        Submit
      </Button>
      <Dialog
        open={dialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Your reservation is complete!"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
