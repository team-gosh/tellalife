import React, { useState, useEffect } from "react";

function Post (props) {
	const { data } = props;

	return (
		<div>
			<h4>This is a post</h4>

			<object
				data="https://www.travelblog.org/Asia/Indonesia/Java/Bogor/blog-1060719.html"
				width="500"
				height="300"
			>
				利用できません。
			</object>
		</div>
	);
}

export default Post;
