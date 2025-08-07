import React from "react";
import Container from "../shared/Container";
import { Button } from "../ui/button";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/dummy-data/faqs";

export default function FAQs() {
	return (
		<Container>
			<div className="bg-white p-5 lg:p-20 rounded-md grid grid-cols-1 md:grid-cols-2 gap-20">
				<div>
					<h1>Frequently Asked Questions</h1>
					<p className="text-gray-shade-20">
						Still you have any questions? Contact our Team via
						developernihar@gmail.com
					</p>

					<Button variant={"outline"} className="inline-block mt-12">
						See All FAQ&apos;s
					</Button>
				</div>
				<div className="space-y-8 text-left">
					{faqs.map((faq, index) => (
						<Accordion
							type="single"
							collapsible
							className="p-5 md:p-10 bg-white rounded-md border"
							key={index}
						>
							<AccordionItem
								value={faq.question}
								className="border-none"
							>
								<AccordionTrigger className="text-lg font-medium text-left">
									{faq.question}
								</AccordionTrigger>
								<AccordionContent className="text-gray-shade-30">
									{faq.answer}
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					))}
				</div>
			</div>
		</Container>
	);
}
