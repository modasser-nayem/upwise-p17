"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";

import { createModuleSchema } from "@/form-schema";
import { useCreateModuleMutation } from "@/redux/api/moduleApi";
import { useCourseByInstructorQuery } from "@/redux/api/courseApi";
import ESInput from "@/components/form/ESInput";
import ESSelect from "@/components/form/ESSelect";

export default function CreateModuleByInstructor() {
	const { data: assignedCourses, isLoading: courseLoading } =
		useCourseByInstructorQuery();
	const [createModule, { isLoading: moduleLoading }] =
		useCreateModuleMutation();

	const form = useForm<z.infer<typeof createModuleSchema>>({
		resolver: zodResolver(createModuleSchema),
		defaultValues: {
			course: "",
			title: "",
		},
	});

	const selectedCourse = form.watch("course");

	const courseOptions = assignedCourses?.result?.map((course) => ({
		value: course._id,
		label: course.title,
	}));

	const handleModuleSubmit = async (
		values: z.infer<typeof createModuleSchema>
	) => {
		try {
			const response = await createModule({
				courseId: values.course,
				payload: values,
			}).unwrap();

			if (response.success) {
				toast.success("Module created successfully");
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.error(error?.data?.message);
		}
	};

	if (courseLoading) return <p>Loading...</p>;
	return (
		<div className="grid grid-cols-1 place-items-center">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleModuleSubmit)}
					className="max-w-3xl w-full mt-10 space-y-5"
				>
					<ESSelect
						form={form}
						name="course"
						label="Course"
						options={courseOptions}
					/>
					{/* Course Select Field */}
					<ESInput
						form={form}
						name="title"
						label="Title"
						disabled={!selectedCourse}
						placeholder="Enter Module title"
					/>

					<Button type="submit" disabled={moduleLoading}>
						Create Module
					</Button>
				</form>
			</Form>
		</div>
	);
}
