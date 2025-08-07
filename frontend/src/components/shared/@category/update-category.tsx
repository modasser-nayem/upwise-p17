"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";

import { updateCategorySchema } from "@/form-schema";
import ESInput from "@/components/form/ESInput";
import {
	useCategoryByIdQuery,
	useUpdateCategoryMutation,
} from "@/redux/api/categoryApi";
import { generateDefaultValues } from "@/utils/zod-defaults";
import ESImageUpload from "@/components/form/ESUploadImage";
import { useEffect } from "react";
type UpdateCategoryProps = {
	categoryId: string;
	closeModal: () => void;
};
export default function UpdateCategory({
	categoryId,
	closeModal,
}: UpdateCategoryProps) {
	const { data: category, isLoading } = useCategoryByIdQuery(categoryId);
	const [updateCategory, { isLoading: updateLoading }] =
		useUpdateCategoryMutation();

	const form = useForm<z.infer<typeof updateCategorySchema>>({
		resolver: zodResolver(updateCategorySchema),
		defaultValues: generateDefaultValues(updateCategorySchema),
	});

	const handleCreateCategory = async (
		values: z.infer<typeof updateCategorySchema>
	) => {
		try {
			const response = await updateCategory({
				id: categoryId,
				payload: values,
			}).unwrap();

			if (response.success) {
				toast.success("Category created successfully");
				form.reset();
				closeModal();
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.error(error?.data?.message);
		}
	};

	useEffect(() => {
		if (category?.result) {
			form.reset({
				name: category?.result?.name || "",
				icon: category?.result?.icon || "",
			});
		}
	}, [form, category?.result]);

	if (isLoading) return <p>Loading...</p>;
	return (
		<div className="grid grid-cols-1 place-items-center">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleCreateCategory)}
					className="max-w-3xl w-full mt-10 space-y-5"
				>
					<ESInput
						form={form}
						name="name"
						label="Category Name"
						placeholder="Web Development"
					/>
					<ESImageUpload
						form={form}
						name="icon"
						label="Category Icon(optional)"
					/>
					{/* Course Select Field */}

					<Button type="submit" disabled={updateLoading}>
						Update Category
					</Button>
				</form>
			</Form>
		</div>
	);
}
