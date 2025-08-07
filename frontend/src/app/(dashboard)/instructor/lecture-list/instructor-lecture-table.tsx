"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

import { toast } from "sonner";

import UpdateLecture from "@/components/shared/@lecture/update-lecture";
import {
	useAssignedLecturesQuery,
	useDeleteLectureMutation,
} from "@/redux/api/lectureApi";
import { ESTable } from "@/components/shared/es-table";
import EsModal from "@/components/shared/es-modal";
import { TLectureResponse } from "@/types/lecture.types";
import AppLoading from "@/app/loading";
import NoDataFound from "@/components/NoDataFound";

import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "use-debounce";
import Pagination from "@/components/Pagination";

export default function InstructorLectureTable() {
	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState("");
	const [order, setOrder] = useState("desc");

	const [searchValue] = useDebounce(search, 800);
	const { data: lectures, isLoading } = useAssignedLecturesQuery({
		order,
		search: searchValue,
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
			key: "title",
			label: "Lecture Title",
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
						title="Update Module"
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
		<div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 ">
				<Input
					type="text"
					placeholder="Search by title..."
					className="ring-1 ring-primary"
					onChange={(e) => setSearch(e.target.value)}
				/>

				<Select onValueChange={(value) => setOrder(value)}>
					<SelectTrigger>
						<SelectValue placeholder="By Default DESC" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="asc">ASC</SelectItem>
						<SelectItem value="desc">DESC</SelectItem>
					</SelectContent>
				</Select>
			</div>
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
				<NoDataFound message="No lecture found" />
			)}
		</div>
	);
}
