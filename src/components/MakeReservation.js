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
  const [data, setDate] = useState("");

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
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
                  Number(event.target.value.slice(5, 7)),
                  Number(event.target.value.slice(8, 10)),
                  Number(event.target.value.slice(11, 13)),
                  Number(event.target.value.slice(14))
                ).getTime();
                setDate(millisecond);
              }}
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
