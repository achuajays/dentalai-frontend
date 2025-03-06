
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookAppointmentModal } from "@/components/BookAppointmentModal";

export function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://trident.dental/wp-content/uploads/2022/06/pexels-cedric-fauntleroy-4269362.jpg.webp')",
          filter: "brightness(0.8)"
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-700/30"></div>
      
      <div className="relative h-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col justify-center">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Advanced Dental Care For Your Perfect Smile
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Experience modern dentistry with compassion and expertise. Our team is dedicated to your comfort and oral health.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-white text-blue-700 hover:bg-blue-50 text-lg px-8 hover-scale"
              onClick={() => setIsModalOpen(true)}
            >
              Book Appointment
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white/10 text-lg px-8"
            >
              Our Services
            </Button>
          </div>
        </div>
      </div>

      <BookAppointmentModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />
    </section>
  );
}
