"use client";
import React, { useEffect, useState } from "react";
import Container from "../shared/Container";
import SectionTitle from "../shared/Section-Title";
import { useAllCourseQuery } from "@/redux/api/courseApi";
import CourseCard from "../shared/course-card";
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "@/components/ui/carousel";
import { useAllCategoriesQuery } from "@/redux/api/categoryApi";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { LoadingSkeleton } from "../LoadingSkeleton";
import NoDataFound from "../NoDataFound";
import AppLoading from "@/app/loading";

const data = {
   title: "Explore Our Courses",
   description:
      "Browse our curated catalog of industry-relevant courses. Each program is designed to help you gain practical skills and advance your career.",
   link: "/courses",
};

export default function Courses() {
   const {
      data: categories,
      isLoading: categoryLoading,
      error,
   } = useAllCategoriesQuery({});
   const [category, setCategory] = useState("");
   const { data: courses, isLoading } = useAllCourseQuery(
      {
         category,
      },
      { skip: !category }
   );

   const handleCategory = (cId: string) => {
      setCategory(cId);
   };

   useEffect(() => {
      if (categories?.result && categories.result.length > 0) {
         setCategory(categories.result[0]._id);
      }
   }, [categories?.result]);

   if (categoryLoading) return <LoadingSkeleton />;

   return (
      <div className="relative py-24 bg-white border-b border-gray-100">
         <Container>
            <div className="mb-12 text-center">
               <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                  {data.title}
               </h2>
               <p className="text-gray-600 max-w-2xl mx-auto">
                  {data.description}
               </p>
            </div>
            <Carousel className="w-full max-w-4xl mx-auto mt-10">
               <CarouselContent>
                  {error ? (
                     <p> Something went wrong!</p>
                  ) : categories?.result?.length ? (
                     categories.result?.map((cat) => (
                        <CarouselItem
                           key={cat._id}
                           className="basis-auto"
                        >
                           <div
                              className={cn(
                                 "group flex items-center gap-x-3 py-2 px-4 border rounded hover:cursor-pointer transition-all",
                                 cat?._id === category
                                    ? "bg-primary text-white"
                                    : "bg-secondary"
                              )}
                              onClick={() => handleCategory(cat._id)}
                           >
                              <Image
                                 src={cat?.icon}
                                 width={40}
                                 height={40}
                                 alt={cat?.name}
                                 className="size-10"
                              />
                              <div>
                                 <p
                                    className={cn(
                                       "group-hover:underline font-medium text-nowrap text-sm",
                                       cat?._id === category
                                          ? "text-white-shade-99"
                                          : "text-gray-shade-10"
                                    )}
                                 >
                                    {cat?.name}
                                 </p>
                                 <p
                                    className={cn(
                                       "text-xs",
                                       cat?._id === category
                                          ? "text-white-shade-95"
                                          : "text-gray-shade-30"
                                    )}
                                 >
                                    {cat?.courseCount} courses
                                 </p>
                              </div>
                           </div>
                        </CarouselItem>
                     ))
                  ) : null}
               </CarouselContent>
               <CarouselPrevious />
               <CarouselNext />
            </Carousel>
            <div>
               {isLoading ? (
                  <AppLoading />
               ) : courses?.result.length === 0 ? (
                  <NoDataFound message="No Course found" />
               ) : (
                  <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                     {courses?.result?.map((course) => (
                        <CourseCard
                           course={course}
                           key={course?._id}
                        />
                     ))}
                  </div>
               )}
            </div>
         </Container>
      </div>
   );
}
