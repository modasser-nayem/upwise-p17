"use client";

import AppLoading from "@/app/loading";
import NoDataFound from "@/components/NoDataFound";
import Pagination from "@/components/Pagination";
import SearchAndSort from "@/components/SearchAndSort";
import { ESTable } from "@/components/shared/es-table";
import { useAllPaymentsQuery } from "@/redux/api/transactionApi";
import { TPaymentResponseForTable } from "@/types/payment.types";
import { useState } from "react";
import { useDebounce } from "use-debounce";

export default function TransactionPage() {
	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState("");
	const [order, setOrder] = useState("desc");
	const [searchValue] = useDebounce(search, 800);
	const { data: transactions, isLoading } = useAllPaymentsQuery({
		order,
		page: currentPage.toString(),
		search: searchValue,
	});

	const columns = [
		{
			label: "Intent ID",
			key: "paymentIntentId",
		},
		{
			label: "Student Name",
			key: "student.name",
			render: (payment: TPaymentResponseForTable) => payment.student.name,
		},
		{
			label: "Course Title",
			key: "course.title",
			render: (payment: TPaymentResponseForTable) => payment.course.title,
		},
		{
			label: "Amount",
			key: "amount",
		},
	];

	if (isLoading) return <AppLoading />;
	return (
		<div className="space-y-5">
			<h4>Transaction List</h4>

			<SearchAndSort
				setOrder={setOrder}
				setSearch={setSearch}
				selectValue="By Default DESC"
				placeholder="Search by IntentID"
			/>

			{transactions?.result.length ? (
				<div className="space-y-2">
					<ESTable
						columns={columns}
						data={transactions?.result}
						rowKey={(item) => item?._id}
					/>
					{transactions?.meta && (
						<Pagination
							currentPage={transactions.meta?.currentPage}
							totalPages={transactions?.meta?.totalPages}
							onPageChange={setCurrentPage}
						/>
					)}
				</div>
			) : (
				<NoDataFound message="No Transaction found" />
			)}
		</div>
	);
}
