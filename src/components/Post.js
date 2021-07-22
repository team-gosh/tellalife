import React from "react";
import MakeReservation from "./MakeReservation";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		marginTop: 20,
		marginBottom: 20,
	},
	post: {
		width: 300,
		minHeight: 200,
		display: "flex",
		alignItems: "flex-start",
		[theme.breakpoints.up("md")]: {
			width: 800,
			minHeight: 300,
			marginTop: 50,
		},
	},
}));

function Post (props) {
	const classes = useStyles();

	const { postData, user } = props;

	return (
		<div className={classes.container}>
			<Card className={classes.post}>
				<CardActionArea>
					{user && postData.userID === user.id 
            ? (
						  <span />
					  )
            : (
						  <MakeReservation teller={postData.user} user={user} />
					  )
          }
					<CardContent>
						<Typography gutterBottom variant="h5" component="h3" align="left">
							{postData.title}
						</Typography>
            {postData.imageURL
              ? <CardMedia
                  className={classes.media}
                  component="img"
                  src={postData.imageURL}
                  title={postData.title}
                />
              : <></>
            }
						<Typography variant="body2" color="textSecondary" variant="body1" align="left">
							{postData.text}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</div>
	);
}

export default Post;
