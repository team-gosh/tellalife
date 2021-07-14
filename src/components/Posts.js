import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		marginTop: 20,
		marginLeft: 45,
	},

}));

function Posts (props) {
	const classes = useStyles();

	const { filter, posts, user } = props;
	// const [posts, setPosts] = useState([]);

	useEffect(async () => {
		// const matchingPosts = (await axios.get(.....)).data
		// setPosts(matchingPosts);
	}, []);

	return (
		<div className={classes.container}>
			{posts.map((postData) => <Post postData={postData} user={user} />)}
		</div>
	);

	// function createPosts() {
	//   return posts
	//   .map(data => <Post data={data} />)
	//   // return <Post />
	// }
}

export default Posts;
