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
    <div className="relative py-24 bg-white border-b border-gray-100">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have more questions? Contact our support team at <a href="mailto:support@upwise.com" className="text-primary underline">support@upwise.com</a>
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col justify-center">
            <Button variant="outline" className="mx-auto w-fit mb-8">See All FAQs</Button>
            <img src="/assets/idea-icon.svg" alt="FAQ Illustration" className="mx-auto w-32 opacity-60" />
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Accordion
                type="single"
                collapsible
                className="bg-white rounded-lg border border-gray-100 shadow-md"
                key={index}
              >
                <AccordionItem value={faq.question} className="border-none">
                  <AccordionTrigger className="text-lg font-medium text-left text-gray-900">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-500">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
