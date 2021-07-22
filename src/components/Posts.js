import React from "react";
import Post from "./Post";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		marginTop: 20,
	},
}));

function Posts (props) {
	const classes = useStyles();

	const { filter, posts, user } = props;

	console.log(posts);

	return (
		<div className={classes.container}>
			{posts
				.filter((postData) => (filter.home ? filter.home === postData.home_country : true))
				.filter((postData) => (filter.targetCountry ? filter.targetCountry === postData.country : true))
				.filter((postData) => (filter.targetCity ? filter.targetCity === postData.city : true))
				.map((postData) => <Post postData={postData} user={user} />)
				.reverse()}
		</div>
	);
}

export default Posts;
