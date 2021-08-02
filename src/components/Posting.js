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

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
    display: "flex",
    justifyContent: "center",
  },
  dialog: {
    padding: 0,
    [theme.breakpoints.up("lg")]: {
      marginLeft: drawerWidth,
    },
  },
}));

function Posting(props) {
  const { user, API, mutations } = props;
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [disable, setDisable] = useState(true);
  const [image, setImage] = useState({});
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
    setDisable(true);
    
    try {
      let imageURL = "", imageKey = "";
      console.log("image object before conditional");
      console.log(image)
      if (image.fileName && image.file) {
        console.log('image exists');
        console.log("before putting the image")
        const putResponse = await Storage.put(image.fileName, image.file);
        console.log("putResponse from put");
        console.log(putResponse)
        console.log("before getting the image URL")
        const getURLResponse = await Storage.get(putResponse.key);
        console.log('getURLResponse');
        console.log(getURLResponse)
        // setImageKey(putResponse.key);
        imageKey = putResponse.key;
        // setImageURL(getURLResponse);
        imageURL = getURLResponse;
      }
      console.log("imageKey before postData");
      console.log(imageKey);
      console.log("imageURL before postData")
      console.log(imageURL)
      const postData = {
        userID: String(user.id),
        type: "post",
        title: title,
        text: text,
        city: user.current_city,
        country: user.current_country,
        home_country: user.home_country,
        imageKey: imageKey,
        imageURL: imageURL,
      };
      console.log("before posting")
      await API.graphql({
        query: mutations.createPost,
        variables: { input: postData },
      });
      console.log("after posting")
      setTitle("");
      setText("");
      handleClose();
      setImage({});
      setDisable(false);
    } catch (error) {
      setTitle("");
      setText("");
      handleClose();
      setImage({});
      setDisable(false);
      console.error(error.message);
    }
  };

  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary" onClick={handleClickOpen} size="large">
        New Post
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className={classes.dialog}>
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
              shrink: true,
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
              shrink: true,
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
              if (e.target.files[0]) {
                const file = e.target.files[0];
                const fileName = `${user.id}_${new Date().getTime()}_${file.name}`;
                setImage({ file: file, fileName: fileName });
                console.log("File after selecting image")
                console.log(file)
                console.log("fileName after selecting image")
                console.log(fileName);
                // const putResponse = await Storage.put(fileName, file);
                // console.log("putResponse from put");
                // console.log(putResponse)
                // const getResponse = await Storage.get(putResponse.key);
                // console.log('getResponse');
                // console.log(getResponse)
                // setImageKey(putResponse.key);
                // setImageURL(getResponse);
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
            Add Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Posting;
