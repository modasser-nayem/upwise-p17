"use client";

import AppLoading from "@/app/loading";
import CourseCard from "@/components/shared/course-card";
import { useAllCourseQuery } from "@/redux/api/courseApi";

import React from "react";
type CourseListProps = {
	searchValue: string;
};
export default function CourseList({ searchValue }: CourseListProps) {
	const { data: courses, isLoading } = useAllCourseQuery({
		search: searchValue,
	});

	if (isLoading) return <AppLoading />;
	return (
		<div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
			{!courses?.result.length && <p>No course found!</p>}
			{courses?.result?.map((course) => (
				<CourseCard course={course} key={course._id} />
			))}
		</div>
	);
}
