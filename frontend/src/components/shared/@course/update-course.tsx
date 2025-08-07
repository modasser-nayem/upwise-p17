"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { updateCourseSchema } from "@/form-schema";
import { toast } from "sonner";

import {
	useCourseByIdQuery,
	useUpdateCourseMutation,
} from "@/redux/api/courseApi";
import ESInput from "@/components/form/ESInput";
import ESSelect from "@/components/form/ESSelect";
import ESTextarea from "@/components/form/ESTextArea";

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

type UpdateCourseFormType = z.infer<typeof updateCourseSchema>;
type UpdateCourseProps = {
	courseId: string;
	closeModal: () => void;
};

export default function UpdateCourse({
	courseId,
	closeModal,
}: UpdateCourseProps) {
	const { data: courseData, isLoading: isCourseLoading } =
		useCourseByIdQuery(courseId);

	const { data: instructorData, isLoading: isInstructorLoading } =
		useAllUsersQuery({
			role: "instructor",
			fields: "name",
		});
	const { data: categoryData } = useAllCategoriesQuery({});
	const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseMutation();

	const instructorOptions = instructorData?.result?.map((ins) => ({
		value: ins._id,
		label: ins.name,
	}));

	const categoryOptions = categoryData?.result?.map((cat) => ({
		value: cat._id,
		label: cat.name,
	}));

	const form = useForm<UpdateCourseFormType>({
		resolver: zodResolver(updateCourseSchema),
		defaultValues: {
			title: "",
			shortVideo: "",
			level: "Beginner",
			duration: "",
			description: "",
			pricingType: "free",
			price: 0,
			category: "",
			instructor: "",
		},
	});

	const handleCourseUpdate = async (values: UpdateCourseFormType) => {
		try {
			const response = await updateCourse({
				id: courseId,
				payload: values,
			}).unwrap();

			if (response.success) {
				toast.success("Course updated successfully");
				closeModal();
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.error(error?.data?.message || "Something went wrong");
		}
	};

	useEffect(() => {
		if (courseData?.result) {
			const course = courseData?.result;
			form.reset({
				title: course.title || "",
				shortVideo: course.shortVideo || "",
				level: course.level as UpdateCourseFormType["level"],
				duration: course.duration || "",
				description: course.description || "",
				pricingType:
					course.pricingType as UpdateCourseFormType["pricingType"],
				price: course.price || 0,
				category: course?.category?._id || "",
				instructor: course?.instructor?._id || "",
			});
		}
	}, [courseData, form]);

	if (isCourseLoading || isInstructorLoading || !courseData?.result) {
		return (
			<p className="text-center py-10 text-muted-foreground">
				Loading course data...
			</p>
		);
	}

	return (
		<div className="grid grid-cols-1 place-items-center">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleCourseUpdate)}
					className="max-w-5xl w-full mt-2 space-y-4"
				>
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
					<Button type="submit" disabled={isUpdating}>
						Update Course
					</Button>
				</form>
			</Form>
		</div>
	);
}
