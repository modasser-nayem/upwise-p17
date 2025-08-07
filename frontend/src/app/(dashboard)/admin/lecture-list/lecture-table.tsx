"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

import { toast } from "sonner";

import UpdateLecture from "@/components/shared/@lecture/update-lecture";
import {
	useAllLecturesQuery,
	useDeleteLectureMutation,
} from "@/redux/api/lectureApi";
import { ESTable } from "@/components/shared/es-table";
import EsModal from "@/components/shared/es-modal";
import { TLectureResponse } from "@/types/lecture.types";
import AppLoading from "@/app/loading";
import NoDataFound from "@/components/NoDataFound";
import { useDebounce } from "use-debounce";

import Pagination from "@/components/Pagination";
import SearchAndSort from "@/components/SearchAndSort";
export default function LectureTable() {
	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState("");
	const [order, setOrder] = useState("desc");

	const [searchValue] = useDebounce(search, 800);

	const { data: lectures, isLoading } = useAllLecturesQuery({
		search: searchValue,
		order,
		page: currentPage.toString(),
	});

	const [deleteLecture, { isLoading: deleteLoading }] =
		useDeleteLectureMutation();

	const handleDelete = async (id: string) => {
		try {
			const res = await deleteLecture(id).unwrap();
			if (res.success) {
				toast.success("Lecture deleted successfully");
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.error(error?.data?.message);
		}
	};

	const columns = [
		{
			key: "title",
			label: "Title",
		},

		{
			key: "module.course.title",
			label: "Course Name",
			render: (item: TLectureResponse) => item.module?.course?.title,
		},
		{
			key: "module.title",
			label: "Module Name",
			render: (item: TLectureResponse) => item.module?.title,
		},
		{
			key: "type",
			label: "Type",
		},
		{
			key: "duration",
			label: "Duration",
		},
		{
			key: "actions",
			label: "Action",
			className: "text-center",
			render: (lecture: TLectureResponse) => (
				<div className="space-x-1 space-y-1 text-center">
					<EsModal
						title="Update Lecture"
						trigger={
							<Button variant="outline">
								<Edit className="mr-2 h-4 w-4" />
								<span>Edit</span>
							</Button>
						}
					>
						{(closeModal) => (
							<UpdateLecture
								lectureId={lecture._id}
								closeModal={closeModal}
							/>
						)}
					</EsModal>
					<Button
						size={"sm"}
						variant={"destructive"}
						onClick={() => handleDelete(lecture._id)}
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
		<div className="space-y-5">
			<SearchAndSort
				setSearch={setSearch}
				setOrder={setOrder}
				placeholder="Search by title"
				selectValue="By Default DESC"
			/>
			{lectures?.result.length ? (
				<div className="space-y-2">
					<ESTable
						columns={columns}
						data={lectures?.result}
						rowKey={(item) => item._id}
					/>
					{lectures?.meta && (
						<Pagination
							currentPage={lectures.meta?.currentPage}
							totalPages={lectures?.meta?.totalPages}
							onPageChange={setCurrentPage}
						/>
					)}
				</div>
			) : (
				<NoDataFound message="No Lecture found" />
			)}
		</div>
	);
}
