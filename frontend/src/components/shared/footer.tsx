import Link from "next/link";
import React from "react";
import Container from "./Container";
import Image from "next/image";
import { Facebook, Globe, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Button } from "../ui/button";
import { FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 mt-20 text-gray-800">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-10">
          {/* About */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-2">
              <Image src={"/logo.png"} width={48} height={48} alt="logo" />
              <span className="text-2xl font-bold text-gray-900">Upwise</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Upwise is your trusted platform for expert-led online learning. We empower individuals and organizations to achieve more through accessible, high-quality education.
            </p>
            <div className="flex gap-3 mt-2">
              <a href="https://alimodassernayem.vercel.app/" aria-label="Ali Modasser Nayem" className="hover:text-primary"><Globe size={22} className="text-primary" /></a>
			  <a href="https://web.facebook.com/alimodassernayem" aria-label="Facebook" className="hover:text-primary"><Facebook size={22} className="text-primary" /></a>
              <a href="https://www.linkedin.com/in/alimodassernayem/" aria-label="LinkedIn" className="hover:text-primary"><Linkedin size={22} className="text-primary" /></a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li><Link href="/courses">All Courses</Link></li>
              <li><Link href="/about-us">About Us</Link></li>
              <li><Link href="/faq">FAQs</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/testimonials">Testimonials</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-center gap-2"><Mail size={18} className="text-primary" /> support@upwise.com</li>
              <li className="flex items-center gap-2"><Phone size={18} className="text-primary" /> +1 234 567 890</li>
              <li className="flex items-center gap-2"><MapPin size={18} className="text-primary" /> Global Campus</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-8 pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-gray-500 text-xs">
          <div>
            &copy; {new Date().getFullYear()} Upwise. All rights reserved.
          </div>
          <div className="flex gap-4">
            <span>Empowering learners worldwide.</span>
            <span>|</span>
            <span>Made with <span className="text-primary">&#10084;</span> by Upwise Team</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
