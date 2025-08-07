import { howItWorks } from "@/dummy-data/how-it-works";
import React from "react";
import Container from "../shared/Container";

export default function HowItWorks() {
  return (
    <div className="relative py-24 bg-gray-50 border-b border-gray-100">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover how our platform guides you from your first lesson to career success. Simple, fast, and rewarding—start your journey today!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorks.map((item, idx) => (
            <div
              key={item.step}
              className="flex flex-col items-center bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-shadow border border-gray-100"
              data-aos="fade-up"
              data-aos-delay={idx * 60}
            >
              <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                <item.icon size={36} className="text-primary" />
              </div>
              <h4 className="text-lg font-semibold mb-2 text-gray-900">{item.title}</h4>
              <p className="text-gray-500 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
