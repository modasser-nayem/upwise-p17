"use client";
import ESInput from "@/components/form/ESInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { changePasswordSchema } from "@/form-schema";
import { useChangePasswordMutation } from "@/redux/api/authApi";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function ChangePasswordForm() {
	const [changePassword] = useChangePasswordMutation();
	const form = useForm<z.infer<typeof changePasswordSchema>>({
		resolver: zodResolver(changePasswordSchema),
		defaultValues: {
			oldPassword: "",
			newPassword: "",
			confirmPassword: "",
		},
	});

	const handleChangePassword = async (
		values: z.infer<typeof changePasswordSchema>
	) => {
		try {
			const res = await changePassword(values).unwrap();

			if (res?.success) {
				toast.success("Password changed successfully");
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.error(error?.data?.message);
		}
	};
	return (
		<Form {...form}>
			<form
				className="w-full space-y-5 p-10 border bg-white-shade-99  rounded-md"
				onSubmit={form.handleSubmit(handleChangePassword)}
			>
				<ESInput
					form={form}
					name="oldPassword"
					label="Old Password"
					type="password"
				/>
				<ESInput
					form={form}
					name="newPassword"
					label="New Password"
					type="password"
				/>
				<ESInput
					form={form}
					name="confirmPassword"
					label="Confirm Password"
					type="password"
				/>

				<Button type="submit">Change Password</Button>
			</form>
		</Form>
	);
}
