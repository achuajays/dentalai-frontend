
import { useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { HeroSection } from "@/components/HeroSection";
import { WelcomeSection } from "@/components/WelcomeSection";
import { ServicesSection } from "@/components/ServicesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { TeamSection } from "@/components/TeamSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // In a real app, this would connect to an authentication system
    setIsLoggedIn(true);
    toast({
      title: "Logged in successfully",
      description: "Welcome back to DentalCare+",
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        isLoggedIn={isLoggedIn} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
      />
      
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
