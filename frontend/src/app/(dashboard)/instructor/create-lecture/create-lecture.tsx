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
import { lectureSchema } from "@/form-schema";

import { toast } from "sonner";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useCourseByInstructorQuery } from "@/redux/api/courseApi";
import { useModuleByCourseIdQuery } from "@/redux/api/moduleApi";
import { useCreateLectureMutation } from "@/redux/api/lectureApi";
import ESSelect from "@/components/form/ESSelect";
import ESInput from "@/components/form/ESInput";
import ESTiptapEditor from "@/components/form/ESTipTabEditor";

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
export default function CreateLectureByInstructor() {
	const [courseId, setCourseId] = useState("");

	const { data: assignedCourses, isLoading: courseLoading } =
		useCourseByInstructorQuery();

	const { data: modules } = useModuleByCourseIdQuery(courseId, {
		skip: !courseId,
	});
	const [createLecture, { isLoading: createLectureLoading }] =
		useCreateLectureMutation();

	const form = useForm<z.infer<typeof lectureSchema>>({
		resolver: zodResolver(lectureSchema),
		defaultValues: {
			course: "",
			module: "",
			duration: 0,
			title: "",
			content: "",
			type: "video",
		},
	});

	const selectedModule = form.watch("course");
	const handleLectureSubmit = async (
		values: z.infer<typeof lectureSchema>
	) => {
		try {
			const response = await createLecture({
				moduleId: values.module,
				payload: values,
			}).unwrap();

			if (response.success) {
				toast.success("Lecture created successfully");
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
					onSubmit={form.handleSubmit(handleLectureSubmit)}
					className="max-w-3xl w-full  mt-10"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
						<FormField
							control={form.control}
							name="course"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Course</FormLabel>
									<Select
										onValueChange={(value) => {
											field.onChange(value);
											setCourseId(value);
										}}
										defaultValue={field.value}
										disabled={courseLoading}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select Course" />
											</SelectTrigger>
										</FormControl>

										<SelectContent>
											{(assignedCourses?.result?.length ??
												0) > 0 ? (
												assignedCourses?.result?.map(
													(option) => (
														<SelectItem
															key={option._id}
															value={option._id}
														>
															{option.title}
														</SelectItem>
													)
												)
											) : (
												<SelectItem
													value="ace"
													disabled
												>
													No options available
												</SelectItem>
											)}
										</SelectContent>
									</Select>
									<FormMessage className="text-red-500" />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="module"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Module</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
										disabled={!selectedModule}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select Module" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{(modules?.result?.length ?? 0) >
											0 ? (
												modules?.result?.map(
													(option) => (
														<SelectItem
															key={option._id}
															value={option._id}
														>
															{option.title}
														</SelectItem>
													)
												)
											) : (
												<SelectItem
													value="abc"
													disabled
												>
													No options available
												</SelectItem>
											)}
										</SelectContent>
									</Select>
									<FormMessage className="text-red-500" />
								</FormItem>
							)}
						/>
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
					<Button type="submit" disabled={createLectureLoading}>
						Create Lecture
					</Button>
				</form>
			</Form>
		</div>
	);
}
