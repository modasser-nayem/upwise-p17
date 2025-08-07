import React from "react";
import Container from "../shared/Container";
import { FaUserGraduate, FaBookOpen, FaStar, FaBriefcase } from "react-icons/fa";

const metrics = [
  {
    icon: FaUserGraduate,
    value: "50,000+",
    label: "Students Enrolled",
  },
  {
    icon: FaBookOpen,
    value: "120+",
    label: "Courses Available",
  },
  {
    icon: FaStar,
    value: "4.9/5",
    label: "Average Rating",
  },
  {
    icon: FaBriefcase,
    value: "10,000+",
    label: "Career Advancements",
  },
];

export default function SuccessMetrics() {
  return (
    <div className="relative py-24 bg-gray-50 border-b border-gray-100">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Impact in Numbers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See how Upwise is making a difference for learners around the world.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.label}
                className="flex flex-col items-center bg-white rounded-xl shadow p-8 border border-gray-100"
              >
                <div className="mb-4 text-primary text-4xl flex items-center justify-center w-14 h-14 rounded-full bg-white border border-primary/20">
                  <Icon size={32} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</div>
                <div className="text-gray-500 text-base text-center">{metric.label}</div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}