"use client";
import React, { useCallback, useState } from "react";
import moment from "moment";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import {
	useAllUsersQuery,
	useUpdateUserRoleMutation,
} from "@/redux/api/userApi";
import { ESTable } from "@/components/shared/es-table";
import { TUserResponse } from "@/types/user.types";
import { toast } from "sonner";
import AppLoading from "@/app/loading";
import NoDataFound from "@/components/NoDataFound";
import Pagination from "@/components/Pagination";
import SearchAndSort from "@/components/SearchAndSort";
import { useDebounce } from "use-debounce";

const userRole = [
	{
		value: "student",
		level: "Student",
	},
	{
		value: "instructor",
		level: "Instructor",
	},
];

export default function StudentTable() {
	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState("");
	const [order, setOrder] = useState("desc");
	const [searchValue] = useDebounce(search, 800);
	const { data: students, isLoading } = useAllUsersQuery({
		role: "student",
		order,
		search: searchValue,
		page: currentPage.toString(),
	});

	console.log(students);
	const [updateUserRole] = useUpdateUserRoleMutation();

	const columns = [
		{ key: "name", label: "Name" },
		{ key: "email", label: "Email" },
		{ key: "role", label: "Role" },
		{
			key: "createdAt",
			label: "Registration Date",
			render: (user: TUserResponse) =>
				moment(`${user.createdAt}`, "YYYYMMDD").format("MMM DD YYYY"),
		},
		{
			key: "actions",
			label: "Actions",

			render: (user: TUserResponse) => (
				<Select
					defaultValue={user?.role}
					value={user?.role}
					onValueChange={(value) =>
						handleUpdateRole(value, user?._id)
					}
				>
					<SelectTrigger className="max-w-[120px]">
						<SelectValue placeholder="Select role" />
					</SelectTrigger>

					<SelectContent>
						{userRole.map((value) => (
							<SelectItem key={value.value} value={value.value}>
								{value.level}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			),
		},
	];
	const handleUpdateRole = useCallback(
		async (value: string, userId: string) => {
			try {
				const res = await updateUserRole({
					userId,
					payload: { role: value },
				}).unwrap();
				if (res.success) {
					toast.success("User role updated successfully");
				}
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (error: any) {
				toast.error(error?.data?.message);
				console.log(error);
			}
		},
		[updateUserRole]
	);

	if (isLoading) return <AppLoading />;

	return (
		<div className="space-y-5">
			<SearchAndSort
				setOrder={setOrder}
				setSearch={setSearch}
				selectValue="By Default DESC"
				placeholder="Search by name and email"
			/>
			{students?.result?.length ? (
				<div className="space-y-2">
					<ESTable
						columns={columns}
						rowKey={(item) => item._id}
						data={students?.result}
					/>

					{students?.meta && (
						<Pagination
							currentPage={students.meta?.currentPage}
							totalPages={students?.meta?.totalPages}
							onPageChange={setCurrentPage}
						/>
					)}
				</div>
			) : (
				<NoDataFound message="No student found" />
			)}
		</div>
	);
}
