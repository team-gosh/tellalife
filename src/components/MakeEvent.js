import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

import { makeStyles } from "@material-ui/core/styles";

import ReservationSubmission from "./ReservationSubmission";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  reservation: {
    marginTop: 5,
    marginRight: 5,
    textAlign: "right"
  }
}));

function MakeEvent(props) {
  const { teller, user } = props;
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [disable, setDisable] = useState(true);

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDate("");
    setDuration("");
    setDisable(true);
  };

  return (
    <div className={classes.reservation}>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Reservation
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Make Reservation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you want to chat, please enter your preferred time
          </DialogContentText>
          <form className={classes.container} noValidate>
            <TextField
              id="datetime-local"
              label="Desired time"
              type="datetime-local"
              defaultValue=""
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              onChange={(event) => {
                const millisecond = new Date(
                  Number(event.target.value.slice(0, 4)),
                  Number(event.target.value.slice(5, 7) - 1),
                  Number(event.target.value.slice(8, 10)),
                  Number(event.target.value.slice(11, 13)),
                  Number(event.target.value.slice(14))
                ).getTime();
                if (millisecond - new Date().getTime() > 0) {
                  setDate(millisecond);
                  if (duration.length > 0) setDisable(false);
                } else {
                  setDate("");
                  setDisable(true);
                }
              }}
            />
            <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor="duration">
                Duration
              </InputLabel>
              <NativeSelect
                value={duration}
                onChange={(event) => {
                  setDuration(event.target.value);
                  if (date) setDisable(false);
                }}
                inputProps={{
                  name: "duration",
                  id: "duration"
                }}
              >
                <option value="">None</option>
                <option value={30}>30 min</option>
                <option value={60}>60 min</option>
                <option value={90}>90 min</option>
                <option value={120}>120 min</option>
                <option value={150}>150 min</option>
                <option value={180}>180 min</option>
                <option value={210}>210 min</option>
                <option value={240}>240 min</option>
              </NativeSelect>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <ReservationSubmission
            setOpen={setOpen}
            teller={teller}
            date={date}
            setDate={setDate}
            user={user}
            duration={duration}
            setDuration={setDuration}
            disable={disable}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MakeEvent;
