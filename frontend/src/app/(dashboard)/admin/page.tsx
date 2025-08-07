import EarningChart from "@/components/dashboard/earning-chart";
import GeneralInformation from "@/components/dashboard/general-information";

export default function Dashboard() {
	return (
		<section className="space-y-5">
			<h5 className="mt-5">
				Here is a short view about this website, that includes analytics
				and other information
			</h5>

			<GeneralInformation />
			<EarningChart />
		</section>
	);
}
