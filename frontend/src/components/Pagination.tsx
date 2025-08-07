import React from "react";
import { Button } from "./ui/button";
type PaginationProps = {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
};

export default function Pagination({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationProps) {
	const getPageNumbers = () => {
		const pages = [];
		// Determine the start and end page
		const start = Math.max(1, currentPage - 2);
		const end = Math.min(totalPages, currentPage + 2);

		for (let i = start; i <= end; i++) {
			pages.push(i);
		}

		return pages;
	};

	const pageNumbers = getPageNumbers();
	return (
		<div className="flex items-center justify-end gap-x-3">
			{/* Previous Button */}
			<Button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				variant={"secondary"}
				className="hover:bg-white-shade-99"
			>
				Prev
			</Button>

			<div className="flex items-center gap-x-3">
				{pageNumbers.map((page) => (
					<Button
						key={page}
						onClick={() => onPageChange(page)}
						variant={page === currentPage ? "default" : "outline"}
						className="gap-x-5"
					>
						{page}
					</Button>
				))}
			</div>

			{/* Next Button */}
			<Button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				variant={"secondary"}
				className="hover:bg-white"
			>
				Next
			</Button>
		</div>
	);
}
