"use client";

import { ESTable } from "@/components/shared/es-table";
import {
	useAllReviewsQuery,
	useUndoAcceptMutation,
} from "@/redux/api/reviewApi";
import { TReviewResponse } from "@/types/review.types";

import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";
import { toast } from "sonner";
import AppLoading from "@/app/loading";

export default function AcceptedReview() {
	const [undoAccept, { isLoading: undoLoading }] = useUndoAcceptMutation();

	const { data: reviews, isLoading } = useAllReviewsQuery({
		isAccepted: "true",
	});

	const handleDelete = async (id: string) => {
		try {
			const res = await undoAccept(id).unwrap();
			if (res.success) {
				toast.success("Removed form accepted review");
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
				<div className="flex flex-wrap items-center gap-2">
					<Button size={"sm"} variant={"secondary"}>
						✅Accepted
					</Button>
					<Button
						size={"sm"}
						variant={"destructive"}
						onClick={() => handleDelete(review._id)}
						className="border border-orange-shade-50 bg-orange-shade-97 text-orange-shade-50"
						disabled={undoLoading}
					>
						<Undo2 />
						Undo
					</Button>
				</div>
			),
		},
	];

	if (isLoading) return <AppLoading />;
	return (
		<div>
			<div>
				<h5>Only Accepted review list</h5>
				<p className="text-gray-shade-30">
					You can undo them if you want.
				</p>
			</div>
			{reviews?.result?.length ? (
				<ESTable
					columns={columns}
					data={reviews?.result}
					rowKey={(review) => review?._id}
				/>
			) : (
				<p>No data found!</p>
			)}
		</div>
	);
}
