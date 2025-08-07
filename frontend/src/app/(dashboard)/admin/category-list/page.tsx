import React from "react";
import CategoryTable from "./category-table";
import DashboardTableHeading from "@/components/shared/dashboard-table-heading";

export default function CategoryList() {
	return (
		<div>
			<DashboardTableHeading
				title="All Categories"
				linkName="Create Category"
				href="/admin/create-category"
			/>

			<CategoryTable />
		</div>
	);
}
