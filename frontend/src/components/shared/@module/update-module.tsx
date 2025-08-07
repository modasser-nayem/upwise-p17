"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import { updateModuleSchema } from "@/form-schema";
import { useEffect } from "react";
import {
	useModuleByIdQuery,
	useUpdateModuleMutation,
} from "@/redux/api/moduleApi";

type TUpdateModuleProps = {
	moduleId: string;
	closeModal: () => void;
};
export default function UpdateModule({
	moduleId,
	closeModal,
}: TUpdateModuleProps) {
	const { data: moduleDetails } = useModuleByIdQuery(moduleId);
	const [updateModule, { isLoading: moduleLoading }] =
		useUpdateModuleMutation();

	const form = useForm<z.infer<typeof updateModuleSchema>>({
		resolver: zodResolver(updateModuleSchema),
		defaultValues: {
			title: moduleDetails?.result?.title || "",
		},
	});

	const handleModuleUpdate = async (
		values: z.infer<typeof updateModuleSchema>
	) => {
		try {
			const response = await updateModule({
				id: moduleId,
				payload: values,
			}).unwrap();

			if (response.success) {
				toast.success("Module updated successfully");
				closeModal();
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.error(error?.data?.message);
		}
	};

	//updating default form values
	useEffect(() => {
		if (moduleDetails) {
			form.reset({
				title: moduleDetails?.result?.title || "",
			});
		}
	}, [form, moduleDetails]);

	return (
		<div className="grid grid-cols-1 place-items-center">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleModuleUpdate)}
					className="max-w-3xl w-full mt-10 space-y-5"
				>
					{/* Module Title Input Field */}
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Module title</FormLabel>
								<FormControl>
									<Input placeholder="Title" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" disabled={moduleLoading}>
						Update Module
					</Button>
				</form>
			</Form>
		</div>
	);
}
