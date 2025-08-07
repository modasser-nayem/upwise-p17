"use client";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";

import { registrationSchema } from "@/form-schema";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCreateAccountMutation } from "@/redux/api/authApi";
import ESInput from "@/components/form/ESInput";

export default function RegisterForm() {
	const router = useRouter();
	const [createAccount, { isLoading }] = useCreateAccountMutation();

	const form = useForm<z.infer<typeof registrationSchema>>({
		resolver: zodResolver(registrationSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const handleSubmit = async (values: z.infer<typeof registrationSchema>) => {
		try {
			const res = await createAccount(values).unwrap();

			if (res?.success) {
				toast.success("Account created Successfully");
				router.push("/login");
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.error(error?.data?.message);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="space-y-8"
			>
				<ESInput form={form} name="name" label="Full Name" />
				<ESInput form={form} name="email" label="Email" type="email" />
				<ESInput
					form={form}
					name="password"
					label="Password"
					type="password"
				/>
				<Button type="submit" disabled={isLoading}>
					Create Account
				</Button>
			</form>
		</Form>
	);
}
