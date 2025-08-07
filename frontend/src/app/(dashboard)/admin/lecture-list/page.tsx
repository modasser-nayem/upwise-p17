import DashboardTableHeading from "@/components/shared/dashboard-table-heading";
import LectureTable from "./lecture-table";

export default function LectureList() {
	return (
		<div className="space-y-5">
			<DashboardTableHeading
				title="All Lectures"
				linkName="Create Lecture"
				href="/admin/create-lecture"
			/>
			<LectureTable />
		</div>
	);
}
