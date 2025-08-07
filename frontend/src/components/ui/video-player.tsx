"use client";

import React from "react";

import ReactPlayer from "react-player";

export default function VideoPlayer() {
	return (
		<ReactPlayer
			url={
				"https://media.istockphoto.com/id/2156675608/video/hispanic-latin-american-couple-software-engineer-developer-use-computer-work-on-program.mp4?s=mp4-640x640-is&k=20&c=CHzdhPE9Y2wEdr0zqltlfhgLpGB9AU1mGnuo0AU91jk="
			}
			style={{ borderRadius: "20px" }}
			height={"100%"}
			width={"100%"}
			controls={true}
		/>
	);
}
