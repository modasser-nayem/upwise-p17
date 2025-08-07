"use client";

import React from "react";
import Container from "../shared/Container";
import { useAllUsersQuery } from "@/redux/api/userApi";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

export default function FeaturedInstructors() {
  // Fetch only instructors
  const { data, isLoading } = useAllUsersQuery({ role: "instructor" });
  const instructors = data?.result?.slice(0, 6) || [];

  return (
    <div className="relative py-24 bg-gray-50 border-b border-gray-100">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Meet Our Instructors</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learn from industry experts who are passionate about teaching and helping you succeed.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-8">
          {isLoading ? (
            <p className="col-span-full text-center">Loading...</p>
          ) : instructors.length === 0 ? (
            <p className="col-span-full text-center">No instructors found.</p>
          ) : (
            instructors.map((instructor) => (
              <div
                key={instructor._id}
                className="flex flex-col items-center bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition-shadow"
              >
                <Avatar className="w-20 h-20 mb-4">
                  <AvatarImage src={instructor.avatar} alt={instructor.name} />
                  <AvatarFallback>{instructor.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <h4 className="text-lg font-semibold text-gray-900 mb-1">{instructor.name}</h4>
                <p className="text-primary text-xs font-medium mb-2">Instructor</p>
                <p className="text-gray-500 text-sm text-center">Expert in online skill development and passionate about student success.</p>
              </div>
            ))
          )}
        </div>
      </Container>
    </div>
  );
}