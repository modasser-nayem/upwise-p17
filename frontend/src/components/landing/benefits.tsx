import React from "react";
import Container from "../shared/Container";
import { benefits } from "@/dummy-data/benefit";
import SectionTitle from "../shared/Section-Title";
import { FaRegLightbulb, FaChalkboardTeacher, FaLaptopCode, FaUsers, FaCertificate, FaRocket } from "react-icons/fa";

const iconList = [
  FaRegLightbulb,
  FaChalkboardTeacher,
  FaLaptopCode,
  FaUsers,
  FaCertificate,
  FaRocket,
];

const data = {
  title: "Why Choose Us?",
  description:
    "Unlock your potential with hands-on, real-world learning. Our platform connects you with industry leaders, practical projects, and a supportive community to help you achieve your goals.",
  link: "/benefits",
};

export default function Benefits() {
  return (
    <div className="relative py-24 bg-white border-b border-gray-100">
      <Container>
        <SectionTitle data={data} />
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {benefits.map((item, index) => {
            const Icon = iconList[index % iconList.length];
            return (
              <div
                key={item.index}
                className="rounded-xl p-8 bg-gray-50 shadow hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center text-center"
                data-aos="fade-up"
                data-aos-delay={index * 40}
              >
                <div className="mb-6 text-primary text-5xl font-bold flex items-center justify-center w-16 h-16 rounded-full bg-white border border-primary/20">
                  <Icon size={40} />
                </div>
                <h3 className="text-2xl font-semibold mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-500 text-base">{item.subTitle}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
