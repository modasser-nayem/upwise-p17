import AcceptedReview from "./accepted-review-table";
import ReviewTable from "./review-table";

export default function ReviewsPage() {
	return (
		<div className="space-y-8">
			<AcceptedReview />
			<ReviewTable />
		</div>
	);
}
