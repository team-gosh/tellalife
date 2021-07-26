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
import { Storage } from "aws-amplify";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
    display: "flex",
    justifyContent: "center"
  },
  dialog: {
    padding: 0
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    // marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));

function EventPosting(props) {
  const { user, API, mutations } = props;
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [disable, setDisable] = useState(true);
  const [image, setImage] = useState("");
  const [imageKey, setImageKey] = useState("");
  const [imageURL, setImageURL] = useState("");

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const uploadPost = async () => {
    handleClose();
    setDisable(true);
    const eventData = {
      userID: String(user.id),
      type: "event",
      title: title,
      text: text,
      city: user.current_city,
      country: user.current_country,
      home_country: user.home_country,
      startDateTime: date,
      duration: duration
      // dateTime: String(new Date().getTime()),
      // image: image
      // imageKey: imageKey,
      // imageURL: imageURL
    };
    console.log(eventData);
    setTitle("");
    setText("");
    setDate("");
    setDuration("");
    try {
      await API.graphql({
        query: mutations.createEvent,
        variables: { input: eventData }
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        size="large"
      >
        New Event
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Event Posting Screen</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the details of the event you will hold.
          </DialogContentText>
          <TextField
            id="filled-full-width-2"
            label="Title"
            placeholder="Title"
            fullWidth
            // margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            onChange={(event) => {
              setTitle(event.target.value);
              if (
                event.target.value.length > 0 &&
                text.length > 0 &&
                date &&
                duration.length > 0
              ) {
                setDisable(false);
              } else {
                setDisable(true);
              }
            }}
          />
          <TextField
            id="filled-full-width"
            label="Contents"
            multiline={true}
            rows="5"
            placeholder="Contents"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            onChange={(event) => {
              setText(event.target.value);
              if (
                title.length > 0 &&
                event.target.value.length > 0 &&
                date &&
                duration.length > 0
              ) {
                setDisable(false);
              } else {
                setDisable(true);
              }
            }}
          />
          <form className={classes.container} noValidate>
            <TextField
              id="datetime-local"
              label="Start time"
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
                  if (
                    title.length > 0 &&
                    text.length > 0 &&
                    duration.length > 0
                  )
                    setDisable(false);
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
                // value={100000}
                value={duration}
                onChange={(event) => {
                  console.log("title: ", title, title.length);
                  console.log("text: ", text, text.length);
                  console.log("date: ", date, String(date).length);
                  console.log("duration: ", event.target.value);
                  setDuration(event.target.value);
                  if (
                    title.length > 0 &&
                    text.length > 0 &&
                    date &&
                    duration.length > 0
                  )
                    setDisable(false);
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
          {/* <input
            accept="image/*"
            className={classes.input}
            style={{ display: "none" }}
            id="upload-image"
            type="file"
            onChange={async (e) => {
              // const reader = new FileReader();

              // reader.addEventListener("load", function () {
              //   console.log(reader.result)
              //   setImage(reader.result)
              // }, false);

              if (e.target.files[0]) {
                // reader.readAsDataURL(e.target.files[0]);
                const file = e.target.files[0];
                const fileName = `${user.id}_${new Date().getTime()}_${
                  file.name
                }`;
                const putResponse = await Storage.put(fileName, file);
                // console.log("putResponse from put");
                // console.log(putResponse)
                const getResponse = await Storage.get(putResponse.key);
                // console.log('getResponse');
                // console.log(getResponse)
                setImageKey(putResponse.key);
                setImageURL(getResponse);
              }
            }}
          />
          <label htmlFor="upload-image">
            <Button color="primary" component="span">
              Upload Image
            </Button>
          </label> */}
          <Button
            color="primary"
            onClick={() => {
              handleClose();
              setDisable(true);
              setTitle("");
              setText("");
              setDate("");
              setDuration("");
            }}
          >
            Cancel
          </Button>
          <Button color="primary" disabled={disable} onClick={uploadPost}>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EventPosting;
