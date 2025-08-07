"use client";

import { useRevenueQuery } from "@/redux/api/meta-data";
import moment from "moment";
import Chart from "react-apexcharts";

export default function EarningChart() {
	const { data: revenue } = useRevenueQuery(undefined);

	const monthMap = new Map();

	revenue?.result?.forEach((enrollment) => {
		const createdMonth = moment(enrollment.createdAt)
			.startOf("month")
			.format("YYYY-MM");

		const prev = monthMap.get(createdMonth) || 0;
		monthMap.set(createdMonth, prev + enrollment.amount);
	});

	// Now map back to your 12-month array
	const monthlyData = Array.from({ length: 12 }).map((_, i) => {
		const month = moment()
			.subtract(11 - i, "months")
			.startOf("month");
		const key = month.format("YYYY-MM");

		return {
			label: month.format("MMM YYYY"),
			value: monthMap.get(key) || 0,
			key,
		};
	});

	const monthlyChartData = {
		categories: monthlyData.map((m) => m.label),
		series: [
			{
				name: "Revenue",
				data: monthlyData.map((m) => m.value),
			},
		],
	};

	const yearlyMap = new Map();

	revenue?.result?.forEach((enrollment) => {
		const year = moment(enrollment.createdAt).format("YYYY");
		yearlyMap.set(year, (yearlyMap.get(year) || 0) + enrollment.amount);
	});

	// Sort years
	const sortedYears = Array.from(yearlyMap.entries()).sort(
		([a], [b]) => parseInt(a) - parseInt(b)
	);

	const yearlyChartData = {
		categories: sortedYears.map(([year]) => year),
		series: [
			{
				name: "Revenue",
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				data: sortedYears.map(([_, total]) => total),
			},
		],
	};
	return (
		<div className="space-y-3">
			<h4>Revenue</h4>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
				<div className="space-y-5 bg-white p-5 lg:p-8 rounded-md">
					<h5>Last 12 Months</h5>

					<div>
						<Chart
							options={{
								xaxis: {
									categories: monthlyChartData.categories,
								},
							}}
							series={monthlyChartData.series}
							type="bar"
							height={350}
						/>
					</div>
				</div>
				<div className="space-y-5 bg-white p-5 lg:p-8 rounded-md">
					<h5>Yearly Revenue</h5>

					<div>
						<Chart
							options={{
								xaxis: {
									categories: yearlyChartData.categories,
								},
							}}
							series={yearlyChartData.series}
							type="bar"
							height={350}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
