"use client";
import React from "react";
import Container from "../shared/Container";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function HeroSection() {
   const router = useRouter();
   const gotoThe = (path: string) => {
      router.push(path);
   };

   return (
      <div className="relative bg-white min-h-[70vh] flex items-center justify-center overflow-hidden border-b border-gray-100">
         <Container className="py-32 flex flex-col items-center text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6 drop-shadow-lg">
               Empower Your Future with{" "}
               <span className="text-primary">Expert-Led</span> Online Learning
            </h1>
            <p className="text-lg md:text-2xl text-gray-700 max-w-2xl mx-auto mb-8">
               Master in-demand skills, learn from top instructors, and join a
               thriving community of learners. Your journey to success starts
               here.
            </p>
            <div className="flex justify-center flex-wrap gap-4 md:gap-8">
               <Button
                  size="lg"
                  className="px-10 py-6 text-lg font-semibold shadow-xl"
                  onClick={() => gotoThe("/sign-up")}
               >
                  Get Started
               </Button>
               <Button
                  size="lg"
                  variant="outline"
                  className="px-10 py-6 text-lg font-semibold shadow-xl"
                  onClick={() => gotoThe("/courses")}
               >
                  Explore Courses
               </Button>
            </div>
         </Container>
      </div>
   );
}
