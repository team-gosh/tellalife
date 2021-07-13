import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";

export default function AlertDialog(props) {
  const { 
    setOpen,
    teller,
    date,
    user,
    duration
  } = props;
  const [dialog, setDialog] = useState(false);

  const handleClickOpen = async () => {
    setDialog(true);
    const newReservation = {
      duration: Number(duration),
      price: Number(duration) / 30 * Number(teller.price),
      startDateTime: String(date),
      status: "pending", 
      tellerID: teller.id,
      type: "pair",
      userIDs: user.id
    }
    const response = await API.graphql({
      query: mutations.createReservation,
      variables: {input: newReservation},
    });
    console.log(response)
  };

  const handleClose = () => {
    setDialog(false);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
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
