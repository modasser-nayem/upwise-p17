import React from "react";
import Container from "../shared/Container";

import { benefits } from "@/dummy-data/benefit";
import SectionTitle from "../shared/Section-Title";
const data = {
	title: "Benefits",
	description:
		"Our platform is designed to help you build real skills that lead to real opportunities. With a focus on hands-on learning, you’ll work on practical projects that strengthen your portfolio and prepare you for real-world challenges.",
	link: "/benefits",
};
export default function Benefits() {
	return (
		<Container className="py-20">
			<SectionTitle data={data} />
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-20">
				{benefits.map((item, index) => (
					<div
						key={item.index}
						className="rounded-md p-10 bg-white hover:shadow"
						data-aos="fade-up"
						data-aos-delay={index * 40}
					>
						<p className="text-right font-bold text-orange-shade-90 text-7xl">
							{item.index}
						</p>

						<p className="text-2xl font-semibold mt-8 mb-1">
							{item.title}
						</p>

						<p className="text-lg text-gray-shade-30">
							{item.subTitle}
						</p>
					</div>
				))}
			</div>
		</Container>
	);
}
