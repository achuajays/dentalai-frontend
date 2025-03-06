
import { Navbar } from "@/components/ui/navbar";
import { HeroSection } from "@/components/HeroSection";
import { WelcomeSection } from "@/components/WelcomeSection";
import { ServicesSection } from "@/components/ServicesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { TeamSection } from "@/components/TeamSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-16"> {/* Add padding to account for fixed navbar */}
        <HeroSection />
        <WelcomeSection />
        <ServicesSection />
        <TestimonialsSection />
        <TeamSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
