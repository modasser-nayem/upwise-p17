import Benefits from "@/components/landing/benefits";
import Courses from "@/components/landing/courses";
import FAQs from "@/components/landing/faqs";
import HeroSection from "@/components/landing/hero-section";
import HowItWorks from "@/components/landing/how-it-works";
import Testimonials from "@/components/landing/testimonials";
import FeaturedInstructors from "@/components/landing/featured-instructors";
import PlatformFeatures from "@/components/landing/platform-features";
import SuccessMetrics from "@/components/landing/success-metrics";

import Footer from "@/components/shared/footer";
import GeometricBackground from "@/components/shared/geometric-background";

import Navbar from "@/components/shared/navbar";

export default function Home() {
   return (
      <section>
         <GeometricBackground>
            <Navbar />
            <HeroSection />
         </GeometricBackground>
         <SuccessMetrics />
         <Courses />
         <FeaturedInstructors />
         <HowItWorks />
         <Benefits />
         <PlatformFeatures />
         <Testimonials />
         <FAQs />
         <Footer />
      </section>
   );
}
