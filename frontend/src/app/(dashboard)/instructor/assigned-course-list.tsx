"use client";
import AppLoading from "@/app/loading";
import NoDataFound from "@/components/NoDataFound";
import { ESTable } from "@/components/shared/es-table";
import { useCourseByInstructorQuery } from "@/redux/api/courseApi";
export default function AssignedCourseList() {
	const { data: assignedCourses, isLoading } = useCourseByInstructorQuery();

	const columns = [
		{
			key: "title",
			label: "Title",
		},
		{
			key: "price",
			label: "Course Fee",
		},
		{
			key: "pricingType",
			label: "Pricing Type",
		},
		{
			key: "level",
			label: "Level",
		},
	];

	if (isLoading) return <AppLoading />;
	return (
		<div>
			{assignedCourses?.result.length ? (
				<ESTable
					columns={columns}
					data={assignedCourses?.result}
					rowKey={(course) => course._id}
				/>
			) : (
				<NoDataFound message="Admin have not assigned you any course yet" />
			)}
		</div>
	);
}
