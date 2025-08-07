"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { userUpdateSchema } from "@/form-schema";

import { useAppSelector } from "@/hooks";
import { selectedUser } from "@/redux/slice/authSlice";
import { useEffect } from "react";
import { useUpdateUserMutation, useUserByIdQuery } from "@/redux/api/userApi";
import ESInput from "../../../../components/form/ESInput";
import ESImageUpload from "../../../../components/form/ESUploadImage";

export default function ProfileForm() {
	const user = useAppSelector(selectedUser);

	const { data: userDetails, isLoading } = useUserByIdQuery(
		user?.id as string,
		{
			skip: !user?.id,
		}
	);

	const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();

	const form = useForm<z.infer<typeof userUpdateSchema>>({
		resolver: zodResolver(userUpdateSchema),
		defaultValues: {
			name: "",
			phone: "",
			avatar: "",
		},
	});

	const handleUserDetails = async (
		values: z.infer<typeof userUpdateSchema>
	) => {
		try {
			const res = await updateUser({
				id: user?.id as string,
				payload: values,
			}).unwrap();

			if (res?.success) {
				toast.success("User information updated successfully");
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.error(error?.data?.message);
		}
	};

	// updating default form values
	useEffect(() => {
		if (userDetails?.result) {
			form.reset({
				name: userDetails?.result?.name || "",
				avatar: userDetails?.result?.avatar || "",
				phone: userDetails?.result?.phone || "",
			});
		}
	}, [form, userDetails?.result]);

	if (isLoading) {
		return <p>Loading...</p>;
	}
	return (
		<Form {...form}>
			<form
				className=" space-y-5 p-10 bg-white-shade-99 border rounded-md"
				onSubmit={form.handleSubmit(handleUserDetails)}
			>
				<ESImageUpload
					form={form}
					name="avatar"
					label="Profile Picture"
				/>
				<ESInput form={form} name="name" label="Name" />
				<ESInput form={form} name="phone" label="Phone" />

				<Button type="submit" disabled={updateLoading}>
					Update Information
				</Button>
			</form>
		</Form>
	);
}
