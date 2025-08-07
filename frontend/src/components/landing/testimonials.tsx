"use client";

import React from "react";
import Container from "../shared/Container";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useAllReviewsQuery } from "@/redux/api/reviewApi";
import AppLoading from "@/app/loading";

const data = {
  title: "Success Stories",
  description:
    "Hear from learners who transformed their careers with Upwise. Real stories, real results—see how our platform empowers students to achieve their dreams.",
  link: "/testimonials",
};

export default function Testimonials() {
  const { data: acceptedReviews, isLoading } = useAllReviewsQuery({
    isAccepted: "true",
  });

  if (isLoading) return <AppLoading />;
  return (
    <div className="relative py-24 bg-gray-50 border-b border-gray-100">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{data.title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{data.description}</p>
        </div>
        <Carousel className="mt-8 w-full max-w-4xl mx-auto">
          <CarouselContent>
            {acceptedReviews?.result?.map((review) => (
              <CarouselItem
                className="md:basis-1/1 lg:basis-1/3"
                key={review._id}
              >
                <blockquote className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center flex flex-col items-center">
                  <p className="italic text-lg text-gray-700">
                    <q>{review.message}</q>
                  </p>
                  <footer className="mt-6 font-semibold text-primary text-lg">
                    — {review.student.name}
                  </footer>
                </blockquote>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </Container>
    </div>
  );
}
