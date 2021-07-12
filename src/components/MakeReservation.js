import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

import AlertDialog from "./AlertDialog";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));

function MakeReservation(props) {
  const { user } = props;
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("2021-07-29");
  const [time, setTime] = useState("12:00");

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Reservation
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">MakeReservation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you wish to chat, please enter your name and room name below.
          </DialogContentText>
          <form className={classes.container} noValidate>
            <TextField
              id="date"
              label="Reservation Date"
              type="date"
              defaultValue="2021-07-29"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              onChange={(event) => setDate(event.target.value)}
            />
          </form>
          <form className={classes.container} noValidate>
            <TextField
              id="time"
              label="Alarm clock"
              type="time"
              defaultValue="12:00"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{
                step: 300 // 5 min
              }}
              onChange={(event) => setTime(event.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <AlertDialog setOpen={setOpen} />
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MakeReservation;
