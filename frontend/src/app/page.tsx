import Benefits from "@/components/landing/benefits";
import Courses from "@/components/landing/courses";
import FAQs from "@/components/landing/faqs";
import HeroSection from "@/components/landing/hero-section";
import HowItWorks from "@/components/landing/how-it-works";
import Testimonials from "@/components/landing/testimonials";

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
         <Courses />
         <HowItWorks />
         <Benefits />

         <Testimonials />
         <FAQs />
         <Footer />
      </section>
   );
}
