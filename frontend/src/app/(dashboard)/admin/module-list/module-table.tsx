"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import EsModal from "@/components/shared/es-modal";

import { toast } from "sonner";

import UpdateModule from "@/components/shared/@module/update-module";
import {
	useAllModulesQuery,
	useDeleteModuleMutation,
} from "@/redux/api/moduleApi";
import { ESTable } from "@/components/shared/es-table";
import { TModuleResponse } from "@/types/module.types";
import AppLoading from "@/app/loading";
import NoDataFound from "@/components/NoDataFound";

import { useDebounce } from "use-debounce";
import Pagination from "@/components/Pagination";
import SearchAndSort from "@/components/SearchAndSort";

export default function ModuleTable() {
	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState("");
	const [order, setOrder] = useState("desc");

	const [searchValue] = useDebounce(search, 800);
	const { data: modules, isLoading } = useAllModulesQuery({
		order,
		search: searchValue,
		page: currentPage.toString(),
	});

	const [deleteModule, { isLoading: deleteLoading }] =
		useDeleteModuleMutation();

	const columns = [
		{
			key: "title",
			label: "Title",
		},
		{
			key: "index",
			label: "Index",
		},
		{
			key: "course.title",
			label: "Course Name",

			render: (item: { course: { title: string } }) => item.course?.title,
		},
		{
			key: "actions",
			label: "Action",
			className: "text-center",
			render: (module: TModuleResponse) => (
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
							<UpdateModule
								moduleId={module._id}
								closeModal={closeModal}
							/>
						)}
					</EsModal>
					<Button
						size={"sm"}
						variant={"destructive"}
						onClick={() => handleDelete(module._id)}
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

	const handleDelete = async (id: string) => {
		try {
			const res = await deleteModule(id).unwrap();
			if (res.success) {
				toast.success("Module deleted successfully");
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.error(error?.data?.message);
		}
	};

	if (isLoading) return <AppLoading />;
	return (
		<div className="space-y-5">
			<SearchAndSort
				setSearch={setSearch}
				setOrder={setOrder}
				placeholder="Search by title"
				selectValue="By Default DESC"
			/>
			{modules?.result.length ? (
				<div className="space-y-2">
					<ESTable
						columns={columns}
						data={modules.result}
						rowKey={(item) => item._id}
					/>
					{modules?.meta && (
						<Pagination
							currentPage={modules.meta?.currentPage}
							totalPages={modules?.meta?.totalPages}
							onPageChange={setCurrentPage}
						/>
					)}
				</div>
			) : (
				<NoDataFound message="No Module found" />
			)}
		</div>
	);
}
