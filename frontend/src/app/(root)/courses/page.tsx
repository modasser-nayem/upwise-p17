import React from "react";

import CourseList from "./course-list";
import Container from "@/components/shared/Container";

export default async function CoursePage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string }>;
}) {
	const value = (await searchParams).search;

	return (
		<Container className="space-y-10">
			<h3 className="mt-10 text-gray-shade-15 font-semibold">
				All Courses
			</h3>

			<CourseList searchValue={value} />
		</Container>
	);
}
