"use client";
import React, { useState } from "react";
import moment from "moment";

import { useAllUsersQuery } from "@/redux/api/userApi";
import { ESTable } from "@/components/shared/es-table";
import { TUserResponse } from "@/types/user.types";
import AppLoading from "@/app/loading";
import NoDataFound from "@/components/NoDataFound";
import Pagination from "@/components/Pagination";
import SearchAndSort from "@/components/SearchAndSort";
import { useDebounce } from "use-debounce";

export default function InstructorTable() {
	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState("");
	const [order, setOrder] = useState("desc");
	const [searchValue] = useDebounce(search, 800);
	const { data: instructors, isLoading } = useAllUsersQuery({
		role: "instructor",
		order,
		search: searchValue,
		page: currentPage.toString(),
	});

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
	];

	if (isLoading) return <AppLoading />;

	return (
		<div className="space-y-5">
			<SearchAndSort
				setOrder={setOrder}
				setSearch={setSearch}
				selectValue="By Default DESC"
				placeholder="Search by name and email"
			/>
			{instructors?.result?.length ? (
				<div className="space-y-2">
					<ESTable
						columns={columns}
						rowKey={(item) => item._id}
						data={instructors?.result}
					/>

					{instructors?.meta && (
						<Pagination
							currentPage={instructors.meta?.currentPage}
							totalPages={instructors?.meta?.totalPages}
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
