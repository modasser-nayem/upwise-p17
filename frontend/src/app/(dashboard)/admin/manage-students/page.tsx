import React from "react";
import StudentTable from "./student-table";

export default function ManageStudentsPage() {
	return (
		<div className="space-y-5">
			<h4> Users List</h4>
			<StudentTable />
		</div>
	);
}
