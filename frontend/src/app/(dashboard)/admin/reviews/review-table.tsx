"use client";

import { ESTable } from "@/components/shared/es-table";
import { Input } from "@/components/ui/input";
import {
	useAllReviewsQuery,
	useDeleteReviewMutation,
	useAcceptReviewMutation,
} from "@/redux/api/reviewApi";
import { TReviewResponse } from "@/types/review.types";
import { useState } from "react";
import { useDebounce } from "use-debounce";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import NoDataFound from "@/components/NoDataFound";
import AppLoading from "@/app/loading";
import Pagination from "@/components/Pagination";

export default function ReviewTable() {
	const [currentPage, setCurrentPage] = useState(1);
	const [order, setOrder] = useState("desc");
	const [search, setSearch] = useState("");
	const [value] = useDebounce(search, 1000);

	const [deleteReview, { isLoading: deleteLoading }] =
		useDeleteReviewMutation();
	const [acceptReview, { isLoading: acceptLoading }] =
		useAcceptReviewMutation();

	const { data: reviews, isLoading } = useAllReviewsQuery({
		sortBy: "rating",
		order: order,
		search: value,
		isAccepted: "false",
		page: currentPage.toString(),
	});

	const handleDelete = async (id: string) => {
		try {
			const res = await deleteReview(id).unwrap();
			if (res.success) {
				toast.success("Review deleted successfully");
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.log(error);
			toast.error(error?.data?.message || "Something went wrong!");
		}
	};
	const handleAccept = async (id: string) => {
		try {
			const res = await acceptReview(id).unwrap();
			if (res.success) {
				toast.success("Review accepted successfully");
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.log(error);
			toast.error(error?.data?.message || "Something went wrong!");
		}
	};

	const columns = [
		{
			key: "course.title",
			label: "Course Name",
			render: (review: TReviewResponse) => review?.course?.title,
		},

		{
			key: "student.name",
			label: "Student Name",
			render: (review: TReviewResponse) => review?.student?.name,
		},
		{
			key: "message",
			label: "Message",
			render: (review: TReviewResponse) =>
				review?.message.substring(0, 50),
		},
		{
			key: "rating",
			label: "Rating",
		},
		{
			key: "actions",
			label: "Action",
			className: "text-center",
			render: (review: TReviewResponse) => (
				<div className="flex flex-wrap items-center justify-between gap-2">
					<Button
						size={"sm"}
						onClick={() => handleAccept(review._id)}
						disabled={acceptLoading}
						variant={review?.isAccepted ? "outline" : "secondary"}
					>
						{review.isAccepted ? "✅Accepted" : "✖️Not Accepted"}
					</Button>
					<Button
						size={"sm"}
						variant={"destructive"}
						onClick={() => handleDelete(review._id)}
						className="border border-orange-shade-50 bg-orange-shade-97 text-orange-shade-50"
						disabled={deleteLoading}
					>
						<Trash />
						Delete
					</Button>
				</div>
			),
		},
	];

	if (isLoading) return <AppLoading />;
	return (
		<div>
			<h4>Here is a full review list</h4>
			<p>
				Admin can accept from this review and those review will be shown
				in home page
			</p>
			<div className="flex items-center justify-between  mt-3 gap-10">
				<div className="flex-1">
					<Input
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Search by message..."
					/>
				</div>

				<div>
					<Select onValueChange={(value) => setOrder(value)}>
						<SelectTrigger className="w-[120px] md:w-60">
							<SelectValue placeholder="By Default DESC" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="asc">Rating: ASC</SelectItem>
							<SelectItem value="desc">Rating: DESC</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
			{reviews?.result?.length ? (
				<div className="space-y-2">
					<ESTable
						columns={columns}
						data={reviews?.result}
						rowKey={(review) => review?._id}
					/>
					{reviews?.meta && (
						<Pagination
							currentPage={reviews.meta?.currentPage}
							totalPages={reviews?.meta?.totalPages}
							onPageChange={setCurrentPage}
						/>
					)}
				</div>
			) : (
				<NoDataFound message="No Review found" />
			)}
		</div>
	);
}
