"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";

import { createCategorySchema } from "@/form-schema";
import ESInput from "@/components/form/ESInput";
import { useCreateCategoryMutation } from "@/redux/api/categoryApi";
import { generateDefaultValues } from "@/utils/zod-defaults";
import ESImageUpload from "@/components/form/ESUploadImage";

export default function CreateCategoryForm() {
	const [createCategory, { isLoading }] = useCreateCategoryMutation();

	const form = useForm<z.infer<typeof createCategorySchema>>({
		resolver: zodResolver(createCategorySchema),
		defaultValues: generateDefaultValues(createCategorySchema),
	});

	const handleCreateCategory = async (
		values: z.infer<typeof createCategorySchema>
	) => {
		try {
			const response = await createCategory(values).unwrap();

			if (response.success) {
				toast.success("Category created successfully");
				form.reset();
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.error(error?.data?.message);
		}
	};

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

					<Button type="submit" disabled={isLoading}>
						Create Category
					</Button>
				</form>
			</Form>
		</div>
	);
}
