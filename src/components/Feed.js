import React, { useState, useEffect } from "react";
import Posts from "./Posts";
// import Input from "./Input"; // Faker code
import Posting from "./Posting";
import Filter from "./Filter";
import { makeStyles } from "@material-ui/core/styles";
import PostText from "../postText.png";

const useStyles = makeStyles((theme) => ({
	feed: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 20,
	},
	postText: {
		marginTop: 50,

		width: 100,
		height: 50,
		[theme.breakpoints.up("md")]: {
			width: 300,
			height: 80,
		},
	},
}));

function Feed (props) {
	const classes = useStyles();

	const { user, API, queries, mutations, countriesCitiesList, drawerWidth } = props;
	const [ filter, setFilter ] = useState({
		home: "",
		targetCountry: "",
		targetCity: "",
	});
	const [ posts, setPosts ] = useState([]);

	useEffect(async () => {
		try {
			const allPosts = (await API.graphql({
				query: queries.listPosts,
			})).data.listPosts.items;
			allPosts.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
			setPosts(allPosts);
		} catch (error) {
			console.error(error.message);
		}
	}, []);

	return (
		<div className={classes.feed}>
			<Filter countriesCitiesList={countriesCitiesList} setFilter={setFilter} />
			{/* <img src={PostText} className={classes.postText} /> */}
			{user && user.isTeller ? <Posting user={user} API={API} mutations={mutations} /> : <div />}

			<Posts filter={filter} posts={posts} user={user} />
		</div>
	);
}

export default Feed;
