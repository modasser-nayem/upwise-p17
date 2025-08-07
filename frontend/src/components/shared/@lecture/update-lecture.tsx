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
import { lectureUpdateSchema } from "@/form-schema";

import { toast } from "sonner";

import { useEffect } from "react";
import {
	useLectureByIdQuery,
	useUpdateLectureMutation,
} from "@/redux/api/lectureApi";
import ESInput from "../../form/ESInput";
import ESSelect from "../../form/ESSelect";
import ESTiptapEditor from "@/components/form/ESTipTabEditor";

type UpdateLectureProps = {
	lectureId: string;
	closeModal: () => void;
};

const fileType = [
	{
		value: "video",
		label: "Video",
	},
	{
		value: "post",
		label: "Post",
	},
];

type LectureUpdateForm = z.infer<typeof lectureUpdateSchema>;

export default function UpdateLecture({
	lectureId,
	closeModal,
}: UpdateLectureProps) {
	const { data: lectureDetails, isLoading } = useLectureByIdQuery(lectureId);

	const [updateLecture, { isLoading: updateLoading }] =
		useUpdateLectureMutation();

	const form = useForm<LectureUpdateForm>({
		resolver: zodResolver(lectureUpdateSchema),
		defaultValues: {
			title: "",
			content: "",
			duration: 0,
			type: undefined,
		},
	});

	const handleLectureSubmit = async (
		values: z.infer<typeof lectureUpdateSchema>
	) => {
		try {
			const response = await updateLecture({
				id: lectureId,
				payload: values,
			}).unwrap();

			if (response.success) {
				toast.success("Lecture updated successfully");
				closeModal();
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.error(error?.data?.message);
		}
	};

	//updating default form values
	useEffect(() => {
		if (lectureDetails?.result) {
			form.reset({
				title: lectureDetails?.result?.title || "",
				duration: lectureDetails?.result?.duration || 0,
				type:
					(lectureDetails?.result
						?.type as LectureUpdateForm["type"]) || "post",
				content: lectureDetails?.result?.content || "",
			});
		}
	}, [form, lectureDetails]);

	if (isLoading) {
		return <p>Loading...</p>;
	}
	return (
		<div className="grid grid-cols-1 place-items-center">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleLectureSubmit)}
					className="max-w-3xl w-full  mt-10"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
						<ESInput
							form={form}
							name="title"
							label="Lecture Title"
						/>

						<ESInput
							type="number"
							form={form}
							name="duration"
							label="Lecture Duration"
							placeholder="Ex: 10"
							description="Duration counts in minutes"
						/>
						<ESSelect
							name="type"
							label="File Type"
							form={form}
							options={fileType}
						/>
						<FormField
							control={form.control}
							name="content"
							render={({ field }) =>
								form.watch("type") === "post" ? (
									<FormItem className="md:col-span-2">
										<FormLabel>Post Content</FormLabel>
										<FormControl>
											<ESTiptapEditor
												value={field.value}
												onChange={field.onChange}
											/>
										</FormControl>
										<FormMessage className="text-red-500" />
									</FormItem>
								) : (
									<ESInput
										form={form}
										name="content"
										label="Video URL"
									/>
								)
							}
						/>
					</div>
					<Button type="submit" disabled={updateLoading}>
						{updateLoading ? "Updating" : "Update Lecture"}
					</Button>
				</form>
			</Form>
		</div>
	);
}
