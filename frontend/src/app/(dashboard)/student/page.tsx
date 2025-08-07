import React from "react";
import MyEnrolledCourses from "./my-enrolled-course";

export default function StudentDashboard() {
	return (
		<div className="space-y-5">
			<h4>My enrolled courses lists</h4>

			<MyEnrolledCourses />
		</div>
	);
}
