"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { createCourseSchema } from "@/form-schema";
import { toast } from "sonner";

import { useCreateCourseMutation } from "@/redux/api/courseApi";
import ESInput from "@/components/form/ESInput";
import ESSelect from "@/components/form/ESSelect";
import ESImageUpload from "@/components/form/ESUploadImage";
import ESTextarea from "@/components/form/ESTextArea";
import { generateDefaultValues } from "@/utils/zod-defaults";
import { useAllUsersQuery } from "@/redux/api/userApi";
import { useAllCategoriesQuery } from "@/redux/api/categoryApi";

const courseType = [
	{ label: "Paid", value: "paid" },
	{ label: "Free", value: "free" },
];
const courseLevel = [
	{ label: "Beginner", value: "Beginner" },
	{ label: "Intermediate", value: "Intermediate" },
	{ label: "Expert", value: "Expert" },
];
export default function CourseForm() {
	const { data: instructor, isLoading } = useAllUsersQuery({
		role: "instructor",
		fields: "name",
	});
	const { data: categories } = useAllCategoriesQuery({});

	const instructorOptions = instructor?.result?.map((ins) => ({
		value: ins?._id,
		label: ins?.name,
	}));

	const categoryOptions = categories?.result?.map((cat) => ({
		value: cat?._id,
		label: cat?.name,
	}));
	const [createCourse, { isLoading: courseLoading }] =
		useCreateCourseMutation();

	type CourseFormType = z.infer<typeof createCourseSchema>;

	const form = useForm<CourseFormType>({
		resolver: zodResolver(createCourseSchema),
		defaultValues: generateDefaultValues(createCourseSchema),
	});

	const handleCourseSubmit = async (values: CourseFormType) => {
		try {
			const response = await createCourse(values).unwrap();

			if (response.success) {
				toast.success("Course created successfully");
				form.reset();
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.error(error?.data?.message);
		}
	};

	if (isLoading) return <p>Loading...</p>;
	return (
		<div className="grid grid-cols-1 place-items-center">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleCourseSubmit)}
					className="max-w-3xl w-full  mt-10 space-y-4"
				>
					<ESImageUpload
						form={form}
						name="thumbnail"
						label="Course Thumbnail"
					/>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
						<ESInput
							name="title"
							form={form}
							placeholder="Title"
							label="Course Title"
						/>
						<ESInput
							form={form}
							name="shortVideo"
							label="Short Video (optional)"
							placeholder="Video link"
						/>
						<ESInput
							type="number"
							name="price"
							form={form}
							placeholder="Price"
							label="Course Price"
						/>
						<ESSelect
							name="pricingType"
							form={form}
							label="Course Type"
							options={courseType}
						/>

						<ESInput
							name="duration"
							form={form}
							placeholder="Ex: 6 Weeks"
							label="Duration"
						/>
						<ESSelect
							name="category"
							form={form}
							label="Category"
							options={categoryOptions}
						/>
						<ESSelect
							name="level"
							form={form}
							label="Level"
							options={courseLevel}
						/>
						<ESSelect
							name="instructor"
							form={form}
							label="Instructor"
							options={instructorOptions}
						/>
					</div>
					<ESTextarea
						form={form}
						name="description"
						label="Description"
						placeholder="Write description about this course"
					/>
					<Button type="submit" disabled={courseLoading}>
						Create course
					</Button>
				</form>
			</Form>
		</div>
	);
}
