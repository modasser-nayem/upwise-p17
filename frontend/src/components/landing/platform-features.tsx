import React from "react";
import Container from "../shared/Container";
import { FaMobileAlt, FaChalkboardTeacher, FaShieldAlt, FaClock, FaChartLine, FaUserFriends } from "react-icons/fa";

const features = [
  {
    icon: FaMobileAlt,
    title: "Mobile Friendly",
    description: "Access courses anytime, anywhere on any device.",
  },
  {
    icon: FaChalkboardTeacher,
    title: "Expert Instructors",
    description: "Learn from industry leaders and experienced teachers.",
  },
  {
    icon: FaShieldAlt,
    title: "Secure & Private",
    description: "Your data and progress are always protected.",
  },
  {
    icon: FaClock,
    title: "Flexible Learning",
    description: "Study at your own pace with lifetime access.",
  },
  {
    icon: FaChartLine,
    title: "Progress Tracking",
    description: "Monitor your growth and achievements easily.",
  },
  {
    icon: FaUserFriends,
    title: "Community Support",
    description: "Join a vibrant community of learners and mentors.",
  },
];

export default function PlatformFeatures() {
  return (
    <div className="relative py-24 bg-white border-b border-gray-100">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Platform Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need for a seamless and effective learning experience.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-xl p-8 bg-gray-50 shadow hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center text-center"
              >
                <div className="mb-6 text-primary text-5xl flex items-center justify-center w-16 h-16 rounded-full bg-white border border-primary/20">
                  <Icon size={40} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-500 text-base">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}