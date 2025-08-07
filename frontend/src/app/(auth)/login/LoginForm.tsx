"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { loginSchema } from "@/form-schema";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks";
import { setCredentials } from "@/redux/slice/authSlice";
import { decodeToken } from "@/lib/decodeToken";
import { useLoginToAccountMutation } from "@/redux/api/authApi";
import ESInput from "@/components/form/ESInput";
import { setCookie } from "@/actions/auth-action";

// 👇 Add demo credentials here
const demoUsers = {
	student: {
		email: "student@gmail.com",
		password: "1234567",
	},
	instructor: {
		email: "instructor@gmail.com",
		password: "123456",
	},
	admin: {
		email: "admin@gmail.com",
		password: "123456",
	},
};
export default function LoginForm() {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const [loginToAccount, { isLoading }] = useLoginToAccountMutation();

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const handleLogin = async (values: z.infer<typeof loginSchema>) => {
		try {
			const res = await loginToAccount(values).unwrap(); // server action

			if (res?.success) {
				toast.success("Logged in successfully");
				await setCookie(res?.result?.accessToken);
				const user = decodeToken(res?.result?.accessToken);

				dispatch(
					setCredentials({
						user: user,
						token: res?.result?.accessToken,
					})
				);
				router.push(`/${user?.role}`);
			} else {
				toast.error("Invalid credentials");
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast(error?.data?.message);
			console.log(error);
		}
	};

	const handleDemoLogin = async (role: keyof typeof demoUsers) => {
		const creds = demoUsers[role];
		form.setValue("email", creds.email);
		form.setValue("password", creds.password);

		// Submit login immediately
		handleLogin(creds);
	};
	return (
		<>
			{/** Demo buttons */}
			<div className="mt-6">
				<p className="mb-2 font-medium">Login as demo user:</p>
				<div className="flex items-center justify-between flex-wrap ">
					{(["student", "instructor", "admin"] as const).map(
						(role) => (
							<Button
								key={role}
								variant="outline"
								onClick={() => handleDemoLogin(role)}
								disabled={isLoading}
							>
								{role.charAt(0).toUpperCase() + role.slice(1)}
							</Button>
						)
					)}
				</div>
			</div>

			{/** Login form */}
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleLogin)}
					className="space-y-5"
				>
					<ESInput
						form={form}
						name="email"
						label="Email"
						type="email"
					/>
					<ESInput
						form={form}
						name="password"
						label="Password"
						type="password"
					/>

					<Button type="submit" disabled={isLoading}>
						Login
					</Button>
				</form>
			</Form>
		</>
	);
}
