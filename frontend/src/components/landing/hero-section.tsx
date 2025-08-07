"use client";
import React from "react";
import Container from "../shared/Container";
import Image from "next/image";
import ideaIcon from "../../assets/idea-icon.svg";
import abstractLine from "../../assets/abstract-line.svg";
import { Button } from "../ui/button";

import { useRouter } from "next/navigation";

export default function HeroSection() {
	const router = useRouter();
	const gotoCoursePage = () => {
		router.push("/courses");
	};
	return (
		<Container className=" space-y-14 h-[calc(100vh-200px)] flex items-center justify-center">
			<div
				className="w-full max-w-[950px] mx-auto text-center relative"
				data-aos="zoom-in"
			>
				<Image
					src={abstractLine}
					height={30}
					width={30}
					alt="abstract-line"
					className="size-10 absolute -top-6 left-0 md:left-16 md:-top-6"
				/>
				<h1 className="inline-flex items-center gap-x-2 md:gap-x-5 text-xl sm:text-4xl md:text-5xl">
					<span>
						<Image
							src={ideaIcon}
							height={20}
							width={20}
							alt="idea-icon"
							className="size-16 bg-orange-shade-95"
						/>
					</span>
					<span className="text-primary">Unlock</span>
					Your Creative Potential
				</h1>

				<p className="font-medium text-[24px] px-8 md:px-0 md:text-[38px] mt-7 flex flex-col">
					with Online Design and Development Courses.
					<span className=" font-normal text-[14px] md:text-base text-gray-shade-15">
						Learn from Industry Experts and Enhance Your Skills.
					</span>
				</p>

				<div className="flex justify-center  mt-10">
					<Button onClick={gotoCoursePage}>Explore Courses</Button>
				</div>
			</div>
		</Container>
	);
}
