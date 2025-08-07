"use client";
import AppLoading from "@/app/loading";
import NoDataFound from "@/components/NoDataFound";
import UpdateCategory from "@/components/shared/@category/update-category";
import EsModal from "@/components/shared/es-modal";
import { ESTable } from "@/components/shared/es-table";
import { Button } from "@/components/ui/button";
import {
	useAllCategoriesQuery,
	useDeleteCategoryMutation,
} from "@/redux/api/categoryApi";
import { TCategory } from "@/types/category.types";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

export default function CategoryTable() {
	const { data: categories, isLoading } = useAllCategoriesQuery({});
	const [deleteCategory, { isLoading: deleteLoading }] =
		useDeleteCategoryMutation();

	const handleDeleteCategory = async (id: string) => {
		try {
			const res = await deleteCategory(id).unwrap();

			if (res.success) {
				toast.success("Category deleted successfully");
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.log(error);
			toast.error(error?.data?.message);
		}
	};
	const columns = [
		{
			key: "icon",
			label: "Icon",
			render: (category: TCategory) => (
				<Image src={category?.icon} width={40} height={40} alt="icon" />
			),
		},
		{ key: "name", label: "Category Name" },
		{
			key: "actions",
			label: "Action",
			className: "text-center",
			render: (category: TCategory) => (
				<div className="space-x-1 space-y-1 text-center">
					<EsModal
						title="Update Category"
						trigger={
							<Button variant="outline" size={"sm"}>
								<Edit className="mr-2 h-4 w-4" />
								<span>Edit</span>
							</Button>
						}
					>
						{(closeModal) => (
							<UpdateCategory
								categoryId={category._id}
								closeModal={closeModal}
							/>
						)}
					</EsModal>
					<Button
						size={"sm"}
						variant={"destructive"}
						onClick={() => handleDeleteCategory(category._id)}
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
		<>
			{categories?.result?.length ? (
				<ESTable
					columns={columns}
					data={categories?.result}
					rowKey={(category) => category?._id}
				/>
			) : (
				<NoDataFound message="No Data found" />
			)}
		</>
	);
}
