import Container from "@/components/shared/Container";
import PageHeading from "@/components/shared/page-heading";
import { achievements, ourGoals } from "@/dummy-data/about-us";
import { aboutUs } from "@/dummy-data/page-heading";

import React from "react";

export default function AboutPage() {
	return (
		<Container>
			<PageHeading data={aboutUs} />

			{/* achievement */}
			<div className="mt-10 md:mt-16">
				<h2 className="font-medium text-gray-shade-20">Achievements</h2>
				<p className="text-gray-shade-35 md:text-lg mt-2 text-sm">
					Our commitment to excellence has led us to achieve
					significant milestones along our journey. Here are some of
					our notable achievements
				</p>

				<div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
					{achievements.map((ach, index) => (
						<div
							key={ach.title}
							className="bg-white rounded-md p-12"
							data-aos="fade-up"
							data-aos-delay={index * 40}
						>
							<div className="bg-orange-shade-90 size-14 stroke-orange-shade-97 flex items-center justify-center rounded-md">
								<ach.icon size={32} color="orange" />
							</div>

							<p className="text-lg md:text-xl font-medium text-gray-shade-15 mt-3 mb-2">
								{ach.title}
							</p>
							<p className="text-gray-shade-35 text-sm md:text-base">
								{ach.subtitle}
							</p>
						</div>
					))}
				</div>
			</div>
			<div className="mt-10 md:mt-16">
				<h2 className="font-medium text-gray-shade-20">Our Goals</h2>
				<p className="text-gray-shade-35 text-sm md:text-lg md:pr-8 lg:pr-20 mt-2">
					At SkillBridge, our goal is to empower individuals from all
					backgrounds to thrive in the world of design and
					development. We believe that education should be accessible
					and transformative, enabling learners to pursue their
					passions and make a meaningful impact. Through our carefully
					crafted courses, we aim to
				</p>

				<div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
					{ourGoals.map((goal, index) => (
						<div
							key={goal.title}
							className="bg-white rounded-md p-12"
							data-aos="fade-up"
							data-aos-delay={index * 40}
						>
							<div className="bg-orange-shade-90 size-14 stroke-orange-shade-97 flex items-center justify-center rounded-md">
								<goal.icon size={32} color="orange" />
							</div>

							<p className="text-lg md:text-xl font-medium text-gray-shade-15 mt-3 mb-2">
								{goal.title}
							</p>
							<p className="text-gray-shade-35 text-sm md:text-base">
								{goal.subtitle}
							</p>
						</div>
					))}
				</div>
			</div>
		</Container>
	);
}
