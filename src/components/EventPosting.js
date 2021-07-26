import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
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
  }
}));

function EventPosting(props) {
  const { user, API, mutations } = props;
  const [open, setOpen] = useState(false);
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
    const postData = {
      userID: String(user.id),
      type: "post",
      title: title,
      text: text,
      city: user.current_city,
      country: user.current_country,
      home_country: user.home_country,
      imageKey: imageKey,
      imageURL: imageURL
    };
    setTitle("");
    setText("");
    try {
      await API.graphql({
        query: mutations.createPost,
        variables: { input: postData }
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
        New Post
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
            id="filled-full-width-2"
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
            multiline={true}
            rows="2"
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
          <input
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
          </label>
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
          <Button color="primary" disabled={disable} onClick={uploadPost}>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EventPosting;
