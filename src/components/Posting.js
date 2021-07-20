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
		margin: theme.spacing(3),
		display: "flex",
		justifyContent: "center",
	},
	dialog: {
		padding: 0,
	},
}));

function Posting(props) {
  const {
    user,
    API,
    mutations
  } = props;
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [disable, setDisable] = useState(true);
  const [image, setImage] = useState("");

	const classes = useStyles();

	const obj = {};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<Button variant="contained" color="primary" onClick={handleClickOpen} size="large">
				New Post
			</Button>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
            accept="image/jpeg"
            className={classes.input}
            style={{ display: 'none' }}
            id="upload-image"
            type="file"
            onChange={async (e) => {
              const reader = new FileReader();

              reader.addEventListener("load", function () {
                console.log(reader.result)
                setImage(reader.result)
              }, false);

              if (e.target.files[0]) {
                reader.readAsDataURL(e.target.files[0]);
              }
            }}
          />
          <label htmlFor="upload-image">
            <Button color="primary" component="span" >
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
					<Button
						color="primary"
						disabled={disable}
						onClick={async () => {
							handleClose();
							setDisable(true);
							obj["userID"] = String(user.id);
							obj["type"] = "post";
							obj["title"] = title;
							obj["text"] = text;
							obj["city"] = user.current_city;
							obj["country"] = user.current_country;
							obj["dateTime"] = String(new Date().getTime());
              obj["image"] = image

							setTitle("");
							setText("");
							const response = await API.graphql({
								query: mutations.createPost,
								variables: { input: obj },
							});
							console.log(response);
							console.log(obj);
							console.log(user);
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
