import React from "react";
import ModuleTable from "./module-table";
import DashboardTableHeading from "@/components/shared/dashboard-table-heading";

export default function ModuleList() {
	return (
		<div className="space-y-5">
			<DashboardTableHeading
				title="All Modules"
				linkName="Create Module"
				href="/admin/create-module"
			/>
			<ModuleTable />
		</div>
	);
}
