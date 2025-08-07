"use client";

import React from "react";
import Container from "../shared/Container";
import SectionTitle from "../shared/Section-Title";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { useAllReviewsQuery } from "@/redux/api/reviewApi";
import AppLoading from "@/app/loading";
const data = {
	title: "Our Testimonials",
	description:
		"Hear from the learners who turned their goals into success stories. Our students come from diverse backgrounds—many with no prior experience—and have gone on to land jobs, launch freelance careers, and build confidence in their skills.",
	link: "/testimonials",
};

export default function Testimonials() {
	const { data: acceptedReviews, isLoading } = useAllReviewsQuery({
		isAccepted: "true",
	});
	console.log(acceptedReviews);

	if (isLoading) return <AppLoading />;
	return (
		<Container className="py-20">
			<SectionTitle data={data} />

			<Carousel className="mt-8 w-[300px] md:w-[560px] lg:w-[900px] xl:w-full mx-auto">
				<CarouselContent>
					{acceptedReviews?.result?.map((review) => (
						<CarouselItem
							className="md:basis-1/1 lg:basis-1/3"
							key={review._id}
						>
							<blockquote className="bg-white p-6 rounded-xl shadow-md">
								<p className="italic">
									<q>{review.message}</q>
								</p>
								<footer className="mt-4 font-semibold">
									— {review.student.name}
								</footer>
							</blockquote>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</Container>
	);
}
