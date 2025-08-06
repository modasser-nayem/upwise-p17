import { z } from "zod";

const registerUser = z.object({
	name: z
		.string({ required_error: "Name is required" })
		.min(3, "Min length should be 3 characters")
		.max(30, "Name max length is 30")
		.trim(),
	email: z
		.string({ required_error: "Email is required" })
		.email({ message: "Email should be a valid email" })
		.toLowerCase()
		.trim(),
	role: z.enum(["student", "admin", "instructor"]).optional(),
	password: z
		.string({ required_error: "Password is required" })
		.min(6, "Password should be at least 6 characters")
		.max(28, "Password max length is 28")
		.trim(),
});

const loginUser = z.object({
	email: z
		.string({ required_error: "Email is required" })
		.email({ message: "Email should be valid email" })
		.trim(),

	password: z
		.string({ required_error: "Password is required" })
		.min(6, "Password should be at least 6 characters")
		.max(28, "Password max length is 28")
		.trim(),
});
export const authValidation = { registerUser, loginUser };
