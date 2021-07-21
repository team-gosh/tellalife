import React, { useState, useEffect } from "react";
import Posts from "./Posts";
// import Input from "./Input"; // Faker code
import Posting from "./Posting";
import Filter from "./Filter";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	feed: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		marginTop: 20,
	},
}));

function Feed (props) {
	const classes = useStyles();

	const { user, API, queries, mutations, countriesCitiesList } = props;
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
      setPosts(allPosts);
    } catch (error) {
      console.error(error.message);
    }
	}, []);

	return (
		<div className={classes.feed}>
			<Filter countriesCitiesList={countriesCitiesList} setFilter={setFilter} />
			{user && user.isTeller ? <Posting user={user} API={API} mutations={mutations} /> : <div />}
			<Posts filter={filter} posts={posts} user={user} />
		</div>
	);
}

export default Feed;
