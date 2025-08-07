import { howItWorks } from "@/dummy-data/how-it-works";
import React from "react";
import { Button } from "../ui/button";
import Container from "../shared/Container";

export default function HowItWorks() {
	return (
		<Container className="py-10 space-y-8">
			<div className="space-y-5">
				<h3 className="relative max-w-fit ornament">How it works?</h3>
				<p className="text-gray-shade-30">
					Discover how EduSphere helps you learn smarter. <br /> From
					finding the right course to earning a certificate — it's
					simple, fast, and rewarding.
				</p>
			</div>
			<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
				{howItWorks.map((item) => (
					<div
						key={item.step}
						className="flex flex-col gap-y-4 p-10 rounded-md bg-white-shade-99 shadow-md group"
					>
						<div className="size-20 p-3 bg-white rounded group-hover:bg-primary">
							<item.icon
								size={48}
								className="text-primary group-hover:text-white"
							/>
						</div>
						<h5>{item.title}</h5>
						<p className="text-sm text-gray-500">
							{item.description}
						</p>
					</div>
				))}
			</div>
		</Container>
	);
}
