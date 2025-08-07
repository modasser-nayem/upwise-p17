import React from "react";
import CourseTable from "./course-table";

import DashboardTableHeading from "@/components/shared/dashboard-table-heading";

export default function CourseListPage() {
	return (
		<div className=" space-y-5">
			<DashboardTableHeading
				title="All Courses"
				linkName="Create Course"
				href="/admin/create-course"
			/>
			<CourseTable />
		</div>
	);
}
