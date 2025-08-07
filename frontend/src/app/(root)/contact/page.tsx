import React from "react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
	return (
		<div className=" bg-white text-gray-800">
			{/* Header Section */}
			<section className="bg-gradient-to-r from-orange-shade-90 to-orange-shade-97 py-20 px-6 text-center">
				<h1 className="text-4xl md:text-5xl font-bold mb-4">
					Get in Touch
				</h1>
				<p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-shade-60">
					We&apos;re here to help you. Reach out with any questions,
					feedback, or support requests.
				</p>
			</section>

			{/* Contact Form Section */}
			<section className="py-20 px-6 max-w-4xl mx-auto">
				<h2 className="text-3xl font-bold mb-8 text-center">
					Send Us a Message
				</h2>
				<form className="space-y-6">
					<div>
						<label className="block mb-2 text-sm font-medium">
							Full Name
						</label>
						<input
							type="text"
							className="w-full border border-gray-300 rounded-lg px-4 py-2"
							placeholder="Your Name"
						/>
					</div>
					<div>
						<label className="block mb-2 text-sm font-medium">
							Email Address
						</label>
						<input
							type="email"
							className="w-full border border-gray-300 rounded-lg px-4 py-2"
							placeholder="you@example.com"
						/>
					</div>
					<div>
						<label className="block mb-2 text-sm font-medium">
							Subject
						</label>
						<input
							type="text"
							className="w-full border border-gray-300 rounded-lg px-4 py-2"
							placeholder="Subject"
						/>
					</div>
					<div>
						<label className="block mb-2 text-sm font-medium">
							Message
						</label>
						<textarea
							className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32"
							placeholder="Your message..."
						/>
					</div>
					<Button>Submit Message</Button>
				</form>
			</section>

			{/* Contact Info Section */}
			<section className="py-20 bg-gray-50 text-center">
				<h2 className="text-3xl font-bold mb-6" data-aos="fade-up">
					Other Ways to Contact Us
				</h2>
				<div
					className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-left"
					data-aos-delay="60"
				>
					<div
						className="bg-white p-6 rounded-xl shadow-md"
						data-aos="fade-up"
					>
						<h3 className="text-lg font-semibold mb-2">
							📍 Our Office
						</h3>
						<p>
							123 Learning Ave
							<br />
							Education City, ED 45678
						</p>
					</div>
					<div
						className="bg-white p-6 rounded-xl shadow-md"
						data-aos="fade-up"
					>
						<h3 className="text-lg font-semibold mb-2">📞 Phone</h3>
						<p>
							+1 (800) 123-4567
							<br />
							Mon–Fri, 9am–5pm (IST)
						</p>
					</div>
					<div
						className="bg-white p-6 rounded-xl shadow-md"
						data-aos="fade-up"
					>
						<h3 className="text-lg font-semibold mb-2">✉️ Email</h3>
						<p>
							developernihar@gmail.com
							<br />
							Response within 24 hours
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
