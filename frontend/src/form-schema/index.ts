import { isValidVideoUrl } from "@/utils/validateVideoUrl";
import { z } from "zod";

export const createCourseSchema = z.object({
	title: z
		.string({ required_error: "Title is required" })
		.min(10, "Title should be more than 10 characters")
		.max(50, "Title should be less than 50 characters")
		.trim(),
	price: z.coerce
		.number({ required_error: "Price is required" })
		.positive({ message: "Price can not be negative" })
		.max(25000, "Should be less than 25000 Taka"),
	pricingType: z.enum(["paid", "free"]),
	shortVideo: z
		.string()
		.url({ message: "Link should be a valid url" })
		.trim()
		.optional(),
	level: z.enum(["Beginner", "Intermediate", "Expert"]),
	category: z
		.string({ required_error: "Category is required" })
		.nonempty({ message: "Category can not be empty" })
		.trim(),
	duration: z.string({ required_error: "Duration is required" }).trim(),
	description: z
		.string({ required_error: "Description is required" })
		.min(20, { message: "Min characters is 20" })
		.max(1000, { message: "Max character is 1000" })
		.trim(),
	instructor: z
		.string({ required_error: "Instructor is required" })
		.nonempty({ message: "Please select instructor" })
		.trim(),
	thumbnail: z
		.string({ required_error: "Thumbnail is required" })
		.url({ message: "Provide a valid URL" })
		.trim(),
});

export const updateCourseSchema = z.object({
	title: z
		.string({ required_error: "Title is required" })
		.min(3, "Title should be more than 3 characters")
		.max(50, "Title should be less than 50 characters")
		.trim()
		.optional(),
	price: z.coerce
		.number({ required_error: "Price is required" })
		.positive({ message: "Price can not be negative" })
		.max(25000, "Should be less than 25000 Taka")
		.optional(),
	pricingType: z.enum(["paid", "free"]).optional(),
	shortVideo: z
		.string()
		.trim()
		.url({ message: "Link should be a valid url" })
		.or(z.literal("").transform(() => undefined))
		.optional(),
	level: z.enum(["Beginner", "Intermediate", "Expert"]).optional(),
	category: z
		.string({ required_error: "Category is required" })
		.nonempty({ message: "Category can not be empty" })
		.trim()
		.optional(),
	duration: z
		.string({ required_error: "Duration is required" })
		.trim()
		.optional(),
	description: z
		.string({ required_error: "Description is required" })
		.min(20, { message: "Min characters is 20" })
		.max(1000, { message: "Max character is 1000" })
		.trim()
		.optional(),
	instructor: z
		.string({ required_error: "Instructor is required" })
		.nonempty({ message: "Please select instructor" })
		.trim()
		.optional(),
});

export const registrationSchema = z.object({
	name: z
		.string({ required_error: "Name is required" })
		.min(3, "Should be more than 3 characters")
		.max(30, "Should be less than 30 characters"),
	email: z
		.string({ required_error: "Email is required" })
		.email({ message: "Enter a valid email" })
		.trim(),
	password: z
		.string({ required_error: "Password is required" })
		.min(6, "Min length is 6")
		.max(25, "Max length is 25")
		.trim(),
});

export const loginSchema = z.object({
	email: z
		.string({ required_error: "Email is required" })
		.email({ message: "Enter a valid email" })
		.trim(),
	password: z
		.string({ required_error: "Password is required" })
		.min(5, "Min length is 6")
		.trim(),
});

export const createModuleSchema = z.object({
	title: z
		.string({ required_error: "Module title is required" })
		.min(5, "Min length is 6")
		.max(40, "Max length is 40")
		.trim(),

	course: z
		.string({
			required_error: "Course ID is required",
		})
		.nonempty({ message: "Course can not be empty" }),
});

export const updateModuleSchema = z.object({
	title: z
		.string({ required_error: "Module title is required" })
		.min(5, "Min length is 6")
		.max(40, "Max length is 40")
		.trim(),
});

export const lectureSchema = z
	.object({
		title: z
			.string({ required_error: "Lecture title is required" })
			.min(10, "Min length is 10")
			.max(60, "Max length is 60")
			.trim(),
		type: z.enum(["video", "post"]),
		module: z
			.string({ required_error: "Module ID is required" })
			.nonempty({ message: "Please select a module" }),
		duration: z.coerce
			.number({ required_error: "Duration is required" })
			.positive({ message: "Duration can not be negative" })
			.max(30, "Should be less than 30 minutes"),
		course: z
			.string({ required_error: "Course is required" })
			.nonempty({ message: "Select course to find module" }),
		content: z.string({ required_error: "Content is required" }).trim(),
	})
	.superRefine((data, ctx) => {
		if (data.type === "video") {
			if (!isValidVideoUrl(data.content)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Video must be a valid YouTube or Vimeo URL",
					path: ["content"],
				});
			}
		} else if (data.type === "post") {
			if (data.content.length < 30) {
				ctx.addIssue({
					code: z.ZodIssueCode.too_small,
					type: "string",
					minimum: 30,
					inclusive: true,
					message: "Post content must be at least 30 characters",
					path: ["content"],
				});
			}
		}
	});

export const lectureUpdateSchema = z
	.object({
		title: z
			.string({ required_error: "Lecture title is required" })
			.min(10, "Min length is 10")
			.max(60, "Max length is 60")
			.trim()
			.optional(),
		type: z.enum(["video", "post"]).optional(),

		duration: z.coerce
			.number({ required_error: "Duration is required" })
			.positive({ message: "Duration can not be negative" })
			.max(30, "Should be less than 30 minutes")
			.optional(),
		content: z.string({ required_error: "Content is required" }),
	})
	.superRefine((data, ctx) => {
		if (data.type === "video") {
			if (!isValidVideoUrl(data.content)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Video must be a valid YouTube or Vimeo URL",
					path: ["content"],
				});
			}
		} else if (data.type === "post") {
			if (data.content.length < 30) {
				ctx.addIssue({
					code: z.ZodIssueCode.too_small,
					type: "string",
					minimum: 30,
					inclusive: true,
					message: "Post content must be at least 30 characters",
					path: ["content"],
				});
			}
		}
	});

export const changePasswordSchema = z
	.object({
		oldPassword: z
			.string({ required_error: "Provide your old password" })
			.min(6, { message: "Min length is 6" })
			.max(30, { message: "Max length is 30" })
			.nonempty({ message: "Old password is required" })
			.trim(),
		newPassword: z
			.string({ required_error: "New password is required" })
			.min(6, { message: "Min length is 6" })
			.max(30, { message: "Max length is 30" })
			.nonempty({ message: "New password is required" })
			.trim(),
		confirmPassword: z
			.string({ required_error: "Confirm password is required" })
			.trim(),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	})
	.refine((data) => data.oldPassword !== data.newPassword, {
		message: "New password must be different from the old password",
		path: ["newPassword"],
	});

export const userUpdateSchema = z.object({
	name: z
		.string({ required_error: "Name is required" })
		.nonempty({ message: "Name can not be empty" })
		.optional(),

	phone: z
		.string()
		.trim()
		.or(z.literal("").transform(() => undefined))
		.optional(),
	avatar: z
		.string()
		.trim()
		.or(z.literal("").transform(() => undefined))
		.optional(),
});

export const createCategorySchema = z.object({
	name: z.string({ required_error: "Category name is required" }).trim(),
	icon: z
		.string()
		.url({ message: "Icon should be valid URL" })
		.trim()
		.optional(),
});
export const updateCategorySchema = z.object({
	name: z.string({ required_error: "Category name is required" }).trim(),
	icon: z
		.string()
		.url({ message: "Icon should be valid URL" })
		.trim()
		.optional(),
});

export const createReviewSchema = z.object({
	student: z.string({ required_error: "Student ID is required" }),
	course: z
		.string({ required_error: "Course ID is required" })
		.nonempty({ message: "Course ID can not be empty" }),
	rating: z.coerce
		.number()
		.min(1, { message: "Min rating value is 1" })
		.max(5, { message: "Max rating value is 5" }),
	message: z
		.string({ required_error: "Message is required" })
		.nonempty({ message: "Message can not be empty" }),
});
export const updateReviewSchema = z.object({
	rating: z.coerce
		.number()
		.min(1, { message: "Min rating value is 1" })
		.max(5, { message: "Max rating value is 5" }),
	message: z
		.string({ required_error: "Message is required" })
		.nonempty({ message: "Message can not be empty" }),
});
