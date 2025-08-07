import React from "react";
import AssignedCourseList from "./assigned-course-list";

export default function InstructorPage() {
	return (
		<div>
			<div className="mt-5">
				<h4>Here is a short overview </h4>
				<p className="text-gray-shade-40">
					You will see here a list of course that you have been
					assigned by admins as an instructor
				</p>
			</div>

			<div className="mt-5">
				<h4>Assigned Courses</h4>
				<AssignedCourseList />
			</div>
		</div>
	);
}
