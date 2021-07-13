import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1)
  }
}));

function Posting(props) {
  const { user } = props;
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [disable, setDisable] = useState(true);

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Submit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Posting Screen</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter title and text here.
          </DialogContentText>
          <TextField
            id="filled-full-width"
            label="Title"
            placeholder="Title"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            onChange={(event) => {
              setTitle(event.target.value);
              if (event.target.value.length > 0 && text.length > 0) {
                setDisable(false);
              } else {
                setDisable(true);
              }
            }}
          />
          <TextField
            id="filled-full-width"
            label="Text"
            placeholder="Text"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            onChange={(event) => {
              setText(event.target.value);
              if (title.length > 0 && event.target.value.length > 0) {
                setDisable(false);
              } else {
                setDisable(true);
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => {
              handleClose();
              setDisable(true);
              setTitle("");
              setText("");
            }}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            disabled={disable}
            onClick={() => {
              handleClose();
              setDisable(true);
              setTitle("");
              setText("");
            }}
          >
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Posting;
